# Training

Turn raw potential into match-winning edges, without breaking realism. Gaff’s training system is built to reward discipline over bingeing, and coaching IQ over grinding.

### 7.1 Design Goals

- **Match-first progression:** Training nudges attributes, **matches** (minutes, ratings, form) remain the main driver of value and reputation.
- **Diminishing returns:** The more you spam a drill, the less it yields.
- **Fatigue is real:** Every session consumes stamina and elevates injury risk if mismanaged.
- **Schedule-smart:** Plans that respect matchdays beat random sessions.
- **Exploit-resistant:** Soft locks, cooldowns, and account-wide caps thwart farm loops.

---

### 7.2 Training Primitives

Each player has **2 daily drill slots**. Drills are atomic, short sessions focused on single attributes or small bundles.

#### 7.2.1 Drill Catalogue

| Drill            | Primary Attribute(s) | Secondary Link(s)      | Minutes Equivalent\* | Notes                                           |
| ---------------- | -------------------- | ---------------------- | -------------------- | ----------------------------------------------- |
| Finishing        | `finishing`          | firstTouch, composure  | 4 - 8H               | Strikers benefit most, halved gains for GKs/CBs |
| First Touch      | `firstTouch`         | balance                | 4 - 8H               | Helps press-resistance under pressure           |
| Pace             | `pace`               | stamina (minor), accel | 4 - 8H               | Gains taper fastest to avoid speed creep        |
| Vision           | `vision`             | passing, decision      | 4 - 8H               | Boosts assist likelihood in sim                 |
| Defensive Shape  | `defPositioning`     | tackling, anticipation | 4 - 8H               | Team defensive rating synergy                   |
| Press Resistance | `pressResist`        | firstTouch, vision     | 4 - 8H               | Reduces dispossessions in sim                   |
| Aerials          | `heading`            | jumping, strength      | 4 - 8H               | Set-piece offense/defense impact                |

\* _Minutes Equivalent_ feeds fatigue calc (below).

---

### 7.3 Gains, Fatigue, and Risk

#### 7.3.1 Diminishing Returns (per attribute)

Let **Δ_base** be the base improvement for a drill (e.g., **0.40** rating points), and **r** the number of sessions on that same attribute in the **last 7 days**.

```
Δ_effective = Δ_base / (1 + 0.35 × r)
```

- Repeating **Finishing** for a ST 3 times this week yields \~ **0.40**, **0.30**, **0.24** (approx).
- Back-to-back **same drill in same day** applies **×0.5** soft penalty **or** triggers a **soft lock** (admin-tunable per tier).

#### 7.3.2 Fatigue Cost

```
minutes_equiv = drill_intensity × (20..40)   // see table & tier modifiers
stamina_after = max(0, stamina_before - ceil(minutes_equiv / 3))
```

- Players entering matches with **low stamina** face higher **injury risk** (see §7).
- Fatigue partially **recovers overnight,** higher with quality facilities & staff (roadmap).

#### 7.3.3 Hard Caps & Soft Locks

- **2 drills/day/player** hard cap.
- **Same-drill spam** within 48h → **halved gains**.
- **Weekly attribute window**: after **r_max** (e.g., 6) sessions to the same attribute, further gains **flatten** to protect balance.

---

### 7.4 Scheduling & Plans

#### 7.4.1 Smart Scheduling

- Plans that **avoid heavy drills** within **24h of kickoff** preserve stamina & reduce injuries.
- Light “activation” (First Touch, Vision) on matchday is allowed with **reduced fatigue**.

#### 7.4.2 Club-Level Training Plans

Two modes:

**Templates (one-click)**

- 4-3-3 Wing Overload: Wingers → Pace/First Touch, FBs → Aerials/Shape, ST → Finishing.
- 4-2-3-1 Compact: DMs → Defensive Shape/Press Resist, AM → Vision/First Touch.
- 3-5-2 Transition: CBs → Aerials/Shape, WBs → Pace/Press Resist, STs → Finishing.

**Custom JSON**

```json
{
  "name": "433 Wing Overload",
  "weekly": {
    "Mon": [
      { "pos": ["W", "FB"], "drill": "Pace" },
      { "pos": ["ST"], "drill": "Finishing" }
    ],
    "Tue": [{ "pos": ["CM", "DM"], "drill": "Press Resistance" }],
    "Wed": [{ "pos": ["CB"], "drill": "Defensive Shape" }],
    "Thu": [{ "pos": ["AM", "W"], "drill": "First Touch" }],
    "Fri": [{ "all": true, "drill": "Vision" }],
    "Sat": [{ "matchday": true, "light": true }],
    "Sun": [{ "recovery": true }]
  },
  "respectCaps": true,
  "avoidPreMatchHours": 24
}
```

- Plans **auto-assign** drills M–Su, **obey caps**, and **respect matchdays**.
- Mid-week matches? Engine shifts heavy sessions earlier and suggests swaps.

---

### 7.5 Shop Boost Items (Carefully Constrained)

Boosts help **smooth variance** and **recover smarter**, not replace training or match skill.

| Item       | Effect (capped)                                | Cooldown   | Weekly Account Cap\* | Notes                                      |
| ---------- | ---------------------------------------------- | ---------- | -------------------- | ------------------------------------------ |
| Energy Gel | +20 stamina (not above 100)                    | 24h/player | 10                   | Best within 24–48h pre-match               |
| Focus Band | Next technical drill +40% Δ_effective          | 72h/player | 6                    | No effect on spammed drills (post-penalty) |
| Rehab Pack | Clear minor knock, −50% injury risk next match | 72h/player | 4                    | Doesn’t cure medium/major injuries         |
| Morale Kit | +1 morale tier (caps at “High”)                | 48h/player | 6                    | Small match rating uplift                  |

\* **Anti-farm:** Caps are **account-wide**. Bulk buys trigger **dynamic pricing** in top divisions.

---

### 7.6 Progression & Attribute Integrity

- **Persistent growth:** Each drill adds a small, permanent increment.
- **Role modifiers:** Out-of-role drills yield **reduced gains** (e.g., GK doing Finishing).
- **Team synergies:** Defensive Shape gains stack into **team defensive rating,** Vision improves **build-up quality**.

**Example: Attribute Update**

```ts
function applyDrill(player, drill) {
  const attr = mapDrillToAttribute(drill);
  const r7 = sessionsLast7Days(player.id, attr);
  const delta =
    (baseGain(drill, player) / (1 + 0.35 * r7)) * roleMod(player, attr);

  player[attr] = clamp(player[attr] + delta, 1, 99);
  const minutes = intensityToMinutes(drill, player);
  player.stamina = Math.max(0, player.stamina - Math.ceil(minutes / 3));
  scheduleCooldowns(player.id, drill);
  logTrainingEvent(player.id, drill, delta, minutes);
}
```

---

### 7.7 Injury & Risk Model (Match Integration)

- **Base injury risk** per player uses **proneness**.
- **Risk multiplier** rises when a player’s **stamina < 40** or after **heavy drills within 24h** of kickoff.
- **Rehab Pack** halves **next-match** risk but doesn’t stack beyond **×0.5**.

```
risk = base_proneness × (1 + fatigueFactor + recencyPenalty)
fatigueFactor ≈ max(0, (60 - stamina) / 100)       // kicks in below 60
recencyPenalty = heavyDrillWithin(24h) ? 0.25 : 0
```

---

### 7.8 UI/UX: Coaching Workflow(Roadmap)

1. **Pick a weekly plan** (template or custom).
2. **Assign drills** (bulk by role, fine-tune on individuals).
3. **Simulate week**: See **projected fatigue**, **injury risk**, and **match readiness**.
4. **Game week adjustments**: Toggle light sessions for starters, push heavy work to bench/academy.
5. **Review analytics** (below) and iterate.

**Coach Hints**

- “Back-to-back Finishing detected on ST #1023, expected gain halved.”
- “CB #441 scheduled for heavy drill <18h before KO, injury risk +25%.”

---

### 7.9 Analytics & KPIs (Club & Investor-Facing)

- **Drill ROI:** Δ attribute per fatigue consumed by drill & role.
- **Plan adherence:** % of scheduled drills completed.
- **Injury-preventable rate:** % injuries with high pre-match risk signal.
- **Match impact:** Correlation of specific drills to match events (e.g., Finishing ↔ goals).
- **Fatigue discipline:** Avg stamina at kickoff per role.

**Sample Dashboard Table**

| Metric                        | Value | Trend |
| ----------------------------- | ----- | ----- |
| Avg Δ per drill (last 14d)    | +0.22 | ↗︎     |
| Starters’ KO stamina (avg)    | 88    | →     |
| Pre-KO heavy drills (<24h)    | 3     | ↘︎     |
| Preventable injuries (%)      | 14%   | ↘︎     |
| Drill spam incidents (weekly) | 5     | ↘︎     |

---

### 7.10 Anti-Exploit Guardrails

- **Account-wide boost caps** and **dynamic pricing** for whales.
- **Per-attribute weekly saturation** (r_max) neutralizes looping.
- **Same-day spam penalty** and **48h same-drill soft lock**.
- **Pre-match heavy-drill flagging** with optional auto-block at high tiers.
- **Abuse heuristics:** burst patterns across linked wallets trigger throttles.

---

### 7.11 Admin/League Knobs (Tunable Defaults)

| Setting                      | Default                 |
| ---------------------------- | ----------------------- |
| Daily drill slots / player   | 2                       |
| Base gain (technical drills) | +0.40 (before mods)     |
| Same-attribute decay factor  | 0.35                    |
| Same-day repeat penalty      | ×0.5 gain               |
| Weekly saturation (r_max)    | 6 sessions / attribute  |
| Heavy-drill pre-match window | 24h                     |
| Rehab effect                 | ×0.5 next-match risk    |
| Energy Gel                   | +20 stamina, 24h cd     |
| Focus Band                   | +40% next drill, 72h cd |
| Morale Kit                   | +1 tier, 48h cd         |

---

### 7.12 Roadmap Enhancements

- **Staff & Facilities:** Coaches reduce decay, facilities speed stamina recovery.
- **Micro-scrimmages:** Low-risk simulated minutes that affect **form** more than attributes.
- **Adaptive plans:** Plans that auto-shift based on **fixture congestion** and **opponent style**.
- **Team drills:** Cohesion sessions that raise **chemistry** and **press coordination**.

---

### 7.13 Quick FAQ

**Does training replace matches?**\
No. It’s a **multiplier**, not the main engine. Matches still drive reputation, leaderboards, and most value.

**Can I stack Focus Band to bypass decay?**\
No. It **multiplies Δ_effective after penalties** and won’t exceed cap.

**Do injuries from training happen?**\
Rarely, at **very low stamina** or after **improper scheduling**. The system warns you first.

**Can academy players use boosts?**\
Yes, but with **tighter caps** and **higher cooldowns** to prevent farm loops.

---

### 7.14 Coach’s Playbook (TL;DR)

- **Plan weekly**, don’t improvise daily.
- **Avoid heavy** within **24h of kickoff**.
- **Chase synergy** (Vision for AMs, Shape for CBs).
- **Use boosts sparingly** to solve real constraints (injury recovery, fixture congestion).
- **Monitor fatigue** and act before it becomes risk.

> Train like a champion: consistent, intentional, and match-aware. That’s how dynasties are built on Gaff.
