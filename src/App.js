import React, { useState } from "react";
import Header from "./components/Header";
import CardDev from "./components/CardDev";

import FormularioCadastro from "./components/FormularioCadastro";
import FormularioLogin from "./components/FormularioLogin";
import MenuGame from "./components/MenuGame";
import Playing from "./components/Playing";
import Introducao from "./components/Introducao";

// Dados de exemplo (simulando a resposta do backend)
const mockData = [
  {
    id: 1,
    question: "Qual o principal objetivo do ODS 15?",
    options: [
      { id: "a", text: "Proteger a vida marinha" },
      { id: "b", text: "Proteger a vida terrestre" },
      { id: "c", text: "Garantir água limpa" },
      { id: "d", text: "Reduzir as desigualdades" },
    ],
    correctAnswerId: "b",
    explanation:
      "O ODS 15 foca na proteção, recuperação e uso sustentável dos ecossistemas terrestres.",
  },
  {
    id: 2,
    question: "O que você pode fazer para ajudar a proteger uma floresta?",
    options: [
      { id: "a", text: "Jogar lixo nas trilhas" },
      { id: "b", text: "Não cortar árvores e plantar mudas" },
      { id: "c", text: "Fazer fogueiras perto das árvores" },
      { id: "d", text: "Arrancar flores e folhas" },
    ],
    correctAnswerId: "b",
    explanation:
      "Não cortar árvores e plantar mudas ajuda as florestas a continuarem vivas.",
  },
  {
    id: 3,
    question: "Por que devemos evitar jogar lixo nos rios e lagos?",
    options: [
      { id: "a", text: "Para enfeitar a água" },
      { id: "b", text: "Para proteger os peixes e ter água limpa" },
      { id: "c", text: "Para atrair mais animais" },
      { id: "d", text: "Para as plantas crescerem" },
    ],
    correctAnswerId: "b",
    explanation:
      "O lixo polui a água e faz mal para peixes, aves e todos que usam a água.",
  },
  {
    id: 4,
    question: "O que acontece quando plantamos árvores em áreas sem vegetação?",
    options: [
      { id: "a", text: "As áreas ficam mais áridas" },
      { id: "b", text: "O solo fica protegido e os animais voltam" },
      { id: "c", text: "O ar fica mais poluído" },
      { id: "d", text: "O calor aumenta" },
    ],
    correctAnswerId: "b",
    explanation:
      "Plantar árvores protege o solo, traz sombra e abrigo para animais e deixa o ar melhor.",
  },
  {
    id: 5,
    question:
      "Se encontrar um animal silvestre perdido, o que você deve fazer?",
    options: [
      { id: "a", text: "Tentar levar para casa" },
      {
        id: "b",
        text: "Chamar os órgãos responsáveis ou deixá-lo na natureza",
      },
      { id: "c", text: "Ficar brincando com ele" },
      { id: "d", text: "Prendê-lo numa gaiola" },
    ],
    correctAnswerId: "b",
    explanation:
      "Animais silvestres pertencem à natureza ou precisam de cuidados de especialistas.",
  },
  {
    id: 6,
    question: "Como podemos economizar papel?",
    options: [
      { id: "a", text: "Usando os dois lados antes de jogar fora" },
      { id: "b", text: "Rasgando folhas para brincar" },
      { id: "c", text: "Usando papel novo sempre" },
      { id: "d", text: "Jogando fora após usar uma vez" },
    ],
    correctAnswerId: "a",
    explanation:
      "Usar os dois lados do papel evita desperdício e menos árvores são cortadas.",
  },
  {
    id: 7,
    question: "Como evitar queimadas nas matas?",
    options: [
      { id: "a", text: "Acender fogueiras perto das árvores" },
      {
        id: "b",
        text: "Cuidar para não jogar bitucas de cigarro ou fósforos acessos no mato",
      },
      { id: "c", text: "Jogar lixo inflamável por aí" },
      { id: "d", text: "Fazer brincadeiras com fogo" },
    ],
    correctAnswerId: "b",
    explanation:
      "Não usar fogo em áreas de vegetação evita incêndios, protegendo plantas e animais.",
  },
  {
    id: 8,
    question: "O que podemos fazer para cuidar das montanhas e suas plantas?",
    options: [
      { id: "a", text: "Jogar lixo durante trilhas" },
      { id: "b", text: "Não jogar lixo e ajudar em mutirões de limpeza" },
      { id: "c", text: "Retirar plantas das encostas" },
      { id: "d", text: "Rasgar plantas para brincar" },
    ],
    correctAnswerId: "b",
    explanation:
      "Montanhas precisam de cuidado; recolher lixo e proteger plantas ajuda todo o ecossistema.",
  },
  {
    id: 9,
    question: "O que significa proteger animais em risco de extinção?",
    options: [
      { id: "a", text: "Caçá-los e vender" },
      { id: "b", text: "Deixá-los livres na natureza e evitar a caça" },
      { id: "c", text: "Prender em gaiolas" },
      { id: "d", text: "Cuidar só em zoológicos" },
    ],
    correctAnswerId: "b",
    explanation:
      "Animais ameaçados precisam viver na natureza livres, protegidos da caça ilegal.",
  },
  {
    id: 10,
    question: "Como podemos acabar com a caça ilegal de animais?",
    options: [
      { id: "a", text: "Comprar animais silvestres como pets" },
      {
        id: "b",
        text: "Não comprar produtos de origem ilegal e avisar autoridades",
      },
      { id: "c", text: "Apoiar caçadores" },
      { id: "d", text: "Deixar todo mundo caçar à vontade" },
    ],
    correctAnswerId: "b",
    explanation:
      "Quando não compramos animais ou produtos ilegais, ajudamos a combater a caça ilegal.",
  },
  {
    id: 11,
    question: "Qual atitude ajuda a evitar a perda de habitats naturais?",
    options: [
      { id: "a", text: "Construir casas no meio do mato" },
      {
        id: "b",
        text: "Ajudar em projetos de plantio e não destruir a vegetação",
      },
      { id: "c", text: "Arrancar plantas para brincadeira" },
      { id: "d", text: "Queimar lixo na mata" },
    ],
    correctAnswerId: "b",
    explanation:
      "Cuidar das áreas verdes e plantar árvores ajudam a preservar os habitats.",
  },
  {
    id: 12,
    question: "O que fazer ao visitar um parque natural?",
    options: [
      { id: "a", text: "Jogar o lixo no chão" },
      { id: "b", text: "Levar o lixo de volta ou jogar na lixeira" },
      { id: "c", text: "Pegar mudas de plantas para casa" },
      { id: "d", text: "Fazer pic-nic e deixar tudo no chão" },
    ],
    correctAnswerId: "b",
    explanation:
      "Deixar o parque limpo protege plantas, animais e quem visita.",
  },
  {
    id: 13,
    question: "Plantar árvores em áreas degradadas é:",
    options: [
      { id: "a", text: "Prejudicial à natureza" },
      { id: "b", text: "Uma forma de recuperar o solo e abrigar animais" },
      { id: "c", text: "Ruim para o ar" },
      { id: "d", text: "Desnecessário" },
    ],
    correctAnswerId: "b",
    explanation:
      "Árvores ajudam o solo, a água e abrigam animais em áreas antes degradadas.",
  },
  {
    id: 14,
    question: "Por que não podemos soltar animais de estimação na natureza?",
    options: [
      { id: "a", text: "Eles vão ser amigos dos outros animais" },
      { id: "b", text: "Eles podem virar praga e prejudicar a natureza local" },
      { id: "c", text: "Não faz diferença" },
      { id: "d", text: "Porque é divertido" },
    ],
    correctAnswerId: "b",
    explanation:
      "Animais de outros lugares podem virar praga, faltar comida e atrapalhar os animais daqui.",
  },
  {
    id: 15,
    question: "Como as crianças podem ajudar a proteger áreas de pântano?",
    options: [
      { id: "a", text: "Jogando lixo nessas áreas" },
      {
        id: "b",
        text: "Não jogando lixo e participando de mutirões de limpeza",
      },
      { id: "c", text: "Levando animais do pântano para casa" },
      { id: "d", text: "Rasgando plantas" },
    ],
    correctAnswerId: "b",
    explanation:
      "Limpeza e respeito são atitudes que ajudam muito os pântanos e seus animais.",
  },
  {
    id: 16,
    question: "Como cuidar da biodiversidade do bairro?",
    options: [
      { id: "a", text: "Cortar árvores da rua" },
      {
        id: "b",
        text: "Cuidar dos jardins, plantar flores e proteger pássaros",
      },
      { id: "c", text: "Matar insetos à toa" },
      { id: "d", text: "Arrancar flores" },
    ],
    correctAnswerId: "b",
    explanation:
      "Cuidar das plantas e dar comida limpa aos pássaros ajudam a proteger a biodiversidade.",
  },
  {
    id: 17,
    question: "O que pode ser feito para evitar a desertificação?",
    options: [
      { id: "a", text: "Plantar árvores e proteger o solo" },
      { id: "b", text: "Retirar a vegetação e deixar o solo exposto" },
      { id: "c", text: "Queimar tudo" },
      { id: "d", text: "Fazer buracos no solo" },
    ],
    correctAnswerId: "a",
    explanation:
      "A cobertura vegetal e as árvores seguram o solo e evitam a desertificação.",
  },
  {
    id: 18,
    question: "Por que as florestas devem ser cuidadas?",
    options: [
      { id: "a", text: "Para virar madeira apenas" },
      { id: "b", text: "Porque protegem os rios, o solo e abrigam animais" },
      { id: "c", text: "Para serem queimadas" },
      { id: "d", text: "Para derrubar as árvores" },
    ],
    correctAnswerId: "b",
    explanation:
      "As florestas dão sombra, abrigo e mantém a água limpa para todos.",
  },
  {
    id: 19,
    question: "O que fazer ao ver lixo numa área verde?",
    options: [
      { id: "a", text: "Ignorar" },
      { id: "b", text: "Juntar e colocar no lixo certo" },
      { id: "c", text: "Jogar ainda mais lixo" },
      { id: "d", text: "Chutar para baixo das plantas" },
    ],
    correctAnswerId: "b",
    explanation: "Coletar o lixo ajuda toda a natureza a ficar saudável.",
  },
  {
    id: 20,
    question: "Como ensinar amigos a proteger a natureza?",
    options: [
      {
        id: "a",
        text: "Dando exemplo com boas atitudes e ensinando a reciclar",
      },
      { id: "b", text: "Ignorando tudo isso" },
      {
        id: "c",
        text: "Jogando lixo e incentivando os outros a fazer o mesmo",
      },
      { id: "d", text: "Rasgando livros sobre natureza" },
    ],
    correctAnswerId: "a",
    explanation:
      "O melhor jeito de ensinar é pelo exemplo e espalhando boas ideias.",
  },
  {
    id: 21,
    question: "Como consumir recursos naturais de forma sustentável?",
    options: [
      { id: "a", text: "Gastando sem pensar e jogando fora" },
      { id: "b", text: "Reutilizando, reciclando e só pegando o necessário" },
      { id: "c", text: "Desperdiçando água e energia" },
      { id: "d", text: "Deixando torneiras abertas" },
    ],
    correctAnswerId: "b",
    explanation:
      "Assim desperdiçamos menos e ajudamos o planeta a se recuperar.",
  },
  {
    id: 22,
    question: "O que fazer se alguém estiver cortando árvores ilegalmente?",
    options: [
      { id: "a", text: "Ajudar a cortar mais" },
      { id: "b", text: "Avisar as autoridades e nunca apoiar esse ato" },
      { id: "c", text: "Filmar e postar sem avisar ninguém" },
      { id: "d", text: "Ignorar" },
    ],
    correctAnswerId: "b",
    explanation:
      "É importante denunciar crimes ambientais às autoridades para proteger a natureza.",
  },
  {
    id: 23,
    question: "Como evitar espécies invasoras?",
    options: [
      {
        id: "a",
        text: "Nunca soltar animais ou plantas desconhecidos na natureza",
      },
      { id: "b", text: "Levar mudas exóticas para parques" },
      { id: "c", text: "Soltar peixes de aquário nos rios" },
      { id: "d", text: "Trazer plantas de outro país para casa" },
    ],
    correctAnswerId: "a",
    explanation:
      "Espécies que não são de lá podem causar desequilíbrio e até matar animais do lugar.",
  },
  {
    id: 24,
    question: "Como as famílias podem ajudar na conservação das florestas?",
    options: [
      { id: "a", text: "Comprando produtos ilegais de madeira" },
      { id: "b", text: "Plantando árvores, separando lixo e reciclando" },
      { id: "c", text: "Destruindo plantas durante caminhadas" },
      { id: "d", text: "Derrubando árvores do quintal sem motivo" },
    ],
    correctAnswerId: "b",
    explanation:
      "Ações simples, como plantar árvores e reciclar, ajudam a manter a natureza viva.",
  },
  {
    id: 25,
    question: "Qual exemplo de ação que protege os ecossistemas terrestres?",
    options: [
      { id: "a", text: "Apoiar ONGs que protegem a natureza" },
      { id: "b", text: "Poluir rios" },
      { id: "c", text: "Comprar animais silvestres" },
      { id: "d", text: "Atirar lixo em áreas verdes" },
    ],
    correctAnswerId: "a",
    explanation:
      "ONGs ajudam a proteger a natureza; apoiar essas causas faz diferença no mundo.",
  },
];

// Definição das telas do jogo
const GAME_SCREENS = {
  LOGIN: "login",
  MENU: "menu",
  PLAYING: "playing",
  INTRODUCAO: "introducao",
  FEEDBACK: "feedback",
  GAME_OVER: "game_over",
  CREATE_ACCOUNT: "create_account",
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(GAME_SCREENS.LOGIN);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentQuestion = mockData[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === mockData.length - 1;

  const handleStartGame = () => {
    setCurrentScreen(GAME_SCREENS.PLAYING);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

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

  const handleBackToLogin = () => {
    setCurrentScreen(GAME_SCREENS.LOGIN);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleBackToMenu = () => {
    setCurrentScreen(GAME_SCREENS.MENU);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleIntroducao = () => {
    setCurrentScreen(GAME_SCREENS.INTRODUCAO);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleCreatAccount = () => {
    setCurrentScreen(GAME_SCREENS.CREATE_ACCOUNT);
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  // Renderiza o conteúdo baseado na tela atual
  const renderGameContent = () => {
    switch (currentScreen) {
      case GAME_SCREENS.LOGIN:
        return (
          <FormularioLogin
            SwitchRegister={handleCreatAccount}
            handleStartGame={handleBackToMenu}
          />
        );

      case GAME_SCREENS.CREATE_ACCOUNT:
        return <FormularioCadastro SwitchLogin={handleBackToLogin} />;

      case GAME_SCREENS.MENU:
        return <MenuGame novoJogo={handleIntroducao} telaLogin={handleBackToLogin}/>;

      case GAME_SCREENS.PLAYING:
        return (
          <Playing handleBackToMenu={handleBackToMenu} currentQuestion={currentQuestion} currentQuestionIndex={currentQuestionIndex} score={score} mockData={mockData} handleAnswer={handleAnswer}/>
        );

      case GAME_SCREENS.INTRODUCAO:
        return(
          <Introducao Playing={handleStartGame}/>
        );

      case GAME_SCREENS.FEEDBACK:
        return (
          <div className="feedback-screen">
            <h2>{isCorrect ? "🎉 Correto!" : "❌ Incorreto"}</h2>
            <div className="feedback-content">
              <p>
                <strong>Explicação:</strong> {currentQuestion.explanation}
              </p>
              <p>Sua pontuação atual: {score} pontos</p>
            </div>
            <button onClick={handleNextQuestion} className="next-button">
              {isLastQuestion ? "Ver Resultado Final" : "Próxima Questão"}
            </button>
          </div>
        );

      case GAME_SCREENS.GAME_OVER:
        return (
          <div className="game-over-screen">
            <h2>Fim do Jogo! 🏆</h2>
            <div className="final-stats">
              <p>
                Sua pontuação final: <strong>{score} pontos</strong>
              </p>
              <p>
                Questões acertadas:{" "}
                <strong>
                  {score / 10} de {mockData.length}
                </strong>
              </p>
              <p>
                Performance:{" "}
                <strong>
                  {Math.round((score / (mockData.length * 10)) * 100)}%
                </strong>
              </p>
            </div>
            <div className="game-over-actions">
              <button onClick={handleStartGame} className="restart-button">
                Jogar Novamente
              </button>
              <button onClick={handleBackToMenu} className="menu-button">
                Voltar ao Menu
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="page">
      <Header/>
      <div id="jogo" className="quiz-container">
        {renderGameContent()}
      </div>
      <div id="sobre-o-jogo" className="sobre">
        <h1>Sobre o jogo</h1>
        <div className="descricao">
          <h2>Bem-vindo ao QuizPlanet : Desafio ODS !</h2>
          <p>
            Este jogo é mais do que uma diversão: é uma ferramenta de
            aprendizado e conscientização sobre os Objetivos de Desenvolvimento
            Sustentável (ODS) da ONU. Criado como um projeto de engenharia de
            software, nosso objetivo é mostrar de forma interativa e acessível
            como a tecnologia pode ser uma aliada na educação e na construção de
            um futuro mais justo e sustentável.
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
