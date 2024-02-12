import { RouteDefinition } from '../../types';
import { AppService } from '../../../../application/app';

export default (app: AppService): RouteDefinition => ({
    method: 'GET',
    path: /\/$|\/index.html?/i,
    handler: async (req, res) => {
        res.statusCode = 200;
        res.setHeader('content-type', 'text/plain');

        const message = await app.getMessage();

        res.write(message);
    },
});
