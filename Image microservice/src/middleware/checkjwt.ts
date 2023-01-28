import { expressjwt, GetVerificationKey, Request } from 'express-jwt';
import { Response, NextFunction } from 'express';
import jwksRsa from 'jwks-rsa';
import log from '../utils/logger';
var guard = require('express-jwt-permissions')({
  permissionsProperty: 'permissions',
});

// const authConfig = require('../config/auth_config.json');
const authConfig = {
  domain: 'https://dev-a7jprgzu.us.auth0.com/',
  audience: 'https://auth-service',
};

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

export const checkScopes = (permissions: string | string[]) =>
  guard.check(permissions);
