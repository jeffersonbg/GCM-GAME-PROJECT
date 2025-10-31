import React, { useState } from "react";
import "./Fases.css";
import QuizDaFase from "./QuizDaFase";

const QUESTOESPORFASE = 3;

const Fases = ({
  mockPerguntas = [],
  voltarMenu,
  voltarFloresta,
  onFaseSelect,
  fasesCompletas = [],
}) => {
  const totalPerguntas = mockPerguntas.length;
  const numeroDeFases = Math.ceil(totalPerguntas / QUESTOESPORFASE);

  const fases = Array.from({ length: numeroDeFases }, (_, i) => ({
    id: i + 1,
    nome: `Fase ${i + 1}`,
  }));

  const iniciarFase = (faseId) => {
    if (onFaseSelect) {
      onFaseSelect(faseId);
    }
  };

  return (
    <div className="tela-fases-container">
      <div className="fase-title">
        <button className="btn" onClick={voltarMenu}>
          Voltar Menu
        </button>
        <h2>Fases</h2>
        <button className="btn" onClick={voltarFloresta}>
          Floresta
        </button>
      </div>
      {fases.map((fase) => (
        <button
          className={`fase-item ${
            fasesCompletas.includes(fase.id) ? "completa" : ""
          }`}
          key={fase.id}
          onClick={() => iniciarFase(fase.id)}
        >
          {fase.nome}
          {fasesCompletas.includes(fase.id) && " ✓"}
        </button>
      ))}
    </div>
  );
};

export default Fases;
