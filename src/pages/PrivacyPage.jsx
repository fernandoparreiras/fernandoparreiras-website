import React from 'react';

const PrivacyPage = () => (
  <main className="bg-[#f7f7f2] px-5 pb-24 pt-36 text-[#080809] sm:px-8 lg:px-20">
    <article className="mx-auto max-w-4xl rounded-3xl bg-white p-7 shadow-[0_28px_80px_-56px_rgba(0,0,0,0.55)] sm:p-12">
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#4e555e]">Privacidade</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl">
        Seus dados, sem letra pequena
      </h1>
      <p className="mt-6 text-lg leading-8 text-[#4e555e]">
        Esta página explica, em linguagem direta, como os dados enviados neste site são usados. O
        contato responsável é{' '}
        <a
          className="font-bold underline underline-offset-4"
          href="mailto:fernando@fernandoparreiras.com.br"
        >
          fernando@fernandoparreiras.com.br
        </a>
        .
      </p>

      <section id="academy" className="scroll-mt-28 pt-12">
        <h2 className="text-3xl font-extrabold">TECH HUMAN ACADEMY</h2>
        <p className="mt-6 text-base leading-7 text-[#2a2b2d] sm:text-lg sm:leading-8">
          A ACADEMY, suas formações e a lista de interesse são operadas no domínio da Tech Human.
          Este site pessoal não coleta inscrições para a formação. Consulte a{' '}
          <a
            className="font-bold underline underline-offset-4"
            href="https://www.techhuman.com.br/politica-de-privacidade#academy-lista-interesse"
          >
            Política de Privacidade da Tech Human
          </a>{' '}
          para conhecer finalidade, dados, retenção e direitos.
        </p>
      </section>

      <p className="mt-12 border-t border-[#080809]/10 pt-6 text-sm leading-6 text-[#4e555e]">
        Atualizado em 18 de agosto de 2026. Esta política deve ser revisada se a finalidade, os
        fornecedores ou os dados coletados neste site mudarem.
      </p>
    </article>
  </main>
);

export default PrivacyPage;
