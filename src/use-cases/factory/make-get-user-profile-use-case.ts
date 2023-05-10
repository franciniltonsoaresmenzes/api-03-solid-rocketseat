import { PrismaUsersRepostory } from '@/repositories/prisma/prisma-users-repository'
import { GetUserProfile } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepostory()
  const useCase = new GetUserProfile(usersRepository)

  return useCase
}
