import React from 'react';

// Paramount Locksmiths logo. The dark version sits on the light header;
// the white version is shown in the dark footer (see .logo-img rules in styles.css).
export default function Logo() {
  return (
    <span className="logo">
      <img
        className="logo-img logo-img--dark"
        src="/logo-dark.png"
        alt="Paramount Locksmiths"
        width="193"
        height="80"
      />
      <img
        className="logo-img logo-img--light"
        src="/logo-light.png"
        alt=""
        aria-hidden="true"
        width="193"
        height="80"
      />
    </span>
  );
}
