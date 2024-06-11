"use client";

/* Data */
import {
	getKillPercentage,
	getKDA, 
    isUser
} from "@/data/functions";

/* Data Type */
import {
	Item,
	Champion,
	MatchParticipant,
	Team,
	Spell, 
    Perk,
    MatchParticipantPerks, 
} from "@/types";

/* NextUI */
import {
	Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
	Tooltip, 
	Chip,
	Progress,
} from "@nextui-org/react";

/* Component */
import { PerkIcon, SpellIcon, ItemIcon, ChampionIcon } from "@/components/tooltip-icon"

export const TeamTable = ({ 
    puuid, 
    team, 
    championMap, 
    itemMap, 
    spellMap, 
    perkMap,
    largestDealtDamage, 
    largestTakenDamage, 
    onClickChampion,
    onClickPerk,
    onClickParticipant,
 }: {
    puuid: string,
    team: Team,
    championMap: Map<string, Champion> | undefined,
    itemMap: Map<string, Item> | undefined,
    spellMap: Map<string, Spell> | undefined,
    perkMap: Map<string, Perk> | undefined,
    largestDealtDamage: number, 
    largestTakenDamage: number, 
    onClickChampion: (participant: MatchParticipant) => void,
    onClickPerk: (perks: MatchParticipantPerks) => void,
    onClickParticipant: (participant: MatchParticipant) => void,
 }) => {

    var players = team.participants;

    var totalKill = 0;

    for(let i = 0; i < players.length; i++) {
        totalKill += players[i].kills;
    }

    var bgBlue = "bg-blue-50 dark:bg-blue-900 ";
    var bgUserBlue = "bg-blue-100 dark:bg-blue-800 ";
    var bgRed = "bg-red-50 dark:bg-red-900 ";
    var bgUserRed = "bg-red-100 dark:bg-red-800 ";
    
    var bgColor = team.win ? bgBlue : bgRed;
    var userBgColor = team.win ? bgUserBlue : bgUserRed;

    return (
        <Table color="primary" aria-label={"team table" + team.teamId}>
            <TableHeader>
                <TableColumn width={300} align="center"><Chip size="sm" radius="sm">{team.win ? "승리" : "패배"}</Chip> ({team.teamId === 100 ? "블루" : "레드"}팀)</TableColumn>
                <TableColumn width={125}><div className="text-center">KDA</div></TableColumn>
                <TableColumn width={100}><div className="text-center">피해량</div></TableColumn>
                <TableColumn width={50}><div className="text-center">와드</div></TableColumn>
                <TableColumn><div className="text-center">CS</div></TableColumn>
                <TableColumn><div className="text-center">골드</div></TableColumn>
                <TableColumn width={300}>아이템</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"데이터가 없습니다."}>
                {players.map((participant: MatchParticipant, i) => (
                    <TableRow key={participant.puuid}>
                        {/* 소환사 */}
                        <TableCell className={(isUser(puuid, participant) ? userBgColor : bgColor) + "text-match-table" + (i === 0 ? " rounded-tl-lg" : "") + (i === players.length - 1 ? " rounded-bl-lg" : "")}>
                            <div className="flex flex-row itemList-center pl-1">
                                {championMap ? <ChampionIcon
                                    size="md"
                                    withLevel={true}
                                    data={championMap.get(participant.championId.toString())}
                                    participant={participant}
                                    onClick={() => {
                                        onClickChampion(participant)
                                    }} /> : <></>}
                                {spellMap ?
                                    <div className="mx-1">
                                        <SpellIcon size={20} data={spellMap.get(participant.summoner1Id.toString())} />
                                        <SpellIcon size={20} data={spellMap.get(participant.summoner2Id.toString())} />
                                    </div> : <></>}
                                {perkMap ?
                                    <div className="mx-1">
                                        <PerkIcon size={20} data={perkMap.get(participant.perks.styles[0].selections[0].perk.toString())}
                                            onClick={() => {
                                                onClickPerk(participant.perks)
                                            }} />
                                        <PerkIcon size={20} data={perkMap.get(participant.perks.styles[1].style.toString())}
                                            onClick={() => {
                                                onClickPerk(participant.perks)
                                            }} />
                                    </div> : <></>}
                                <div className="cursor-pointer hover:underline" onClick={() => { onClickParticipant(participant) }}>{participant.riotIdGameName}#{participant.riotIdTagline}</div>
                            </div>
                        </TableCell>
                        {/* KDA */}
                        <TableCell className={(isUser(puuid, participant) ? userBgColor : bgColor) + "text-match-table text-center text-xs"}>
                            <div className="flex flex-col">
                                <div>{participant.kills}/{participant.deaths}/{participant.assists} {getKillPercentage(participant.kills, participant.assists, totalKill)}</div>
                                <div>{getKDA(participant.kills, participant.deaths, participant.assists)}</div>
                            </div>
                        </TableCell>
                        {/* 피해량 */}
                        <TableCell className={(isUser(puuid, participant) ? userBgColor : bgColor) + "text-match-table text-center text-xs"}>
                            <div className="flex flex-row">
                                <div className="w-[50px] text-center">
                                    <p className="mb-1">{participant.totalDamageDealtToChampions}</p>
                                    <Progress aria-label="Damage Dealt Progress" size="sm" radius="none" color="danger" value={participant.totalDamageDealtToChampions} maxValue={largestDealtDamage} className="max-w-md bg-white" />
                                </div>
                                <div className="w-[50px] ml-1 text-center">
                                    <p className="mb-1">{participant.totalDamageTaken}</p>
                                    <Progress aria-label="Damage Taken Progress" size="sm" radius="none" color="default" value={participant.totalDamageTaken} maxValue={largestTakenDamage} className="max-w-md bg-white" />
                                </div>
                            </div>
                        </TableCell>
                        {/* 와드 */}
                        <TableCell className={(isUser(puuid, participant) ? userBgColor : bgColor) + "text-match-table text-center text-xs"}>
                            <Tooltip
                                shouldCloseOnBlur
                                disableAnimation={false}
                                delay={0}
                                closeDelay={0}
                                content={
                                    <div>
                                        <p>제어와드 구매 : {participant.visionWardsBoughtInGame}</p>
                                        <p>모든 와드 설치 : {participant.wardsPlaced}</p>
                                        <p>모든 와드 제거 : {participant.wardsKilled}</p>
                                    </div>}>
                                <div className="text-center w-[50px]">
                                    <p>{participant.visionWardsBoughtInGame}</p>
                                    <p>{participant.wardsPlaced} / {participant.wardsKilled}</p>
                                </div>
                            </Tooltip>
                        </TableCell>
                        {/* CS */}
                        <TableCell className={(isUser(puuid, participant) ? userBgColor : bgColor) + "text-match-table text-center"}>{participant.totalMinionsKilled}</TableCell>
                        {/* 골드 */}
                        <TableCell className={(isUser(puuid, participant) ? userBgColor : bgColor) + "text-match-table text-center"}>{participant.goldEarned}</TableCell>
                        {/* 아이템 */}
                        <TableCell className={(isUser(puuid, participant) ? userBgColor : bgColor) + "text-match-table" + (i === 0 ? " rounded-tr-lg" : "") + (i === players.length - 1 ? " rounded-br-lg" : "")}>
                            {itemMap ? <div className="flex flex-row">
                                {<ItemIcon data={itemMap.get(participant.item0.toString())} size={30} radius={true}/>}
                                {<ItemIcon data={itemMap.get(participant.item1.toString())} size={30} radius={true}/>}
                                {<ItemIcon data={itemMap.get(participant.item2.toString())} size={30} radius={true}/>}
                                {<ItemIcon data={itemMap.get(participant.item3.toString())} size={30} radius={true}/>}
                                {<ItemIcon data={itemMap.get(participant.item4.toString())} size={30} radius={true}/>}
                                {<ItemIcon data={itemMap.get(participant.item5.toString())} size={30} radius={true}/>}
                                {<ItemIcon data={itemMap.get(participant.item6.toString())} size={30} radius={true}/>}
                            </div> : <></>}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}