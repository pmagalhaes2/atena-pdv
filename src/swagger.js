const swaggerAutogen = require("swagger-autogen");

const prodDoc = {
  info: {
    version: "1.0.0",
    title: "Atena PDV",
    description:
      "Sistema de PDV desenvolvido como projeto de conclusão do curso de Desenvolvimento de Software com foco em Backend da Cubos Academy.",
  },
  host: "mushy-calf-wrap.cyclic.cloud",
  basePath: "/",
  schemes: ["https"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [],
};

const prodOutputFile = "./swagger_prod.json";

const endpointsFiles = ["./routes.js"];

swaggerAutogen(prodOutputFile, endpointsFiles, prodDoc);
