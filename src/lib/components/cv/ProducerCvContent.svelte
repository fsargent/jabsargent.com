<script lang="ts">
	import ResumeClientList from '$lib/components/ResumeClientList.svelte';
	import { clientSectionLinksByName } from '$lib/data/clients';

	const companyLinks: Record<string, string> = {
		'Omnicom Studios': 'https://www.omnicomproduction.com/',
		Edelman: 'https://www.edelman.com/',
		'Brit + Co': 'https://www.brit.co/',
		Spacestation: 'https://www.spacestation.com/',
		'A&E Networks': 'https://www.aenetworks.com/'
	};

	const omnicomClients = ['Energy Upgrade California', 'Car Gurus', 'Expedia', 'BMW', 'Blue Moon'];
	const freelanceClients = ['Cruise', 'REDF', 'Glass & Marker', 'Ernst & Young', 'The Big Picture', "Founder's Fun"];
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
	As an Executive Producer and Video Director with over 15 years of experience in New York and
	California, I've produced and directed content for television, documentaries, digital media,
	as well as advertising and marketing campaigns. I have guided numerous clients and creative
	teams throughout the development and execution of best-in-class videos in support of their
	goals.
</p>
<p>
	I have been responsible for leading teams and overseeing videos from development through
	production and final delivery. I enjoy establishing clear pathways and channels of
	communication across multiple stakeholders and teams to create a supportive and functional
	production process.
</p>

<h2>Skills & Experience</h2>
<ul>
	<li>
		Over 15 years of experience as a producer at major advertising and PR agencies and
		commercial production companies.
	</li>
	<li>
		Experience with commercial television, digital, and video and motion graphics production
		and post-production.
	</li>
	<li>
		Establish mutual partnership with creative teams during ideation, to support the
		accounts' strategic and production goals.
	</li>
	<li>
		Lead production through all phases, ensuring projects exceed expectations, deliver on
		message and within budget.
	</li>
	<li>
		Maintain relationships and in-depth knowledge of the production community, resources,
		crew, and vendors.
	</li>
	<li>
		Motivate multidisciplinary teams and build relationships based on a natural leadership
		style and servant-leadership philosophy.
	</li>
	<li>
		Creative problem solver who thrives in complex scenarios. Ability to find consensus to
		create the best work possible.
	</li>
</ul>

<hr />

<h2 id="omnicom-studios">
	Executive Producer @
	<a href={companyLinks['Omnicom Studios']} target="_blank" rel="noreferrer">Omnicom Studios</a>
	<span class="text-neutral-400">| 2023 - Present</span>
</h2>
<p>
	Advertising Producer responsible for executing TV first and social media video campaigns.
	Source and manage external vendors, and liaise with business leads, creatives, strategists,
	finance and clients. Direct and produce video series and maintain a high level of creative
	and quality across all projects. Establish and communicate processes for successful
	production and strategic vision.
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong> <ResumeClientList clients={omnicomClients} clientLinks={clientSectionLinksByName} />
</p>

<h2 id="freelance-2023">
	Video Content Consultant/Video Director @ Freelance <span class="text-neutral-400">| 2023</span>
</h2>
<p>
	Video Producer and Director working in marketing, communications and advertising. Writing,
	Directing, Producing and Post Producing high quality content for brands. Specializing in
	corporate storytelling and documentary-style production.
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong>
	<ResumeClientList clients={freelanceClients} clientLinks={clientSectionLinksByName} />
</p>

<h2 id="edelman">
	Executive Producer @
	<a href={companyLinks.Edelman} target="_blank" rel="noreferrer">Edelman</a>
	<span class="text-neutral-400">| 2019 - 2022</span>
</h2>
<p>
	Agency EP responsible for executing social, broadcast, interactive, and earned media assets
	for media campaigns, internal communications, and other outputs. Source and manage external
	vendors, and liaise with account teams and client contacts. Direct and produce video series
	and maintain a high level of creative and quality across all projects.
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong> <ResumeClientList clients={edelmanClients} clientLinks={clientSectionLinksByName} />
</p>

<h2>
	Senior Producer/Director @
	<a href={companyLinks['Brit + Co']} target="_blank" rel="noreferrer">Brit + Co</a>
	<span class="text-neutral-400">| 2018 - 2019</span>
</h2>
<p>
	Produce and direct video content across the Brit + Co brand, including branded and social
	platforms and the BUILD Brunch with Brit series. Responsible for idea generation, pitching,
	development, script writing, production oversight and post production for multiple short-form
	series focused on educating and inspiring creative, millennial women.
</p>

<h2 id="spacestation">
	Senior Digital Media Director/Producer @
	<a href={companyLinks.Spacestation} target="_blank" rel="noreferrer">Spacestation</a>
	<span class="text-neutral-400">| 2016 - 2018</span>
</h2>
<p>
	Responsible for overseeing award-winning digital series and branded media content from client
	bid through finished project. Write scripts, outlines, breakdowns, and hotsheets, oversee
	production schedules and budgets, build production crews, cast and prep talent, manage crews,
	direct talent and crew on set, oversee post production and story, write voice over, book and
	handle editors, colorists and audio mixers, as well as manage client expectations and
	deadlines throughout project.
</p>
<p class="text-sm text-neutral-400">
	<strong>Clients:</strong>
	<ResumeClientList clients={spacestationClients} clientLinks={clientSectionLinksByName} />
</p>

<h2 id="tv-field-producer">TV Field Producer @ Freelance <span class="text-neutral-400">| 2009 - 2016</span></h2>
<p>
	Produce award-winning unscripted television series from development through finished
	project. Write scripts, outlines, breakdowns, and hotsheets, oversee production schedules
	and budgets, build out production crews, run casting and prep talent, scout and book
	locations, manage teams, direct talent and crew on set, manage post-production, write
	voice-over and graphics copy, and execute against network notes and deadlines throughout the
	project.
</p>
<p class="text-sm text-neutral-400">
	<strong>Series / Networks:</strong> Buying Naked (TLC), The Tim Ferriss Experiment (Turner),
	Secret Wedding (TLC), Monsters Inside Me (Animal Planet), Deadly Ambition (Biography),
	Comedy Central Presents:15 (Comedy Central), Car Hunters (History Channel), Island Life
	(HGTV), Beat Bobby Flay (Food Network), The Singles Project (Bravo), Find My First Love
	(FYI), The Fall of '87 (ESPN 30 for 30)
</p>

<h2>
	Programming & Development @
	<a href={companyLinks['A&E Networks']} target="_blank" rel="noreferrer">A&E Networks</a>
	<span class="text-neutral-400">| 2010 - 2012</span>
</h2>
<p class="text-sm text-neutral-400">
	<strong>Series:</strong> Russian Doll's, Roseanne's Nuts, Vanished with Beth Holloway, Hef's
	Runaway Bride and Coming Home, Dance Moms, Abby's Ultimate Dance Competition, America's
	Most Wanted, America's Supernanny, 24 Hour Catwalk
</p>

<h3>Earlier Roles</h3>
<ul>
	<li>On-Air Strategic & Media Planning @ Nickelodeon/Viacom (2010)</li>
	<li>Entertainment Editor @ Screenrush.co.uk & Allocin&eacute;.fr (2008)</li>
	<li>
		Director, <em>Steel Birds</em>, based on Chekhov's Three Sisters @ EstroGenius Theatre
		Festival (2016)
	</li>
	<li>
		Festival Producer, Rendez-Vous with French Cinema at Lincoln Center @ UniFrance USA
		(2008-2010)
	</li>
	<li>
		Associate Producer/French Fixer, <em>Blood, Sweat and Gears: Racing Clean to the Tour
		de France</em> @ Sundance Channel (2008)
	</li>
	<li>Assistant to the Artistic Director @ Shakespeare Theatre of New Jersey (2006-2009)</li>
	<li>Fashion Editorials Assistant @ Harper's Bazaar (2004-2005)</li>
</ul>

<hr />

<h2>Education</h2>
<p>
	Drew University, American University of Paris<br />
	BA Philosophy, BA French<br />
	<em>Honors: Summa Cum Laude, Phi Beta Kappa Society & National French Honor Society</em><br />
	Languages: Fluent French, Conversational German/Italian
</p>

<h2>Awards</h2>
<ul>
	<li>
		Cynopsis Short Form Video Festival Award (2018) — <em>Man Crafted</em> by Food Network &
		McCormick
	</li>
	<li>
		Tribeca Film Festival - Spotlight Documentary (2017) — <em>The Year of the Scab</em>,
		ESPN 30 for 30
	</li>
	<li>
		New York Innovative Theatre Award - Nominated, Best Original Production (2016) —
		<em>Steel Birds</em>
	</li>
	<li>
		Emmy Award Outstanding Creative Achievement in Interactive Media Multiplatform
		Storytelling (2015) — <em>The Singles Project</em>, Bravo
	</li>
</ul>
