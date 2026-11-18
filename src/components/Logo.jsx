import React from 'react';

// Paramount Locksmiths logo. Header uses the supplied colour logo;
// the footer uses the same logo drawn in white for the dark background.
export default function Logo({ light = false }) {
  return (
    <span className="logo">
      <img
        className="logo-img"
        src={light ? '/logo-footer-white.png' : '/logo-header.png'}
        alt="Paramount Locksmiths"
        width="200"
        height="60"
      />
    </span>
  );
}
