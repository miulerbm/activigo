import { createZodDto } from "nestjs-zod";
import { loginSchema } from "@activigo/shared";

export class LoginDto extends createZodDto(loginSchema) {}
