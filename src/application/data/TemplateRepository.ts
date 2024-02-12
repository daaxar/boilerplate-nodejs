import { Template } from '../../model/Template';

export interface TemplateRepository {
    getTemplate(lang: string): Promise<Template>;
}
