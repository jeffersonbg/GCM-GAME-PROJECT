import React, { useState } from "react";
// Componentes
import Header from "./components/Header";
import CardDev from "./components/CardDev";
import FormularioCadastro from "./components/FormularioCadastro";
import FormularioLogin from "./components/FormularioLogin";
import MenuGame from "./components/MenuGame";
import Playing from "./components/Playing";
import Introducao from "./components/Introducao";
import Floresta from "./components/Floresta";
import Fases from "./components/Fases";
import QuizDaFase from "./components/QuizDaFase";
import FeedbackResposta from "./components/FeedbackResposta";
import GameOver from "./components/GameOver";

// Dados
import perguntas from "./data/perguntas";

// Constantes
const mockData = perguntas;
const QUESTOESPORFASE = 3;

// Definição das telas do jogo
const GAME_SCREENS = {
  LOGIN: "login",
  MENU: "menu",
  PLAYING: "playing",
  INTRODUCAO: "introducao",
  FLORESTA: "floresta",
  FASES: "fases",
  QUIZ: "quiz",
  FEEDBACK: "feedback",
  GAME_OVER: "game_over",
  CREATE_ACCOUNT: "create_account",
};

function App() {
  // ------------------------------------
  // 1. Estados de Navegação e Jogo
  // ------------------------------------
  const [currentScreen, setCurrentScreen] = useState(GAME_SCREENS.LOGIN);
  const [currentFaseId, setCurrentFaseId] = useState(1);
  
  // ------------------------------------
  // 2. Estados do Quiz (Legado/Playing)
  // ------------------------------------
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null); // Feedback da resposta

  // ------------------------------------
  // 3. Estados de Pontuação e Progresso
  // ------------------------------------
  const [score, setScore] = useState(0);
  const [fasesCompletas, setFasesCompletas] = useState([]);
  const [jogoCompleto, setJogoCompleto] = useState(false);

  // ------------------------------------
  // 4. Variáveis Derivadas (Opcional, mas útil para clareza)
  // ------------------------------------
  const currentQuestion = mockData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mockData.length - 1;

  // ------------------------------------
  // 5. Funções de Lógica do Jogo
  // ------------------------------------

  /**
   * Retorna as perguntas para uma fase específica.
   * @param {number} faseId - O ID da fase (1, 2, 3...).
   * @returns {Array} As perguntas correspondentes.
   */
  const getPerguntasFase = (faseId) => {
    const inicio = (faseId - 1) * QUESTOESPORFASE;
    const fim = inicio + QUESTOESPORFASE;
    return perguntas.slice(inicio, fim);
  };

  /**
   * Função de callback chamada após a conclusão de um QuizDaFase.
   * Atualiza a pontuação, o progresso das fases e a navegação.
   * @param {{acertos: number, faseId: number}} res - Objeto com acertos e ID da fase.
   */
  const handleFaseConcluida = ({ acertos, total, faseId }) => {
    // Atualiza Score apenas se a fase não foi completada ainda
    if (!fasesCompletas.includes(faseId) && acertos > total / 2) {
      setScore((prev) => prev + acertos * 10);
      
      // Registra Fase Completa
      const novasFasesCompletas = [...fasesCompletas, faseId];
      setFasesCompletas(novasFasesCompletas);

      // Número total de fases
      const totalFases = Math.ceil(perguntas.length / QUESTOESPORFASE);

      // Verifica se completou o Jogo
      if (novasFasesCompletas.length === totalFases) {
        setJogoCompleto(true);
      }
    }

    // Move para a tela de GameOver sempre
    setCurrentScreen(GAME_SCREENS.GAME_OVER);
  };

  // Funções de resposta do modo 'Playing' (antigo) - Mantidas para compatibilidade.
  const handleAnswer = (selectedAnswerId) => {
    const correct = selectedAnswerId === currentQuestion.correctAnswerId;
    setIsCorrect(correct);
    setCurrentScreen(GAME_SCREENS.FEEDBACK);

    if (correct) {
      setScore(score + 10);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setCurrentScreen(GAME_SCREENS.GAME_OVER);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentScreen(GAME_SCREENS.PLAYING);
    }
    setIsCorrect(null);
  };

  // ------------------------------------
  // 6. Funções de Navegação (Handlers)
  // ------------------------------------

  const resetState = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsCorrect(null);
  };

  const handleBackToLogin = () => {
    resetState();
    setCurrentScreen(GAME_SCREENS.LOGIN);
  };

  const handleBackToMenu = () => {
    resetState();
    setCurrentScreen(GAME_SCREENS.MENU);
  };

  const handleCreatAccount = () => {
    resetState();
    setCurrentScreen(GAME_SCREENS.CREATE_ACCOUNT);
  };

  const handleIntroducao = () => {
    resetState();
    setCurrentScreen(GAME_SCREENS.INTRODUCAO);
  };

  const handleFloresta = () => {
    resetState();
    setCurrentScreen(GAME_SCREENS.FLORESTA);
  };

  /**
   * Navega para a tela de Seleção de Fases ou, se um ID for passado, para o Quiz da Fase.
   * @param {number} [selectedFaseId] - ID da fase selecionada.
   */
  const handleFases = (selectedFaseId) => {
    if (selectedFaseId) {
      setCurrentFaseId(selectedFaseId);
      setCurrentScreen(GAME_SCREENS.QUIZ);
    } else {
      setCurrentScreen(GAME_SCREENS.FASES);
    }
  };

  // Handler para fase concluída removido pois estava duplicado

  // Handler de Restart no GameOver (Ajustado para a lógica de fases)
  const handleGameOverRestart = () => {
    if (jogoCompleto) {
      setFasesCompletas([]);
      setJogoCompleto(false);
      handleBackToMenu();
    } else {
      // Reinicia a fase atual
      handleFases(currentFaseId);
    }
  };

  // Handler de Voltar ao Menu/Fases no GameOver (Ajustado)
  const handleGameOverBack = () => {
    if (jogoCompleto) {
      handleBackToMenu();
    } else {
      // Volta para a tela de seleção de fases
      setCurrentScreen(GAME_SCREENS.FASES);
    }
  };

  // ------------------------------------
  // 7. Renderização Condicional
  // ------------------------------------
  const renderGameContent = () => {
    switch (currentScreen) {
      case GAME_SCREENS.LOGIN:
        return (
          <FormularioLogin
            SwitchRegister={handleCreatAccount}
            handleStartGame={handleBackToMenu} // Assume que Login bem-sucedido leva ao Menu
          />
        );

      case GAME_SCREENS.CREATE_ACCOUNT:
        return <FormularioCadastro SwitchLogin={handleBackToLogin} />;

      case GAME_SCREENS.MENU:
        return (
          <MenuGame novoJogo={handleIntroducao} telaLogin={handleBackToLogin} />
        );

      case GAME_SCREENS.INTRODUCAO:
        return <Introducao Playing={handleFloresta} />;

      case GAME_SCREENS.FLORESTA:
        return (
          <Floresta
            arvoresAtuais={score / 10} // Usa o número de fases completas como árvores
            metaDeArvores={perguntas.length} // Total de fases como meta
            voltarMenu={handleBackToMenu}
            irFases={handleFases}
          />
        );

      case GAME_SCREENS.FASES:
        return (
          <Fases
            mockPerguntas={mockData}
            onFaseSelect={handleFases} // Prop crucial
            fasesCompletas={fasesCompletas}
            voltarMenu={() => setCurrentScreen(GAME_SCREENS.MENU)}
            voltarFloresta={() => setCurrentScreen(GAME_SCREENS.FLORESTA)}
          />
        );

      case GAME_SCREENS.QUIZ:
        const indiceInicial = (currentFaseId - 1) * QUESTOESPORFASE;
        const perguntasDaFase = mockData.slice(
          indiceInicial,
          indiceInicial + QUESTOESPORFASE
        );
        return (
          <QuizDaFase
            faseId={currentFaseId}
            perguntas={getPerguntasFase(currentFaseId)} // Passa as perguntas filtradas
            voltarFases={handleFases} // Volta para a lista de fases
            onFaseConcluida={handleFaseConcluida}
          />
        );

      case GAME_SCREENS.GAME_OVER:
        // Mensagem dinâmica baseada no estado do jogo
        const gameOverMessage = jogoCompleto
          ? "Parabéns! Você completou o jogo!"
          : `Fase ${currentFaseId} concluída!`;

        // Total de perguntas para exibição
        const totalQuestions = jogoCompleto
          ? perguntas.length
          : QUESTOESPORFASE;

        return (
          <GameOver
            score={score}
            totalQuestions={totalQuestions}
            onRestartGame={handleGameOverRestart}
            onBackToMenu={handleGameOverBack}
            isFaseCompleta={!jogoCompleto}
            faseId={currentFaseId}
            mensagem={gameOverMessage}
            fasesCompletas={fasesCompletas}
          />
        );

      case GAME_SCREENS.PLAYING:
      case GAME_SCREENS.FEEDBACK:
        // Renderiza o modo antigo/legado se necessário (embora QuizDaFase substitua isso)
        return currentScreen === GAME_SCREENS.PLAYING ? (
          <Playing
            handleBackToMenu={handleBackToMenu}
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            score={score}
            mockData={mockData}
            handleAnswer={handleAnswer}
          />
        ) : (
          <FeedbackResposta
            isCorrect={isCorrect}
            explicacao={currentQuestion?.explanation}
            score={score}
            onNext={handleNextQuestion}
            isLast={isLastQuestion}
          />
        );

      default:
        return null;
    }
  };

  // ------------------------------------
  // 8. Template Principal
  // ------------------------------------
  return (
    <div className="page">
      <Header />
      <div id="jogo" className="quiz-container">
        {renderGameContent()}
      </div>

      {/* Seções informativas (Sobre, Tecnologias, Desenvolvedores) */}
      <div id="sobre-o-jogo" className="sobre">
        <h1>Sobre o jogo</h1>
        <div className="descricao">
          <h2>Bem-vindo ao QuizPlanet : Desafio ODS !</h2>
          <p>
            Este jogo é mais do que uma diversão: é uma ferramenta de
            aprendizado e conscientização sobre os **Objetivos de
            Desenvolvimento Sustentável (ODS)** da ONU. Criado como um projeto
            de engenharia de software, nosso objetivo é mostrar de forma
            interativa e acessível como a tecnologia pode ser uma aliada na
            educação e na construção de um futuro mais justo e sustentável.
          </p>
          <p>
            Acreditamos que, ao transformar o conhecimento sobre os ODS em um
            desafio divertido, podemos inspirar mais pessoas a entenderem e a
            agirem em prol de metas globais, como a erradicação da pobreza, a
            proteção do meio ambiente e a promoção da igualdade.
          </p>
          <p>
            Junte-se a nós nessa jornada. Descubra seu conhecimento, aprenda
            algo novo e ajude a espalhar a mensagem. O futuro do planeta está em
            nossas mãos!
          </p>
        </div>
      </div>

      <div id="tecnologias" className="tecnologias">
        <h1>Tecnologias Utilizadas</h1>
        <div className="descricao">
          <h2>Frontend ( Camada de Apresentação )</h2>
          <p>
            <strong>React</strong> : A interface do jogo foi desenvolvida com
            React, uma biblioteca JavaScript líder de mercado. Sua abordagem
            baseada em componentes permite a criação de uma interface de usuário
            dinâmica e modular, otimizando a navegação e a interatividade.
          </p>
          <h2>Backend ( Lógica e Dados )</h2>
          <p>
            <strong>Python</strong> : A lógica do servidor (backend) é
            inteiramente construída em Python, uma linguagem de programação
            versátil e poderosa. Sua sintaxe clara e vasto ecossistema de
            bibliotecas aceleraram o desenvolvimento.
          </p>
          <p>
            <strong>Django</strong> : Utilizamos Django, um framework web
            Python. Ele foi escolhido para gerenciar a complexidade do jogo,
            incluindo o ORM (Mapeamento Objeto-Relacional) para o banco de
            dados, a segurança, e a construção rápida da API REST para servir a
            lógica do jogo.
          </p>
        </div>
      </div>

      <div id="desenvolvedores" className="desenvolvedores">
        <h1>Desenvolvedores</h1>
        <div className="card-container">
          <CardDev
            nome={"Jefferson Bezerra da Gama"}
            especialidade={"Front-End"}
            fotoUrl={"https://avatars.githubusercontent.com/u/58535852?v=4"}
            linkedinUrl={"https://www.linkedin.com/in/jefferson-bezerra-gama/"}
            githubUrl={"https://github.com/jeffersonbg"}
          />
          <CardDev
            nome={"Pedro Henrique Souza Pessoa"}
            especialidade={"Back-End"}
            fotoUrl={"https://avatars.githubusercontent.com/u/63820078?v=4"}
            linkedinUrl={"https://www.linkedin.com/in/pedro-pesssoa/"}
            githubUrl={"https://github.com/Pedro-Pesssoa"}
          />
          <CardDev
            nome={"Thiago Luan Moreira Sousa"}
            especialidade={"Front-End"}
            fotoUrl={"https://avatars.githubusercontent.com/u/112329988?v=4"}
            linkedinUrl={"https://www.linkedin.com/in/thiago-luan-28b55423a/"}
            githubUrl={"https://github.com/thiagoluann"}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
