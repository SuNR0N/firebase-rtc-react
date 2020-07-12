import React, { FC, useEffect, useReducer } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import './app.scss';
import { Configuration } from './config';
import { AVStream, ConfirmationModal, ControlBar, Header, RoomInfo } from './components';
import { appReducer } from './reducers/app-reducer';
import { initialAppState } from './states/app-state';
import { CONFIRM_JOIN_ROOM, HANG_UP, HIDE_JOIN_ROOM, INIT_LOCAL_STREAM, ROOM_CREATED, SHOW_JOIN_ROOM } from './actions/app-action';
import { collectIceCandidates, registerPeerConnectionListeners } from './utils/peer-helper';

export const App: FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  const { hasActiveSession, isMediaInUse, localStream, peerType, remoteStream, roomId, showRoomConfirmation } = state;

  useEffect(() => {
    firebase.initializeApp({
      projectId: Configuration.projectId,
    });
  }, []);

  const handleCreateRoom = async () => {
    const db = firebase.firestore();

    const peerConnection = new RTCPeerConnection(Configuration.rtcConfiguration);

    registerPeerConnectionListeners(peerConnection, remoteStream);

    localStream?.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    const roomWithOffer = {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
    };

    const roomRef = await db.collection(Configuration.roomsCollectionName).add(roomWithOffer);
    const { id: roomId } = roomRef;
    dispatch({ type: ROOM_CREATED, payload: roomId });

    roomRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      console.log('Got updated room:', data);
      if (!peerConnection.currentRemoteDescription && data?.answer) {
        console.log('Set remote description:', data.answer);
        const answer = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(answer);
      }
    });

    collectIceCandidates(roomRef, peerConnection, Configuration.callerCandidatesName, Configuration.calleeCandidatesName);
  };

  const handleHangup = () => {
    localStream?.getTracks().forEach((track) => track.stop());
    remoteStream?.getTracks().forEach((track) => track.stop());

    dispatch({ type: HANG_UP });
  };

  const handleJoinRoom = async () => {
    dispatch({ type: SHOW_JOIN_ROOM });
  };

  const handleUseMedia = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    dispatch({ type: INIT_LOCAL_STREAM, payload: localStream });
  };

  const handleClose = () => {
    dispatch({ type: HIDE_JOIN_ROOM });
  };

  const handleJoinRoomById = async (id?: string) => {
    dispatch({ type: CONFIRM_JOIN_ROOM });

    const db = firebase.firestore();
    const roomRef = db.collection(Configuration.roomsCollectionName).doc(id);
    const roomSnapshot = await roomRef.get();
    console.log('Got room:', roomSnapshot.exists);

    if (roomSnapshot.exists) {
      const peerConnection = new RTCPeerConnection(Configuration.rtcConfiguration);

      registerPeerConnectionListeners(peerConnection, remoteStream);

      localStream?.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      const { offer } = roomSnapshot.data()!;
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      const roomWithAnswer = {
        answer: {
          type: answer.type,
          sdp: answer.sdp,
        },
      };

      await roomRef.update(roomWithAnswer);

      collectIceCandidates(roomRef, peerConnection, Configuration.calleeCandidatesName, Configuration.callerCandidatesName);
    }
  };

  return (
    <div className="app">
      <Header />
      <ControlBar
        createRoomDisabled={!isMediaInUse || hasActiveSession}
        hangUpDisabled={!isMediaInUse}
        joinRoomDisabled={!isMediaInUse || hasActiveSession}
        useMediaDisabled={isMediaInUse || hasActiveSession}
        onCreateRoom={handleCreateRoom}
        onHangUp={handleHangup}
        onJoinRoom={handleJoinRoom}
        onUseMedia={handleUseMedia}
      />
      <RoomInfo roomId={roomId} peerType={peerType} />
      <section className="app__streams">
        <AVStream source={localStream} />
        <AVStream muted={false} source={remoteStream} />
      </section>
      <ConfirmationModal show={showRoomConfirmation} onClose={handleClose} onConfirm={handleJoinRoomById} />
    </div>
  );
};
