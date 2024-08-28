"use client";

/* React */
import { useState, useEffect } from "react";

/* Type */
import { Item } from "@/types";

/* Data */
import {
	fetchItemList,
} from "@/data/api";
import {
	errorItemList,
} from "@/data/apiError";

/* Component */
import { ItemIcon } from "@/components/icon/tooltip-icon";
import { ItemFilterTabs } from "@/components/tabs/tabs";
import { ItemCheckboxGroup } from "@/components/checkbox-group/checkbox-group";

/* Redux */
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { 
	itemMapSelector,
	aramItemMapSelector, 
	arenaItemMapSelector,

	setItemMapState, 
	setAramItemMapState, 
	setArenaItemMapState, 
 } from "../redux/slice/item";

export const ItemPageComponent = () => {

	const [selectedMap, setSelectedMap] = useState("11");
	const [selectedType, setSelectedType] = useState([""]);

	const [itemList, setItemList] = useState<Item[]>();
	const [itemMap, setItemMap] = useState<Map<string, Item>>();

	const [aramItemList, setAramItemList] = useState<Item[]>();
	const [aramItemMap, setAramItemMap] = useState<Map<string, Item>>();

	const [arenaItemList, setArenaItemList] = useState<Item[]>();
	const [arenaItemMap, setArenaItemMap] = useState<Map<string, Item>>();

	
    const _itemMap = useAppSelector(itemMapSelector)
    const _aramItemMap = useAppSelector(aramItemMapSelector)
    const _arenaItemMap = useAppSelector(arenaItemMapSelector)
    const dispatch = useAppDispatch();

	useEffect(() => {
		getItemList();
	}, []);

	const getItemList = async () => {
		console.log("getItemList start")

		var res = await fetchItemList();

		if (res.status.status_code === 200) {
			var items = await res.data;

			let itemList = [];
			let itemMap = new Map<string, Item>();

			let aramItemList = [];
			let aramItemMap = new Map<string, Item>();

			let arenaItemList = [];
			let arenaItemMap = new Map<string, Item>();

			for (var key in items.data) {
				var item = items.data[key];
				item.id = Number(key);

				// 소환사의 협곡
				if (item.maps[11] == true && item.gold.purchasable) {
					itemList.push(item)
					itemMap.set(key, item);
				}

				// 칼바람 나락
				if (item.maps[12] == true && item.gold.purchasable) {
					aramItemList.push(item)
					aramItemMap.set(key, item);
				}

				// 아레나
				if (item.maps[30] == true && item.gold.purchasable) {
					arenaItemList.push(item)
					arenaItemMap.set(key, item);
				}
			}

			setItemList(itemList);
			setItemMap(itemMap);
			dispatch(setItemMapState(itemMap));

			setAramItemList(aramItemList);
			setAramItemMap(aramItemMap);
			dispatch(setAramItemMapState(aramItemMap));

			setArenaItemList(arenaItemList);
			setArenaItemMap(arenaItemMap);
			dispatch(setArenaItemMapState(arenaItemMap));

			
			console.log("getItemList end")
			console.log(_itemMap)
		} else {
			errorItemList(res.status.status_code);
		}
	}

	const filterItemList = (itemList: Item[]) => {
		let filteredItemList = itemList.filter((item) => {
			var isValid = true;

			for (let i = 0; i < selectedType.length; i++) {
				if (selectedType[i] != "") {
					if (!item.tags.includes(selectedType[i])) {
						isValid = false;
					}
				}
			}

			return isValid;
		})

		return filteredItemList;
	}

	return (
		<>
			<ItemFilterTabs value={selectedMap} setValue={setSelectedMap} />
			
			<ItemCheckboxGroup value={selectedType} setValue={setSelectedType} />

			<div className="flex flex-wrap">

				{selectedMap === "11" ? itemList ? filterItemList(itemList)
					.map((item) => (
						<div key={item.id} className="w-15 h-15">
							<ItemIcon data={item} size={30} radius={false} />
						</div>
					)) : <></> : <></>}


				{selectedMap === "12" ? aramItemList ? filterItemList(aramItemList)
					.map((item) => (
						<div key={item.id} className="w-15 h-15">
							<ItemIcon data={item} size={30} radius={false} />
						</div>
					)) : <></> : <></>}


				{selectedMap === "30" ? arenaItemList ? filterItemList(arenaItemList)
					.map((item) => (
						<div key={item.id} className="w-15 h-15">
							<ItemIcon data={item} size={30} radius={false} />
						</div>
					)) : <></> : <></>}
			</div>
		</>
	);
};
