import type { User } from '@prisma/client'
import type { UsersRepository } from '../../../repositories/users/users-repository'
import { compare } from 'bcryptjs'
import { InvalidCredencialsError } from '../errors/invalid-credentials-error'

interface AuthenticateRequest {
  email: string
  password: string
}

interface AuthenticateResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateRequest): Promise<AuthenticateResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredencialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredencialsError()
    }

    return {
      user,
    }
  }
}
