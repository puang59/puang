import { RiArrowLeftLine } from "@remixicon/react";
import type { ReactNode } from "react";
import Rise from "./Rise";
import TransitionLink from "./utils/TransitionLink";

export default function PageHeader({
	back,
	backLabel,
	backLink,
	trail,
}: {
	back?: string;
	backLabel?: string;
	backLink?: ReactNode;
	trail: string;
}) {
	return (
		<Rise className="flex items-center justify-between px-5 pt-12 pb-6 sm:px-8 sm:pt-20">
			{backLink ?? (
				<TransitionLink
					href={back ?? "/"}
					className="group inline-flex items-center gap-1.5 font-mono text-[11px] text-faint transition-colors duration-300 hover:text-foreground"
				>
					<RiArrowLeftLine
						size={13}
						className="group-hover:-translate-x-0.5 transition-transform duration-300 ease-soft"
					/>
					{backLabel}
				</TransitionLink>
			)}
			<span className="font-mono text-[11px] text-faint">{trail}</span>
		</Rise>
	);
}
