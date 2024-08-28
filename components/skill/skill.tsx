"use client";

/* NextUI */
import {
    Badge, Avatar,
} from "@nextui-org/react";

/* Data */
import {
	GetSkillTooltip
} from "@/data/functions";

/* Redux */
import { modalChampionSelector } from '@/app/redux/slice/modalChampion'
import { useAppSelector } from "@/app/redux/hooks";

export const PSkill = () => {

    const modalChampion = useAppSelector(modalChampionSelector);
    
    return (
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
    );
}

export const QSkill = () => {

    const modalChampion = useAppSelector(modalChampionSelector);
    
    return (
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
    );
}

export const WSkill = () => {

    const modalChampion = useAppSelector(modalChampionSelector);
    
    return (
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
    );
}

export const ESkill = () => {

    const modalChampion = useAppSelector(modalChampionSelector);
    
    return (
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
    );
}

export const RSkill = () => {

    const modalChampion = useAppSelector(modalChampionSelector);

    return (
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
    );
}