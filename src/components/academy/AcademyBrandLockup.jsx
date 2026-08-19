import React from 'react';
import { Link } from 'react-router-dom';

const AcademyBrandLockup = ({ compact = false, inverted = false }) => (
  <Link
    to="/academy/ia-sem-confusao"
    className="inline-flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57] focus-visible:ring-offset-4"
    aria-label="TECH HUMAN ACADEMY — IA sem Confusão"
  >
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#080809] font-extrabold text-[#d8ff57] ${
        compact ? 'h-10 w-10 text-sm' : 'h-[52px] w-[52px] text-xl'
      }`}
      aria-hidden="true"
    >
      TH
    </span>
    <span className={`flex flex-col leading-none ${inverted ? 'text-[#f4f5f7]' : 'text-[#080809]'}`}>
      <span className={`${compact ? 'text-sm' : 'text-lg'} font-extrabold tracking-tight`}>TECH HUMAN</span>
      <span className={`${compact ? 'mt-1 text-[10px]' : 'mt-1 text-sm'} font-bold tracking-[0.14em]`}>ACADEMY</span>
    </span>
  </Link>
);

export default AcademyBrandLockup;
