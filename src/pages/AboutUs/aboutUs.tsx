import { useEffect, useState } from 'react';
import { getAboutUs } from 'services/aboutUsService';
import './aboutUs.scss';

interface AboutUsInfo {
  id: number;
  content: string;
  updateAt: string;
}

export const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h2 className="about-us-title">Sobre nós</h2>
      <p className="about-us-content">
        Aplicativo em formato de rede social que visa unir projetos de
        epacjxtensão desenvolvidos por cursos de direito.
        <br />
        <strong>Foco:</strong> Acesso à Justiça.
        <br />
        <strong>Objetivo:</strong> Criar uma rede de projetos.
      </p>

      <div className="contact-section">
        <h3>Contatos</h3>
        <p>Telefone: (51) 99999-9999</p>
        <p>Email: exemplo@pucrs.com.br</p>
      </div>

      <div className="social-section">
        <h3>Conecte-se Conosco</h3>
        <div className="social-icons">
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="social-icon instagram"
          >
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a
            href="https://youtube.com"
            aria-label="YouTube"
            className="social-icon youtube"
          >
            <i className="fab fa-youtube fa-2x"></i>
          </a>
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className="social-icon linkedin"
          >
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
        </div>
      </div>

      <div className="logos-section">
        <img src="path_to_capes_logo" alt="Capes" className="logo" />
        <img src="path_to_cnpq_logo" alt="CNPq" className="logo" />
        <img src="path_to_pucrs_logo" alt="PUCRS" className="logo" />
        <img src="path_to_ufrgs_logo" alt="UFRGS" className="logo" />
        <img src="path_to_ages_logo" alt="Ages" className="logo" />
      </div>
    </div>
  );
};

//Ver logos das redes sociais e dos parceiros
