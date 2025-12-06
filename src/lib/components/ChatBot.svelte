<script lang="ts">
	import { onMount } from 'svelte';
	import { aiService } from '$lib/ai';
	import { marked } from 'marked';
	import createDOMPurify from 'isomorphic-dompurify';

	const DOMPurify = createDOMPurify(typeof window !== 'undefined' ? (window as any) : undefined);

	let isOpen = false;
	let messages: Message[] = [];
	let currentMessage = '';
	let isLoading = false;
	let inputRef: HTMLTextAreaElement;
	let isMobile = false;

	function toggleChat() {
		isOpen = !isOpen;
		if (isOpen) setTimeout(() => inputRef?.focus(), 0);
	}

	async function handleSubmit() {
		if (!currentMessage.trim()) return;

		const userMessage = currentMessage.trim();
		currentMessage = '';
		messages = [...messages, { role: 'user', content: userMessage }];

		setTimeout(() => inputRef?.focus(), 0);
		isLoading = true;
		try {
			const response = await aiService.generateResponse(userMessage);
			// const response = await aiService.makeResponse(messages);
			messages = [...messages, { role: 'assistant', content: response }];
		} catch (err: any) {
			messages = [...messages, { role: 'assistant', content: `Error: ${err?.message ?? err}` }];
		} finally {
			isLoading = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			if (isMobile) {
				// let the textarea get the newline — don't submit
				// preventDefault is not needed, but ensure we append newline for consistency
				e.preventDefault();
				currentMessage += '\n';
				return;
			}
			// Desktop behavior: Enter = send unless modifier pressed
			e.preventDefault();
			if (e.shiftKey || e.ctrlKey) currentMessage += '\n';
			else handleSubmit();
		}
	}

	onMount(() => {
		try {
			isMobile = typeof window !== 'undefined' && ('ontouchstart' in window || window.matchMedia('(max-width: 768px)').matches);
			const onResize = () => {
				isMobile = window.matchMedia('(max-width: 768px)').matches;
			};
			window.addEventListener('resize', onResize);
			return () => window.removeEventListener('resize', onResize);
		} catch (e) {
			// fail safe
			isMobile = false;
		}
	});

	function renderMarkdown(md: string) {
		try {
			const html = marked.parse(md ?? '');
			return DOMPurify.sanitize(html);
		} catch (e) {
			// Fallback to escaped text on error
			return md ? md.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
		}
	}
</script>

<div class="chatbot-container" class:open={isOpen}>
	<button class="chat-toggle" on:click={toggleChat}>
		{#if isOpen}
			❌
		{:else}
			✨
		{/if}
	</button>

	{#if isOpen}
		<div class="chat-window">
			<div class="chat-messages">
				{#each messages as message}
					<div class="message {message.role}">
						<span class="avatar">
							{message.role === 'user' ? '👤' : '🤖'}
						</span>
						{#if message.role === 'assistant'}
							<div class="assistant-content">{@html renderMarkdown(message.content)}</div>
						{:else}
							<p>{message.content}</p>
						{/if}
					</div>
				{/each}
				{#if isLoading}
					<div class="message assistant">
						<span class="avatar">֎</span>
						<p>Thinking...</p>
					</div>
				{/if}
			</div>

			<form on:submit|preventDefault={handleSubmit} class="chat-input">
				<textarea
					bind:this={inputRef}
					bind:value={currentMessage}
					placeholder="Type your message..."
					on:keydown={handleKeydown}
					rows="1"
				></textarea>
				<button type="submit" disabled={isLoading || !currentMessage}> ➤ </button>
			</form>
		</div>
	{/if}
</div>

<style>
	.chatbot-container {
		position: fixed;
		bottom: 20px;
		right: 20px;
		z-index: 1000;
		font-family:
			-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell',
			sans-serif;
	}

	.chat-toggle {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border: none;
		color: white;
		font-size: 1.6rem;
		cursor: pointer;
		margin: 0 8px;
		box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.chat-toggle:hover {
		transform: scale(1.1);
		box-shadow: 0 8px 30px rgba(102, 126, 234, 0.6);
	}

	.chat-toggle:active {
		transform: scale(0.95);
	}

	.chat-window {
		position: absolute;
		bottom: 68px;
		right: 8px;
		width: 40vw;
		height: 60vh;
		min-height: 160px;
		min-width: 300px;
		background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
		border-radius: 16px;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}
	@media (max-width: 768px) {
		.chat-window {
			position: fixed;
			bottom: 80px;
			width: 96vw;
			right: 2%;
		}
	}

	.chat-messages {
		flex-grow: 1;
		overflow-y: auto;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
	}

	.chat-messages::-webkit-scrollbar {
		width: 6px;
	}

	.chat-messages::-webkit-scrollbar-track {
		background: transparent;
	}

	.chat-messages::-webkit-scrollbar-thumb {
		background: #ddd;
		border-radius: 3px;
	}

	.chat-messages::-webkit-scrollbar-thumb:hover {
		background: #bbb;
	}

	.message {
		display: flex;
		gap: 0.75rem;
		align-items: flex-end;
		animation: slideInMessage 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.message.user {
		flex-direction: row-reverse;
		justify-content: flex-end;
		align-self: end;
	}

	.message p {
		margin: 0;
		padding: 0.5rem 1rem;
		border-radius: 1.25rem;
		word-break: break-word;
		line-height: 1.4;
		font-size: 0.95rem;
	}

	.user p {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
		border-radius: 1.25rem 0.25rem 1.25rem 1.25rem;
	}

	.assistant p {
		background: #e8eef7;
		color: #333;
		border-radius: 0.25rem 1.25rem 1.25rem 1.25rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.avatar {
		font-size: 1.4rem;
		flex-shrink: 0;
	}

	.chat-input {
		padding: 1rem;
		display: flex;
		gap: 0.75rem;
		border-top: 1px solid #e5e7eb;
		background: #fff;
		border-bottom-left-radius: 16px;
		border-bottom-right-radius: 16px;
	}

	.chat-input textarea {
		flex-grow: 1;
		padding: 0.5rem 1rem;
		border: 1px solid #e5e7eb;
		border-radius: 1.5rem;
		font-size: 0.95rem;
		transition: all 0.2s;
		font-family: inherit;
		resize: none;
		max-height: 120px;
		overflow-y: auto;
	}

	.chat-input textarea:focus {
		outline: none;
		border-color: #667eea;
		box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
	}

	.chat-input textarea::placeholder {
		color: #999;
	}

	/* Rendered markdown container for assistant messages */
	.assistant .assistant-content,
	.message .assistant-content {
		padding: 0.5rem 1rem;
		background: #e8eef7;
		color: #333;
		border-radius: 0.25rem 1.25rem 1.25rem 1.25rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		overflow: auto;
	}

	/* Table styling inside messages */
	.assistant .assistant-content table,
	.message .assistant-content table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 0.25rem;
		margin-bottom: 0.25rem;
	}

	.assistant .assistant-content th,
	.message .assistant-content th {
		background: #dfe9f3;
		padding: 0.35rem 0.5rem;
		text-align: left;
		border: 1px solid #cfdde9;
	}

	.assistant .assistant-content td,
	.message .assistant-content td {
		padding: 0.35rem 0.5rem;
		border: 1px solid #e6eef6;
	}

	/* Code blocks */
	.assistant .assistant-content pre,
	.message .assistant-content pre {
		background: #0f1722;
		color: #e6eef6;
		padding: 0.75rem;
		border-radius: 8px;
		overflow: auto;
		font-family:
			ui-monospace, SFMono-Regular, Menlo, Monaco, 'Roboto Mono', 'Courier New', monospace;
		font-size: 0.85rem;
	}

	.assistant .assistant-content code,
	.message .assistant-content code {
		background: rgba(0, 0, 0, 0.04);
		padding: 0.15rem 0.3rem;
		border-radius: 4px;
	}

	.chat-input button {
		padding: 0.75rem 1.25rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		border-radius: 1.5rem;
		cursor: pointer;
		font-weight: 600;
		font-size: 0.9rem;
		transition: all 0.2s;
		box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
	}

	.chat-input button:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
	}

	.chat-input button:active:not(:disabled) {
		transform: translateY(0);
	}

	.chat-input button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes slideInMessage {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
