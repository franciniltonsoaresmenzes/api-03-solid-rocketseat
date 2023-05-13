import { FastifyInstance } from 'fastify'
import { register } from './controller/user/register'
import { authenticate } from './controller/user/authenticate'
import { profile } from './controller/user/profile'
import { verifyJwt } from './meddlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Authenticated
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
