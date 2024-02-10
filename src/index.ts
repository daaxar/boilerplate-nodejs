import { config } from './config';
import { createServer } from 'node:http';

const server = createServer((req, res) => {
    const now = new Date();
    res.statusCode = req.url.startsWith('/favicon.ico') ? 404 : 200;
    res.setHeader('content-type', 'text/plain');

    console.log(
        `${now.toISOString()}\t${config.hostname}\t${res.statusCode}\t${
            req.url
        }`,
    );

    res.write(
        `Hoy es ${new Date().toLocaleString()} en ${
            config.hostname
        } (${config.machine()})`,
    );
    res.end();
});

server.listen(config.http.port, () => {
    console.log(`Listening in ${config.http.port}!`);
});
