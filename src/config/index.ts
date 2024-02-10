import { hostname, machine } from 'node:os';
import { http } from './http';
import { ConfigApplication } from './types';

export const config: ConfigApplication = {
    hostname: process.env.HOSTNAME || hostname(),
    machine: process.env.MACHINENAME || machine(),
    http,
};
