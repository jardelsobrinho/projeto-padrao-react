import IDadosCliente from '../models/IDadosCliente';
import IResponse from '../models/IResponse';
import util from './Util';

const retornaDadosCliente = async (cpf: string) => {
  try {
    const { data } = await util.api.get<IDadosCliente>(
      `pessoa/cliente/cpf/${cpf}`
    );

    const response: IResponse<IDadosCliente> = {
      data,
      sucesso: true
    };
    return response;
  } catch (erro) {
    return util.formatarErro(erro);
  }
};

export default { retornaDadosCliente };
