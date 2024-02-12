import { ConfigApplication } from '../config/types';
import { TemplateRepository } from './data/TemplateRepository';

export class AppService {
    constructor(
        private readonly repo: TemplateRepository,
        private readonly config: ConfigApplication,
    ) {}

    async getMessage(lang: string): Promise<string> {
        const [template, data] = await Promise.all([
            this.repo.getTemplate(lang),
            this.getData(),
        ]);

        return Object.entries(data).reduce(
            (tpl: string, [key, value]: [string, unknown]) =>
                tpl.replace(`{{${key}}}`, value.toString()),
            template,
        );
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
