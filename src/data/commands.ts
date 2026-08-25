import type { CommandDefinition, CommandItem } from '@/types/terminal';

export const terminalCommands: readonly CommandItem[] = [
	{ value: 'help', description: 'mostrar comandos disponibles' },
	{ value: 'ls', description: 'listar las secciones' },
	{ value: 'whoami', description: 'mostrar perfil e identidad' },
	{ value: 'projects', description: 'ver proyectos destacados' },
	{ value: 'journey', description: 'ver trayectoria académica y laboral' },
	{ value: 'skills', description: 'listar habilidades' },
	{ value: 'tools', description: 'consultar herramientas' },
	{ value: 'contact', description: 'mostrar contacto' },
	{ value: 'clear', description: 'limpiar la terminal' },
] as const;

export const quickCommands: readonly string[] = [
	'help',
	'whoami',
	'projects',
	'journey',
	'skills',
	'tools',
	'contact',
] as const;

export const commandDefinitions: readonly CommandDefinition[] = [
	{ canonical: 'help', output: 'help', aliases: ['?', '--help', '-h'], description: 'mostrar comandos disponibles' },
	{ canonical: 'ls', output: 'files', aliases: ['dir', 'list'], description: 'listar las secciones' },
	{ canonical: 'whoami', output: 'identity', aliases: ['about', 'id', 'bio', 'sobre-mi', 'target', 'jobs', 'roles', 'oportunidades'], description: 'mostrar perfil e identidad' },
	{ canonical: 'projects', output: 'projects', aliases: ['proyectos', 'repos', 'code', 'portfolio'], description: 'ver proyectos destacados' },
	{ canonical: 'journey', output: 'journey', aliases: ['experience', 'timeline', 'trayectoria', 'history', 'exp'], description: 'ver trayectoria académica y laboral' },
	{ canonical: 'skills', output: 'skills', aliases: ['habilidades'], description: 'listar habilidades' },
	{ canonical: 'tools', output: 'tools', aliases: ['herramientas', 'stack'], description: 'consultar herramientas' },
	{ canonical: 'contact', output: 'contact', aliases: ['contacto', 'email', 'redes'], description: 'mostrar contacto' },
	{ canonical: 'clear', output: null, aliases: ['cls'], description: 'limpiar la terminal' },
] as const;
