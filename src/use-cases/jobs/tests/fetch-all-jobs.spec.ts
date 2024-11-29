import { describe, it, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { InMemoryJobsRepository } from '../../../repositories/jobs/in-memory/in-memory-jobs-repositoy'
import { FetchAllJobsUseCase } from '../use-cases/fetch-all-jobs'

let usersRepository: InMemoryUsersRepository

let jobRepository: InMemoryJobsRepository
let sut: FetchAllJobsUseCase

describe('Fetch all Jobs', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    jobRepository = new InMemoryJobsRepository()
    sut = new FetchAllJobsUseCase(jobRepository)
  })

  it('should be able to fetch all jobs', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    jobRepository.create({
      salary: 8000,
      jobName: 'software developer',
      company: 'acme',
      isCurrentJob: true,
      jobStartedDate: new Date(),
      jobEndDate: new Date(),
      userId: user.id,
    })

    const { jobs } = await sut.execute({
      userId: user.id,
    })

    expect(jobs).toHaveLength(1)
  })
})
