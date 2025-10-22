import React, { useState } from "react";
import "./MenuGame.css";
import OdsImage from "../assets/ods15vidaterrestre.png";

const TELAS = {
  PRINCIPAL: "principal",
  CARREGAR_JOGO: "carregar_jogo",
};

const MenuGame = ({ novoJogo, telaLogin }) => {
  const [telaAtual, setTelaAtual] = useState(TELAS.PRINCIPAL);

  const handleCarregarJogo = () => {
    setTelaAtual(TELAS.CARREGAR_JOGO);
  };

  const handleVoltarPrincipal = () => {
    setTelaAtual(TELAS.PRINCIPAL);
  };

  const MenuPrincipal = (
    <div className="menu">
      <h2>Menu</h2>
      <h3 onClick={novoJogo}>Novo Jogo</h3>
      <h3 onClick={handleCarregarJogo}>Carregar Jogo</h3>
      <h3 onClick={telaLogin}>Sair</h3>
    </div>
  );

  const CarregarJogo = (
    <div className="menu">
      <h2>Carregar Jogo</h2>
      <h3 onClick={() => console.log("Floresta Nível 3 - 10/10/2025")}>
        Espaço I
      </h3>
      <h3 onClick={() => console.log("Floresta Nível 3 - 10/10/2025")}>
        Espaço II
      </h3>
      <h3 onClick={handleVoltarPrincipal}>Voltar</h3>
    </div>
  );

  const renderizarTela = () => {
    switch (telaAtual) {
      case TELAS.PRINCIPAL:
        return MenuPrincipal;

      case TELAS.CARREGAR_JOGO:
        return CarregarJogo;

      default:
        return MenuPrincipal;
    }
  };

  return (
    <div className="container-menu">
      <div className="logo-menu">
        <img
          src={OdsImage}
          alt="ODS Vida Terrestre"
          style={{
            width: "50%",
            height: "50%",
            objectFit: "contain",
            borderRadius: "12px",
          }}
        />
      </div>
      {renderizarTela()};
    </div>
  );
};

export default MenuGame;
