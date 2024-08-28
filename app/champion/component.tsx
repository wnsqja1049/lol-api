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

/* Redux */
import { modalChampionSelector, initModalChampion, setModalChampion } from '@/app/redux/slice/modalChampion'
import { SearchChampionInput } from "@/components/input/input";
import { ChampionFilterTabs } from "@/components/tabs/tabs";
import { ModalChampion } from "@/components/champion/champion";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

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
				{championMap ? <RotationChampionList championMap={championMap} rotation={rotationIdList} /> : <></>}
			</> : <></>}

			{championList ? <AllChampionList champions={championList} /> : <></>}
		</>
	);
};

export const RotationChampionList = ({ championMap, rotation }: { championMap: Map<string, Champion>, rotation: number[]}) => {

    const dispatch = useAppDispatch();
    const modalChampion = useAppSelector(modalChampionSelector);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [scrollBehavior, setScrollBehavior] = useState<ModalProps["scrollBehavior"]>("inside");

	var championName = "";

	function open (champion: Champion) {
		dispatch(setModalChampion(champion));
		onOpen();
	}

	return (
		<>
			<div className="mb-5">
				<h1 className={title()}>로테이션</h1>
				<Modal size="4xl"
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					scrollBehavior={scrollBehavior}>
					<ModalContent>
						{(onClose) => (
							modalChampion && 
							<ChampionModal onClose={onClose}/>
						)}
					</ModalContent>
				</Modal>

				<div className="flex flex-wrap mt-5">
					{rotation && rotation.map((id) => (
						<ModalChampion key={id} item={championMap.get(id.toString())!} open={(item) => {open(item)}} />
					))}
				</div>
			</div>
		</>
	);
};

export const AllChampionList = ({ champions }: { champions: Champion[] }) => {
	const [searchValue, setSearchValue] = useState("");
	const [selected, setSelected] = useState("");

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [scrollBehavior, setScrollBehavior] = useState<ModalProps["scrollBehavior"]>("inside");

    const dispatch = useAppDispatch();
    const modalChampion = useAppSelector(modalChampionSelector);

	const Hangul = require('hangul-js');


	function open (champion: Champion) {
		dispatch(setModalChampion(champion));
		onOpen();
	}

	return (
		<>
			<h1 className={title()}>전체</h1>

			<div className="mt-5">
				<Modal size="4xl"
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					scrollBehavior={scrollBehavior}>
					<ModalContent>
						{(onClose) => (
							modalChampion &&
							<ChampionModal onClose={onClose} />
						)}
					</ModalContent>
				</Modal>

				<SearchChampionInput value={searchValue} setValue={setSearchValue} />

				<div className="mt-5">
					<ChampionFilterTabs value={selected} setValue={setSelected} />
				</div>



				<div className="flex flex-wrap mt-5">
					{champions ? champions.filter((champion) => {
						var isValid = true;
						var searchedChosung = Hangul.disassemble(searchValue).join("");

						if (searchValue == "") {
							if (selected == "") {
								isValid = true;
							} else {
								if (champion.firstChosung.includes(selected)) {
									isValid = true;
								} else {
									isValid = false;
								}
							}
						} else {
							if (champion.chosung.includes(searchedChosung)) {
								isValid = true;
							} else {
								isValid = false;
							}
						}
						return isValid;
					}).map((item) => (
						<ModalChampion key={item.id} item={item} open={(item) => {open(item)}} />
					)) : <></>}
				</div>
			</div>
		</>
	);
};