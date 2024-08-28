"use client";

/* React */
import { useState, useEffect } from "react";
/* NextUI */
import {
	Button,
	ModalHeader, ModalBody, ModalFooter, ModalProps, useDisclosure,
	Badge, Avatar,
	Pagination,
	Image,
} from "@nextui-org/react";
/* Component */
import { ChampionStatTable } from "@/components/table/champion-stat-table";


/* Redux */
import { modalChampionSelector } from '@/app/redux/slice/modalChampion'
import { 
	PSkill,
	QSkill,
	WSkill,
	ESkill,
	RSkill
 } from "../skill/skill";
import { useAppSelector } from "@/app/redux/hooks";

export const ChampionModal = ({ onClose, }: { onClose: () => void }) => {
	
    const modalChampion = useAppSelector(modalChampionSelector);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setCurrentPage(1);
	}, [modalChampion])

	if(modalChampion.key > 0) {
		return (
			<>
				<ModalHeader className="flex flex-row text-xl items-center gap-1">{modalChampion.name}<span className="text-sm ml-2 font-normal">{modalChampion.title}</span></ModalHeader>
				<ModalBody>
					<div className="flex flex-row border-2 border-zinc-300 dark:border-zinc-500 gap-2 p-2 rounded-lg">
						<Image
							className="w-full"
							src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/champion/${modalChampion.id}.png`}
							alt={modalChampion.name}/>
						{/* 설명 */}
						<div className="w-full text-sm">{modalChampion.lore}</div>
					</div>
	
					<div className="text-xl font-bold">스킬</div>

					<div className="flex flex-col gap-5 p-2 border-2 border-zinc-300 dark:border-zinc-500 rounded-lg">
						
						{/* 패시브 */}
						<PSkill />

						{/* Q 스킬 */}
						<QSkill />

						{/* W 스킬 */}
						<WSkill />

						{/* E 스킬 */}
						<ESkill />

						{/* R 스킬 */}
						<RSkill />
					</div>
					

					<div className="text-xl font-bold">스텟</div>
					<div className="border-2 border-zinc-300 dark:border-zinc-500 rounded-lg">
						{ChampionStatTable(modalChampion!)}
					</div>
	
					<div className="text-xl font-bold">스킨</div>
					{/* 메인 이미지 */}
					<div className="flex items-center justify-center w-full">
						<Image
							src={`${process.env.NEXT_PUBLIC_DB_URL}/img/champion/centered/${modalChampion.id}_${modalChampion.skins[currentPage - 1 ?? 0].num}.jpg`}
							alt={modalChampion.name}/>
					</div>
					
					<div className="flex items-center justify-center text-sm">
						{modalChampion.skins[currentPage - 1 ?? 0].name == "default" ?
							modalChampion.name : modalChampion.skins[currentPage - 1 ?? 0].name}
					</div>

					<div className="pt-1 flex items-center justify-center">
						<Pagination loop showControls
							color="default"
							total={modalChampion.skins.length ?? 1}
							page={currentPage}
							onChange={setCurrentPage} />
					</div>
				</ModalBody>
				<ModalFooter>
					<Button color="primary" onPress={onClose}>
						닫기
					</Button>
				</ModalFooter>
			</>);
	} else {
		return <></>
	}
}