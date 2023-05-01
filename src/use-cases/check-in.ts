import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/checkin-repository'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private chekInRepository: CheckInRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.chekInRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
