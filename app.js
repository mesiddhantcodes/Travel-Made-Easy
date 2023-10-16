const express = require('express');
const app = express();
const getDatabase = require('./utils/db');
const authRoutes = require('./routes/auth');
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");
app.use(express.json());
const PORT = process.env.PORT || 3000;
getDatabase;
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`)
});

app.use('/auth', authRoutes);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

