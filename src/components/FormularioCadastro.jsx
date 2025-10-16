import React, { useState } from "react";
import "./FormularioCadastro.css";
import OdsImage from "../assets/ods15vidaterrestre.png";
import FolhagemBackground from "../assets/folhagem-e-plantas-exoticas.jpg";

const FormularioCadastro = ({SwitchLogin}) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [termos, setTermos] = useState(false);
  const [erro, setErro] = useState("");

  const validarEmail = (email) => {
    // Regex simples para validação de email
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
    if (senha !== senha2) {
      setErro("As senhas não conferem.");
      return;
    }
    if (!termos) {
      setErro("É necessário concordar com os termos de privacidade.");
      return;
    }
    setErro("");
    // Aqui pode ser feita a submissão dos dados
    alert("Cadastro realizado com sucesso!");
  };
  return (
    // Div Pai: Usa Flexbox para dispor lado a lado
    <div
      style={{
        display: "flex",
        gap: "20px",
        width: "100%", // Ocupa 100% da largura do seu container.
        minHeight: "800px",
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
            minHeight: "100%",
            // Removido height: "100%" no formulário, para ele se ajustar ao conteúdo (melhor prática)
            boxSizing: "border-box",
            maxWidth: "400px", // Limita a largura máxima do formulário para melhor leitura
          }}
        >
          <h2
            style={{ color: "#fff", fontFamily: "Hero Bump", fontSize: "40px" }}
          >
            Cadastro
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              margin: "30px 0",
            }}
          >
            <input
              className="inputs"
              type="email"
              placeholder="Insira e-mail válido"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                height: "48px",
                borderRadius: "12px",
                padding: "0 10px",
                boxSizing: "border-box",

                border: "4px solid #c1ff72",
                backgroundColor: "#00bf63",
              }}
            />
            <input
              className="inputs"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                height: "48px",
                borderRadius: "12px",
                padding: "0 10px",
                boxSizing: "border-box",

                border: "4px solid #c1ff72",
                backgroundColor: "#00bf63",
              }}
            />
            <input
              className="inputs"
              type="password"
              placeholder="Digite novamente sua senha"
              value={senha2}
              onChange={(e) => setSenha2(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                height: "48px",
                borderRadius: "12px",
                padding: "0 10px",
                boxSizing: "border-box",

                border: "4px solid #c1ff72",
                backgroundColor: "#00bf63",
              }}
            />
          </div>
          <div
            style={{ display: "flex", alignItems: "center", margin: "30px 0" }}
          >
            <input
              type="checkbox"
              checked={termos}
              onChange={(e) => setTermos(e.target.checked)}
              style={{}}
            />
            <label
              style={{
                marginLeft: "8px",
                fontSize: "14px",
                fontWeight: "800",
                color: "#FFF",
              }}
            >
              Concordo com os termos de privacidade.
            </label>
          </div>
          {erro && (
            <div
              style={{ color: "#b22323", fontWeight: "700", margin: "10px 0" }}
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
          >
            Cadastrar
          </button>
          <div style={{margin:"30px 0", textAlign:"right"}}>
            <label
              onClick={SwitchLogin}
              style={{ fontWeight: "800", color: "#FFF", fontSize: "14px", cursor:"pointer" }}
            >
              Já possuo uma conta.
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCadastro;
