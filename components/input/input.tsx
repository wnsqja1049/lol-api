
/* NextUI */
import {
	Input, 
} from "@nextui-org/react";

export const SearchChampionInput = ({ value, setValue}: { value: string, setValue: (value: string) => void }) => {
    return (
        <Input type="text"
            className="max-w-xs"
            isClearable
            label="챔피언 검색 (가렌, ㄱㄹ,...)"
            value={value}
            onValueChange={setValue} />
    )
}

export const SearchSummonerInput = ({ isInvalid, value, setValue, search}: { isInvalid: boolean | undefined, value: string, setValue: (value: string) => void, search: (value: string) => void }) => {
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            search(value);
        }
    }

    return (
        <Input
            type="text"
            label="플레이어 이름 + #KR1"
            value={value}
            onValueChange={setValue}
            isInvalid={isInvalid}
            color={isInvalid ? "default" : "default"}
            errorMessage={isInvalid && <div><b>플레이어 이름#태그</b>로 검색하세요</div>}
            onKeyDown={handleKeyDown} />
    )
}