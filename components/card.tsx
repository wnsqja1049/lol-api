"use client";

/* React */

/* NextUI */
import { 
	Card, CardHeader, CardBody, 
	Badge, 
	Avatar, 
	Divider, 
	Image } from "@nextui-org/react";

/* Module */
import {
	getTierText, 
	getTierNumberText, 
	getWinRate, 
} from "@/data/functions";

/* Type */
import {
    Account,
    Profile,
	Rank
} from "@/types";
/* Component */
import { TimeStampToTimeBefore } from "@/components/timer"

export const ProfileCard = ({profile, account}: {profile: Profile, account: Account}) => {

	return (
		<Card className="w-[350px] dark:bg-zinc-900 border-1 dark:border-0">
			<CardBody className="flex gap-3">
				<div className="p-4 flex flex-row space-x-2 gap-2">
					<Badge className="bg-black text-white" content={profile.summonerLevel} color="default" placement="bottom-right" showOutline={false}>
						<Avatar className="w-20 h-20 text-large" isBordered radius="sm" src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/profileicon/${profile.profileIconId}.png`} alt={profile.profileIconId.toString()} />
					</Badge>
					<div className="flex flex-col items-start">
						<div><span className="font-extrabold">{account.gameName.toString()}</span>#{account.tagLine.toString()}</div>
						<div className="flex flex-row text-sm text-default-500">
							<div>마지막 게임: </div>
							<TimeStampToTimeBefore timeStamp={profile.revisionDate} />
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};

export const RankCard = ({ rankName, rank}: { rankName: string, rank: Rank | undefined}) => {

	return (
		<Card className="w-[400px] dark:bg-zinc-900 dark:border-0">
			<CardHeader>
				<p className="text-md">{rankName}</p>
			</CardHeader>
			<Divider />
			<CardBody>
				{rank ?
					<div className="flex flex-row justify-between items-center gap-2">
						<Image width={100} height={100} src={`/Rank=${getTierText(rank.tier)}.png`} />
						<div>
							<div className="text-xl font-bold">
								{getTierText(rank.tier)}<span>{getTierNumberText(rank.rank)}</span>
							</div>
							<div className="text-sm text-default-500">{rank.leaguePoints}LP</div>
						</div>
						<div className="text-sm text-default-500">
							<div>{rank.wins}승 {rank.losses}패</div>
							<div>승률 {getWinRate(rank)}</div>
						</div>
					</div> : <div className="text-sm h-[100px] content-center">Unranked</div>}
			</CardBody>
		</Card>
	);
};