"use client";

/* React */
import { useState, useEffect, useMemo } from "react";

/* Type */
import {
    Account,
    UserName,
} from "@/types";

/* NextUI */
import {
    Input,
    Button,
} from "@nextui-org/react";

/* Component */
import { SearchList } from "@/components/list/search-list"

export const MainPageComponent = () => {
    const [summoners, setSummoners] = useState<UserName[]>([]);
    const [value, setValue] = useState("");

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
    }, [])


    const handleClickHistory = async (name: UserName) => {
        search(name.gameName + '#' + name.tagLine);
    };
    const handleClickRecommand = async (name: UserName) => {
        search(name.gameName + '#' + name.tagLine);
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

                window.location.href = `match?gameName=${gameName}&tagLine=${tagLine}`;
            }
        } else {
            return;
        }
        return;
    };



    return (
        <>
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
        </>
    );
};
