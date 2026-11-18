import React from 'react';

// Paramount logo: transparent PNG (public/logo.png). The footer wraps it in a light chip so it stays readable on black.
export function LogoMark({ size = 52 }) {
  return <img src="/logo.png" alt="Paramount Locksmiths logo" width={size * 3} height={Math.round(size * 3 * 537 / 1400)} className="logo-mark" />;
}

export default function Logo() {
  return <span className="logo"><img src="/logo.png" alt="Paramount Locksmiths" width="1400" height="537" className="logo-img" /></span>;
}
