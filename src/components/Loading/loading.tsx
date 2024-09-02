import React from 'react';
import './loading.scss';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-message">Carregando... aguarde</p>
    </div>
  );
};

export default Loading;
