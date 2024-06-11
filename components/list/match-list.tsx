"use client";

/* React */
import { useState } from "react";

/* Data */
import {
    getGameType,
    setTeams, 
    isUserWin,
    isArena, 
    getKDA,
    getLargestDealtDamage,
    getLargestTakenDamage
} from "@/data/functions";

/* Data Type */
import {
    Item,
    Champion,
    Match, 
    MatchParticipant,
    Spell,
    Perk,
    Augment, 
    MatchParticipantPerks,
} from "@/types";

/* NextUI */
import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
    Button
} from "@nextui-org/react";

/* Component */
import { PerkIcon, SpellIcon, ItemIcon, ChampionIcon, SmallChampionIcon, AugmentIcon } from "@/components/tooltip-icon"
import { CompactGameDuration, TimeStampToTimeBefore } from "@/components/timer"
import { TeamTable } from "@/components/table/team-table"
import { ArenaTeamTable } from "@/components/table/arena-team-table"
import { ChevronIcon } from "@/components/icons"


export const MatchListItem = ({
    match, 
    searchedUser,
    championMap,
    itemMap,
    spellMap,
    perkMap,
    augmentMap,
    onClickChampion,
    onClickPerk,
    onClickParticipant,
}: {
    match: Match | undefined,
    searchedUser: MatchParticipant | undefined,
    championMap: Map<string, Champion> | undefined,
    itemMap: Map<string, Item> | undefined,
    spellMap: Map<string, Spell> | undefined,
    perkMap: Map<string, Perk> | undefined,
    augmentMap: Map<string, Augment> | undefined,
    onClickChampion: (participant: MatchParticipant) => void,
    onClickPerk: (perks: MatchParticipantPerks) => void,
    onClickParticipant: (participant: MatchParticipant) => void,
}) => {

    var bgBlue = "bg-blue-50 dark:bg-blue-900 ";
    var bgUserBlue = "bg-blue-100 dark:bg-blue-800 ";
    
    var bgRed = "bg-red-50 dark:bg-red-900 ";
    var bgUserRed = "bg-red-100 dark:bg-red-800 ";

    var borderBlue = "border-blue-100 dark:border-blue-800 ";
    var borderRed = "border-red-100 dark:border-red-800 ";

    var textBlue = "text-blue-500 dark:text-blue-500 ";
    var textRed = "text-red-500 dark:text-red-500 ";

    var bgColor = "";
    var bgUserColor = "";
    var borderColor = "";
    var textColor = "";


    const [isOpen, setIsOpen] = useState(false);


    if(match) {
        setTeams(match);
        
        if(searchedUser) {
            bgColor = isUserWin(searchedUser.puuid, match) ? bgBlue : bgRed;
            bgUserColor = isUserWin(searchedUser.puuid, match) ? bgUserBlue : bgUserRed;
            borderColor = isUserWin(searchedUser.puuid, match) ? borderBlue : borderRed;
            textColor = isUserWin(searchedUser.puuid, match) ? textBlue : textRed;
        }
    }

    return (
        <>
            {match ? 
            <>
                {searchedUser ?
                <>
                {championMap ? 
                    <>
                        {isArena(match) ? 
                        <Table className={"rounded-l-lg border-l-8 " + borderColor} removeWrapper hideHeader color="primary" aria-label={"team table " + match.metadata.matchId}>
                            <TableHeader>
                                <TableColumn> </TableColumn>
                                <TableColumn> </TableColumn>
                                <TableColumn> </TableColumn>
                                <TableColumn align="end"> </TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"데이터가 없습니다."}>
                                <TableRow>
                                    {/* 게임정보 */}
                                    <TableCell className={bgColor + "w-[120px] text-match-table"}>
                                        <div className={textColor + "font-bold"}>{getGameType(match.info.queueId)}</div>
                                        <TimeStampToTimeBefore timeStamp={match.info.gameEndTimestamp} />
                                        <div className="flex flex-row gap-1">
                                        <div className={textColor + "font-bold"}>{isUserWin(searchedUser.puuid, match) ? '승리' : '패배'}</div>
                                            <CompactGameDuration gameDuration={match.info.gameDuration} />
                                        </div>
                                    </TableCell>
                                    {/* 소환사 */}
                                    <TableCell className={bgColor + "w-[250px] text-match-table"}>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row itemList-center pl-1">
                                                {championMap ? <ChampionIcon
                                                    size="lg"
                                                    withLevel={false}
                                                    data={championMap.get(searchedUser.championId.toString())}
                                                    participant={searchedUser}
                                                    onClick={() => {
                                                        onClickChampion(searchedUser)
                                                    }} /> : <></>}
                                                {spellMap ?
                                                    <div className="mx-1">
                                                        <div className="flex flex-col gap-1">
                                                            <SpellIcon size={25} data={spellMap.get(searchedUser.summoner1Id.toString())} />
                                                            <SpellIcon size={25} data={spellMap.get(searchedUser.summoner2Id.toString())} />
                                                        </div>
                                                    </div> : <></>}
                                                    {augmentMap ?
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex flex-row gap-1">
                                                            <AugmentIcon size={25} data={augmentMap.get(searchedUser.playerAugment1.toString())} />
                                                            <AugmentIcon size={25} data={augmentMap.get(searchedUser.playerAugment2.toString())} />
                                                        </div>
                                                        <div className="flex flex-row gap-1">
                                                            <AugmentIcon size={25} data={augmentMap.get(searchedUser.playerAugment3.toString())} />
                                                            <AugmentIcon size={25} data={augmentMap.get(searchedUser.playerAugment4.toString())} />
                                                        </div>
                                                    </div> : <></>}
                                                <div className="flex flex-col font-bold text-sm ml-1">
                                                    <div>{searchedUser.kills} / {searchedUser.deaths} / {searchedUser.assists}</div>
                                                    <div>
                                                        {getKDA(searchedUser.kills, searchedUser.deaths, searchedUser.assists)}
                                                        {getKDA(searchedUser.kills, searchedUser.deaths, searchedUser.assists) === "Perfect" ? "" : " KDA"}
                                                    </div>
                                                </div>
                                            </div>
                                            {itemMap ?
                                                <div className="flex flex-row mt-3">
                                                    {<ItemIcon data={itemMap.get(searchedUser.item0.toString())} size={25} radius={true} />}
                                                    {<ItemIcon data={itemMap.get(searchedUser.item1.toString())} size={25} radius={true} />}
                                                    {<ItemIcon data={itemMap.get(searchedUser.item2.toString())} size={25} radius={true} />}
                                                    {<ItemIcon data={itemMap.get(searchedUser.item3.toString())} size={25} radius={true} />}
                                                    {<ItemIcon data={itemMap.get(searchedUser.item4.toString())} size={25} radius={true} />}
                                                    {<ItemIcon data={itemMap.get(searchedUser.item5.toString())} size={25} radius={true} />}
                                                    {<ItemIcon data={itemMap.get(searchedUser.item6.toString())} size={25} radius={true} />}
                                                </div> : <></>}
                                        </div>
                                    </TableCell>
                                    <TableCell className={bgColor + "w-[300px] text-match-table text-center text-sm"}>
                                        {championMap ?
                                            <div>
                                                {match.info.teams.map((team) => (
                                                    <div key={team.teamId} className="flex flex-row">
                                                        {team.participants.map((participant) => (
                                                            <div key={participant.puuid} className="flex flex-row">
                                                                <SmallChampionIcon
                                                                    withLevel={false}
                                                                    data={championMap.get(participant.championId.toString())}
                                                                    participant={participant}
                                                                    onClick={() => {
                                                                        onClickChampion(participant)
                                                                    }} />
                                                                <div onClick={() => { onClickParticipant(participant) }} className={searchedUser.puuid === participant.puuid ? "font-bold" : "" + "ml-1 whitespace-nowrap text-ellipsis overflow-hidden text-left w-[100px] cursor-pointer hover:underline"}>{participant.riotIdGameName}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div> : <></>}
                                    </TableCell>
                                    <TableCell className={bgColor + "text-right text-match-table rounded-r-lg"} align="right">
                                        <Button className={bgUserColor + "h-[160px] w-[10px]"} onClick={()=>{setIsOpen(!isOpen)}}><div className={isOpen ? "" : "rotate-180"}><ChevronIcon className="rotate-90"/></div></Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table> : 
                        <Table className={"rounded-l-lg border-l-8 " + borderColor} removeWrapper hideHeader color="primary" aria-label={"team table " + match.metadata.matchId}>
                            <TableHeader>
                                <TableColumn> </TableColumn>
                                <TableColumn> </TableColumn>
                                <TableColumn> </TableColumn>
                                <TableColumn align="end"> </TableColumn>
                            </TableHeader>
                            <TableBody emptyContent={"데이터가 없습니다."}>
                                <TableRow>
                                    {/* 게임정보 */}
                                    <TableCell className={bgColor + "w-[120px] text-match-table"}>
                                        <div className={textColor + "font-bold"}>{getGameType(match.info.queueId)}</div>
                                        <TimeStampToTimeBefore timeStamp={match.info.gameEndTimestamp} />
                                        <div className="flex flex-row gap-1">
                                            <div className={textColor + "font-bold"}>{isUserWin(searchedUser.puuid, match) ? '승리' : '패배'}</div>
                                            <CompactGameDuration gameDuration={match.info.gameDuration} />
                                        </div>
                                    </TableCell>
                                    {/* 소환사 */}
                                    <TableCell className={bgColor + "w-[250px] text-match-table"}>
                                        <div className="flex flex-col">
                                            <div className="flex flex-row itemList-center pl-1">
                                                {championMap ? <ChampionIcon
                                                    size="lg"
                                                    withLevel={false}
                                                    data={championMap.get(searchedUser.championId.toString())}
                                                    participant={searchedUser}
                                                    onClick={() => {
                                                        onClickChampion(searchedUser)
                                                    }} /> : <></>}
                                                {spellMap ?
                                                    <div className="mx-1">
                                                        <div className="flex flex-col gap-1">
                                                            <SpellIcon size={25} data={spellMap.get(searchedUser.summoner1Id.toString())} />
                                                            <SpellIcon size={25} data={spellMap.get(searchedUser.summoner2Id.toString())} />
                                                        </div>
                                                    </div> : <></>}
                                                {perkMap ?
                                                    <div className="flex flex-col gap-1">
                                                        <PerkIcon size={25} data={perkMap.get(searchedUser.perks.styles[0].selections[0].perk.toString())}
                                                            onClick={() => {
                                                                onClickPerk(searchedUser.perks)
                                                            }} />
                                                        <div className="w-[20px] h-[20px] ml-0.5 mt-0.5">
                                                            <PerkIcon size={20} data={perkMap.get(searchedUser.perks.styles[1].style.toString())}
                                                                onClick={() => {
                                                                    onClickPerk(searchedUser.perks)
                                                                }} />
                                                        </div>
                                                    </div> : <></>}
                                                <div className="flex flex-col font-bold text-sm ml-1">
                                                    <div>{searchedUser.kills} / {searchedUser.deaths} / {searchedUser.assists}</div>
                                                    <div>
                                                        {getKDA(searchedUser.kills, searchedUser.deaths, searchedUser.assists)}
                                                        {getKDA(searchedUser.kills, searchedUser.deaths, searchedUser.assists) === "Perfect" ? "" : " KDA"}
                                                    </div>
                                                </div>
                                            </div>
                                            {itemMap ?
                                                <div className="flex flex-row mt-3">
                                                    {<ItemIcon data={itemMap.get(searchedUser.item0.toString())} size={25} radius={true} />}
                                                    {<ItemIcon data={itemMap.get(searchedUser.item1.toString())} size={25} radius={true} />}
                                                    {<ItemIcon data={itemMap.get(searchedUser.item2.toString())} size={25} radius={true} />}
                                                    {<ItemIcon data={itemMap.get(searchedUser.item3.toString())} size={25} radius={true} />}
                                                    {<ItemIcon data={itemMap.get(searchedUser.item4.toString())} size={25} radius={true} />}
                                                    {<ItemIcon data={itemMap.get(searchedUser.item5.toString())} size={25} radius={true} />}
                                                    {<ItemIcon data={itemMap.get(searchedUser.item6.toString())} size={25} radius={true} />}
                                                </div> : <></>}
                                        </div>
                                    </TableCell>
                                    <TableCell className={bgColor + "w-[300px] text-match-table text-center text-sm"}>
                                        {championMap ?
                                            <div className="flex flex-row">
                                                {match.info.teams.map((team) => (
                                                    <div key={team.teamId} className="flex flex-col">
                                                        {team.participants.map((participant) => (
                                                            <div key={participant.puuid} className="flex flex-row">
                                                                <SmallChampionIcon
                                                                    withLevel={false}
                                                                    data={championMap.get(participant.championId.toString())}
                                                                    participant={participant}
                                                                    onClick={() => {
                                                                        onClickChampion(participant)
                                                                    }} />
                                                                <div onClick={() => { onClickParticipant(participant) }} className={searchedUser.puuid === participant.puuid ? "font-bold" : "" + "ml-1 whitespace-nowrap text-ellipsis overflow-hidden text-left w-[100px] cursor-pointer hover:underline"}>{participant.riotIdGameName}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div> : <></>}
                                    </TableCell>
                                    <TableCell className={bgColor + "text-right text-match-table rounded-r-lg"} align="right">
                                        <Button className={bgUserColor + "h-[100px] w-[10px]"} onClick={()=>{setIsOpen(!isOpen)}}><div className={isOpen ? "" : "rotate-180"}><ChevronIcon className="rotate-90"/></div></Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>}
                    </> : <></>}
                    <>
                        {isOpen ? isArena(match) ? 
                        match.info.teams.map((team) => (
                            <ArenaTeamTable
                                key={team.playerSubteamId}
                                puuid={searchedUser.puuid}
                                team={team}
                                championMap={championMap}
                                itemMap={itemMap}
                                spellMap={spellMap}
                                augmentMap={augmentMap}
                                largestDealtDamage={getLargestDealtDamage(match)}
                                largestTakenDamage={getLargestTakenDamage(match)}
                                onClickChampion={onClickChampion} />
                        )) : 
                        match.info.teams.map((team) => (
                            <TeamTable
                                key={match.metadata.matchId}
                                puuid={searchedUser.puuid}
                                team={team}
                                championMap={championMap}
                                itemMap={itemMap}
                                spellMap={spellMap}
                                perkMap={perkMap}
                                largestDealtDamage={getLargestDealtDamage(match)}
                                largestTakenDamage={getLargestTakenDamage(match)}
                                onClickChampion={onClickChampion}
                                onClickPerk={(perks) => {onClickPerk}}
                                onClickParticipant={(participant) => {onClickParticipant(participant)}}
                            />
                        )) : <></>}
                    </>
                </> : <></>}
            </> : <></>}
        </>
    );
}