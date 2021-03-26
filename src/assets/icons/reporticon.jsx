import React from 'react';

export default function Reportsicon({ active }) {
  return (

    <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.67188 0.683411H2.27188C1.84753 0.683411 1.44056 0.851982 1.1405 1.15204C0.840446 1.4521 0.671875 1.85906 0.671875 2.28341V15.0834C0.671875 15.5078 0.840446 15.9147 1.1405 16.2148C1.44056 16.5148 1.84753 16.6834 2.27188 16.6834H11.8719C12.2962 16.6834 12.7032 16.5148 13.0032 16.2148C13.3033 15.9147 13.4719 15.5078 13.4719 15.0834V5.48341L8.67188 0.683411Z" stroke={active ? '#5063FF' : '#BCBFC2'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.67188 0.683411V5.48341H13.4719" stroke={active ? '#5063FF' : '#BCBFC2'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.2721 9.4834H3.87207" stroke={active ? '#5063FF' : '#BCBFC2'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.2721 12.6834H3.87207" stroke={active ? '#5063FF' : '#BCBFC2'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.47207 6.28339H4.67207H3.87207" stroke={active ? '#5063FF' : '#BCBFC2'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
}
