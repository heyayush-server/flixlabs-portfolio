export default function handler(req, res) {
  // Read Vercel geo header: x-vercel-ip-country
  const rawCountry = req.headers['x-vercel-ip-country'] || req.headers['x-country-code'] || '';
  const country = rawCountry.toString().trim().toUpperCase();
  
  // Set cache headers so country response is never cached across users on CDN
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Content-Type', 'application/json');
  
  return res.status(200).json({
    country: country || 'US',
    currency: country === 'IN' ? 'INR' : 'USD'
  });
}
