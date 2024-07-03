import React from 'react';

const Overlay = ({ onClick, onScroll }) => {
  return (
    <div
      onClick={onClick}
      onScroll={onScroll}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '2000px', // Adjust height to ensure it covers the iframe content
        cursor: 'crosshair',
        background: 'transparent',
        zIndex: 1,
      }}
    />
  );
};

export default Overlay;