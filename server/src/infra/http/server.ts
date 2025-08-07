import { fastifyCors } from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from '@/env'
import { getUploadsRoute } from './routes/get-uploads'
import { uploadImageRoute } from './routes/upload-image'
import { transformSwaggerSchema } from './transform-swagger-schema'

const server = fastify()

// Configurações do servidor
server.setSerializerCompiler(serializerCompiler)
server.setValidatorCompiler(validatorCompiler)
server.setErrorHandler((error, _, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.validation })
  }

  // Envia o erro p/ alguma ferramenta de observabilidade
  console.error(error)
  return reply.status(500).send({ message: 'Internal server error' })
})

// Registra plugins
server.register(fastifyCors, { origin: '*' })
server.register(fastifyMultipart)
server.register(fastifySwagger, {
  openapi: {
    openapi: '3.1.0',
    info: {
      title: 'Upload server',
      version: '1.0.0',
    },
  },
  transform: transformSwaggerSchema,
})
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

// Registra rotas
server.register(uploadImageRoute)
server.register(getUploadsRoute)

// Inicia o servidor
server.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})
