import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { UpdateUserUseCase } from '../use-cases/update-user'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(usersRepository)
  })

  it('should be to update a user', async () => {
    const newUser = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: newUser.id,
      email: newUser.email,
      name: 'Maria Doe',
      password: newUser.password,
    })

    expect(user.name).toEqual('Maria Doe')
  })
})
