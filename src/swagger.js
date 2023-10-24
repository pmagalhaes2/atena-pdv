const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    version: "1.0.0",
    title: "Atena PDV",
    description:
      "Sistema de PDV desenvolvido como projeto de conclusão do curso de Desenvolvimento de Software com foco em Backend da Cubos Academy.",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
