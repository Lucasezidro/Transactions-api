import { PrismaTransactionsRepository } from '../../repositories/transactions/prisma/prisma-transactions-repository'
import { FetchAllTransactionsUseCase } from '../../use-cases/transactions/use-cases/fetch-all-transactions'

export async function makeFetchAllTransactions() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const fetchAllTransactionsUseCase = new FetchAllTransactionsUseCase(
    transactionsRepository,
  )

  return fetchAllTransactionsUseCase
}
