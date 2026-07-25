import PusherClient from 'pusher-js';

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY || 'dummy_key',
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap2',
    authEndpoint: '/api/pusher/auth',
  }
);
