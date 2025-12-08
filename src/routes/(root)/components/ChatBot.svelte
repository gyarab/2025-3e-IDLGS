<script lang="ts">
	import { onMount } from 'svelte';
	import { aiService } from '$lib/ai';
	import markdownit from 'markdown-it';
	import { m } from '$lib/paraglide/messages';

	const mdi = markdownit();

	type Message = {
		role: 'user' | 'assistant';
		content: string;
	};

	let isOpen = false;
	let messages: Message[] = [];
	let currentMessage = '';
	let isLoading = false;
	let inputRef: HTMLTextAreaElement;
	let isMobile = false;

	const handleSubmit = async () => {
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
		} catch (err) {
			messages = [...messages, { role: 'assistant', content: `Error: ${(err as Error).message}` }];
		} finally {
			isLoading = false;
		}
	};

	const handleKeydown = (e: KeyboardEvent) => {
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
	};

	onMount(() => {
		try {
			isMobile =
				typeof window !== 'undefined' &&
				('ontouchstart' in window || window.matchMedia('(max-width: 768px)').matches);
			const onResize = () => {
				isMobile = window.matchMedia('(max-width: 768px)').matches;
			};
			window.addEventListener('resize', onResize);
			return () => window.removeEventListener('resize', onResize);
		} catch {
			// fail safe
			isMobile = false;
		}
	});

	const renderMarkdown = (md: string) => {
		try {
			return mdi.render(md ?? '');
		} catch {
			return md ? md.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
		}
	};
</script>

<div
	class="
		absolute right-2 bottom-2 z-30 max-h-1/3 max-w-1/4 rounded-lg
		bg-linear-to-tr
		from-emerald-500 to-violet-700 p-5
		hover:brightness-80 active:brightness-60
	"
>
	{#if !isOpen}
		<button
			class="h-full w-full text-3xl"
			aria-label={m.aiAssistant()}
			onclick={() => (isOpen = true)}
		>
			<i class="ri-chat-smile-ai-line"></i>
		</button>
	{:else}
		<div
			class="flex w-full flex-col gap-4"
			aria-label={m.aiAssistant()}
			role="dialog"
			tabindex="-1"
			onkeydown={(e) => {
				if (e.key != 'Escape') return;
				isOpen = false;
			}}
		>
			{#if messages.length > 0}
				<div class="flex grow flex-col gap-2 rounded-lg bg-white p-2 text-black">
					{#each messages as message, i (i)}
						<div class="flex flex-row gap-2">
							<span class="text-violet-700">
								{#if message.role === 'user'}
									<i class="ri-user-3-fill"></i>
								{:else}
									<i class="ri-robot-3-fill"></i>
								{/if}
							</span>
							{#if message.role === 'assistant'}
								<div>{@html renderMarkdown(message.content)}</div>
							{:else}
								<p>{message.content}</p>
							{/if}
						</div>
					{/each}
					{#if isLoading}
						<div>
							<span>֎</span>
							<p>Thinking...</p>
						</div>
					{/if}
				</div>
			{/if}

			<form onsubmit={handleSubmit} class="flex w-full flex-row items-center gap-2">
				<textarea
					bind:this={inputRef}
					bind:value={currentMessage}
					placeholder={m.askMeAnything()}
					onkeydown={handleKeydown}
					rows="1"
					class="grow"
				></textarea>
				<button
					type="submit"
					disabled={isLoading || !currentMessage}
					aria-label={m.sendMessage()}
					class="group text-2xl"
				>
					<i class="ri-send-plane-fill group-hover:hidden"></i>
					<i class="ri-send-plane-line not-group-hover:hidden"></i>
				</button>
				<button
					type="button"
					aria-label={m.closeAIAssistant()}
					class="group text-2xl"
					onclick={() => {
						isOpen = false;
					}}
				>
					<i class="ri-close-circle-fill group-hover:hidden"></i>
					<i class="ri-close-circle-line not-group-hover:hidden"></i>
				</button>
			</form>
		</div>
	{/if}
</div>
