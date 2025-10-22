import React, { useState, useEffect } from 'react';
import './QuizDaFase.css';

const mockPerguntasPorFase = {
  1: [ // Perguntas da Fase 1
    { id: 101, texto: 'O desmatamento é a principal causa da degradação do solo. Verdadeiro ou Falso?', alternativas: [{id: 'a', texto: 'Verdadeiro'}, {id: 'b', texto: 'Falso'}], respostaCorreta: 'a' },
    { id: 102, texto: 'A rotação de culturas ajuda a manter a saúde do solo. Verdadeiro ou Falso?', alternativas: [{id: 'a', texto: 'Verdadeiro'}, {id: 'b', texto: 'Falso'}], respostaCorreta: 'a' },
    { id: 103, texto: 'O uso excessivo de pesticidas não afeta a biodiversidade do solo. Verdadeiro ou Falso?', alternativas: [{id: 'a', texto: 'Verdadeiro'}, {id: 'b', texto: 'Falso'}], respostaCorreta: 'b' },
  ],
  2: [ // Perguntas da Fase 2
    // ... adicione 3 perguntas para a fase 2 aqui
  ],
};

const QuizDaFase = ({ faseId, onFaseConcluida }) =>{
    const [perguntas, setPerguntas] = useState([]);
  const [perguntaAtualIndex, setPerguntaAtualIndex] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [faseConcluida, setFaseConcluida] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, message: '', isCorrect: false });

  // Busca as perguntas da fase quando o componente é montado
  useEffect(() => {
    // TODO: Substituir por uma chamada real à API: fetch(`/api/fase/${faseId}`)
    const perguntasDaFase = mockPerguntasPorFase[faseId] || [];
    setPerguntas(perguntasDaFase);
  }, [faseId]);

  const handleResponder = (respostaSelecionadaId) => {
    if (feedback.show) return; // Impede múltiplos cliques

    const perguntaAtual = perguntas[perguntaAtualIndex];
    const isCorrect = respostaSelecionadaId === perguntaAtual.respostaCorreta;

    if (isCorrect) {
      setAcertos(acertos + 1);
      setFeedback({ show: true, message: 'Resposta Correta!', isCorrect: true });
    } else {
      setFeedback({ show: true, message: 'Resposta Incorreta!', isCorrect: false });
    }

    // Passa para a próxima pergunta ou finaliza a fase após um tempo
    setTimeout(() => {
      const proximoIndex = perguntaAtualIndex + 1;
      if (proximoIndex < perguntas.length) {
        setPerguntaAtualIndex(proximoIndex);
        setFeedback({ show: false, message: '', isCorrect: false });
      } else {
        setFaseConcluida(true);
      }
    }, 1500); // 1.5 segundos de feedback
  };

  if (perguntas.length === 0) {
    return <div>Carregando fase...</div>;
  }

  if (faseConcluida) {
    const vitoria = acertos === perguntas.length;
    return (
      <div className="resultado-fase">
        <h2>Fase Concluída!</h2>
        <p>Você acertou {acertos} de {perguntas.length} perguntas.</p>
        {vitoria ? (
          <p className="vitoria">🌳 Parabéns! Você plantou uma árvore!</p>
        ) : (
          <p className="derrota">🔥 Que pena! Uma árvore foi cortada.</p>
        )}
        <button onClick={onFaseConcluida}>Voltar para Fases</button>
      </div>
    );
  }

  const perguntaAtual = perguntas[perguntaAtualIndex];
    return(
        <div className="quiz-fase-container">
      <h2>Fase {faseId} - Pergunta {perguntaAtualIndex + 1} de {perguntas.length}</h2>
      <h3>{perguntaAtual.texto}</h3>
      <div className="alternativas-container">
        {perguntaAtual.alternativas.map((alt) => (
          <button
            key={alt.id}
            className="alternativa-btn"
            onClick={() => handleResponder(alt.id)}
            disabled={feedback.show}
          >
            {alt.texto}
          </button>
        ))}
      </div>
      {feedback.show && (
        <p className={`feedback ${feedback.isCorrect ? 'correto' : 'incorreto'}`}>
          {feedback.message}
        </p>
      )}
    </div>
    );
};