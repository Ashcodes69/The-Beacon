import { connectDb } from "@/lib/db";
import News from "@/models/News";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const slug = searchParams.get("slug");
    let news;

    if (slug) {
      news = await News.findOne({ slug: slug });
      if (!news) {
        return NextResponse.json(
          {
            success: false,
            error: "News not found",
          },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: news }, { status: 200 });
    }

    if (category) {
      news = await News.find({ category: new RegExp(category, "i") });
    } else {
      news = await News.find();
    }
    return NextResponse.json({ success: true, data: news }, { status: 200 });
  } catch (err) {
    console.error("Error while fetching News: ", err);
    return NextResponse.json(
      { success: false, error: "failed to Fetch the News" },
      { status: 500 }
    );
  }
}
