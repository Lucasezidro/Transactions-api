import type { Job } from '@prisma/client'
import type { JobsRepository } from '../../../repositories/jobs/jobs-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface FindJobByIdRequest {
  jobId: string
}

interface FindJobByIdResponse {
  job: Job
}

export class FindJobByIdUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({ jobId }: FindJobByIdRequest): Promise<FindJobByIdResponse> {
    const job = await this.jobsRepository.findById(jobId)

    if (!job) {
      throw new BadRequestError()
    }

    return { job }
  }
}
