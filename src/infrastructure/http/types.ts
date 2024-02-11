import {
    IncomingHttpHeaders,
    IncomingMessage,
    ServerResponse,
} from 'node:http';

export type ClientRequestMethod = 'GET' | 'POST' | 'HEAD' | 'OPTIONS';

export type ClientRequest = {
    method: ClientRequestMethod;
    url: URL;
    headers: IncomingHttpHeaders;
    params?: URLSearchParams;
    body?: string;
};

export type RouteHandler = (
    req: ClientRequest,
    res: ServerResponse<IncomingMessage>,
    incoming?: IncomingMessage,
) => void;

export type RouteDefinition = {
    method: ClientRequestMethod;
    path: RegExp | string;
    handler: RouteHandler;
};
