import { PrismaJobsRepository } from '../../repositories/jobs/prisma/prisma-jobs-repository'
import { DeleteJobUseCase } from '../../use-cases/jobs/use-cases/delete-job'

export async function makeDeleteJob() {
  const jobsRepository = new PrismaJobsRepository()
  const deleteJobsUseCase = new DeleteJobUseCase(jobsRepository)

  return deleteJobsUseCase
}
