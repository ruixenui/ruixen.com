import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");
  const filename = searchParams.get("filename") || "gradient.png";
  const width = searchParams.get("width");
  const height = searchParams.get("height");
  const format = searchParams.get("format") || "png";

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // Fetch the image
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch image" },
        { status: response.status },
      );
    }

    const imageBuffer = await response.arrayBuffer();

    // If resizing or format conversion is needed, we'd use sharp here
    // For now, we'll return the original image with proper headers
    let finalBuffer = imageBuffer;
    let contentType = `image/${format}`;

    // If sharp is available and resize is requested, apply transformations
    if (width || height || format !== "png") {
      try {
        const sharp = require("sharp");
        let transformer = sharp(imageBuffer);

        // Resize if dimensions provided
        if (width || height) {
          transformer = transformer.resize(
            width ? parseInt(width) : null,
            height ? parseInt(height) : null,
            { fit: "inside", withoutEnlargement: true },
          );
        }

        // Convert format
        if (format === "jpg" || format === "jpeg") {
          transformer = transformer.jpeg({ quality: 90 });
          contentType = "image/jpeg";
        } else if (format === "webp") {
          transformer = transformer.webp({ quality: 90 });
          contentType = "image/webp";
        } else {
          transformer = transformer.png();
          contentType = "image/png";
        }

        finalBuffer = await transformer.toBuffer();
      } catch (error) {
        // If sharp is not available or fails, use original
        console.warn("Image transformation not available:", error);
      }
    }

    // Return the image with download headers
    return new NextResponse(finalBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}.${format}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to download image" },
      { status: 500 },
    );
  }
}
