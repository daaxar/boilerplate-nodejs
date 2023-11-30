import {hostname, machine} from 'node:os';

console.log(`Hoy es ${new Date().toLocaleString()} en ${hostname} (${machine()})`);
