const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const ejs = require('ejs');

dotenv.config({ path: "./config/config.env" });

const routes = require("./routes/routes");

const app = express();

const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`https://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});