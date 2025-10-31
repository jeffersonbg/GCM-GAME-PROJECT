import React from 'react';
import './GameOver.css';

const GameOver = ({ 
  score, 
  totalQuestions, 
  onRestartGame, 
  onBackToMenu,
  isFaseCompleta = false,
  faseId = null,
  fasesCompletas = [] // array com IDs das fases já completadas
}) => {
  return (
    <div className="game-over-screen">
      <h2>{isFaseCompleta ? `Fase ${faseId} Concluída! 🌟` : 'Jogo Finalizado! 🏆'}</h2>
      <div className="final-stats">
        <p>
          Sua pontuação: <strong>{score} pontos</strong>
        </p>
        <p>
          Questões acertadas:{" "}
          <strong>
            {score / 10} de {totalQuestions}
          </strong>
        </p>
        <p>
          Performance:{" "}
          <strong>
            {Math.round((score / (totalQuestions * 10)) * 100)}%
          </strong>
        </p>
      </div>
      <div className="game-over-actions">
        {isFaseCompleta ? (
          fasesCompletas?.includes(faseId) ? (
            // Se a fase já foi completada, mostra apenas o botão de próxima fase
            <button onClick={onBackToMenu} className="menu-button">
              Próxima Fase
            </button>
          ) : (
            // Se a fase ainda não foi completada, mostra ambos os botões
            <>
              <button onClick={onRestartGame} className="restart-button">
                Tentar Novamente
              </button>
              <button onClick={onBackToMenu} className="menu-button">
                Voltar às Fases
              </button>
            </>
          )
        ) : (
          // Quando o jogo estiver completo
          <>
            <button onClick={onRestartGame} className="restart-button">
              Jogar Novamente
            </button>
            <button onClick={onBackToMenu} className="menu-button">
              Voltar ao Menu
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GameOver;