import type { Transaction } from '@prisma/client'
import type { TransactionsRepository } from '../../../repositories/transactions/transactions-repository'

interface CreateTransactionRequest {
  transactionName: string
  isIncome: boolean
  amount: number
  description: string
  userId: string
}

interface CreateTransactionResponse {
  transaction: Transaction
}

export class CreateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    transactionName,
    amount,
    description,
    isIncome,
    userId,
  }: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const transaction = await this.transactionsRepository.create({
      transactionName,
      amount,
      description,
      isIncome,
      userId,
    })

    return { transaction }
  }
}
