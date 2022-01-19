import axios, { AxiosError } from 'axios';
import IResponse from '../models/IResponse';

const api = axios.create({
  baseURL: process.env.REACT_APP_URL
});

const formatarErro = (erro: any) => {
  const erroAux = erro as AxiosError;

  if (erroAux.response?.data.erro === undefined) {
    const responseError: IResponse<null> = {
      data: null,
      sucesso: false,
      erro: `erro: ${erroAux.response?.data.error}- path: ${erroAux.response?.data.path}- status:${erroAux.response?.status}`,
      detalhesErro: erroAux.response?.data.detalhesErro
    };
    return responseError;
  }
  const responseError: IResponse<null> = {
    data: null,
    sucesso: false,
    erro: erroAux.response?.data.erro,
    detalhesErro: erroAux.response?.data.detalhesErro
  };
  return responseError;
};

const cnpjMask = (cnpj: string) => {
  return (
    cnpj
      .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
      .replace(/(\d{2})(\d)/, '$1.$2')
      // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o
      // primeiro grupo ele adiciona um ponto antes do segundo grupo de número
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  ); // captura os dois últimos 2 números, com um - antes dos dois números
};

const cpfMask = (cpf: string) => {
  return (
    cpf
      .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1,
      // apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
  ); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
};

const formatarCpfCnpj = (cpfCnpj: string) => {
  if (cpfCnpj === null || cpfCnpj === '') {
    return cpfCnpj;
  }

  if (cpfCnpj.length === 14) {
    return cnpjMask(cpfCnpj);
  }

  if (cpfCnpj.length === 11) {
    return cpfMask(cpfCnpj);
  }

  return cpfCnpj;
};

export default { api, formatarErro, formatarCpfCnpj };
