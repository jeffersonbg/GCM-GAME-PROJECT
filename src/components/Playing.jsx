import React, { useState } from "react";
import "./Playing.css";

const Playing = ({
  handleBackToMenu,
  currentQuestion,
  currentQuestionIndex,
  score,
  mockData,
  handleAnswer,
}) => {
  return (
    <div className="playing-screen">
      <div className="game-header">
        <div>
          <button onClick={handleBackToMenu} className="back-button">
            Voltar
          </button>
        </div>
        <div className="title-question">
          <h2>
            Questão {currentQuestionIndex + 1} de {mockData.length}
          </h2>
        </div>
        <div className="score-display">
          <p>Pontuação: {score}</p>
        </div>
      </div>

      <div className="div-question">
        <div className="question-box">
          <h3>{currentQuestion.question}</h3>
        </div>

        <div className="options-container">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id)}
              className="option-button"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playing;
