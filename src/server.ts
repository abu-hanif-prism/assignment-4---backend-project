import app from './app.js';
import { prisma } from './lib/prisma.js';


const PORT = process.env.PORT;

async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })

        process.on('unhandledRejection', (reason) => {
            console.error('Unhandled rejection, shutting down:', reason);
            server.close(() => process.exit(1));
        });

        process.on('uncaughtException', (error) => {
            console.error('Uncaught exception, shutting down:', error);
            process.exit(1);
        });
    } catch (error) {
        console.error("Error starting the server:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}
main();