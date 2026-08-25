import { siteConfig } from '@/config/site';
import type { JourneyItem, PortfolioData } from '@/types/portfolio';

export const portfolio: PortfolioData = {
	name: siteConfig.name,
	handle: 'helamxn',
	experienceSummary: 'Más de dos años en soporte TI y gestión administrativa.',
	roles: ['Soporte TI', 'Análisis de datos', 'Desarrollo web'],
	about: [
		'Técnico en Computación e Informática y estudiante de Ingeniería de Sistemas Computacionales.',
		'Enfocado en atención a usuarios, diagnóstico de incidencias, consultas SQL, documentación técnica, automatización de tareas y desarrollo de aplicaciones web funcionales.',
	],
	links: [
		{ label: 'Correo', href: `mailto:${siteConfig.email}`, external: false },
		...siteConfig.socialLinks.map((link) => ({ ...link, external: true })),
	],
	journey: [
		{
			period: '2025 — actualidad',
			role: 'Ingeniería de Sistemas Computacionales',
			place: 'Universidad Privada del Norte',
			detail: 'Ampliando conocimientos en arquitectura de sistemas y desarrollo de software.',
		},
		{
			period: '2024 — actualidad',
			role: 'Asistente Administrativo - Soporte',
			place: 'Berlitz Perú',
			detail: 'Soporte a usuarios, monitoreo de plataformas, seguimiento de incidencias, coordinación y reportes.',
		},
		{
			period: '2022',
			role: 'Desarrollador Web Junior',
			place: 'Agencia Consigue Ventas Online',
			practice: true,
			detail: 'Desarrollo de páginas y componentes web, ajustes de interfaz y pruebas funcionales.',
		},
		{
			period: '2021',
			role: 'Analista de Sistemas Junior',
			place: 'IESTP Manuel Seoane Corrales',
			practice: true,
			detail: 'Desarrollo de aplicaciones funcionales para control de asistencias e inventario, pruebas y documentación técnica.',
		},
		{
			period: '2020 — 2023',
			role: 'Técnico en Computación e Informática',
			place: 'IESTP Manuel Seoane Corrales',
			detail: 'Formación técnica en computación, desarrollo de software, redes y bases de datos.',
		},
	],
	projects: [],
	skills: [
		'Diagnóstico de problemas',
		'Priorización de incidencias',
		'Atención y soporte a usuarios',
		'Análisis de requerimientos y pruebas funcionales',
		'Seguimiento de casos',
		'Documentación técnica',
		'Comunicación con usuarios no técnicos',
		'Automatización de tareas repetitivas',
	],
	tools: [
		{
			name: 'Soporte y productividad',
			detail: 'Windows, Microsoft 365, Google Workspace, Teams, Zoom, AnyDesk, TeamViewer y Escritorio remoto.',
		},
		{
			name: 'Datos',
			detail: 'Power BI, SQL, MySQL, SQL Server, PostgreSQL y Supabase.',
		},
		{
			name: 'Desarrollo',
			detail: 'Git, GitHub, TypeScript, JavaScript, Astro, React, HTML, CSS, Java, C# con .NET, Python y PHP.',
		},
		{
			name: 'Sistemas',
			detail: 'VirtualBox, VMware, Linux, redes TCP/IP, gestión de accesos y revisión de logs.',
		},
		{
			name: 'Otros',
			detail: 'APIs REST, JSON, plataformas CRM, Figma y herramientas de IA.',
		},
	],
	interests: [
		{
			name: 'Soporte',
			detail: 'Analista de Soporte TI, soporte de aplicaciones y monitoreo.',
		},
		{
			name: 'Datos',
			detail: 'Analista de datos, Data & BI y mejora de procesos.',
		},
		{
			name: 'Desarrollo',
			detail: 'Desarrollo web, QA y programación junior.',
		},
	],
};
