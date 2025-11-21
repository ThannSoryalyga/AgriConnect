import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

export const swaggerSetup = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "User Auth API",
        version: "1.0.0",
        description: "Backend API with register/login/logout",
      },
      servers: [{ url: "http://localhost:5000" }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
    apis: ["./src/routes/*.ts"],
  };
  const specs = swaggerJsdoc(options);
  app.use("/api", swaggerUi.serve, swaggerUi.setup(specs));
};
