import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = "https://refreshing-acoustics-4f6486bcd4.strapiapp.com";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Fallback API route (Vercel rewrites handle most requests)
export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path.join("/");
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    const strapiUrl = `${STRAPI_URL}/api/${path}${
      queryString ? `?${queryString}` : ""
    }`;

    console.log("Fallback API proxying to:", strapiUrl);

    const response = await fetch(strapiUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_API_TOKEN && {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        }),
      },
    });

    if (!response.ok) {
      throw new Error(
        `Strapi API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Fallback API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Strapi" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}
