import { prisma } from './../../../lib/prisma'
import type { Prisma, Transaction } from '@prisma/client'
import type { TransactionsRepository } from '../transactions-repository'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(
    transaction: Prisma.TransactionUncheckedCreateInput,
  ): Promise<Transaction> {
    const transactions = await prisma.transaction.create({
      data: transaction,
    })

    return transactions
  }

  async update(data: Transaction): Promise<Transaction> {
    const transaction = await prisma.transaction.update({
      where: {
        id: data.id,
      },
      data,
    })

    return transaction
  }

  async delete(data: Transaction): Promise<void> {
    await prisma.transaction.delete({
      where: {
        id: data.id,
      },
    })
  }

  async findById(transactionId: string): Promise<Transaction | null> {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: transactionId,
      },
    })

    return transaction
  }

  async findAll(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Transaction[]> {
    return await prisma.transaction.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * perPage,
      take: perPage,
    })
  }
}
