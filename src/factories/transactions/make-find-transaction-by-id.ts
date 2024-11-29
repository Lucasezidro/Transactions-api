import { PrismaTransactionsRepository } from '../../repositories/transactions/prisma/prisma-transactions-repository'
import { FindTransactionByIdUseCase } from '../../use-cases/transactions/use-cases/find-transaction-by-id'

export async function makeFindTransactionById() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const findTransactionByIdUseCase = new FindTransactionByIdUseCase(
    transactionsRepository,
  )

  return findTransactionByIdUseCase
}
