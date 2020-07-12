import {
  AppAction,
  CONFIRM_JOIN_ROOM,
  ConfirmJoinRoomAction,
  HANG_UP,
  HangUpAction,
  HIDE_JOIN_ROOM,
  HideJoinRoomAction,
  INIT_LOCAL_STREAM,
  InitLocalStreamAction,
  ROOM_CREATED,
  RoomCreatedAction,
  SHOW_JOIN_ROOM,
  ShowJoinRoomAction,
} from '../actions/app-action';
import { AppState, PeerType } from '../states/app-state';

const handleConfirmJoinRoomAction = (state: AppState, action: ConfirmJoinRoomAction): AppState => ({
  ...state,
  hasActiveSession: true,
  peerType: PeerType.Callee,
  showRoomConfirmation: false,
});

const handleHangUpAction = (state: AppState, action: HangUpAction): AppState => ({
  ...state,
  hasActiveSession: false,
  isMediaInUse: false,
  localStream: null,
  peerType: null,
  remoteStream: null,
  roomId: null,
});

const handleHideJoinRoomAction = (state: AppState, action: HideJoinRoomAction): AppState => ({
  ...state,
  showRoomConfirmation: false,
});

const handleInitLocalStreamAction = (state: AppState, action: InitLocalStreamAction): AppState => ({
  ...state,
  localStream: action.payload,
  isMediaInUse: true,
});

const handleRoomCreatedAction = (state: AppState, action: RoomCreatedAction): AppState => ({
  ...state,
  hasActiveSession: true,
  peerType: PeerType.Caller,
  roomId: action.payload,
});

const handleShowJoinRoomAction = (state: AppState, action: ShowJoinRoomAction): AppState => ({
  ...state,
  showRoomConfirmation: true,
});

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case CONFIRM_JOIN_ROOM:
      return handleConfirmJoinRoomAction(state, action);
    case HANG_UP:
      return handleHangUpAction(state, action);
    case HIDE_JOIN_ROOM:
      return handleHideJoinRoomAction(state, action);
    case INIT_LOCAL_STREAM:
      return handleInitLocalStreamAction(state, action);
    case ROOM_CREATED:
      return handleRoomCreatedAction(state, action);
    case SHOW_JOIN_ROOM:
      return handleShowJoinRoomAction(state, action);
    default:
      return state;
  }
};
