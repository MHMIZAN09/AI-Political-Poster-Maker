import dotenv from 'dotenv';
import path from 'node:path';
dotenv.config({path:path.join(process.cwd(),'.env')});

export const config = {
    port: process.env.PORT,
    mongoURI: process.env.MONGO_URI,
}
