import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeUpdateJob } from '../../factories/jobs/make-update-job'

export async function updateJobController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/update/job/:jobId',
    {
      schema: {
        tags: ['jobs'],
        summary: 'Updates a new job',
        params: z.object({
          jobId: z.string().uuid(),
        }),
        body: z.object({
          jobName: z.string(),
          company: z.string(),
          isCurrentJob: z.boolean(),
          salary: z.coerce.number(),
          jobEndDate: z.coerce.date(),
          jobStartedDate: z.coerce.date(),
        }),
      },
    },
    async (request, reply) => {
      const {
        jobName,
        company,
        isCurrentJob,
        jobEndDate,
        jobStartedDate,
        salary,
      } = request.body

      const { jobId } = request.params

      const updateJob = await makeUpdateJob()

      await updateJob.execute({
        jobName,
        company,
        isCurrentJob,
        jobEndDate,
        jobStartedDate,
        salary,
        jobId,
      })

      return reply.status(201).send()
    },
  )
}
