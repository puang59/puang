"use client";

import {
	RiArrowLeftSLine,
	RiArrowRightSLine,
	RiCloseLine,
	RiZoomInLine,
} from "@remixicon/react";
import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { MediaItem } from "./Projects";

// Tweets are rendered separately as cards, so the carousel only shows media.
type ShowcaseItem = Exclude<MediaItem, { type: "tweet" }>;

export function MediaCarousel({
	media,
	title,
}: {
	media: ShowcaseItem[];
	title: string;
}) {
	const [index, setIndex] = useState(0);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	const current = media[index];

	useEffect(() => {
		setMounted(true);
	}, []);

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
			<div className="group relative aspect-video w-full overflow-hidden rounded-lg border border-line bg-raised">
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
						<span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-500 ease-soft group-hover/image:bg-black/25 group-hover/image:opacity-100">
							<span className="flex h-9 w-9 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur">
								<RiZoomInLine size={18} />
							</span>
						</span>
					</button>
				)}

				{current.type === "video" && (
					// biome-ignore lint/a11y/useMediaCaption: decorative project demo video
					<video
						className="h-full w-full object-cover"
						src={current.src}
						autoPlay
						loop
						muted
						playsInline
						controls
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

				{media.length > 1 && (
					<>
						<button
							type="button"
							aria-label="Previous media"
							onClick={(e) => goTo(index - 1, e)}
							className="-translate-y-1/2 absolute top-1/2 left-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-muted opacity-80 backdrop-blur transition-all duration-300 ease-soft hover:bg-background/90 hover:text-foreground focus:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
						>
							<RiArrowLeftSLine size={18} />
						</button>
						<button
							type="button"
							aria-label="Next media"
							onClick={(e) => goTo(index + 1, e)}
							className="-translate-y-1/2 absolute top-1/2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/70 text-muted opacity-80 backdrop-blur transition-all duration-300 ease-soft hover:bg-background/90 hover:text-foreground focus:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
						>
							<RiArrowRightSLine size={18} />
						</button>
						<div className="-translate-x-1/2 absolute bottom-2 left-1/2 z-10 flex gap-1.5">
							{media.map((item, i) => {
								const key =
									item.type === "image" || item.type === "video"
										? item.src
										: `${item.type}-${item.id}`;
								return (
									<button
										key={key}
										type="button"
										aria-label={`Go to slide ${i + 1}`}
										onClick={(e) => goTo(i, e)}
										className={`h-1.5 rounded-full transition-all duration-500 ease-soft ${
											i === index
												? "w-4 bg-foreground"
												: "w-1.5 bg-foreground/35"
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
							<m.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.18 }}
								onClick={closeLightbox}
								className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-sm sm:p-10"
							>
								<m.div
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
										className="max-h-[85vh] w-full rounded-lg object-contain"
									/>
									<button
										type="button"
										aria-label="Close"
										onClick={closeLightbox}
										className="-top-3 -right-3 absolute flex h-9 w-9 items-center justify-center rounded-full border border-edge bg-background text-muted transition-colors hover:text-foreground"
									>
										<RiCloseLine size={18} />
									</button>
								</m.div>
							</m.div>
						)}
					</AnimatePresence>,
					document.body,
				)}
		</>
	);
}
