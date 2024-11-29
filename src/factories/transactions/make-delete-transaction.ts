import { PrismaTransactionsRepository } from '../../repositories/transactions/prisma/prisma-transactions-repository'
import { DeleteTransactionUseCase } from '../../use-cases/transactions/use-cases/delete-transaction'

export async function makeDeleteTransaction() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const deleteTransactionsUseCase = new DeleteTransactionUseCase(
    transactionsRepository,
  )

  return deleteTransactionsUseCase
}
