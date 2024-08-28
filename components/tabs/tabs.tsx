
/* NextUI */
import {
	Tabs, Tab
} from "@nextui-org/react";

export const ItemFilterTabs = ({ value, setValue}: { value: string, setValue: (value: string) => void }) => {
    return (
        <Tabs aria-label="Options"
            selectedKey={value}
            onSelectionChange={(key)=>{setValue(key.toString())}}>
            <Tab key="11" title="소환사의 협곡"></Tab>
            <Tab key="12" title="칼바람 나락"></Tab>
            <Tab key="30" title="아레나"></Tab>
        </Tabs>
    )
}

export const ChampionFilterTabs = ({ value, setValue}: { value: string, setValue: (value: string) => void }) => {
    return (
        <Tabs aria-label="Options"
            selectedKey={value}
            onSelectionChange={(key) => { setValue(key.toString()) }}>
            <Tab key="" title="전체"></Tab>
            <Tab key="ㄱ" title="ㄱ"></Tab>
            <Tab key="ㄴ" title="ㄴ"></Tab>
            <Tab key="ㄷ" title="ㄷ"></Tab>
            <Tab key="ㄹ" title="ㄹ"></Tab>
            <Tab key="ㅁ" title="ㅁ"></Tab>
            <Tab key="ㅂ" title="ㅂ"></Tab>
            <Tab key="ㅅ" title="ㅅ"></Tab>
            <Tab key="ㅇ" title="ㅇ"></Tab>
            <Tab key="ㅈ" title="ㅈ"></Tab>
            <Tab key="ㅊ" title="ㅊ"></Tab>
            <Tab key="ㅋ" title="ㅋ"></Tab>
            <Tab key="ㅌ" title="ㅌ"></Tab>
            <Tab key="ㅍ" title="ㅍ"></Tab>
            <Tab key="ㅎ" title="ㅎ"></Tab>
        </Tabs>
    )
}