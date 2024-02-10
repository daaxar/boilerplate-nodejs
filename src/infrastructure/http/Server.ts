import { IncomingMessage, ServerResponse, createServer } from 'node:http';
import { ConfigApplication } from '../../config/types';

type RouteHandler = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
) => void;
type RouteDefinition = { path: RegExp | string; handler: RouteHandler };

export function Server(config: ConfigApplication) {
    const routes: RouteDefinition[] = [
        {
            path: '/',
            handler: (req, res) => {
                const now = new Date();
                res.statusCode = 200;
                res.setHeader('content-type', 'text/plain');

                console.log(
                    `${now.toISOString()}\t${config.hostname}\t${
                        res.statusCode
                    }\t${req.url}`,
                );

                res.write(
                    `Hoy es ${new Date().toLocaleString()} en ${
                        config.hostname
                    } (${config.machine})`,
                );
            },
        },
    ];

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
