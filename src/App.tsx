import React, { useState, useEffect } from 'react';
import './App.css';

import LoginPage from './pages/LoginPage';
import DadosClientePage from './pages/DadosClientesPage';
import IEmpresaParceira from './models/IEmpresaParceira';

const App: React.FC = () => {
  useEffect(() => {
    document.title = 'Consulta Clientes Ativos';
  }, []);

  const [usuarioLogado, setUsuarioLogado] = useState(false);
  const [empresaParceira, setEmpresaParceira] = useState<IEmpresaParceira>({
    codigo: 0,
    cpfCnpj: '',
    razaoSocial: ''
  });

  const onLogarUsuario = (dadosEmpresa: IEmpresaParceira) => {
    setUsuarioLogado(true);
    setEmpresaParceira(dadosEmpresa);
  };

  const onDesconectarUsuario = () => {
    setUsuarioLogado(false);
  };

  const exibirConteudo = () => {
    if (usuarioLogado) {
      return (
        <DadosClientePage
          onDesconectarUsuario={onDesconectarUsuario}
          empresaParceira={empresaParceira}
        />
      );
    }
    return <LoginPage onLogarUsuario={onLogarUsuario} />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="bg-gray-300 flex-grow flex items-center justify-center px-4">
        {exibirConteudo()}
      </main>
      <footer className="bg-gray-800">
        <img
          className="img-fluid p-4"
          src={`${process.env.PUBLIC_URL}/assets/images/logo_bless_footer.png`}
          alt="logo"
        />
      </footer>
    </div>
  );
};

export default App;
