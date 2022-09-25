import {
  IsNotEmpty,
  IsUrl,
  IsString,
  IsOptional,
  Length,
  IsNumber,
} from "class-validator";

export class CreateCourseInput {
  @IsNotEmpty()
  @IsString()
  @Length(0, 80)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsUrl()
  url!: string;

  @IsOptional()
  @IsString()
  uploadedby?: string;

  @IsOptional()
  @IsNumber()
  keys?: number;
}

export class targetCourseInput {
  @IsNotEmpty()
  @IsString()
  _id!: string;
}

export class UpdateCourseInput {
  @IsNotEmpty()
  @IsString()
  _id!: string;

  @IsOptional()
  @IsString()
  @Length(0, 80)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsUrl()
  url!: string;

  @IsOptional()
  @IsString()
  uploadedby?: string;
}
