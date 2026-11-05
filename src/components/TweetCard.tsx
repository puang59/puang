import {
	RiArrowRightUpLine,
	RiChat3Line,
	RiHeart3Line,
	RiPlayFill,
	RiTwitterXFill,
} from "@remixicon/react";

type TweetData = {
	text: string;
	created_at: string;
	favorite_count?: number;
	conversation_count?: number;
	display_text_range?: [number, number];
	user: { name: string; screen_name: string; profile_image_url_https: string };
	entities?: { urls?: { url: string; display_url: string }[] };
	mediaDetails?: { type: string; media_url_https: string }[];
};

// X's public syndication endpoint (the one its own embeds use) returns the
// post as JSON, so the card can be rendered natively in the site's style.
async function getTweet(id: string): Promise<TweetData | null> {
	try {
		const res = await fetch(
			`https://cdn.syndication.twimg.com/tweet-result?id=${id}&lang=en&token=4`,
			{ next: { revalidate: 60 * 60 * 24 } },
		);
		if (!res.ok) return null;
		const data = await res.json();
		return data?.text ? (data as TweetData) : null;
	} catch {
		return null;
	}
}

const decode = (text: string) =>
	text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

// Trims trailing media links and swaps t.co links for their display text.
function tweetParts(tweet: TweetData) {
	const [start, end] = tweet.display_text_range ?? [0, tweet.text.length];
	const text = decode(Array.from(tweet.text).slice(start, end).join(""));
	const urls = tweet.entities?.urls ?? [];
	const parts: { text: string; link?: boolean }[] = [];
	let rest = text;
	for (const url of urls) {
		const at = rest.indexOf(url.url);
		if (at < 0) continue;
		parts.push({ text: rest.slice(0, at) });
		parts.push({ text: url.display_url, link: true });
		rest = rest.slice(at + url.url.length);
	}
	parts.push({ text: rest });
	return parts;
}

const compact = (n: number) =>
	n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k` : String(n);

export default async function TweetCard({ id }: { id: string }) {
	const href = `https://x.com/notpuang/status/${id}`;
	const tweet = await getTweet(id);

	if (!tweet) {
		return (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="group flex items-center justify-between rounded-lg border border-line bg-surface px-4 py-3 text-muted text-sm transition-colors duration-300 hover:border-edge hover:text-foreground"
			>
				<span className="flex items-center gap-2">
					<RiTwitterXFill size={14} />
					View the post on X
				</span>
				<RiArrowRightUpLine size={14} />
			</a>
		);
	}

	const media = tweet.mediaDetails?.[0];
	const date = new Date(tweet.created_at).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex gap-5 rounded-lg border border-line bg-surface p-3.5 transition-colors duration-500 ease-soft hover:border-edge"
		>
			{media && (
				<div className="relative aspect-video w-28 shrink-0 self-center overflow-hidden rounded-md bg-raised ring-1 ring-line sm:w-40">
					<img
						src={media.media_url_https}
						alt=""
						loading="lazy"
						className="h-full w-full object-cover opacity-80 transition-[transform,opacity] duration-700 ease-soft group-hover:scale-[1.04] group-hover:opacity-100"
					/>
					{media.type !== "photo" && (
						<span className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur">
							<RiPlayFill size={12} />
						</span>
					)}
				</div>
			)}

			<div className="flex min-w-0 flex-1 flex-col gap-2.5 py-1 pr-2">
				<div className="flex items-center gap-2">
					<img
						src={tweet.user.profile_image_url_https}
						alt=""
						className="h-4 w-4 rounded-full grayscale transition-[filter] duration-700 ease-soft group-hover:grayscale-0"
					/>
					<p className="min-w-0 truncate text-xs">
						<span className="font-medium text-foreground">
							{tweet.user.name}
						</span>
						<span className="font-mono text-[11px] text-faint">
							{" "}
							@{tweet.user.screen_name} · {date}
						</span>
					</p>
					<RiTwitterXFill
						size={12}
						className="ml-auto shrink-0 text-faint transition-colors duration-300 group-hover:text-foreground"
					/>
				</div>

				<p className="line-clamp-2 text-muted text-sm leading-relaxed">
					{tweetParts(tweet).map((part, i) =>
						part.link ? (
							// biome-ignore lint/suspicious/noArrayIndexKey: static text segments
							<span key={i} className="text-foreground">
								{part.text}
							</span>
						) : (
							part.text.replace(/\s*\n+\s*/g, " ")
						),
					)}
				</p>

				<div className="mt-auto flex items-center gap-4 pt-0.5 font-mono text-[11px] text-faint">
					{tweet.favorite_count !== undefined && (
						<span className="flex items-center gap-1">
							<RiHeart3Line size={11} />
							{compact(tweet.favorite_count)}
						</span>
					)}
					{tweet.conversation_count !== undefined && (
						<span className="flex items-center gap-1">
							<RiChat3Line size={11} />
							{compact(tweet.conversation_count)}
						</span>
					)}
					<span className="ml-auto flex items-center gap-0.5 transition-colors duration-300 group-hover:text-foreground">
						view
						<RiArrowRightUpLine size={11} />
					</span>
				</div>
			</div>
		</a>
	);
}
