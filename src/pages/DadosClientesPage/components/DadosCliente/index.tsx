import React from 'react';
import IDadosCliente from '../../../../models/IDadosCliente';
import util from '../../../../services/Util';

interface IProps {
  onDesconectarUsuario: () => void;
  onNovaPesquisa: () => void;
  dadosCliente: IDadosCliente;
}

const DadosCliente: React.FC<IProps> = ({
  onDesconectarUsuario,
  onNovaPesquisa,
  dadosCliente
}) => {
  return (
    <div className="container-padrao">
      <h3 className="container-titulo">Dados do Cliente</h3>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <div className="mt-4">
          <div className="mb-4">
            <div className="label">Nome</div>
            <div className="label-destaque">{dadosCliente.nome}</div>
          </div>
          <div className="mb-4">
            <div className="label">CPF/CNPJ</div>
            <div className="label-destaque">
              {util.formatarCpfCnpj(dadosCliente.cpfCnpj)}
            </div>
          </div>
          <div className="mb-4">
            <div className="label">Situação</div>
            <div className="label-destaque">{dadosCliente.status}</div>
          </div>
          <div className="flex items-baseline justify-between">
            <button
              onClick={onNovaPesquisa}
              className="
              rounded-md border-none px-6 py-2 mt-4 text-white bg-blue-400  hover:bg-blue-500"
            >
              Nova Pesquisa
            </button>

            <button
              onClick={onDesconectarUsuario}
              className="
              rounded-md border-none px-6 py-2 mt-4 text-white bg-gray-400  hover:bg-gray-500"
            >
              Logout
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DadosCliente;
