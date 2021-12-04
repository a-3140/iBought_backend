import { UserResolver } from "./resolvers/UserResolver";
import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { WantResolver } from "./resolvers/WantResolver";
// const cors = require(`cors`);

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...options, name: "default" });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [WantResolver, UserResolver],
      validate: true,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "*",
      credentials: true,
    },
  });
  const port = process.env.PORT || 4000;
  // app.use(cors({ origin: true })); // not having cors enabled will cause an access control error
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();
