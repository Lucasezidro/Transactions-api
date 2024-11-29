import type { JobsRepository } from '../../../repositories/jobs/jobs-repository'
import { BadRequestError } from '../errors/bad-request-error'

interface DeleteJobRequest {
  jobId: string
}

export class DeleteJobUseCase {
  constructor(private jobsRepository: JobsRepository) {}

  async execute({ jobId }: DeleteJobRequest): Promise<void> {
    const job = await this.jobsRepository.findById(jobId)

    if (!job) {
      throw new BadRequestError()
    }

    await this.jobsRepository.delete(job)
  }
}
