import { model, models, Schema } from "mongoose";

export interface CharacterDocument {
  slug: string;
  name: string;
  title: string;
  summary: string;
  sensoryNarrative: string;
  lesson: string;
  chapter: number;
  symbol: string;
}

const characterSchema = new Schema<CharacterDocument>(
  {
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    sensoryNarrative: { type: String, required: true },
    lesson: { type: String, required: true },
    chapter: { type: Number, required: true },
    symbol: { type: String, required: true },
  },
  { timestamps: true },
);

export const Character = models.Character || model<CharacterDocument>("Character", characterSchema);
