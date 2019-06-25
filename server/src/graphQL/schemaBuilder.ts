import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import Container from "typedi";
import { customAuthChecker } from "./customAuthChecker";
import { AuthenticationResolver } from "./resolvers/authenticationResolver";
import { HelloResolver } from "./resolvers/helloResolver";
import { UserGroupResolver } from "./resolvers/userGroupResolver";

export const configuredSchema = async (): Promise<GraphQLSchema> => {
    return await buildSchema({
        resolvers: [
          HelloResolver,
          AuthenticationResolver,
          UserGroupResolver
        ],
        container: Container,
        authChecker: customAuthChecker
      });
};
