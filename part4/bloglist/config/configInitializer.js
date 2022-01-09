import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({ path: './config/config.env'})

const mongourl = (process.env.NODE_ENV === 'test' 
? process.env.TEST_MONGODB_URI
: process.env.MONGODB_URI).replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose.connect(mongourl).then(con => console.log('db connection successful')).catch(err => console.log(err));
