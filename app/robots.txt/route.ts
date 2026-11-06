export async function GET() {
  const robots = `User-agent: *
Allow: /
Sitemap: https://www.maxtermic.com/sitemap.xml
Host: https://www.maxtermic.com
Content-Signal: search=yes, ai-train=no
`;

  return new Response(robots, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
