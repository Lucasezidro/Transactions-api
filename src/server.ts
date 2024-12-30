import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { env } from './env'

import { createUserController } from './controllers/users/create-user'
import { updateUserController } from './controllers/users/update-user'
import fastifyCookie from '@fastify/cookie'
import { authenticateController } from './controllers/users/authenticate'
import { findUserByIdController } from './controllers/users/find-user-by-id'
import { createJobController } from './controllers/jobs/create-job'
import { updateJobController } from './controllers/jobs/update-job'
import { deleteJobController } from './controllers/jobs/delete-job'
import { findJobByIdController } from './controllers/jobs/find-job-by-id'
import { fetchAllJobsController } from './controllers/jobs/fetch-all-jobs'
import { createTransactionController } from './controllers/transactions/create-transaction'
import { updateTransactionController } from './controllers/transactions/update-transaction'
import { deleteTransactionController } from './controllers/transactions/delete-transaction'
import { findTransactionByIdController } from './controllers/transactions/find-transaction-by-id'
import { fetchTransactionsController } from './controllers/transactions/fetch-all-transactions'
import { createBookingController } from './controllers/bookings/create-booking'
import { deleteBookingController } from './controllers/bookings/delete-booking'
import { fetchAllBookingsController } from './controllers/bookings/fetch-all-bookings'
import { findBookingByIdController } from './controllers/bookings/find-booking-by-id'
import { updateBookingController } from './controllers/bookings/update-booking'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Transactions api',
      description: 'API for transactions control',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCookie)

// Users
app.register(createUserController)
app.register(updateUserController)
app.register(authenticateController)
app.register(findUserByIdController)

// Jobs
app.register(createJobController)
app.register(updateJobController)
app.register(deleteJobController)
app.register(findJobByIdController)
app.register(fetchAllJobsController)

// Transactions
app.register(createTransactionController)
app.register(updateTransactionController)
app.register(deleteTransactionController)
app.register(findTransactionByIdController)
app.register(fetchTransactionsController)

// Bookings
app.register(createBookingController)
app.register(deleteBookingController)
app.register(fetchAllBookingsController)
app.register(findBookingByIdController)
app.register(updateBookingController)

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => console.log('HTTP server running!'))
