<script lang="ts">
	import ResumeClientList from '$lib/components/ResumeClientList.svelte';
	import { clientSectionLinksByName } from '$lib/data/clients';

	const companyLinks: Record<string, string> = {
		'Iris Worldwide': 'https://www.iris-worldwide.com/',
		'Omnicom Production': 'https://www.omnicomproduction.com/',
		Parable: 'https://parableworks.com/',
		'Omnicom Studios': 'https://www.omnicomproduction.com/',
		Edelman: 'https://www.edelman.com/',
		'Brit + Co': 'https://www.brit.co/',
		Spacestation: 'https://www.spacestation.com/',
		'A&E Networks': 'https://www.aenetworks.com/'
	};

	const irisClients = ['Alcon', 'Bayer', 'Convatech'];
	const omnicomProductionClients = ['Nicorette', 'OGX', 'Benylin', 'Sudafed', 'Calpol'];
	const parableClients = ['Equinix', 'Cewe', 'Afreximbank', 'Kingfisher Beer', 'Spire'];
	const omnicomStudiosClients = [
		'Energy Upgrade California',
		'Car Gurus',
		'Expedia',
		'BMW',
		'Blue Moon',
		'Cheetos'
	];
	const freelanceClients = [
		'Cruise',
		'REDF',
		'Glass & Marker',
		'Ernst & Young',
		'The Big Picture',
		"Founder's Fund"
	];
	const edelmanClients = [
		'Gordon & Betty Moore Foundation',
		'Wu Tsai Human Performance Alliance',
		'Sacramento Department of Behavioral Health',
		'Hologic',
		'Gold Bond',
		'Getaround',
		'AbbVie',
		'Genentech',
		'Jazz Pharmaceuticals',
		'Allegra',
		'eBay',
		'Scholastic',
		'PayPal',
		'Eli Lilly',
		'Dolby',
		'Microsoft',
		'Taco Bell & TB Foundation',
		'Adobe',
		'DuPont',
		'Starbucks'
	];
	const spacestationClients = [
		'Bravo',
		'Craftsy / Bluprint',
		'Dremel',
		'3Doodler',
		'NBC / Today Show',
		"Bob's Red Mill",
		'Food Network',
		'Genius Kitchen',
		'BBC America',
		'IFC',
		'Lipton',
		'McCormick'
	];
</script>

<h2>Background</h2>
<p>
	Executive Producer and Video Director with over 15 years of experience in London, New York, and
	California. I've produced and directed content for television, documentaries, digital media,
	and advertising and marketing campaigns, guiding clients and creative teams through the
	development and execution of high-impact videos that advance their goals.
</p>
<p>
	I lead teams and oversee videos from development through production and delivery. I establish
	clear communication channels across stakeholders and teams to keep production supportive and
	efficient.
</p>

<h2>Skills &amp; Experience</h2>
<ul>
	<li>
		Over 15 years producing at major advertising agencies, PR agencies, and commercial production
		companies, across commercial television, digital video, and motion-graphics production and
		post-production.
	</li>
	<li>
		Partner with creative teams during ideation to support each account's strategic and
		production goals; lead production through all phases on-message and on-budget.
	</li>
	<li>
		Maintain relationships across the production community and deep knowledge of resources,
		crews, and vendors.
	</li>
	<li>
		Lead multidisciplinary teams through a servant-leadership approach that builds trust and
		motivation, and solve creative problems in complex scenarios with the consensus-building
		needed to drive the best possible work.
	</li>
</ul>

<hr />

<h2 id="iris-worldwide">
	Senior Integrated Producer @
	<a href={companyLinks['Iris Worldwide']} target="_blank" rel="noreferrer">Iris Worldwide</a>
	<span class="text-neutral-400">| 2026 - Present</span>
</h2>
<p>
	Lead producer across Iris London's healthcare accounts. Digital OOH, TVC and social-first
	campaigns.
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong>
	<ResumeClientList clients={irisClients} clientLinks={clientSectionLinksByName} />
</p>

<h2 id="omnicom-production">
	Senior Integrated Producer @
	<a href={companyLinks['Omnicom Production']} target="_blank" rel="noreferrer">Omnicom Production</a>
	<span class="text-neutral-400">| 2025 - 2026</span>
</h2>
<p>
	Producer on Kenvue's multi-brand consumer-health account — TV-first and social-media campaigns
	across the brand portfolio.
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong>
	<ResumeClientList clients={omnicomProductionClients} clientLinks={clientSectionLinksByName} />
</p>

<h2 id="parable">
	Executive Producer @ <a href={companyLinks.Parable} target="_blank" rel="noreferrer">Parable</a>
	<span class="text-neutral-400">| 2025</span>
</h2>
<p>
	Content development producer building marketing and communications campaigns for major brands —
	owned briefs, pitches, and deck development.
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong>
	<ResumeClientList clients={parableClients} clientLinks={clientSectionLinksByName} />
</p>

<h2 id="omnicom-studios">
	Executive Producer @
	<a href={companyLinks['Omnicom Studios']} target="_blank" rel="noreferrer">Omnicom Studios</a>
	<span class="text-neutral-400">| 2024</span>
</h2>
<p>
	Advertising producer and post producer on the Studios slate — directed and produced video
	series and stood up the processes that kept the team's output predictable.
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong>
	<ResumeClientList clients={omnicomStudiosClients} clientLinks={clientSectionLinksByName} />
</p>

<h2 id="freelance-2023">Video Producer/Director @ Freelance <span class="text-neutral-400">| 2023</span></h2>
<p>
	Video producer and director for brand marketing and communications — wrote, directed, and
	post-produced. Specialized in corporate storytelling and documentary-style work.
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong>
	<ResumeClientList clients={freelanceClients} clientLinks={clientSectionLinksByName} />
</p>

<h2 id="edelman">
	Executive Producer @ <a href={companyLinks.Edelman} target="_blank" rel="noreferrer">Edelman</a>
	<span class="text-neutral-400">| 2019 - 2022</span>
</h2>
<p>
	Agency EP producing social, broadcast, interactive, and earned-media work for brand and
	corporate communications. Directed and produced ongoing video series across the agency's
	account roster.
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong>
	<ResumeClientList clients={edelmanClients} clientLinks={clientSectionLinksByName} />
</p>

<h2>
	Senior Producer/Director @
	<a href={companyLinks['Brit + Co']} target="_blank" rel="noreferrer">Brit + Co</a>
	<span class="text-neutral-400">| 2018 - 2019</span>
</h2>
<p>
	Produced and directed video content for the Brit + Co brand across branded and social
	platforms, including the <em>BUILD Brunch with Brit</em> series. Owned idea generation,
	pitching, development, scriptwriting, production oversight, and post-production for multiple
	short-form series focused on educating and inspiring creative, millennial women.
</p>

<h2 id="spacestation">
	Senior Producer &amp; Director @
	<a href={companyLinks.Spacestation} target="_blank" rel="noreferrer">Spacestation</a>
	<span class="text-neutral-400">| 2016 - 2018</span>
</h2>
<p>
	Award-winning digital series and branded content for the brand-publishing slate — wrote and
	directed across short-form formats from pitch through delivery.
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong>
	<ResumeClientList clients={spacestationClients} clientLinks={clientSectionLinksByName} />
</p>

<h2 id="tv-field-producer">TV Field Producer @ Freelance <span class="text-neutral-400">| 2009 - 2016</span></h2>
<p>
	Field-produced award-winning unscripted television for cable networks across reality,
	competition, documentary, and lifestyle formats.
</p>
<p class="text-sm text-neutral-400">
	<strong>Series / Networks:</strong> Car Hunters (History Channel), Island Life (HGTV), Beat Bobby
	Flay (Food Network), The Singles Project (Bravo), Find My First Love (FYI), The Fall of '87
	(ESPN 30 for 30), Buying Naked (TLC), The Tim Ferriss Experiment (Turner), Secret Wedding (TLC),
	Monsters Inside Me (Animal Planet), Deadly Ambition (Biography), Comedy Central Presents: 15
	(Comedy Central)
</p>

<h2>
	Programming &amp; Development Coordinator @
	<a href={companyLinks['A&E Networks']} target="_blank" rel="noreferrer">A&amp;E Networks</a>
	<span class="text-neutral-400">| 2010 - 2012</span>
</h2>
<p class="text-sm text-neutral-400">
	<strong>Series:</strong> Dance Moms, Abby's Ultimate Dance Competition, America's Most Wanted,
	America's Supernanny, 24 Hour Catwalk, Russian Dolls, Roseanne's Nuts, Vanished with Beth
	Holloway, Hef's Runaway Bride, Coming Home
</p>

<h3>Earlier Roles</h3>
<ul>
	<li>On-Air Strategic &amp; Media Planning @ Nickelodeon/Viacom (2010)</li>
	<li>Festival Producer, Rendez-Vous with French Cinema at Lincoln Center @ UniFrance USA (2008-2010)</li>
	<li>Entertainment Editor @ Screenrush.co.uk &amp; Allocin&eacute;.fr (2008)</li>
	<li>
		Associate Producer/French Fixer, <em>Blood, Sweat and Gears: Racing Clean to the Tour de
		France</em> @ Sundance Channel (2008)
	</li>
	<li>Assistant to the Artistic Director @ Shakespeare Theatre of New Jersey (2006-2009)</li>
	<li>Fashion Editorials Assistant @ Harper's Bazaar (2004-2005)</li>
</ul>

<hr />

<h2>Awards</h2>
<ul>
	<li>
		Cynopsis Short Form Video Festival Award (2018) — <em>Man Crafted</em> by Food Network &amp;
		McCormick
	</li>
	<li>
		Tribeca Film Festival - Spotlight Documentary (2017) — <em>The Year of the Scab</em>, ESPN 30
		for 30
	</li>
	<li>
		New York Innovative Theatre Award - Nominated, Best Original Production (2016) —
		<em>Steel Birds</em> (director, EstroGenius Theatre Festival)
	</li>
	<li>
		Emmy Award Outstanding Creative Achievement in Interactive Media Multiplatform Storytelling
		(2015) — <em>The Singles Project</em>, Bravo
	</li>
</ul>

<h2>Education</h2>
<p>
	Drew University, American University of Paris<br />
	BA Philosophy, BA French<br />
	Honors: <em>summa cum laude</em>, Phi Beta Kappa Society, National French Honor Society<br />
	Languages: French (fluent); German and Italian (conversational)
</p>
