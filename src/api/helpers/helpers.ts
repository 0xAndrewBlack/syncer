import p from '../../../package.json' assert { type: 'json' };

export const ALLOWED_IPS = ['::1'];

export const BOT_VERSION = `v${p.version}`;
export const API_VERSION = 'v0.2.1';

export const morganJSONFormat = () =>
	JSON.stringify({
		method: ':method',
		url: ':url',
		http_version: ':http-version',
		remote_addr: ':remote-addr',
		remote_addr_forwarded: ':req[x-forwarded-for]',
		response_time: ':response-time',
		status: ':status',
		content_length: ':res[content-length]',
		timestamp: ':date[iso]',
		user_agent: ':user-agent',
	});

export const morganProdOptions =
	'":req[x-forwarded-for]/:remote-addr/:remote-user" [:date[web]] ' +
	'":method :url HTTP/:http-version" :status ' +
	'":referrer" ":user-agent" :response-time ms';

export const corsOptions = {
	methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	preflightContinue: true,
	optionsSuccessStatus: 200,
};
