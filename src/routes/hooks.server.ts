import { default_options } from 'web-sentinel';
import { createHandler } from 'web-sentinel/hooks';

export const handle = createHandler({
	...default_options,
	log: false,
	preview: false // Set to false to actually block requests once you are happy with the rules
});

// import type { Handle } from '@sveltejs/kit';

// export const handle: Handle = async ({ event, resolve }) => {
// 	if (event.url.pathname.startsWith('/custom')) {
// 		return new Response('custom response');
// 	}

// 	const response = await resolve(event);
// 	return response;
// };
