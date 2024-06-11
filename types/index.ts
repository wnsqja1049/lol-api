import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export type ModalScrollType = "inside" | "outside" | "nomal" | "undefined"


export type Account = {
	puuid: string;
	gameName: string;
	tagLine: string
}
export type Profile = {
	id: string;
	accountId: string;
	puuid: string;
	profileIconId: number;
	revisionDate: number;
	summonerLevel: number
}
export type UserName = {
	gameName: string;
	tagLine: string
}

export type Rank = {
	leagueId: string;
	queueType: string;
	tier: string;
	rank: string;
	summonerId: string;
	leaguePoints: number;
	wins: number;
	losses: number;
	veteran: boolean;
	inactive: boolean;
	freshBlood: boolean;
	hotStreak: boolean;
}



export type Champion = {
	id: string;
	key: string;
	name: string;
	title: string;
	blurb: string;
	image: {
		full: string;
	}
	stats: {
		hp: number;
		hpperlevel: number;
		mp: number;
		mpperlevel: number;  
		movespeed: number;
		armor: number;
		armorperlevel: number;
		spellblock: number;
		spellblockperlevel: number;
		attackrange: number;
		hpregen: number;
		hpregenperlevel: number;
		mpregen: number;
		mpregenperlevel: number;
		crit: number;
		critperlevel: number;
		attackdamage: number;
		attackdamageperlevel: number;
		attackspeedperlevel: number;
		attackspeed: number;
	};
	chosung: string;
	firstChosung: string;
}



export type ChampionDetail = {
	id: string;
	key: number;
	name: string;
	title: string;
	lore: string;
	stats: {
		hp: number;
		hpperlevel: number;
		mp: number;
		mpperlevel: number;  
		movespeed: number;
		armor: number;
		armorperlevel: number;
		spellblock: number;
		spellblockperlevel: number;
		attackrange: number;
		hpregen: number;
		hpregenperlevel: number;
		mpregen: number;
		mpregenperlevel: number;
		crit: number;
		critperlevel: number;
		attackdamage: number;
		attackdamageperlevel: number;
		attackspeedperlevel: number;
		attackspeed: number;
	}
	passive: {
		name: string;
		description: string;
		image: {
			full: string,
		}
	}
	spells: Skill[]
	skins: Skin[]
}
export type Skill = {
	id: string;
	name: string;
	description: string;
	tooltip: string;
	image: {
		full: string;
	};
	maxrank: number;

	cooldown: number[];
	cooldownBurn: string;

	cost: number[];
	costBurn: string;

	range: number[];
	rangeBurn: string;
}
export type Skin = {
	id: string;
	num: number;
	name: string;
	chromas: boolean;
}



export type Spell = {
	id: string;
	name: string;
	description: string;
	tooltip: string;
	image: {
		full: string;
	}

}



export type Item = {
	id: number;
	name: string;
	description: string;
	colloq: string;
	plaintext: string;
	into: Array<string>;
	image: {
		full: string;
		sprite: string;
		group: string;
		x: number;
		y: number;
		w: number;
		h: number;
	};
	gold: {
		base: number;
		purchasable: boolean;
		total: number;
		sell: number;
	};
	tags: Array<string>;
	maps: {
		11: boolean;
		12: boolean;
		21: boolean;
		22: boolean;
		30: boolean;
	};
	stats: object;
}


export type Perk = {
	id: number;
	key: string;
	icon: string;
	name: string;
	shortDesc: string;
	longDesc: string;
}
export type StatMod = {
	id: string;
	icon: string;
	title: string;
	desc: string;
}



export type Match = {
	metadata: {
		matchId: string;
		participants: Array<string>;
	};
	info: {
		gameMode: string;
		gameType: string;
		gameVersion: string;
		gameCreation: number;
		gameDuration: number;
		gameEndTimestamp: number;
		participants: Array<MatchParticipant>;
		teams: Team[];
		queueId: number;
	}
}
export type MatchParticipant = {
	puuid: string;
	championId: number;
	championName: string;

	riotIdGameName: string;
	riotIdTagline: string;

	champLevel: number;

	kills: number;
	deaths: number;
	assists: number;

	item0: number;
	item1: number;
	item2: number;
	item3: number;
	item4: number;
	item5: number;
	item6: number;

	perks: MatchParticipantPerks;

	playerAugment1: number;
	playerAugment2: number;
	playerAugment3: number;
	playerAugment4: number;

	summoner1Id: number;
	summoner2Id: number;

	totalMinionsKilled: number;

	goldEarned: number;
	goldSpent: number;

	totalDamageDealtToChampions: number;
	totalDamageTaken: number;

	visionWardsBoughtInGame: number;
	wardsPlaced: number;
	wardsKilled: number;

	teamId: number;
	placement: number;
	subteamPlacement: number;
	playerSubteamId: number;

	
	win: boolean;
}
export type MatchParticipantPerks = {
	statPerks: {
		defense: number;
		flex: number;
		offense: number;
	};
	styles: MatchPerkStyle[];
}
export type MatchPerkStyle = {
	description: string;
	selections: MatchPerkSelection[];
	style: number;
}
export type MatchPerkSelection = {
	perk: number;
	var1: number;
	var2: number;
	var3: number;
}



export type Team = {
	teamId: number;
	placement: number;
	subteamPlacement: number;
	playerSubteamId: number;
	win: boolean;
	participants: MatchParticipant[];
}



export type Augment = {
	id: number;
	name: string;
	apiName: string;
	rarity: number;
	desc: string;
	iconLarge: string;
	iconSmall: string;
	tooltip: string;
}