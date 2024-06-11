import { MatchParticipant, Team, Match, Rank } from "@/types";


// 전적 검색
export function GetSearchHistoryList() {
	var data = localStorage.getItem("searchUserList");
	var nameList = [];

	if(data != null) {
		var nameList: any[] = JSON.parse(data);
	}

	return nameList;
}

// 검색 유저 관련
export function getSearchUser(puuid: string, participants: MatchParticipant[]) {

	for(let i = 0; i < participants.length; i++) {
		if(participants[i].puuid === puuid) {
			return participants[i];
		}
	}
}
export function getUserTeam(puuid: string, teams: Team[]) {

	for(let i = 0; i < teams.length; i++) {

		var team = teams[i];

		for(let j = 0; j < team.participants.length; j++) {
			var participant = team.participants[j];

			if(participant.puuid === puuid) {
				return teams[i];
			}
		}
	}
}
export function isUser(puuid: string, participant: MatchParticipant) {
	if(puuid ===participant.puuid) {
		return true;
	} else {
		return false;
	}
}
export function isUserWin(puuid: string, match: Match) {

	var participants = match.info.participants;

	for(let i = 0; i < participants.length; i++) {
		if(participants[i].puuid === puuid) {
			var user = participants[i]
			if(user.win) {
				return true;
			} else {
				return false;
			}
		}
	}
}



// 랭크 정보
export const getTierText = (tier: string) => {
	switch(tier) {
		case "IRON":
			return "Iron"
		case "BRONZE":
			return "Bronze";
		case "SILVER":
			return "Silver";
		case "GOLD":
			return "Gold";
		case "PLATINUM":
			return "Platinum";
		case "EMERALD":
			return "Emerald";
		case "DIAMOND":
			return "Diamond";
		case "MASTER":
			return "Master";
		case "GRANDMASTER":
			return "GrandMaster";
		case "CHALLENGER":
			return "Challenger";
		default: 
			return tier;
	}
}
export const getTierNumberText = (tierNumber: string) => {
	switch(tierNumber) {
		case "I":
			return "1"
		case "II":
			return "2"
		case "III":
			return "3"
		case "IV":
			return "4";
		default: 
			return tierNumber;
	}
}
export const getWinRate = (rank: Rank) => {
	var win = rank.wins;
	var lose = rank.losses;

	return ((win / (win + lose)) * 100).toFixed(0).toString() + "%"; 
}



//경기 관련
export const getGameType = (queueId: number) => {
	if (queueId === 420) {
		return "솔로랭크"
	} else if (queueId === 1700) {
		return "아레나"
	} else if (queueId === 450) {
		return "칼바람 나락"
	} else if (queueId === 490) {
		return "빠른 대전"
	}
}
export const setTeams = (match: Match) => {

	var participants: MatchParticipant[] = match.info.participants;

	var teams: Team[] = [];

	if (isArena(match)) {

		for (let i = 0; i < participants.length; i++) {

			var isNewTeam = true;

			for (let j = 0; j < teams.length; j++) {
				if (participants[i].playerSubteamId === teams[j].playerSubteamId) {
					teams[j].participants.push(participants[i]);
					isNewTeam = false;
				}
			}

			if (isNewTeam) {
				teams.push({
					teamId: participants[i].teamId,
					placement: participants[i].placement,
					subteamPlacement: participants[i].subteamPlacement,
					playerSubteamId: participants[i].playerSubteamId,
					win: participants[i].win,
					participants: [participants[i]],
				})
			}
		}

		teams.sort(function (a, b) {
			return a.subteamPlacement < b.subteamPlacement ? -1 : a.subteamPlacement > b.subteamPlacement ? 1 : 0;
		});
		match.info.teams = teams;

	} else {
		for (let i = 0; i < participants.length; i++) {

			var isNewTeam = true;

			for (let j = 0; j < teams.length; j++) {
				if (participants[i].teamId === teams[j].teamId) {
					teams[j].participants.push(participants[i]);
					isNewTeam = false;
				}
			}

			if (isNewTeam) {
				teams.push({
					teamId: participants[i].teamId,
					placement: participants[i].placement,
					subteamPlacement: participants[i].subteamPlacement,
					playerSubteamId: participants[i].playerSubteamId,
					win: participants[i].win,
					participants: [participants[i]],
				})
			}
		}
		match.info.teams = teams;
	}
}



//경기 정보
export function getLargestDealtDamage(match: Match) {
	var participants = match.info.participants;

	var largestDealtDamage = 0;

	for(let i = 0; i < participants.length; i++) {
		if(largestDealtDamage < participants[i].totalDamageDealtToChampions) {
			largestDealtDamage = participants[i].totalDamageDealtToChampions;
		}
	}

	return largestDealtDamage;
}
export function getLargestTakenDamage(match: Match) {
	var participants = match.info.participants;

	var largestTakenDamage = 0;

	for(let i = 0; i < participants.length; i++) {
		if(largestTakenDamage < participants[i].totalDamageTaken) {
			largestTakenDamage = participants[i].totalDamageTaken;
		}
	}

	return largestTakenDamage;
}
export function getKillPercentage(kill: number, assist: number, totalKill: number) {

	var returnValue = "";

	if(totalKill === 0) {
		returnValue = "(0%)";
	} else {
		returnValue = "(" + ((kill + assist) / totalKill * 100).toFixed(0).toString() + "%)";
	}

	return returnValue;
}
export function getKDA(kill: number, death: number, assist: number) {

	if(kill === 0 && assist === 0 && death === 0) {
		return "0.00";
	}

	if((kill > 0 || assist > 0) && (death <= 0)) {
		return "Perfect";
	} else {
		return ((kill + assist) / death).toFixed(2).toString();
	}
}



// 아레나
export function isArena(match: Match) {
	if(match.info.queueId === 1700) {
		return true;
	} else {
		return false;
	}
}
export function getArenaRankText(team: Team) {
	if(team.subteamPlacement === 1) {
		return team.subteamPlacement + "st";
	} else if(team.subteamPlacement === 2) {
		return team.subteamPlacement + "nd";
	} else if(team.subteamPlacement === 3) {
		return team.subteamPlacement + "rd";
	} else {
		return team.subteamPlacement + "th";
	}
}
export function getArenaTeamName(team: Team) {
	switch(team.playerSubteamId) {
		case 1: return "팀 포로";
		case 2: return "팀 미니언";
		case 3: return "팀 집게발";
		case 4: return "팀 돌거북";
		case 5: return "팀 칼날부리";
		case 6: return "팀 파수꾼";
		case 7: return "팀 늑대";
		case 8: return "팀 심술두꺼비";
	}
	return team.playerSubteamId
}



// 스킬 툴팁
export function GetSkillTooltip(tooltip: string) {
	var result = tooltip.replaceAll(/\{\{.*?\}\}/gi, "?");
	return result;
}