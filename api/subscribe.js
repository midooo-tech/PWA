// src/pages/api/subscribe.js

import { edgeConfig } from '@vercel/edge-config';

// Configure the API route to run on the Edge Runtime
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const subscription = await req.json();
  
  // Store the subscription in Edge Config using the endpoint as the key
  await edgeConfig.set(subscription.endpoint, JSON.stringify(subscription));

  return new Response('Subscription stored', { status: 201 });
}
