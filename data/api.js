/* Dragontail DB */
export async function fetchItemList() {
	console.log("fetchItemList");
	const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/data/ko_KR/item.json`, {
		cache: 'no-store'
	});

	if(res.status === 200) {
		return {
			status: {
				status_code: res.status,
				message: res.statusText,
			},
			data: res.json(),
		};
	} else {
		return {
			status: {
				status_code:res.status,
				message: res.statusText,
			},
			data: null,
		};
	}
}
export async function fetchSpellList() {
	console.log("fetchSpellList");
	const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/data/ko_KR/summoner.json`, {
		cache: 'no-store'
	});

	if(res.status === 200) {
		return {
			status: {
				status_code: res.status,
				message: res.statusText,
			},
			data: res.json(),
		};
	} else {
		return {
			status: {
				status_code:res.status,
				message: res.statusText,
			},
			data: null,
		};
	}
}
export async function fetchChampionList() {
    console.log("fetchChampionList");
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/data/ko_KR/champion.json`, {
        cache: 'no-store'
    });

	if(res.status === 200) {
		return {
			status: {
				status_code: res.status,
				message: res.statusText,
			},
			data: res.json(),
		};
	} else {
		return {
			status: {
				status_code:res.status,
				message: res.statusText,
			},
			data: null,
		};
	}
}
export async function fetchChampion(name) {
    console.log("fetchChampion");
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/data/ko_KR/champion/${name}.json`, {
        cache: 'no-store'
    });

	if(res.status === 200) {
		return {
			status: {
				status_code: res.status,
				message: res.statusText,
			},
			data: res.json(),
		};
	} else {
		return {
			status: {
				status_code:res.status,
				message: res.statusText,
			},
			data: null,
		};
	}
}
export async function fetchPerkList() {
    console.log("fetchPerkList");
    const res = await fetch(`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/data/ko_KR/runesReforged.json`, {
        cache: 'no-store'
    });

	if(res.status === 200) {
		return {
			status: {
				status_code: res.status,
				message: res.statusText,
			},
			data: res.json(),
		};
	} else {
		return {
			status: {
				status_code:res.status,
				message: res.statusText,
			},
			data: null,
		};
	}
}

/* CommunityDragon DB */
export async function fetchAugmentList() {
    console.log("fetchAugmentList");
    const res = await fetch(`${process.env.NEXT_PUBLIC_ARENA_AUGMENTS_DB_URL}`, {
        cache: 'no-store'
    });

	if(res.status === 200) {
		return {
			status: {
				status_code: res.status,
				message: res.statusText,
			},
			data: res.json(),
		};
	} else {
		return {
			status: {
				status_code:res.status,
				message: res.statusText,
			},
			data: null,
		};
	}
}

/* Riot Api */
export async function fetchRotationList() {
	console.log("fetchRotationList");
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rotation`, {
		cache: 'no-store'
	});

	if(res.status === 200) {
		return {
			status: {
				status_code: res.status,
				message: res.statusText,
			},
			data: res.json(),
		};
	} else {
		return {
			status: {
				status_code:res.status,
				message: res.statusText,
			},
			data: null,
		};
	}
}
export async function fetchAccountByName(gameName, tagLine) {
	console.log("fetchAccountByName");
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/account/name/${gameName}/${tagLine}`, {
		cache: 'no-store'
	})

	if(res.status === 200) {
		return {
			status: {
				status_code: res.status,
				message: res.statusText,
			},
			data: res.json(),
		};
	} else {
		return {
			status: {
				status_code:res.status,
				message: res.statusText,
			},
			data: null,
		};
	}
}
export async function fetchProfile(puuid) {
	console.log("fetchProfile");
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/summoner/${puuid}`, {
		cache: 'no-store'
	})

	if(res.status === 200) {
		return {
			status: {
				status_code: res.status,
				message: res.statusText,
			},
			data: res.json(),
		};
	} else {
		return {
			status: {
				status_code:res.status,
				message: res.statusText,
			},
			data: null,
		};
	}
}
export async function fetchMatches(puuid) {
	console.log("fetchMatches");
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/matches/${puuid}`, {
		cache: 'no-store'
	});

	if(res.status === 200) {
		return {
			status: {
				status_code: res.status,
				message: res.statusText,
			},
			data: res.json(),
		};
	} else {
		return {
			status: {
				status_code:res.status,
				message: res.statusText,
			},
			data: null,
		};
	}
}
export async function fetchMatch(matchId) {
	console.log("fetchMatch");
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/match/${matchId}`, {
		cache: 'no-store'
	});

	if(res.status === 200) {
		return {
			status: {
				status_code: res.status,
				message: res.statusText,
			},
			data: res.json(),
		};
	} else {
		return {
			status: {
				status_code:res.status,
				message: res.statusText,
			},
			data: null,
		};
	}
}
export async function fetchRank(summonerId) {
	console.log("fetchRank");
	const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rank/${summonerId}`, {
		cache: 'no-store'
	});

	if(res.status === 200) {
		return {
			status: {
				status_code: res.status,
				message: res.statusText,
			},
			data: res.json(),
		};
	} else {
		return {
			status: {
				status_code:res.status,
				message: res.statusText,
			},
			data: null,
		};
	}
}