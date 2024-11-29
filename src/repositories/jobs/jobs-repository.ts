import type { Job, Prisma } from '@prisma/client'

export interface JobsRepository {
  create(data: Prisma.JobUncheckedCreateInput): Promise<Job>
  update(job: Job): Promise<Job>
  delete(job: Job): Promise<void>

  findById(jobId: string): Promise<Job | null>
  fetchAll(userId: string): Promise<Job[]>
}
