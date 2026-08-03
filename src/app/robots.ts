import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://madclap.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/pro/', '/dashboard/', '/book/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
