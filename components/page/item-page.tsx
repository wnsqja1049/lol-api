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
 
/* NextUI */
import { CheckboxGroup, Checkbox,
	Tabs, Tab } from "@nextui-org/react";

/* Component */
import { ItemIcon } from "@/components/tooltip-icon";

export const ItemPageComponent = () => {

	const [selectedMap, setSelectedMap] = useState("11");
	const [selectedType, setSelectedType] = useState([""]);

	const [ itemList, setItemList ] = useState<Item[]>();
	const [ itemMap, setItemMap ] = useState<Map<string, Item>>();

	const [ aramItemList, setAramItemList ] = useState<Item[]>();
	const [ aramItemMap, setAramItemMap ] = useState<Map<string, Item>>();

	const [ arenaItemList, setArenaItemList ] = useState<Item[]>();
	const [ arenaItemMap, setArenaItemMap ] = useState<Map<string, Item>>();

    useEffect(() => {
        getItemList();
    }, []);
	
	const getItemList = async () => {
	
		var res = await fetchItemList();
	
		if(res.status.status_code === 200) {
            var items = await res.data;

			let itemList = [];
			let itemMap = new Map<string, Item>();

			let aramItemList = [];
			let aramItemMap = new Map<string, Item>();

			let arenaItemList = [];
			let arenaItemMap = new Map<string, Item>();

			for(var key in items.data) {
				var item = items.data[key];
                item.id = Number(key);

				// 소환사의 협곡
                if(item.maps[11] == true && item.gold.purchasable) {
					itemList.push(item)
                    itemMap.set(key, item);
                }

				// 칼바람 나락
                if(item.maps[12] == true && item.gold.purchasable) {
					aramItemList.push(item)
                    aramItemMap.set(key, item);
                }

				// 아레나
                if(item.maps[30] == true && item.gold.purchasable) {
					arenaItemList.push(item)
                    arenaItemMap.set(key, item);
                }
			}

			setItemList(itemList);
			setItemMap(itemMap);

			setAramItemList(aramItemList);
			setAramItemMap(aramItemMap);

			setArenaItemList(arenaItemList);
			setArenaItemMap(arenaItemMap);
		} else {
			errorItemList(res.status.status_code);
		}
	}

	return (
		<>
			<Tabs aria-label="Options"
				selectedKey={selectedMap}
				onSelectionChange={(key)=>{setSelectedMap(key.toString())}}>
				<Tab key="11" title="소환사의 협곡"></Tab>
				<Tab key="12" title="칼바람 나락"></Tab>
				<Tab key="30" title="아레나"></Tab>
			</Tabs>
			
			<CheckboxGroup
				label=""
				orientation="horizontal"
				color="secondary"
				value={selectedType}
				onValueChange={setSelectedType}>

				<Checkbox value="Damage">공격력</Checkbox>
				<Checkbox value="CriticalStrike">치명타</Checkbox>
				<Checkbox value="AttackSpeed">공격 속도</Checkbox>
				<Checkbox value="OnHit">적중 시 효과</Checkbox>
				<Checkbox value="ArmorPenetration">방어구 관통력</Checkbox>
				<Checkbox value="SpellDamage">주문력</Checkbox>

				<Checkbox value="LifeSteal">생명력 흡수</Checkbox>
				<Checkbox value="CooldownReduction">스킬 가속</Checkbox>

				<Checkbox value="MagicPenetration">마법 관통력</Checkbox>

				<Checkbox value="NonbootsMovement">이동</Checkbox>

				<Checkbox value="Health">체력</Checkbox>
				<Checkbox value="HealthRegen">체력 재생</Checkbox>

				<Checkbox value="Mana">마나</Checkbox>
				<Checkbox value="ManaRegen">마나 재생</Checkbox>

				<Checkbox value="Armor">방어력</Checkbox>
				<Checkbox value="SpellBlock">마법 저항력</Checkbox>
			</CheckboxGroup>

			<div className="flex flex-wrap">

				{selectedMap === "11" ? itemList ? itemList.filter((item) => {
						var isValid = true;

						for(let i = 0; i < selectedType.length; i++) {
							if(selectedType[i] != "") {
								if(!item.tags.includes(selectedType[i])) {
									isValid = false;
								}
							}
						}

						return isValid;
					})
					.map((item) => (
						<div key={item.id} className="w-15 h-15">
							<ItemIcon data={item} size={30} radius={false}/>
						</div>
					)) : <></> : <></>}
					

				{selectedMap === "12" ? aramItemList ? aramItemList.filter((item) => {
						var isValid = true;

						for(let i = 0; i < selectedType.length; i++) {
							if(selectedType[i] != "") {
								if(!item.tags.includes(selectedType[i])) {
									isValid = false;
								}
							}
						}

						return isValid;
					})
					.map((item) => (
						<div key={item.id} className="w-15 h-15">
							<ItemIcon data={item} size={30} radius={false}/>
						</div>
					)) : <></> : <></>}
					

				{selectedMap === "30" ? aramItemList ? aramItemList.filter((item) => {
						var isValid = true;

						for(let i = 0; i < selectedType.length; i++) {
							if(selectedType[i] != "") {
								if(!item.tags.includes(selectedType[i])) {
									isValid = false;
								}
							}
						}

						return isValid;
					})
					.map((item) => (
						<div key={item.id} className="w-15 h-15">
							<ItemIcon data={item} size={30} radius={false}/>
						</div>
					)) : <></> : <></>}
			</div>
		</>
	);
};
