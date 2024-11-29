import type { Prisma, Transaction } from '@prisma/client'

export interface TransactionsRepository {
  create(
    transaction: Prisma.TransactionUncheckedCreateInput,
  ): Promise<Transaction>
  update(data: Transaction): Promise<Transaction>
  delete(data: Transaction): Promise<void>

  findById(transactionId: string): Promise<Transaction | null>
  findAll(userId: string): Promise<Transaction[]>
}
