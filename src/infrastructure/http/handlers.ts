import { IncomingMessage, ServerResponse } from 'node:http';
import { ClientRequest, RouteDefinition } from './types';

export async function handlerGET(
    route: RouteDefinition,
    req: ClientRequest,
    res: ServerResponse<IncomingMessage>,
    inc: IncomingMessage,
): Promise<void> {
    await route.handler(req, res, inc);

    res.end();
}

export async function handlerPOST(
    route: RouteDefinition,
    req: ClientRequest,
    res: ServerResponse<IncomingMessage>,
    incoming: IncomingMessage,
): Promise<void> {
    let body = '';

    incoming.on('data', (chunk) => {
        body += chunk.toString();
    });

    incoming.on('end', () => {
        route.handler({ ...req, body }, res, incoming).then(() => {
            res.end();
        });
    });
}

export async function error500(
    res: ServerResponse<IncomingMessage>,
    error: Error,
): Promise<void> {
    res.statusCode = 500;
    res.write(`ERROR:${error.message}`);
    res.end();
}

export async function error404(
    req: ClientRequest,
    res: ServerResponse<IncomingMessage>,
): Promise<void> {
    res.statusCode = 404;
    res.write(`${req.url.href} not found`);
    res.write(JSON.stringify(req, null, 2));
    res.end();
}
