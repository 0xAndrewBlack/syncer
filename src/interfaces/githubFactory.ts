export class Project {
	number: number;
	name: string;
	id: number;

	constructor(number: number, name: string, id: number) {
		this.number = number;
		this.name = name;
		this.id = id;
	}
}

export class CardContent {
	id: number;
	url: string;
	type: string;

	constructor(id: number, url: string, type: string) {
		this.id = id;
		this.url = url;
		this.type = type;
	}
}

export class Card {
	id: number;
	columnUrl: string;

	constructor(id: number, columnUrl: string) {
		this.id = id;
		this.columnUrl = columnUrl;
	}
}
