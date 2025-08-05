import { jsonSchemaTransform } from 'fastify-type-provider-zod'

type TransformSwaggerSchemaData = Parameters<typeof jsonSchemaTransform>[0]

export function transformSwaggerSchema(data: TransformSwaggerSchemaData) {
  const result = jsonSchemaTransform(data)
  const schema = result.schema as Record<string, any> // 👈 solução aqui
  const url = result.url

  if (schema.consumes?.includes('multipart/form-data')) {
    if (schema.body === undefined) {
      schema.body = {
        type: 'object',
        required: [],
        properties: {},
      }
    }

    schema.body.properties.file = {
      type: 'string',
      format: 'binary',
    }

    schema.body.required.push('file')
  }

  return {
    schema,
    url,
  }
}
