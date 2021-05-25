export type User = {
  name: string;
  email: string;
  key?: Key;
  password: string;
};

type Key = {
  privateKeyArmored: string;
  publicKeyArmored: string;
  revocationCertificate: string;
};
