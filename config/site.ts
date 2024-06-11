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
      label: "전적",
      href: "/match",
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
		  label: "전적",
		  href: "/match",
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
		github: "https://github.com/nextui-org/nextui",
		twitter: "https://twitter.com/getnextui",
		docs: "https://nextui.org",
		discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev"
	},
};
