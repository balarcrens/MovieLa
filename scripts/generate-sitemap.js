import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_URL = process.env.VITE_DB_URL || 'https://moviela-server.onrender.com';
const SITE_URL = 'https://moviela.vercel.app';

async function generateSitemap() {
    console.log('Generating dynamic sitemap...');
    try {
        const response = await axios.get(`${DB_URL}/api/v1/movie/getmovie?page=1&limit=5000`);
        const movies = response.data.movies || [];
        
        const staticRoutes = [
            '/',
            '/movie/filter/latest',
            '/movie/filter/popular',
            '/movie/filter/rating',
            '/movie/filter/bollywood',
            '/movie/filter/hollywood',
            '/movie/filter/tollywood',
            '/movie/category/action',
            '/movie/category/comedy',
            '/movie/category/horror',
            '/movie/category/drama',
            '/movie/category/sci-fi'
        ];

        let sitemapStart = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
        
        let urls = '';

        // Add static routes
        for (const route of staticRoutes) {
            urls += `
            <url>
                <loc>${SITE_URL}${route}</loc>
                <changefreq>daily</changefreq>
                <priority>${route === '/' ? '1.0' : '0.8'}</priority>
            </url>`;
        }

        // Add movie dynamic routes
        for (const movie of movies) {
            urls += `
            <url>
                <loc>${SITE_URL}/movie/${movie.slug}</loc>
                <changefreq>weekly</changefreq>
                <priority>0.9</priority>
            </url>`;
        }

        const sitemapEnd = `\n</urlset>`;
        
        const output = sitemapStart + urls + sitemapEnd;
        
        const publicDir = path.resolve(__dirname, '../public');
        if (!fs.existsSync(publicDir)) {
            fs.mkdirSync(publicDir, { recursive: true });
        }
        
        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), output);
        
        console.log(`Generated sitemap.xml successfully with ${movies.length} movies.`);
    } catch (error) {
        console.error('Failed to generate sitemap:', error.message);
        // We don't want to crash the whole build if the DB is temporarily down, so we gracefully exit.
        process.exit(1);
    }
}

generateSitemap();
