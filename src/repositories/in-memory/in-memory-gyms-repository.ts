import { Gym } from '@prisma/client'
import { GymsRepository } from '../gyms-repository'

export class InMemoryGymsRepositories implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string): Promise<Gym | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }
}
