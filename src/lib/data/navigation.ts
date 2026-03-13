export interface NavItem {
	label: string;
	href: string;
}

export const primaryNav: NavItem[] = [
	{ label: "Production CV", href: "/resume" },
	{ label: "Project Management CV", href: "/project-management-resume" },
	{ label: "Commercial Video", href: "/commercial-video" },
	{ label: "Interactive Experiences", href: "/interactive-experiences" },
	{ label: "Social Media", href: "/social-media" },
	{ label: "Non-Profit", href: "/non-profit" },
	{ label: "Entertainment", href: "/entertainment" },
	{ label: "Food & Culinary", href: "/food" },
	{ label: "Travel & Lifestyle", href: "/travel-lifestyle" },
	{ label: "Branded & Partnerships", href: "/branded-partnerships" },
	{ label: "Industrials & Educational", href: "/industrials-educational" },
];

export const secondaryNav: NavItem[] = [
	{ label: "Contact Me", href: "/contact" },
];
