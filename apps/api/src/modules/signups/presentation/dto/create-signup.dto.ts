import { createZodDto } from "nestjs-zod";
import { createSignupSchema } from "@activigo/shared";

export class CreateSignupDto extends createZodDto(createSignupSchema) {}
