import { readFileSync } from "fs";

const env = Object.fromEntries(
  readFileSync(".env.local", "utf8")
    .split("\n")
    .filter((line) => line.includes("="))
    .map((line) => {
      const [key, ...rest] = line.split("=");
      return [key.trim(), rest.join("=").trim()];
    }),
);

const apiUrl = env.ERXES_API_URL?.replace(/\/$/, "");
const appToken = env.ERXES_APP_TOKEN;

const res = await fetch(`${apiUrl}/gateway/graphql`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-app-token": appToken,
  },
  body: JSON.stringify({
    query: `
      query {
        cpPostList(type: "branch", status: published) {
          totalCount
          posts {
            _id
            title
            slug
            excerpt
            content
            customFieldsData
            customFieldsMap
            thumbnail { url }
            images { url }
          }
        }
      }
    `,
  }),
});

const data = await res.json();
console.log(JSON.stringify(data, null, 2));
