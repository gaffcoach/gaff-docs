# Players

On Gaff, players are on-chain assets, living, evolving NFTs you actually own. You scout them, develop them, pick their roles and tactics, then decide whether to keep, loan, or sell.

### What a Player Is

- **Player NFT (ERC-721):**\
  Immutable identity + evolving performance data. You hold the keys, you control the asset.
- **Provenance:**\
  Academy → Graduation → Contracts → Matches → Transfers recorded on-chain or in verifiable logs.
- **Composability:**\
  Tradable on the Gaff Marketplace, portable to partner apps and analytics tools.

---

### Positions & Archetypes

Each player has a primary position and an archetype that nudges their strengths and growth curve.

| Line           | Positions       | Common Archetypes                    |
| -------------- | --------------- | ------------------------------------ |
| **Attack**     | ST, LW, RW, CAM | Poacher, Target Man, Raider, Creator |
| **Midfield**   | CM, CDM, LM/RM  | Box-to-Box, Destroyer, Playmaker     |
| **Defense**    | CB, LB, RB      | Stopper, Ball-Playing, Wingback      |
| **Goalkeeper** | GK              | Shot-Stopper, Sweeper-Keeper         |

---

### Core Attributes

- **Strength (overall ability):** Blend of technical, physical, and mental sub-attributes.
- **Pace, Finishing, First Touch, Vision, Aerials, Press Resistance, Defensive Shape:**\
  Impact simulations based on formation/tactics.
- **Stamina & Fatigue:** Falls with minutes and drills, recovers over time or via shop items.
- **Injury Proneness:** Raises risk at low stamina or heavy training loads.
- **Form (rolling):** Last 5 match ratings stabilize or swing performance.

> Simulation DNA: Formations, tactics, and minutes-weighted stamina affect expected goals, chance creation, and defensive solidity.

---

### Lifecycle

1. **Scouted Prospect (off-chain profile)**\
   Hidden ranges (e.g., STR 60–72) revealed by friendlies & drills.
2. **Academy → Graduation**\
   Meet thresholds → mint to NFT, club chooses to keep, loan, or list.
3. **Contracted Senior**\
   Appears in squads, earns minutes, builds form & stats.
4. **Transfer/Loan**\
   Market-driven mobility with club- or player-friendly terms.

---

### Development & Training

- **Drills (2/day per player):** Finishing, First Touch, Pace, Vision, Defensive Shape, Aerials, Press Resistance.\
  Diminishing returns prevent spam:\
  `Δeffective = Δbase / (1 + 0.35 * recent_sessions)`
- **Fatigue:**\
  `stamina = max(0, stamina - ceil(minutes_equiv / 3))`\
  Low stamina increases injury risk in matches.
- **Plans:** Team-wide templates aligned to your formation, respects match days.
- **Items (Shop):** Energy, Focus, Rehab, Morale, capped per week to avoid pay-to-win spirals.

---

### Contracts & Economics

- **Ownership:** Your wallet = your rights.
- **Contracts:** Term + wage bands (soft), options (club/player), performance bonuses (e.g., goal milestones).
- **Loans:** Duration, minutes guarantees, recall rules, fee structure.
- **Transfers:** Fixed price, auction, or offers. Royalties route a small cut to the developing club (time-boxed).

---

### Match Impact

- **Selection:** Starters + timed subs. Null/empty slots are ignored safely (no sim crashes).
- **Events:** Goals, assists, substitutions, injuries, all timestamped.
- **Ratings (1–10):** Minutes, contributions, and role drive per-match ratings.
- **Form Curve:** Rolling window (last 5) influences performance expectancy.

---

### Rarity & Identity

- **Visual layers:** Kits integrate club identity, collectible cosmetics (non-stat).
- **Rarity tags:** “Academy Gem”, “Evergreen”, “Late Bloomer”, purely collectible, no stat bias.
- **Name & bio:** Editable by owner (rate-limited, recorded in metadata history. Roadmap).

---

### Trading & Liquidity

- **List Gasless, Settle On-Chain:**\
  Sign a listing, buyer settles on-chain.
- **Bids/Offers:** Time-boxed offers, partial escrow.
- **Price Discovery:** Match stats and form surface in marketplace cards.

---

### Health & Fair Play

- **Anti-farm:** Daily/weekly mint caps, position-balanced cohorts, region cooldowns.
- **Anti-sybil:** Multi-signal checks (device, usage patterns) on academy progression.
- **Cooldowns:** Rename, transfer, and drill caps to keep the market sane.

---

### What Success Looks Like

- **Builders** turn prospects into stars and monetize the delta.
- **Tacticians** squeeze extra xG from role + instruction fit.
- **Traders** arbitrage form swings and future schedules.
- **Club lifers** build legends with multi-season continuity, something Web2 resets never allowed.

---

### Quick FAQ

- **Can I sell anytime?** Yes, outside of temporary competition locks (e.g., after brackets are seeded. Roadmap).
- **Do ratings reset?** No, stats persist, form rolls naturally.
- **Are cosmetics pay-to-win?** No, strictly visual.
- **Can I port data out?** Yes, open APIs and on-chain events enable third-party dashboards(Roadmap).

---

#### TL,DR

Players on Gaff are **real digital athletes**: ownable, improvable, tradable. Your scouting, training discipline, and tactical nous aren’t just “save files”, they’re value you can **hold, prove, and trade**.
