import {
	RiArrowRightUpLine,
	RiGithubFill,
	RiLinkedinFill,
	RiMailLine,
	RiQuillPenLine,
	RiTwitterXFill,
} from "@remixicon/react";
import Reveal from "./Reveal";
import { Section } from "./frame";

const links = [
	{
		label: "github",
		value: "@puang59",
		href: "https://github.com/puang59",
		icon: RiGithubFill,
	},
	{
		label: "x",
		value: "@notpuang",
		href: "https://x.com/notpuang",
		icon: RiTwitterXFill,
	},
	{
		label: "linkedin",
		value: "karan kumar",
		href: "https://www.linkedin.com/in/karan-kumar-a54127151/",
		icon: RiLinkedinFill,
	},
	{
		label: "weblog",
		value: "weblog.puang.in",
		href: "https://weblog.puang.in",
		icon: RiQuillPenLine,
	},
	{
		label: "email",
		value: "hello@puang.in",
		href: "mailto:hello@puang.in",
		icon: RiMailLine,
	},
];

export default function Elsewhere() {
	return (
		<Section index="06" title="Elsewhere">
			<Reveal className="-mx-3">
				{links.map(({ icon: Icon, ...link }) => (
					<a
						key={link.label}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						className="group grid grid-cols-[24px_80px_1fr_auto] items-center rounded-md px-3 py-2 transition-colors duration-300 ease-soft hover:bg-surface"
					>
						<Icon
							size={15}
							className="text-faint transition-colors duration-300 group-hover:text-foreground"
						/>
						<span className="font-mono text-[11px] text-faint">
							{link.label}
						</span>
						<span className="text-muted text-sm transition-colors duration-300 group-hover:text-foreground">
							{link.value}
						</span>
						<RiArrowRightUpLine
							size={14}
							className="-translate-x-1 text-faint opacity-0 transition-all duration-300 ease-soft group-hover:translate-x-0 group-hover:opacity-100"
						/>
					</a>
				))}
			</Reveal>
		</Section>
	);
}
