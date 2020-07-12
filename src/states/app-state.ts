export enum PeerType {
  Caller = 'Caller',
  Callee = 'Callee',
}

export interface AppState {
  hasActiveSession: boolean;
  isMediaInUse: boolean;
  localStream: MediaStream | null;
  peerType: PeerType | null;
  remoteStream: MediaStream | null;
  roomId: string | null;
  showRoomConfirmation: boolean;
}

export const initialAppState: AppState = {
  hasActiveSession: false,
  isMediaInUse: false,
  localStream: null,
  peerType: null,
  remoteStream: null,
  roomId: null,
  showRoomConfirmation: false,
};
