import { expressjwt, GetVerificationKey } from 'express-jwt';
import jwksRsa from 'jwks-rsa';
const authConfig = require('../config/auth_config.json');

export const checkJwt = expressjwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${authConfig.domain}.well-known/jwks.json`,
  }) as GetVerificationKey,

  audience: authConfig.audience,
  issuer: authConfig.domain,
  algorithms: ['RS256'],
});
