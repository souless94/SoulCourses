import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { AppCourses } from "../../../models/AppCoursesModel";
import connectMongo from "../../../utils/connectMongo";
import {
  BadRequestException,
  Body,
  createHandler,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
  ValidationPipe,
} from "next-api-decorators";
import {
  CreateCourseInput,
  targetCourseInput,
  UpdateCourseInput,
} from "../../../data/AppCoursesDto";

import SuperTokenGuard from "../../../middleware/AuthGuard";

class AppCourseHandler {
  @Get("/")
  @SuperTokenGuard()
  async AppCourses() {
    try {
      await connectMongo();
      const appCourses = await AppCourses.find();
      console.info("got list of courses");
      return appCourses;
    } catch (err) {
      console.info(err);
      console.info("Error occured");
      throw new InternalServerErrorException("An Unknown Error has occurred");
    }
  }

  @Get("/:id")
  @SuperTokenGuard()
  async getAppCourse(@Param("id") _id: string) {
    try {
      await connectMongo();
      const appCourses = await AppCourses.findById(_id);
      console.info("got course");
      return appCourses;
    } catch (err) {
      throw new InternalServerErrorException("An Unknown Error has occurred");
    }
  }

  @Post()
  @SuperTokenGuard()
  @HttpCode(201)
  async createCourse(@Body(ValidationPipe) body: CreateCourseInput) {
    try {
      await connectMongo();
    } catch (err) {
      console.info("An Error Occurred");
      throw new InternalServerErrorException("An Unknown Error has occurred");
    }
    body.uploadedby = body.uploadedby || "SYSTEM";

    const existingAppCourse = await AppCourses.findOne({ url: body.url });
    if (existingAppCourse == null) {
      const appCourses = new AppCourses(body);
      appCourses.save();
      console.info("Course Created");
      return appCourses;
    } else {
      throw new BadRequestException(
        `The url is part of another course : ${existingAppCourse.title}`
      );
    }
  }

  @Delete()
  @SuperTokenGuard()
  @HttpCode(204)
  async deleteCourse(@Body(ValidationPipe) body: targetCourseInput) {
    try {
      await connectMongo();
      const appCourseToDelete = await AppCourses.findByIdAndDelete(body._id);
      console.info("Course deleted");
      return;
    } catch (err) {
      console.info("Error occured");
      throw new InternalServerErrorException("An Unknown Error has occurred");
    }
  }

  @Patch()
  @SuperTokenGuard()
  @HttpCode(200)
  async updateCourse(@Body(ValidationPipe) body: UpdateCourseInput) {
    try {
      await connectMongo();
      await AppCourses.findByIdAndUpdate(body._id, body);

      const updatedCourse = await AppCourses.findById(body._id);
      console.info("Course updated");
      return updatedCourse;
    } catch (err) {
      console.info("Error occured");
      throw new InternalServerErrorException("An Unknown Error has occurred");
    }
  }
}

export default createHandler(AppCourseHandler);
