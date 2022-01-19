import React, { useState } from 'react';
import IEmpresaParceira from '../../../../models/IEmpresaParceira';
import services from '../../../../services/DadosClienteService';
import Sumario from '../../../../components/Sumario';
import Loading from '../../../../components/Loading';
import IDadosCliente from '../../../../models/IDadosCliente';
import util from '../../../../services/Util';

interface IProps {
  onDesconectarUsuario: () => void;
  onClienteEncontrado: (dadosCliente: IDadosCliente) => void;
  empresaParceira: IEmpresaParceira;
}

const FormConsultaCliente: React.FC<IProps> = ({
  onDesconectarUsuario,
  onClienteEncontrado,
  empresaParceira
}) => {
  const [cpfCliente, setCpfCliente] = useState<string>('');
  const [cpfClienteErro, setCpfClienteErro] = useState<string>('');
  const [sumario, setSumario] = useState<string | undefined>('');
  const [loading, setLoading] = useState(false);

  const onConsultaCpfCliente = async () => {
    if (cpfCliente === '') {
      setCpfClienteErro('Campo obrigatório');
      return;
    }

    setSumario('');
    setLoading(true);
    const response = await services.retornaDadosCliente(cpfCliente);
    setLoading(false);
    if (response.sucesso) {
      if (response.data !== null) {
        onClienteEncontrado(response.data);
      }
    } else {
      setSumario(response.erro);
    }
  };

  const exibirSumario = () => {
    if (sumario !== null && sumario !== '' && sumario !== undefined) {
      return <Sumario erro={sumario} />;
    }
    return <div />;
  };

  const onChangeCPFCliente = (e: React.FormEvent<HTMLInputElement>): void => {
    setCpfCliente(e.currentTarget.value);
    setCpfClienteErro('');
    setSumario('');
  };

  const showCpfErro = () => {
    if (cpfClienteErro === null || cpfClienteErro === '') {
      return <div />;
    }
    return <div className="label-erro">{cpfClienteErro}</div>;
  };

  const showLoading = () => {
    if (loading) {
      return <Loading />;
    }
    return <div />;
  };

  return (
    <div className="container-padrao">
      {showLoading()}
      <h3 className="container-titulo">Consulta Clientes Ativos</h3>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <div className="label">Nome Empresa Parceira</div>
          <div className="label-destaque">{empresaParceira.razaoSocial}</div>
        </div>
        <div className="mb-4">
          <div className="label">CNPJ Empresa Parceira</div>
          <div className="label-destaque">
            {util.formatarCpfCnpj(empresaParceira.cpfCnpj)}
          </div>
        </div>
        <div className="mt-4">
          <div className="grupo-item">
            <div className="label">CPF/CNPJ do Cliente</div>
            <input
              type="text"
              className="input-text"
              onChange={onChangeCPFCliente}
              value={cpfCliente}
            />
            {showCpfErro()}
          </div>
        </div>
        <div>{exibirSumario()}</div>
        <div className="mt-4">
          <div className="container-rodape">
            <button onClick={onConsultaCpfCliente} className="btn-principal">
              Consultar
            </button>

            <button onClick={onDesconectarUsuario} className="btn">
              Logout
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormConsultaCliente;
