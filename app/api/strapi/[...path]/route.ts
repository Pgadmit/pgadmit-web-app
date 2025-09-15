import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = "https://refreshing-acoustics-4f6486bcd4.strapiapp.com";

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

    console.log("Proxying request to:", strapiUrl);

    const response = await fetch(strapiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Strapi API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Strapi" },
      { status: 500 }
    );
  }
}
