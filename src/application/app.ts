import { ConfigApplication } from '../config/types';

export function getMessage(config: ConfigApplication): string {
    const date = new Date();

    return `Hoy es ${date.toLocaleString()} en ${config.hostname} (${
        config.machine
    })`;
}
