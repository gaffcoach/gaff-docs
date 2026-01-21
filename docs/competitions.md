# Competitions

On Gaff, anyone can found and run competitions with smart-contract fairness and instant liquidity. This page covers Mixed Tournaments, Knockout Tournaments, Leagues, and Friendlies.

### 8.0 Core Concepts (Apply to Tournaments & Leagues)

#### 8.0.1 Creator-Led, Contract-Enforced

- **Anyone can create** a competition from the UI.
- The contract escrows entry fees, enforces rules, schedules rounds, and releases prizes automatically.

#### 8.0.2 Configurable Parameters (per competition)

| Parameter                   | What it does                                                                                       |
| --------------------------- | -------------------------------------------------------------------------------------------------- |
| **Entry Fee**               | Per-club fee paid on join, escrowed until conclusion.                                              |
| **Max Strength**            | Upper bound on a club’s avg player strength allowed to enter (anti-whale tiering).                 |
| **Match Frequency**         | Minutes/hours between rounds, drives synchronized kickoffs (Round 1 at T0, Round 2 at T0+f, etc.). |
| **Payout Format**           | **Hardline** (winner-takes-most, sharper tails) vs **Broad** (more placements, softer tails).      |
| **TeamCount**               | Total slots, when filled, the contract **locks** (no more join/leave).                             |
| **GroupCount** (Mixed only) | Number of groups for round-robin stage (e.g., 2, 4, 8…).                                           |

> **Join/Leave window:** Users can **join or leave** until **TeamCount is filled**. Filling the last slot triggers a **contract lock,** from that block onward **no one can join or leave**.

#### 8.0.3 Creator Fee (Both Tournaments & Leagues)

- **5% creator fee (capped at 1 BNB)** is paid **at conclusion** of the competition.
- Fee is taken from the prize pool **after** chain fees and before prize distribution.

#### 8.0.4 Leaderboards & Side Prizes

- **Top Scorer** & **Top Assist** prizes exist for **all** competitive formats (Mixed, KO, League).
- Tiebreak rule is **“First to reach N”** (chronological events) to avoid confusion.

#### 8.0.5 Anti-Sybil & Fairness

- Unique wallet checks + device heuristics keep entries honest.
- Max strength filters prevent smurf stomps.
- Synchronized rounds eliminate “schedule roulette.”

---

### 8.1 Mixed Tournament (Group Stage → Knockout)

A Mixed tournament runs a **Group Stage (Round-Robin)**, then **auto-seeds** into a **Knockout** bracket.

#### 8.1.1 Creation Flow

1. **Set parameters**: Entry Fee, Max Strength, Match Frequency, **TeamCount**, **GroupCount**, Payout Format.
2. **Deploy/initialize**: Contract advertises open slots.
3. **Join/Leave window**: Clubs enter or withdraw freely until **TeamCount** fills.
4. **Lock**: Filling last slot → **contract lock**. The group draw runs, fixtures are generated, and **Round 1 kickoff** time is set.

#### 8.1.2 Group Stage

- **Draw:** Clubs are randomly drawn into **Group A…N** with even distribution.
- **Fixtures:** Round-robin within each group (each team plays all others once, admin/creator can choose “home/away” double round-robin in advanced mode, roadmap).
- **Synchronized rounds:** Every match in a round starts at the same timestamp for fairness.
- **Scoring:** 3 points win, 1 draw, 0 loss.
- **Tiebreakers:**
  1. **Head-to-Head (H2H) points**,
  2. **H2H goal difference**,
  3. **Overall goal difference (GD)**,
  4. **Goals For (GF)**,
  5. **Fair Play** (cards/discipline),
  6. **Coin Flip** (on-chain random).
- **Completion check:** The system verifies **all group matches** finished before seeding KO.

#### 8.1.3 Auto-Seeding to Knockout

- **Top 2** (or creator-set top-K) from each group qualify.
- **Cross-pairing**: Group A(1st) vs Group B(2nd), Group B(1st) vs Group A(2nd), etc., to avoid early rematches.

#### 8.1.4 Knockout Stage

- **Rounds:** Round of X → Quarterfinals → Semifinals → Final (depends on qualifiers).
- **Draw resolution:** If tied after normal time, **penalties** decide (optional ET on roadmap).
- **Scheduling:** Each KO round fires at synchronized times, the next round only generates once all matches in the current round have winners.

#### 8.1.5 Payouts (Mixed)

- **Pool:** Sum(entry fees) − gas − **creator fee (5% capped at 1 BNB)** − **platform fee** = prize pool.
- **Format:**
  - **Hardline:** Winner 65–80%, Runner-up 20–30%, 3rd 0–10% (config bands).
  - **Broad:** Winner 50–60%, Runner-up 25–30%, 3rd 10–15%, 4th 0–5%.
- **Side Prizes:** **Top Scorer** & **Top Assist** get fixed or % micro-awards.
- **Distribution:** On chain, at conclusion.

#### 8.1.6 Edge Cases

- **Walkovers (W/O):** If a club cannot field a lineup, match is played with defaults, repeated W/O can auto-DQ (refundable rules are creator-set).
- **Reschedules:** Only **pre-Round** (before any match in that round starts) and only to maintain synchronicity.
- **Disputes:** Events and outcomes are **on-chain / logged,** admin overrides are visible and auditable.

**Diagram (textual):**\
Group Draw → RR Fixtures (R1, R2, R3…) → Standings (H2H > GD > GF > Fair Play > Coin) → Cross-Seed → KO (R of X, QF, SF, Final) → Payout & Creator Fee

---

### 8.2 Knockout Tournament (Pure Cup)

A straight **bracket,** perfect for weekend cups, brand events, or high-stakes sprints.

#### 8.2.1 Creation Flow

1. **Set parameters**: Entry Fee, Max Strength, Match Frequency, **TeamCount**, Payout Format.
2. **Open slots**: Clubs join/leave until the **TeamCount** fills.
3. **Lock & Seed**: Final join triggers **contract lock,** bracket is drawn and **Round 1** time is set.

#### 8.2.2 Match Rules

- **Single-leg ties** (default).
- **Tie resolution:** Penalties if level at FT (ET optional on roadmap).
- **Round cadence:** Synchronized rounds per Match Frequency.
- **Bracket integrity:** Mapping of winners to next round is immutable post-lock.

#### 8.2.3 Payouts (KO)

- Same logic as Mixed but **no group awards,** all prize goes to **placements** + **side prizes**.
- **Hardline** vs **Broad** distributions are creator-selectable.

#### 8.2.4 Rescheduling & Forfeits

- **Reschedule** is only possible **before any match in a round** has started (to keep synch).
- **Forfeits** trigger W/O with published reason, repeated forfeits can auto-DQ.

**Diagram (textual):**\
Open Slots → Lock → Bracket Draw → R1 (sync) → R2 … → Final → Payouts + Creator Fee

---

### 8.3 Leagues (Seasonal / Recurring)

Longer arcs with standings, form cycles, and meta strategy. **Top 3** win prizes, **Top Scorer** & **Top Assist** earn side awards.

#### 8.3.1 Season Setup

- **Parameters:** Entry Fee, Max Strength, Match Frequency, **TeamCount**, Payout Format.
- **Format:**
  - **Single Round-Robin** or **Double Round-Robin** (home/away) per season length.
  - Matches are scheduled in **rounds** (all fixtures per round kick off together).
- **Locking:** When **TeamCount** fills, league locks and the season calendar is minted.

#### 8.3.2 Table & Tiebreakers

- **Points:** 3/1/0.
- **Tie order:** H2H points → H2H GD → Overall GD → GF → Fair Play → Coin.

#### 8.3.3 Prizes & Fees (Leagues)

- **Creator fee:** **5% capped at 1 BNB**, paid at season end.
- **Prize pool:** Sum(entry fees) − gas − creator fee − platform fee.
- **Placements:** **Top 3** paid according to **Hardline** or **Broad**:
  - **Hardline (example):** 1st 65%, 2nd 25%, 3rd 10%.
  - **Broad (example):** 1st 55%, 2nd 28%, 3rd 17%.
- **Side Prizes:** **Top Scorer** & **Top Assist** (same tie rule: first to N).

#### 8.3.4 Promotion / Relegation (Roadmap)

- Multi-division ladders with **auto-promote / auto-relegate** across seasons.
- Performance history & club rating influence **seeded placements** next season.

#### 8.3.5 Integrity & Scheduling

- **Congestion-aware frequency** (creators set cadence, system warns about over-tight windows).
- **Reschedules** only before any match in a round has kicked off.
- **W/O policy** similar to tournaments with progressive penalties & public logs.

**Diagram (textual):**\
Open Slots → Lock → Calendar Minted → R1..Rn (sync rounds) → Final Table → 1st/2nd/3rd + Side Prizes → Creator Fee

---

### 8.4 Friendlies (Low-Stake, High-Signal)

Great for **chemistry**, **fitness**, and **evaluation,** without inflating the economy.

#### 8.4.1 Purpose & Effects

- **No entry fee, no prize pool** (creator can optionally set micro bounties, roadmap).
- **Non-inflationary gains**:
  - **Chemistry**: increases when units play together.
  - **Fitness**: restores match rhythm, helps form without boosting core attributes.
  - **Scouting**: reveals ranges for **academy prospects** (§Academy).

#### 8.4.2 Setup

- Quick-match (auto matchmaking) or private lobbies.
- **Synchronized start** removed for agility, still logged for integrity.

#### 8.4.3 Limits

- Hard caps per day to avoid exploit loops.
- Friendlies **do not** count toward prize leaderboards.

---

### 8.5 Payout Formats in Detail

Choose **Hardline** for sharper, esport-like stakes—**Broad** to reward deeper fields.

| Format       | Placement Split (example)                                                  | Side Prizes                                      |
| ------------ | -------------------------------------------------------------------------- | ------------------------------------------------ |
| **Hardline** | Winner 70%, Runner-up 25%, 3rd 5% (KO), 1st 65%, 2nd 25%, 3rd 10% (League) | Fixed or % micro-awards (Top Scorer, Top Assist) |
| **Broad**    | Winner 55%, Runner-up 28%, 3rd 17%                                         | Same as above                                    |

> **Note:** Exact bands are creator-selectable within safe ranges enforced by the contract.

**Top Scorer / Top Assist tie rule:** Sort by **total** desc, then **earliest timestamp reaching that total** (identical in backend payouts and frontend display).

---

### 8.6 Join/Leave, Locking, and Refunds

- **Join:** Pay entry fee → escrow. The club is checked against **Max Strength**.
- **Leave:** Full refund **until lock** (i.e., until the final slot is filled).
- **Lock Trigger:** When **TeamCount** is reached, the contract **locks** the field, **no join, no leave**.
- **After Lock:** If a club cannot continue, W/O rules apply, **no refunds** unless the creator set an explicit policy (visible at creation and enforced by contract).

---

### 8.7 Scheduling & Sync Rounds

- **Group & League rounds:** All fixtures in the same round share **one kickoff time** per competition.
- **KO rounds:** Synchronized per round, with the next round generated only after **every tie** in the current round has a winner.
- **Frequency:** Creator-set `matchFrequency` (minutes/hours) powers:
  - R1 at T0, R2 at T0 + f, R3 at T0 + 2f… (group/league).
  - QF at T0, SF at T0 + f, Final at T0 + 2f (KO).

---

### 8.8 Admin & Diagnostics (Transparent by Design)

- **Event logs**: Goals, assists, cards, subs, winners, on-chain or persisted with verifiable hashes.
- **Auditability**: Any manual intervention (rare) is **publicly stamped** with reason.
- **Dashboards**: Join/leave timelines, payout proofs, bracket seeds, tiebreak calculations.

---

### 8.9 Quick How-To (Creators)

1. **Pick a format:** Mixed (Group→KO), KO, or League.
2. **Set parameters:** Entry Fee, Max Strength, Match Frequency, TeamCount (and GroupCount for Mixed), Payout Format.
3. **Publish:** Competition appears in discovery, clubs start joining.
4. **Watch the lock:** When the last slot fills, the contract **locks** and fixtures auto-generate.
5. **Run it:** Rounds execute on schedule, standings/bracket auto-update.
6. **Conclude:** Payouts + Side Prizes distribute **on-chain,** **creator fee** is paid out (5% capped at 1 BNB).

---

### 8.10 At-a-Glance Comparison

| Feature                | Mixed Tournament          | Knockout Tournament | League                          | Friendlies   |
| ---------------------- | ------------------------- | ------------------- | ------------------------------- | ------------ |
| Player Cap (TeamCount) | Yes                       | Yes                 | Yes                             | Optional     |
| Group Stage            | Yes                       | No                  | N/A (table season)              | No           |
| KO Bracket             | Yes (post-groups)         | Yes                 | No                              | No           |
| Entry Fee / Prize Pool | Yes                       | Yes                 | Yes                             | No           |
| Creator Fee            | 5% (cap 1 BNB)            | 5% (cap 1 BNB)      | 5% (cap 1 BNB)                  | None         |
| Payout Format          | Hardline / Broad          | Hardline / Broad    | Hardline / Broad (Top 3)        | None         |
| Side Prizes            | Top Scorer / Assist       | Top Scorer / Assist | **Top 3 +** Top Scorer / Assist | None         |
| Join/Leave             | Until lock                | Until lock          | Until lock                      | N/A          |
| Round Sync             | Yes (groups & KO)         | Yes                 | Yes                             | Not required |
| Tie Resolution         | H2H > GD > GF > FP > Coin | Pens                | H2H > GD > GF > FP > Coin       | N/A          |

---

### 8.11 UX Touches That Matter

- **“Slots left”** and **“time to lock”** badges drive urgency.
- **Strength gate preview** shows if your club qualifies before you pay.
- **Brackets & tables** update live via sockets, mobile tabs for **Fixtures**, **Standings/Bracket**, **Leaders**.
- **Creator console** surfaces health checks: no-shows, projected payout, dispute risk = low.

---

### 8.12 Why It Feels Premium

- **Zero spreadsheet admin,** contracts do the heavy lifting.
- **Synchronized rounds** feel like broadcast windows.
- **Fair, explicit tiebreaks** and **identical backend/frontend logic** for side awards remove ambiguity.
- **Creator fee with hard cap** makes hosting sustainable without draining the pool.

> Build weekend cups, monthly leagues, or mega Mixed majors. Click **Create**, set your dials, and let the chain run the show, **transparent, trustless, and addictive in the best way**.
