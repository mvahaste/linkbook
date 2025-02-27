import ogs from "open-graph-scraper";

export async function GET(request: Request) {
  const url = new URL(request.url).searchParams.get("url");

  if (!url) {
    return new Response("Please provide a URL", {
      status: 400,
    });
  }

  const { error, result } = await ogs({ url });

  if (error) {
    return new Response(`Failed to fetch metadata from ${url}`, {
      status: 500,
    });
  }

  const res = {
    title: result.ogTitle,
    description: result.ogDescription,
    image: result.ogImage ? result.ogImage[0].url : null,
  };

  return new Response(JSON.stringify(res), {
    status: 200,
  });
}
