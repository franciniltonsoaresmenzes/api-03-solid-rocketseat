import { FastifyInstance } from 'fastify'
import { profile } from './profile'
import { authenticate } from './authenticate'
import { register } from './register'
import { verifyJwt } from '@/http/meddlewares/verify-jwt'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  // Authenticated
  app.get('/me', { onRequest: [verifyJwt] }, profile)
}
