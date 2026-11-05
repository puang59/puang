import { env } from "~/env";

// Proxies CounterAPI so the API token never reaches the browser.
// GET /api/visits?hit=1 increments the counter; plain GET only reads it.
export const dynamic = "force-dynamic";

const BASE = "https://api.counterapi.dev/v2";

type CounterResponse = {
	data?: { up_count?: number; down_count?: number; count?: number };
	count?: number;
	value?: number;
};

const readCount = (res: CounterResponse) => {
	const data = res.data;
	if (typeof data?.up_count === "number") {
		return data.up_count - (data.down_count ?? 0);
	}
	return data?.count ?? res.count ?? res.value ?? null;
};

export async function GET(request: Request) {
	const workspace = env.COUNTER_WORKSPACE;
	const key = env.COUNTER_API_KEY;
	if (!workspace || !key) {
		return Response.json({ error: "counter not configured" }, { status: 503 });
	}

	const hit = new URL(request.url).searchParams.get("hit") === "1";
	const name = env.COUNTER_NAME ?? "visits";
	const url = `${BASE}/${workspace}/${name}${hit ? "/up" : ""}`;

	try {
		const res = await fetch(url, {
			headers: { Authorization: `Bearer ${key}` },
			cache: "no-store",
		});
		if (!res.ok) {
			return Response.json({ error: "counter unavailable" }, { status: 502 });
		}
		const value = readCount((await res.json()) as CounterResponse);
		return Response.json(
			{ value },
			{ headers: { "Cache-Control": "no-store" } },
		);
	} catch {
		return Response.json({ error: "counter unavailable" }, { status: 502 });
	}
}
