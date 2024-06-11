import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			colors: {
				white: "#FFFFFF",
				black: "#000000",
				blue: {
					50:  "#e6f1fe",
					100: "#cce3fd",
					200: "#99c7fb",
					300: "#66aaf9",
					400: "#338ef7",
					500: "#006FEE",
					600: "#005bc4",
					700: "#004493",
					800: "#002e62",
					900: "#001731",
					950: "#1f2d55",
				},
				purple: {
					50:  "#F2EAFA",
					100: "#E4D4F4",
					200: "#C9A9E9",
					300: "#AE7EDE",
					400: "#9353D3",
					500: "#7828C8",
					600: "#6020A0",
					700: "#481878",
					800: "#301050",
					900: "#180828",
				},
				red: {
					50:  "#FEE7EF",
					100: "#FDD0DF",
					200: "#FAA0BF",
					300: "#F871A0",
					400: "#F54180",
					500: "#F31260",
					600: "#C20E4D",
					700: "#920B3A",
					800: "#610726",
					900: "#310413",
				},
				rose: {
					50:  "#fff1f2",
					100: "#fbecea",
					200: "#fecdd3",
					300: "#fda4af",
					400: "#fb7185",
					500: "#f43f5e",
					600: "#e11d48",
					700: "#be123c",
					800: "#9f1239",
					900: "#881337",
				},
				sky: {
					50:  "#f0f9ff",
					100: "#e0f2fe",
					200: "#bae6fd",
					300: "#7dd3fc",
					400: "#38bdf8",
					500: "#0ea5e9",
					600: "#0284c7",
					700: "#0369a1",
					800: "#075985",
					900: "#0c4a6e",
				},
				stone: {
					800: "#442124",
				}
			},
		},
		fontSize: {
			xs:		['12px', '16px'],
			sm:		['14px', '20px'],
			base:	['16px', '24px'],
			lg: 	['18px', '28px'],
			xl:		['24px', '32px'],
		},
	},
	darkMode: "class",
	plugins: [nextui({
		addCommonColors: true,
		layout: {
			disabledOpacity: "0.3", // opacity-[0.3]
			radius: {
				small: "2px", // rounded-small
				medium: "4px", // rounded-medium
				large: "6px", // rounded-large
			},
			borderWidth: {
				small: "1px", // border-small
				medium: "1px", // border-medium
				large: "2px", // border-large
			},
		},
		themes: {
			light: {
				colors: {
					background: "#FFFFFF", // white
					foreground: "#11181C", // or 50 to 900 DEFAULT
					primary: {
						foreground: "#FFFFFF",
						DEFAULT: "#2e2e43", // slate-800
					},
				},
			},
			dark: {
				colors: {
					background: "#181820", // zinc-900
					foreground: "#ECEDEE", // or 50 to 900 DEFAULT
					primary: {
						foreground: "#FFFFFF",
						DEFAULT: "#2e2e43", // slate-800
					},
				},
			},
			mytheme: {
				// custom theme
				extend: "dark",
				colors: {
					primary: {
						foreground: "#000000",
						DEFAULT: "#FFFFFF",
					},
					focus: "#FFFFFF",
				},
			},
		},
	}),
	],
}
