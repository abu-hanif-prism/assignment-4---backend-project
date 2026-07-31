import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';

export type TExpiresIn = NonNullable<SignOptions['expiresIn']>;

const createToken = (payload: object, secret: string, expiresIn: TExpiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const JwtHelpers = {
  createToken,
  verifyToken,
};
