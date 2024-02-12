import { ConfigApplication } from '../config/types';

export class AppService {
    constructor(private readonly config: ConfigApplication) {}

    async getMessage(): Promise<string> {
        const [template, data] = await Promise.all([
            this.getTemplate(),
            this.getData(),
        ]);

        return Object.entries(data).reduce(
            (tpl: string, [key, value]: [string, unknown]) =>
                tpl.replace(`{{${key}}}`, value.toString()),
            template,
        );
    }

    private async getTemplate() {
        return `Hoy es {{now}} en {{host}} ({{machine}})`;
    }

    private async getData() {
        const date = new Date();
        const now = date.toLocaleString();
        const host = this.config.hostname;
        const machine = this.config.machine;

        const data = {
            now,
            host,
            machine,
        };
        return data;
    }
}
