import { sign, verify } from 'jsonwebtoken';
import { errorResponse } from './errorResponse';

export class JWT {
  static generateToken(secret: string, subject: string, payload: Object) {
    const token = sign(payload, secret, {
      expiresIn: '360d',
      subject,
    });

    return token;
  }

  static verifyToken(secret: string, token: string) {
    const payload = verify(token, secret);

    if (!payload) {
      throw errorResponse('Invalid token', 401);
    }

    return payload;
  }
}
