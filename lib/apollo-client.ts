import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const erxesApiUrl = (process.env.ERXES_API_URL ?? "").replace(/\/$/, "");

const httpLink = createHttpLink({
  uri: `${erxesApiUrl}/gateway/graphql`,
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    "x-app-token": process.env.ERXES_APP_TOKEN ?? "",
  },
}));

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
