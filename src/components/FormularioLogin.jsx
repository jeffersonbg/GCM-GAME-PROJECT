import React, { useState } from "react";
import "./FormularioLogin.css";
import GoogleIcon from "../assets/Google.svg";
import FacebookIcon from "../assets/Facebook.svg";
import OdsImage from "../assets/ods15vidaterrestre.png";
import FolhagemBackground from "../assets/folhagem-e-plantas-exoticas.jpg";

const FormularioLogin = ({ SwitchRegister, handleStartGame }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
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
    setErro("");
    alert(`Tentativa de Login com E-mail: ${email}`);
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${FolhagemBackground})`,
      }}
    >
      <div className="login-image">
        <img src={OdsImage} alt="ODS Vida Terrestre" />
      </div>

      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>

          <div className="form-group">
            <input
              className="inputs"
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="inputs"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="login-forgot">
            <label>Esqueceu a senha?</label>
          </div>

          {erro && <div className="login-error">{erro}</div>}

          <button
            type="submit"
            className="login-button"
            onClick={handleStartGame}
          >
            Entrar
          </button>

          <div className="login-social">
            <label className="login-ou">Ou</label>

            <div className="login-icons">
              <div className="icon-button">
                <img src={GoogleIcon} alt="Google" />
                <label>Google</label>
              </div>
              <div className="icon-button">
                <img src={FacebookIcon} alt="Facebook" />
                <label>Facebook</label>
              </div>
            </div>

            <button
              type="button"
              className="register-button"
              onClick={SwitchRegister}
            >
              Criar uma conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioLogin;
