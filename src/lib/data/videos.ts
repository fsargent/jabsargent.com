![1772897968632](image/videos/1772897968632.png);
export type VideoSource = "vimeo" | "youtube";

export interface Video {
	source: VideoSource;
	id: string;
	title?: string;
	client?: string;
	resumeRole?: string;
	resumeAnchor?: string;
}

export interface Category {
	slug: string;
	title: string;
	description: string;
	videos: Video[];
}

const vimeoTitlesById: Record<string, string> = {
	"1033195256":
		"24_EUC_FlexAlert_YC_Awareness_Social_Unplugging_Flex_Smarter_15_EN_9x16",
	"1033195769":
		"24_EUC_FlexAlert_YC_Awareness_Social_Dishes_Save Energy_15_EN_1x1",
	"1033195945":
		"24_EUC_FlexAlert_YC_Awareness_OLV_PreCooling_Take_A_Seat_15_EN_16x9",
	"1033196070":
		"24_EUC_FlexAlert_YC_Awareness_Social_PreCooling_Temp_Check_06_EN_9x16",
	"1033219032":
		"24_EUC_FlexAlert_YC_Awareness_Social_AC to 78_Bully_Parrot_06_EN_9x16",
	"1152863763": "201590-1_Benylin_Coughobia_Social_1x1_NO_TAG_15s_-16lufs_v2",
	"1152863798": "201590-1_Benylin_Coughobia_Social_1x1_TESCO_TAG_5s_-16lufs_v2",
	"1152863812":
		"201590-1_Benylin_Coughobia_Social_1x1_TESCO_TAG_10s_-16lufs_v2",
	"1152863881": "201590-1_Benylin_Coughobia_Social_4x5_TESCO_TAG_5s_-16lufs_v2",
	"1152864162": "Benylin_Train_VG_09 UK 2",
	"1152864867": "Lozenge",
	"1152866104": "GUM",
	"1152873313": "QM_07_11_Final",
	"251395094": "ManCrafted MCCORMICK",
	"268419986": "Brunch Baking BOBS RED MILL",
	"268422167":
		"One Pot Cooking with Ryan Scott & Dylan Dreyer BLUPRINT & TODAY SHOW",
	"282565542": "The Cutting Edge DREMEL",
	"284531241": "Milk and Cream Cereal Bar FOOD NETWORK",
	"284531280": "ManCrafted MCCORMICK",
	"284531372": "ManCrafted MCCORMICK",
	"284531462":
		"Backyard Grilling & Barbecuing with Al Roker BLUPRINT & TODAY SHOW",
	"284539965": "Chefs Night DEAN SHEREMET",
	"284540294": "Sushi By Bae GENIUS KITCHEN",
	"284540458": "Holiday Sweater Cookies GENIUS KITCHEN",
	"284563966": "Marinated Steak Lettuce Wraps GENIUS KITCHEN",
	"288822370": "Comfort Nation FOOD NETWORK",
	"288822515": "Kids Menu Makeover with Alex Guarnaschelli FOOD NETWORK",
	"288822639": "Lunchtime Rescue LIPTON",
	"288823227": "Lunchtime Rescue LIPTON",
	"288823919": "Sheet Pan Eggs FOOD NETWORK",
	"288824116": "Gotham Greens 360 FOOD NETWORK",
	"289188872": "Island Life HGTV",
	"289382985": "101_LEMOND PUDDING CAKE_PL_032218_FINAL MIX",
	"289390237": "CRAFTSY_Dremel_1x1_Social_071918_2398_MASTER_R1",
	"290313675":
		"Weeknight Cooking with Curtis Stone & Dylan Dreyer BLUPRINT & TODAY SHOW",
	"290317155":
		"Weeknight Cooking with Curtis Stone & Dylan Dreyer BLUPRINT & TODAY SHOW",
	"290320081": "Brunch Baking BOBS RED MILL",
	"290343113":
		"Weeknight Cooking with Curtis Stone & Dylan Dreyer BLUPRINT & TODAY SHOW",
	"290344812":
		"Weeknight Cooking with Curtis Stone & Dylan Dreyer BLUPRINT & TODAY SHOW",
	"301328461": "Sees Candies - Behind The Sweet FOOD NETWORK",
	"301328534": "Jelly Belly - Behind The Sweet FOOD NETWORK",
	"301328601": "Build Brunch Thanksgiving BRIT + CO",
	"311935019": "#NotCheating, Whole30 Animal-Style Burger BRIT + CO",
	"311935169": "#NotCheating, No-Guilt Sugar-Free Sprinkles BRIT + CO",
	"311940127": "#NotCheating BRIT + CO",
	"311953566": "BUILD Brunch, Holiday Entertaining BRIT + CO",
	"311953800": "BUILD Brunch, Winter Smoothie Bowl BRIT + CO",
	"384843595": "DuPont GC_Bathroom_GSD_02_Conform_2019_10_01_H264",
	"384843611": "DuPont TIGS_Generic_GSD_10_Ending_V3_Conform_2019_10_01_H264",
	"384843630": "Introducing CIO In Focus V2",
	"384843654": "JazzPharma_DrB_v7",
	"384843680": "JazzPharma_Jennifer_v6",
	"384843696": "JazzPharma_Julie_v5",
	"384843725": "JazzPharma_Mackenzie_v5",
	"384843762": "JazzPharma_Meaghan_V5",
	"384843778": "SwopessoDope_v4",
	"384850346": "Beat It 1511",
	"384850360": "Gambling 1513",
	"384850372": "Go Fish Phone 1508",
	"384850382": "Go Fish Sandwich 1507",
	"384850398": "Helpers 1510",
	"384850418": "Wreckreational_3011",
	"399326469": "KatieMorton_NarcolepsyAwareness_JazzPharma",
	"399330051": "AbbVie_FWO_Highlights",
	"498172063": "AbbVie_Workspaces_Video_v6a_AW_1117 FINAL",
	"548145222": "Hologic_FINAL_ProRes",
	"554996995": "Adobe x Pixar Soul Challenge Case Film.mov",
	"555295542": "GETAROUND_JVN_RECAP_16x9_051619_WEB_MASTER",
	"578584641": "PayPal_Payment_Methods_FINAL_v008",
	"578584834": "Edelman_Moore_V10_ENGLISH",
	"578585924": "HPA_ANTHEM_FINAL",
	"663436726": "UB_Client_Spotlight_SD_Loyal_30_Cutdown_Final_v2.mp4",
	"663436816": "UBS_Small_Business_Stories_Anthem_30_Cutdown_Final_v2.mp4",
	"663436946": "UB_Will_Power_Community_Fitness_30_Cutdown_Final.mp4",
	"663437069": "UB_Honor_Among_Thieves_30_Cutdown_Final.mp4",
	"663437144": "UB_Pink_Rose_Cafe_30_Cutdown_Final_v2.mp4",
	"669577968": "Adobe x WestSideStory Challenge :15",
	"669577986": "Adobe x WestSideStory Challenge :30",
	"710510996": "SACCPSA_DIG_ENG",
	"710511066": "Richard AAF_FINAL",
	"744664534": "Sac_Co_MCST_Social_Cut_Community_Final.mov",
	"744664758": "Sac_Co_MCST_Social_Cut_Recruitment_Final",
	"744667202": "Sacramento Mobile Crisis Support Team",
	"757761340": "GB IG Live Screen Recording.mp4",
	"776825788": "DAVID PARODY_CLEAN_FNL1_MP4",
	"776827346": "SUPER DUPER DANI_CLEAN_FNL1_MP4",
	"782650321": "EBAY_MOTORS_60_FINAL_NO_URL.mov",
	"854446906": "RDF2301-Pitch_Video-e19-BR",
};

const polishedTitlesById: Record<string, string> = {
	"1033195256":
		"Energy Upgrade California - Flex Alert: Unplugging (Social 15s)",
	"1033195769": "Energy Upgrade California - Flex Alert: Dishes (Social 15s)",
	"1033195945": "Energy Upgrade California - Flex Alert: Take a Seat (OLV 15s)",
	"1033196070":
		"Energy Upgrade California - Flex Alert: Pre-Cooling Temp Check (Social 6s)",
	"1033219032": "Energy Upgrade California - Flex Alert: AC to 78 (Social 6s)",
	"1152863763": "Benylin Coughobia - No Tag (Social 15s, 1x1)",
	"1152863798": "Benylin Coughobia - Tesco Tag (Social 5s, 1x1)",
	"1152863812": "Benylin Coughobia - Tesco Tag (Social 10s, 1x1)",
	"1152863881": "Benylin Coughobia - Tesco Tag (Social 5s, 4x5)",
	"1152864162": "Benylin - Train Spot (UK)",
	"1152864867": "Benylin - Lozenge Spot",
	"1152866104": "Benylin - Gum Spot",
	"1152873313": "Benylin - Hero Spot",
	"289382985": "Lemon Pudding Cake",
	"289390237": "Craftsy x Dremel - Social Spot",
	"384843595": "DuPont - Bathroom Spot",
	"384843611": "DuPont - TIGS Generic Spot",
	"384843630": "CIO in Focus - Series Introduction",
	"384843654": "Jazz Pharmaceuticals - Dr. B Feature",
	"384843680": "Jazz Pharmaceuticals - Jennifer Feature",
	"384843696": "Jazz Pharmaceuticals - Julie Feature",
	"384843725": "Jazz Pharmaceuticals - Mackenzie Feature",
	"384843762": "Jazz Pharmaceuticals - Meaghan Feature",
	"399326469": "Jazz Pharmaceuticals - Narcolepsy Awareness (Katie Morton)",
	"399330051": "AbbVie - Future of Work Highlights",
	"498172063": "AbbVie - Future of Workspaces",
	"548145222": "Hologic - Brand Film",
	"555295542": "Getaround x JVN - Recap",
	"578584641": "PayPal - Payment Methods",
	"578584834": "Moore Foundation - Brand Film",
	"578585924": "Wu Tsai Human Performance Alliance - Anthem",
	"663436726": "UBS - Client Spotlight: SD Loyal (30s)",
	"663436816": "UBS - Small Business Stories Anthem (30s)",
	"663436946": "UBS - Will Power Community Fitness (30s)",
	"663437069": "UBS - Honor Among Thieves (30s)",
	"663437144": "UBS - Pink Rose Cafe (30s)",
	"710510996": "Sacramento County - PSA",
	"710511066": "American Advertising Federation - Richard Spot",
	"744664534": "Sacramento Mobile Crisis - Community Cut",
	"744664758": "Sacramento Mobile Crisis - Recruitment Cut",
	"757761340": "Gold Bond - IG Live Capture",
	"776825788": "Gold Bond Creator Series - David Parody",
	"776827346": "Gold Bond Creator Series - Super Duper Dani",
	"782650321": "eBay Motors - Brand Spot (60s)",
	"854446906": "REDF - Pitch Video",
};

const youtubeMetadataById: Record<string, { title: string; author: string }> = {
	DN7cBMZXvVM: {
		title: "Stop Stigma Sacramento 2022 PSA",
		author: "StopStigmaSacramento",
	},
	"3snTL92dnRU": {
		title:
			"Comedy Crib: The Filling Is Mutual | White Devil Eggs with Langston Kerman | IFC",
		author: "IFC",
	},
	SMFXZK6fStc: {
		title: "The Tim Ferriss Experiment (TFX) | Trailer | Tim Ferriss",
		author: "Tim Ferriss",
	},
	b0tKa52v6MA: {
		title: "The Singles Project - Help The Singles!",
		author: "Bravo",
	},
	_EhS4vGaAPE: {
		title: "Car Hunters: Bonus: Luis vs. Big Boi | History",
		author: "HISTORY",
	},
	X7S6nFXjyXM: {
		title: "Blood Sweat + Gears - Riding Clean to the Tour de France",
		author: "First Run Features",
	},
	fHtYNjp4NWQ: {
		title: "Year of the Scab (Extended Clip) | 30 for 30 | ESPN Stories",
		author: "ESPN",
	},
	mZGP58VRW6M: {
		title: "Man Crafted Episode 6: Game Day Celebration",
		author: "McCormick Spice",
	},
	gQ0yEzSA_rg: {
		title:
			"Comfort Nation: Uzbek Noodle Stew (Lagman Stew) | Comfort Nation | Food Network",
		author: "Food Network",
	},
	WI8wj4swago: {
		title: "The Tim Ferriss Experiment: Surfing | Trailer | Tim Ferriss",
		author: "Tim Ferriss",
	},
	JjpMkOrpbbQ: {
		title: "Myriad Linen",
		author: "Rough Linen",
	},
	ZggVJZ3R_Uc: {
		title: "3D Pen Lights Tutorial with Grace Du Prez (2018)",
		author: "3Doodler",
	},
	sOmhgoD7Z9U: {
		title: "The Cutting Edge: Dremel DigiLab Laser Cutter Luggage Tag Project",
		author: "Dremel",
	},
	yAXp00T_uIM: {
		title: "3D Pen PHONE CASE Tutorial (2018)",
		author: "3Doodler",
	},
};

const videoContextById: Record<
	string,
	Pick<Video, "client" | "resumeRole" | "resumeAnchor">
> = {
	"1033195256": {
		client: "Energy Upgrade California",
		resumeRole: "Executive Producer @ Omnicom Studios",
		resumeAnchor: "omnicom-studios",
	},
	"1033195769": {
		client: "Energy Upgrade California",
		resumeRole: "Executive Producer @ Omnicom Studios",
		resumeAnchor: "omnicom-studios",
	},
	"1033195945": {
		client: "Energy Upgrade California",
		resumeRole: "Executive Producer @ Omnicom Studios",
		resumeAnchor: "omnicom-studios",
	},
	"399330051": {
		client: "AbbVie",
		resumeRole: "Executive Producer @ Edelman",
		resumeAnchor: "edelman",
	},
	"498172063": {
		client: "AbbVie",
		resumeRole: "Executive Producer @ Edelman",
		resumeAnchor: "edelman",
	},
	"548145222": {
		client: "Hologic",
		resumeRole: "Executive Producer @ Edelman",
		resumeAnchor: "edelman",
	},
	"554996995": {
		client: "Adobe",
		resumeRole: "Executive Producer @ Edelman",
		resumeAnchor: "edelman",
	},
	"555295542": {
		client: "Getaround",
		resumeRole: "Executive Producer @ Edelman",
		resumeAnchor: "edelman",
	},
	"578584641": {
		client: "PayPal",
		resumeRole: "Executive Producer @ Edelman",
		resumeAnchor: "edelman",
	},
	"578584834": {
		client: "Gordon & Betty Moore Foundation",
		resumeRole: "Executive Producer @ Edelman",
		resumeAnchor: "edelman",
	},
	"669577968": {
		client: "Adobe",
		resumeRole: "Executive Producer @ Edelman",
		resumeAnchor: "edelman",
	},
	"669577986": {
		client: "Adobe",
		resumeRole: "Executive Producer @ Edelman",
		resumeAnchor: "edelman",
	},
	"744667202": {
		client: "Sacramento Department of Behavioral Health",
		resumeRole: "Executive Producer @ Edelman",
		resumeAnchor: "edelman",
	},
	"782650321": {
		client: "eBay",
		resumeRole: "Executive Producer @ Edelman",
		resumeAnchor: "edelman",
	},
	"854446906": {
		client: "REDF",
		resumeRole: "Video Consultant / Director (Freelance)",
		resumeAnchor: "freelance-2023",
	},
	"289188872": {
		client: "HGTV",
		resumeRole: "TV Field Producer",
		resumeAnchor: "tv-field-producer",
	},
	"288823227": {
		client: "Lipton",
		resumeRole: "Senior Digital Media Director/Producer @ Spacestation",
		resumeAnchor: "spacestation",
	},
	"282565542": {
		client: "Dremel",
		resumeRole: "Senior Digital Media Director/Producer @ Spacestation",
		resumeAnchor: "spacestation",
	},
	"290320081": {
		client: "Bob's Red Mill",
		resumeRole: "Senior Digital Media Director/Producer @ Spacestation",
		resumeAnchor: "spacestation",
	},
};

function prettifyImportedTitle(raw: string): string {
	return raw
		.replace(/\.(mp4|mov|m4v)$/i, "")
		.replace(/_/g, " ")
		.replace(/\s*-\s*16lufs\b/gi, "")
		.replace(/\b(v\d+|r\d+)\b/gi, "")
		.replace(/\b(final|master|clean|conform|h264)\b/gi, "")
		.replace(/\s+/g, " ")
		.trim();
}

function v(id: string, title?: string): Video {
	const imported = vimeoTitlesById[id];
	return {
		source: "vimeo",
		id,
		title:
			title ??
			polishedTitlesById[id] ??
			(imported ? prettifyImportedTitle(imported) : undefined),
		...videoContextById[id],
	};
}

function yt(id: string, title?: string): Video {
	return {
		source: "youtube",
		id,
		title: title ?? youtubeMetadataById[id]?.title,
		...videoContextById[id],
	};
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
			yt("WI8wj4swago", "The Tim Ferriss Experiment: Surfing"),
			v("289188872"),
			v("284539965"),
			v("288822370"),
			yt("JjpMkOrpbbQ", "Rough Linen"),
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
