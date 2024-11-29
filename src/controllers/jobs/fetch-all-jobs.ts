import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeFetchAllJobs } from '../../factories/jobs/make-fetch-all-jobs'

export async function fetchAllJobsController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/fetch/jobs/:userId',
    {
      schema: {
        tags: ['jobs'],
        summary: 'fetch all jobs by id',
        params: z.object({
          userId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { userId } = request.params

      const fetchJobs = await makeFetchAllJobs()

      const { jobs } = await fetchJobs.execute({
        userId,
      })

      return { jobs }
    },
  )
}
