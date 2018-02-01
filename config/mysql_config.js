import dotenv from 'dotenv';
dotenv.config();

const dbPoolConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_SCHEMA,
    connectionLimit: 50
    //debug : true
};

export default dbPoolConfig;