# Academy

Build a dynasty from the ground up. The Gaff Academy turns scouting, development, and graduation into a repeatable, skill-expressive pipeline, so your eye for talent becomes real, tradable value.

### 6.1 Why the Academy matters

- **Own the upside:** Graduate prospects into **Player NFTs** you can field, loan, or sell.
- **Skill > grind:** Smart scouting and disciplined development beat brute force.
- **Fair growth:** Anti-farm rails and balanced cohorts keep markets healthy.
- **End-to-end liquidity:** From first sighting → mint → match data → marketplace.

---

### 6.2 Lifecycle at a glance

**Pipeline overview**

```mermaid
flowchart LR
  A[Scout Points] --> B[Scouting Seeds<br/>(Region/Role/Archetype)]
  B --> C[Prospect Appears<br/>(Hidden Ranges)]
  C --> D[Evaluation Window<br/>Friendlies + Light Training]
  D --> E[Reveal Progress<br/>(Ranges Narrow)]
  E --> F[Graduation Check<br/>(Thresholds Met?)]
  F -->|Yes| G[Mint Player NFT]
  F -->|Not yet| C
  G --> H[Placement: Keep / Loan / Sell]
```

---

### 6.3 Scouting: how you find prospects

#### 6.3.1 Scout points & seeds

You spend **Scout Points** (earned via play, referrals, events) to cast **Scouting Seeds** that target what you want:

| Dimension  | Options (examples)                                   | Effect on Prospect Pool                         |
| ---------- | ---------------------------------------------------- | ----------------------------------------------- |
| Region     | West Africa, South America, Europe, East Asia, etc.  | Influences nationality mix & archetype bias     |
| Position   | GK, FB, CB, DM, CM, AM, W, ST                        | Increases chance of that position               |
| Archetype  | Target Man, Poacher, Regista, Destroyer, Wingback... | Small bias to trait bundles                     |
| Rarity mod | Standard / Rare seed                                 | Improves floor of hidden ranges, lower hit-rate |

**Earning Scout Points**: tournament placement, fair play, weekly missions, and referral kickers.

#### 6.3.2 Prospect generation (off-chain profile with on-chain receipts)

- Prospect is created **off-chain** (fast UX), with **on-chain event receipt** (hash, cohort ID) to anchor provenance.
- Each prospect is born with **hidden attribute ranges** (e.g., _Strength 60–72_, _Stamina 70–85_, _Proneness 0.10–0.22_), plus position, foot, height archetype, and potential tags.

**Prospect JSON (simplified)**

```json
{
  "prospectId": "ACA-S5-000184",
  "position": "ST",
  "foot": "Left",
  "region": "West Africa",
  "hiddenRanges": {
    "strength": [60, 72],
    "stamina": [70, 85],
    "proneness": [0.1, 0.22],
    "firstTouch": [55, 75],
    "finishing": [58, 78],
    "pace": [64, 82]
  },
  "cohort": "S5",
  "createdAt": 1730000000
}
```

---

### 6.4 Evaluation: reveal skill without burning stamina

#### 6.4.1 Friendlies reveal

- Each **sanctioned friendly** you play the prospect (≥45’) **tightens ranges** on key attributes and produces **match ratings** that inform true role fit.
- Reveal algorithm narrows the min–max window with diminishing returns per attribute.

**Range narrowing (per appearance)**

```
new_width = old_width × (1 - α), where α declines over appearances (e.g., 30%, 22%, 16%, 12%, 8%…)
```

#### 6.4.2 Light training (safe drills)

- Limited “light” drills per week that **raise reveal confidence** rather than raw stats.
- Light drills **do not** spike attributes, they reduce uncertainty and **add chemistry hints** (e.g., “thrives in high press”).
- Stamina cost is mild, injury risk bump is minimal.

#### 6.4.3 Evaluation window rules

- A prospect **cannot** be minted before minimum evaluation milestones (see §6).
- Prospects time out if ignored: after N inactive days, you must re-seed or pay a small reactivation fee.

---

### 6.5 Graduation: when prospects become Player NFTs

#### 6.5.1 Graduation thresholds (default league settings)

| Requirement            | Default Threshold                        | Why it exists                     |
| ---------------------- | ---------------------------------------- | --------------------------------- |
| Friendlies appearances | ≥ **3 × 45 min**                         | Sample size for meaningful reveal |
| Scouting completeness  | ≥ **80%** attributes revealed            | Prevent blind mints / farm loops  |
| Club compliance        | **Good standing** (no unpaid dues/flags) | Reduce sybil/abuse                |
| Cooldown between grads | ≥ **8h** per club (soft-capped)          | Smooth mint waves, fair discovery |

> Admin/league presets can tune thresholds by tier.

#### 6.5.2 Mint flow (gas-sane)

- Click **Graduate** → sign EIP-712 intent (gasless) → pay mint fee on-chain.
- Contract mints **ERC-721 Player NFT** with baseline attributes + reveal confidence, links to the prospect receipt.

**Mint fee**: chain gas + small protocol fee (discounted by referral tier).

---

### 6.6 Anti-farm & cohort balance

**We protect markets and honest managers:**

- **Daily mint cap per club:** e.g., **2/day**, with a **weekly soft cap**. Crossing soft cap increases mint fee dynamically.
- **Position distributions:** cohorts enforce targets (e.g., 2 GK, 10 DEF, 12 MID, 8 ATT per 32 grads) to avoid meta floods.
- **Region cooldowns:** chain rapid repeats in the same region add a **cooldown**.
- **Sybil throttles:** device/IP heuristics, wallet linkage signals, and tournament participation gates slow multi-account funnels.
- **New-grad price floors (marketplace):** first 24 hours cannot be listed below a **floor band** to reduce sniper/wash loops.

---

### 6.7 Prospect economics

| Action                  | Cost / Reward                            |
| ----------------------- | ---------------------------------------- |
| **Scout seed**          | Small token fee or **Scout Points**      |
| **Friendly evaluation** | Free match, **stamina consumption**      |
| **Light training**      | Minimal token/points, mild stamina       |
| **Graduation mint**     | Mint fee (discounted with referral tier) |
| **Early discard**       | No refund, frees slot for new prospect   |

> Referral: first graduation by a referee kicks a one-time discount and small kickback to referrer.

---

### 6.8 Placement: keep, loan, or sell

#### 6.8.1 Immediate loan eligibility

- Graduates can enter the **Loan Market** with **first-week minutes cap** to prevent instant overuse/injury.
- Loan terms: duration, recallability, wage split, **buy option** (price + expiry), and optional collateral.

**Loan struct (on-chain)**

```solidity
struct Loan {
  address originalOwner;
  address borrowerClub;
  address collection;
  uint256 tokenId;
  uint64  startWeek;
  uint64  endWeek;
  bool    recallable;
  uint64  recallWeek;
  uint16  wageSplitBps;
  uint256 buyOptionPrice;
  uint64  buyOptionExpiry;
}
```

#### 6.8.2 Primary sale or auction

- **Gasless listing** with EIP-712, **on-chain fill** at purchase.
- **Royalties**: a small share to the cohort/creator, optional **developer cut** to the club that graduated the player for X weeks (aligns dev incentives).
- Anti-wash: linked wallets don’t earn referral or developer cuts.

---

### 6.9 Training after mint (brief)

Graduates enter your main training system:

- **Drills with diminishing returns**, **fatigue**, and **injury risk** tuned by **proneness × low stamina**.
- **Boost items** (Energy Gel, Focus Band, Rehab, Morale) are capped with cooldowns.
- Attributes grow slowly, **match performance** remains the dominant value driver.

---

### 6.10 UX & Coach Flow

1. **Choose seeds** → pick Region/Position/Archetype.
2. **Reveal intelligently** → run friendlies, schedule light drills, watch ranges tighten.
3. **Decide** → if the profile fits your system, **graduate,** if not, **discard** and reseed.
4. **Deploy** → integrate into squad, loan for minutes, or sell to fund other targets.
5. **Repeat** → your scouting taste becomes your edge.

---

### 6.11 Governance & tiers (roadmap)

- **League-level knobs:** thresholds, caps, cohort ratios per division.
- **Reputation boosts:** managers who complete seasons without infractions get **better scout odds** (slightly tighter initial ranges).
- **Cohort branding:** partners can sponsor cohorts, metadata reflects authentic programs.

---

### 6.12 Compliance & fairness checks

- **Multi-account funneling:** cross-wallet graph + behavioral signals flag risk, high-risk accounts face stricter caps and manual review.
- **Mint storms:** automatic fee escalators + per-club cool offs.
- **AFK hoarding:** prospects decay if not evaluated, reseeding requires fee/points.
- **List dumping:** floor bands on fresh grads + progressive listing fees if spam detected.

---

### 6.13 KPIs we surface (in product & for investors)

- **Reveal efficiency:** range width reduction per friendly.
- **Graduate conversion rate:** prospects → NFTs.
- **Loan utilization:** minutes played on loan in week 1–3.
- **Developer upside:** secondary volume within X weeks of graduation.
- **Anti-farm health:** % flagged vs cleared, cohort diversity by position/region.

---

### 6.14 FAQs

**Q: Can I skip evaluation and mint immediately?**\
Yes. Though **appearances + completeness** reflects skill, not luck.

**Q: Do light drills raise attributes?**\
No. They **raise confidence** (narrow ranges) with low stamina cost.

**Q: What if a prospect underwhelms?**\
Discard to free a slot, sunk scouting costs are part of discovery. Your upside is in the **hits**.

**Q: Can I sell before graduation?**\
No. Only **Player NFTs** trade. Prospects must graduate first.

**Q: Are cohorts pay-to-win?**\
No. Caps, cooldowns, balanced distributions, and evaluation gates keep it skill-forward.

---

### 6.15 Appendix: Admin defaults (suggested)

| Setting                           | Default          |
| --------------------------------- | ---------------- |
| Min appearances (45’)             | 3                |
| Scouting completeness             | 80%              |
| Club cooldown between grads       | 8h               |
| Daily mint cap                    | 2 / club         |
| Weekly soft cap                   | 6 / club (fee ↑) |
| New-grad marketplace floor window | 24h              |
| First-week minutes cap (loans)    | 90’              |

---

### 6.16 The promise

The Academy is where Gaff’s “**ownership × merit**” philosophy lives day-to-day. Your scouting eye, scheduling discipline, and tactical context **compound,** into players that **exist beyond the game**, carry your signature, and can finance your next title run.

> Ready to build your first cohort? Seed a region, schedule two friendlies, and start revealing. Your dynasty begins here.
