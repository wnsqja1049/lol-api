/* Component */
import { MainPageComponent } from "./component";
import { Suspense } from "react";

/* NextUI */
import { 
    Image, 
} from "@nextui-org/react";

export default function Home() {
	return (
		<div>
			<div className="flex justify-center mb-5">
				<Image width={200} height={200} radius="lg" alt={"4568"} src={`${process.env.NEXT_PUBLIC_DB_URL}/${process.env.NEXT_PUBLIC_VERSION}/img/profileicon/4568.png`} />
			</div>

			<Suspense>
				<MainPageComponent/>
			</Suspense>
		</div>
	);
}
