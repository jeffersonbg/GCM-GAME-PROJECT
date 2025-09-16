import React, { useState } from 'react';

// Dados de exemplo (simulando a resposta do backend)
const mockData = [
  {
    id: 1,
    question: "Qual o principal objetivo do ODS 15?",
    options: [
      { id: 'a', text: "Proteger a vida marinha" },
      { id: 'b', text: "Proteger a vida terrestre" },
      { id: 'c', text: "Garantir água limpa" },
      { id: 'd', text: "Reduzir as desigualdades" }
    ],
    correctAnswerId: 'b',
    explanation: "O ODS 15 foca na proteção, recuperação e uso sustentável dos ecossistemas terrestres."
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const currentQuestion = mockData[currentQuestionIndex];

  const handleAnswer = (selectedAnswerId) => {
    const isCorrect = selectedAnswerId === currentQuestion.correctAnswerId;
    setIsCorrect(isCorrect);
    setShowFeedback(true);

    if (isCorrect) {
      setScore(score + 10);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setIsCorrect(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (currentQuestionIndex >= mockData.length) {
    return (
      <div className="quiz-container">
        <h2>Fim do Jogo!</h2>
        <p>Sua pontuação final é: {score} pontos.</p>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>Quiz do Planeta</h1>
      <p>Pontuação: {score}</p>
      
      <h2>{currentQuestion.question}</h2>

      {currentQuestion.options.map(option => (
        <button
          key={option.id}
          onClick={() => handleAnswer(option.id)}
          className={`option-button ${showFeedback ? (option.id === currentQuestion.correctAnswerId ? 'correct' : 'incorrect') : ''}`}
          disabled={showFeedback}
        >
          {option.text}
        </button>
      ))}

      {showFeedback && (
        <div className="feedback-text">
          <p>{isCorrect ? "Correto!" : "Incorreto."}</p>
          <p>{currentQuestion.explanation}</p>
          <button onClick={handleNextQuestion}>Próxima Pergunta</button>
        </div>
      )}
    </div>
  );
}

export default App;