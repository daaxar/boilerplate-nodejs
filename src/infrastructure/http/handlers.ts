import { IncomingMessage, ServerResponse } from 'node:http';
import { ClientRequest, RouteDefinition } from './types';

export function handlerGET(
    route: RouteDefinition,
    req: ClientRequest,
    res: ServerResponse<IncomingMessage>,
    inc: IncomingMessage,
): void {
    route.handler(req, res, inc);

    res.end();
}
export function handlerPOST(
    route: RouteDefinition,
    req: ClientRequest,
    res: ServerResponse<IncomingMessage>,
    incoming: IncomingMessage,
): void {
    let body = '';

    incoming.on('data', (chunk) => {
        body += chunk.toString();
    });

    incoming.on('end', () => {
        route.handler({ ...req, body }, res, incoming);

        res.end();
    });
}
export function error500(res: ServerResponse<IncomingMessage>, error: Error) {
    res.statusCode = 500;
    res.write(`ERROR:${error.message}`);
    res.end();
}
export function error404(
    req: ClientRequest,
    res: ServerResponse<IncomingMessage>,
): void {
    res.statusCode = 404;
    res.write(`${req.url.href} not found`);
    res.write(JSON.stringify(req, null, 2));
    res.end();
}
