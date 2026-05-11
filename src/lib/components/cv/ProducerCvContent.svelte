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
	Executive Producer and Video Director with over 15 years across London, New York, and
	California, producing television, documentary, digital, and advertising work. I lead teams and
	oversee videos from development through delivery, partnering with creatives during ideation and
	keeping production focused, on-message, and on-budget.
</p>

<h2>What I Bring</h2>
<ul>
	<li>
		A deep production network — long-standing relationships with crews, vendors, and post houses
		across the US and UK.
	</li>
	<li>
		Servant-leadership style that motivates multidisciplinary teams and builds trust under
		pressure.
	</li>
	<li>
		Creative problem-solving in complex scenarios, with the consensus-building needed to land
		the best possible work.
	</li>
	<li>
		Range across commercial television, digital video, motion-graphics, and post-production.
	</li>
</ul>

<hr />

<h2 id="iris-worldwide">
	Senior Integrated Producer @
	<a href={companyLinks['Iris Worldwide']} target="_blank" rel="noreferrer">Iris Worldwide</a>
	<span class="text-neutral-400">| 2026 - Present</span>
</h2>
<p>
	Lead producer on TV-first and social campaigns for Iris's healthcare portfolio in London.
	Brief-to-delivery ownership across creative, strategy, finance, and client teams.
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
	Embedded producer on the Kenvue account, delivering integrated campaigns across a multi-brand
	consumer-health portfolio. Managed concurrent productions and a roster of external partners
	while balancing brand-team approvals across markets.
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
	Content Development Producer who built marketing and communications campaigns for major brands.
	Owned briefs, pitches, and deck development.
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
	Advertising Producer and Post Producer who executed video campaigns. Managed external vendors
	and liaised with business leads, creatives, strategists, finance, and clients. Directed and
	produced video series, maintaining high creative and production quality across all projects.
	Established and communicated processes that supported production success and the team's
	strategic vision.
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong>
	<ResumeClientList clients={omnicomStudiosClients} clientLinks={clientSectionLinksByName} />
</p>

<h2 id="freelance-2023">Video Producer/Director @ Freelance <span class="text-neutral-400">| 2023</span></h2>
<p>
	Video Producer and Director working in marketing, communications, and advertising. Wrote,
	directed, produced, and post-produced high-quality content for brands. Specialized in
	corporate storytelling and documentary-style production.
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
	Agency EP who produced social, broadcast, interactive, and earned-media assets for media
	campaigns, internal communications, and other outputs. Sourced and managed external vendors,
	and liaised with account teams and client contacts. Directed and produced video series,
	maintaining high creative and production quality across all projects.
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
	Owned award-winning digital series and branded content from pitch through delivery — pitching
	brand partners, directing on set, and shaping story in post. Cynopsis Short Form Video Festival
	Award winner for <em>Man Crafted</em> (Food Network &amp; McCormick).
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong>
	<ResumeClientList clients={spacestationClients} clientLinks={clientSectionLinksByName} />
</p>

<h2 id="tv-field-producer">TV Field Producer @ Freelance <span class="text-neutral-400">| 2009 - 2016</span></h2>
<p>
	Field-produced unscripted television for cable networks across reality, competition,
	documentary, and lifestyle formats. Ran casting, locations, talent, and crew on set; cut against
	network notes and tight delivery windows. Includes Tribeca Spotlight Documentary
	<em>The Year of the Scab</em> (ESPN 30 for 30) and Emmy-winning <em>The Singles Project</em> (Bravo).
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
<p class="text-sm text-neutral-400">
	Festival Producer, Rendez-Vous with French Cinema at Lincoln Center (UniFrance USA, 2008-2010);
	On-Air Strategic &amp; Media Planning (Nickelodeon/Viacom, 2010); Associate Producer/French
	Fixer, <em>Blood, Sweat and Gears</em> (Sundance Channel, 2008); Entertainment Editor
	(Screenrush.co.uk &amp; Allocin&eacute;.fr, 2008); earlier roles at Shakespeare Theatre of New
	Jersey and Harper's Bazaar.
</p>

<hr />

<h2>Awards</h2>
<ul>
	<li>
		Emmy Award, Outstanding Creative Achievement in Interactive Media Multiplatform Storytelling
		(2015) — <em>The Singles Project</em>, Bravo
	</li>
	<li>
		Tribeca Film Festival, Spotlight Documentary (2017) — <em>The Year of the Scab</em>, ESPN 30
		for 30
	</li>
	<li>
		Cynopsis Short Form Video Festival Award (2018) — <em>Man Crafted</em> by Food Network &amp;
		McCormick
	</li>
	<li>
		New York Innovative Theatre Award nomination, Best Original Production (2016) —
		<em>Steel Birds</em> (director, EstroGenius Theatre Festival)
	</li>
</ul>

<h2>Education</h2>
<p>
	Drew University, American University of Paris<br />
	BA Philosophy, BA French<br />
	Honors: <em>summa cum laude</em>, Phi Beta Kappa Society, National French Honor Society<br />
	Languages: French (fluent); German and Italian (conversational)
</p>
