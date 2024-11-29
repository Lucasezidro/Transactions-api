import { describe, it, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { InMemoryJobsRepository } from '../../../repositories/jobs/in-memory/in-memory-jobs-repositoy'
import { UpdateJobUseCase } from '../use-cases/update-job'

let usersRepository: InMemoryUsersRepository

let jobRepository: InMemoryJobsRepository
let sut: UpdateJobUseCase

describe('Update Job', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    jobRepository = new InMemoryJobsRepository()
    sut = new UpdateJobUseCase(jobRepository)
  })

  it('should be able to update job', async () => {
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

    const { job } = await sut.execute({
      salary: newJob.salary,
      jobName: newJob.jobName,
      company: newJob.company,
      isCurrentJob: false,
      jobStartedDate: newJob.jobStartedDate,
      jobEndDate: newJob.jobEndDate,
      jobId: newJob.id,
    })

    expect(job.isCurrentJob).toEqual(false)
  })
})
