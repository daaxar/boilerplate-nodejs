import { IncomingMessage, ServerResponse, createServer } from 'node:http';
import { ConfigApplication } from '../../config/types';
import { Routes } from './Routes';
import { getClientRequest, getRoute } from './utils';
import { error404, handlerPOST, handlerGET, error500 } from './handlers';

export function Server(config: ConfigApplication) {
    const routes = Routes();

    console.log(`Creating server on ${config.hostname}:${config.http.port}`);

    return createServer(
        (inc: IncomingMessage, res: ServerResponse<IncomingMessage>): void => {
            try {
                const req = getClientRequest(inc);

                const now = new Date().toISOString();
                console.log(
                    `${now}\t${config.hostname}\t${req.method}\t${req.url.pathname}\t${req.url.search}`,
                );

                const route = getRoute(routes, req);

                if (!route) {
                    error404(req, res).catch((e) => error500(res, e));
                    // error404(req, res, inc).catch(e => error500(res, e));
                } else if (inc.method === 'POST') {
                    handlerPOST(route, req, res, inc).catch((e) =>
                        error500(res, e),
                    );
                } else {
                    handlerGET(route, req, res, inc).catch((e) =>
                        error500(res, e),
                    );
                }
            } catch (error) {
                error500(res, error);
            }
        },
    );
}
