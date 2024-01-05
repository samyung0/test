type Post = {
  title: string;
  slug: string;
  date: string;
  content: {
    html: string;
  };
  coverImage: {
    url: string;
    width: number;
    height: number;
    altText: string;
  };
};

export default async (slug?: string) => {
  const query = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        {
          posts(where: {${slug ? `slug: "${slug}"` : ''}}) {
            title
            slug
            date
            content {
              html
            }
            coverImage {
              url
              width
              height
              altText
            }
          }
        }`,
    }),
  };

  const response = await fetch(import.meta.env.HYGRAPH_ENDPOINT, query);
  const json = await response.json();
  const posts: Post[] = json.data.posts;
  return posts;
};
