import { Article, Articles } from "@/database/articles"

export const getArticle = async (slug: string) => {
    const article = Articles.find(article => article.slug === slug);
    return article;
}

export const getArticleByCategory = async (category: string) => {
    const selectedArticles: Article[] | [] = [];
    if (!category) return selectedArticles;
    Articles.forEach((article, index) => {
        if (article.category === category && index < 3) {
            (selectedArticles as Article[]).push(article);
        }
    });    
    return selectedArticles;
}

export const getAllArticles = async () => {
    return Articles;
}