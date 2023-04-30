import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaUsersRepostory {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })
    return user
  }
}
