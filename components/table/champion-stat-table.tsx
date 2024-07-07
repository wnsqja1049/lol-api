"use client";

/* Data Type */
import {
	ChampionDetail,
} from "@/types";

/* NextUI */
import {
	Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
} from "@nextui-org/react";


export const ChampionStatTable = (detailData: ChampionDetail) => {
	return (
		<div className="p-2">
			<Table hideHeader isCompact removeWrapper aria-label="champion stat table">
				<TableHeader>
					<TableColumn>능력치(성장능력치)</TableColumn>
					<TableColumn>성장스탯</TableColumn>
				</TableHeader>
				<TableBody emptyContent={"데이터가 없습니다."}>
					<TableRow>
						<TableCell className="text-tiny">체력 : {detailData?.stats.hp}(+{detailData?.stats.hpperlevel})</TableCell>
						<TableCell className="text-tiny">체력재생 : {detailData?.stats.hpregen}(+{detailData?.stats.hpregenperlevel})</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-tiny">마나(기력) : {detailData?.stats.mp}(+{detailData?.stats.mpperlevel})</TableCell>
						<TableCell className="text-tiny">자원재생 : {detailData?.stats.mpregen}(+{detailData?.stats.mpregenperlevel})</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-tiny">방어력 : {detailData?.stats.armor}(+{detailData?.stats.armorperlevel})</TableCell>
						<TableCell className="text-tiny">마법저항력 : {detailData?.stats.spellblock}(+{detailData?.stats.spellblockperlevel})</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-tiny">공격력 : {detailData?.stats.attackdamage}(+{detailData?.stats.attackdamageperlevel})</TableCell>
						<TableCell className="text-tiny">공격 속도 : {detailData?.stats.attackspeed}(+{detailData?.stats.attackspeedperlevel})</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-tiny">이동속도 : {detailData?.stats.movespeed}</TableCell>
						<TableCell className="text-tiny">공격 사거리 : {detailData?.stats.attackrange}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	)
}