import { firestore } from 'firebase/app';

export const registerPeerConnectionListeners = (peerConnection: RTCPeerConnection, remoteStream: MediaStream | null) => {
  peerConnection.addEventListener('icegatheringstatechange', () => {
    console.log(`ICE gathering state changed: ${peerConnection.iceGatheringState}`);
  });

  peerConnection.addEventListener('connectionstatechange', () => {
    console.log(`Connection state change: ${peerConnection.connectionState}`);
  });

  peerConnection.addEventListener('signalingstatechange', () => {
    console.log(`Signaling state change: ${peerConnection.signalingState}`);
  });

  peerConnection.addEventListener('iceconnectionstatechange', () => {
    console.log(`ICE connection state change: ${peerConnection.iceConnectionState}`);
  });

  peerConnection.addEventListener('track', (event) => {
    const [stream] = event.streams;
    console.log('Got remote track:', stream);
    stream.getTracks().forEach((track) => {
      console.log('Add a track to the remoteStream:', track);
      remoteStream?.addTrack(track);
    });
  });
};

export const collectIceCandidates = (
  roomRef: firestore.DocumentReference<firestore.DocumentData>,
  peerConnection: RTCPeerConnection,
  localName: string,
  remoteName: string
) => {
  const candidatesCollection = roomRef.collection(localName);

  peerConnection.addEventListener('icecandidate', (event) => {
    if (event.candidate) {
      const candidate = event.candidate.toJSON();
      candidatesCollection.add(candidate);
    }
  });

  roomRef.collection(remoteName).onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        const candidate = new RTCIceCandidate(change.doc.data());
        peerConnection.addIceCandidate(candidate);
      }
    });
  });
};
