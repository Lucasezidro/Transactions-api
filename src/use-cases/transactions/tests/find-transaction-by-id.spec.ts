import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryTransactionsRepository } from '../../../repositories/transactions/in-memory/in-memory-transactions-repository'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { FindTransactionByIdUseCase } from '../use-cases/find-transaction-by-id'

let usersRepository: InMemoryUsersRepository

let transactionRepository: InMemoryTransactionsRepository
let sut: FindTransactionByIdUseCase

describe('Find Transaction By Id', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    transactionRepository = new InMemoryTransactionsRepository()
    sut = new FindTransactionByIdUseCase(transactionRepository)
  })

  it('should be able to find a transaction by id', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    const newTransaction = await transactionRepository.create({
      amount: 10,
      description: 'case, smartphone',
      isIncome: false,
      transactionName: 'case',
      userId: user.id,
    })

    const { transaction } = await sut.execute({
      transactionId: newTransaction.id,
    })

    expect(transaction.description).toEqual('case, smartphone')
  })
})
