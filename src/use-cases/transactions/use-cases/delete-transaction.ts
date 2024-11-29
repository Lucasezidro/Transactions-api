import type { TransactionsRepository } from '../../../repositories/transactions/transactions-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface DeleteTransactionRequest {
  transactionId: string
}

export class DeleteTransactionUseCase {
  constructor(private transactionsRepository: TransactionsRepository) {}

  async execute({ transactionId }: DeleteTransactionRequest): Promise<void> {
    const transaction =
      await this.transactionsRepository.findById(transactionId)

    if (!transaction) {
      throw new BadRequestError()
    }

    this.transactionsRepository.delete(transaction)
  }
}
