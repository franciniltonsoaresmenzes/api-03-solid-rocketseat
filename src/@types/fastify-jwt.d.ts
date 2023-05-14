import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    payload: {}
    user: {
      sub: string
      role: 'MEMBER' | 'ADMIN'
    }
  }
}
