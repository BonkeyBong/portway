import Joi from '@hapi/joi'

export const rawSchema = {
  name: Joi.string()
}

export default Joi.compile(rawSchema)
