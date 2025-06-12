import http, { IncomingMessage, ServerResponse } from 'http';
import { router } from './infrastructure/http/router';

export const startServer = () => {
    const port = process.env.PORT || 3000;
    const server = http.createServer(async (req, res) => {
        await router(req, res);
    });

    server.listen(port, () => {
        console.log(`🚀 Servidor escuchando en http://localhost:${port}`);
    });
};
