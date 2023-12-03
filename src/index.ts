import { hostname, machine } from 'node:os';
import { createServer } from 'node:http';

const server = createServer((req, res) => {
    const now = new Date();
    res.statusCode = req.url.startsWith('/favicon.ico') ? 404 : 200;
    res.setHeader('content-type', 'text/plain');

    console.log(
        `${now.toISOString()}\t${hostname}\t${res.statusCode}\t${req.url}`,
    );

    res.write(
        `Hoy es ${new Date().toLocaleString()} en ${hostname} (${machine()})`,
    );
    res.end();
});

server.listen(process.env.PORT, () => {
    console.log(`Listening in ${process.env.PORT}!`);
});
