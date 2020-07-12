import React, { FC } from 'react';
import { MdPermCameraMic, MdGroupAdd, MdGroup, MdClose } from 'react-icons/md';

import { IconButton } from '../icon-button/icon-button';
import './control-bar.scss';

interface ControlBarProps {
  createRoomDisabled?: boolean;
  hangUpDisabled?: boolean;
  joinRoomDisabled?: boolean;
  onCreateRoom?: () => void;
  onHangUp?: () => void;
  onJoinRoom?: () => void;
  onUseMedia?: () => void;
  useMediaDisabled?: boolean;
}

export const ControlBar: FC<ControlBarProps> = ({
  createRoomDisabled,
  hangUpDisabled,
  joinRoomDisabled,
  onCreateRoom,
  onHangUp,
  onJoinRoom,
  onUseMedia,
  useMediaDisabled,
}) => (
  <div className="grControlBar">
    <IconButton disabled={useMediaDisabled} iconType={MdPermCameraMic} label="Use Media" onClick={onUseMedia} variant="outline-primary" />
    <IconButton disabled={createRoomDisabled} iconType={MdGroupAdd} label="Create Room" onClick={onCreateRoom} variant="outline-success" />
    <IconButton disabled={joinRoomDisabled} iconType={MdGroup} label="Join Room" onClick={onJoinRoom} variant="outline-secondary" />
    <IconButton disabled={hangUpDisabled} iconType={MdClose} label="Hang Up" onClick={onHangUp} variant="outline-danger" />
  </div>
);
