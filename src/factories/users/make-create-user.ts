import { PrismaUsersRepository } from '../../repositories/users/prisma/prisma-users-repository'
import { CreateUserUseCase } from '../../use-cases/users/use-cases/create-user'

export async function makeCreateUser() {
  const usersRepository = new PrismaUsersRepository()
  const createUsersUseCase = new CreateUserUseCase(usersRepository)

  return createUsersUseCase
}
