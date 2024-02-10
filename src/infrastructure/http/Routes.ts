import { ConfigApplication } from '../../config/types';
import { RouteDefinition } from './types';

export function Routes(config: ConfigApplication): RouteDefinition[] {
    return [
        {
            path: '/',
            handler: (req, res) => {
                const now = new Date();
                res.statusCode = 200;
                res.setHeader('content-type', 'text/plain');

                console.log(
                    `${now.toISOString()}\t${config.hostname}\t${
                        res.statusCode
                    }\t${req.url}`,
                );

                res.write(
                    `Hoy es ${new Date().toLocaleString()} en ${
                        config.hostname
                    } (${config.machine})`,
                );
            },
        },
    ];
}
