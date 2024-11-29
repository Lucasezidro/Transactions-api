import { PrismaJobsRepository } from '../../repositories/jobs/prisma/prisma-jobs-repository'
import { CreateJobUseCase } from '../../use-cases/jobs/use-cases/create-job'

export async function makeCreateJob() {
  const jobsRepository = new PrismaJobsRepository()
  const createJobsUseCase = new CreateJobUseCase(jobsRepository)

  return createJobsUseCase
}
