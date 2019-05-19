import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import { customAuthChecker } from "./customAuthChecker";
import { AuthenticationResolver } from "./resolvers/authenticationResolver";
import { HelloResolver } from "./resolvers/helloResolver";
import { UserLocationResolver } from "./resolvers/userLocationResolver";

export const configuredSchema = async (): Promise<GraphQLSchema> => {
    return await buildSchema({
        resolvers: [
          HelloResolver,
          AuthenticationResolver,
          UserLocationResolver
        ],
        container: Container,
        authChecker: customAuthChecker
      });
};
