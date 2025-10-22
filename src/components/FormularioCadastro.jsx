import React, { useState } from "react";
import "./FormularioCadastro.css";
import OdsImage from "../assets/ods15vidaterrestre.png";
import FolhagemBackground from "../assets/folhagem-e-plantas-exoticas.jpg";

const FormularioCadastro = ({ SwitchLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [termos, setTermos] = useState(false);
  const [erro, setErro] = useState("");

  const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validarEmail(email)) {
      setErro("E-mail inválido.");
      return;
    }

    if (!senha) {
      setErro("A senha não pode ser vazia.");
      return;
    }

    if (senha !== senha2) {
      setErro("As senhas não conferem.");
      return;
    }

    if (!termos) {
      setErro("É necessário concordar com os termos de privacidade.");
      return;
    }

    setErro("");
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div
      className="form-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${FolhagemBackground})`,
      }}
    >
      {/* Imagem da ODS */}
      <div className="form-image">
        <img src={OdsImage} alt="ODS Vida Terrestre" />
      </div>

      {/* Formulário */}
      <div className="form-wrapper">
        <form onSubmit={handleSubmit} className="form-content">
          <h2 className="form-title">Cadastro</h2>

          <div className="form-group">
            <input
              className="inputs"
              type="email"
              placeholder="Insira e-mail válido"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="inputs"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <input
              className="inputs"
              type="password"
              placeholder="Digite novamente sua senha"
              value={senha2}
              onChange={(e) => setSenha2(e.target.value)}
            />
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              checked={termos}
              onChange={(e) => setTermos(e.target.checked)}
            />
            <label>
              Concordo com os termos de privacidade.
            </label>
          </div>

          {erro && <div className="form-error">{erro}</div>}

          <button type="submit" className="form-button">
            Cadastrar
          </button>

          <div className="form-switch">
            <label onClick={SwitchLogin}>Já possuo uma conta.</label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCadastro;
