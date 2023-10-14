const express = require('express');
const app = express();
const getDatabase = require('./utils/db');
const authRoutes = require('./routes/auth');
app.use(express.json());
const PORT = process.env.PORT || 3000;
getDatabase;
app.listen(3000, () => {
    console.log(`Server is running on port ${PORT}`)
});
app.use('/auth', authRoutes);

