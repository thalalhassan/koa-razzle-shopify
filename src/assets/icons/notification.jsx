import React from 'react';

function Notification(props) {
  return (
    <svg
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.383 18.9963C20.383 18.9963 17.6705 15.6413 17.6705 12.2863V9.43098C17.6705 5.50494 14.4583 2.29272 10.5322 2.29272C6.60618 2.29272 3.39397 5.50494 3.39397 9.43098V12.2863C3.39397 15.6413 0.752811 18.9249 0.681428 18.9963C0.538663 19.2104 0.467281 19.4959 0.610046 19.7815C0.752811 19.9956 0.966959 20.1384 1.25249 20.1384H19.812C20.0975 20.1384 20.3116 19.9956 20.4544 19.7101C20.5972 19.4959 20.5258 19.2104 20.383 18.9963Z"
        fill="#788C87"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.7478 21.5658C8.03333 22.7793 9.17545 23.7073 10.5317 23.7073C11.888 23.7073 12.9587 22.7793 13.3156 21.5658H7.7478Z"
        fill="#788C87"
      />
      {props.new && (
        <g filter="url(#filter0_d)">
          <circle cx="15.5322" cy="5" r="5" fill="#FF6A6A" />
          <circle
            cx="15.5322"
            cy="5"
            r="4.25"
            stroke="white"
            strokeWidth="1.5"
          />
        </g>
      )}

      <defs>
        <filter
          id="filter0_d"
          x="9.53223"
          y="0"
          width="12"
          height="12"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="0.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.956863 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}

export default Notification;
