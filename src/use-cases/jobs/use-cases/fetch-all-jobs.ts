import type { Job } from '@prisma/client'
import type { JobsRepository } from '../../../repositories/jobs/jobs-repository'

interface FetchAllJobsRequest {
  userId: string
}

interface FetchAllJobsResponse {
  jobs: Job[]
}

export class FetchAllJobsUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({
    userId,
  }: FetchAllJobsRequest): Promise<FetchAllJobsResponse> {
    const jobs = await this.jobsRepository.fetchAll(userId)

    return { jobs }
  }
}
