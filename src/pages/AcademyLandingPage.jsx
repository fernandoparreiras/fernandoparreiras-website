import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowRight, Check, Laptop, ShieldCheck, X } from 'lucide-react';
import AcademyBrandLockup from '@/components/academy/AcademyBrandLockup';
import AcademyInterestForm from '@/components/academy/AcademyInterestForm';

const outcomes = [
  ['01 · CAPACIDADE', 'Entender', 'Diferencie modelo, ferramenta, chatbot, busca, automação e agente.'],
  ['02 · CAPACIDADE', 'Escolher', 'Relacione uma tarefa comum ao tipo de ferramenta mais adequado.'],
  ['03 · CAPACIDADE', 'Pedir', 'Use objetivo, contexto seguro, critérios, formato e iteração.'],
  ['04 · CAPACIDADE', 'Conferir', 'Verifique fontes, erros, privacidade e necessidade de revisão humana.'],
  ['05 · CAPACIDADE', 'Aplicar', 'Trabalhe uma tarefa segura e registre um plano de prática de sete dias.']
];

const learningLoop = [
  ['01', 'CONCEITO', 'Um mapa curto'],
  ['02', 'DEMONSTRAÇÃO', 'Um exemplo visível'],
  ['03', 'PRÁTICA', 'Uma tarefa sua'],
  ['04', 'REFLEXÃO', 'Critérios e limites'],
  ['05', 'CONTINUIDADE', 'Plano de sete dias']
];

const program = [
  ['01', 'Um mapa para começar', 'O que é IA generativa e por que os nomes confundem.'],
  ['02', 'Ferramenta certa para a tarefa', 'Chatbot, busca, automação e agente.'],
  ['03', 'Pedidos mais claros', 'Objetivo, contexto, critérios, formato e iteração.'],
  ['04', 'Respostas que exigem cuidado', 'Erro, fonte, privacidade e revisão humana.'],
  ['05', 'Aplicação acompanhada', 'Uma tarefa sua, feedback e plano de continuidade.']
];

const faqs = [
  ['Preciso já ter usado ChatGPT ou outra IA?', 'Não. Os conceitos de entrada fazem parte da formação.'],
  ['Preciso saber programar ou inglês?', 'Não. As atividades de entrada não exigem programação nem inglês.'],
  ['Preciso assinar uma ferramenta paga?', 'Não. O núcleo terá opções gratuitas; os acessos serão confirmados antes da turma.'],
  ['Preciso levar notebook?', 'Sim. O notebook é necessário para as práticas. Celular pode apoiar, mas não substitui a experiência principal.'],
  ['Vou aprender agentes e automações?', 'Você entenderá as diferenças e os limites. A construção de agentes, APIs e automações complexas pertence a formações posteriores.'],
  ['Há certificado?', 'A nomenclatura e os critérios serão informados antes da inscrição. Ele não será divulgado como formação profissional reconhecida pelo MEC.'],
  ['Quando saberei data, local e investimento?', 'Quando a operação estiver confirmada. Quem estiver na lista receberá as informações completas antes de qualquer decisão de compra.']
];

const InterestLink = ({ children, dark = false }) => (
  <a
    href="#interesse"
    className={`inline-flex items-center justify-center gap-3 rounded-full px-6 py-3.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8ff57] focus-visible:ring-offset-4 ${
      dark ? 'bg-[#080809] text-[#f4f5f7] hover:bg-[#2a2b2d]' : 'bg-[#d8ff57] text-[#080809] hover:bg-[#c8ef48]'
    }`}
  >
    {children}
    <ArrowRight className="h-4 w-4" aria-hidden="true" />
  </a>
);

const AcademyLandingPage = () => (
  <div className="academy-page min-h-screen bg-[#f7f7f2] font-academy text-[#080809]">
    <Helmet>
      <html lang="pt-BR" />
      <title>IA sem Confusão | TECH HUMAN ACADEMY</title>
      <meta
        name="description"
        content="Formação presencial e introdutória para entender as diferenças da IA e aplicar um processo seguro no dia a dia e no trabalho."
      />
      <link rel="canonical" href="https://www.fernandoparreiras.com.br/academy/ia-sem-confusao" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:title" content="IA sem Confusão — Fundamentos para o dia a dia e o trabalho" />
      <meta property="og:description" content="Entenda a IA e aprenda a usá-la com mais clareza no dia a dia e no trabalho." />
      <meta property="og:url" content="https://www.fernandoparreiras.com.br/academy/ia-sem-confusao" />
      <meta property="og:image" content="https://www.fernandoparreiras.com.br/academy-ia-sem-confusao-og.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="TECH HUMAN ACADEMY — IA sem Confusão, fundamentos para o dia a dia e o trabalho" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="IA sem Confusão | TECH HUMAN ACADEMY" />
      <meta name="twitter:description" content="Fundamentos para o dia a dia e o trabalho." />
      <meta name="twitter:image" content="https://www.fernandoparreiras.com.br/academy-ia-sem-confusao-og.png" />
    </Helmet>

    <a
      href="#conteudo"
      className="sr-only z-[100] rounded-lg bg-[#080809] px-4 py-3 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Ir para o conteúdo
    </a>

    <header className="sticky top-0 z-50 border-b border-[#080809]/10 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-24 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-20" aria-label="Navegação da formação">
        <AcademyBrandLockup compact />
        <div className="hidden items-center gap-7 lg:flex">
          <a className="text-sm font-bold text-[#4e555e] hover:text-[#080809]" href="#aprendizado">O que você aprende</a>
          <a className="text-sm font-bold text-[#4e555e] hover:text-[#080809]" href="#metodo">Como funciona</a>
          <a className="text-sm font-bold text-[#4e555e] hover:text-[#080809]" href="#programa">Programa</a>
          <a className="text-sm font-bold text-[#4e555e] hover:text-[#080809]" href="#duvidas">Dúvidas</a>
        </div>
        <InterestLink dark>Receber informações</InterestLink>
      </nav>
    </header>

    <main id="conteudo">
      <section className="overflow-hidden bg-[#080809] text-[#f4f5f7]" data-figma-node="43:15">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-20 lg:py-24">
          <div>
            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#17181b] px-4 py-2 text-[11px] font-bold tracking-[0.08em] text-[#f4f5f7] sm:text-xs">
              <span className="h-2 w-2 shrink-0 rounded-full bg-[#d8ff57]" aria-hidden="true" />
              FORMAÇÃO PRESENCIAL EM IA · NÍVEL INICIANTE
            </div>
            <h1 className="mt-7 text-5xl font-black leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              Entenda a IA.<br />
              <span className="text-[#d8ff57]">Use com mais clareza.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#a7adb7] sm:text-xl">
              IA sem Confusão organiza o que realmente importa para você diferenciar ferramentas, fazer pedidos mais claros, conferir respostas e proteger seus dados — no dia a dia e no trabalho.
            </p>
            <div className="mt-8">
              <InterestLink>Quero receber informações da primeira turma</InterestLink>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#a7adb7]">
              Sem compromisso de compra. Data, local, investimento e condições serão enviados quando confirmados.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-[#f4f5f7]">
              {['8 horas presenciais', 'Sem programação', 'Opções gratuitas', 'Notebook próprio'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d8ff57]" aria-hidden="true" /> {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-[#17181b] p-6 sm:p-10">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Um mapa para começar</h2>
            <div className="mt-6 space-y-4">
              {[
                ['01 · ESCOLHER', 'Que tipo de ferramenta serve à tarefa?'],
                ['02 · PEDIR', 'Qual objetivo, contexto, critério e formato?'],
                ['03 · CONFERIR', 'O que precisa de fonte, cuidado ou revisão humana?']
              ].map(([label, text], index) => (
                <div key={label} className={`rounded-2xl p-5 ${index === 1 ? 'bg-[#d8ff57] text-[#080809]' : 'bg-[#080809]'}`}>
                  <p className={`text-xs font-bold ${index === 1 ? 'text-[#080809]' : 'text-[#a7adb7]'}`}>{label}</p>
                  <p className="mt-2 text-lg font-bold leading-7">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#d8ff57] px-5 py-20 text-center sm:px-8 lg:py-24" data-figma-node="44:11">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold tracking-[0.1em]">O PROBLEMA NÃO É FALTA DE FERRAMENTA</p>
          <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-[-0.025em] sm:text-5xl">
            Você não precisa acompanhar toda novidade.<br />Precisa de um mapa para decidir.
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-8">
            ChatGPT, Gemini, Claude, Copilot, modelos, buscas, automações e agentes parecem parte da mesma coisa. A formação organiza essas diferenças sem fazer você se sentir atrasado.
          </p>
        </div>
      </section>

      <section id="aprendizado" className="scroll-mt-28 bg-[#f7f7f2] px-5 py-20 sm:px-8 lg:px-20 lg:py-24" data-figma-node="44:15">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-sm font-bold tracking-[0.1em] text-[#4e555e]">AO FINAL, VOCÊ TERÁ PRATICADO</p>
          <h2 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight tracking-[-0.025em] sm:text-5xl">Cinco capacidades para continuar aprendendo</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {outcomes.map(([kicker, title, body]) => (
              <article key={title} className="min-h-64 rounded-3xl bg-white p-8">
                <p className="text-xs font-bold tracking-[0.06em] text-[#4e555e]">{kicker}</p>
                <h3 className="mt-4 text-3xl font-extrabold">{title}</h3>
                <p className="mt-4 text-lg leading-7 text-[#4e555e]">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="metodo" className="scroll-mt-28 bg-[#080809] px-5 py-20 text-[#f4f5f7] sm:px-8 lg:px-20 lg:py-24" data-figma-node="44:39">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-sm font-bold tracking-[0.1em] text-[#d8ff57]">COMO FUNCIONA</p>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-[-0.025em] sm:text-5xl">Pouca palestra contínua. Mais prática acompanhada.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {learningLoop.map(([number, label, body], index) => (
              <article key={label} className={`rounded-2xl p-6 ${index === 2 ? 'bg-[#d8ff57] text-[#080809]' : 'bg-[#17181b]'}`}>
                <p className="text-3xl font-extrabold">{number}</p>
                <p className={`mt-5 text-xs font-bold tracking-[0.08em] ${index === 2 ? '' : 'text-[#d8ff57]'}`}>{label}</p>
                <p className={`mt-3 leading-6 ${index === 2 ? '' : 'text-[#a7adb7]'}`}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="programa" className="scroll-mt-28 bg-white px-5 py-20 sm:px-8 lg:px-20 lg:py-24" data-figma-node="45:26">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold tracking-[0.1em] text-[#4e555e]">PROGRAMA EM LINGUAGEM SIMPLES</p>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-[-0.025em] sm:text-5xl">Do primeiro mapa à sua tarefa</h2>
          <div className="mt-10 divide-y divide-[#080809]/10">
            {program.map(([number, title, body]) => (
              <article key={number} className="grid gap-4 py-7 sm:grid-cols-[64px_1fr] sm:gap-7">
                <p className="text-3xl font-extrabold text-[#b2d622]">{number}</p>
                <div>
                  <h3 className="text-2xl font-bold">{title}</h3>
                  <p className="mt-2 text-lg leading-7 text-[#4e555e]">{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f2] px-5 py-20 sm:px-8 lg:px-20 lg:py-24" data-figma-node="45:54">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.025em] sm:text-5xl">Para quem é — e para quem não é</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl bg-white p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d8ff57]"><Check className="h-6 w-6" aria-hidden="true" /></div>
              <h3 className="mt-6 text-3xl font-extrabold">É para você</h3>
              <p className="mt-5 text-lg leading-8 text-[#4e555e]">Nunca usou IA; fez testes soltos; quer aplicar no cotidiano, nos estudos ou no trabalho; precisa de fundamentos antes de especializações.</p>
            </article>
            <article className="rounded-3xl bg-[#080809] p-8 text-[#f4f5f7] sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#17181b]"><X className="h-6 w-6 text-[#d8ff57]" aria-hidden="true" /></div>
              <h3 className="mt-6 text-3xl font-extrabold">Não é esta formação</h3>
              <p className="mt-5 text-lg leading-8 text-[#a7adb7]">Quer construir agentes, APIs ou automações complexas; já é intermediário; busca governança corporativa completa ou resultado financeiro garantido.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#d8ff57] px-5 py-20 sm:px-8 lg:px-20" data-figma-node="45:63">
        <div className="mx-auto grid max-w-5xl gap-7 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#080809] text-[#d8ff57]"><Laptop className="h-9 w-9" aria-hidden="true" /></div>
          <div>
            <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.025em] sm:text-5xl">Você pode começar do zero.</h2>
            <p className="mt-5 text-lg leading-8 sm:text-xl">Não precisa ter experiência com IA, saber programar, conhecer inglês ou assinar uma ferramenta paga. Precisa saber usar navegador e e-mail, trazer notebook e uma tarefa com dados públicos, fictícios ou anonimizados.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#17181b] px-5 py-20 text-[#f4f5f7] sm:px-8 lg:px-20">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#080809] text-[#d8ff57]"><ShieldCheck className="h-9 w-9" aria-hidden="true" /></div>
          <div>
            <p className="text-sm font-bold tracking-[0.1em] text-[#d8ff57]">COM FERNANDO PARREIRAS</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">Tecnologia, produtos, negócios e aplicação responsável de IA.</h2>
            <p className="mt-4 text-lg leading-8 text-[#a7adb7]">A facilitação organiza conceitos sem infantilizar o iniciante e acompanha a aplicação em uma tarefa real e segura.</p>
          </div>
        </div>
      </section>

      <section id="duvidas" className="scroll-mt-28 bg-white px-5 py-20 sm:px-8 lg:px-20 lg:py-24" data-figma-node="45:66">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.025em] sm:text-5xl">Dúvidas sem letra pequena</h2>
          <div className="mt-10 divide-y divide-[#080809]/10 border-y border-[#080809]/10">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left text-lg font-bold text-[#080809] marker:content-none sm:text-xl">
                  {question}
                  <span className="text-2xl leading-none text-[#b2d622] transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-4 max-w-3xl text-base leading-7 text-[#4e555e] sm:text-lg">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="interesse" className="scroll-mt-24 bg-[#080809] px-5 py-20 text-[#f4f5f7] sm:px-8 lg:px-20 lg:py-24" data-figma-node="45:89">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-bold tracking-[0.1em] text-[#d8ff57]">PRIMEIRA TURMA</p>
            <h2 className="mt-5 text-4xl font-extrabold leading-tight tracking-[-0.025em] sm:text-5xl">A informação completa vem antes da decisão.</h2>
            <p className="mt-6 text-lg leading-8 text-[#a7adb7]">Data, local, investimento, capacidade e política serão apresentados juntos antes de qualquer pagamento.</p>
            <div className="mt-8 rounded-2xl border border-white/10 bg-[#17181b] p-5 text-sm leading-6 text-[#a7adb7]">
              <p className="font-bold text-[#f4f5f7]">Esta página não vende vagas.</p>
              <p className="mt-2">Ela registra interesse para que você receba as condições reais quando a operação estiver confirmada.</p>
            </div>
          </div>
          <AcademyInterestForm />
        </div>
      </section>
    </main>

    <footer className="bg-white px-5 py-7 sm:px-8 lg:px-20">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <AcademyBrandLockup compact />
        <div className="text-sm leading-6 text-[#4e555e] sm:text-right">
          <p>ACADEMY · formação em IA com Fernando Parreiras</p>
          <p className="mt-1"><a className="font-bold underline underline-offset-4" href="mailto:fernando@fernandoparreiras.com.br">Contato</a> · <a className="font-bold underline underline-offset-4" href="/privacidade#academy-lista-interesse">Privacidade</a></p>
        </div>
      </div>
    </footer>
  </div>
);

export default AcademyLandingPage;
