import { ConfigHttpServer } from './types';

export const http: ConfigHttpServer = {
    port: parseInt(process.env.PORT || '3000'),
};
