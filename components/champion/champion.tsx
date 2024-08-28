
/* NextUI */
import {
	User
} from "@nextui-org/react";

/* Data */
import { 
	fetchChampion,
 } from "@/data/api";
 
 import {
	errorChampion,
 } from "@/data/apiError";

/* Data Type */
import { Champion } from "@/types";

export const ModalChampion = ({ item, open}: { item: Champion, open: (champion: Champion) => void }) => {
    return (
        <div className="w-[170px]">
            <User className="cursor-pointer"
                onClick={async () => {
                    var championId = item.id.toString();
                    var res = await fetchChampion(championId);

                    if (res.status.status_code === 200) {
                        var data = await res.data;
                        var champion = data.data;
                        open(champion[championId]);
                    } else {
                        errorChampion(res.status.status_code);
                    }
                }}
                name={item.name}
                description=""
                avatarProps={{ src: `${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/champion/${item.id}.png` }} />
        </div>
    )
}