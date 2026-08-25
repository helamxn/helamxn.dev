export interface JourneyItem {
	period: string;
	role: string;
	place: string;
	detail: string;
	practice?: boolean;
}

export interface ToolCategory {
	name: string;
	detail: string;
}

export interface InterestArea {
	name: string;
	detail: string;
}

export interface PortfolioLink {
	label: string;
	href: string;
	external: boolean;
}

export interface ProjectItem {
	name: string;
	description: string;
	tech: string;
	status?: 'completado' | 'en proceso' | string;
	url?: string;
}

export interface PortfolioData {
	name: string;
	handle: string;
	experienceSummary: string;
	roles: readonly string[];
	about: readonly string[];
	links: readonly PortfolioLink[];
	journey: readonly JourneyItem[];
	projects: readonly ProjectItem[];
	skills: readonly string[];
	tools: readonly ToolCategory[];
	interests: readonly InterestArea[];
}
