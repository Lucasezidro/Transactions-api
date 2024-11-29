import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFindJobById } from '../../factories/jobs/make-find-job-by-id'

export async function findJobByIdController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/find/job/:jobId',
    {
      schema: {
        tags: ['jobs'],
        summary: 'find a job by id',
        params: z.object({
          jobId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { jobId } = request.params

      const deleteJob = await makeFindJobById()

      const { job } = await deleteJob.execute({
        jobId,
      })

      return { job }
    },
  )
}
