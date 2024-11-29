import { PrismaUsersRepository } from '../../repositories/users/prisma/prisma-users-repository'
import { FindUserByIdUseCase } from '../../use-cases/users/use-cases/find-user-by-id'

export async function makeFindUserById() {
  const usersRepository = new PrismaUsersRepository()
  const findUserByIdUseCase = new FindUserByIdUseCase(usersRepository)

  return findUserByIdUseCase
}
