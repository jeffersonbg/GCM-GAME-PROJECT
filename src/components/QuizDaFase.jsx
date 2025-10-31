import React, { useState, useEffect, useRef } from "react";
import "./QuizDaFase.css";
import FeedbackResposta from "./FeedbackResposta";
import GameOver from "./GameOver";

// Corrigido: Agora usa 'perguntas' como o nome da prop recebida
const QuizDaFase = ({
  voltarFases,
  faseId,
  perguntas: perguntasRecebidas = [],
  onFaseConcluida,
}) => {
  // Renomeamos a prop recebida para 'perguntasRecebidas'
  // e usamos 'perguntas' para o state.
  const [perguntas, setPerguntas] = useState([]);
  const [perguntaAtualIndex, setPerguntaAtualIndex] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [faseConcluida, setFaseConcluida] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    isCorrect: false,
  });

  const finalizarFase = (acertosCount) => {
    setFaseConcluida(true);
    if (typeof onFaseConcluida === "function") {
      onFaseConcluida({
        acertos: acertosCount,
        total: perguntas.length,
        faseId,
      });
    }
  };

  useEffect(() => {
    // Se receber perguntas por prop, usa elas
    if (perguntasRecebidas && perguntasRecebidas.length) {
      setPerguntas(perguntasRecebidas); // Usa a prop renomeada
      setPerguntaAtualIndex(0);
      setAcertos(0);
      setFaseConcluida(false);
      setFeedback({ show: false, message: "", isCorrect: false });
    }
    // Dependência corrigida para a prop renomeada
  }, [perguntasRecebidas, faseId]);

  // O restante do seu código (handleResponder e renderização) está OK.

  const timeoutRef = useRef(null);

  const handleResponder = (respostaSelecionadaId) => {
    // ... (código existente da handleResponder) ...
    if (feedback.show) return;

    const perguntaAtual = perguntas[perguntaAtualIndex];
    // Assumindo que 'correctAnswerId' está presente no seu objeto pergunta
    const isCorrect = respostaSelecionadaId === perguntaAtual.correctAnswerId;

    if (isCorrect) {
      setAcertos((prev) => prev + 1);
      setFeedback({
        show: true,
        message: "Resposta Correta!",
        isCorrect: true,
      });
    } else {
      setFeedback({
        show: true,
        message: "Resposta Incorreta!",
        isCorrect: false,
      });
    }
  };

  const handleAvancarAgora = () => {
    // Limpa o timeout, se houver (mantendo o código para segurança)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const proximoIndex = perguntaAtualIndex + 1;

    if (proximoIndex < perguntas.length) {
      // Se houver próxima pergunta, avança
      setPerguntaAtualIndex(proximoIndex);
      setFeedback({ show: false, message: "", isCorrect: false });
    } else {
      // Se for a última pergunta, finaliza a fase com o score acumulado
      setFaseConcluida(true);

      // ✅ CHAMA finalizarFase COM O VALOR ATUALIZADO DE ACERTOS
      // O 'acertos' já foi incrementado em 'handleResponder' se a resposta anterior estava correta.
      finalizarFase(acertos);

      // O App.js vai receber o callback e navegar para GAME_OVER / FASES.
    }

    // ✅ Oculta o feedback para a próxima pergunta
    setFeedback({ show: false, message: "", isCorrect: false });
  };

  if (perguntas.length === 0) return <div>Carregando fase ...</div>;
  if (faseConcluida) {
    return (
      <GameOver
        score={acertos * 10}
        totalQuestions={perguntas.length}
        onRestartGame={() => {
          setPerguntaAtualIndex(0);
          setAcertos(0);
          setFaseConcluida(false);
          setFeedback({ show: false, message: "", isCorrect: false });
        }}
        onBackToMenu={voltarFases}
        isFaseCompleta={true}
        faseId={faseId}
      />
    );
  }

  const perguntaAtual = perguntas[perguntaAtualIndex];
  // ... (restante da renderização) ...
  return (
    <div className="quiz-fase-container">
      <div className="quiz-title">
        <button 
          className="back-btn" 
          onClick={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
            voltarFases();
          }}
        >
          Voltar Fases
        </button>
        <h2>
          Fase {faseId} - Pergunta {perguntaAtualIndex + 1} de{" "}
          {perguntas.length}
        </h2>
      </div>
      <div className="quiz-questao">
        <h3>{perguntaAtual.question}</h3>
        <div className="alternativas-container">
          {perguntaAtual.options.map((opt) => (
            <button
              key={opt.id}
              className="alternativa-btn"
              onClick={() => handleResponder(opt.id)}
              disabled={feedback.show}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
      {feedback.show && (
        <FeedbackResposta
          isCorrect={feedback.isCorrect}
          explanation={perguntaAtual?.explanation}
          score={null}
          onNext={handleAvancarAgora}
          isLast={perguntaAtualIndex === perguntas.length - 1}
        />
      )}
    </div>
  );
};

export default QuizDaFase;
