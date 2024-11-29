import type { User } from '@prisma/client'
import type { UsersRepository } from '../../../repositories/users/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface CreateUserRequest {
  name: string
  email: string
  password: string
}

interface CreateUserResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    const hashedPassword = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return { user }
  }
}
