"use client";
/* React */
import React, { useEffect, useState } from "react";
/* Data Type */
import { Item } from "@/types";
/* NextUI */
import {
	CheckboxGroup, Checkbox
} from "@nextui-org/react";
/* Component */
import { ItemIcon } from "@/components/tooltip-icon"



export const ItemList = ({ items }: { items: Item[] }) => {

	const [selected, setSelected] = useState([""]);

	return (
		<>
			<CheckboxGroup
				label=""
				orientation="horizontal"
				color="secondary"
				value={selected}
				onValueChange={setSelected}>

				<Checkbox value="Boots">Boots</Checkbox>

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

				<Checkbox value="SpellVamp">SpellVamp</Checkbox>
			</CheckboxGroup>

			<div className="flex flex-wrap">

				{items.filter((item) => {
						var isValid = true;

						for(let i = 0; i < selected.length; i++) {
							if(selected[i] != "") {
								if(!item.tags.includes(selected[i])) {
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
					))}
			</div>
		</>
	);
}