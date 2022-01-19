import React from 'react';

interface IProps {
  erro: string;
}

const Sumario: React.FC<IProps> = ({ erro }) => {
  return (
    <div className="alerta">
      <div>{erro}</div>
    </div>
  );
};

export default Sumario;
