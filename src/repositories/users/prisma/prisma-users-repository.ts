import { prisma } from './../../../lib/prisma'
import type { Prisma, User } from '@prisma/client'
import type { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async update(data: User): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: data.id,
      },
      data,
    })

    return user
  }

  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
