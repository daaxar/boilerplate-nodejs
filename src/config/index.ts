import { hostname, machine } from 'node:os';
import { http } from './http';

export const config = { hostname, machine, http };
