import React from 'react';
import { BUSINESS } from '../data.js';

// Transparent PNG logo. It sits directly on the cream page, so no background chip is needed.
export default function Logo() {
  return <img className="brand-logo" src="/logo.png" alt={BUSINESS.name} width="1400" height="434" />;
}
