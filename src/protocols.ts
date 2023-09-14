export type ApplicationError = {
  name: string;
  message: string;
};

export type RequestError = {
  status: number;
  data: object | null;
  statusText: string;
  name: string;
  message: string;
};

export type Cepa = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export type Cep = {
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

// export type cep = {
//   cep: number | string | number[] | string[];
// }