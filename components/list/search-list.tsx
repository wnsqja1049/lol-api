"use client";
/* React */
import React from "react";
/* Type */
import { UserName } from "@/types";
/* Data */
import { GetSearchHistoryList } from "@/data/functions";
/* Component */
import { SearchHistoryChip } from "@/components/chip"

export const SearchList = ({ 
    handleClick,
    handleClose,  
}: { 
    handleClick: (name: UserName) => void,
    handleClose: (name: UserName) => void,
}) => {

    var nameList:UserName[] = GetSearchHistoryList();

    return (
        <div>
            <div className="mb-2">최근 검색 기록</div>

            {nameList.map((name) => (
                <SearchHistoryChip
                    key={name.gameName + "#" + name.tagLine}
                    name={name}
                    handleClick={(name) => handleClick(name)}
                    handleClose={(name) => handleClose(name)} />
            ))}
        </div>
    );
};
