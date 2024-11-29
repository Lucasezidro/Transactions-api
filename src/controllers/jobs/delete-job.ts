import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { makeDeleteJob } from '../../factories/jobs/make-delete-job'

export async function deleteJobController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/delete/job/:jobId',
    {
      schema: {
        tags: ['jobs'],
        summary: 'Deletes a new job',
        params: z.object({
          jobId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { jobId } = request.params

      const deleteJob = await makeDeleteJob()

      await deleteJob.execute({
        jobId,
      })

      return reply.status(204).send()
    },
  )
}
