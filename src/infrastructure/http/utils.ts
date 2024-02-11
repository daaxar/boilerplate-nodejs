import { IncomingMessage } from 'node:http';
import { ClientRequest, ClientRequestMethod, RouteDefinition } from './types';

export function getClientRequest(inc: IncomingMessage): ClientRequest {
    if (!inc?.url) throw new Error('URL Error');

    const url = getUrl(inc);
    const method = getMethodFromIncoming(inc);
    const headers = inc.headers;
    const params = url.searchParams;

    return {
        method,
        url,
        headers,
        params,
    };
}
function getMethodFromIncoming(inc: IncomingMessage): ClientRequestMethod {
    const method = inc.method?.toLocaleUpperCase();

    if (method === 'GET') return 'GET';
    if (method === 'POST') return 'POST';
    if (method === 'HEAD') return 'HEAD';
    if (method === 'OPTIONS') return 'OPTIONS';

    throw new Error('Invalid method');
}
export function getRoute(
    routes: RouteDefinition[],
    req: ClientRequest
): RouteDefinition | undefined {
    const { pathname } = req?.url ?? {};

    return routes.find(({ path, method }) => (method === req.method || !method || !req.method) &&
        path instanceof RegExp
        ? pathname.match(path)
        : pathname === path
    );
}
function getUrl(req: IncomingMessage): URL {
    return new URL(`http://${req.headers?.host}${req.url}`);
}
