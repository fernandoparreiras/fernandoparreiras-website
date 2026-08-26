import React from 'react';
import { Link } from 'react-router-dom';

const ArticleTags = ({ tags, onTagClick, className = '' }) => (
  <div className={`flex flex-wrap gap-2 ${className}`} aria-label="Tags do artigo">
    {tags.map((tag) => (
      <Link
        key={tag}
        to={`/artigos/?tag=${encodeURIComponent(tag)}`}
        onClick={() => onTagClick?.(tag)}
        className="border border-white/15 px-3 py-1.5 text-xs text-white/65 transition-colors hover:border-[#d8ff57]/70 hover:text-[#d8ff57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57]"
      >
        #{tag.replaceAll(' ', '-')}
      </Link>
    ))}
  </div>
);

export default ArticleTags;
