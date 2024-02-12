import { AppService } from '../../../application/app';
import { RouteDefinition } from '../types';
import { homeRouteFactory } from './routes';

export function Routes(app: AppService): RouteDefinition[] {
    const homeRoute = homeRouteFactory(app);

    return [homeRoute];
}
