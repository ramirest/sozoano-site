import { model, models, Schema } from "mongoose";

export interface UserStoryDocument {
  name: string;
  email: string;
  title: string;
  story: string;
  consentPublic: boolean;
  approved: boolean;
  createdAt: Date;
}

const userStorySchema = new Schema<UserStoryDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    title: { type: String, required: true },
    story: { type: String, required: true },
    consentPublic: { type: Boolean, default: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const UserStory = models.UserStory || model<UserStoryDocument>("UserStory", userStorySchema);
