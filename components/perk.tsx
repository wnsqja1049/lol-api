"use client";

/* React */
/* Type */
import { MatchParticipantPerks, Perk, StatMod } from "@/types";
/* Data */

/* NextUI */
import { 
    Tooltip,
    Image, 
} from "@nextui-org/react";


export const MainPerkSet = ({ perks, perkMap }: { perks: MatchParticipantPerks | undefined, perkMap: Map<string, Perk> | undefined }) => {

	/* 8000 정밀 */
	var PrecisionIdList		= [["8005", "8021", "8010"], ["9101", "9111", "8009"], ["9104", "9105", "9103"], ["8014", "8017", "8299"]];
	/* 8100 지배 */
	var DominationIdList	= [["8112", "8128", "9923"], ["8126", "8139", "8143"], ["8136", "8120", "8138"], ["8135", "8105", "8106"]];
	/* 8200 마법 */
	var SorceryIdList		= [["8214", "8229", "8230"], ["8224", "8226", "8275"], ["8210", "8234", "8233"], ["8237", "8232", "8236"]];
	/* 8400 결의 */
	var ResolveIdList		= [["8437", "8439", "8465"], ["8446", "8463", "8401"], ["8429", "8444", "8473"], ["8451", "8453", "8242"]];
	/* 8300 영감 */
	var InspirationIdList	= [["8351", "8360", "8369"], ["8306", "8304", "8321"], ["8313", "8352", "8345"], ["8347", "8410", "8316"]];

	const getList = (subStyle: number) => {
		if(subStyle === 8000) {
			return PrecisionIdList;
		}
		if(subStyle === 8100) {
			return DominationIdList;
		}
		if(subStyle === 8200) {
			return SorceryIdList;
		}
		if(subStyle === 8400) {
			return ResolveIdList;
		}
		if(subStyle === 8300) {
			return InspirationIdList;
		}
	}

	if(perkMap && perks) {
		var mainStyle = perks.styles[0].style;
		var mainSelections = perks.styles[0].selections;

		var mainPerkList = getList(mainStyle);

		if(mainPerkList) {
			return (
				<div>
					<div className="flex flex-row justify-center">
						<ModalMainPerkIcon data={perkMap.get(mainStyle.toString())} size={40} selectedId={mainStyle} />
					</div>
					
					{mainPerkList.map((idList, index) => 
					<div className="flex flex-row" key={index}>
						{idList.map((id) => <ModalMainPerkIcon key={id} data={perkMap.get(id)} size={40} selectedId={mainSelections[index].perk} />)}
					</div>)}
				</div>
			)
		}
	}

	return (<></>)
};
export const SubPerkSet = ({ perks, perkMap }: { perks: MatchParticipantPerks | undefined, perkMap: Map<string, Perk> | undefined }) => {

	/* 8000 정밀 */
	var PrecisionIdList		= [["9101", "9111", "8009"], ["9104", "9105", "9103"], ["8014", "8017", "8299"]];
	/* 8100 지배 */
	var DominationIdList	= [["8126", "8139", "8143"], ["8136", "8120", "8138"], ["8135", "8105", "8106"]];
	/* 8200 마법 */
	var SorceryIdList		= [["8224", "8226", "8275"], ["8210", "8234", "8233"], ["8237", "8232", "8236"]];
	/* 8400 결의 */
	var ResolveIdList		= [["8446", "8463", "8401"], ["8429", "8444", "8473"], ["8451", "8453", "8242"]];
	/* 8300 영감 */
	var InspirationIdList	= [["8306", "8304", "8321"], ["8313", "8352", "8345"], ["8347", "8410", "8316"]];

	const getList = (subStyle: number) => {
		if(subStyle === 8000) {
			return PrecisionIdList;
		}
		if(subStyle === 8100) {
			return DominationIdList;
		}
		if(subStyle === 8200) {
			return SorceryIdList;
		}
		if(subStyle === 8400) {
			return ResolveIdList;
		}
		if(subStyle === 8300) {
			return InspirationIdList;
		}
	}

	if(perkMap && perks) {
		var subStyle = perks.styles[1].style;
		var firstId = perks.styles[1].selections[0].perk;
		var secondId = perks.styles[1].selections[1].perk;

		var subPerkList = getList(subStyle);

		if(subPerkList) {
			return (
				<div>
					<div className="flex flex-row justify-center">
						<ModalMainPerkIcon data={perkMap.get(subStyle.toString())} size={40} selectedId={subStyle} />
					</div>
	
					{subPerkList.map((idList, index) => 
					<div className="flex flex-row" key={index}>
						{idList.map((id) => <ModalSubPerkIcon key={id} data={perkMap.get(id)} size={40} firstId={firstId} secondId={secondId} />)}
					</div>)}
				</div>
			)
		}
	}
	return (<></>)
};
export const StatPerkSet = ({ perks, perkMap }: { perks: MatchParticipantPerks | undefined, perkMap: Map<string, Perk> | undefined }) => {
	/* 
	5008 StatModsAdaptiveForceIcon
	5005 StatModsAttackSpeedIcon
	5007 StatModsCDRScalingIcon
	5001 StatModsHealthPlusIcon
	5011 StatModsHealthScalingIcon
	5010 StatModsMovementSpeedIcon
	5013 StatModsTenacityIcon
	*/

	/* 
	5008 StatModsAdaptiveForceIcon
	5012 StatModsAdaptiveForceScalingIcon
	5002 StatModsArmorIcon 
	5005 StatModsAttackSpeedIcon
	5007 StatModsCDRScalingIcon
	5001 StatModsHealthPlusIcon
	5011 StatModsHealthScalingIcon
	5003 StatModsMagicResIcon
	5010 StatModsMovementSpeedIcon
	5013 StatModsTenacityIcon
	*/

	var statModList = [["5008", "5005", "5007"], ["5008", "5010", "5001"], ["5011", "5013", "5001"]];

	var statModDataList = [
		{
			id: "5008",
			icon: "perk-images/StatMods/StatModsAdaptiveForceIcon.png",
			title: "OFFENSE",
			desc: "적응형 능력치 +9"
		},
		{
			id: "5005",
			icon: "perk-images/StatMods/StatModsAttackSpeedIcon.png",
			title: "OFFENSE",
			desc: "공격속도 +10%"
		},
		{
			id: "5007",
			icon: "perk-images/StatMods/StatModsCDRScalingIcon.png",
			title: "OFFENSE",
			desc: "스킬 가속 +8"
		},
		{
			id: "5001",
			icon: "perk-images/StatMods/StatModsHealthPlusIcon.png",
			title: "DEFENSE",
			desc: "체력 + 15 ~ 140 (레벨에 비례)"
		},
		{
			id: "5011",
			icon: "perk-images/StatMods/StatModsHealthScalingIcon.png",
			title: "DEFENSE",
			desc: "체력 +65"
		},
		{
			id: "5010",
			icon: "perk-images/StatMods/StatModsMovementSpeedIcon.png",
			title: "FLEX",
			desc: "이동 속도 + 2%"
		},
		{
			id: "5013",
			icon: "perk-images/StatMods/StatModsTenacityIcon.png",
			title: "DEFENSE",
			desc: "강인함 및 둔화 저항 + 10%"
		}
	]

	var statModMap: Map<string, StatMod> = new Map<string, StatMod>();

	for(let i = 0; i < statModDataList.length; i++) {
		statModMap.set(statModDataList[i].id, statModDataList[i])
	}

	if(perkMap && perks) {
		var offense = perks.statPerks.offense;
		var flex = perks.statPerks.flex;
		var defense = perks.statPerks.defense;


		return (
			<div>
				<div className="flex flex-row">
					{statModList[0].map((id) => <ModalStatPerkIcon key={id} data={statModMap.get(id)} size={30} selectedId={offense.toString()} />)}
				</div> 
				<div className="flex flex-row">
					{statModList[1].map((id) => <ModalStatPerkIcon key={id} data={statModMap.get(id)} size={30} selectedId={flex.toString()} />)}
				</div> 
				<div className="flex flex-row">
					{statModList[2].map((id) => <ModalStatPerkIcon key={id} data={statModMap.get(id)} size={30} selectedId={defense.toString()} />)}
				</div> 
			</div>
		)
	}
	return (<></>);
};

export const ModalMainPerkIcon = ({ data, size, selectedId }: { data: Perk | undefined, size: number, selectedId: number }) => {

	if(data === undefined) {
		return (
			<div className={`w-[${size}px] h-[${size}px] rounded-lg bg-zinc-300 dark:bg-zinc-900`}></div>
		);
	} else {
		return (
			<div className={selectedId === data.id ? "opacity-100" : "opacity-25"}>
				<Tooltip
					shouldCloseOnBlur
					disableAnimation={false}
					delay={0}
					closeDelay={0} 
					offset={15}
					content={
						<div>
							<p>{data.name}</p>
							<p className="text-sm" dangerouslySetInnerHTML={{ __html: data.longDesc }}></p>
						</div>}>
						<Image width={size} height={size} radius="sm" alt={data.key} src={`${process.env.NEXT_PUBLIC_DB_URL}/img/${data.icon}`} />
				</Tooltip>
			</div>
		);
	}
};
export const ModalSubPerkIcon = ({ data, size, firstId, secondId }: { data: Perk | undefined, size: number, firstId: number, secondId: number }) => {

	if(data === undefined) {
		return (
			<div className={`w-[${size}px] h-[${size}px] rounded-lg bg-zinc-300 dark:bg-zinc-900`}></div>
		);
	} else {
		return (
			<div className={(firstId === data.id || secondId === data.id) ? "opacity-100" : "opacity-25"}>
				<Tooltip
					shouldCloseOnBlur
					disableAnimation={false}
					delay={0}
					closeDelay={0} 
					offset={15}
					content={
						<div>
							<p>{data.name}</p>
							<p className="text-sm" dangerouslySetInnerHTML={{ __html: data.longDesc }}></p>
						</div>}>
						<Image width={size} height={size} radius="sm" alt={data.key} src={`${process.env.NEXT_PUBLIC_DB_URL}/img/${data.icon}`} />
				</Tooltip>
			</div>
		);
	}
};
export const ModalStatPerkIcon = ({ data, size, selectedId }: { data: StatMod | undefined, size: number, selectedId: string }) => {

	if(data === undefined) {
		return (
			<div className={`w-[${size}px] h-[${size}px] rounded-lg bg-zinc-300 dark:bg-zinc-900`}></div>
		);
	} else {
		return (
			<div className={selectedId === data.id ? "opacity-100" : "opacity-25"}>
				<Tooltip
					shouldCloseOnBlur
					disableAnimation={false}
					delay={0}
					closeDelay={0} 
					offset={15}
					content={
						<div>
							<p>{data.title}</p>
							<p className="text-sm">{data.desc}</p>
						</div>}>
						<Image width={size} height={size} radius="sm" alt={data.id.toString()} src={`${process.env.NEXT_PUBLIC_DB_URL}/img/${data.icon}`} />
				</Tooltip>
			</div>
		);
	}
};