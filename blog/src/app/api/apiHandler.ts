const STRAPI_API_URL = process.env.NX_STRAPI_API_URL;
const STRAPI_AUTH_TOKEN = process.env.NX_STRAPI_AUTH_TOKEN;

export type ApiHandlerRequest = {
  method: string;
  body?: any;
  query?: any;
};

export type ApiHandlerResponse = {
  status: number;
  data: any;
};

export default async function handler(
  reqObject: ApiHandlerRequest
): Promise<ApiHandlerResponse> {
  if (!STRAPI_API_URL || !STRAPI_AUTH_TOKEN) {
    return {
      status: 500,
      data: { error: 'Server configuration is missing.' },
    };
  }

  const { method, body, query } = reqObject;

  try {
    if (method === 'GET') {
      const response = await fetch(`${STRAPI_API_URL}/${query.endpoint}`, {
        headers: {
          Authorization: `Bearer ${STRAPI_AUTH_TOKEN}`,
        },
      });

      const data = await response.json();
      return { status: response.status, data };
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
      return { status: response.status, data };
    }

    return {
      status: 405,
      data: { error: 'Method not allowed' },
    };
  } catch (error) {
    console.error('Error in API handler:', error);
    return {
      status: 500,
      data: { error: 'Internal server error' },
    };
  }
}
