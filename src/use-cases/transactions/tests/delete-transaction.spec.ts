import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryTransactionsRepository } from '../../../repositories/transactions/in-memory/in-memory-transactions-repository'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { DeleteTransactionUseCase } from '../use-cases/delete-transaction'

let usersRepository: InMemoryUsersRepository

let transactionRepository: InMemoryTransactionsRepository
let sut: DeleteTransactionUseCase

describe('Delete Transaction', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    transactionRepository = new InMemoryTransactionsRepository()
    sut = new DeleteTransactionUseCase(transactionRepository)
  })

  it('should be able to delete a transaction', async () => {
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

    await sut.execute({
      transactionId: newTransaction.id,
    })

    expect(transactionRepository.transactions).toHaveLength(0)
  })
})
