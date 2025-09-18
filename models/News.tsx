import mongoose, { Schema, model, models } from "mongoose";

export interface INews {
  _id?: mongoose.Types.ObjectId;
  title: string;
  article: string;
  imageURL: string;
}

const NewsSchema = new Schema<INews>(
  {
    title: { type: String, required: true },
    article: { type: String, required: true },
    imageURL: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const News = models?.News || model<INews>("News", NewsSchema);
export default News;
