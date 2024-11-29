import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryTransactionsRepository } from '../../../repositories/transactions/in-memory/in-memory-transactions-repository'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { UpdateTransactionUseCase } from '../use-cases/update-transaction'

let usersRepository: InMemoryUsersRepository

let transactionRepository: InMemoryTransactionsRepository
let sut: UpdateTransactionUseCase

describe('Update Transaction', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    transactionRepository = new InMemoryTransactionsRepository()
    sut = new UpdateTransactionUseCase(transactionRepository)
  })

  it('should be able to update transaction', async () => {
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
      amount: 10,
      description: 'case, smartphone',
      isIncome: true,
      transactionName: 'case',
      transactionId: newTransaction.id,
    })

    expect(transaction.isIncome).toEqual(true)
  })
})
