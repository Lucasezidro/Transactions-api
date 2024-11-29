import type { Prisma, Job } from '@prisma/client'
import type { JobsRepository } from '../jobs-repository'

export class InMemoryJobsRepository implements JobsRepository {
  public jobs: Job[] = []

  async create(data: Prisma.JobUncheckedCreateInput): Promise<Job> {
    const job = {
      id: 'job-id',
      jobName: data.jobName,
      salary: data.salary,
      company: data.company,
      userId: data.userId,
      jobStartedDate: data.jobStartedDate as Date,
      jobEndDate: (data.jobEndDate as Date) ?? new Date(),
      isCurrentJob: data.isCurrentJob ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.jobs.push(job)

    return job
  }

  async update(data: Job): Promise<Job> {
    const indexJob = this.jobs.findIndex((item) => item.id === data.id)

    if (indexJob >= 0) {
      this.jobs[indexJob] = data
    }

    return data
  }

  async delete(data: Job): Promise<void> {
    const indexJob = this.jobs.findIndex((item) => item.id === data.id)

    this.jobs.splice(indexJob, 1)
  }

  async findById(jobId: string): Promise<Job | null> {
    const job = this.jobs.find((item) => item.id === jobId)

    if (!job) {
      return null
    }

    return job
  }

  async fetchAll(userId: string): Promise<Job[]> {
    const jobs = this.jobs.filter((item) => item.userId === userId)

    return jobs
  }
}
