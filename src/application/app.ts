import { ConfigApplication } from '../config/types';

export async function getMessage(config: ConfigApplication): Promise<string> {
    const date = new Date();

    return `Hoy es ${date.toLocaleString()} en ${config.hostname} (${
        config.machine
    })`;
}
