/* Component */
import { title } from "@/components/primitives";
import { ItemPageComponent } from "@/components/page/item-page";

export default async function ItemPage() {
	return (
		<div className="w-full">
			<div className="flex flex-col gap-5">
				<h1 className={title()}>아이템</h1>
				<ItemPageComponent/>
			</div>
		</div>
	);
}
