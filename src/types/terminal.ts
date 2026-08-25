export interface CommandItem {
	value: string;
	description: string;
}

export interface CommandDefinition {
	canonical: string;
	output: string | null;
	aliases: string[];
	description?: string;
}
