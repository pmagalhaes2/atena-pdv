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

const localDoc = {
  info: {
    version: "1.0.0",
    title: "Atena PDV (Local)",
    description:
      "Sistema de PDV desenvolvido como projeto de conclusão do curso de Desenvolvimento de Software com foco em Backend da Cubos Academy.",
  },
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  tags: [],
};

const prodOutputFile = "./swagger_prod.json";
const localOutputFile = "./swagger_local.json";

const endpointsFiles = ["./routes.js"];

swaggerAutogen(prodOutputFile, endpointsFiles, prodDoc);

swaggerAutogen(localOutputFile, endpointsFiles, localDoc);
