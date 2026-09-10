// Talks to Recall.ai, the service that sends a "bot" into a Zoom call to
// listen and transcribe it. Docs: https://docs.recall.ai
const REGION = process.env.RECALL_REGION || "us-west-2";
const BASE = `https://${REGION}.recall.ai/api/v1`;

function authHeader() {
  return { Authorization: `Token ${process.env.RECALL_API_KEY}` };
}

function sanitizeBotId(botId: string): string {
  // Keep bot IDs to a safe character set so untrusted input cannot alter URL paths.
  if (!/^[A-Za-z0-9_-]+$/.test(botId)) {
    throw new Error("Invalid bot ID format.");
  }
  return botId;
}

// Sends a bot into the given Zoom meeting URL. Uses "meeting_captions" as the
// transcript provider — that's Zoom's own built-in captions, which Recall.ai
// doesn't charge extra for (vs. their own higher-accuracy transcription at
// +$0.15/hr). Good enough to start; can upgrade later if accuracy is an issue.
export async function startBot(meetingUrl: string) {
  if (!process.env.RECALL_API_KEY) {
    throw new Error("RECALL_API_KEY is not set. Add it to your .env file — see .env.example.");
  }
  const res = await fetch(`${BASE}/bot/`, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify({
      meeting_url: meetingUrl,
      bot_name: "DealFlow Notetaker",
      recording_config: {
        transcript: { provider: { meeting_captions: {} } },
      },
    }),
  });
  if (!res.ok) throw new Error(`Recall.ai bot creation failed: ${await res.text()}`);
  return res.json(); // includes .id — this is the recallBotId we store
}

// Fetches the bot's data once it's done, including where to get the transcript.
export async function getBot(botId: string) {
  const safeBotId = encodeURIComponent(sanitizeBotId(botId));
  const res = await fetch(`${BASE}/bot/${safeBotId}/`, { headers: authHeader() });
  if (!res.ok) throw new Error(`Recall.ai get bot failed: ${await res.text()}`);
  return res.json();
}

// Pulls the transcript and joins it into plain readable text with speaker names,
// e.g. "Chizu: Let's talk about the discount..." — this is what we hand to the AI.
export async function getTranscriptText(botId: string): Promise<string> {
  const bot = await getBot(botId);
  const recording = bot.recordings?.[0];
  const transcriptUrl = recording?.media_shortcuts?.transcript?.data?.download_url;
  if (!transcriptUrl) return "";

  let parsed: URL;
  try {
    parsed = new URL(transcriptUrl);
  } catch {
    throw new Error("Transcript URL from Recall.ai was not a valid URL.");
  }

  // Direct, inline checks only — no array/callback indirection — so static
  // analysis can trace that this value is validated before use.
  const isTrusted =
    parsed.protocol === "https:" &&
    (parsed.hostname === "recall.ai" ||
      parsed.hostname.endsWith(".recall.ai") ||
      parsed.hostname === "recallai-production-bot-data.s3.amazonaws.com");

  if (!isTrusted) {
    throw new Error(`Refusing to fetch transcript from untrusted host: ${parsed.hostname}`);
  }

  // Fetch the validated URL object itself, not the original raw string.
  const res = await fetch(parsed);
  const data = await res.json();

  // Transcript format is a list of speaker segments with word arrays.
  return (data || [])
    .map((seg: any) => `${seg.participant?.name || "Unknown"}: ${(seg.words || []).map((w: any) => w.text).join(" ")}`)
    .join("\n");
}
    
