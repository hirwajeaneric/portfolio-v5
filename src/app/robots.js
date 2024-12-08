export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/dashboard'
            },
        ],
        sitemap: 'https://www.erichirwa.com/sitemap.xml'
    }
}