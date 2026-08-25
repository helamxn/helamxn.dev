export interface SocialLink {
	label: string;
	href: string;
}

export interface SiteConfig {
	name: string;
	title: string;
	description: string;
	url: string;
	language: string;
	themeColor: string;
	email: string;
	location: string;
	socialLinks: readonly SocialLink[];
}
