import { Prisma } from '@prisma/client'

export class InMemoryUsersRepostory {
  public users: any[] = []

  async create(data: Prisma.UserCreateInput) {
    this.users.push(data)
  }
}
