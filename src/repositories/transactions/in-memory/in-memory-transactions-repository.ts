import type { Prisma, Transaction } from '@prisma/client'
import type { TransactionsRepository } from '../transactions-repository'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public transactions: Transaction[] = []

  async create(
    transaction: Prisma.TransactionUncheckedCreateInput,
  ): Promise<Transaction> {
    const transactions = {
      id: 'transaction-id',
      transactionName: transaction.transactionName,
      isIncome: transaction.isIncome,
      amount: transaction.amount,
      userId: transaction.userId,
      description: transaction.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.transactions.push(transactions)

    return transactions
  }

  async update(data: Transaction): Promise<Transaction> {
    const indexTransaction = this.transactions.findIndex(
      (item) => item.id === data.id,
    )

    if (indexTransaction >= 0) {
      this.transactions[indexTransaction] = data
    }

    return data
  }

  async delete(data: Transaction): Promise<void> {
    const indexTransaction = this.transactions.findIndex(
      (item) => item.id === data.id,
    )

    this.transactions.splice(indexTransaction, 1)
  }

  async findById(transactionId: string): Promise<Transaction | null> {
    const transaction = this.transactions.find(
      (item) => item.id === transactionId,
    )

    if (!transaction) {
      return null
    }

    return transaction
  }

  async findAll(userId: string): Promise<Transaction[]> {
    const transactions = this.transactions.filter(
      (item) => item.userId === userId,
    )

    return transactions
  }
}
