import { PrismaJobsRepository } from '../../repositories/jobs/prisma/prisma-jobs-repository'
import { UpdateJobUseCase } from '../../use-cases/jobs/use-cases/update-job'

export async function makeUpdateJob() {
  const jobsRepository = new PrismaJobsRepository()
  const updateJobsUseCase = new UpdateJobUseCase(jobsRepository)

  return updateJobsUseCase
}
