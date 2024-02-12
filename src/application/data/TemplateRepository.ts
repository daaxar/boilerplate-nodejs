import { ConfigApplication } from '../../config/types';
import { Template } from '../../model/Template';

export class TemplateRepository {
    constructor(private readonly config: ConfigApplication) {}

    async getTemplate(lang: string): Promise<Template> {
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

        return template as Template;
    }
}
