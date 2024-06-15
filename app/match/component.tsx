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
    errorAccountByName,
    errorProfile,  
    errorRank, 
    errorMatches, 
    errorMatch, 
    errorAugmentList, 
    errorPerkList, 
    errorChampion,
    errorChampionList,
    errorSpellList,
    errorItemList, 
} from "@/data/apiError";

import {
    getSearchUser, 
    setTeams, 
} from "@/data/functions";

/* NextUI */
import {
    Input,
    Modal, ModalContent, ModalProps, useDisclosure,
    Button,
    CircularProgress, 
} from "@nextui-org/react";

/* Component */
import { ChampionModal } from "@/components/modal/champion-modal"
import { PerkModal } from "@/components/modal/perk-modal"

import { SearchList } from "@/components/list/search-list"
import { MatchListItem } from "@/components/list/match-list"
import { ProfileCard, RankCard } from "@/components/card"

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
        var data = localStorage.getItem("searchUserList");
        var nameList: any[] = [];

		if(data != null) {
			nameList = JSON.parse(data);
		}

        var summoners: UserName[] = nameList;
        setSummoners(summoners);

        if(!championMap) getChampionMap();
        if(!spellMap) getSpellMap();
        if(!itemMap) getItemMap();
        if(!perkMap) getPerkMap();
        if(!augmentMap) getAugmentMap();

        var gameName = searchParams.get("gameName");
        var tagLine = searchParams.get("tagLine");

        if(!account) {
            if(!profile) {
                if(gameName && tagLine) {
                    getAccountAndProfile(gameName, tagLine);
                    setValue(gameName + '#' + tagLine);
                }
            }
        }
    }, [])

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
    };
    const handleDeleteHistory = (name: UserName) => {

        var filteredNameList = summoners.filter((filteredName) => ((filteredName.gameName !== name.gameName) || (filteredName.tagLine !== name.tagLine)));

        setSummoners(filteredNameList);
        localStorage.setItem('searchUserList', JSON.stringify(filteredNameList));
    };
    const handleClickRecommand = async (name: UserName) => {

        setSearchParam(name.gameName, name.tagLine);

        setValue(name.gameName + '#' + name.tagLine);

        getAccountAndProfile(name.gameName, name.tagLine);


        var isSame = false;

        for (let i = 0; i < summoners.length; i++) {
            if (summoners[i].gameName == name.gameName && summoners[i].tagLine == name.tagLine) {
                isSame = true;
            }
        }

        if (!isSame) {
            var newSummoners = summoners;
            newSummoners.unshift({ gameName: name.gameName, tagLine: name.tagLine });
            setSummoners(newSummoners);
            localStorage.setItem('searchUserList', JSON.stringify(newSummoners));
        }
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

        setAccount(undefined);
        setProfile(undefined);
        setMatchList([]);

        var accountResponse = await fetchAccountByName(gameName, tagLine);

        if (accountResponse.status.status_code === 200) {
            var account = await accountResponse.data;
            setAccount(account);

            var profileResponse = await fetchProfile(account.puuid);

            if (profileResponse.status.status_code === 200) {
                var profile: Profile = await profileResponse.data;
                setProfile(profile);

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
                    errorRank(rankResponse.status.status_code);
                }

                getMatches(profile.puuid);

            } else {
                errorProfile(profileResponse.status.status_code);
            }

        } else {
            errorAccountByName(accountResponse.status.status_code);
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
            errorMatches(res.status.status_code);
        }
    }
    const getNewMatch = async (matchId: string) => {

        var res = await fetchMatch(matchId);

        if (res.status.status_code === 200) {
            var match = await res.data;
            return match;
        } else {
            errorMatch(res.status.status_code)
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
            errorChampionList(res.status.status_code);
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
            errorSpellList(res.status.status_code);
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
            errorItemList(res.status.status_code);
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
            errorPerkList(res.status.status_code);
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
            errorAugmentList(res.status.status_code);
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
                summoners={summoners}
                handleClickRecommand={(name) => handleClickRecommand(name)}
                handleClickHistory={(name) => handleClickHistory(name)}
                handleClose={(name) => handleDeleteHistory(name)} />

            {account && profile ?
                <div>
                    <div className="flex flex-wrap gap-2 mb-5">
                        <ProfileCard profile={profile} account={account}/>
                        <RankCard rankName="솔로랭크" rank={soloRank}/>
                        {/* <RankCard rankName="자유랭크" rank={flexRank}/> */}
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
                                            errorChampion(res.status.status_code);
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
