import React from 'react';

function ScheduleIcon({ active }) {
  return (

    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.7648 2.28339H2.56484C1.68119 2.28339 0.964844 2.99973 0.964844 3.88339V15.0834C0.964844 15.967 1.68119 16.6834 2.56484 16.6834H13.7648C14.6485 16.6834 15.3648 15.967 15.3648 15.0834V3.88339C15.3648 2.99973 14.6485 2.28339 13.7648 2.28339Z" stroke={active ? '#5063FF' : '#BCBFC2'} strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.3652 0.683411V3.88341" stroke={active ? '#5063FF' : '#BCBFC2'} strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.96484 0.683411V3.88341" stroke={active ? '#5063FF' : '#BCBFC2'} strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M0.964844 7.08344H15.3648" stroke={active ? '#5063FF' : '#BCBFC2'} strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
}

export default ScheduleIcon;
