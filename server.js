const { db } = require("./db");
const app = require("./app");
const configs = require("./configs");
const redis = require("./redis");

async function startServer() {
    try {
        await db.authenticate();
        await redis.ping();
        app.listen(configs.port, () => {
            console.log(`Server is running on port ${configs.port}`);
        });
    } catch (err) {
        console.log("Something went wrong ->", err);

        await db.close();
        await redis.disconnect();
    }
}

startServer();
