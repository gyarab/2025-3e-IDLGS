<script lang="ts">
	import { aiService } from '$lib/ai';

	type Message = {
		role: 'user' | 'assistant';
		content: string;
	};

	let isOpen = false;
	let messages: Message[] = [];
	let currentMessage = '';
	let isLoading = false;

	function toggleChat() {
		isOpen = !isOpen;
	}

	async function handleSubmit() {
		if (!currentMessage.trim()) return;

		const userMessage = currentMessage.trim();
		currentMessage = '';

		messages = [...messages, { role: 'user', content: userMessage }];

		isLoading = true;
		try {
			const response = await aiService.generateResponse(userMessage);
			messages = [...messages, { role: 'assistant', content: response }];
		} catch (err: any) {
			// show the real error message in the chat and log full error
			const message = err?.message ?? String(err);
			console.error('[ChatBot] AI error:', err);
			messages = [
				...messages,
				{
					role: 'assistant',
					content: `Error: ${message}`
				}
			];
		} finally {
			isLoading = false;
		}
	}
</script>

<div class="chatbot-container" class:open={isOpen}>
	<button class="chat-toggle" on:click={toggleChat}>
		{#if isOpen}
			❌
		{:else}
			💬
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
						<p>{message.content}</p>
					</div>
				{/each}
				{#if isLoading}
					<div class="message assistant">
						<span class="avatar">🤖</span>
						<p>Thinking...</p>
					</div>
				{/if}
			</div>

			<form on:submit|preventDefault={handleSubmit} class="chat-input">
				<input
					type="text"
					bind:value={currentMessage}
					placeholder="Type your message..."
					disabled={isLoading}
				/>
				<button type="submit" disabled={isLoading || !currentMessage}> Send </button>
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
	}

	.chat-toggle {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: #007bff;
		border: none;
		color: white;
		font-size: 1.5rem;
		cursor: pointer;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		transition: transform 0.2s;
	}

	.chat-toggle:hover {
		transform: scale(1.1);
	}

	.chat-window {
		position: absolute;
		bottom: 70px;
		right: 0;
		width: 300px;
		height: 400px;
		background: white;
		border-radius: 10px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
	}

	.chat-messages {
		flex-grow: 1;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.message {
		display: flex;
		gap: 0.5rem;
		align-items: start;
		animation: fadeIn 0.3s ease-out;
	}

	.message.user {
		flex-direction: row-reverse;
	}

	.message p {
		margin: 0;
		padding: 0.5rem 1rem;
		border-radius: 1rem;
		max-width: 80%;
		word-break: break-word;
	}

	.user p {
		background: #007bff;
		color: white;
		border-bottom-right-radius: 0.2rem;
	}

	.assistant p {
		background: #f0f0f0;
		border-bottom-left-radius: 0.2rem;
	}

	.avatar {
		font-size: 1.2rem;
	}

	.chat-input {
		padding: 1rem;
		display: flex;
		gap: 0.5rem;
		border-top: 1px solid #eee;
	}

	.chat-input input {
		flex-grow: 1;
		padding: 0.5rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	.chat-input button {
		padding: 0.5rem 1rem;
		background: #007bff;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}

	.chat-input button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@keyframes fadeIn {
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
