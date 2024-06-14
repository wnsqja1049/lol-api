"use client";

/* React */
/* Type */
import { Augment, Perk, Spell, Item, Champion, MatchParticipant, StatMod } from "@/types";
/* Data */

/* NextUI */
import { 
    Tooltip,
    Image, 
	Badge, Avatar, 
} from "@nextui-org/react";

export const AugmentIcon = ({ data, size }: { data: Augment | undefined, size: number }) => {

	if(data === undefined) {
		return (
			<div className={`w-[${size}px] h-[${size}px] rounded-lg bg-zinc-300 dark:bg-zinc-900`}></div>
		);
	} else {
		return (
			<Tooltip
				shouldCloseOnBlur
				disableAnimation={false}
				delay={0}
				closeDelay={0}
				content={
					<div>
						<p>{data.name}</p>
						<p className="text-sm" dangerouslySetInnerHTML={{ __html: data.desc }}></p>
					</div>}>
					<div className={`w-[${size}px] h-[${size}px] rounded-lg bg-zinc-900`}>
						<Image width={size} height={size} radius="sm" alt={data.name} src={`${process.env.NEXT_PUBLIC_ARENA_AUGMENTS_IMG_URL}/${data.iconSmall}`} />
					</div>
			</Tooltip>
		);
	}
};

export const PerkIcon = ({ data, size, onClick }: { data: Perk | undefined, size: number, onClick: () => void }) => {

	if(data === undefined) {
		return (
			<div className={`w-[${size}px] h-[${size}px] rounded-lg bg-zinc-300 dark:bg-zinc-900`}></div>
		);
	} else {
		return (
			<Tooltip
				shouldCloseOnBlur
				disableAnimation={false}
				delay={0}
				closeDelay={0}
				content={
					<div>
						<p>{data.name}</p>
						<p className="text-sm" dangerouslySetInnerHTML={{ __html: data.longDesc }}></p>
					</div>}>
					<Image className="cursor-pointer" onClick={() => {onClick()}} width={size} height={size} radius="sm" alt={data.key} src={`${process.env.NEXT_PUBLIC_DB_URL}/img/${data.icon}`} />
			</Tooltip>
		);
	}
};

export const SpellIcon = ({ data, size }: { data: Spell | undefined, size: number }) => {

	if(data === undefined) {
		return (
			<div className={`w-[${size}px] h-[${size}px] rounded-lg bg-zinc-300 dark:bg-zinc-900`}></div>
		);
	} else {
		return (
			<Tooltip
				shouldCloseOnBlur
				disableAnimation={false}
				delay={0}
				closeDelay={0}
				content={
					<div>
						<p>{data.name}</p>
						<p>{data.description}</p>
					</div>}>
					<Image width={size} height={size} radius="sm" alt={data.id} src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/spell/${data.image.full}`} />
			</Tooltip>
		);
	}
};

export const ItemIcon = ({ data, size, radius }: { data: Item | undefined, size: number, radius: boolean }) => {

	if(data === undefined) {
		return (
			<div className={`w-[${size}px] h-[${size}px] rounded-lg bg-zinc-300 dark:bg-zinc-900`}></div>
		);
	} else {
		return (
			<Tooltip
				offset={40}
				shouldCloseOnBlur
				disableAnimation={false}
				delay={0}
				closeDelay={0}
				content={
					<div>
						<p></p>
						<p>{data.name}</p>
						<p>{data.plaintext}</p>
						<p dangerouslySetInnerHTML={{ __html: data.description }}></p>
						<p>가격: {data.gold.total}({data.gold.base})</p>
					</div>}>
					<Image width={size} height={size} radius={radius ? 'md' : 'none'} src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/item/${data.image.full}`} alt={data.id.toString()} placeholder="blur" />
			</Tooltip>
		);
	}
};

export const ChampionIcon = ({ size, withLevel, data, participant, onClick }: { size:"sm" | "md" | "lg", withLevel: boolean, data: Champion | undefined, participant: MatchParticipant, onClick: () => void }) => {

	if(data) {
		if(withLevel) {
			return (
				<Badge content={participant.champLevel} placement="bottom-left" size="sm" showOutline={false} className="bg-black text-white">
					<Tooltip
						shouldCloseOnBlur
						disableAnimation={false}
						delay={0}
						closeDelay={0}
						content={<p>{data.name}</p>}>
						<Avatar className="cursor-pointer"
							isBordered={false}
							size={size}
							radius="sm"
							showFallback
							name={data.name}
							src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/champion/${data.image.full}`}
							onClick={() => { onClick() }} />
					</Tooltip>
				</Badge>
			);
		} else {
			return (
				<Tooltip
					shouldCloseOnBlur
					disableAnimation={false}
					delay={0}
					closeDelay={0}
					content={<p>{data.name}</p>}>
					<Avatar className="cursor-pointer"
							isBordered={false}
						size={size}
						radius="sm"
						showFallback
						name={data.name}
						src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/champion/${data.image.full}`}
						onClick={() => { onClick() }} />
				</Tooltip>
			);
		}
	} else {
		return (
			<div className="w-[30px] h-[30px] rounded-lg bg-zinc-300 dark:bg-zinc-900"></div>
		);
	}
};
export const SmallChampionIcon = ({ withLevel, data, participant, onClick }: {withLevel: boolean, data: Champion | undefined, participant: MatchParticipant, onClick: () => void }) => {

	if(data) {
		if(withLevel) {
			return (
				<Badge content={participant.champLevel} placement="bottom-left" size="sm" showOutline={false} className="bg-black text-white">
					<Tooltip
						shouldCloseOnBlur
						disableAnimation={false}
						delay={0}
						closeDelay={0}
						content={<p>{data.name}</p>}>
						<Avatar className="cursor-pointer w-4 h-4"
							isBordered={false}
							radius="sm"
							showFallback
							name={data.name}
							src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/champion/${data.image.full}`}
							onClick={() => { onClick() }} />
					</Tooltip>
				</Badge>
			);
		} else {
			return (
				<Tooltip
					shouldCloseOnBlur
					disableAnimation={false}
					delay={0}
					closeDelay={0}
					content={<p>{data.name}</p>}>
					<Avatar className="cursor-pointer w-4 h-4"
						isBordered={false}
						radius="sm"
						showFallback
						name={data.name}
						src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/champion/${data.image.full}`}
						onClick={() => { onClick() }} />
				</Tooltip>
			);
		}
	} else {
		return (
			<div className="w-[30px] h-[30px] rounded-lg bg-zinc-300 dark:bg-zinc-900"></div>
		);
	}
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