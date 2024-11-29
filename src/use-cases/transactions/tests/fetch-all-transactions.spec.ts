import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryTransactionsRepository } from '../../../repositories/transactions/in-memory/in-memory-transactions-repository'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { FetchAllTransactionsUseCase } from '../use-cases/fetch-all-transactions'

let usersRepository: InMemoryUsersRepository

let transactionRepository: InMemoryTransactionsRepository
let sut: FetchAllTransactionsUseCase

describe('Find Transaction By Id', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    transactionRepository = new InMemoryTransactionsRepository()
    sut = new FetchAllTransactionsUseCase(transactionRepository)
  })

  it('should be able to find a transaction by id', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    await transactionRepository.create({
      amount: 10,
      description: 'case, smartphone',
      isIncome: false,
      transactionName: 'case',
      userId: user.id,
    })

    await transactionRepository.create({
      amount: 60,
      description: 'Pizza Pepperoni',
      isIncome: false,
      transactionName: 'Pizza',
      userId: user.id,
    })

    const { transactions } = await sut.execute({
      userId: user.id,
    })

    expect(transactions).toHaveLength(2)
  })
})
