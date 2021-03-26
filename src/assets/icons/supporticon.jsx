import React from 'react';

export default function Supporticon({ active }) {
  return (

    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16.6834C13.4183 16.6834 17 13.1017 17 8.68341C17 4.26513 13.4183 0.683411 9 0.683411C4.58172 0.683411 1 4.26513 1 8.68341C1 13.1017 4.58172 16.6834 9 16.6834Z" stroke={active ? '#5063FF' : '#BCBFC2'} strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.67188 6.28345C6.85996 5.74879 7.2312 5.29794 7.71984 5.01076C8.20848 4.72358 8.78299 4.6186 9.34162 4.71442C9.90024 4.81024 10.4069 5.10067 10.7719 5.53427C11.1369 5.96788 11.3367 6.51667 11.3359 7.08345C11.3359 8.68345 8.93587 9.48345 8.93587 9.48345" stroke={active ? '#5063FF' : '#BCBFC2'} strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12.6834H9.008" stroke={active ? '#5063FF' : '#BCBFC2'} strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>

  );
}
