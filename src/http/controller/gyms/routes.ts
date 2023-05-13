import { verifyJwt } from '@/http/meddlewares/verify-jwt'
import { FastifyInstance } from 'fastify'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
}
