# Managers’ Chat Threads

Every competition on Gaff—Tournaments (Mixed & KO), Leagues, and Friendlies—comes with its own real-time chat thread. It’s the clubhouse where managers brag, banter, share receipts, and celebrates.

### What it is

- **Per-competition rooms:** Each event has a unique chat so conversation stays on-topic and context-rich.
- **Live by default:** Messages stream instantly via sockets, no reloads needed.
- **Media support:** Post **images** (lineup screenshots, victory posters, meme recaps). EXIF is stripped, safe sizes enforced.
- **Lightweight but lively:** Reactions (👍🔥😂), inline match links, and auto-formatted scorelines (`Team A 2–1 Team B`).

---

### Why it matters

- **Adds stakes & story:** Banter turns fixtures into rivalries. Rivalries keep managers coming back.
- **Social scouting:** Share clips, ask about prospects, compare training plans, community accelerates mastery.
- **Better retention:** Leagues with active chat see higher re-joins and creator repeat events.
- **Healthier economy:** The more managers socialize, the more **listings**, **loans**, and **friendlies** they spin up.

---

### Core Features

| Area              | Details                                                         |
| ----------------- | --------------------------------------------------------------- |
| **Identity**      | Shows club name + crest, creator and admins marked with badges. |
| **Images**        | PNG/JPG up to N MB, thumbnails in-thread, click to zoom.        |
| **Mentions**      | `@username` to ping rivals (rate-limited to prevent spam).      |
| **Context links** | Auto-link a match ID to jump to its card on the page.           |
| **Reactions**     | Quick reacts (max 3 per message to keep signal).                |
| **Pinned**        | Creators/admins can pin rules, schedule changes, prize posts.   |
| **Search**        | Keyword search within the room (e.g., “lineup”, “Group B”).     |
| **Read receipts** | Subtle “seen by X” on pinned announcements only.                |
| **Localization**  | Client locale formatting, emoji picker included.                |

---

### Safety & Fair Play

- **Report / Mute / Block:** One-tap report, personal mute and block lists.
- **Filters:** Profanity filter with escalating cooldowns (shadow-mute on repeat).
- **Image checks:** Size/type validation, safe-content heuristics.
- **Rate limits:** Burst and sustained limits to prevent floods.
- **Audit trail:** Admin actions (pin, remove) are logged with timestamps.

> Goal: keep the spice, stop the spam.

---

### UX Flow

1. **Open Competition → “Chat” tab** (also accessible from the sticky bar).
2. **Post text or image** (drag-drop or mobile picker).
3. **React or reply** (quote-reply to keep threads tidy during peak moments).
4. **Jump to context** (click a linked match to view its card, then back).
5. **Pin announcements** (creators/mods only).

Mobile: the chat sits on a dedicated screen with quick tabs for **Fixtures**, **Standings/Bracket**, and **Leaders,** switching keeps scroll position.

---

### Under the hood (brief)

- **Rooms:** `tournament:{id}`, `league:{id}`, `friendly:{id}`.
- **Transport:** WebSocket with auth token handshake.
- **Persistence:** Messages stored with competition ID, author club, and optional media metadata.
- **Moderation hooks:** Server-side interceptors for filters, limits, and admin controls.

---

### Best Practices for Managers

- **Bring receipts:** Post your lineup screenshot pre-kickoff, win or lose, it fuels great debriefs.
- **Celebrate, don’t denigrate:** Sharp banter, not personal attacks.
- **Pin schedules:** If you’re the creator, pin the fixture times and prize splits early.
- **Use mentions sparingly:** Save pings for real moments (finals, tiebreaks, big trades).

---

### Coming soon (roadmap)

- **Room polls** (MVP of fan voting on “Goal of the Round”).
- **Image albums** per competition.
- **Creator-only announcements channel** mirrored in main chat.
- **Mini trophy emojis** for round winners that persist for the competition’s duration.

---

#### TL,DR

**Chat makes competitions unforgettable.** It turns a list of fixtures into a living season, with memes, mind games, and momentum. Post your brag, drop your lineup, pin your prize pool, then meet your rivals on the pitch.
