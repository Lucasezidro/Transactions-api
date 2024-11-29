import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from '../use-cases/create-user'

let createUserRepository: InMemoryUsersRepository
let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    createUserRepository = new InMemoryUsersRepository()
    sut = new CreateUserUseCase(createUserRepository)
  })

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
