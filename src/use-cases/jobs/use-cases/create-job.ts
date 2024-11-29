import type { Job } from '@prisma/client'
import type { JobsRepository } from '../../../repositories/jobs/jobs-repository'

interface CreateJobRequest {
  jobName: string
  salary: number
  company: string
  jobStartedDate: Date
  jobEndDate: Date | null
  isCurrentJob: boolean
  userId: string
}

interface CreateJobResponse {
  job: Job
}

export class CreateJobUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    jobName,
    salary,
    company,
    isCurrentJob,
    jobEndDate,
    jobStartedDate,
    userId,
  }: CreateJobRequest): Promise<CreateJobResponse> {
    const job = await this.jobsRepository.create({
      jobName,
      salary,
      company,
      isCurrentJob,
      jobEndDate,
      jobStartedDate,
      userId,
    })

    return { job }
  }
}
