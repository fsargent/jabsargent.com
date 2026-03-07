export type VideoSource = "vimeo" | "youtube";

export interface Video {
	source: VideoSource;
	id: string;
	title?: string;
}

export interface Category {
	slug: string;
	title: string;
	description: string;
	videos: Video[];
}

function v(id: string, title?: string): Video {
	return { source: "vimeo", id, title };
}

function yt(id: string, title?: string): Video {
	return { source: "youtube", id, title };
}

export const categories: Category[] = [
	{
		slug: "commercial-video",
		title: "Commercial Video",
		description:
			"I'm bringing my experience in television, film, documentary and branded content to the agency side. As a Creative Agency Producer I still write, direct and produce killer videos for various brands and I have the opportunity to craft stories from the internal messaging all the way to the campaign level. Plus I get to partner with world-class production partners, clients and agency creatives.",
		videos: [
			v("1152864867"),
			v("1152866104"),
			v("1033195945"),
			v("548145222"),
			v("1152873313"),
			v("1152864162"),
			v("1152863798"),
			v("1033219032"),
			v("1152863763"),
			v("1033195256"),
			v("782650321"),
			v("578584834"),
			v("578584641"),
			v("663436726"),
			v("578585924"),
			v("744667202"),
			v("663436946"),
			v("663437144"),
			v("663437069"),
			v("663436816"),
			v("399326469"),
			v("555295542"),
			v("384850418"),
			v("710511066"),
			v("384850346"),
			v("384843595"),
			v("384850372"),
			v("384850382"),
			v("384850398"),
			v("384850360"),
			v("384843611"),
			v("399330051"),
			v("384843762"),
			v("384843696"),
			v("384843725"),
			v("384843654"),
			v("384843680"),
			v("498172063"),
			v("384843630"),
			yt("DN7cBMZXvVM"),
		],
	},
	{
		slug: "social-media",
		title: "Social Media",
		description:
			"You know you love to watch them. Those fun, quick-cut videos that capture your attention on your mobile device while you're waiting for the train to arrive. Well they're not as simple as they seem. There's an art to making them and to making them pop.",
		videos: [
			v("1033196070"),
			v("1152863881"),
			v("1033219032"),
			v("1152863812"),
			v("282565542"),
			v("1033195769"),
			v("757761340"),
			v("776827346"),
			v("776825788"),
			v("284531280"),
			v("284563966"),
			v("284540458"),
			v("311940127"),
			v("284531241"),
		],
	},
	{
		slug: "interactive-experiences",
		title: "Agency - Interactive Experience",
		description: `I'm bringing my experience in television, film, documentary and branded content to the agency side. As an Integrated Producer I manage print campaigns, contests, "surprise and delight" campaigns, websites, mailers and media kits and events for various brands.`,
		videos: [
			v("384843778"),
			v("554996995"),
			v("669577968"),
			v("669577986"),
			v("757761340"),
		],
	},
	{
		slug: "non-profit",
		title: "Non-Profit",
		description:
			"Every brand tells a story and that is no truer than for the non-profit organizations out there doing the good work. I love to use my storytelling skills to help spread the word about amazing organizations that are helping to make the world a better place.",
		videos: [
			v("854446906"),
			v("1033195256"),
			v("578585924"),
			v("578584834"),
			v("710510996"),
			v("744667202"),
			v("744664534"),
			v("744664758"),
		],
	},
	{
		slug: "entertainment",
		title: "Entertainment",
		description:
			"I have a passion for all things silver screen. I love to make TV, talk about it, read about it, write about it and watch it! I grew up watching films and series and analyzing everything from the glaring plot holes to bad edits and overused b-roll. Whether you're a fanatic like me, or just like to unwind around the streaming device of your choice with a glass of wine, we all know that TV is a way of life. Entertainment television can be high-brow like our current slate of renaissance series or low-brow reality fare. As long as there is a story to tell and larger-than-life characters to showcase, there is a show there, and people will watch it.",
		videos: [
			yt("3snTL92dnRU"),
			v("289188872"),
			yt("SMFXZK6fStc"),
			yt("b0tKa52v6MA"),
			yt("_EhS4vGaAPE"),
			v("311953566"),
			yt("X7S6nFXjyXM"),
			v("311953800"),
			yt("fHtYNjp4NWQ"),
		],
	},
	{
		slug: "food",
		title: "Food & Culinary",
		description:
			"I love food. Everybody does. But not everyone knows how to showcase it in all it's glory. That's where I come in. I know how to talk to chefs, work with cookbook editors, culinary producers and back of house staff. Whether it's a linear cooking tutorial, chef feature, food trend travelogue or all-access 360 food tour, I can make it happen, and make sure the food tells the story.",
		videos: [
			v("290313675"),
			yt("mZGP58VRW6M"),
			v("284531462"),
			v("288823227"),
			v("311935019"),
			v("268422167"),
			v("288822515"),
			v("301328601"),
			v("289382985"),
			v("290344812"),
			yt("gQ0yEzSA_rg"),
			v("288823919"),
		],
	},
	{
		slug: "travel-lifestyle",
		title: "Travel & Lifestyle",
		description:
			"I have filmed in some of the most amazing locations: from Kauai with Tim Ferriss and Laird Hamilton, to Orcas Island for HGTV and the best inside finds across New York City. From my time living in Paris to my honeymoon in St. Lucia and life-changing trips through Japan and Australia, I have a thirst for the world and I love to share that on screen. Here are moments where I've captured the world as the main character.",
		videos: [
			yt("WI8wj4swago"),
			v("289188872"),
			v("284539965"),
			v("288822370"),
			yt("JjpMkOrpbbQ"),
			v("284540294"),
		],
	},
	{
		slug: "branded-partnerships",
		title: "Branded & Partnerships",
		description:
			"Content is king, and brands know it. So why not make content that sells stuff? It's a win-win. I've worked with major brands and up-and-comers alike. I know how to bring my sense of storytelling to a client and hit all their marks. You don't have to sacrifice story to showcase a product. I love working with untrained talent because I get to reveal their passion and expertise on the best brands around.",
		videos: [
			v("288822639"),
			v("290317155"),
			yt("ZggVJZ3R_Uc"),
			v("282565542"),
			v("284531372"),
			v("268419986"),
			v("288823227"),
			v("301328461"),
			v("311935169"),
			v("251395094"),
		],
	},
	{
		slug: "industrials-educational",
		title: "Industrials & Educational",
		description:
			"Want to feature your company and show off your services in the best light? I can find the story within your organization and share your process with the world.\n\nWant to teach a new skill and help people discover the wonders of your craft, recipe, project or talent? I can break it down step-by-step and translate the process to the viewers beyond the screen.",
		videos: [
			v("290320081"),
			v("290343113"),
			yt("sOmhgoD7Z9U"),
			v("284531462"),
			yt("yAXp00T_uIM"),
			v("268422167"),
			v("288824116"),
			v("289390237"),
			v("301328534"),
		],
	},
];

export function getCategoryBySlug(slug: string): Category | undefined {
	return categories.find((c) => c.slug === slug);
}
