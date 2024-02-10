import { RouteDefinition } from '../../types';
import { config } from '../../../../config';

export const homeRoute: RouteDefinition = {
    path: /\/|\/index.html?/i,
    handler: (req, res) => {
        const now = new Date();
        res.statusCode = 200;
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
    },
};
