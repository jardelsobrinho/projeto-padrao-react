import React, { useState } from 'react';
import IDadosCliente from '../../models/IDadosCliente';
import IEmpresaParceira from '../../models/IEmpresaParceira';

import DadosCliente from './components/DadosCliente';
import FormConsultaCliente from './components/FormConsultaCliente';

interface IProps {
  onDesconectarUsuario: () => void;
  empresaParceira: IEmpresaParceira;
}

const DadosClientePage: React.FC<IProps> = ({
  onDesconectarUsuario,
  empresaParceira
}) => {
  const [clienteEncontrado, setClienteEncontrado] = useState(false);
  const [dadosCliente, setDadosCliente] = useState<IDadosCliente>({
    codigo: 0,
    nome: '',
    cpfCnpj: '',
    status: ''
  });

  const onClienteEncontrado = (dados: IDadosCliente) => {
    setClienteEncontrado(true);
    setDadosCliente(dados);
  };

  const onNovaPesquisa = () => {
    setClienteEncontrado(false);
  };

  const exibirConteudo = () => {
    if (clienteEncontrado) {
      return (
        <DadosCliente
          onDesconectarUsuario={onDesconectarUsuario}
          onNovaPesquisa={onNovaPesquisa}
          dadosCliente={dadosCliente}
        />
      );
    }
    return (
      <FormConsultaCliente
        onDesconectarUsuario={onDesconectarUsuario}
        onClienteEncontrado={onClienteEncontrado}
        empresaParceira={empresaParceira}
      />
    );
  };

  return exibirConteudo();
};

export default DadosClientePage;
