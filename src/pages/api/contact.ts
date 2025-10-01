import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';
export const post: APIRoute = async ({ request }) => {
try {
const formData = await request.formData();
const name = formData.get('name')?.toString() || 'Anonymous';
const email = formData.get('email')?.toString() || 'No email';
const message = formData.get('message')?.toString() || '';

// Get (or create) a blob store called "contact-messages"
const store = getStore('contact-messages');

// Save the message using a timestamp as the key
await store.setItem(Date.now().toString(), {
name,
email,
message,
});

return new Response(
'✅ Thanks for your message! We’ll get back to you soon.',
{ status: 200 }
);
} catch (err) {
console.error(err);
return new Response('❌ Something went wrong. Please try again later.', {
status: 500,
});
}
};
