"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { MediaItem } from "./Projects";

declare global {
	interface Window {
		twttr?: {
			widgets: { load: (el?: HTMLElement) => void };
		};
	}
}

export function MediaCarousel({
	media,
	title,
}: {
	media: MediaItem[];
	title: string;
}) {
	const [index, setIndex] = useState(0);
	const tweetRef = useRef<HTMLDivElement>(null);

	const current = media[index];

	useEffect(() => {
		if (current?.type === "tweet") {
			window.twttr?.widgets.load(tweetRef.current ?? undefined);
		}
	}, [current]);

	if (!current) return null;

	const goTo = (next: number, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIndex((next + media.length) % media.length);
	};

	return (
		<div className="relative h-44 w-full overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 sm:h-52">
			{current.type === "image" && (
				<Image
					src={current.src}
					alt={current.alt}
					fill
					sizes="(max-width: 640px) 100vw, 50vw"
					className="object-cover"
				/>
			)}

			{current.type === "youtube" && (
				<iframe
					className="h-full w-full"
					src={`https://www.youtube.com/embed/${current.id}`}
					title={`${title} demo video`}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
					loading="lazy"
				/>
			)}

			{current.type === "tweet" && (
				<div
					ref={tweetRef}
					key={current.id}
					className="twitter-embed-scroll flex h-full w-full justify-center overflow-y-auto bg-black px-1 py-1"
				>
					<blockquote
						className="twitter-tweet"
						data-theme="dark"
						data-dnt="true"
						data-conversation="none"
					>
						<a href={`https://twitter.com/notpuang/status/${current.id}`}>
							View post on X
						</a>
					</blockquote>
				</div>
			)}

			{media.length > 1 && (
				<>
					<button
						type="button"
						aria-label="Previous media"
						onClick={(e) => goTo(index - 1, e)}
						className="-translate-y-1/2 absolute top-1/2 left-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-gray-300 opacity-80 transition-colors duration-200 hover:bg-black/90 hover:text-green-300 focus:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
					>
						<RiArrowLeftSLine size={16} />
					</button>
					<button
						type="button"
						aria-label="Next media"
						onClick={(e) => goTo(index + 1, e)}
						className="-translate-y-1/2 absolute top-1/2 right-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-gray-300 opacity-80 transition-colors duration-200 hover:bg-black/90 hover:text-green-300 focus:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
					>
						<RiArrowRightSLine size={16} />
					</button>
					<div className="-translate-x-1/2 absolute bottom-1.5 left-1/2 z-10 flex gap-1">
						{media.map((item, i) => {
							const key =
								item.type === "image" ? item.src : `${item.type}-${item.id}`;
							return (
								<button
									key={key}
									type="button"
									aria-label={`Go to slide ${i + 1}`}
									onClick={(e) => goTo(i, e)}
									className={`h-1.5 w-1.5 rounded-full transition-colors duration-200 ${
										i === index ? "bg-green-300" : "bg-gray-600"
									}`}
								/>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}
