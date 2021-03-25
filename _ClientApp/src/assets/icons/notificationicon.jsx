import React from 'react';

export default function Notificationicon({ active }) {
  return (
    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.9401 9.11286C12.9401 7.8396 12.4343 6.61848 11.534 5.71815C10.6336 4.81781 9.41253 4.31201 8.13926 4.31201C6.866 4.31201 5.64488 4.81781 4.74455 5.71815C3.84422 6.61848 3.33841 7.8396 3.33841 9.11286C3.33841 14.7139 0.937988 16.3141 0.937988 16.3141H15.3405C15.3405 16.3141 12.9401 14.7139 12.9401 9.11286Z" stroke="#212B36" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.52362 19.5147C9.38294 19.7572 9.18103 19.9585 8.93809 20.0984C8.69516 20.2384 8.41972 20.312 8.13937 20.312C7.85902 20.312 7.58359 20.2384 7.34065 20.0984C7.09771 19.9585 6.8958 19.7572 6.75513 19.5147" stroke="#212B36" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {
            active && (
            <g filter="url(#filter0_d)">
              <circle cx="13.1392" cy="7.31201" r="5" fill="#FF4E4E" />
              <circle cx="13.1392" cy="7.31201" r="4.25" stroke="white" strokeWidth="1.5" />
            </g>
            )
        }

      <defs>
        <filter id="filter0_d" x="4.13916" y="0.312012" width="18" height="18" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
        </filter>
      </defs>
    </svg>
  );
}
