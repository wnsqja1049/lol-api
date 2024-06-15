/* Component */
import { title } from "@/components/primitives";
//import { MatchPageComponent } from "@/components/page/match-page";
import { Suspense } from "react";
import { MatchPageComponent } from "./component";

export default async function MatchPage() {

	return (
		<div>
			<h1 className={title()}>전적 검색</h1>

			<div className="mt-5">
				<Suspense>
					<MatchPageComponent/>
				</Suspense>
			</div>
		</div>
	);
}
