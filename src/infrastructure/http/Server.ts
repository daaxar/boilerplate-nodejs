import { IncomingMessage, ServerResponse, createServer } from 'node:http';
import { ConfigApplication } from '../../config/types';

export function Server(config: ConfigApplication) {
    return createServer(
        (req: IncomingMessage, res: ServerResponse<IncomingMessage>): void => {
            const now = new Date();
            res.statusCode = req.url?.startsWith('/favicon.ico') ? 404 : 200;
            res.setHeader('content-type', 'text/plain');

            console.log(
                `${now.toISOString()}\t${config.hostname}\t${res.statusCode}\t${
                    req.url
                }`,
            );

            res.write(
                `Hoy es ${new Date().toLocaleString()} en ${config.hostname} (${
                    config.machine
                })`,
            );
            res.end();
        },
    );
}
