export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
	{
		label: "홈",
		href: "/",
	},
    {
      label: "아이템",
      href: "/item",
    },
    {
      label: "챔피언",
      href: "/champion",
    }
	],
	navMenuItems: [
		{
			label: "홈",
			href: "/",
		},
		{
			label: "아이템",
			href: "/item",
		},
		{
			label: "챔피언",
			href: "/champion",
		},
	],
	links: {
		github: "https://github.com/wnsqja1049/lol-api",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
