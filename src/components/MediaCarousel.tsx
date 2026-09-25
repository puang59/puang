"use client";

import {
	RiArrowLeftSLine,
	RiArrowRightSLine,
	RiCloseLine,
	RiZoomInLine,
} from "@remixicon/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const tweetRef = useRef<HTMLDivElement>(null);

	const current = media[index];

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		if (current?.type === "tweet") {
			window.twttr?.widgets.load(tweetRef.current ?? undefined);
		}
	}, [current]);

	useEffect(() => {
		if (!lightboxOpen) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setLightboxOpen(false);
		};
		document.addEventListener("keydown", onKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = "";
		};
	}, [lightboxOpen]);

	if (!current) return null;

	const goTo = (next: number, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIndex((next + media.length) % media.length);
	};

	const openLightbox = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setLightboxOpen(true);
	};

	const closeLightbox = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setLightboxOpen(false);
	};

	return (
		<>
			<div className="relative aspect-video w-full overflow-hidden border border-zinc-800 bg-zinc-950">
				{current.type === "image" && (
					<button
						type="button"
						onClick={openLightbox}
						aria-label={`Expand image for ${title}`}
						className="group/image absolute inset-0 cursor-zoom-in"
					>
						<Image
							src={current.src}
							alt={current.alt}
							fill
							sizes="(max-width: 768px) 100vw, 768px"
							className="object-cover"
						/>
						<span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover/image:bg-black/30 group-hover/image:opacity-100">
							<span className="flex h-9 w-9 items-center justify-center bg-black/70 text-gray-200">
								<RiZoomInLine size={18} />
							</span>
						</span>
					</button>
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
							className="-translate-y-1/2 absolute top-1/2 left-2 z-10 flex h-8 w-8 items-center justify-center bg-black/70 text-gray-300 opacity-80 transition-colors duration-200 hover:bg-black/90 hover:text-green-300 focus:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
						>
							<RiArrowLeftSLine size={18} />
						</button>
						<button
							type="button"
							aria-label="Next media"
							onClick={(e) => goTo(index + 1, e)}
							className="-translate-y-1/2 absolute top-1/2 right-2 z-10 flex h-8 w-8 items-center justify-center bg-black/70 text-gray-300 opacity-80 transition-colors duration-200 hover:bg-black/90 hover:text-green-300 focus:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
						>
							<RiArrowRightSLine size={18} />
						</button>
						<div className="-translate-x-1/2 absolute bottom-2 left-1/2 z-10 flex gap-1.5">
							{media.map((item, i) => {
								const key =
									item.type === "image" ? item.src : `${item.type}-${item.id}`;
								return (
									<button
										key={key}
										type="button"
										aria-label={`Go to slide ${i + 1}`}
										onClick={(e) => goTo(i, e)}
										className={`h-1.5 w-1.5 transition-colors duration-200 ${
											i === index ? "bg-green-300" : "bg-gray-500"
										}`}
									/>
								);
							})}
						</div>
					</>
				)}
			</div>

			{mounted &&
				createPortal(
					<AnimatePresence>
						{lightboxOpen && current.type === "image" && (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.18 }}
								onClick={closeLightbox}
								className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
							>
								<motion.div
									initial={{ scale: 0.85, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.9, opacity: 0 }}
									transition={{ duration: 0.2, ease: "easeOut" }}
									onClick={(e) => e.stopPropagation()}
									className="relative w-full max-w-5xl"
								>
									<img
										src={current.src}
										alt={current.alt}
										className="max-h-[85vh] w-full object-contain"
									/>
									<button
										type="button"
										aria-label="Close"
										onClick={closeLightbox}
										className="-top-3 -right-3 absolute flex h-9 w-9 items-center justify-center border border-zinc-700 bg-black text-gray-300 transition-colors hover:border-green-300 hover:text-green-300"
									>
										<RiCloseLine size={18} />
									</button>
								</motion.div>
							</motion.div>
						)}
					</AnimatePresence>,
					document.body,
				)}
		</>
	);
}
