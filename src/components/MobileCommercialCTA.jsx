import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { trackEvent } from '@/lib/analytics';

const MobileCommercialCTA = () => {
  const location = useLocation();
  if (location.pathname === '/contato' || location.pathname.startsWith('/academy/')) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/95 p-3 backdrop-blur-md lg:hidden">
      <Link
        to="/contato"
        onClick={() => trackEvent('hero_cta_click', { cta: 'mobile_sticky', destination: 'contato' })}
        className="flex min-h-12 items-center justify-center gap-2 bg-[#d8ff57] px-5 font-black text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        Falar sobre um desafio
      </Link>
    </div>
  );
};

export default MobileCommercialCTA;

