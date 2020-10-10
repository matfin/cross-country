import React from 'react';

interface Props {
  className?: string;
}

export const Bin = ({ className }: Props): JSX.Element => (
  <svg
    className={className}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    viewBox="0 0 32 32"
    xmlSpace="preserve"
  >
    <path d="M20,9h-8V7c0-2.2,1.8-4,4-4h0c2.2,0,4,1.8,4,4V9z" />
    <path d="M8,14v13c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V14h2v-3c0-1.1-0.9-2-2-2H8c-1.1,0-2,0.9-2,2v3h18" />
    <line x1="13" y1="19" x2="13" y2="24" />
    <line x1="19" y1="19" x2="19" y2="24" />
  </svg>
);
