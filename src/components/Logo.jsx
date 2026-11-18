import React from 'react';
import { BUSINESS } from '../data.js';

// The logo sits on a white chip so it reads on both the white header and the navy footer.
export default function Logo() {
  return (
    <span className="logo-chip">
      <img src="/logo.png" alt={BUSINESS.name} width="1200" height="522" />
    </span>
  );
}
