import { PrismaTransactionsRepository } from '../../repositories/transactions/prisma/prisma-transactions-repository'
import { UpdateTransactionUseCase } from '../../use-cases/transactions/use-cases/update-transaction'

export async function makeUpdateTransaction() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const updateTransactionsUseCase = new UpdateTransactionUseCase(
    transactionsRepository,
  )

  return updateTransactionsUseCase
}
