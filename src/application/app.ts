import { ConfigApplication } from '../config/types';

export async function getMessage(config: ConfigApplication): Promise<string> {
    const [template, data] = await Promise.all([
        getTemplate(),
        getData(config),
    ]);

    return Object.entries(data).reduce(
        (tpl: string, [key, value]: [string, unknown]) =>
            tpl.replace(`{{${key}}}`, value.toString()),
        template,
    );
}

async function getTemplate() {
    return `Hoy es {{now}} en {{host}} ({{machine}})`;
}

async function getData(config: ConfigApplication) {
    const date = new Date();
    const now = date.toLocaleString();
    const host = config.hostname;
    const machine = config.machine;

    const data = {
        now,
        host,
        machine,
    };
    return data;
}
