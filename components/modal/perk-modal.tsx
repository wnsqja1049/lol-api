"use client";

/* React */
/* NextUI */
import {
	Button,
	ModalHeader, ModalBody, ModalFooter, 
} from "@nextui-org/react";
/* Component */
import { MainPerkSet, SubPerkSet, StatPerkSet } from "@/components/perk"
/* Type */
import { MatchParticipantPerks, Perk } from "@/types";

export const PerkModal = ({ onClose, perks, perkMap }: { onClose: () => void, perks: MatchParticipantPerks | undefined, perkMap: Map<string, Perk> | undefined }) => {

	if (perks && perkMap) {
		return (
			<>
				<ModalHeader className="flex flex-row items-center gap-1">룬 정보</ModalHeader>
				<ModalBody>
					<div className="flex flex-row">
						<div className="mr-10">
							<MainPerkSet perks={perks} perkMap={perkMap} />
						</div>
						<div className="mr-10">
							<SubPerkSet perks={perks} perkMap={perkMap} />
						</div>
						<StatPerkSet perks={perks} perkMap={perkMap} />
					</div>

				</ModalBody>
				<ModalFooter>
					<Button color="primary" onPress={onClose}>
						닫기
					</Button>
				</ModalFooter>
			</>);
	} else {
		return (
			<></>
		);
	}
}