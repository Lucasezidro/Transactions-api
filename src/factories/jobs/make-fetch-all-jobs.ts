import { PrismaJobsRepository } from '../../repositories/jobs/prisma/prisma-jobs-repository'
import { FetchAllJobsUseCase } from '../../use-cases/jobs/use-cases/fetch-all-jobs'

export async function makeFetchAllJobs() {
  const jobsRepository = new PrismaJobsRepository()
  const fetchAllJobsUseCase = new FetchAllJobsUseCase(jobsRepository)

  return fetchAllJobsUseCase
}
