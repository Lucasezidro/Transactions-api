import { PrismaUsersRepository } from '../../repositories/users/prisma/prisma-users-repository'
import { UpdateUserUseCase } from '../../use-cases/users/use-cases/update-user'

export async function makeUpdateUser() {
  const usersRepository = new PrismaUsersRepository()
  const updateUsersUseCase = new UpdateUserUseCase(usersRepository)

  return updateUsersUseCase
}
