import { connectDb } from "@/lib/db";
import News from "@/models/News";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { category, title, slug, article, imageURL } = await req.json();

    if (!category || !title || !slug || !article || !imageURL) {
      return NextResponse.json(
        {
          success: false,
          error: "category, title, slug, article, image url is required",
        },
        { status: 400 }
      );
    }
    await connectDb();
    await News.create({
      category,
      title,
      slug,
      article,
      imageURL,
    });
    return NextResponse.json(
      { success: true, message: "News posted successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in Posting the news: ", err);
    return NextResponse.json(
      { success: false, error: "failed to Post the news" },
      { status: 500 }
    );
  }
}
