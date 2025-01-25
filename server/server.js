import dotenv from 'dotenv'
import { app } from './app.js'


dotenv.config();
try {
    app.listen( process.env.PORT,'0.0.0.0' , (err) => {
            if (err) {
                console.error('Error starting server:', err);
            } else {
                console.log(`Server is running at port ${process.env.PORT}`);
                console.log(`Server is running at http://localhost:${process.env.PORT}`);
            }
        }
    );
} catch (error) {
    console.error('Unexpected error:', error);
}