import React from 'react';

export default function UpdateTime({ duration }) {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration - minutes * 60);

  if (seconds < 10) {
    return <>{`${minutes} : 0${seconds}`}</>;
  }
  return <>{`${minutes} : ${seconds}`}</>;
}
