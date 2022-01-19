import util from './Util';
import IEmpresaParceira from '../models/IEmpresaParceira';
import ILoginRequest from '../models/ILoginRequest';
import IResponse from '../models/IResponse';

const realizarLogin = async (cnpj: string, password: string) => {
  const dados: ILoginRequest = {
    cpfCnpj: cnpj,
    password
  };

  try {
    const { data } = await util.api.post<IEmpresaParceira>(
      'pessoa/representante/cpf_cnpj',
      dados
    );

    const response: IResponse<IEmpresaParceira> = {
      data,
      sucesso: true
    };
    return response;
  } catch (erro) {
    return util.formatarErro(erro);
  }
};

export default { realizarLogin };
