import path from 'node:path';
import { readFile, statfs } from 'node:fs/promises';
import { ConfigApplication } from '../../config/types';
import { Template } from '../../model/Template';
import { TemplateRepository } from '../../application/data/TemplateRepository';

export class TemplateFilesystemRepository implements TemplateRepository {
    constructor(private readonly config: ConfigApplication) {}

    async getTemplate(lang: string): Promise<Template> {
        const template: Template = await this.getFile(lang);

        if (!template) throw new Error('Idioma invalido');

        return template as Template;
    }

    private async getFile(lang: string): Promise<string> {
        const pathBase = this.config.data?.filesystem?.path;

        if (!pathBase) throw new Error('PATH INVALIDO');

        const filePath = path.resolve(pathBase, `template`);
        const fileName = path.resolve(filePath, `${lang}.json`);

        if (!(await statfs(fileName))) throw new Error('Idioma invalido');

        return (await readFile(fileName)).toString();
    }
}
