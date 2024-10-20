module.exports = {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT) || 3306,
        dialect: process.env.DB_DIALECT,
        poolSize: process.env.DB_POOL_SIZE || 30,
    },

    port: parseInt(process.env.PORT) || 4000,

    auth: {
        accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
        refreshTokenSecretKey: process.env.REFRESH_TOKEN_SECRET_KEY,
        accessTokenExpiresInSeconds:
            process.env.ACCESS_TOKEN_EXPIRES_IN_SECONDS,
        refreshTokenExpiresInSeconds:
            process.env.REFRESH_TOKEN_EXPIRES_IN_SECONDS,
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    redis: {
        uri: process.env.REDIS_URI,
    },

    domain: process.env.DOMAIN,

    isProduction: process.env.NODE_ENV === "production",
};
