import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPage = () => (
  <main className="bg-[#f7f7f2] px-5 pb-24 pt-36 text-[#080809] sm:px-8 lg:px-20">
    <Helmet>
      <html lang="pt-BR" />
      <title>Privacidade | Fernando Parreiras</title>
      <meta
        name="description"
        content="Informações sobre o uso de dados pessoais no site de Fernando Parreiras e na lista de interesse da TECH HUMAN ACADEMY."
      />
      <link rel="canonical" href="https://www.fernandoparreiras.com.br/privacidade" />
    </Helmet>

    <article className="mx-auto max-w-4xl rounded-3xl bg-white p-7 shadow-[0_28px_80px_-56px_rgba(0,0,0,0.55)] sm:p-12">
      <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#4e555e]">Privacidade</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.025em] sm:text-5xl">Seus dados, sem letra pequena</h1>
      <p className="mt-6 text-lg leading-8 text-[#4e555e]">
        Esta página explica, em linguagem direta, como os dados enviados neste site são usados. A operação é conduzida por Fernando Parreiras, responsável pela TECH HUMAN ACADEMY, com contato em{' '}
        <a className="font-bold underline underline-offset-4" href="mailto:fernando@fernandoparreiras.com.br">
          fernando@fernandoparreiras.com.br
        </a>.
      </p>

      <section id="academy-lista-interesse" className="scroll-mt-28 pt-12">
        <h2 className="text-3xl font-extrabold">Lista de interesse — IA sem Confusão</h2>
        <div className="mt-6 space-y-7 text-base leading-7 text-[#2a2b2d] sm:text-lg sm:leading-8">
          <div>
            <h3 className="font-extrabold text-[#080809]">Quais dados são coletados</h3>
            <p className="mt-2">
              Nome e e-mail são obrigatórios. Cidade e principal dúvida sobre IA são opcionais. A infraestrutura de hospedagem também pode processar dados técnicos de segurança, como data, horário, endereço IP e registros de acesso.
            </p>
          </div>

          <div>
            <h3 className="font-extrabold text-[#080809]">Para qual finalidade</h3>
            <p className="mt-2">
              Usaremos os dados somente para registrar o interesse e enviar informações operacionais da primeira turma — como data, local, investimento, condições e eventual confirmação de inscrição. A lista não autoriza newsletter genérica nem mensagens sobre outros produtos.
            </p>
          </div>

          <div>
            <h3 className="font-extrabold text-[#080809]">Base e compartilhamento</h3>
            <p className="mt-2">
              O tratamento se baseia no consentimento informado no formulário. Os dados podem ser processados pela Hostinger, fornecedora da hospedagem e do backend integrado, apenas para viabilizar armazenamento, segurança e envio operacional. Não vendemos dados nem os compartilhamos para publicidade de terceiros.
            </p>
          </div>

          <div>
            <h3 className="font-extrabold text-[#080809]">Por quanto tempo</h3>
            <p className="mt-2">
              Os registros serão mantidos por até 12 meses após o envio ou por período menor, se a finalidade terminar antes. Depois disso, serão excluídos ou anonimizados, salvo quando houver outra base legal aplicável ou um novo consentimento.
            </p>
          </div>

          <div>
            <h3 className="font-extrabold text-[#080809]">Seus direitos</h3>
            <p className="mt-2">
              Você pode solicitar confirmação, acesso, correção, exclusão, informações sobre compartilhamento ou revogar o consentimento sem custo. Envie o pedido para{' '}
              <a className="font-bold underline underline-offset-4" href="mailto:fernando@fernandoparreiras.com.br?subject=Privacidade%20%E2%80%94%20lista%20de%20interesse">
                fernando@fernandoparreiras.com.br
              </a>. A revogação não invalida o tratamento realizado antes do pedido.
            </p>
          </div>

          <div>
            <h3 className="font-extrabold text-[#080809]">Medição e mudanças</h3>
            <p className="mt-2">
              Nesta etapa, a página da ACADEMY não adota ferramentas adicionais de rastreamento para campanhas. Se o tratamento mudar, este aviso e o consentimento serão revisados antes de ampliar o uso dos dados.
            </p>
          </div>
        </div>
      </section>

      <p className="mt-12 border-t border-[#080809]/10 pt-6 text-sm leading-6 text-[#4e555e]">
        Atualizado em 18 de agosto de 2026. Esta é a configuração operacional da lista de interesse e deve ser revisada se a finalidade, os fornecedores ou os dados coletados mudarem.
      </p>
    </article>
  </main>
);

export default PrivacyPage;
