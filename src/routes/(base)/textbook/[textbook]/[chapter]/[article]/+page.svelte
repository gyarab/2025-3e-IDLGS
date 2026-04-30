<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Sidebar from './ui/Sidebar.svelte';
	import CommandPalette from './ui/CommandPalette.svelte';
	import Background from './ui/components/Background.svelte';
	import { browser } from '$app/environment';
	import ReadBox from './ui/ReadBox.svelte';
	import EditBox from './ui/EditBox.svelte';
	import FeedbackForm from './ui/FeedbackForm.svelte';
	import SideBox from './ui/SideBox.svelte';
	import InteractiveExerciseBox from './ui/InteractiveExerciseBox.svelte';
	import ArticleNavbox from './ui/ArticleNavbox.svelte';

	let {
		data,
	}: {
		data: {
			color: string;
			darkMode: boolean;
			navbarOpen: boolean;
			sidebarOpen: boolean;
		};
	} = $props();

	let darkMode = $derived(data.darkMode);
	let color = $derived(data.color);

	let commandPaletteOpen = $state(false);
	let sidebarOpen = $derived(data.sidebarOpen);
	let focusMode = $state(false);

	let windowScroll = $state(0);
	const updateWindowScroll = () => {
		windowScroll = window.scrollY;
	};

	let documentHeight = $state(1);
	const updateDocumentHeight = () => {
		documentHeight = document.documentElement.scrollHeight;
	};

	let percentArticleRead = $derived.by(() => {
		if (browser) {
			return (windowScroll / (documentHeight - window.innerHeight)) * 100;
		} else return 0;
	});

	//TODO finish, make editable (remappable)
	const keyboardHandler = (e: KeyboardEvent) => {
		//Ctrl+K or Cmd+K to open command palette
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			commandPaletteOpen = !commandPaletteOpen;
		}
		//F for focus mode (hide navbar and sidebar)
		else if (e.key === 'f') {
			e.preventDefault();
			focusMode = !focusMode;

			sidebarOpen = focusMode;
			commandPaletteOpen = focusMode;
		}
		//go to top with u
		else if (e.key === 'u') {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		} else {
		}
	};

	onMount(() => {
		if (browser) {
			addEventListener('scroll', updateWindowScroll);
			addEventListener('resize', updateDocumentHeight);
			addEventListener('keydown', keyboardHandler);

			updateWindowScroll();
			updateDocumentHeight();
		}
	});
	onDestroy(() => {
		if (browser) {
			removeEventListener('scroll', updateWindowScroll);
			removeEventListener('resize', updateDocumentHeight);
			removeEventListener('keydown', keyboardHandler);
		}
	});
</script>

<Sidebar
	bind:darkMode
	accentColor={data.color}
	bind:commandPaletteOpen
	bind:open={sidebarOpen}
/>

<div
	class="relative mt-4 mb-4 flex min-h-screen w-screen grow flex-col items-center gap-4 overflow-x-hidden overflow-y-scroll **:z-5"
>
	{#key percentArticleRead}
		<Background
			accentColor={data.color}
			percentRead={percentArticleRead}
			{darkMode}
		/>
	{/key}

	<EditBox
		{darkMode}
		color={data.color}
		isEditor={true}
		lastEditedDate={new Date()}
		lastEditor={{
			name: 'Ali',
			surname: 'Yunussov',
			middlename: 'programator!',
			degree: 'dr inż.',
			institution: 'AGH',
			profilePicture: "",
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			registeredAt: new Date(),
			lastSeenAt: new Date(),
			email: 'alyun@agh.pl',
			uuid: '123e4567-e89b-12d3-a456-426614174000',
			r: 128,
			g: 128,
			b: 128,
		}}
	/>

	<ReadBox>
		aaa Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias nisi
		aperiam, obcaecati, dolores vitae libero ducimus quos laudantium
		exercitationem enim voluptatibus, officia dolore rerum consequatur
		similique? Odit hic cupiditate repellendus. Spojrzyj, Marylo, gdzie się
		kończą gaje: W prawo łóz gęsty zarostek, W lewo się piękna dolina
		podaje, Przodem rzeczułka i mostek. Tuż stara cerkiew; w niej puszczyk i
		sowy, Obok dzwonnicy zrąb zgniły, A za dzwonnicą chróśniak malinowy, A w
		tym chróśniaku mogiły. Czy tam bies siedział, czy dusza zaklęta, Że o
		północnej godzinie, Nikt, jak najstarszy człowiek zapamięta, Miejsc tych
		bez trwogi nie minie. Bo skoro północ nawlecze zasłony, Cerkiew się z
		trzaskiem odmyka, W pustej zrąbnicy dzwonią same dzwony, W chróstach coś
		huczy i ksyka. Czasami płomyk okaże się blady, Czasem grom trzaska po
		gromie, Same się z mogił ruszają pokłady, I larwy stają widomie. Raz
		trup po drodze bez głowy się toczy, To znowu głowa bez ciała, Roztwiera
		gębę i wytrzeszcza oczy, W gębie i w oczach żar pała. Albo wilk bieży:
		pragniesz go odegnać, Aż orlem skrzydłem wilk macha… Dość «zgiń,
		przepadnij!» wyrzec i przeżegnać, Wilk zniknie wrzeszcząc: cha, cha,
		cha! Każdy podróżny oglądał te zgrozy, I każdy musiał kląć drogę; Ten
		złamał dyszel, ten wywrócił wozy, Innemu zwichnął koń nogę. Ja, chociaż
		pomnę, nieraz Andrzej stary Zaklinał, nieraz przestrzegał: Śmiałem się z
		djabłów, nie wierzyłem w czary, Tamtędym jeździł i biegał. Raz, gdy do
		Ruty jadę w czas noclegu, Na moście z końmi wóz staje; Próżno woźnica
		przynagla do biegu, Hej! krzyczy, biczem zadaje. Stoją, a potem skoczą z
		całej mocy, Dyszel przy samej pękł szrubie; Zostać na polu, samemu i w
		nocy, To lubię, rzekłem, to lubię! Ledwiem dokończył, aż straszna
		martwica Wypływa z blizkich wód toni; Białe jej szaty, jak śnieg białe
		lica, Ognisty wieniec na skroni. Chciałem uciekać, padłem zalękniony,
		Włos dębem stanął na głowie; Krzyknę: niech będzie Chrystus pochwalony:
		«Na wieki wieków» odpowie. «Ktokolwiek jesteś poczciwy człowieku, Coś
		mię zachował od męki, Dożyj ty szczęścia i późnego wieku, I pokój tobie
		i dzięki.» «Widzisz przed sobą obraz grzesznej duszy, — Wkrótce się
		niebem pochlubię; Boś ty czyścowej zbawił mię katuszy Tem jednem
		słówkiem: To lubię. «Dopóki gwiazdy zejdą i dopóki We wsi kur pierwszy
		zapieje, Opowiem tobie, a ty dla nauki Opowiedz innym me dzieje. «Onego
		czasu żyłam ja na świecie, Marylą zwana przed laty; Ojciec mój, pierwszy
		urzędnik w powiecie, Możny, poczciwy, bogaty. «Za życia pragnął sprawić
		mi wesele; A żem dostatnia i młoda, Zbiegło się zewsząd zalotników
		wiele, Posag wabił i uroda. «Mnóztwo ich marnej pochlebiało dumie, I to
		mi było do smaku, Że kiedy w licznym kłaniano się tłumie, Tłumem
		gardziłam bez braku. «Przybył i Józio; dwudziestą miał wiosnę, Młody,
		cnotliwy, nieśmiały: Obce dla niego wyrazy miłosne, Choć czuł miłosne
		zapały.
	</ReadBox>

	<!-- TODO-->
	<SideBox />

	<InteractiveExerciseBox
		{darkMode}
		color={data.color}
	/>

	<FeedbackForm
		{darkMode}
		color={data.color}
	/>

	<ArticleNavbox
		{darkMode}
		color={data.color}
	/>

	<CommandPalette
		bind:open={commandPaletteOpen}
		{darkMode}
		{color}
	/>
</div>
