import { commandDefinitions } from '@/data/commands';
import type { CommandDefinition } from '@/types/terminal';

export function initTerminal(): void {
	const terminal = document.querySelector<HTMLElement>('[data-terminal]');
	if (!terminal) return;

	const log = terminal.querySelector<HTMLElement>('[data-terminal-log]');
	const status = terminal.querySelector<HTMLElement>('[data-terminal-status]');
	const form = terminal.querySelector<HTMLFormElement>('[data-terminal-form]');
	const input = terminal.querySelector<HTMLInputElement>('#terminal-command');
	const caret = terminal.querySelector<HTMLElement>('[data-terminal-caret]');
	const suggestions = terminal.querySelector<HTMLElement>('[data-terminal-suggestions]');
	const library = terminal.querySelector<HTMLElement>('[data-command-library]');
	const optionButtons = Array.from(terminal.querySelectorAll<HTMLButtonElement>('[data-command-option]'));
	const quickButtons = Array.from(terminal.querySelectorAll<HTMLButtonElement>('[data-quick-command]'));

	const history: string[] = [];
	let historyIndex = 0;
	let selectedSuggestionIndex = -1;
	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const updateCaretPosition = (): void => {
		if (!input || !caret) return;
		const pos = input.selectionStart ?? input.value.length;
		caret.style.setProperty('--caret-pos', `${pos}ch`);
	};

	const normalize = (value: string): string => value.trim().replace(/\s+/g, ' ').toLowerCase();

	const announce = (message: string): void => {
		if (!status) return;
		status.textContent = '';
		window.requestAnimationFrame(() => {
			status.textContent = message;
		});
	};

	const setSuggestionsOpen = (open: boolean): void => {
		if (suggestions) suggestions.hidden = !open;
		input?.setAttribute('aria-expanded', String(open));
		if (!open) input?.removeAttribute('aria-activedescendant');
	};

	const commandMap = new Map<string, CommandDefinition>();
	for (const definition of commandDefinitions) {
		commandMap.set(normalize(definition.canonical), definition);
		for (const alias of definition.aliases) {
			commandMap.set(normalize(alias), definition);
		}
	}

	const appendCommand = (command: string): void => {
		if (!log) return;
		const line = document.createElement('p');
		line.className = 'command-line terminal-command-history';
		const prompt = document.createElement('span');
		prompt.className = 'prompt';
		prompt.textContent = 'helamxn@dev:~$';
		const value = document.createElement('span');
		value.textContent = command;
		line.append(prompt, value);
		log.append(line);
	};

	const appendError = (command: string): void => {
		if (!log) return;
		const error = document.createElement('div');
		error.className = 'console-output terminal-error terminal-output-enter';
		const message = document.createElement('p');
		message.textContent = `command not found: ${command}`;
		const help = document.createElement('p');
		help.textContent = 'Escribe help para ver los comandos disponibles.';
		error.append(message, help);
		log.append(error);
	};

	const appendOutput = (key: string): void => {
		const source = library?.querySelector<HTMLElement>(`[data-output-key="${key}"]`);
		if (!source || !log) return;
		const output = source.cloneNode(true) as HTMLElement;
		output.removeAttribute('data-output-key');
		output.classList.add('terminal-output-enter');
		log.append(output);
	};

	const clearTerminal = (): void => {
		if (log) log.replaceChildren();
	};

	const scrollToEnd = (): void => {
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => {
				window.scrollTo({
					top: document.documentElement.scrollHeight,
					behavior: reduceMotion ? 'auto' : 'smooth',
				});
			});
		});
	};

	const getVisibleSuggestions = (): HTMLButtonElement[] =>
		optionButtons.filter((button) => !button.hidden);

	const highlightSuggestion = (index: number): void => {
		const visible = getVisibleSuggestions();
		let activeOptionId = '';
		visible.forEach((btn, i) => {
			const isSelected = i === index;
			btn.classList.toggle('is-selected', isSelected);
			btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
			if (isSelected) {
				activeOptionId = btn.id;
				btn.scrollIntoView({ block: 'nearest' });
			}
		});
		selectedSuggestionIndex = activeOptionId ? index : -1;
		if (activeOptionId) {
			input?.setAttribute('aria-activedescendant', activeOptionId);
		} else {
			input?.removeAttribute('aria-activedescendant');
		}
	};

	const updateSuggestions = (): void => {
		if (!input || !suggestions) return;
		const query = normalize(input.value);

		if (query.length === 0) {
			highlightSuggestion(-1);
			setSuggestionsOpen(false);
			return;
		}

		let visibleCount = 0;
		for (const button of optionButtons) {
			const command = button.dataset.commandOption ?? '';
			const matches = normalize(command).startsWith(query) || normalize(command).includes(query);
			button.hidden = !matches;
			if (matches) visibleCount += 1;
		}

		setSuggestionsOpen(visibleCount > 0);
		highlightSuggestion(visibleCount > 0 ? 0 : -1);
	};

	const runCommand = (rawCommand: string): void => {
		if (!input) return;
		const command = rawCommand.trim();
		if (!command) return;

		appendCommand(command);
		history.push(command);
		historyIndex = history.length;
		const definition = commandMap.get(normalize(command));

		if (!definition) {
			appendError(command);
			announce(`Comando no reconocido: ${command}.`);
		} else if (definition.output === null) {
			clearTerminal();
			announce('Terminal limpiada.');
		} else {
			appendOutput(definition.output);
			announce(`Comando ${definition.canonical} ejecutado.`);
		}

		input.value = '';
		updateCaretPosition();
		highlightSuggestion(-1);
		setSuggestionsOpen(false);
		input.focus();
		scrollToEnd();
	};

	form?.addEventListener('submit', (event) => {
		event.preventDefault();
		if (input) {
			runCommand(input.value);
			input.focus();
		}
	});

	input?.addEventListener('input', () => {
		updateSuggestions();
		updateCaretPosition();
	});

	input?.addEventListener('focus', () => {
		if (input.value.trim().length > 0) updateSuggestions();
		updateCaretPosition();
	});

	input?.addEventListener('blur', () => {
		window.setTimeout(() => {
			setSuggestionsOpen(false);
		}, 150);
	});

	input?.addEventListener('click', updateCaretPosition);
	input?.addEventListener('keyup', updateCaretPosition);
	input?.addEventListener('select', updateCaretPosition);

	input?.addEventListener('keydown', (event) => {
		window.requestAnimationFrame(updateCaretPosition);
		const visible = getVisibleSuggestions();

		if (event.key === 'Escape') {
			highlightSuggestion(-1);
			setSuggestionsOpen(false);
			return;
		}

		if (event.key === 'Tab') {
			if (visible.length > 0 && !suggestions?.hidden) {
				event.preventDefault();
				const target =
					selectedSuggestionIndex >= 0 && visible[selectedSuggestionIndex]
						? visible[selectedSuggestionIndex]
						: visible[0];
				input.value = target?.dataset.commandOption ?? input.value;
				highlightSuggestion(-1);
				setSuggestionsOpen(false);
				input.setSelectionRange(input.value.length, input.value.length);
				return;
			}
		}

		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			if (!suggestions?.hidden && visible.length > 0) {
				event.preventDefault();
				if (event.key === 'ArrowDown') {
					const nextIndex = (selectedSuggestionIndex + 1) % visible.length;
					highlightSuggestion(nextIndex);
				} else {
					const prevIndex = (selectedSuggestionIndex - 1 + visible.length) % visible.length;
					highlightSuggestion(prevIndex);
				}
				return;
			}

			if (history.length === 0) return;
			event.preventDefault();
			historyIndex =
				event.key === 'ArrowUp'
					? Math.max(0, historyIndex - 1)
					: Math.min(history.length, historyIndex + 1);
			input.value = history[historyIndex] ?? '';
			input.setSelectionRange(input.value.length, input.value.length);
		}
	});

	for (const button of optionButtons) {
		button.addEventListener('pointerdown', (event) => event.preventDefault());
		button.addEventListener('click', () => {
			runCommand(button.dataset.commandOption ?? '');
			input?.focus();
		});
	}

	for (const button of quickButtons) {
		button.addEventListener('click', () => {
			runCommand(button.dataset.quickCommand ?? '');
			input?.focus();
		});
	}

	window.addEventListener('keydown', (event) => {
		if (!(event.ctrlKey || event.metaKey) || event.key.toLowerCase() !== 'l') return;
		event.preventDefault();
		clearTerminal();
		announce('Terminal limpiada.');
		input?.focus();
		scrollToEnd();
	});

	runCommand('whoami');
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initTerminal);
	} else {
		initTerminal();
	}
}
