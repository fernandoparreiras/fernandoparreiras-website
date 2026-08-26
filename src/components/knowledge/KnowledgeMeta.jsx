import React from 'react';
import { CalendarDays, Clock3 } from 'lucide-react';
import { getTrack } from '@/data/articles';

const formatDate = (date) => new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
}).format(new Date(`${date}T12:00:00Z`));

const KnowledgeMeta = ({ article, compact = false }) => {
  const track = getTrack(article.track);

  return (
    <div className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-white/55 ${compact ? 'text-xs' : 'text-sm'}`}>
      <span className="font-semibold uppercase tracking-[0.18em] text-[#d8ff57]">
        {track?.shortLabel}
      </span>
      <span>{article.category}</span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
        {article.readingMinutes} min
      </span>
      <span className="inline-flex items-center gap-1.5">
        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
        {formatDate(article.publishedAt)}
      </span>
    </div>
  );
};

export default KnowledgeMeta;
