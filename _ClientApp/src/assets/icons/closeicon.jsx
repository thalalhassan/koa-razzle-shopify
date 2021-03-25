import React from 'react';

export default function Closeicon({ color, height= "15", width= "15" }) {
  return (
    <svg width={width} height={height} viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.5 1.5L1.5 13.5" stroke={color || 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.5 1.5L13.5 13.5" stroke={color || 'black'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
}
