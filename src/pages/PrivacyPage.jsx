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

      <section id="docks" className="scroll-mt-28 pt-12">
        <h2 className="text-3xl font-extrabold">Apresentações e relacionamento</h2>
        <p className="mt-6 leading-8">Ao pedir materiais do Docks, usamos nome, e-mail, interesse e origem da apresentação para entregar o conteúdo solicitado. Empresa, atuação, desafio, prazo e telefone são coletados quando você pede uma conversa. Receber dois complementos, assinar a Carta do Fernando e solicitar contato comercial são escolhas independentes.</p>
        <p className="mt-4 leading-8">A hospedagem e a fila de entrega usam Netlify; o envio de e-mails usa Resend; o registro de pedidos e consentimentos usa o CRM Tech Human na Base44. Os dados são acessíveis apenas aos responsáveis pela operação. O CRM guarda o histórico por apresentação e uma prioridade inicial calculada a partir das informações declaradas, com revisão humana. A classificação não impede acesso a materiais.</p>
        <p className="mt-4 leading-8">Os registros de entrega e os eventos anônimos no site são apagados após 30 dias, na próxima execução da rotina de limpeza. Um identificador protegido do e-mail mantém o cancelamento dos complementos para pedidos anteriores. O histórico de relacionamento no CRM é mantido enquanto necessário para atender os pedidos e acompanhar a relação. Você pode pedir acesso, correção, exclusão ou cancelamento da Carta e do contato comercial pelo e-mail acima. Os complementos do Docks podem ser cancelados pelo link dos e-mails.</p>
        <p className="mt-4 leading-8">Links de campanha identificam evento e apresentação. Os eventos de navegação desta experiência não incluem nome, e-mail, telefone ou texto do seu desafio. Não usamos abertura de e-mail para pontuar seu interesse.</p>
      </section>

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
        Atualizado em 2 de outubro de 2026. Esta política deve ser revisada se a finalidade, os
        fornecedores ou os dados coletados neste site mudarem.
      </p>
    </article>
  </main>
);

export default PrivacyPage;
