import type { Prisma, User } from '@prisma/client'
import type { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: 'user-id',
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(user)

    return user
  }

  async update(data: User): Promise<User> {
    const indexUser = this.users.findIndex((item) => item.id === data.id)

    if (indexUser >= 0) {
      this.users[indexUser] = data
    }

    return data
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === userId)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
