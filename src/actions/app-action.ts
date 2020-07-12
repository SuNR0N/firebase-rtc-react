export const CONFIRM_JOIN_ROOM = 'CONFIRM_JOIN_ROOM';
export const HANG_UP = 'HANG_UP';
export const HIDE_JOIN_ROOM = 'HIDE_JOIN_ROOM';
export const INIT_LOCAL_STREAM = 'INIT_LOCAL_STREAM';
export const ROOM_CREATED = 'ROOM_CREATED';
export const SHOW_JOIN_ROOM = 'SHOW_JOIN_ROOM';

export interface ConfirmJoinRoomAction {
  type: typeof CONFIRM_JOIN_ROOM;
}

export interface HangUpAction {
  type: typeof HANG_UP;
}

export interface HideJoinRoomAction {
  type: typeof HIDE_JOIN_ROOM;
}

export interface InitLocalStreamAction {
  type: typeof INIT_LOCAL_STREAM;
  payload: MediaStream;
}

export interface RoomCreatedAction {
  type: typeof ROOM_CREATED;
  payload: string;
}

export interface ShowJoinRoomAction {
  type: typeof SHOW_JOIN_ROOM;
}

export type AppAction =
  | ConfirmJoinRoomAction
  | HangUpAction
  | HideJoinRoomAction
  | InitLocalStreamAction
  | RoomCreatedAction
  | ShowJoinRoomAction;
