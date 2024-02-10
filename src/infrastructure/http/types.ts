import { IncomingMessage, ServerResponse } from 'node:http';

type RouteHandler = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
) => void;
export type RouteDefinition = { path: RegExp | string; handler: RouteHandler };
