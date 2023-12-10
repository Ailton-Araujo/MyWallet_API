import Joi from 'joi';
import { signInUserBody, signUpUserBody } from '@/utils';

const signInSchema = Joi.object<signInUserBody>({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

const signUpSchema = Joi.object<signUpUserBody>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export { signInSchema, signUpSchema };
