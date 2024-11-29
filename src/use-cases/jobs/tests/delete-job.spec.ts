import { describe, it, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { InMemoryJobsRepository } from '../../../repositories/jobs/in-memory/in-memory-jobs-repositoy'
import { DeleteJobUseCase } from '../use-cases/delete-job'

let usersRepository: InMemoryUsersRepository

let jobRepository: InMemoryJobsRepository
let sut: DeleteJobUseCase

describe('Delete Job', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    jobRepository = new InMemoryJobsRepository()
    sut = new DeleteJobUseCase(jobRepository)
  })

  it('should be able to delete job', async () => {
    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@exemple.com',
      password: await hash('123456', 6),
    })

    const newJob = await jobRepository.create({
      salary: 8000,
      jobName: 'software developer',
      company: 'acme',
      isCurrentJob: true,
      jobStartedDate: new Date(),
      jobEndDate: new Date(),
      userId: user.id,
    })

    await sut.execute({
      jobId: newJob.id,
    })

    expect(jobRepository.jobs).toHaveLength(0)
  })
})
