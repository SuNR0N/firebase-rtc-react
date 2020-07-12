interface Configuration {
  calleeCandidatesName: string;
  callerCandidatesName: string;
  projectId: string;
  roomsCollectionName: string;
  rtcConfiguration: RTCConfiguration;
}

export const Configuration: Configuration = {
  calleeCandidatesName: 'calleeCandidates',
  callerCandidatesName: 'callerCandidates',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ?? '',
  roomsCollectionName: 'rooms',
  rtcConfiguration: {
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  },
};
