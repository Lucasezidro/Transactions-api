import { Transaction } from '@prisma/client'
import type { TransactionsRepository } from '../../../repositories/transactions/transactions-repository'

interface FetchAllTransactionsRequest {
  userId: string
}

interface FetchAllTransactionsResponse {
  transactions: Transaction[]
}

export class FetchAllTransactionsUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    userId,
  }: FetchAllTransactionsRequest): Promise<FetchAllTransactionsResponse> {
    const transactions = await this.transactionsRepository.findAll(userId)

    return { transactions }
  }
}
