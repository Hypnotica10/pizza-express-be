import 'dotenv/config';

export const env = {
    // MONGODB_URI: process.env.MONGODB_URI,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    BUILD_MODE: process.env.BUILD_MODE
}

