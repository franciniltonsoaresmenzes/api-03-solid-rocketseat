import { FastifyInstance } from 'fastify'
import { register } from './controller/register'
import { authenticate } from './controller/authenticate'
import { profile } from './controller/profile'
import { verifyJwt } from './meddlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Authenticated
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
