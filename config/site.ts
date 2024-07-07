export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Garen.gg",
	description: "리그 오브 레전드 게임의 전적 검색 서비스를 제공합니다.",
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
