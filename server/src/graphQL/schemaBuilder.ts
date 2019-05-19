import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import { customAuthChecker } from "./customAuthChecker";
import { AuthenticationResolver } from "./resolvers/authenticationResolver";
import { GuitarResolver } from "./resolvers/guitarResolver";
import { HelloResolver } from "./resolvers/helloResolver";
import { PersonImageResolver } from "./resolvers/personImageResolver";
import { PersonsFaceResolver } from "./resolvers/personsFaceResolver";
import { UserLocationResolver } from "./resolvers/userLocationResolver";

export const configuredSchema = async (): Promise<GraphQLSchema> => {
    return await buildSchema({
        resolvers: [
          HelloResolver,
          GuitarResolver,
          PersonsFaceResolver,
          PersonImageResolver,
          AuthenticationResolver,
          UserLocationResolver
        ],
        container: Container,
        authChecker: customAuthChecker
      });
};
