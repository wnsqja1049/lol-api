/* Dragontail DB */
export async function errorItemList(status_code) {
	alert('데이터 오류. 에러코드 : ' + status_code);
}
export async function errorSpellList(status_code) {
	alert('데이터 오류. 에러코드 : ' + status_code);
}
export async function errorChampionList(status_code) {
	alert('데이터 오류. 에러코드 : ' + status_code);
}
export async function errorChampion(status_code) {
	alert('데이터 오류. 에러코드 : ' + status_code);
}
export async function errorPerkList(status_code) {
	alert('데이터 오류. 에러코드 : ' + status_code);
}

/* CommunityDragon DB */
export async function errorAugmentList(status_code) {
	alert('데이터 오류. 에러코드 : ' + status_code);
}

/* Riot Api */
export async function errorRotationList(status_code) {
	if(status_code === 403) {
		alert('API 키가 만료되었습니다.');
	} else if (status_code === 404) {
		alert('로테이션 정보를 찾을 수 없습니다.');
	} else if (status_code === 429) {
		alert('API 요청 한계를 초과하였습니다. 잠시 후 다시 시도해 주세요.');
	} else {
		alert(status_code + 'API 오류.');
	}
}
export async function errorAccountByName(status_code) {
	if (status_code === 403) {
		alert('API 키가 만료되었습니다.');
	} else if (status_code === 404) {
		alert('소환사 정보를 찾을 수 없습니다.');
	} else if (status_code === 429) {
		alert('API 요청 한계를 초과하였습니다. 잠시 후 다시 시도해 주세요.');
	} else {
		alert(status_code + 'API 오류.');
	}
}
export async function errorProfile(status_code) {
	if (status_code === 403) {
		alert('API 키가 만료되었습니다.');
	} else if (status_code === 404) {
		alert('소환사 정보를 찾을 수 없습니다.');
	} else if (status_code === 429) {
		alert('API 요청 한계를 초과하였습니다. 잠시 후 다시 시도해 주세요.');
	} else {
		alert(status_code + 'API 오류.');
	}
}
export async function errorMatches(status_code) {
	if (status_code === 403) {
		alert('API 키가 만료되었습니다.');
	} else if (status_code === 404) {
		alert('매치 정보를 찾을 수 없습니다.');
	} else if (status_code === 429) {
		alert('API 요청 한계를 초과하였습니다. 잠시 후 다시 시도해 주세요.');
	} else {
		alert(status_code + 'API 오류.');
	}
}
export async function errorMatch(status_code) {
	if (status_code === 403) {
		alert('API 키가 만료되었습니다.');
	} else if (status_code === 404) {
		alert('매치 정보를 찾을 수 없습니다.');
	} else if (status_code === 429) {
		alert('API 요청 한계를 초과하였습니다. 잠시 후 다시 시도해 주세요.');
	} else {
		alert(status_code + 'API 오류.');
	}
}
export async function errorRank(status_code) {
	if (status_code === 403) {
		alert('API 키가 만료되었습니다.');
	} else if (status_code === 429) {
		alert('API 요청 한계를 초과하였습니다. 잠시 후 다시 시도해 주세요.');
	} else {
		alert(status_code + 'API 오류.');
	}
}