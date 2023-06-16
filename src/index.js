require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.js");
const path = require("path");
//swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: " NODEJS-MONGODBATLAS-API",
      version: "1.0.0",
      description: "A simple Express CRUD API",
      contact: {
        name: "Argiro Arias",
        email: "elto.82@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
        description: "Development server",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};

const port = process.env.PORT || 9000;

const app = express();

//middlewares
app.use(express.json());
app.use("/api", userRoutes);
app.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJsDoc(swaggerSpec))
);

//connect Db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("http://localhost:" + port);
});
