import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepositories } from '@/repositories/in-memory/in-memory-users-repositories'
import { UserAlreadyExists } from './erros/user-already-exists'

describe('Register Use Case', () => {
  it('should be able to register', async () => {
    const usersRepository = new InMemoryUsersRepositories()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhon@mail.com',
      password: '12346',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepositories()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Jhon Doe',
      email: 'jhon@mail.com',
      password: '12346',
    })
    const isPasswordCorrectlyHashed = await compare('12346', user.password_hash)

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepositories()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'jhondoe@example.com'

    await registerUseCase.execute({
      name: 'Jhon Doe',
      email,
      password: '12346',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Jhon Doe',
        email,
        password: '12346',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})
