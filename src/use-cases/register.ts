import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExists } from './erros/user-already-exists'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExists()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
    return { user }
  }
}
