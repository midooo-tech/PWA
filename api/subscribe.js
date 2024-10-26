// src/pages/api/subscribe.js

import { createEdgeConfig } from '@vercel/edge-config';

// Initialize Edge Config
const edgeConfig = createEdgeConfig();

// Configure the API route
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const subscription = await req.json();
  
  // Store the subscription in Edge Config
  await edgeConfig.set(subscription.endpoint, JSON.stringify(subscription));

  return new Response('Subscription stored', { status: 201 });
}
