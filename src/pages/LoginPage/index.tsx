import React, { useState } from 'react';
import Loading from '../../components/Loading';
import Sumario from '../../components/Sumario';
import services from '../../services/LoginService';
import IEmpresaParceira from '../../models/IEmpresaParceira';

interface IDadosLogin {
  cnpj: string;
  password: string;
}

interface IDadosValidacao {
  cnpjError: string;
  passwordError: string;
}

interface IProps {
  onLogarUsuario: (dadosCliente: IEmpresaParceira) => void;
}

const LoginPage: React.FC<IProps> = ({ onLogarUsuario }) => {
  const [dadosValidacao, setDadosValidacao] = useState<IDadosValidacao>({
    cnpjError: '',
    passwordError: ''
  });

  const [dadosLogin, setDadosLogin] = useState<IDadosLogin>({
    cnpj: '',
    password: ''
  });

  const [sumario, setSumario] = useState<string | undefined>('');

  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    const dadosValidosAux: IDadosValidacao = {
      cnpjError: '',
      passwordError: ''
    };
    let formValido = true;
    if (dadosLogin.cnpj === '') {
      dadosValidosAux.cnpjError = 'Campo obrigatório';
      formValido = false;
    }

    if (dadosLogin.password === '') {
      dadosValidosAux.passwordError = 'Campo obrigatório';
      formValido = false;
    }

    if (!formValido) {
      setDadosValidacao(dadosValidosAux);
    } else {
      setLoading(true);
      const response = await services.realizarLogin(
        dadosLogin.cnpj,
        dadosLogin.password
      );
      setLoading(false);

      if (!response.sucesso) {
        setSumario(response.erro);
      } else if (response.data != null) {
        onLogarUsuario(response.data);
      }
    }
  };

  const onChangeCnpj = (e: React.FormEvent<HTMLInputElement>): void => {
    setDadosLogin({ ...dadosLogin, cnpj: e.currentTarget.value });
    setDadosValidacao({ ...dadosValidacao, cnpjError: '' });
    setSumario('');
  };

  const onChangePassword = (e: React.FormEvent<HTMLInputElement>): void => {
    setDadosLogin({ ...dadosLogin, password: e.currentTarget.value });
    setDadosValidacao({ ...dadosValidacao, passwordError: '' });
    setSumario('');
  };

  const showLoading = () => {
    if (loading) {
      return <Loading />;
    }
    return <div />;
  };

  const exibirSumario = () => {
    if (sumario !== null && sumario !== '' && sumario !== undefined) {
      return <Sumario erro={sumario} />;
    }
    return <div />;
  };

  const showPasswordError = () => {
    if (
      dadosValidacao.passwordError === null ||
      dadosValidacao.passwordError === ''
    ) {
      return <div />;
    }
    return <div className="label-erro">{dadosValidacao.passwordError}</div>;
  };

  const showCnpjError = () => {
    if (dadosValidacao.cnpjError === null || dadosValidacao.cnpjError === '') {
      return <div />;
    }
    return <div className="label-erro">{dadosValidacao.cnpjError}</div>;
  };

  return (
    <div className="container-padrao">
      {showLoading()}

      <h3 className="container-titulo">Login - Consulta Clientes Ativos</h3>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="mt-4">
          <div className="grupo-item">
            <div className="label">CNPJ do Parceiro *</div>
            <input
              value={dadosLogin.cnpj}
              onChange={onChangeCnpj}
              type="text"
              className="input-text"
            />
            {showCnpjError()}
          </div>
          <div className="grupo-item">
            <div className="label">Password *</div>
            <input
              value={dadosLogin.password}
              onChange={onChangePassword}
              type="password"
              className="input-text"
            />
            {showPasswordError()}
          </div>
          {exibirSumario()}
          <div className="container-rodape">
            <button
              onClick={onLogin}
              className="
              btn-principal"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
