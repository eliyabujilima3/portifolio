# TechMart Sales Dashboard | Data Analysis Project

## Overview
An interactive sales performance dashboard for TechMart Tanzania (FY2025) that visualizes key business metrics across multiple dimensions. This project demonstrates data aggregation, KPI calculation, and interactive chart-based reporting.

**Status:** Complete | **Type:** Data Analysis & Visualization

---

## Project Details

### What It Does
The dashboard transforms 240 sales records into actionable business intelligence through:
- **Real-time KPI tracking** (Revenue, Profit, Margin, Orders, Units Sold, Avg Order Value)
- **Multi-dimensional analysis** (by month, region, product, category, salesperson)
- **Interactive filtering** (region-based drill-down capability)
- **Responsive visualizations** (line, bar, horizontal bar, and pie charts)

### Business Context
- **Company:** TechMart Tanzania (fictional e-commerce)
- **Dataset:** 240 orders spanning January–December 2025
- **Products:** Smartphones, Laptops, Headphones, Smartwatches, Tablets, Power Banks
- **Regions:** Dar es Salaam, Arusha, Mwanza, Dodoma, Mbeya
- **Team:** 6 salespeople
- **Currency:** Tanzanian Shillings (TSh)

---

## Architecture

### Three-Layer Structure
```
Data Layer (240 orders)
    ↓
Calc Layer (aggregations & formulas)
    ↓
Dashboard Layer (KPIs & charts)
```

### Key Components

#### 1. **KPI Cards** (6 metrics)
- Total Revenue
- Total Profit
- Profit Margin (%)
- Order Count
- Units Sold
- Average Order Value

#### 2. **Five Charts**
- **Monthly Revenue & Profit Trend** (line) — seasonal patterns
- **Revenue by Region** (column) — regional comparison
- **Revenue by Product** (horizontal bar) — product performance
- **Revenue Share by Category** (pie) — category breakdown
- **Revenue by Salesperson** (column) — team performance

#### 3. **Interactive Region Dropdown**
- "All Regions" overview
- Single-region drill-down
- Dynamically updates all region-specific charts & KPIs

---

## Technical Implementation

### Frontend
- **HTML5** with responsive meta viewport
- **Chart.js 4.4.1** for charting
- **CSS3** with CSS custom properties (variables) for theming
- **Vanilla JavaScript** for state management & data processing

### Features
- **Dark mode support** — automatic `prefers-color-scheme` detection
- **Safe area handling** — optimized for mobile devices (notch/safe areas)
- **Responsive grid layout** — auto-fit columns for desktop/tablet/mobile
- **Semantic color coding:**
  - Navy (#1f3a5f) — primary metric
  - Teal (#2a9d8f) — secondary metric
  - Gold (#e9c46a) — tertiary accent

### Data Processing
- **Real-time calculations:**
  - Revenue = Units × Unit Price
  - Profit = Units × (Unit Price − Unit Cost)
  - Margin = Profit ÷ Revenue
- **Dynamic aggregation** by month, region, product, category, and salesperson
- **Formatting utilities:** Million (M) and thousand (K) notation

---

## Data Model

### Raw Data (240 rows × 7 columns)

| Column | Type | Example | Source |
|--------|------|---------|--------|
| Month | Integer (0–11) | 0 = January | Formula |
| Salesperson ID | Integer (0–5) | 0 = Amina Juma | Input |
| Product ID | Integer (0–5) | 0 = Smartphone | Input |
| Region ID | Integer (0–4) | 0 = Dar es Salaam | Input |
| Units | Integer | 3 | Input |
| Unit Price (TSh) | Number | 450,000 | Input |
| Unit Cost (TSh) | Number | 340,000 | Input |

### Aggregated Results (All Regions)

| Metric | Value |
|--------|-------|
| Total Revenue | 408.0M TSh |
| Total Profit | 107.6M TSh |
| Profit Margin | 26.4% |
| Orders | 240 |
| Units Sold | 1,509 |
| Avg Order Value | ~1.7M TSh |

---

## Key Insights (Sample Data)

### By Region
- Strongest performer: **Dar es Salaam** (highest concentration of orders)
- Regional variation enables targeted strategy

### By Product
- High-value drivers: **Laptops** (1.4M TSh), **Tablets** (600K TSh)
- High-margin accessories: **Headphones, Smartwatches, Power Banks**

### By Category
- **Mobile:** Premium pricing, moderate volume
- **Computing:** Highest revenue driver
- **Accessories:** High-margin, high-volume play

### Seasonality
- Identifiable peaks and troughs across 12 months
- Useful for inventory and staffing planning

---

## Skills Demonstrated

✅ **Data Analysis** — aggregation, summarization, KPI definition
✅ **Business Intelligence** — multi-dimensional reporting
✅ **Frontend Development** — HTML, CSS, JavaScript
✅ **Chart Visualization** — Chart.js, responsive design
✅ **Interactivity** — state management, event handling
✅ **Mobile-First Design** — responsive layout, safe areas
✅ **Theme Support** — light/dark mode implementation
✅ **User Experience** — clear labeling, intuitive UI

---

## Files

- `techmart_dashboard.html` — Standalone interactive dashboard (all-in-one file)
- Documentation — Full beginner's guide included

---

## How to Use

1. **Open** `techmart_dashboard.html` in any modern browser
2. **View** default dashboard (All Regions)
3. **Filter** using the Region dropdown (top left)
4. **Observe** real-time chart updates and KPI changes
5. **Read** footer for metric definitions (M = millions, K = thousands)

---

## Learning Outcomes

This project exemplifies:
- **Clean architecture:** Separation of data, calculation, and presentation
- **Scalability:** Same pattern applies to student performance, hospital data, etc.
- **Accessibility:** Clear color coding, readable fonts, semantic structure
- **Performance:** Lightweight, no external dependencies for data
- **Accessibility:** Dark mode support, responsive design

---

## Technologies Used

- HTML5
- CSS3 (custom properties, Grid, Flexbox)
- JavaScript (ES6+)
- Chart.js 4.4.1

---

## Created

October 2025

---

## Notes

All data is fictional and created for educational and demonstration purposes only.