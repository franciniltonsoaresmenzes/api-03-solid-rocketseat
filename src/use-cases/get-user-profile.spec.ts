import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepositories } from '@/repositories/in-memory/in-memory-users-repositories'
import { hash } from 'bcryptjs'
import { GetUserProfile } from './get-user-profile'
import { ResourceNotFound } from './erros/resource-not-found-error'

let usersRepository: InMemoryUsersRepositories
let sut: GetUserProfile

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepositories()
    sut = new GetUserProfile(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createUser = await usersRepository.create({
      name: 'Jhon Doe',
      email: 'jhon@mail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createUser.id,
    })

    expect(user.name).toEqual('Jhon Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})
