import type { Job } from '@prisma/client'
import type { JobsRepository } from '../../../repositories/jobs/jobs-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface UpdateJobRequest {
  jobName: string
  salary: number
  company: string
  jobStartedDate: Date
  jobEndDate: Date | null
  isCurrentJob: boolean
  jobId: string
}

interface UpdateJobResponse {
  job: Job
}

export class UpdateJobUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    jobName,
    company,
    isCurrentJob,
    jobEndDate,
    jobStartedDate,
    salary,
    jobId,
  }: UpdateJobRequest): Promise<UpdateJobResponse> {
    const job = await this.jobsRepository.findById(jobId)

    if (!job) {
      throw new BadRequestError()
    }

    job.jobName = jobName
    job.company = company
    job.isCurrentJob = isCurrentJob
    job.jobEndDate = jobEndDate
    job.jobStartedDate = jobStartedDate
    job.salary = salary

    await this.jobsRepository.update(job)

    return { job }
  }
}
