import type { User } from '@prisma/client'
import type { UsersRepository } from '../../../repositories/users/users-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface FindUserByIdRequest {
  userId: string
}

interface FindUserByIdResponse {
  user: User
}

export class FindUserByIdUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
  }: FindUserByIdRequest): Promise<FindUserByIdResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new BadRequestError()
    }

    return { user }
  }
}
