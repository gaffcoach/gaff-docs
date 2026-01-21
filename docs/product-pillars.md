# Product Pillars

### 4.1 Play Modes

#### Tournaments (core)

- **Knockout**
  - Bracketed cups created on demand.
  - **Strict separation** of infra: `cupMatch` tables + controller for life of the tournament.
  - Rounds auto-generate when all fixtures in a round complete.
  - Draws resolve via **penalties,** winners advance.
  - **Simultaneous rounds:** every match in a round shares one kickoff time.
- **Mixed (Groups → Knockout)**
  - **Group Stage** uses **dedicated** `groupMatch` / `groupStage` tables.
  - Round-robin, with **H2H > GD > GF** tiebreak order.
  - Top teams auto-seed into a **separate KO path** (still in `groupMatch` with `stage='KNOCKOUT'` to preserve type isolation).
  - **Simultaneous rounds** per group, all Round-2 games start together, etc.

```
[MIXED FLOW]
  Join → Group draw & schedule
     ├─ Group Round 1 (all groups, same T0)
     ├─ Group Round 2 (all groups, T0 + Freq)
     └─ Group Round 3 (all groups, T0 + 2×Freq)
  Qualify → Seeded KO Round 1 (all matches same time)
          → KO Round 2
          → Final
```

#### Friendlies (casual)

- Instant fixtures with optional stake-free rewards (XP, chemistry bump).
- Great for testing formations/tactics and trying academy call-ups.

#### Leagues (seasonal/recurring) — _Roadmap active_

- Rolling seasons, promotion/relegation pools, persistent standings.
- Prize pools + sponsorship slots, end-of-season awards flow into on-chain records.
- Season history contributes to **club legacy** and **fan-valued brand**.

---

### 4.2 Simulation DNA (Why matches feel real)

#### Formations & multipliers

| Formation | Attack | Defense | Notes              |
| --------- | ------ | ------- | ------------------ |
| 4-4-2     | 1.00   | 1.05    | Balanced coverage  |
| 4-3-3     | 1.15   | 0.90    | High press, wings  |
| 3-5-2     | 1.05   | 1.10    | Strong mid control |
| 4-2-3-1   | 1.10   | 1.00    | Creative 10s       |
| 4-1-4-1   | 0.95   | 1.15    | Screened back line |
| 5-3-2     | 0.85   | 1.25    | Compact deep block |
| 4-3-2-1   | 1.05   | 1.05    | Narrow “Xmas tree” |
| 3-4-3     | 1.20   | 0.85    | Overloads wide     |

#### Tactical levers

- **Pressing, width, tempo** → continuous nudges to attack/defense.
- **Game plan** (Counter / Wing / Direct), **defensive style** (Compact / Wide), **line instructions** (Push up / Defend deep), **marking** (Man / Mixed), **offside trap**.
- Each input caps within ±25% envelopes to keep outcomes believable.

#### Lineups & substitutions

- Default or custom XI, minute-accurate subs that **adjust stamina drain** (minutes-weighted).
- **Safety checks**: null/empty slots are **gracefully skipped** (no crashes if a slot is unfilled).

#### Events & injuries

- Goals, assists, substitutions, injuries (probability scaled by **injury proneness × low stamina**), and KO penalties when tied.
- Every event persisted with timestamps → **auditable payouts** & leaderboards.

#### Ratings & form

- Per-player 1–10 ratings influenced by minutes, goals, assists, role, rolling **form arrays** for clubs and players drive future sim expectations.

#### Fairness & noise

- **Home advantage** with **low luck range (±5%)**.
- Outcomes feel organic, not RNG-chaotic.

---

### 4.3 Schedules & Rounds (Fan-experience perfect)

- **Synchronized rounds**:
  - All fixtures in Round _r_ share the **same kickoff**.
  - Next round = **previous kickoff + matchFrequency**.
  - Applies to **Knockout** and **Mixed** (group & KO stages).
- **Live UI**:
  - Socket rooms (per tournament) broadcast `newResultsAndFixtures`.
  - SPA-fast, virtualized lists for smooth fixture feeds at any scale.

```
[TIME AXIS]
T0: Round 1 (all fixtures)
T0 + F: Round 2 (all fixtures)
T0 + 2F: Round 3 (all fixtures)
...
```

---

### 4.4 Payouts & Leaderboards (One rule, end-to-end)

- **Golden Rule:** “**First to reach N**” breaks ties for **Top Scorer** and **Top Assist**.
- **Backend payouts** scan event timestamps in order, the earlier achiever wins the tie.
- **Frontend boards** follow **identical sorting**: `count desc` → `earliest reach time asc`.
- Result: **zero confusion** between what users see and what the contract pays.

---

### 4.5 Ownership & Liquidity

- **Player NFTs**: everything you build (training, minutes, form, history) accrues into a **saleable asset**.
- **Economy primitives**:
  - **On-chain buys** for final settlement, provenance, and trust.
  - **Gasless lists/cancellations** for smooth UX, signature orders posted off-chain until execution.
  - **Loans** with duration, fees, and buy clauses, enforced by contract.
- **Tournament leaves** (pre-start) are on-chain with fair penalties/refunds handled by escrow.

---

### 4.6 Scouting & Signing (Finding the edge)

- **Discovery rails**
  - **Trending prospects**: high recent ratings, spike in minutes, or sudden form upticks.
  - **Under-priced filters**: stamina returns, post-injury discounts, position scarcity.
  - **Comps**: similarity search across attributes + event outcomes (e.g., “find me a budget CAM with ST-adjacent goals/90”).
- **Signals** (examples)
  - **Per-90**: Goals/90, Assists/90, Key actions/90.
  - **Contextual**: Last 5 form avg, role fit vs formation, fatigue risk (stamina trend).
- **Signing flows**
  - **Buy now** (on-chain), **negotiated transfer** (counteroffers), **loan** (fee + clause).
  - All with **escrow** and **auto-release** on completion.

---

### 4.7 Training (Turning time into value)

- **Session types**: Finishing (ST/LW/RW), Creativity (CAM/CM), Positioning (CB/FB), Distribution (GK), Conditioning (all).
- **Constraints**: stamina gates, match congestion penalties, diminishing returns.
- **Outputs**: gradual attribute shifts, **temporary boosts** (time-boxed), and **long-term arcs** recorded on-chain as metadata.
- **Risk/Reward**: aggressive plans increase short-term performance **and** injury risk.

---

### 4.8 Academy (Pipelines, not gacha)

- **Intake classes** seeded by club focus (e.g., “wings and 10s”), RNG within realistic bounds.
- **Progression**: academy matches (friendlies), internal ratings, form snapshots.
- **Graduation**: mint as NFT only when promoted to senior squad, **no clutter,** you only pay to mint when there’s conviction.
- **Marketability**: graduates inherit **provenance** (club, coach, drills used), improving price discovery.

---

### 4.9 Shop (Utility, not sink)

- **Boosts** (transparent, capped): recovery water, short-term morale, focus sessions.
- **No pay-to-win walls**: boosts help, but can’t brute-force sim fairness caps.
- **Recipe-style bundles**: seasonal combos encourage planning, not spam.
- **On/off-chain**: day-to-day gasless usage, on-chain stock-keeping for rare items.

---

### 4.10 Marketplace UX (Gasless where it should be)

**Lists & Offers**

- Gasless **create/cancel** (signatures)
- **On-chain fill** → finality, royalties, and escrow payouts executed atomically.

**Loan Desk**

- Pre-templated terms: duration, fee, wage split, buy clause %
- **Auto-revert** at expiry, player returns and metadata (minutes, form) persists.

**Portfolio**

- Mark-to-market valuations, realized P\&L, fee breakdowns.
- Tax-friendly CSV exports (periodic).

---

### 4.11 Referrals & Creator Rails

- **Two-sided referrals**: referrer earns on **tournament fees**, **marketplace fees**, and **shop** purchases within a time window.
- **Creator leagues**: white-label formats with a revenue share on entries/sponsorships.
- **Open data** means creators can ship dashboards, scouting newsletters, or highlights bots, and plug directly into referral ids.

---

### 4.12 Anti-Cheat, Anti-Sybil, Fair Play

- **Identity tiers**: higher stakes require stronger proofs (KYC-light or web-of-trust), casual play remains open.
- **Multi-account heuristics**: on-chain graph + device/browser signals to flag funneling.
- **Ref abuse**: diminishing returns per cluster, manual escalations on anomalies.
- **Public audit trails**: fixtures, events, payouts all traceable.

---

### 4.13 Builder Surface (APIs, data, sockets)

- **Realtime sockets**: match events, fixture updates, payout settlements.
- **Read APIs**: player stats, marketplace tickers, tournament states.
- **Webhooks**: trade fills, injury updates, training completions.
- **Licensing**: clear “do-anything” policy for non-custodial tools, curated spotlight for best community apps.

---

### 4.14 UX Philosophy (No velvet rope)

- **Web2-level polish**, **Web3-level rights**.
- Gasless where it matters (lists, routine ops), on-chain when it counts (ownership, payouts).
- Mobile-first screens for fixtures, bids, and quick training.

---

---

### 4.15 Example: Leaderboard Consistency (Front vs Payout)

```pseudo
// Backend payout (Top Scorer / Top Assist)
group events by playerId
compute {count, firstTimestamp}
sort by (count desc, firstTimestamp asc)
winner = first entry
```

```js
// Frontend board mirrors backend:
players.sort((a, b) => b.count - a.count || a.first - b.first);
```

_Result:_ the same name sits atop both lists—always.

---

### 4.16 Example: Round Scheduling

```pseudo
base = now()
for r in 1..maxRounds:
  kickoff[r] = base + (r-1) * matchFrequency
  for each match in round r:
    match.scheduledAt = kickoff[r]
```

_Guarantee:_ every fixture in round **r** shares the same kickoff.

---

### 4.17 What this unlocks

- **Players** turn time and taste into **assets** with resale and yield.
- **Clubs** compound into **brands** with history, fans, and cashflows.
- **Ecosystem** grows from a single game into **the** on-chain soccer economy.
