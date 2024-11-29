import type { User } from '@prisma/client'
import type { UsersRepository } from '../../../repositories/users/users-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface UpdateUserRequest {
  userId: string
  name: string
  email: string
  password: string
}

interface UpdateUserResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    name,
    email,
    password,
  }: UpdateUserRequest): Promise<UpdateUserResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new BadRequestError()
    }

    user.name = name
    user.email = email
    user.password = password

    await this.usersRepository.update(user)

    return { user }
  }
}
