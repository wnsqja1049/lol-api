/* Component */
import { title } from "@/components/primitives";
import { MatchPageComponent } from "@/components/page/match-page";
import { Suspense } from "react";

export default async function MatchPage() {

	return (
		<div>
			<h1 className={title()}>전적 검색</h1>
			<Suspense>
			<MatchPageComponent/>
			</Suspense>
		</div>
	);
}
