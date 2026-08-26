import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ArticleTags from '@/components/knowledge/ArticleTags';
import KnowledgeMeta from '@/components/knowledge/KnowledgeMeta';
import { trackKnowledgeEvent } from '@/lib/knowledge-analytics';

const ArticleCard = ({ article }) => {
  const href = `/artigos/${article.slug}/`;

  const trackClick = () => {
    trackKnowledgeEvent('article_result_click', {
      slug: article.slug,
      track: article.track,
    });
  };

  return (
    <article className="group flex h-full flex-col border border-white/10 bg-[#111214] p-6 transition-colors hover:border-[#d8ff57]/40 md:p-7">
      <KnowledgeMeta article={article} compact />
      <h2 className="mt-5 text-2xl font-bold leading-tight text-white md:text-[1.7rem]">
        <Link to={href} onClick={trackClick} className="transition-colors group-hover:text-[#d8ff57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57]">
          {article.title}
        </Link>
      </h2>
      <p className="mt-4 flex-1 text-base font-light leading-relaxed text-white/65">
        {article.excerpt}
      </p>
      <ArticleTags tags={article.tags} className="mt-6" />
      <Link
        to={href}
        onClick={trackClick}
        className="mt-7 inline-flex items-center gap-2 self-start text-sm font-semibold text-white transition-colors hover:text-[#d8ff57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57]"
      >
        Ler artigo
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  );
};

export default ArticleCard;
