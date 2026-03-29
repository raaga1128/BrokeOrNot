# 💸 BrokeOrNot?

> *"Track your budget. Get roasted. Question your life choices."*

[![Made with](https://img.shields.io/badge/Made%20with-HTML%20%7C%20CSS%20%7C%20JS-FF6B2B?style=flat-square)](.)
[![Target Audience](https://img.shields.io/badge/Target%20Audience-Broke%20Students-FF3DA8?style=flat-square)](.)
[![Therapy Required](https://img.shields.io/badge/Therapy%20Required-After%20Using-FFD23F?style=flat-square)](.)
[![Budget Status](https://img.shields.io/badge/Your%20Budget-Probably%20Gone-FF3D6B?style=flat-square)](.)

---

**BrokeOrNot** is a student expense manager that does what your parents, professors, and inner conscience have all failed to do — make you feel genuinely terrible about your spending habits, in real time, with style.

It tracks your budget, logs your expenses, predicts how your money will disappear next month (spoiler: the same way it did this month), and roasts you with escalating savagery as your wallet approaches zero.

It will not fix your finances. But it will absolutely make you *aware* of how you're destroying them.

---

## 📁 Project Structure

```
brokeornot/
├── index.html      # All the pages — Home, Login, Dashboard
├── style.css       # The pretty stuff (yes, it's bright, not dark)
├── app.js          # The brain — logic, roasts, alerts, everything
└── README.md       # You are here. Hello.
```

No frameworks. No build tools. No npm install that takes 4 minutes and downloads 800MB of `node_modules`. Just three files. Open `index.html` in a browser and you're done.

---

## ✨ Features

### 🏠 Landing Page
A proper home page with animated blob backgrounds, floating decorative cards, and a hero section that screams *"this was made with care"*. Because first impressions matter, even for a budgeting app.

### 🔐 Authentication
Sign In / Sign Up with email + password, or skip the formality with Google. Your data is saved locally in `localStorage` — meaning it's private, persistent, and will survive browser refreshes but not you clearing your cache in a panic.

### 📭 Empty State (First Login)
When you first log in, you see nothing. No charts. No graphs. No fake demo data to make it look impressive. Just a friendly bouncing coin and two cards asking you to:
1. Set your monthly budget
2. Add your first expense

Once you do both, the real dashboard awakens. Like a sleeping dragon, but for your finances.

### 💰 Wallet Dashboard
The main event. After adding data, you get:

- **Wallet Strip** — Remaining balance, total spent, and today's spend, all in one glanceable dark panel with a live gradient progress bar
- **Daily Safe Spend** — How much you can spend per day without going broke. Watch this number shrink in real time as you add expenses. Fun!
- **Spend Percentage Ring** — A big, colour-coded indicator that goes green → yellow → red as you burn through your budget
- **Category Breakdown** — Animated bars showing exactly which part of your life is the most expensive (it's food, it's always food)
- **Spend Heatmap** — A calendar grid of the current month, colour-coded by how much damage you did each day
- **Stats Row** — Biggest splurge, transaction count, top category, and average daily spend

### 🔥 The Roast System
This is the main character. Five escalating roast levels triggered by how much budget you have **remaining**:

| Remaining | Level | Vibe |
|-----------|-------|------|
| ≤ 80% left | 👀 HEADS UP | *"We're watching. Just saying."* |
| ≤ 50% left | 😬 WARNING | *"Half your money. The month disagrees."* |
| ≤ 40% left | 😰 ALARMING | *"Bold strategy. Let's see if it pays off."* |
| ≤ 30% left | 🚨 CRITICAL | *"That's not a budget. That's a countdown."* |
| ≤ 20% left | 💀 FINANCIALLY DECEASED | *"The month isn't over. Your money is."* |

### 🚨 Red Alert System
When you hit **Critical** (≤30% remaining) or **Financially Deceased** (≤20% remaining) phase and you *still* add an expense — chaos ensues:

- **Edge Vignette** — Red glow pulses around all four edges of the screen. Slow and ominous at Critical. Fast and aggressive at Deceased.
- **Screen Flash** — A full red screen flash triggers the moment you add the expense
- **Critical Popup** — A centre-screen popup appears with a rotating savage message, auto-dismissing after 3.5 seconds (or tap to close if you can't handle it)

The popup messages rotate so you get a fresh roast every time. Because repetition breeds complacency, and complacency breeds poverty.

### 🔮 AI Spend Predictions
After a few months of data, BrokeOrNot analyses your category spending history and predicts how much you'll likely spend per category this month. It's not AI in the neural-network sense. It's AI in the "it averaged your past data and presented it dramatically" sense. But honestly, that's exactly what you need.

### 📈 Monthly Trend Chart
A bar chart showing your total spend across the last 6 months. Great for watching the bars get taller over time as your discipline quietly leaves the building.

### 🏆 Achievement Badges
Because you deserve recognition for your financial journey, whatever direction it's going:

| Badge | How to Earn |
|-------|-------------|
| 🎯 First Transaction | Add your first expense |
| 💸 Big Spender | Single expense over ₹1,000 |
| 🏦 Budget Boss | Set a monthly budget |
| 📊 Consistent Spender | Log 10+ transactions |
| 🍔 Foodie Mode | 5+ food transactions |
| 🏅 Month Survivor | Data across multiple months |
| 🔥 Habitual Spender | Log 20+ transactions |

---

## 🚀 Getting Started

**No installation. No setup. No existential dread (that comes later, when you see your balance).**

1. Download or clone the project
2. Keep all three files (`index.html`, `style.css`, `app.js`) in the **same folder**
3. Open `index.html` in any modern browser
4. Sign up, set your budget, add your first expense
5. Watch the dashboard materialise from nothing
6. Confront your financial reality

```
brokeornot/
├── index.html  ← Open this
├── style.css   ← Must be here
└── app.js      ← Must be here too
```

> ⚠️ All three files must be in the same folder. Moving just `index.html` somewhere else and wondering why it looks broken is a very valid mistake that absolutely no one has ever made.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox, keyframe animations) |
| Logic | Vanilla JavaScript (ES6+) |
| Storage | Browser `localStorage` |
| Fonts | Google Fonts (Syne, Figtree, Space Mono) |
| Dependencies | None. Zero. Zilch. Not a single `node_modules`. |

This is deliberately dependency-free. No React, no Vue, no Tailwind, no bundler. Just the web platform, used properly. It runs on any device with a browser, loads instantly, and will still work in 10 years when every JavaScript framework from 2024 has been deprecated twice.

---

## 🐛 Known Quirks

- **Predictions need data** — The AI Predictions tab requires at least 5 total transactions across your history to show anything. Before that it'll just say *"I'll figure out your financial personality."* Which is fair.
- **Trend needs two months** — The monthly trend chart needs at least two months of data. Use it in month one and it will politely tell you to come back later.
- **The roast is always right** — There is no way to disable the roast. This is by design.

---

<div align="center">

**BrokeOrNot** — *Because someone has to tell you.*

💸 → 😬 → 🚨 → 💀

*Made with caffeine, mild financial anxiety, and genuine concern for your wallet.*

</div>
