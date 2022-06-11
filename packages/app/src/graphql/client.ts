import { GraphQLClient } from "graphql-request";

export const graphQlClient = new GraphQLClient(
  "https://api.studio.thegraph.com/query/19218/ice64-testing/v0.0.13"
);
