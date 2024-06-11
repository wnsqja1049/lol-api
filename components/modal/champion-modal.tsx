"use client";

/* React */
import { useState, useEffect } from "react";
/* NextUI */
import {
	Button,
	Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalProps, useDisclosure,
	Badge, Avatar,
	Pagination,
	Image,
} from "@nextui-org/react";
/* Component */
import { ChampionStatTable } from "@/components/table/champion-stat-table";
/* Type */
import { ChampionDetail } from "@/types";

/* Data */
import {
	GetSkillTooltip
} from "@/data/functions";


export const ChampionModal = ({ onClose, modalChampion }: { onClose: () => void, modalChampion: ChampionDetail | undefined }) => {
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		setCurrentPage(1);
	}, [modalChampion])

	if(modalChampion) {
		return (
			<>
				<ModalHeader className="flex flex-row text-xl items-center gap-1">{modalChampion.name}<span className="text-sm ml-2 font-normal">{modalChampion.title}</span></ModalHeader>
				<ModalBody>
					<div className="flex flex-row border-2 gap-2 p-2 rounded-lg">
						<Image
							className="w-full"
							src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/champion/${modalChampion.id}.png`}
							alt={modalChampion.name}
							placeholder="blur"/>
						{/* 설명 */}
						<div className="w-full text-sm">{modalChampion.lore}</div>
					</div>
	
					<div className="text-xl font-bold">스킬</div>

					<div className="flex flex-col gap-5 p-2 border-2 rounded-lg">
						{/* 패시브 */}
						<div>
							<div className="flex flex-row gap-2 px-2 py-2 items-center">
								<Badge content="P" color="default" size="sm" placement="bottom-right" showOutline={false} className="bg-black text-white">
									<Avatar isBordered radius="md" src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/passive/${modalChampion.passive.image.full}`} />
								</Badge>
								<p className="font-bold">{modalChampion.passive.name}</p>
							</div>
							<div className="text-xs py-2">
								<p dangerouslySetInnerHTML={{ __html: modalChampion.passive.description }}></p>
							</div>
						</div>

						{/* Q 스킬 */}
						<div>
							<div className="flex flex-row gap-2 px-2 py-2 items-center">
								<Badge content="Q" color="default" size="sm" placement="bottom-right" showOutline={false} className="bg-black text-white">
									<Avatar isBordered
										radius="md"
										src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/spell/${modalChampion.spells[0].image.full}`} />
								</Badge>
								<p className="font-bold">{modalChampion.spells[0].name}</p>
							</div>

							<div className="text-xs py-2">
								<p>재사용대기시간(초): {modalChampion.spells[0].cooldownBurn}</p>
								<p>소모: {modalChampion.spells[0].costBurn}</p>
								<p>범위: {modalChampion.spells[0].rangeBurn}</p>

								<p className="pt-3" dangerouslySetInnerHTML={{ __html: GetSkillTooltip(modalChampion.spells[0].tooltip) }}></p>
								<p className="pt-3">{modalChampion.spells[0].description}</p>
							</div>
						</div>

						{/* W 스킬 */}
						<div>
							<div className="flex flex-row gap-2 px-2 py-2 items-center">
								<Badge content="W" color="default" size="sm" placement="bottom-right" showOutline={false} className="bg-black text-white">
									<Avatar isBordered
										radius="md"
										src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/spell/${modalChampion.spells[1].image.full}`} />
								</Badge>
								<p className="font-bold">{modalChampion.spells[1].name}</p>
							</div>

							<div className="text-xs py-2">
								<p>재사용대기시간(초): {modalChampion.spells[1].cooldownBurn}</p>
								<p>소모: {modalChampion.spells[1].costBurn}</p>
								<p>범위: {modalChampion.spells[1].rangeBurn}</p>

								<p className="pt-3" dangerouslySetInnerHTML={{ __html: GetSkillTooltip(modalChampion.spells[1].tooltip) }}></p>
								<p className="pt-3">{modalChampion.spells[1].description}</p>
							</div>
						</div>

						{/* E 스킬 */}
						<div>
							<div className="flex flex-row gap-2 px-2 py-2 items-center">
								<Badge content="E" color="default" size="sm" placement="bottom-right" showOutline={false} className="bg-black text-white">
									<Avatar isBordered
										radius="md"
										src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/spell/${modalChampion.spells[2].image.full}`} />
								</Badge>
								<p className="font-bold">{modalChampion.spells[2].name}</p>
							</div>

							<div className="text-xs py-2">
								<p>재사용대기시간(초): {modalChampion.spells[2].cooldownBurn}</p>
								<p>소모: {modalChampion.spells[2].costBurn}</p>
								<p>범위: {modalChampion.spells[2].rangeBurn}</p>

								<p className="pt-3" dangerouslySetInnerHTML={{ __html: GetSkillTooltip(modalChampion.spells[2].tooltip) }}></p>
								<p className="pt-3">{modalChampion.spells[2].description}</p>
							</div>
						</div>

						{/* R 스킬 */}
						<div>
							<div className="flex flex-row gap-2 px-2 py-2 items-center">
								<Badge content="R" color="default" size="sm" placement="bottom-right" showOutline={false} className="bg-black text-white">
									<Avatar isBordered
										radius="md"
										src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/spell/${modalChampion.spells[3].image.full}`} />
								</Badge>
								<p className="font-bold">{modalChampion.spells[3].name}</p>
							</div>

							<div className="text-xs py-2">
								<p>재사용대기시간(초): {modalChampion.spells[3].cooldownBurn}</p>
								<p>소모: {modalChampion.spells[3].costBurn}</p>
								<p>범위: {modalChampion.spells[3].rangeBurn}</p>

								<p className="pt-3" dangerouslySetInnerHTML={{ __html: GetSkillTooltip(modalChampion.spells[3].tooltip) }}></p>
								<p className="pt-3">{modalChampion.spells[3].description}</p>
							</div>
						</div>
					</div>
					

					<div className="text-xl font-bold">스텟</div>
					{ChampionStatTable(modalChampion!)}
	
					<div className="text-xl font-bold">스킨</div>
					{/* 메인 이미지 */}
					<div className="flex items-center justify-center w-full">
						<Image
							src={`${process.env.NEXT_PUBLIC_DB_URL}/img/champion/centered/${modalChampion.id}_${modalChampion.skins[currentPage - 1 ?? 0].num}.jpg`}
							alt={modalChampion.name}
							placeholder="blur"
						/>
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