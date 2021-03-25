import React from 'react';

export default function Analyticsicon({ active }) {
  return (

    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.4971 16.6834V6.68341" stroke={active ? '#5063FF' : '#BCBFC2'} strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.49707 16.6834V0.683411" stroke={active ? '#5063FF' : '#BCBFC2'} strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.49707 16.6834V10.6834" stroke={active ? '#5063FF' : '#BCBFC2'} strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
}
