import { Articles } from "@/database/articles"

export const getArticle = async (slug: string) => {
    const article = Articles.find(article => article.slug === slug);
    return article;
}