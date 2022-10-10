export function stripStatusFromThread(threadName: string): string {
	return threadName
		.split(' ')
		.reverse()
		.join(' ')
		.substring(0, threadName.length - 5)
		.split(' ')
		.reverse()
		.join(' ');
}

export const labels = [
	{ label: 'Backlog', value: 'backlog' },
	{ label: 'Todo', value: 'todo' },
	{ label: 'In Progress', value: 'wip' },
	{ label: 'Testing', value: 'testing' },
	{ label: 'Done', value: 'done' },
];

export const labelsWithEmojis = [
	{ label: 'Backlog', value: 'backlog', emoji: '📁' },
	{ label: 'Todo', value: 'todo', emoji: '📝' },
	{ label: 'In Progress', value: 'wip', emoji: '🚧' },
	{ label: 'Testing', value: 'testing', emoji: '🧪' },
	{ label: 'Done', value: 'done', emoji: '✅' },
];

export const Stories = ['Guild Quest', 'POAP Drop'];
export const Priorities = ['Low', 'Medium', 'High', 'Critical'];
export const Status = ['Backlog', 'Todo', 'In Progress', 'Testing', 'Done'];
