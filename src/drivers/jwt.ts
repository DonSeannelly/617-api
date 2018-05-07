import * as jwt from 'express-jwt';
import * as dotenv from 'dotenv';
import * as jsonwebtoken from 'jsonwebtoken';

dotenv.config();

export const enforceTokenAccess = jwt({
  secret: process.env.KEY,
  issuer: process.env.ISSUER,
  getToken: req => {
    return req.cookies.presence;
  }
}).unless({
  path: ['/users', { url: '/users/tokens', methods: ['POST'] }],
})


/**
 * Generates a signed JWT for a user.
 */
export function generateToken({ firstname, lastname, email, id }): string {
  const payload = {
    firstname,
    lastname,
    email,
    id
  };
  const options = {
    issuer: process.env.ISSUER,
    expiresIn: 86400,
    audience: email
  };
  const token = jsonwebtoken.sign(payload, process.env.KEY, options);
  return token;
}

/**
 * Accepts a JWT and verifies that the token has been properly issued
 *
 * @param token the JWT as a string
 * @param callback the function to execute after verification
 */
export function verifyJWT(
  token: string,
  res: any,
  callback: Function
): boolean {
  try {
    const decoded = jsonwebtoken.verify(token, process.env.KEY, {});

    if (typeof callback === 'function') {
      callback(status, decoded);
    }

    return true;
  } catch (error) {
    return false;
  }
}
