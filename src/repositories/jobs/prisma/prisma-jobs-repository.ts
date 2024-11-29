import { prisma } from './../../../lib/prisma'
import type { Prisma, Job } from '@prisma/client'
import type { JobsRepository } from '../jobs-repository'

export class PrismaJobsRepository implements JobsRepository {
  async create(data: Prisma.JobUncheckedCreateInput): Promise<Job> {
    const job = await prisma.job.create({
      data,
    })

    return job
  }

  async update(data: Job): Promise<Job> {
    const job = await prisma.job.update({
      where: {
        id: data.id,
      },
      data,
    })

    return job
  }

  async delete(data: Job): Promise<void> {
    await prisma.job.delete({
      where: {
        id: data.id,
      },
    })
  }

  async findById(jobId: string): Promise<Job | null> {
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
      },
    })

    return job
  }

  async fetchAll(userId: string): Promise<Job[]> {
    return await prisma.job.findMany({
      where: {
        userId,
      },
    })
  }
}
