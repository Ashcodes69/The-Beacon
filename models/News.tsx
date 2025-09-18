import mongoose, { Schema, model, models } from "mongoose";

export interface INews {
  _id?: mongoose.Types.ObjectId;
  category: string;
  title: string;
  slug: string;
  article: string;
  imageURL: string;
}

const NewsSchema = new Schema<INews>(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    article: { type: String, required: true },
    imageURL: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const News = models?.News || model<INews>("News", NewsSchema);
export default News;
