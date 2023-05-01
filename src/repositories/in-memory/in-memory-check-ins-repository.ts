import { Prisma, CheckIn } from '@prisma/client'
import { CheckInRepository } from '../checkin-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryCheckInsRepository implements CheckInRepository {
  private items: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}