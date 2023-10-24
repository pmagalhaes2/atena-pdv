require("dotenv").config();
const cors = require("cors");
const express = require("express");
const route = require("./routes");

const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");

const app = express();

const corsOptions = {
  origin: "https://mushy-calf-wrap.cyclic.cloud/api-doc",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());

app.use(route);

app.listen(process.env.PORT);
