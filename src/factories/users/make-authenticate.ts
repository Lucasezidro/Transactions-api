import { PrismaUsersRepository } from '../../repositories/users/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../../use-cases/users/use-cases/authenticate'

export async function makeAuthenticate() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
