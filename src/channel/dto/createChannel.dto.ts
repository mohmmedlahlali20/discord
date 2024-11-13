import { IsArray, IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum Type {
  public = "public",
  private = "private",
  conversation = "conversation",
}

export class CreateChannelDto {
  @IsString()
  @IsNotEmpty()
  Title: string;

  @IsArray()
  @IsNotEmpty()
  members: string[];

  @IsString()
  @IsNotEmpty()
  @IsEnum(Type)
  type: Type;

  @IsArray()
  @IsNotEmpty()
  badWords: string[];

  @IsNotEmpty()
  @IsString()
  userId: string;
  
  expiresAt: Date;
}