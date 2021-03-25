import React from 'react';

export default function Weeklyicon({ active }) {
  return (
    <svg
      width="43"
      height="42"
      viewBox="0 0 43 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M41.0591 13.7273V41H1.05908V13.7273"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.05908 4.63635H41.0591V13.7273H1.05908V4.63635Z"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.0591 1V8.27273"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.15 1V8.27273"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M31.9682 1V8.27273"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <mask id="path-6-inside-1" fill="white">
        <rect x="8.26556" y="22.8182" width="7.27225" height="9.09091" rx="1" />
      </mask>
      <rect
        x="8.26556"
        y="22.8182"
        width="7.27225"
        height="9.09091"
        rx="1"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="3"
        mask="url(#path-6-inside-1)"
      />
      <mask id="path-7-inside-2" fill="white">
        <rect x="14.6288" y="22.8182" width="7.27225" height="9.09091" rx="1" />
      </mask>
      <rect
        x="14.6288"
        y="22.8182"
        width="7.27225"
        height="9.09091"
        rx="1"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="3"
        mask="url(#path-7-inside-2)"
      />
      <mask id="path-8-inside-3" fill="white">
        <rect x="21.0582" y="22.8182" width="7.27225" height="9.09091" rx="1" />
      </mask>
      <rect
        x="21.0582"
        y="22.8182"
        width="7.27225"
        height="9.09091"
        rx="1"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="3"
        mask="url(#path-8-inside-3)"
      />
      <mask id="path-9-inside-4" fill="white">
        <rect x="27.566" y="22.8182" width="7.27225" height="9.09091" rx="1" />
      </mask>
      <rect
        x="27.566"
        y="22.8182"
        width="7.27225"
        height="9.09091"
        rx="1"
        stroke={active ? '#5063FF' : '#9BA0A5'}
        strokeWidth="3"
        mask="url(#path-9-inside-4)"
      />
    </svg>
  );
}
