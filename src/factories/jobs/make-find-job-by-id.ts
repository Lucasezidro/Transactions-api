import { PrismaJobsRepository } from '../../repositories/jobs/prisma/prisma-jobs-repository'
import { FindJobByIdUseCase } from '../../use-cases/jobs/use-cases/find-job-by-id'

export async function makeFindJobById() {
  const jobsRepository = new PrismaJobsRepository()
  const findJobByIdUseCase = new FindJobByIdUseCase(jobsRepository)

  return findJobByIdUseCase
}
