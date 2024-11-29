import type { Transaction } from '@prisma/client'
import type { TransactionsRepository } from '../../../repositories/transactions/transactions-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface UpdateTransactionRequest {
  transactionName: string
  isIncome: boolean
  amount: number
  description: string
  transactionId: string
}

interface UpdateTransactionResponse {
  transaction: Transaction
}

export class UpdateTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    transactionName,
    amount,
    description,
    isIncome,
    transactionId,
  }: UpdateTransactionRequest): Promise<UpdateTransactionResponse> {
    const transaction =
      await this.transactionsRepository.findById(transactionId)

    if (!transaction) {
      throw new BadRequestError()
    }

    transaction.transactionName = transactionName
    transaction.amount = amount
    transaction.description = description
    transaction.isIncome = isIncome

    await this.transactionsRepository.update(transaction)

    return { transaction }
  }
}
