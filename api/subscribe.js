import { edgeConfig } from '@vercel/edge-config';

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  try {
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const subscription = await req.json();

    // Check if subscription object has expected structure
    if (!subscription.endpoint) {
      return new Response('Invalid subscription data', { status: 400 });
    }

    // Store the subscription in Edge Config using the endpoint as the key
    await edgeConfig.set(subscription.endpoint, JSON.stringify(subscription));

    return new Response('Subscription stored', { status: 201 });
  } catch (error) {
    console.error('Error handling subscribe request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
