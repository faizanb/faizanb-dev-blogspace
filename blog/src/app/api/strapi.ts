import type { NextApiRequest, NextApiResponse } from 'next';

const STRAPI_API_URL = process.env.NX_STRAPI_API_URL;
const STRAPI_AUTH_TOKEN = process.env.NX_STRAPI_AUTH_TOKEN;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!STRAPI_API_URL || !STRAPI_AUTH_TOKEN) {
    return res.status(500).json({ error: 'Server configuration is missing.' });
  }

  const { method, body, query } = req;

  try {
    if (method === 'GET') {
      const response = await fetch(`${STRAPI_API_URL}/${query.endpoint}`, {
        headers: {
          Authorization: `Bearer ${STRAPI_AUTH_TOKEN}`,
        },
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    if (method === 'POST') {
      const response = await fetch(`${STRAPI_API_URL}/${query.endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${STRAPI_AUTH_TOKEN}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      return res.status(response.status).json(data);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('Error in API handler:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
