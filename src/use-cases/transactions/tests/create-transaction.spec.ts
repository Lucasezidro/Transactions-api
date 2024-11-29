import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryTransactionsRepository } from '../../../repositories/transactions/in-memory/in-memory-transactions-repository'
import { CreateTransactionUseCase } from '../use-cases/create-transaction'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository

let createTransactionRepository: InMemoryTransactionsRepository
let sut: CreateTransactionUseCase

describe('Create Transaction', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    createTransactionRepository = new InMemoryTransactionsRepository()
    sut = new CreateTransactionUseCase(createTransactionRepository)
  })

  it('should be able to create a new transaction', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    const { transaction } = await sut.execute({
      amount: 10,
      description: 'case, smartphone',
      isIncome: false,
      transactionName: 'case',
      userId: user.id,
    })

    expect(transaction.id).toEqual(expect.any(String))
  })
})
