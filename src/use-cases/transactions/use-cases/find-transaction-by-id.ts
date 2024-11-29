import { Transaction } from '@prisma/client'
import type { TransactionsRepository } from '../../../repositories/transactions/transactions-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface FindTransactionByIdRequest {
  transactionId: string
}

interface FindTransactionByIdResponse {
  transaction: Transaction
}

export class FindTransactionByIdUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({
    transactionId,
  }: FindTransactionByIdRequest): Promise<FindTransactionByIdResponse> {
    const transaction =
      await this.transactionsRepository.findById(transactionId)

    if (!transaction) {
      throw new BadRequestError()
    }

    return { transaction }
  }
}
