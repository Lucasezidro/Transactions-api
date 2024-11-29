import { PrismaTransactionsRepository } from '../../repositories/transactions/prisma/prisma-transactions-repository'
import { CreateTransactionUseCase } from '../../use-cases/transactions/use-cases/create-transaction'

export async function makeCreateTransaction() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const createTransactionsUseCase = new CreateTransactionUseCase(
    transactionsRepository,
  )

  return createTransactionsUseCase
}
