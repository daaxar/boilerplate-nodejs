import { IncomingMessage, ServerResponse, createServer } from 'node:http';
import { ConfigApplication } from '../../config/types';
import { Routes } from './Routes';

export function Server(config: ConfigApplication) {
    const routes = Routes();

    console.log(`Creating server on ${config.hostname}:${config.http.port}`);

    return createServer(
        (req: IncomingMessage, res: ServerResponse<IncomingMessage>): void => {
            const route = routes.find(({ path }) =>
                path instanceof RegExp
                    ? req.url?.match(path)
                    : req.url === path,
            );

            if (!route) res.statusCode = 404;
            else route.handler(req, res);

            res.end();
        },
    );
}
