"use client";

/* Data */
import {
    getKDA,
    isUser, 
    getArenaRankText, 
    getArenaTeamName
} from "@/data/functions";

/* Data Type */
import {
    Item,
    Champion,
    MatchParticipant,
    Team,
    Spell, 
    Augment, 
} from "@/types";

/* NextUI */
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    Chip,
    Progress,
} from "@nextui-org/react";

/* Component */
import { SpellIcon, ItemIcon, ChampionIcon, AugmentIcon } from "@/components/tooltip-icon"

export const ArenaTeamTable = ({ 
    puuid, 
    team, 
    championMap, 
    itemMap, 
    spellMap, 
    augmentMap, 
    largestDealtDamage, 
    largestTakenDamage, 
    onClickChampion }: {
    puuid: string, 
    team: Team,
    championMap: Map<string, Champion> | undefined,
    itemMap: Map<string, Item> | undefined,
    spellMap: Map<string, Spell> | undefined,
    augmentMap: Map<string, Augment> | undefined,
    largestDealtDamage: number, 
    largestTakenDamage: number, 
    onClickChampion: (participant: MatchParticipant) => void
}) => {
    var players = team.participants;

    var bgBlue = "bg-blue-50 dark:bg-blue-900 ";
    var bgUserBlue = "bg-blue-100 dark:bg-blue-800 ";
    var bgRed = "bg-red-50 dark:bg-red-900 ";
    var bgUserRed = "bg-red-100 dark:bg-red-800 ";
    
    var bgColor = team.win ? bgBlue : bgRed;
    var userBgColor = team.win ? bgUserBlue : bgUserRed;

    return (
        <Table color="primary" aria-label={"team table" + team.teamId}>
            <TableHeader>
                <TableColumn width={300} align="center"><Chip size="sm" radius="sm">{getArenaRankText(team)}</Chip> ({getArenaTeamName(team)})</TableColumn>
                <TableColumn width={125}><div className="text-center">증강</div></TableColumn>
                <TableColumn width={125}><div className="text-center">KDA</div></TableColumn>
                <TableColumn width={100}><div className="text-center">피해량</div></TableColumn>
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
                                    size="sm"
                                    withLevel={true}
                                    data={championMap.get(participant.championId.toString())}
                                    participant={participant}
                                    onClick={() => {
                                        onClickChampion(participant)
                                    }} /> : <></>}
                                {spellMap ? <div className="mx-1">
                                    <SpellIcon size={20} data={spellMap.get(participant.summoner1Id.toString())} />
                                    <SpellIcon size={20} data={spellMap.get(participant.summoner2Id.toString())} />
                                </div> : <></>}
                                {participant.riotIdGameName}#{participant.riotIdTagline}
                            </div>
                        </TableCell>
                        {/* 증강 */}
                        <TableCell className={(isUser(puuid, participant) ? userBgColor : bgColor) + "text-match-table text-center text-sm"}>
                            {augmentMap ?
                                <div className="flex flex-row">
                                    <AugmentIcon size={25} data={augmentMap.get(participant.playerAugment1.toString())} />
                                    <AugmentIcon size={25} data={augmentMap.get(participant.playerAugment2.toString())} />
                                    <AugmentIcon size={25} data={augmentMap.get(participant.playerAugment3.toString())} />
                                    <AugmentIcon size={25} data={augmentMap.get(participant.playerAugment4.toString())} />
                                </div> : <></>}
                        </TableCell>
                        {/* KDA */}
                        <TableCell className={(isUser(puuid, participant) ? userBgColor : bgColor) + "text-match-table text-center text-sm"}>
                            <div className="flex flex-col">
                                <div>{participant.kills}/{participant.deaths}/{participant.assists}</div>
                                <div>{getKDA(participant.kills, participant.deaths, participant.assists)}</div>
                            </div>
                        </TableCell>
                        {/* 피해량 */}
                        <TableCell className={(isUser(puuid, participant) ? userBgColor : bgColor) + "text-match-table text-center text-sm"}>
                            <div className="flex flex-row">
                                <div className="w-[50px] text-center">
                                    <p className="mb-1">{participant.totalDamageDealtToChampions}</p>
                                    <Progress aria-label="Damage Dealt Progress" size="sm" radius="sm" color="danger" value={participant.totalDamageDealtToChampions} maxValue={largestDealtDamage} className="max-w-md bg-white" />
                                </div>
                                <div className="w-[50px] ml-1 text-center">
                                    <p className="mb-1">{participant.totalDamageTaken}</p>
                                    <Progress aria-label="Damage Taken Progress" size="sm" radius="sm" color="default" value={participant.totalDamageTaken} maxValue={largestTakenDamage} className="max-w-md bg-white" />
                                </div>
                            </div>
                        </TableCell>
                        {/* 골드 */}
                        <TableCell className={(isUser(puuid, participant) ? userBgColor : bgColor) + "text-match-table text-center"}>{participant.goldEarned}</TableCell>
                        {/* 아이템 */}
                        <TableCell className={(isUser(puuid, participant) ? userBgColor : bgColor) + "text-match-table" + (i === 0 ? " rounded-tr-lg" : "") + (i === players.length - 1 ? " rounded-br-lg" : "")}>
                            {itemMap ? <div className="flex flex-row">
                                {<ItemIcon data={itemMap.get(participant.item0.toString())} size={30} radius={true} />}
                                {<ItemIcon data={itemMap.get(participant.item1.toString())} size={30} radius={true} />}
                                {<ItemIcon data={itemMap.get(participant.item2.toString())} size={30} radius={true} />}
                                {<ItemIcon data={itemMap.get(participant.item3.toString())} size={30} radius={true} />}
                                {<ItemIcon data={itemMap.get(participant.item4.toString())} size={30} radius={true} />}
                                {<ItemIcon data={itemMap.get(participant.item5.toString())} size={30} radius={true} />}
                                {<ItemIcon data={itemMap.get(participant.item6.toString())} size={30} radius={true} />}
                            </div> : <></>}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}