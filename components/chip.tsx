"use client";

/* Type */
import { UserName } from "@/types";
/* NextUI */
import { Chip } from "@nextui-org/react";

export const SearchRecommandChip = ({ 
	name,
    handleClick,
}: { 
	name: UserName, 
    handleClick: (name: UserName) => void,
}) => {

	return (
		<Chip key={name.gameName + "#" + name.tagLine}
			variant="flat"
			className="cursor-pointer"
			onClick={() => handleClick(name)}>
			{name.gameName}#{name.tagLine}
		</Chip>
	);
};

export const SearchHistoryChip = ({ 
	name,
    handleClick,
    handleClose,  
}: { 
	name: UserName, 
    handleClick: (name: UserName) => void,
    handleClose: (name: UserName) => void,
}) => {

	return (
		<Chip key={name.gameName + "#" + name.tagLine}
			variant="flat"
			className="cursor-pointer"
			onClick={() => handleClick(name)}
			onClose={() => handleClose(name)}>
			{name.gameName}#{name.tagLine}
		</Chip>
	);
};
