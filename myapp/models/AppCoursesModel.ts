import { Schema, model, models } from "mongoose";

const AppCourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      unique: true,
      required: true,
    },
    uploadedby: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const AppCourses = models.AppCourses || model("AppCourses", AppCourseSchema);

export { AppCourses };
