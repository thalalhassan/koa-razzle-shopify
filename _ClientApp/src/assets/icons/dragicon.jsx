import React from 'react';

export default function Dragicon({ color }) {
  const svgcolor = () => (color === 'white' ? '#fff' : '#212B36');

  return (
    <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="2" cy="1.5" r="1.5" fill={svgcolor()} fillOpacity="0.35" />
      <circle cx="2" cy="6.5" r="1.5" fill={svgcolor()} fillOpacity="0.35" />
      <circle cx="2" cy="11.5" r="1.5" fill={svgcolor()} fillOpacity="0.35" />
      <circle cx="7" cy="8.5" r="1.5" fill={svgcolor()} fillOpacity="0.35" />
      <circle cx="7" cy="3.5" r="1.5" fill={svgcolor()} fillOpacity="0.35" />
    </svg>

  );
}
