import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepositories } from '@/repositories/in-memory/in-memory-users-repositories'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsErros } from './erros/invalid-credentials-error'

let usersRepository: InMemoryUsersRepositories
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepositories()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@mail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'jhon@mail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'jhon@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsErros)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@mail.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'jhon@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsErros)
  })
})
