"use client";
/* React */
import React from "react";
/* Type */
import { UserName } from "@/types";
/* Component */
import { SearchRecommandChip, SearchHistoryChip } from "@/components/chip"

export const SearchList = ({ 
    summoners, 
    handleClickRecommand,
    handleClickHistory,
    handleClose,  
}: { 
    summoners: UserName[],
    handleClickRecommand: (name: UserName) => void,
    handleClickHistory: (name: UserName) => void,
    handleClose: (name: UserName) => void,
}) => {

    var recommand: UserName[] = [
        {
            gameName: "God Thunder",
            tagLine: "dufma",
        },
        {
            gameName: "Oner",
            tagLine: "KR222",
        },
        {
            gameName: "hide on bush",
            tagLine: "KR1",
        },
        {
            gameName: "T1 Gumayusi",
            tagLine: "KR1",
        },
        {
            gameName: "역천괴",
            tagLine: "Ker10",
        },
    ]

    return (
        <div className="pt-2 pb-5">
            <div className="mb-2">추천 검색</div>

            <div className="flex flex-wrap gap-2">
                {recommand.map((name) => (
                    <SearchRecommandChip
                        key={name.gameName + "#" + name.tagLine}
                        name={name}
                        handleClick={(name) => handleClickRecommand(name)}/>
                ))}
            </div>

            {summoners.length > 0 ? <div className="my-2">최근 검색 기록</div> : <></>}
            

            <div className="flex flex-wrap gap-2">
                {summoners.map((name) => (
                    <SearchHistoryChip
                        key={name.gameName + "#" + name.tagLine}
                        name={name}
                        handleClick={(name) => handleClickHistory(name)}
                        handleClose={(name) => handleClose(name)} />
                ))}
            </div>
        </div>
    );
};
