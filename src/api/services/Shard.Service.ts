export class ShardService {
	public static async getShards(): Promise<object> {
		return {
			shardCount: 1,
		};
	}
}
