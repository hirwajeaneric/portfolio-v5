export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/dashboard'
            },
        ],
        sitemap: 'https://hirwajeaneric.netlify.app/sitemap.xml'
    }
}