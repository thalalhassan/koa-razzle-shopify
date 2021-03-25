import React from 'react';

export default function Checkboxicon({ checked }) {
  if (checked) {
    return (
      <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0.5" width="16" height="16" rx="3" fill="#5063FF" />
        <rect x="1" y="0.5" width="15" height="15" rx="2.5" stroke="#212B36" strokeOpacity="0.15" />
        <path d="M5.38241 8.76922C5.06106 8.50786 4.58869 8.5565 4.32733 8.87784C4.06597 9.19919 4.1146 9.67157 4.43595 9.93293L5.38241 8.76922ZM7.3784 11.3593L6.90517 11.9412L7.52999 12.4494L7.99244 11.79L7.3784 11.3593ZM12.7044 5.07127C12.9423 4.73214 12.8602 4.26442 12.521 4.02658C12.1819 3.78875 11.7142 3.87086 11.4764 4.20998L12.7044 5.07127ZM4.43595 9.93293L6.90517 11.9412L7.85163 10.7775L5.38241 8.76922L4.43595 9.93293ZM7.99244 11.79L12.7044 5.07127L11.4764 4.20998L6.76436 10.9287L7.99244 11.79Z" fill="white" />
      </svg>
    );
  }

  return (
    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="0.5" width="15" height="15" rx="2.5" fill="white" stroke="#DCE1E0" />
    </svg>

  );
}
