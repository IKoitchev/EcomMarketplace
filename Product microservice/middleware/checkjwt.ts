import { expressjwt, GetVerificationKey, Request } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
var guard = require('express-jwt-permissions')({
  permissionsProperty: 'permissions',
});

// const authConfig = require('../config/auth_config.json');
const authConfig = {
  domain: process.env.DOMAIN,
  audience: process.env.AUDIENCE,
};
// check if token is valid
export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${authConfig.domain}.well-known/jwks.json`,
  }) as GetVerificationKey,
  requestProperty: 'user',
  audience: authConfig.audience,
  issuer: authConfig.domain,
  algorithms: ['RS256'],
});
// check if user has necessary permissions
export const checkScopes = (permissions: string | string[]) =>
  guard.check(permissions);
