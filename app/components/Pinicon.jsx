// app/components/PinIcon.jsx
import React from 'react';

const Pinicon = ({ top, left }) => (
  <div
    className="absolute bg-blue-500 rounded-full w-4 h-4"
    style={{ top: `${top}px`, left: `${left}px` }}
  />
);

export default Pinicon;