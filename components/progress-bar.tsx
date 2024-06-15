"use client";

/* NextUI */
import { 
	Progress } from "@nextui-org/react";


export const DamageDealtProgressBar = ({damage, largestDamage}: {damage: number, largestDamage: number}) => {

	return (
		<>
			<p className="mb-1">{damage}</p>
			<Progress aria-label="Damage Dealt Progress" size="sm" radius="sm" color="danger" value={damage} maxValue={largestDamage} className="max-w-md bg-white" />
		</>
	);
};
export const DamageTakenProgressBar = ({damage, largestDamage}: {damage: number, largestDamage: number}) => {

	return (
		<>
			<p className="mb-1">{damage}</p>
			<Progress aria-label="Damage Taken Progress" size="sm" radius="sm" color="default" value={damage} maxValue={largestDamage} className="max-w-md bg-white" />
		</>
	);
};