import { connectDb } from "@/lib/db";
import News from "@/models/News";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function DELETE(req: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    // Check if either id or slug is provided
    if (!id && !slug) {
      return NextResponse.json(
        { success: false, error: "News ID or slug is required" },
        { status: 400 }
      );
    }

    let deletedNews;

    if (id) {
      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
          { success: false, error: "Invalid news ID format" },
          { status: 400 }
        );
      }

      deletedNews = await News.findByIdAndDelete(id);
    } else if (slug) {
      deletedNews = await News.findOneAndDelete({ slug: slug });
    }

    if (!deletedNews) {
      return NextResponse.json(
        { success: false, error: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "News deleted successfully",
        data: {
          id: deletedNews._id,
          title: deletedNews.title,
          slug: deletedNews.slug,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error while deleting news: ", err);
    return NextResponse.json(
      { success: false, error: "Failed to delete the news" },
      { status: 500 }
    );
  }
}
