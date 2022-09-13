export class InfoService {
	public static async getInfo(): Promise<object> {
		return {
			name: 'API v1',
			routes: ['v1', 'v1/routes'],
		};
	}
}
