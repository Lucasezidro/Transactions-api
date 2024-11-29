import { describe, it, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../../repositories/users/in-memory/in-memory-users-repository'
import { InMemoryJobsRepository } from '../../../repositories/jobs/in-memory/in-memory-jobs-repositoy'
import { FindJobByIdUseCase } from '../use-cases/find-job-by-id'

let usersRepository: InMemoryUsersRepository

let jobRepository: InMemoryJobsRepository
let sut: FindJobByIdUseCase

describe('Update Job', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()

    jobRepository = new InMemoryJobsRepository()
    sut = new FindJobByIdUseCase(jobRepository)
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
      jobId: newJob.id,
    })

    expect(job.jobName).toEqual('software developer')
  })
})
