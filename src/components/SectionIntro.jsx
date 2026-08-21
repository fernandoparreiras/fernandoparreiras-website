import React from 'react';

const SectionIntro = ({ eyebrow, title, highlight, description, align = 'left', id, headingLevel = 'h2' }) => {
  const Heading = headingLevel;

  return (
    <div className={align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}>
      <div className={`mb-5 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="h-px w-10 bg-[#d8ff57]" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#d8ff57]">{eyebrow}</span>
      </div>
      <Heading id={id} className="text-4xl font-black leading-[1.02] tracking-tight text-white md:text-5xl lg:text-6xl">
        {title}{' '}
        {highlight && <span className="text-[#d8ff57]">{highlight}</span>}
      </Heading>
      {description && (
        <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-white/65 ${align === 'center' ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionIntro;
