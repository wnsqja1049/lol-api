"use client";

/* React */
import { useState, useEffect } from "react";

/* Data */
import { 
	fetchChampionList, 
	fetchChampion,
	fetchRotationList
 } from "@/data/api";
 import {
	errorChampion,
	errorRotationList, 
	errorChampionList, 
 } from "@/data/apiError";

/* Data Type */
import { Champion, ChampionDetail } from "@/types";

/* NextUI */
import {
	Input, 
	Modal, ModalContent, ModalProps, useDisclosure,
	User,
	Tabs, Tab
} from "@nextui-org/react";

/* Component */
import { ChampionModal } from "@/components/modal/champion-modal"
import { title } from "@/components/primitives";

export const ChampionPageComponent = () => {

	const [ rotationIdList, setRotationIdList ] = useState<number[]>([]);
	const [ championList, setChampionList ] = useState<Champion[]>();
	const [ championMap, setChampionMap ] = useState<Map<string, Champion>>();

	const Hangul = require('hangul-js');

    useEffect(() => {
        getRotation();
		getChampionList();
    }, [])
	

    const getRotation = async () => {

        var res = await fetchRotationList();

        if(res.status.status_code === 200) {
            var rotation = await res.data;
			setRotationIdList(rotation.freeChampionIds);
        } else {
			errorRotationList(res.status.status_code);
        }
    }
	const getChampionList = async () => {
	
		var res = await fetchChampionList();
	
		if(res.status.status_code === 200) {
            var champions = await res.data;

			let championMap = new Map<string, Champion>();
			let championList = [];

			for(var key in champions.data) {
				var champion:Champion = champions.data[key];

				var dis = Hangul.disassemble(champion.name, true);
				var chosung = dis.reduce(
					function (prev: any, elem: any) {
					elem = elem[0] ? elem[0] : elem;
					return prev + elem;
				}, "");

				chosung = chosung.split(" ").join("");

				var first = chosung.substr(0,1);
				if(first === 'ㄲ') {first = 'ㄱ'}
				if(first === 'ㄸ') {first = 'ㄷ'}
				if(first === 'ㅃ') {first = 'ㅂ'}
				if(first === 'ㅆ') {first = 'ㅅ'}
				if(first === 'ㅉ') {first = 'ㅈ'}

				champion.chosung = chosung;
				champion.firstChosung = first;

				championMap.set(champion.key, champion);
				championList.push(champion);
			}

			// 한글 오름차순
			championList.sort(function (a, b) {
				return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
			});

			setChampionList(championList);
			setChampionMap(championMap);
		} else {
			errorChampionList(res.status.status_code);
		}
	}

	return (
		<>
			{rotationIdList ? 
			<>
				{championMap ? 
				<div className="mb-5">
					<h1 className={title()}>로테이션</h1>
					<RotationChampionList championMap={championMap} rotation={rotationIdList} />
				</div> : <></>}
			</> : <></>}

			<h1 className={title()}>전체</h1>

			<div className="mt-5">
				{championList ? <AllChampionList champions={championList} /> : <></>}
			</div>
		</>
	);
};

export const RotationChampionList = ({ championMap, rotation }: { championMap: Map<string, Champion>, rotation: number[]}) => {

	const [modalChampion, setModalChampion] = useState<ChampionDetail>();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [scrollBehavior, setScrollBehavior] = useState<ModalProps["scrollBehavior"]>("inside");

	var championName = "";

	return (
		<>
			<Modal size="4xl"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior={scrollBehavior}>
				<ModalContent>
					{(onClose) => (
                		modalChampion && 
						<ChampionModal onClose={onClose} modalChampion={modalChampion}/>
					)}
				</ModalContent>
			</Modal>

			<div className="flex flex-wrap mt-5">
				{rotation && rotation.map((id) => (
					<div key={id} className="w-[170px]">
						<User className="cursor-pointer"
							onClick={async () => {
								var championId = id.toString();
								championName = championMap.get(championId)?.id.toString()!;
								
								var res = await fetchChampion(championName);

								if(res.status.status_code === 200) {
									var data = await res.data;
									var champion = data.data;
									setModalChampion(champion[championName]);
									onOpen();
								} else {
									errorChampion(res.status.status_code);
								}
							}}
							name={championMap.get(id.toString())?.name}
							description=""
							avatarProps={{ src: `${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/champion/${championMap.get(id.toString())?.image.full}` }} />
					</div>
				))}
			</div>
		</>
	);
};

export const AllChampionList = ({ champions }: { champions: Champion[] }) => {


	const [searchValue, setSearchValue] = useState("");
	const [selected, setSelected] = useState("");

	const [modalChampion, setModalChampion] = useState<ChampionDetail>();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [scrollBehavior, setScrollBehavior] = useState<ModalProps["scrollBehavior"]>("inside");

	const Hangul = require('hangul-js');

	return (
		<>
				
			<Modal size="4xl"
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior={scrollBehavior}>
				<ModalContent>
					{(onClose) => (
						modalChampion && 
						<ChampionModal onClose={onClose} modalChampion={modalChampion}/>
					)}
				</ModalContent>
			</Modal>

			<Input type="text"
      			className="max-w-xs"
				isClearable
				label="챔피언 검색 (가렌, ㄱㄹ,...)"
				value={searchValue}
				onValueChange={setSearchValue}/>
			
			<div className="mt-5">
				<Tabs aria-label="Options"
					selectedKey={selected}
					onSelectionChange={(key)=>{setSelected(key.toString())}}>
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
			</div>


			
			<div className="flex flex-wrap mt-5">
				{champions ? champions.filter((champion) => {
					var isValid = true;
					var searchedChosung = Hangul.disassemble(searchValue).join("");

					if(searchValue == "") {
						if(selected == "") {
							isValid = true;
						} else {
							if (champion.firstChosung.includes(selected)) {
								isValid = true;
							} else {
								isValid = false;
							}
						}
					} else {
						if(champion.chosung.includes(searchedChosung)) {
							isValid = true;
						} else {
							isValid = false;
						}
					}
					return isValid;
				}).map((item) => (
						<div key={item.id} className="w-[170px]">
							<User className="cursor-pointer"
								onClick={async () => {
									var championId = item.id.toString();
									var res = await fetchChampion(championId);

									if (res.status.status_code === 200) {
										var data = await res.data;
										var champion = data.data;
										setModalChampion(champion[championId]);
										onOpen();
									} else {
										errorChampion(res.status.status_code);
									}
								}}
								name={item.name}
								description=""
								avatarProps={{ src: `${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/champion/${item.id}.png` }} />
						</div>
					)) : <></>}
			</div>
		</>
	);
};