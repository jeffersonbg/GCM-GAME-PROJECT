import React from 'react';
import './CardDev.css';
import { FaGithub, FaLinkedin } from "react-icons/fa";


// Ícones de exemplo: Em um projeto real, você usaria uma biblioteca como 'react-icons'
const IconeLinkedIn = () => <span role="img" aria-label="LinkedIn"><FaLinkedin />
</span>;
const IconeGitHub = () => <span role="img" aria-label="GitHub"><FaGithub/></span>;

function CardDev({ nome, especialidade, fotoUrl, linkedinUrl, githubUrl }) {
  return (
    <div className="card-dev">
      
      {/* 1. Área da Foto */}
      <div className="card-dev-foto">
        <img 
          src={fotoUrl || 'caminho/para/foto/default.jpg'} // Usa a foto fornecida ou uma padrão
          alt={`Foto de ${nome}`}
        />
      </div>

      <div className="card-dev-info">
        
        {/* 2. Nome do Desenvolvedor */}
        <h3 className="card-dev-nome">{nome}</h3>
        
        {/* 3. Especialidade */}
        <p className="card-dev-especialidade">{especialidade}</p>
        
        {/* 4. Ícones de Redes Sociais */}
        <div className="card-dev-redes">
          
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
              <IconeLinkedIn />
            </a>
          )}
          
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="social-icon github">
              <IconeGitHub />
            </a>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default CardDev;