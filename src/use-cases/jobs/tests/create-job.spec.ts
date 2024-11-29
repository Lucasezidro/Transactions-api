import { describe, it, beforeEach, expect } from 'vitest'
import { CreateJobUseCase } from '../use-cases/create-job'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { InMemoryJobsRepository } from '../../../repositories/jobs/in-memory/in-memory-jobs-repositoy'

let usersRepository: InMemoryUsersRepository

let createJobRepository: InMemoryJobsRepository
let sut: CreateJobUseCase

describe('Create Job', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    createJobRepository = new InMemoryJobsRepository()
    sut = new CreateJobUseCase(createJobRepository)
  })

  it('should be able to create a new job', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    const { job } = await sut.execute({
      salary: 8000,
      jobName: 'software developer',
      company: 'acme',
      isCurrentJob: true,
      jobStartedDate: new Date(),
      jobEndDate: new Date(),
      userId: user.id,
    })

    expect(job.id).toEqual(expect.any(String))
  })
})
