import React from 'react';

const InitiativeLogo = ({ item }) => (
  <div className="flex h-36 items-center justify-center gap-4 border-b border-white/10 pb-6">
    {item.logo.symbol && (
      <img
        src={item.logo.symbol}
        alt=""
        width="768"
        height="755"
        className="h-16 w-16 shrink-0 object-contain"
        loading="lazy"
        decoding="async"
      />
    )}
    <img
      src={item.logo.src}
      alt={`Logo ${item.name}`}
      width={item.logo.width}
      height={item.logo.height}
      className={item.logo.surface === 'light'
        ? 'h-24 w-24 rounded-xl bg-[#d8ff57] p-3 object-contain'
        : 'max-h-24 min-w-0 max-w-[14rem] flex-1 object-contain'}
      loading="lazy"
      decoding="async"
    />
  </div>
);

export default InitiativeLogo;
