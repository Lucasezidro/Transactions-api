import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeCreateJob } from '../../factories/jobs/make-create-job'

export async function createJobController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/create/job/:userId',
    {
      schema: {
        tags: ['jobs'],
        summary: 'Creates a new job',
        params: z.object({
          userId: z.string().uuid(),
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

      const { userId } = request.params

      const createJob = await makeCreateJob()

      await createJob.execute({
        jobName,
        company,
        isCurrentJob,
        jobEndDate,
        jobStartedDate,
        salary,
        userId,
      })

      return reply.status(201).send()
    },
  )
}
