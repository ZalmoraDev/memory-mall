import {env} from '../env.ts';
import app from './server.ts';

// Start the server
app.listen(env.PORT, (): void => {
    console.log(`Server running on port ${env.PORT}`);
    console.log(`Environment: ${env.APP_STAGE}`);
});

process.on('uncaughtException', (err: Error | any): void => {
    console.error('UNCAUGHT EXCEPTION: ' + err.stack);
})