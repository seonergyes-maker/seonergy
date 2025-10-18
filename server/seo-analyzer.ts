import * as cheerio from 'cheerio';

export interface SEOAnalysisResult {
  website: string;
  timestamp: string;
  scores: {
    technical: { current: number; max: number };
    analytics: { current: number; max: number };
    legal: { current: number; max: number };
  };
  categories: {
    technical: {
      title: string;
      checks: Array<{
        name: string;
        status: 'success' | 'warning' | 'error';
        message: string;
      }>;
    };
    analytics: {
      title: string;
      checks: Array<{
        name: string;
        status: 'success' | 'warning' | 'error';
        message: string;
      }>;
    };
    legal: {
      title: string;
      checks: Array<{
        name: string;
        status: 'success' | 'warning' | 'error';
        message: string;
      }>;
    };
  };
}

interface FetchResult {
  html: string;
  url: string;
  statusCode: number;
  headers: Record<string, string>;
}

async function fetchWebsite(url: string): Promise<FetchResult> {
  try {
    // Asegurar que la URL tiene protocolo
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SeonergyBot/1.0; +https://seonergy.es)',
      },
      redirect: 'follow',
    });

    const html = await response.text();
    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return {
      html,
      url: response.url,
      statusCode: response.status,
      headers,
    };
  } catch (error) {
    throw new Error(`No se pudo acceder a la web: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}

async function checkRobotsTxt(baseUrl: string): Promise<{ exists: boolean; content?: string }> {
  try {
    const url = new URL('/robots.txt', baseUrl).toString();
    const response = await fetch(url);
    if (response.ok) {
      const content = await response.text();
      return { exists: true, content };
    }
    return { exists: false };
  } catch {
    return { exists: false };
  }
}

async function checkSitemap(baseUrl: string): Promise<{ exists: boolean; url?: string }> {
  try {
    // Intentar sitemap.xml en la raíz
    const url = new URL('/sitemap.xml', baseUrl).toString();
    const response = await fetch(url);
    if (response.ok) {
      return { exists: true, url };
    }

    // Intentar sitemap_index.xml
    const indexUrl = new URL('/sitemap_index.xml', baseUrl).toString();
    const indexResponse = await fetch(indexUrl);
    if (indexResponse.ok) {
      return { exists: true, url: indexUrl };
    }

    return { exists: false };
  } catch {
    return { exists: false };
  }
}

async function checkGoogleIndexing(domain: string): Promise<{ indexed: number; query: string }> {
  try {
    // Limpiar dominio
    const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0];
    const searchQuery = `site:${cleanDomain}`;
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const html = await response.text();
    const $ = cheerio.load(html);

    // Intentar extraer el número de resultados
    const resultStats = $('#result-stats').text();
    const match = resultStats.match(/Aproximadamente ([\d.,]+)|About ([\d.,]+)/);
    
    if (match) {
      const numberStr = (match[1] || match[2]).replace(/[.,]/g, '');
      return { indexed: parseInt(numberStr, 10), query: searchQuery };
    }

    // Si no encontramos stats, intentar contar resultados en la página
    const results = $('.g').length;
    return { indexed: results > 0 ? results : 0, query: searchQuery };
  } catch (error) {
    console.error('Error checking Google indexing:', error);
    return { indexed: 0, query: `site:${domain}` };
  }
}

function analyzeMetaTags(html: string, $: cheerio.CheerioAPI) {
  const checks = [];

  // Title
  const title = $('title').text();
  if (title && title.length > 0) {
    if (title.length >= 30 && title.length <= 60) {
      checks.push({
        name: 'Título SEO',
        status: 'success' as const,
        message: `Título optimizado: "${title.substring(0, 50)}..." (${title.length} caracteres)`,
      });
    } else if (title.length > 0) {
      checks.push({
        name: 'Título SEO',
        status: 'warning' as const,
        message: `Título presente pero ${title.length < 30 ? 'muy corto' : 'muy largo'}: ${title.length} caracteres`,
      });
    }
  } else {
    checks.push({
      name: 'Título SEO',
      status: 'error' as const,
      message: 'No se encontró etiqueta <title>',
    });
  }

  // Meta Description
  const description = $('meta[name="description"]').attr('content');
  if (description && description.length > 0) {
    if (description.length >= 120 && description.length <= 160) {
      checks.push({
        name: 'Meta Description',
        status: 'success' as const,
        message: `Meta description optimizada (${description.length} caracteres)`,
      });
    } else {
      checks.push({
        name: 'Meta Description',
        status: 'warning' as const,
        message: `Meta description ${description.length < 120 ? 'muy corta' : 'muy larga'}: ${description.length} caracteres`,
      });
    }
  } else {
    checks.push({
      name: 'Meta Description',
      status: 'error' as const,
      message: 'No se encontró meta description',
    });
  }

  // Open Graph
  const ogTitle = $('meta[property="og:title"]').attr('content');
  const ogImage = $('meta[property="og:image"]').attr('content');
  if (ogTitle && ogImage) {
    checks.push({
      name: 'Open Graph',
      status: 'success' as const,
      message: 'Open Graph configurado para redes sociales',
    });
  } else {
    checks.push({
      name: 'Open Graph',
      status: 'warning' as const,
      message: 'Open Graph incompleto o no configurado',
    });
  }

  // Canonical URL
  const canonical = $('link[rel="canonical"]').attr('href');
  if (canonical) {
    checks.push({
      name: 'URL Canónica',
      status: 'success' as const,
      message: 'URL canónica definida',
    });
  } else {
    checks.push({
      name: 'URL Canónica',
      status: 'warning' as const,
      message: 'No se encontró URL canónica',
    });
  }

  // Viewport
  const viewport = $('meta[name="viewport"]').attr('content');
  if (viewport) {
    checks.push({
      name: 'Responsive (Viewport)',
      status: 'success' as const,
      message: 'Configuración móvil detectada',
    });
  } else {
    checks.push({
      name: 'Responsive (Viewport)',
      status: 'error' as const,
      message: 'No hay meta viewport - no optimizado para móviles',
    });
  }

  return checks;
}

function analyzeAnalytics(html: string, $: cheerio.CheerioAPI) {
  const checks = [];

  // Google Analytics 4
  const hasGA4 = html.includes('gtag') || html.includes('googletagmanager.com/gtag/js');
  if (hasGA4) {
    checks.push({
      name: 'Google Analytics 4',
      status: 'success' as const,
      message: 'Google Analytics 4 detectado',
    });
  } else {
    checks.push({
      name: 'Google Analytics 4',
      status: 'error' as const,
      message: 'Google Analytics 4 no encontrado',
    });
  }

  // Google Tag Manager
  const hasGTM = html.includes('googletagmanager.com/gtm.js');
  if (hasGTM) {
    checks.push({
      name: 'Google Tag Manager',
      status: 'success' as const,
      message: 'Google Tag Manager instalado',
    });
  } else {
    checks.push({
      name: 'Google Tag Manager',
      status: 'warning' as const,
      message: 'Google Tag Manager no detectado',
    });
  }

  // Facebook Pixel
  const hasFBPixel = html.includes('facebook.net/') || html.includes('fbevents.js') || html.includes('fbq(');
  if (hasFBPixel) {
    checks.push({
      name: 'Facebook Pixel',
      status: 'success' as const,
      message: 'Facebook Pixel detectado',
    });
  } else {
    checks.push({
      name: 'Facebook Pixel',
      status: 'warning' as const,
      message: 'Facebook Pixel no encontrado',
    });
  }

  // Schema.org JSON-LD
  const hasSchema = $('script[type="application/ld+json"]').length > 0;
  if (hasSchema) {
    checks.push({
      name: 'Schema Markup',
      status: 'success' as const,
      message: 'Datos estructurados (Schema.org) encontrados',
    });
  } else {
    checks.push({
      name: 'Schema Markup',
      status: 'warning' as const,
      message: 'No se encontraron datos estructurados',
    });
  }

  return checks;
}

function analyzeLegal(html: string, $: cheerio.CheerioAPI) {
  const checks = [];

  // Banner de cookies
  const cookieKeywords = ['cookie', 'consentimiento', 'consent', 'gdpr', 'rgpd'];
  const hasCookieBanner = cookieKeywords.some(keyword => 
    html.toLowerCase().includes(keyword)
  );
  
  if (hasCookieBanner) {
    checks.push({
      name: 'Banner de Cookies',
      status: 'success' as const,
      message: 'Banner de cookies/consentimiento detectado',
    });
  } else {
    checks.push({
      name: 'Banner de Cookies',
      status: 'error' as const,
      message: 'No se detectó banner de cookies (obligatorio RGPD)',
    });
  }

  // Política de privacidad
  const privacyLinks = $('a').filter((_, el) => {
    const text = $(el).text().toLowerCase();
    const href = $(el).attr('href')?.toLowerCase() || '';
    return text.includes('privacidad') || text.includes('privacy') || 
           href.includes('privacidad') || href.includes('privacy');
  });

  if (privacyLinks.length > 0) {
    checks.push({
      name: 'Política de Privacidad',
      status: 'success' as const,
      message: 'Enlace a política de privacidad encontrado',
    });
  } else {
    checks.push({
      name: 'Política de Privacidad',
      status: 'error' as const,
      message: 'No se encontró política de privacidad (obligatorio RGPD)',
    });
  }

  // Política de cookies
  const cookieLinks = $('a').filter((_, el) => {
    const text = $(el).text().toLowerCase();
    const href = $(el).attr('href')?.toLowerCase() || '';
    return text.includes('cookies') || href.includes('cookies');
  });

  if (cookieLinks.length > 0) {
    checks.push({
      name: 'Política de Cookies',
      status: 'success' as const,
      message: 'Política de cookies encontrada',
    });
  } else {
    checks.push({
      name: 'Política de Cookies',
      status: 'warning' as const,
      message: 'No se encontró política de cookies',
    });
  }

  // Aviso legal
  const legalLinks = $('a').filter((_, el) => {
    const text = $(el).text().toLowerCase();
    const href = $(el).attr('href')?.toLowerCase() || '';
    return text.includes('aviso legal') || text.includes('legal') || 
           href.includes('aviso-legal') || href.includes('legal');
  });

  if (legalLinks.length > 0) {
    checks.push({
      name: 'Aviso Legal',
      status: 'success' as const,
      message: 'Aviso legal encontrado',
    });
  } else {
    checks.push({
      name: 'Aviso Legal',
      status: 'warning' as const,
      message: 'No se encontró aviso legal',
    });
  }

  return checks;
}

export async function analyzeSEO(websiteUrl: string): Promise<SEOAnalysisResult> {
  try {
    // Fetch website
    const fetchResult = await fetchWebsite(websiteUrl);
    const $ = cheerio.load(fetchResult.html);
    const baseUrl = new URL(fetchResult.url).origin;

    // Análisis paralelo
    const [robotsResult, sitemapResult, indexingResult] = await Promise.all([
      checkRobotsTxt(baseUrl),
      checkSitemap(baseUrl),
      checkGoogleIndexing(websiteUrl),
    ]);

    // Verificaciones técnicas
    const technicalChecks = [];

    // SSL/HTTPS
    if (fetchResult.url.startsWith('https://')) {
      technicalChecks.push({
        name: 'Certificado SSL/HTTPS',
        status: 'success' as const,
        message: 'Sitio seguro con HTTPS',
      });
    } else {
      technicalChecks.push({
        name: 'Certificado SSL/HTTPS',
        status: 'error' as const,
        message: 'El sitio no usa HTTPS (inseguro)',
      });
    }

    // Robots.txt
    if (robotsResult.exists) {
      technicalChecks.push({
        name: 'Robots.txt',
        status: 'success' as const,
        message: 'Archivo robots.txt encontrado',
      });
    } else {
      technicalChecks.push({
        name: 'Robots.txt',
        status: 'error' as const,
        message: 'No se encontró robots.txt',
      });
    }

    // Sitemap
    if (sitemapResult.exists) {
      technicalChecks.push({
        name: 'Sitemap XML',
        status: 'success' as const,
        message: `Sitemap encontrado: ${sitemapResult.url}`,
      });
    } else {
      technicalChecks.push({
        name: 'Sitemap XML',
        status: 'error' as const,
        message: 'No se encontró sitemap.xml',
      });
    }

    // Indexación Google
    if (indexingResult.indexed > 0) {
      technicalChecks.push({
        name: 'Indexación Google',
        status: 'success' as const,
        message: `${indexingResult.indexed} páginas indexadas en Google`,
      });
    } else {
      technicalChecks.push({
        name: 'Indexación Google',
        status: 'error' as const,
        message: 'No se encontraron páginas indexadas en Google',
      });
    }

    // Meta tags
    technicalChecks.push(...analyzeMetaTags(fetchResult.html, $));

    // Analytics
    const analyticsChecks = analyzeAnalytics(fetchResult.html, $);

    // Legal/RGPD
    const legalChecks = analyzeLegal(fetchResult.html, $);

    // Calcular scores
    const calculateScore = (checks: Array<{ status: string }>) => {
      const current = checks.filter(c => c.status === 'success').length;
      const max = checks.length;
      return { current, max };
    };

    return {
      website: fetchResult.url,
      timestamp: new Date().toISOString(),
      scores: {
        technical: calculateScore(technicalChecks),
        analytics: calculateScore(analyticsChecks),
        legal: calculateScore(legalChecks),
      },
      categories: {
        technical: {
          title: 'SEO Técnico',
          checks: technicalChecks,
        },
        analytics: {
          title: 'Analytics & Tracking',
          checks: analyticsChecks,
        },
        legal: {
          title: 'Legal (RGPD)',
          checks: legalChecks,
        },
      },
    };
  } catch (error) {
    throw new Error(`Error al analizar la web: ${error instanceof Error ? error.message : 'Error desconocido'}`);
  }
}
