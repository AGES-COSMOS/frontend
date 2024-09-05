import React, { useState } from 'react';
import './createProjects.css';

export const CreateProjects = () => {
  return (
    <div className="create-project">
      <h1>Cadastro de Projeto</h1>
      <img
        src="public/assets/projectPlaceholder.png"
        alt="Imagem de Capa do Projeto"
      ></img>
      <div className="form">
        <textarea placeholder="Nome"></textarea>
        <select className="item">
          <option>Instituição</option>
          <option>Pucrs</option>
          <option>Ufgrs</option>
        </select>
        <select className="item">
          <option>Categoria do Projeto</option>
          <option>Direito Civil</option>
        </select>
        <select className="item">
          <option>Professor Resposável</option>
          <option>Jorge Batista</option>
        </select>
        <select className="item">
          <option>Data de Início</option>
          <option>Pucrs</option>
        </select>
        <select className="item">
          <option>Data de Fim</option>
          <option>Pucrs</option>
        </select>
        <select className="item">
          <option>Status do Projeto</option>
          <option>Em Andamento</option>
          <option>Finalizado</option>
        </select>
        <select className="item">
          <option>Palavras Chave</option>
          <option>Direito</option>
        </select>
        <textarea placeholder="História"></textarea>
        <textarea placeholder="Motivo"></textarea>
      </div>
    </div>
  );
};
