import React, { createRef, FC, useEffect } from 'react';

interface AVStreamProps {
  autoPlay?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  source: MediaStream | null;
}

export const AVStream: FC<AVStreamProps> = ({ autoPlay = true, muted = true, playsInline = true, source }) => {
  const ref = createRef<HTMLVideoElement>();

  useEffect(() => {
    if (ref.current) {
      ref.current.srcObject = source;
    }
  }, [ref, source]);

  if (!source) {
    return null;
  }

  return <video ref={ref} autoPlay={autoPlay} muted={muted} playsInline={playsInline} />;
};
