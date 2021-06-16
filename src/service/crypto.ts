import * as openpgp from "openpgp";
import type { User } from "../model/user";

export async function generateKeys(user: User) {
  const { privateKeyArmored, publicKeyArmored, revocationCertificate } = await openpgp.generateKey({
    type: "rsa",
    rsaBits: 4096,
    userIDs: [user],
    passphrase: user.password,
  });
  return { privateKeyArmored, publicKeyArmored, revocationCertificate };
}

export async function encryptMessage(from: User, to: User, clearText: string) {
  const publicKey = await openpgp.readKey({ armoredKey: to.key.publicKeyArmored });
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readKey({ armoredKey: from.key.privateKeyArmored }),
    passphrase: from.password,
  });

  return openpgp.encrypt({
    message: await openpgp.createMessage({ text: clearText }),
    publicKeys: publicKey,
    privateKeys: privateKey, // signing message
  });
}

export async function decryptMessage(from: User, to: User, encrypted: string) {
  let privateKey;
  let publicKey;
  try {
    privateKey = await openpgp.decryptKey({
      privateKey: await openpgp.readKey({ armoredKey: to.key.privateKeyArmored }),
      passphrase: to.password,
    });
  } catch (error) {
    console.log("Error obteniendo la clave privada para desencriptar");
    throw error;
  }
  try {
    publicKey = await openpgp.readKey({ armoredKey: from.key.publicKeyArmored });
  } catch (error) {
    console.log("Error obteniendo la clave pública para validar (opcional)");
  }

  const parsedArmoredMessage = await openpgp.readMessage({
    armoredMessage: encrypted,
  });

  const { data: decrypted, signatures } = await openpgp.decrypt({
    message: parsedArmoredMessage,
    publicKeys: publicKey, // for verification (optional)
    privateKeys: privateKey,
  });
  return { decrypted, valid: signatures[0].valid };
}
