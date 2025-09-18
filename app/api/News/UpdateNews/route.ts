import { connectDb } from "@/lib/db";
import News from "@/models/News";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function PUT(req: NextRequest) {
  try {
    await connectDb();

    const item = await req.json();

    if (!item._id || !mongoose.Types.ObjectId.isValid(item._id)) {
      return NextResponse.json(
        { success: false, error: "Invalid or missing news ID" },
        { status: 400 }
      );
    }

    if (
      !item.category ||
      !item.title ||
      !item.slug ||
      !item.article ||
      !item.imageURL
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Category, Title, slug, article, and image URL are required",
        },
        { status: 400 }
      );
    }
    const news = await News.findById(item._id);

    if (!news) {
      return NextResponse.json(
        { success: false, error: "news dosent exists" },
        { status: 404 }
      );
    }

    news.category = item.category;
    news.title = item.title;
    news.slug = item.slug;
    news.article = item.article;
    news.imageURL = item.imageURL;

    await news.save();

    return NextResponse.json(
      { success: true, message: "News updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in Updating the news: ", err);
    return NextResponse.json(
      { success: false, error: "failed to Update the news" },
      { status: 400 }
    );
  }
}
