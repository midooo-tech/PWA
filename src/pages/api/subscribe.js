export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const subscription = await req.json();
  
  // Store the subscription in Edge Config (assumed to be set up)
  await YOUR_EDGE_CONFIG_STORE.set(subscription.endpoint, JSON.stringify(subscription));

  return new Response('Subscription stored', { status: 201 });
}
