import { RouteDefinition } from '../../types';
import { config } from '../../../../config';
import { getMessage } from '../../../../application/app';

export const homeRoute: RouteDefinition = {
    method: 'GET',
    path: /\/$|\/index.html?/i,
    handler: async (req, res) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');

        const message = await getMessage(config);

        res.write(message);
    },
};
