import React, { FC } from 'react';

import { PeerType } from '../../states/app-state';
import './room-info.scss';

interface RoomInfoProps {
  peerType: PeerType | null;
  roomId: string | null;
}

export const RoomInfo: FC<RoomInfoProps> = ({ peerType, roomId }) => {
  if (!roomId) {
    return null;
  }

  return (
    <div className="grRoomInfo">
      <div className="grRoomInfo__id">
        <span className="grRoomInfo__id--label">Room ID:</span>
        <span className="grRoomInfo__id--value">{roomId}</span>
      </div>
      <div className="grRoomInfo__peerType">
        <span className="grRoomInfo__peerType--label">Peer Type:</span>
        <span className="grRoomInfo__peerType--value">{peerType}</span>
      </div>
    </div>
  );
};
