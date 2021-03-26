import React from 'react';

export default function Deleteicon({ active }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      {/* <path
        d="M1 4.20001H2.6H15.4"
        stroke={active ? '#5063FF' : '#212B36'}
        strokeOpacity="0.75"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.99998 4.2V2.6C4.99998 2.17565 5.16855 1.76869 5.46861 1.46863C5.76866 1.16857 6.17563 1 6.59998 1H9.79998C10.2243 1 10.6313 1.16857 10.9313 1.46863C11.2314 1.76869 11.4 2.17565 11.4 2.6V4.2M13.8 4.2V15.4C13.8 15.8243 13.6314 16.2313 13.3313 16.5314C13.0313 16.8314 12.6243 17 12.2 17H4.19998C3.77563 17 3.36866 16.8314 3.0686 16.5314C2.76855 16.2313 2.59998 15.8243 2.59998 15.4V4.2H13.8Z"
        stroke={active ? '#5063FF' : '#212B36'}
        strokeOpacity="0.75"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.59998 8.20001V13"
        stroke={active ? '#5063FF' : '#212B36'}
        strokeOpacity="0.75"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.79999 8.20001V13"
        stroke={active ? '#5063FF' : '#212B36'}
        strokeOpacity="0.75"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      /> */}
      <path
        d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z"
        stroke={active ? '#5063FF' : '#212B36'}
      />
      <path
        d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"
        stroke={active ? '#5063FF' : '#212B36'}
      />
      <path
        d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"
        stroke={active ? '#5063FF' : '#212B36'}
      />
      <path
        d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z"
        stroke={active ? '#5063FF' : '#212B36'}
      />
    </svg>
  );
}