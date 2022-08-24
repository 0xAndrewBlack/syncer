import { config } from '../config.js';
import logger from '../utils/logger.js';

import { Octokit } from '@octokit/rest';
import GitHubProject from 'github-project';

import { capitalize, sleep } from '../utils/helpers.js';

export class GitHubService {
	public github: Octokit;
	public guildId: string;
	public repo: string;
	public owner: string;
	public location: string;
	public projectId: Number;
	public labels: Array<string>;
	public project: GitHubProject;

	constructor() {
		this.github = new Octokit({
			auth: config.GH_TOKEN,
		});
		this.guildId = config.GUILD_ID;
		this.repo = config.GH_REPO;
		this.owner = config.GH_ORG;
		this.location = `${this.repo}/${this.repo}`;
		this.projectId = config.GH_PROJECT_NUMBER;
		this.project = new GitHubProject({
			org: config.GH_ORG,
			number: config.GH_PROJECT_NUMBER,
			token: config.GH_TOKEN,
			fields: {
				priority: 'Priority',
				story: 'Story',
			},
		});
		this.labels = ['Backlog', 'Todo', 'In-Progress', 'Testing', 'Done'];
	}

	// Reinit to counter weird process handling
	init() {
		this.github = new Octokit({
			auth: config.GH_TOKEN,
		});
		this.guildId = config.GUILD_ID;
		this.repo = config.GH_REPO;
		this.owner = config.GH_ORG;
		this.location = `${this.repo}/${this.repo}`;
		this.projectId = config.GH_PROJECT_NUMBER;
		this.project = new GitHubProject({
			org: config.GH_ORG,
			number: config.GH_PROJECT_NUMBER,
			token: config.GH_TOKEN,
			fields: {
				priority: 'Priority',
			},
		});
		this.labels = ['Backlog', 'Todo', 'In-Progress', 'Testing', 'Done'];
	}

	async populate(guildId: string, owner: string, repo: string, project: string) {
		this.guildId = guildId;
		this.repo = repo;
		this.owner = owner;
		this.location = `${this.owner}/${this.repo}`;
		this.projectId = Number(project);
	}

	async initColumns(projectId: number): Promise<void> {
		const { github, labels, location } = this;

		labels.forEach((label: string) => {
			github.projects.createColumn({
				project_id: projectId,
				name: label,
			});
		});
	}

	async isIssueExists(title: string): Promise<any> {
		const { github, repo, owner } = this;

		const state = github.search
			.issuesAndPullRequests({
				q: `type:issue ${title} repo:${owner}/${repo}`,
				sort: 'created',
			})
			.then((query) => {
				const issue = query.data.items[0];
				const { number, labels, node_id, html_url } = issue;

				if (html_url) {
					return issue;
				}
			})
			.catch((e: Error) => {
				return false;
			});

		return state;
	}

	async getProject(nodeId: string): Promise<any> {
		const { project } = this;

		return project.items.getByContentId(nodeId);
	}

	async createIssue(title: string, body: string, label: string | Array<string>) {
		const { github, project, repo, owner } = this;

		const issue = await github.rest.issues.create({
			owner: owner,
			repo: repo,
			title: title,
			body: body,
			labels: [...label],
		});

		project.items.add(issue.data.node_id, {
			status: 'Backlog',
		});

		return issue;
	}

	async editIssueWoBody(oldTitle: string, newTitle: string) {
		const { github, repo, owner, location } = this;

		await sleep(3000);

		github.search
			.issuesAndPullRequests({
				q: `type:issue ${oldTitle} repo:${owner}/${repo}`,
				sort: 'created',
			})
			.then((query) => {
				const { number, labels } = query.data.items[0];

				github.issues.update({
					issue_number: Number(number),
					owner: owner,
					repo: repo,
					title: newTitle,
					// labels: labels,
				});
			})
			.catch((e: Error) => {
				return 'Issue not found.';
			});
	}

	async editIssue(oldTitle: string, newTitle: string, issueBody: string) {
		const { github, repo, owner } = this;

		github.search
			.issuesAndPullRequests({
				q: `type:issue ${oldTitle} repo:${owner}/${repo}`,
				sort: 'created',
			})
			.then((query) => {
				const { number, labels, node_id } = query.data.items[0];

				// this.editProject(node_id, capitalize(String(labels[0].name)));

				github.issues.update({
					issue_number: Number(number),
					owner: owner,
					repo: repo,
					title: newTitle,
					body: issueBody,
					labels: labels,
				});
			})
			.catch((e: Error) => {
				return 'Issue not found.';
			});
	}

	async editProject(nodeId: string, status: string) {
		const { project } = this;

		return project.items.updateByContentId(nodeId, {
			status: status,
		});
	}

	async editIssueLabel(title: string, label: string | Array<string>, updateIssue: Boolean) {
		const { github, repo, owner } = this;

		let issueNumber = 0;

		github.search
			.issuesAndPullRequests({
				q: `type:issue ${title} repo:${owner}/${repo}`,
			})
			.then((query) => {
				const { number, node_id, labels } = query.data.items[0];

				if (updateIssue) {
					github.issues.update({
						issue_number: Number(number),
						owner: owner,
						repo: repo,
						labels: [...labels, ...label],
					});

					return;
				}

				this.editProject(node_id, String(label));
			})
			.catch((e: Error) => {
				return 'Issue not found.';
			});
	}

	async toggleLockIssue(title: string) {
		const { github, repo, owner } = this;
		let issueNumber = 0;

		github.search
			.issuesAndPullRequests({
				q: `type:issue ${title} repo:${owner}/${repo}`,
				sort: 'created',
			})
			.then((query) => {
				const { number, labels } = query.data.items[0];

				if (query.data.items[0].locked) {
					github.issues.unlock({
						issue_number: Number(number),
						owner: owner,
						repo: repo,
						title: title,
						labels: labels,
					});
					return;
				}

				github.issues.lock({
					issue_number: Number(number),
					owner: owner,
					repo: repo,
					title: title,
					labels: labels,
				});
			})
			.catch((e: Error) => {
				return 'Issue not found.';
			});
	}

	async toggleIssue(title: string) {
		const { github, project, repo, owner } = this;

		github.search
			.issuesAndPullRequests({
				q: `type:issue ${title} repo:${owner}/${repo}`,
				sort: 'created',
			})
			.then((query) => {
				const { state, number, labels, node_id } = query.data.items[0];

				project.items.getByContentId(node_id).then((issue) => {
					if (issue?.fields.status === 'Done') {
						project.items.updateByContentId(node_id, {
							status: 'Backlog',
						});
					}
				});

				github.issues.update({
					issue_number: Number(number),
					owner: owner,
					repo: repo,
					title: title,
					labels: labels,
					state: state === 'open' ? 'closed' : 'open',
				});
			})
			.catch((e: Error) => {
				return 'Issue not found.';
			});
	}

	async isOrg(owner: string): Promise<boolean> {
		try {
			await this.github.rest.orgs.get({
				org: owner,
			});
			return true;
		} catch (error: unknown) {
			return false;
		}
	}

	async setPriority(channel: string, prio: string): Promise<any> {
		const { github, project, repo, owner } = this;

		const issue = await github.search.issuesAndPullRequests({
			q: `type:issue ${channel} repo:${owner}/${repo}`,
			sort: 'created',
		});

		const { node_id } = issue.data.items[0];

		try {
			// @ts-ignore
			const projectWithPrio = await project.items.updateByContentId(node_id, { priority: prio });

			return projectWithPrio as object;
		} catch (error) {
			throw error;
		}
	}

	async addAssignee(channel: string, assignee: string): Promise<object> {
		const { github, repo, owner } = this;

		const issue = await github.search.issuesAndPullRequests({
			q: `type:issue ${channel} repo:${owner}/${repo}`,
			sort: 'created',
		});

		const { number } = issue.data.items[0];

		const assigned = await github.issues.addAssignees({
			owner: this.owner,
			repo: this.repo,
			issue_number: number,
			assignees: [assignee],
		});

		return assigned;
	}

	async createCard(issueContentId: string, title: string) {
		const { project } = this;

		return await project.items.add(issueContentId, {
			title: title,
		});
	}

	async getCard(title: string) {
		const { github, project } = this;

		const issueNodeId: any = await project.items.list().then((data) => {
			return data.find((d) => d.fields.title === title)?.id;
		});

		return project.items.get(issueNodeId);
	}

	async updateCard(oldTitle: string, newTitle: string) {
		const { project, getCard } = this;

		const card: any = await getCard('title');

		project.items.update(card.id, {
			title: newTitle,
		});
	}

	async getCards() {
		const { project } = this;

		return await project.items.list();
	}

	getData() {
		return this;
	}
}

export const gh = new GitHubService();
gh.init();
