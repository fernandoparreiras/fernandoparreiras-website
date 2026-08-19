import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { ArrowUpRight } from 'lucide-react';

const ACADEMY_URL = 'https://www.techhuman.com.br/academy/ia-sem-confusao';

const AcademyLandingPage = () => {
  useEffect(() => {
    window.location.replace(ACADEMY_URL);
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#080809] px-6 py-20 text-white">
      <Helmet>
        <html lang="pt-BR" />
        <title>IA sem Confusão | TECH HUMAN ACADEMY</title>
        <meta
          name="description"
          content="A formação IA sem Confusão agora está na plataforma TECH HUMAN ACADEMY."
        />
        <meta httpEquiv="refresh" content={`0;url=${ACADEMY_URL}`} />
        <link rel="canonical" href={ACADEMY_URL} />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <section className="w-full max-w-2xl rounded-[32px] border border-white/10 bg-[#17181b] p-8 sm:p-12">
        <p className="text-sm font-bold tracking-[0.12em] text-[#d8ff57]">TECH HUMAN ACADEMY</p>
        <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-6xl">
          A formação IA sem Confusão mudou de endereço.
        </h1>
        <p className="mt-6 text-lg leading-8 text-white/65">
          A ACADEMY agora faz parte da plataforma educacional da Tech Human. Você será
          redirecionado para a página canônica.
        </p>
        <a
          href={ACADEMY_URL}
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#d8ff57] px-6 py-4 font-bold text-[#080809]"
        >
          Acessar a formação <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
        </a>
      </section>
    </main>
  );
};

export default AcademyLandingPage;
