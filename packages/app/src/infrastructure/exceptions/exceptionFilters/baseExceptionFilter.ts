import { Catch } from "@nestjs/common";
import { BaseExceptionFilter as SuperBaseExceptionFilter } from "@nestjs/core";

@Catch()
export class BaseExceptionFilter extends SuperBaseExceptionFilter<unknown> {}
