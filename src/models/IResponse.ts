interface IResponse<T> {
  data: T;
  sucesso: boolean;
  erro?: string;
  detalhesErro?: string;
}

export default IResponse;
