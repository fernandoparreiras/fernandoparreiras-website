import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Contact from '@/components/Contact';
import PageSeo from '@/components/PageSeo';
import { ROUTE_METADATA } from '@/data/siteMetadata';

const allowedIntents = new Set(['tech-human', 'advisory', 'conselho', 'palestra', 'venture', 'formacao', 'parceria']);

const ContactPage = () => {
  const [searchParams] = useSearchParams();
  const requestedIntent = searchParams.get('intent') || '';
  const defaultIntent = allowedIntents.has(requestedIntent) ? requestedIntent : '';

  return (
    <main>
      <PageSeo metadata={ROUTE_METADATA['/contato/']} />
      <Contact full defaultIntent={defaultIntent} headingLevel="h1" />
    </main>
  );
};

export default ContactPage;
