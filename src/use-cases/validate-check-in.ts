import { CheckIn } from '@prisma/client'
import { CheckInRepository } from '@/repositories/checkin-repository'
import { ResourceNotFound } from './erros/resource-not-found-error'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private chekInRepository: CheckInRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.chekInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    checkIn.validated_at = new Date()

    await this.chekInRepository.save(checkIn)

    return { checkIn }
  }
}
