import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";
import * as swaggerUi from "swagger-ui-express";
const options: swaggerJSDoc.OAS3Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Document Admin",
      version: "1.0.0",
    },
    basePath: "/",
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
  apis: ["./src/routes/*ts"],
};

const openapiSpecification = swaggerJSDoc(options);

const swaggerDocs = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
};

export default swaggerDocs;
