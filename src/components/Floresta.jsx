import React from 'react';
import './Floresta.css';

import imagemArvore from './assets/arvore-plantada.png';
import imagemTerreno from './assets/terreno-vazio.png';

const Floresta = ({arvoresAtuais, metaDeArvores}) =>{
    const slotsDaFloresta = Array.from({length: metaDeArvores});
    return(
        <div className="container-floresta">
      <h2>Sua Floresta</h2>
      <p>Veja seu progresso! Cada árvore representa seu esforço.</p>
      
      <div className="slots-container">
        {slotsDaFloresta.map((_, index) => {
          // Se o índice for menor que o número de árvores, mostra a árvore plantada
          if (index < arvoresAtuais) {
            return (
              <div key={index} className="slot-arvore">
                <img src={imagemArvore} alt="Árvore Plantada" />
              </div>
            );
          } else {
            // Senão, mostra o terreno vazio
            return (
              <div key={index} className="slot-arvore">
                <img src={imagemTerreno} alt="Terreno Vazio" />
              </div>
            );
          }
        })}
      </div>
    </div>
    );
};

export default Floresta;