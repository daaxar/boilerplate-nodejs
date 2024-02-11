import { RouteDefinition } from '../../types';
import { config } from '../../../../config';

export const homeRoute: RouteDefinition = {
    method: 'GET',
    path: /\/$|\/index.html?/i,
    handler: (req, res) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');

        res.write(
            `Hoy es ${new Date().toLocaleString()} en ${config.hostname} (${
                config.machine
            })`,
        );
    },
};
