import React from 'react';
import './Fases.css';

// Dados de exemplo que viriam da sua API no futuro
const mockFases = [
  { id: 1, nome: 'Fase 1: O Solo', status: 'liberada' },
  { id: 2, nome: 'Fase 2: As Florestas', status: 'liberada' },
  { id: 3, nome: 'Fase 3: A Fauna', status: 'bloqueada' },
  { id: 4, nome: 'Fase 4: Ecossistemas', status: 'bloqueada' },
];

const Fases = ({FaseSelecionada}) => {
    return(
        <div className="tela-fases-container">
      <h2>Escolha uma Fase para Começar</h2>
      <div className="fases-grid">
        {mockFases.map((fase) => (
          <button
            key={fase.id}
            className={`fase-item ${fase.status}`} // A classe muda com base no status
            onClick={() => FaseSelecionada(fase.id)}
            disabled={fase.status === 'bloqueada'} // Desabilita o botão se a fase estiver bloqueada
          >
            <h3>{fase.nome}</h3>
            {fase.status === 'bloqueada' && <span className="lock-icon">🔒</span>}
          </button>
        ))}
      </div>
    </div>
    );
};

export default Fases;