import React, { useState } from "react";
import "./FormularioLogin.css";
import GoogleIcon from "../assets/Google.svg";
import FacebookIcon from "../assets/Facebook.svg";
import OdsImage from "../assets/ods15vidaterrestre.png";
import FolhagemBackground from "../assets/folhagem-e-plantas-exoticas.jpg";

const FormularioLogin = ({ SwitchRegister, handleStartGame }) => {
  // ... (Estados e funções de validação omitidos para brevidade, pois não mudam)
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const validarEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

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
    alert(`Tentativa de Login com E-mail: ${email} e Senha.`);
  };

  return (
    // Div Pai: Usa Flexbox para dispor lado a lado
    <div
      style={{
        display: "flex",
        gap: "20px",
        width: "100%", // Ocupa 100% da largura do seu container.
        padding: "30px",
        borderRadius: "15px",
        boxSizing: "border-box",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${FolhagemBackground})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* 1. Div da Imagem (Lado Esquerdo) */}
      <div
        style={{
          // Define que esta div deve ocupar 50% da largura disponível
          width: "50%",
          // Garante que o conteúdo (a imagem) preencha todo o espaço vertical
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden", // Esconde partes da imagem que possam vazar
        }}
      >
        <img
          src={OdsImage}
          alt="ODS Vida Terrestre"
          style={{
            // Ajusta a imagem para cobrir a área da div sem distorcer (mantém a proporção)
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "12px", // Adicionado para combinar com o formulário
          }}
        />
      </div>

      <div
        style={{
          // Define que esta div deve ocupar os outros 50% da largura disponível
          width: "50%",
          // Permite que o conteúdo se alinhe no centro verticalmente, se desejado
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          boxSizing: "border-box",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255,255,255,0.5)",
            padding: "2rem",
            borderRadius: "12px",
            // A largura do formulário é agora 100% da sua div pai (que é 50% do container principal)
            width: "100%",
            // Removido height: "100%" no formulário, para ele se ajustar ao conteúdo (melhor prática)
            boxSizing: "border-box",
            maxWidth: "400px", // Limita a largura máxima do formulário para melhor leitura
          }}
        >
          {/* Conteúdo do Formulário (inalterado) */}
          <h2
            style={{ color: "#fff", fontFamily: "Hero Bump", fontSize: "40px" }}
          >
            Login
          </h2>
          {/* ... Inputs e botões (inalterados) ... */}
          <input
            className="inputs"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              height: "48px",
              borderRadius: "12px",
              padding: "0 10px",
              boxSizing: "border-box",
              margin: "30px 0",
              border: "4px solid #c1ff72",
              backgroundColor: "#00bf63",
            }}
          />
          <input
            className="inputs"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            style={{
              display: "block",
              width: "100%",
              height: "48px",
              borderRadius: "12px",
              padding: "0 10px",
              boxSizing: "border-box",
              margin: "30px 0",
              border: "4px solid #c1ff72",
              backgroundColor: "#00bf63",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
              margin: "30px 0",
            }}
          >
            <label
              style={{
                marginLeft: "8px",
                fontSize: "16px",
                fontWeight: "800",
                color: "#FFF",
                cursor: "pointer",
              }}
            >
              Esqueceu a senha?
            </label>
          </div>
          {erro && (
            <div
              style={{
                color: "#b22323",
                fontWeight: "700",
                margin: "10px 0",
              }}
            >
              {erro}
            </div>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              background: "#478DF2",
              color: "#fff",
              border: "4px solid #0cc0df",
              borderRadius: "12px",
              fontFamily: "Open sans",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={handleStartGame}
          >
            Entrar
          </button>

          {/* Opções de Login Social e Criar Conta (inalteradas) */}
          <div
            style={{
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <label style={{ color: "#fff", fontWeight: "700" }}>Ou</label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <img src={GoogleIcon} alt="Google" style={{ height: "40px" }} />
                <label style={{ color: "#fff", fontWeight: "700" }}>
                  Google
                </label>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={FacebookIcon}
                  alt="Facebook"
                  style={{ height: "40px" }}
                />
                <label style={{ color: "#fff", fontWeight: "700" }}>
                  Facebook
                </label>
              </div>
            </div>
            <button
              type="button"
              onClick={SwitchRegister}
              style={{
                marginTop: "70px",
                width: "100%",
                padding: "10px",
                background: "#478DF2",
                color: "#fff",
                border: "4px solid #0cc0df",
                borderRadius: "12px",
                fontFamily: "Open sans",
                fontWeight: "bold",
                cursor: "pointer",
              }}
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
