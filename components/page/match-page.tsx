"use client";

/* React */
import { useState, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/* Type */
import {
    Account,
    UserName,
    Profile,
    Match,
    MatchParticipantPerks, 
    Champion,
    ChampionDetail,
    Spell,
    Item,
    Perk, 
    Augment, 
    Rank, 
} from "@/types";

/* Data */
import {
    fetchRank, 
    fetchChampion,
    fetchAccountByName,
    fetchProfile,
    fetchMatches,
    fetchMatch,
    fetchChampionList,
    fetchSpellList,
    fetchItemList, 
    fetchPerkList, 
    fetchAugmentList, 
} from "@/data/api";

import {
    getSearchUser, 
    getUserTeam, 
    setTeams, 
    getTierText, 
    getTierNumberText, 
    getWinRate, 
    GetSearchHistoryList,
} from "@/data/functions";

/* NextUI */
import {
    Input,
    Badge, Avatar,
    Modal, ModalContent, ModalProps, useDisclosure,
    Button,
    Chip,
    CircularProgress, 
    Card, CardHeader, CardBody, Divider, Image, 
} from "@nextui-org/react";

/* Component */
import { ChampionModal } from "@/components/modal/champion-modal"
import { PerkModal } from "@/components/modal/perk-modal"
import { TimeStampToTimeBefore } from "@/components/timer"

import { SearchList } from "@/components/list/search-list"
import { MatchListItem } from "@/components/list/match-list"
import { SearchHistoryChip } from "@/components/chip"

export const MatchPageComponent = () => {

    const pathname = usePathname()
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const [summoners, setSummoners] = useState<UserName[]>([]);
    const [value, setValue] = useState("");

    const [account, setAccount] = useState<Account>();
    const [profile, setProfile] = useState<Profile>();

    const [soloRank, setSoloRank] = useState<Rank>();
    const [flexRank, setFlexRank] = useState<Rank>();
    const [arenaRank, setArenaRank] = useState<Rank>();

    const [matchIdList, setMatchIdList] = useState<string[]>();
    const [matchList, setMatchList] = useState<Match[]>();
    const [match, setMatch] = useState<Match>();

    const [championMap, setChampionMap] = useState<Map<string, Champion>>();
    const [itemMap, setItemMap] = useState<Map<string, Item>>();
    const [spellMap, setSpellMap] = useState<Map<string, Spell>>();
    const [perkMap, setPerkMap] = useState<Map<string, Perk>>();
    const [augmentMap, setAugmentMap] = useState<Map<string, Augment>>();

    const [modalContent, setModalContent] = useState<String>();
    const [modalChampion, setModalChampion] = useState<ChampionDetail>();
    const [modalPerks, setModalPerks] = useState<MatchParticipantPerks>();

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [scrollBehavior, setScrollBehavior] = useState<ModalProps["scrollBehavior"]>("inside");

    const isInvalid = useMemo(() => {

        if (value === "") return false;

    }, [value]);

    useEffect(() => {
        var summoners: UserName[] = GetSearchHistoryList();
        setSummoners(summoners);

        getChampionMap();
        getSpellMap();
        getItemMap();
        getPerkMap();
        getAugmentMap();

        var gameName = searchParams.get("gameName");
        var tagLine = searchParams.get("tagLine");

        if(gameName && tagLine) {
            getAccountAndProfile(gameName, tagLine);
        }
    }, [])

    useEffect(() => {
    }, [summoners])


    const setSearchParam = (gameName: string, tagLine: string) => {
        const params = new URLSearchParams(searchParams);
        if (gameName) {
            params.set('gameName', gameName);
        } else {
            params.delete('gameName');
        }

        if (tagLine) {
            params.set('tagLine', tagLine);
        } else {
            params.delete('tagLine');
        }

        replace(`${pathname}?${params.toString()}`);
    };


    const handleClickHistory = async (name: UserName) => {

        setSearchParam(name.gameName, name.tagLine);

        setValue(name.gameName + '#' + name.tagLine);

        getAccountAndProfile(name.gameName, name.tagLine);

        return;
    };
    const handleDeleteHistory = (name: UserName) => {

        var filteredNameList = summoners.filter((filteredName) => ((filteredName.gameName !== name.gameName) || (filteredName.tagLine !== name.tagLine)));

        setSummoners(filteredNameList);
        localStorage.setItem('searchUserList', JSON.stringify(filteredNameList));
    };
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            search(value);
        }
    }



    const search = async (value: string) => {

        if (value === "") {
            return;
        }

        var result = value.split('#');

        if (result.length === 2) {
            if (result[1].length > 0) {

                var gameName = result[0];
                var tagLine = result[1];

                var isSame = false;

                for (let i = 0; i < summoners.length; i++) {
                    if (summoners[i].gameName == gameName && summoners[i].tagLine == tagLine) {
                        isSame = true;
                    }
                }

                if (!isSame) {
                    var newSummoners = summoners;
                    newSummoners.unshift({ gameName: gameName, tagLine: tagLine });
                    setSummoners(newSummoners);
                    localStorage.setItem('searchUserList', JSON.stringify(newSummoners));
                }

                setSearchParam(gameName, tagLine);
                getAccountAndProfile(gameName, tagLine);
            }
        } else {
            return;
        }
        return;
    };

    const getAccountAndProfile = async (gameName: string, tagLine: string) => {

        var accountResponse = await fetchAccountByName(gameName, tagLine);

        if (accountResponse.status.status_code === 200) {
            var account = await accountResponse.data;
            setAccount(account);

            var profileResponse = await fetchProfile(account.puuid);

            if (profileResponse.status.status_code === 200) {
                var profile: Profile = await profileResponse.data;

                var rankResponse = await fetchRank(profile.id);

                if(rankResponse.status.status_code === 200) {
                    var rankList: Rank[] = await rankResponse.data;

                    for(let i = 0; i < rankList.length; i++) {
                        if(rankList[i].queueType === "RANKED_SOLO_5x5") {
                            setSoloRank(rankList[i]);
                        }
                        if(rankList[i].queueType === "RANKED_FLEX_SR") {
                            setFlexRank(rankList[i]);
                        }
                        if(rankList[i].queueType === "CHERRY") {
                            setArenaRank(rankList[i]);
                        }
                    }

                } else {
                    if (rankResponse.status.status_code === 403) {
                        alert('API 키가 만료되었습니다.');
                    }
                    if (rankResponse.status.status_code === 429) {
                        alert('API 요청 한계를 초과하였습니다. 잠시 후 다시 시도해 주세요.');
                    }
                }
                setProfile(profile);

                getMatches(profile.puuid);

            } else {
                if (profileResponse.status.status_code === 403) {
                    alert('API 키가 만료되었습니다.');
                }
                if (profileResponse.status.status_code === 404) {
                    alert('소환사 정보를 찾을 수 없습니다.');
                }
                if (profileResponse.status.status_code === 429) {
                    alert('API 요청 한계를 초과하였습니다. 잠시 후 다시 시도해 주세요.');
                }
            }

        } else {
            if (accountResponse.status.status_code === 403) {
                alert('API 키가 만료되었습니다.');
            }
            if (accountResponse.status.status_code === 404) {
                alert('소환사 정보를 찾을 수 없습니다.');
            }
            if (accountResponse.status.status_code === 429) {
                alert('API 요청 한계를 초과하였습니다. 잠시 후 다시 시도해 주세요.');
            }
        }
    }



    const getMatches = async (puuid: string) => {

        var res = await fetchMatches(puuid);

        if (res.status.status_code === 200) {
            var matchIdList = await res.data;
            var matchList:Match[] = [];

            setMatchIdList(matchIdList);

            for(let i = 0; i < matchIdList.length; i++) {
                var match:Match = await getNewMatch(matchIdList[i]);
                setTeams(match);
                matchList.push(match);
            }
            setMatchList(matchList);

        } else {
            if (res.status.status_code === 403) {
                alert('API 키가 만료되었습니다.');
            }
            if (res.status.status_code === 404) {
                alert('매치 정보를 찾을 수 없습니다.');
            }
        }
    }
    const getNewMatch = async (matchId: string) => {

        var res = await fetchMatch(matchId);

        if (res.status.status_code === 200) {
            var match = await res.data;
            return match;
        }
    }



    const getChampionMap = async () => {

        var res = await fetchChampionList();

        if (res.status.status_code === 200) {
            var champions = await res.data;

            let championMap = new Map<string, Champion>();

            for (var key in champions.data) {
                var champion = champions.data[key];

                championMap.set(champion.key, champion);
            }

            setChampionMap(championMap);
        } else {
            alert('데이터 오류.');
        }
    }
    const getSpellMap = async () => {

        var res = await fetchSpellList();

        if (res.status.status_code === 200) {
            var spells = await res.data;

            let spellMap = new Map<string, Spell>();

            for (var key in spells.data) {
                var spell = spells.data[key];

                spellMap.set(spell.key, spell);
            }

            setSpellMap(spellMap);
        } else {
            alert('데이터 오류.');
        }
    }
    const getItemMap = async () => {

        var res = await fetchItemList();

        if (res.status.status_code === 200) {
            var items = await res.data;

            let itemMap = new Map<string, Item>();

            for (var key in items.data) {
                var item = items.data[key];
                item.id = Number(key);

                itemMap.set(key, item);
            }

            setItemMap(itemMap);
        } else {
            alert('데이터 오류.');
        }
    }
    const getPerkMap = async () => {

        var res = await fetchPerkList();

        if (res.status.status_code === 200) {
            var perks = await res.data;

            let perkMap = new Map<string, Perk>();

            for (let i = 0; i < perks.length; i++) {
                var perk = perks[i];
                var slots = perk.slots;

                perkMap.set(perk.id.toString(), perk);

                for(let j = 0; j < slots.length; j++) {
                    var slot = slots[j];
                    var runes = slot.runes;

                    for(let k = 0; k < runes.length; k++) {
                        var rune = runes[k];

                        perkMap.set(rune.id.toString(), rune);
                    }
                }
            }

            setPerkMap(perkMap);
        } else {
            alert('데이터 오류.');
        }
    }
    const getAugmentMap = async () => {

        var res = await fetchAugmentList();

        if (res.status.status_code === 200) {
            var data = await res.data;
            var augments = data.augments;

            let augmentMap = new Map<string, Augment>();

            for(let i = 0; i < augments.length; i++) {
                var item = augments[i];
                augmentMap.set(item.id.toString(), item);
            }

            setAugmentMap(augmentMap);

        } else {
            alert('데이터 오류.');
        }
    }

    return (
        <>
            <Modal size="lg"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                scrollBehavior={scrollBehavior}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            {modalContent === "Champion" ?
                                <ChampionModal onClose={onClose} modalChampion={modalChampion} /> :
                                <PerkModal onClose={onClose} perks={modalPerks} perkMap={perkMap}/>
                            }
                        </>
                    )}
                </ModalContent>
            </Modal>

            <div className="flex flex-row gap-2 mb-5">
                <Input
                    type="text"
                    label="플레이어 이름 + #KR1"
                    value={value}
                    onValueChange={setValue}
                    isInvalid={isInvalid}
                    color={isInvalid ? "default" : "default"}
                    errorMessage={isInvalid && <div><b>플레이어 이름#태그</b>로 검색하세요</div>}
                    onKeyDown={handleKeyDown}/>
                <Button className="h-[56px]" color="primary" onPress={() => search(value)}>검색</Button>
            </div>


            <SearchList
                handleClick={(name) => handleClickHistory(name)}
                handleClose={(name) => handleDeleteHistory(name)} />

            {account && profile ?
                <div>
                    <div className="flex flex-wrap gap-2 mb-5">
                        <Card className="w-[350px] dark:bg-zinc-900 border-1 dark:border-0">
                            <CardBody className="flex gap-3">
                                <div className="p-4 flex flex-row space-x-2">
                                    <Badge className="bg-black text-white" content={profile.summonerLevel} color="default" placement="bottom-right" showOutline={false}>
                                        <Avatar className="w-20 h-20 text-large" isBordered radius="sm" src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/profileicon/${profile.profileIconId}.png`} alt={profile.profileIconId.toString()} />
                                    </Badge>
                                    <div className="flex flex-col items-start">
                                        <div><span className="font-extrabold">{account.gameName.toString()}</span>#{account.tagLine.toString()}</div>
                                        <div className="flex flex-row text-sm text-default-500">
                                            <div>마지막 게임: </div>
                                            <TimeStampToTimeBefore timeStamp={profile.revisionDate} />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        <Card className="w-[350px] dark:bg-zinc-900 dark:border-0">
                            <CardHeader>
                                <p className="text-md">솔로랭크</p>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                {soloRank ?
                                    <div className="flex flex-row justify-between items-center">
                                        <Image width={100} height={100} src={`/Rank=${getTierText(soloRank.tier)}.png`} />
                                        <div>
                                            <div className="text-xl font-bold">
                                                {getTierText(soloRank.tier)}<span>{getTierNumberText(soloRank.rank)}</span>
                                            </div>
                                            <div className="text-sm text-default-500">{soloRank.leaguePoints}LP</div>
                                        </div>
                                        <div className="text-sm text-default-500">
                                            <div>{soloRank.wins}승 {soloRank.losses}패</div>
                                            <div>승률 {getWinRate(soloRank)}</div>
                                        </div>
                                    </div> : <div className="text-sm h-[100px] content-center">Unranked</div>}
                            </CardBody>
                        </Card>
                        <Card className="w-[350px] dark:bg-zinc-900 dark:border-0">
                            <CardHeader>
                                <p className="text-md">자유랭크</p>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                {flexRank ?
                                    <div className="flex flex-row justify-between items-center">
                                        <Image width={100} height={100} src={`/Rank=${getTierText(flexRank.tier)}.png`} />
                                        <div>
                                            <div className="text-xl font-bold">
                                                {getTierText(flexRank.tier)}<span>{getTierNumberText(flexRank.rank)}</span>
                                            </div>
                                            <div className="text-sm text-default-500">{flexRank.leaguePoints}LP</div>
                                        </div>
                                        <div className="text-sm text-default-500">
                                            <div>{flexRank.wins}승 {flexRank.losses}패</div>
                                            <div>승률 {getWinRate(flexRank)}</div>
                                        </div>
                                    </div> : <div className="text-sm h-[100px] content-center">Unranked</div>}
                            </CardBody>
                        </Card>
                    </div>

                    {matchList ? <></> : <CircularProgress aria-label="Loading..." color="danger"/>}

                    <div className="w-full flex flex-col gap-2">
                        {matchList ? matchList.map((match: Match) => {
                            return (
                                <div key={match.metadata.matchId}>
                                    <MatchListItem 
                                    match={match}
                                    searchedUser={getSearchUser(account.puuid, match.info.participants)!}
                                    championMap={championMap}
                                    itemMap={itemMap}
                                    spellMap={spellMap}
                                    perkMap={perkMap}
                                    augmentMap={augmentMap}
                                    onClickChampion={async (participant) => {
                                        var res = await fetchChampion(participant.championName);

                                        if(res.status.status_code === 200) {
                                            var data = await res.data;
                                            var champion = data.data;
                                            setModalContent("Champion");
                                            setModalChampion(champion[participant.championName]);
                                            onOpen();
                                        } else {
                                            alert('데이터 오류.');
                                        }
                                    }}
                                    onClickPerk={(perks) => {
                                        setModalContent("Perks");
                                        setModalPerks(perks);
                                        onOpen();
                                    }}
                                    onClickParticipant={(participant) => {
                                        search(participant.riotIdGameName + "#" + participant.riotIdTagline);
                                    }}
                                    />
                                </div>
                            )
                        }) : <></>}
                    </div>
                </div> : <></>}
        </>
    );
};
