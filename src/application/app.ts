import { ConfigApplication } from '../config/types';

type Language = 'es' | 'en' | 'pt' | 'it' | 'fr' | 'de';

export class AppService {
    constructor(private readonly config: ConfigApplication) {}

    async getMessage(): Promise<string> {
        const lang = ['es', 'en', 'pt', 'it', 'fr', 'de'][
            Math.floor(Math.random() * 6)
        ];
        const [template, data] = await Promise.all([
            this.getTemplate(lang),
            this.getData(),
        ]);

        return Object.entries(data).reduce(
            (tpl: string, [key, value]: [string, unknown]) =>
                tpl.replace(`{{${key}}}`, value.toString()),
            template,
        );
    }

    private async getTemplate(lang: Language) {
        const tempĺates = {
            es: 'Hoy es {{now}} en {{host}} ({{machine}})',
            en: 'Today is {{now}} in {{host}} ({{machine}})',
            pt: 'Hoje é {{now}} em {{host}} ({{machine}})',
            it: 'Oggi è {{now}} in {{host}} ({{machine}})',
            fr: "Aujourd'hui, c'est {{now}} à {{host}} ({{machine}})",
            de: 'Heute ist {{now}} in {{host}} ({{machine}})',
        };

        const template = tempĺates[lang];

        if (!template) throw new Error('Idioma invalido');

        return template;
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
