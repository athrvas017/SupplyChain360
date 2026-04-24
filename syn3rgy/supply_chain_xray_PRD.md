# Supply Chain X-Ray — Product Requirements Document

**Project:** Supply Chain X-Ray
**Track:** SYN3RGY 3.0 · Open Innovation
**Version:** 1.0
**Stack:** FastAPI · Supabase · Neo4j · React
**Constraint:** Free-tier only — no paid API services

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem & Motivation](#2-problem--motivation)
3. [System Architecture Overview](#3-system-architecture-overview)
4. [Data Sources & API Reference](#4-data-sources--api-reference)
5. [Core Features](#5-core-features)
   - 5.1 Company Ingestion & HSN Resolution (Tier-0)
   - 5.2 Recursive Supply Graph Traversal
   - 5.3 BOM-Aware Filtering
   - 5.4 HSN Cross-Country Normalization
   - 5.5 Interactive Graph Visualization
   - 5.6 Geo-Mapped Trade Flow View
6. [Bonus Features](#6-bonus-features)
   - 6.1 Compliance & Sanctions Flagging
   - 6.2 Geopolitical & Environmental Risk Layer
   - 6.3 Supplier Dashboard
7. [Database Design](#7-database-design)
   - 7.1 Neo4j Graph Schema
   - 7.2 Supabase Relational Schema
8. [API Design (FastAPI)](#8-api-design-fastapi)
9. [Frontend Architecture](#9-frontend-architecture)
10. [Implementation Roadmap](#10-implementation-roadmap)
11. [Key Reference Data & Test Cases](#11-key-reference-data--test-cases)
12. [Constraints, Risks & Mitigations](#12-constraints-risks--mitigations)

---

## 1. Executive Summary

Supply Chain X-Ray is a web-based interactive platform that reconstructs multi-tier supplier networks for any given company using exclusively open and free-tier trade data. A user enters a company name (e.g., *Tesla Inc.*), selects one or more HSN codes from that company's import records, and the system recursively traces the supply graph — from the company's direct (Tier-1) suppliers all the way back to raw-material producers (Tier-4 through Tier-6) — while displaying the result as an interactive directed graph and a geo-mapped global trade flow overlay.

The platform is built on **FastAPI** (backend orchestration and REST API), **Neo4j** (persistent graph storage for companies, trade edges, and tier relationships), and **Supabase** (relational storage for search history, user sessions, compliance flags, and HSN lookup tables). The frontend uses **React** with **Cytoscape.js** for graph visualization and **Leaflet.js** for geo-mapping.

Every API and data source used is on a free or no-auth public tier. The system is designed so that repeated searches progressively enrich the stored graph rather than re-querying data sources from scratch.

---

## 2. Problem & Motivation

Modern enterprises routinely face supply chain disruptions, regulatory exposure (UFLPA, OFAC sanctions), and concentration risks they cannot see because visibility ends at their direct (Tier-1) suppliers. The root cause is structural: most procurement systems record *who you bought from*, not *where that supplier's inputs came from*.

Global trade data — US Customs Bill of Lading records (CBP), UN Comtrade bilateral flows, USITC import statistics, and national trade databases — is publicly available and contains shipper–consignee relationships at the company level. The challenge is assembling these fragmented records into a coherent, recursively traversed graph, filtered to only include upstream components that are actual manufacturing inputs (not unrelated co-imports).

### Why this is hard

- **Company name noise:** The same company appears as "SAMSUNG SDI CO LTD", "Samsung SDI", "SAMSUNG SDI AMERICA INC" across different trade records.
- **HSN code fragmentation:** The WCO 6-digit standard is universal, but the US uses 10-digit HTS, India uses 8-digit, Korea uses a separate 10-digit schedule — making cross-border traversal non-trivial.
- **BOM relevance:** A carmaker imports motors *and* office supplies under different HS codes. A traversal must prune the latter at each hop.
- **Sparse data at depth:** Tier-4 and beyond involves raw material producers (mines, smelters) whose trade records are less granular.

---

## 3. System Architecture Overview

```
┌──────────────────────────────────────────────────────────────┐
│                        REACT FRONTEND                         │
│  Company Search → HSN Selector → Graph View → Geo Map View   │
└────────────────────────┬─────────────────────────────────────┘
                         │ REST / WebSocket
┌────────────────────────▼─────────────────────────────────────┐
│                     FASTAPI BACKEND                           │
│                                                               │
│  ┌─────────────────┐  ┌──────────────────┐  ┌─────────────┐  │
│  │ Trade Resolver  │  │  Graph Traversal │  │  Enrichment │  │
│  │  (ImportYeti,   │  │  Engine (BFS/    │  │  Service    │  │
│  │  UN Comtrade,   │  │  DFS recursive)  │  │  (GLEIF,    │  │
│  │  USITC DataWeb) │  │                  │  │  OpenCorp,  │  │
│  └────────┬────────┘  └────────┬─────────┘  │  OFAC, OSM) │  │
│           │                   │             └──────┬──────┘  │
└───────────┼───────────────────┼────────────────────┼─────────┘
            │                   │                    │
    ┌───────▼───────┐   ┌───────▼────────┐   ┌──────▼───────┐
    │  NEO4J GRAPH  │   │    SUPABASE    │   │  EXTERNAL    │
    │               │   │                │   │  APIs        │
    │  Nodes:       │   │  - search_log  │   │  (see §4)    │
    │  Company      │   │  - hsn_lookup  │   │              │
    │  Edges:       │   │  - compliance  │   │              │
    │  SUPPLIES_TO  │   │  - country_    │   │              │
    │  with HSN,    │   │    risk_cache  │   │              │
    │  tier, value  │   │  - disruptions │   │              │
    └───────────────┘   └────────────────┘   └──────────────┘
```

### Technology Responsibilities

| Layer | Technology | Role |
|---|---|---|
| Frontend | React + Cytoscape.js + Leaflet.js | Graph UI, geo-map, search UX |
| API Layer | FastAPI (Python) | REST endpoints, orchestration, rate-limit management |
| Graph DB | Neo4j (Community Edition, free) | Persistent supply graph — nodes, edges, tiers |
| Relational DB | Supabase (free tier) | HSN lookup tables, search history, compliance cache, session state |
| Trade Data | UN Comtrade, USITC DataWeb, US Census Trade, World Bank WITS | Tier resolution (see §4) |
| Entity Resolution | GLEIF LEI API, OpenCorporates, Wikidata SPARQL | Company dedup and enrichment |
| Compliance | OFAC SDN, OpenSanctions, BIS Entity List, UFPLA CSV | Sanctions/forced labour flagging |
| Geo | Nominatim/OSM, Leaflet.js, Natural Earth | Geocoding, map rendering |
| Risk | World Bank Indicators, GDELT, GDACS, OpenWeatherMap | Country risk + disruption signals |

---

## 4. Data Sources & API Reference

All sources below are **free, no-paid-key required**. Rate limits are managed via a request queue in FastAPI with per-source throttling.

### 4.1 Trade Data — Core Graph Traversal

| Source | Endpoint | Auth | Rate Limit | Used For |
|---|---|---|---|---|
| **UN Comtrade** | `comtradeplus.un.org/api` | Free API key | 100 calls/day | HS-code-level bilateral trade flows by country; Tier 2–4 traversal |
| **USITC DataWeb** | `dataweb.usitc.gov/rest` | None | Unlimited | US import/export data by HTS code, country, and year |
| **US Census Trade** | `api.census.gov/data/timeseries/intltrade` | None | Unlimited | US trade statistics by commodity and partner country |
| **World Bank WITS** | `wits.worldbank.org/API/V1/SDMX` | None | Unlimited | Global tariff and trade flow data; cross-country HS mapping |
| **ImportYeti** | `importyeti.com` | None (browser scrape) | Polite scrape | US CBP bill of lading data; shipper-consignee pairs at company level — primary Tier-1 source |
| **TradeMap (ITC)** | `trademap.org` | Free for basic | Limited | Product-level trade flows; HS code explorer |

> **Implementation note:** ImportYeti is the primary source for resolving Tier-1 from company names because it exposes US CBP bill-of-lading records with actual shipper and consignee company names. The scrape is light (one HTML page per company query) and cached in Neo4j after the first fetch, so it is not re-hit on repeat searches.

### 4.2 HS Code Classification & Mapping

| Source | Endpoint | Auth | Rate Limit | Used For |
|---|---|---|---|---|
| **WCO HS Dataset** | `wcoomd.org` (static download) | None | One-time | Official WCO HS nomenclature; 6-digit universal code tree — stored in Supabase `hsn_codes` table |
| **Trade.gov Tariff API** | `developer.trade.gov/apps/tariff` | Free | Unlimited | US HTS to product description lookup; US import duty rates |
| **USITC HS Search** | `hts.usitc.gov/reststop` | None | Unlimited | Full US HTS schedule; 10-digit code resolution and descriptions |
| **Open Exchange HS** | `github.com/datasets/harmonized-system` | None | Static download | Open dataset of HS codes with descriptions; BOM hierarchy traversal |

### 4.3 Company & Entity Resolution

| Source | Endpoint | Auth | Rate Limit | Used For |
|---|---|---|---|---|
| **GLEIF LEI API** | `api.gleif.org/api/v1` | None | Unlimited | Legal Entity Identifier lookup; maps company name to LEI and country |
| **OpenCorporates** | `api.opencorporates.com` | Free | 50 calls/day | Global company registry; resolve name to jurisdiction and reg number |
| **SEC EDGAR** | `data.sec.gov/api/xbrl` | None | Unlimited | US public company filings; financial health, subsidiaries, parent cos |
| **Open Ownership BODS** | `register.openownership.org/api` | None | Unlimited | Beneficial ownership data; identify state-linked or shell entities |
| **Wikidata SPARQL** | `query.wikidata.org/sparql` | None | Unlimited | Structured entity data; map company names to country, industry, parent |

### 4.4 Compliance & Sanctions (Bonus Feature 1)

| Source | Endpoint | Auth | Rate Limit | Used For |
|---|---|---|---|---|
| **OFAC SDN List** | `sanctionslist.ofac.treas.gov/api` | None | Unlimited | US Treasury sanctions list; flag blocked entities by name or country |
| **OpenSanctions** | `api.opensanctions.org` | Free (non-commercial) | Free tier | Aggregated global sanctions: OFAC, EU, UN, UKFSA, and others |
| **BIS Entity List** | `bis.doc.gov` (CSV download) | None | Static download | US export-controlled entities |
| **UFPLA Entity List** | `cbp.gov` (PDF/CSV) | None | Static download | Forced labour entities (Xinjiang); flag UFLPA-restricted suppliers |
| **EU Sanctions Map** | `sanctionsmap.eu/api` | None | Unlimited | EU restrictive measures by entity and country |

### 4.5 Financial Health Signals (Bonus Feature 1)

| Source | Endpoint | Auth | Rate Limit | Used For |
|---|---|---|---|---|
| **SEC EDGAR Filings** | `data.sec.gov/submissions` | None | Unlimited | 10-K, 10-Q, 8-K filings; revenue, debt, bankruptcy disclosures |
| **Open FIGI (BMRG)** | `openfigi.com/api` | Free | 25 calls/min | Map company name to financial instrument ID |
| **Alpha Vantage** | `alphavantage.co/query` | Free | 25 calls/day | Stock price, earnings, income statement for public suppliers |
| **World Bank Finance** | `api.worldbank.org/v2` | None | Unlimited | Country-level credit ratings and sovereign risk indicators |
| **Eurostat Business** | `ec.europa.eu/eurostat/api` | None | Unlimited | EU company financial health and industry insolvency statistics |

### 4.6 Geopolitical Risk (Bonus Feature 2)

| Source | Endpoint | Auth | Rate Limit | Used For |
|---|---|---|---|---|
| **World Bank Indicators** | `api.worldbank.org/v2/indicator` | None | Unlimited | Political Stability Index, Rule of Law, Govt Effectiveness per country |
| **Fragile States Index** | `fragilestatesindex.org` (CSV) | None | Annual download | Country fragility score: conflict, economic, political dimensions |
| **ACLED** | `acleddata.com/api` | Free (non-commercial) | Free tier | Armed conflict events by location; flag active conflict zones |
| **GDELT Project** | `api.gdeltproject.org/api/v2` | None | Unlimited | Global news event data; surface geopolitical tension signals |
| **UN Comtrade Tariffs** | `comtradeplus.un.org/api` | Free | 100 calls/day | Tariff and trade restriction data by HS code and country pair |
| **OEC Trade Complexity** | `oec.world/api` | Free | Limited free tier | Economic complexity and export concentration by country |

### 4.7 Real-Time Disruption Signals (Bonus Feature 2)

| Source | Endpoint | Auth | Rate Limit | Used For |
|---|---|---|---|---|
| **GDACS** | `gdacs.org/gdacsapi` | None | Unlimited | Global disaster alerts (earthquakes, floods, cyclones) as GeoJSON |
| **OpenWeatherMap** | `api.openweathermap.org/data/2.5` | Free | 1,000 calls/day | Current weather and severe weather alerts by lat/lon |
| **NOAA Climate** | `api.weather.gov` | None | Unlimited | US weather alerts and hazard data |
| **ReliefWeb API** | `api.reliefweb.int/v1` | None | Unlimited | Humanitarian crisis reports; port closures, infrastructure damage |
| **USGS Earthquake** | `earthquake.usgs.gov/fdsnws/event` | None | Unlimited | Real-time earthquake data by location and magnitude |
| **MarineTraffic** | `marinetraffic.com/api` | None (limited public) | Limited | Port congestion and vessel tracking |

### 4.8 Geospatial & Mapping

| Source | Endpoint | Auth | Rate Limit | Used For |
|---|---|---|---|---|
| **Nominatim (OSM)** | `nominatim.openstreetmap.org` | None | 1 call/sec | Geocode company address to lat/lon |
| **OpenStreetMap Overpass** | `openstreetmap.org / Overpass API` | None | Reasonable use | Base map tiles and geographic feature data |
| **Natural Earth** | `naturalearthdata.com` (static) | None | One-time | Country polygons and port locations for geo-overlay |
| **Leaflet.js** | `leafletjs.com` (library) | None (open source) | — | Interactive map rendering; trade flow arc overlays |
| **D3.js / Deck.gl** | `d3js.org / deck.gl` | None (open source) | — | Force-directed graph layout; arc overlays for trade corridors |

---

## 5. Core Features

### 5.1 Company Ingestion & HSN Resolution (Tier-0)

**What it does:**
The user types a company name. The system resolves all HSN (HS) codes associated with that company's import trade records and presents them in a selection UI with commodity descriptions.

**How it works — Step by Step:**

1. **Company Name Normalization**
   - The raw input (e.g., "Toyota") is passed to the **Entity Resolution Pipeline**:
     - `GLEIF LEI API` → fuzzy-match against legal entity names to get the canonical name + LEI + country.
     - `OpenCorporates` → validate jurisdiction and registration.
     - `Wikidata SPARQL` → resolve parent company and industry.
   - The resolved canonical name is stored as a `Company` node in Neo4j if it doesn't already exist.

2. **Import Record Fetch**
   - **ImportYeti** is scraped for the company's US CBP bill-of-lading records. This returns a list of shipments with: shipper name, consignee name, HS code, product description, weight, port, and date.
   - **USITC DataWeb** is also queried for aggregate US import statistics by HTS code and company.
   - All distinct HS codes found are deduplicated (normalised to 6-digit WCO standard; see §5.4).

3. **HSN Selection UI**
   - The frontend presents a table of all found codes:
     ```
     HSN Code | Commodity Description               | Trade Volume | # Shipments
     ─────────┼─────────────────────────────────────┼──────────────┼────────────
     8501.53  | AC multi-phase motors, output >750W  | $42M         | 18 records
     8708.99  | Parts & accessories for motor veh.   | $9M          | 7 records
     7408.11  | Copper winding wire (>6mm)            | $3M          | 4 records
     ```
   - The user selects one or more HSN codes to anchor the traversal. These anchor codes define the product scope (the "commodity thread") for BOM filtering at every subsequent tier.

4. **Graph Bootstrap**
   - Neo4j is checked first: if the company node already exists with resolved HSN edges, the cached data is returned instantly and the user only sees a prompt to expand to Tier-1 or deeper.
   - New data is persisted: the `Company` node is created or merged, and each found HSN code is stored as a property on a `IMPORTS` self-edge (Tier-0 anchor).

**Supabase tables used:** `search_log`, `hsn_lookup`
**Neo4j entities created:** `(:Company {name, lei, country, lat, lon})`, `(:HSNCode {code, description})`

---

### 5.2 Recursive Supply Graph Traversal

**What it does:**
Starting from Tier-0 (the searched company), the system recursively discovers the companies at each upstream tier, using the selected HSN code as the traversal anchor and querying trade databases at each hop.

**How it works — Tier by Tier:**

#### Tier-1 Resolution (Direct Suppliers)
- Source: **ImportYeti** (US CBP Bill of Lading) — primary source for shipper→consignee pairs.
- Query: Find all *shippers* sending goods to the Tier-0 company under the selected HSN code(s).
- Each shipper becomes a `Company` node at Tier-1. An edge `(Tier1Company)-[:SUPPLIES_TO {hsn, tier:1, value}]->(Tier0Company)` is created in Neo4j.
- Company names are resolved through the Entity Resolution Pipeline (GLEIF → OpenCorporates → Wikidata) to canonical identities.

#### Tier-2 Resolution (Foreign Sub-Suppliers)
- Source: **UN Comtrade** for bilateral trade flows by HS code and reporter/partner country.
- For each Tier-1 company, its country of origin is known. UN Comtrade is queried: "Which countries export HS code 8501.53 to [Tier-1 country]?" → these become candidate Tier-2 supplier countries.
- **WITS World Bank** supplements with additional bilateral flow data for countries not covered by Comtrade in the free tier.
- ImportYeti is re-queried for the Tier-1 company's own import records (treating it now as the consignee).
- BOM filtering is applied (see §5.3) to prune unrelated trade flows.

#### Tier-3 and Beyond
- The same logic repeats. For each new company discovered:
  1. Check Neo4j — if the company node already has edges at this tier depth, use cached data.
  2. If not cached, query trade sources. Prioritise **USITC DataWeb** (unlimited, no key) and **US Census Trade** for US-originated flows; **UN Comtrade** for rest-of-world flows.
  3. At Tier-3, commodity codes shift from finished parts (e.g., `8503.00` rotor components) to materials (e.g., `7403.11` refined copper cathodes, `7225.19` electrical steel).
  4. At Tier-4+, trade records become sparser. The system uses **World Bank WITS** aggregate commodity flows when company-level resolution fails, creating "unresolved cluster" nodes (e.g., "Chilean Copper Mining Cluster") that are flagged for the user.

#### Graph Enrichment (Cache-First)
A core architectural principle: **nodes resolved in prior traversals are never re-queried**. The Neo4j graph is the system of record.

```
Traversal logic (Python pseudocode):

def traverse(company_node, hsn_codes, current_tier, max_tier=6):
    if current_tier > max_tier:
        return
    
    # 1. Check Neo4j cache first
    cached_suppliers = neo4j.match(
        "(s:Company)-[:SUPPLIES_TO]->(c:Company {id: company_node.id})",
        filter=hsn_codes
    )
    
    if cached_suppliers:
        yield cached_suppliers  # return cached result instantly
    else:
        # 2. Query open trade sources
        suppliers = resolve_suppliers(company_node, hsn_codes)
        
        # 3. Apply BOM filtering
        relevant = bom_filter(suppliers, anchor_hsn=hsn_codes)
        
        # 4. Persist to Neo4j
        neo4j.merge_nodes_and_edges(relevant, tier=current_tier)
        
        yield relevant
    
    # 5. Recurse
    for supplier in relevant:
        traverse(supplier, derive_upstream_hsn(supplier, hsn_codes), current_tier + 1)
```

**Progressive enrichment UI:** Each tier is resolved asynchronously and streamed to the frontend via Server-Sent Events (SSE). The graph renders tier-by-tier as data arrives — users do not wait for the full 6-tier tree before seeing results.

---

### 5.3 BOM-Aware Filtering

**What it does:**
At every tier transition, the system prunes trade relationships that are NOT actual manufacturing inputs to the traced commodity. Without this, every company imports dozens of unrelated goods and the graph becomes noise.

**How it works:**

The BOM filter operates in two modes depending on available data:

#### Mode A: HS Sub-Tree Analysis
The WCO HS code tree is hierarchical: the first 2 digits = chapter (product family), digits 3–4 = heading, digits 5–6 = subheading. The system uses this structure to determine parent-child relationships between commodity codes.

Example — Tracing from Tier-0 anchor `8501.53` (AC traction motors):
- **Allow upstream:** Chapter 85 (electrical machinery components), Chapter 74 (copper wire), Chapter 72/72/73 (steel/iron), Chapter 26 (ores and minerals) — these are the known input chapters for motors.
- **Prune:** Chapter 84 office machinery, Chapter 39 plastics, Chapter 62 apparel — these cannot be motor inputs.

The allowed upstream chapter map is stored in Supabase `bom_rules` and seeded with expert-defined rules for the most common commodity threads (vehicles, electronics, motors, batteries, textiles, pharmaceuticals).

#### Mode B: Product Category Inference (LLM-assisted, optional)
For HSN codes not covered by static BOM rules, the system can optionally call an LLM (via the free Anthropic API tier, if available) to infer whether a given trade commodity is a plausible input to the traced product. The prompt is structured:

```
Given that we are tracing the supply chain for [ANCHOR_PRODUCT] (HSN: XXXX.XX),
is [CANDIDATE_PRODUCT] (HSN: YYYY.YY) a plausible upstream manufacturing input?
Answer: YES or NO, with one-line reasoning.
```

This runs only for ambiguous cases where Mode A cannot make a confident determination.

#### BOM Rules Table (Supabase `bom_rules`)

| Anchor HSN Chapter | Allowed Upstream Chapters | Description |
|---|---|---|
| 85 (Motors, Elec. Machines) | 74 (Copper), 72 (Steel), 85 (Elec. Parts), 26 (Ores) | Winding wire, core steel, elec. components |
| 87 (Vehicles) | 85 (Elec.), 84 (Mech.), 72 (Steel), 40 (Rubber) | Parts, engines, tyres, frames |
| 27 (Fuel) | 26 (Ores/Minerals), 28 (Chemicals), 84 (Mach.) | Crude, refineries, processing equip. |
| 84 (Machinery) | 72 (Steel), 73 (Iron Art.), 74 (Copper), 76 (Aluminium) | Metal castings, formed parts |
| 30 (Pharma) | 29 (Organic Chem.), 28 (Inorganic Chem.), 35 (Proteins) | APIs, excipients, intermediates |

---

### 5.4 HSN Cross-Country Normalization

**What it does:**
When the traversal crosses a border (e.g., a Japanese Tier-1 supplier sourcing from a South Korean Tier-2), the national HS code schedules diverge beyond 6 digits. The system normalises all codes to the 6-digit WCO standard before making graph connections, while storing the national code for reference.

**Cross-Country Mapping Table (from reference data):**

| Commodity | WCO 6-digit | US HTS (10-digit) | India HSN (8-digit) | Notes |
|---|---|---|---|---|
| AC Traction Motors | 8501.53 | 8501.53.4000 | 8501.5300 | US appends 4 digits; India uses 8-digit |
| Copper Wire >6mm | 7408.11 | 7408.11.6000 | 7408.1100 | Consistent at 6-digit level |
| Silicon-Electrical Steel | 7225.19 | 7225.19.0090 | 7225.1900 | US 10-digit adds end-use suffix |

**Implementation:**
1. All HS codes entering the system are stored with both their raw national code and the WCO 6-digit equivalent.
2. A `country_hsn_map` table in Supabase stores the mapping rules: `{country_iso, national_code, wco_6digit}`.
3. This table is seeded from the **WCO HS Dataset** (static download) and **USITC HS Search** (10-digit resolution).
4. When crossing borders during traversal, `national_code` is used to query the source country's trade API; `wco_6digit` is used for Neo4j graph edges to ensure cross-country joins work correctly.
5. The Customs Info API (free limited tier) is called for codes not in the static table, providing cross-country lookup on demand.

---

### 5.5 Interactive Graph Visualization

**What it does:**
The primary UI is a directed force-graph showing the full supply network. Companies are nodes; `SUPPLIES_TO` relationships are edges labelled with HSN code and trade value.

**Technology:** **Cytoscape.js** (React integration via `react-cytoscapejs`) — free, open-source, highly performant for large graphs.

**Node design:**
- Node size ∝ trade value flowing through that company
- Node color = tier level: Tier-0 (deep blue) → Tier-1 (teal) → Tier-2 (green) → Tier-3 (yellow) → Tier-4+ (orange/red)
- Node border color = compliance status: clean (none), sanctions risk (red), UFLPA risk (orange), financial distress (yellow)
- Country flag icon overlaid on each node

**Edge design:**
- Edge width ∝ trade value
- Edge label = HSN code (shown on hover to reduce clutter)
- Edge color = commodity category (copper=orange, steel=grey, motors=purple, etc.)

**Interaction model:**
- **Click node:** Opens a side panel with company details: name, country, LEI, tier, associated HSN codes, compliance flags, and financial signals.
- **Expand/Collapse tier:** Each tier can be toggled. Clicking "Expand Tier-2" triggers a background fetch for all Tier-2 suppliers if not already in Neo4j.
- **Filter by HSN:** A filter bar lets users show only edges with a specific HSN code, tracing a single commodity thread through the graph.
- **Search within graph:** Type a company name to highlight/zoom to that node.
- **Export:** Download graph as PNG or as a JSON adjacency list.

**Performance:**
- Large graphs (Tier-4+, 200+ nodes) are rendered with Cytoscape's WebGL renderer.
- The frontend only loads nodes up to the currently expanded tier; deeper tiers are fetched on demand.

---

### 5.6 Geo-Mapped Trade Flow View

**What it does:**
A parallel view replaces the abstract graph with a world map, showing companies plotted at their real geographic coordinates and trade flows drawn as arcs between them.

**Technology:** **Leaflet.js** for the base map (OpenStreetMap tiles, free) + **D3.js** for arc overlays.

**How it works:**
1. Every `Company` node in Neo4j has `lat`, `lon` properties resolved via the **Nominatim/OSM** geocoding API (1 call/sec, free) at node creation time.
2. On the geo view, each company is plotted as a circle marker (same color/size scheme as graph view).
3. Trade flows are drawn as curved Bezier arcs between source and destination, with arc width ∝ trade value and arc color ∝ commodity category.
4. Country-level risk overlays (Bonus Feature 2) are rendered as choropleth shading on the country polygons (**Natural Earth** static dataset).

**Interaction:**
- Hover on a company marker: shows trade volume and HSN codes.
- Click on a country: shows all supplier companies within that country and aggregate trade value.
- Layer toggles: turn on/off sanctions flags, conflict zone overlay, disruption alerts, concentration risk highlighting.
- The map and graph views are **synchronized** — selecting a node in the graph flies the map to that location, and vice versa.

---

## 6. Bonus Features

### 6.1 Compliance & Financial Insights

#### Compliance Flagging
Every `Company` node is screened against four static/semi-static datasets that are downloaded once and stored in Supabase `compliance_flags`:

| List | Source | Flag Type | Update Frequency |
|---|---|---|---|
| OFAC SDN | sanctionslist.ofac.treas.gov/api | Sanctions | Real-time API |
| OpenSanctions | api.opensanctions.org | Agg. global sanctions | Daily download |
| BIS Entity List | bis.doc.gov (CSV) | Export controls | Weekly refresh |
| UFPLA Entity List | cbp.gov (CSV) | Forced labour / Xinjiang | Monthly refresh |
| EU Sanctions Map | sanctionsmap.eu/api | EU restrictive measures | Real-time API |

Matching is done by fuzzy name matching (using `rapidfuzz` Python library) against the canonical company name resolved from GLEIF. A match score > 85% triggers a flag review; a match > 95% triggers a hard flag.

#### Financial Distress Signals
For each resolved supplier, the following checks run asynchronously:

- **SEC EDGAR Filings:** Check for recent 8-K filings mentioning "bankruptcy", "chapter 11", or "going concern" (text search on free EDGAR full-text API).
- **Alpha Vantage:** For public companies, check if stock price has declined >40% in 90 days (free, 25 calls/day — applied only to top-tier suppliers).
- **World Bank Finance:** Pull sovereign credit rating for the supplier's country as a proxy for country-level financial risk.

Flags are stored in Supabase `financial_flags` and surfaced in the node detail panel in the graph UI.

---

### 6.2 Geopolitical & Environmental Risk Layer

#### Country Risk Index
A composite `country_risk_score` (0–100, higher = riskier) is computed per country from:

- **World Bank Political Stability Index** (WGI): Updated annually; stored in Supabase `country_risk_cache`.
- **Fragile States Index** (CSV, annual): 12-dimension country fragility score.
- **ACLED Conflict Events** (free non-commercial): Count of armed conflict events in past 90 days in the country, geographically resolved.
- **GDELT Geopolitical Tension** (unlimited): News tone index for country-pairs involved in the supply chain.
- **UN Comtrade Tariff Data:** Flag country-pairs with active tariff escalations on the traced HSN code.
- **OEC Trade Complexity:** Single-country export concentration score (countries exporting only one commodity are high concentration risk).

Composite formula:
```
country_risk = 0.30 * political_stability
             + 0.20 * fragile_states_score
             + 0.20 * conflict_frequency_90d
             + 0.15 * gdelt_tension_index
             + 0.15 * trade_concentration_risk
```

**Concentration Risk Alert:** If >40% of a given HSN code's global supply flows through a single country (from UN Comtrade bilateral data), the system raises a "Concentration Risk" flag on all companies in that country for that commodity thread.

#### Real-Time Disruption Signals
A background worker (FastAPI `asyncio` background task) polls disruption sources every 15 minutes and writes events to Supabase `disruption_events`:

- **GDACS:** Natural disaster alerts overlaid on supplier locations (GeoJSON spatial join).
- **USGS Earthquake:** Earthquakes >5.0 magnitude within 200km of any supplier location.
- **ReliefWeb:** Humanitarian crisis reports mentioning port names or country names in the supply graph.
- **OpenWeatherMap:** Severe weather alerts (wind >60mph, flood warnings) near supplier locations.
- **NOAA:** US weather hazards affecting US-based ports or suppliers.

Disruption events are surfaced as pulsing alert markers on the geo-map and as count badges on graph nodes.

---

### 6.3 Supplier Dashboard

**What it does:**
A persistent dashboard that saves every company a user has searched, listing their Tier-1 suppliers along with key trade insights, compliance flags, and risk signals.

**Features:**
- **Search History:** Every company search is logged in Supabase `search_log` with timestamp and resolved canonical name.
- **Saved Supply Chains:** Users can "pin" any resolved supply chain. Pinned chains are stored in Supabase `saved_graphs` (Neo4j subgraph ID + Supabase metadata).
- **Tier-1 Summary Card:** For each pinned company, a card displays:
  - Top 5 Tier-1 suppliers by trade value
  - Active compliance flags (OFAC/UFLPA/BIS hits)
  - Active disruption events affecting any Tier-1 supplier
  - Country concentration risk summary
  - Financial health status of each Tier-1 supplier
- **Change Alerts:** If a supplier node's risk flags change since last viewed (new sanctions listing, new disruption event), a "Changed" badge appears on the dashboard card.
- **Export:** Download the full dashboard as a CSV or PDF report.

---

## 7. Database Design

### 7.1 Neo4j Graph Schema

Neo4j is the primary store for the supply chain graph. It is queried with Cypher and accessed from FastAPI via the `neo4j` Python driver.

#### Node Labels

```cypher
// Company node
(:Company {
  id: String,              // GLEIF LEI or generated UUID
  name: String,            // Canonical name (from GLEIF/OpenCorporates)
  aliases: [String],       // Raw name variants seen in trade records
  country_iso: String,     // ISO 3166-1 alpha-2
  country_name: String,
  industry: String,        // WCO HS chapter classification
  lat: Float,
  lon: Float,
  address: String,
  lei: String,             // GLEIF LEI if available
  is_resolved: Boolean,    // False = cluster node (unresolved at depth)
  created_at: DateTime,
  updated_at: DateTime
})

// HSN code node (used for traversal context)
(:HSNCode {
  code: String,            // 6-digit WCO code e.g. "8501.53"
  description: String,
  chapter: String,         // First 2 digits
  parent_code: String      // Parent HS heading
})
```

#### Relationship Types

```cypher
// Primary supply relationship
(supplier:Company)-[:SUPPLIES_TO {
  hsn_code: String,         // 6-digit WCO code
  national_code: String,    // Raw national code (may be 8 or 10 digits)
  tier: Integer,            // 1 = direct to Tier-0, 2 = Tier-2, etc.
  trade_value_usd: Float,   // Estimated USD trade value (from UN Comtrade)
  shipment_count: Integer,  // # records in source data
  source_country: String,   // Exporter country ISO
  dest_country: String,     // Importer country ISO
  year: Integer,            // Most recent year in data
  source_api: String,       // "importyeti" | "comtrade" | "usitc" | etc.
  created_at: DateTime
}]->(buyer:Company)

// HSN anchor relationship (Tier-0 association)
(company:Company)-[:ANCHORS_ON {
  selected_by_user: Boolean,
  trade_volume: Float
}]->(hsn:HSNCode)
```

#### Key Cypher Queries

```cypher
// Get full supply chain for a company up to N tiers
MATCH path = (anchor:Company {name: $name})<-[:SUPPLIES_TO*1..4]-(supplier:Company)
WHERE ALL(r IN relationships(path) WHERE $hsn IN [r.hsn_code])
RETURN path

// Find all suppliers within a country at any tier
MATCH (t0:Company {name: $name})<-[:SUPPLIES_TO*]-(s:Company {country_iso: $country})
RETURN s.name, s.tier, s.trade_value_usd

// Concentration risk: what % of a commodity comes from one country
MATCH ()-[r:SUPPLIES_TO {hsn_code: $hsn}]->()
WITH r.source_country AS country, SUM(r.trade_value_usd) AS value
WITH SUM(value) AS total, COLLECT({country: country, value: value}) AS breakdown
UNWIND breakdown AS row
RETURN row.country, row.value / total AS share ORDER BY share DESC
```

---

### 7.2 Supabase Relational Schema

Supabase (PostgreSQL + PostgREST) handles all tabular reference data, caches, logs, and user-facing state.

```sql
-- HSN code lookup table (seeded from WCO HS Dataset + Open Exchange HS)
CREATE TABLE hsn_codes (
  code        VARCHAR(12) PRIMARY KEY,  -- 6-digit WCO standard
  description TEXT NOT NULL,
  chapter     VARCHAR(2),
  section     VARCHAR(4),
  parent_code VARCHAR(12),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- BOM filtering rules: what's upstream of what
CREATE TABLE bom_rules (
  anchor_chapter    VARCHAR(2),
  upstream_chapter  VARCHAR(2),
  rationale         TEXT,
  confidence        FLOAT,   -- 0–1; rules below 0.6 trigger LLM verification
  PRIMARY KEY (anchor_chapter, upstream_chapter)
);

-- Cross-country HS code mapping
CREATE TABLE country_hsn_map (
  country_iso   VARCHAR(2),
  national_code VARCHAR(20),
  wco_6digit    VARCHAR(12),
  digits        INTEGER,     -- 8 or 10
  source        VARCHAR(50), -- "usitc" | "wco" | "customs_info"
  PRIMARY KEY (country_iso, national_code)
);

-- Search history
CREATE TABLE search_log (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id    VARCHAR(64),
  company_name  VARCHAR(255),
  canonical_name VARCHAR(255),  -- resolved name
  lei           VARCHAR(20),
  selected_hsn  TEXT[],
  tier_depth    INTEGER,
  node_count    INTEGER,
  edge_count    INTEGER,
  searched_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Saved/pinned graphs
CREATE TABLE saved_graphs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  VARCHAR(64),
  company_lei VARCHAR(20),
  label       VARCHAR(255),
  tier_depth  INTEGER,
  neo4j_query TEXT,            -- Cypher query to reconstruct subgraph
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Compliance flags cache
CREATE TABLE compliance_flags (
  company_id    VARCHAR(64),   -- GLEIF LEI or canonical name hash
  flag_type     VARCHAR(50),   -- "ofac" | "opensanctions" | "bis" | "uflpa" | "eu_sanctions"
  list_name     VARCHAR(100),
  match_score   FLOAT,
  raw_entry     JSONB,
  flagged_at    TIMESTAMPTZ DEFAULT NOW(),
  expires_at    TIMESTAMPTZ,
  PRIMARY KEY (company_id, flag_type)
);

-- Financial distress signals
CREATE TABLE financial_flags (
  company_id    VARCHAR(64),
  signal_type   VARCHAR(50),   -- "bankruptcy_filing" | "stock_decline" | "credit_downgrade"
  severity      VARCHAR(10),   -- "high" | "medium" | "low"
  description   TEXT,
  source        VARCHAR(50),
  detected_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Country risk cache (refreshed weekly from World Bank, FSI, ACLED)
CREATE TABLE country_risk_cache (
  country_iso       VARCHAR(2) PRIMARY KEY,
  country_name      VARCHAR(100),
  political_stability FLOAT,
  fragile_states_score FLOAT,
  conflict_events_90d INTEGER,
  gdelt_tension     FLOAT,
  composite_score   FLOAT,     -- 0–100
  updated_at        TIMESTAMPTZ
);

-- Real-time disruption events
CREATE TABLE disruption_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type  VARCHAR(50),     -- "earthquake" | "flood" | "port_closure" | "conflict"
  country_iso VARCHAR(2),
  lat         FLOAT,
  lon         FLOAT,
  severity    VARCHAR(10),
  title       TEXT,
  source      VARCHAR(50),
  occurred_at TIMESTAMPTZ,
  expires_at  TIMESTAMPTZ
);
```

---

## 8. API Design (FastAPI)

All endpoints are prefixed with `/api/v1`. FastAPI's async runtime is used throughout. Heavy traversal tasks are dispatched as background jobs.

### Core Endpoints

```
GET  /api/v1/company/resolve?name={name}
```
Resolves a company name to its canonical identity (GLEIF + OpenCorporates). Returns: `{lei, canonical_name, country, industry, is_cached}`.

```
GET  /api/v1/company/{lei}/hsn-codes
```
Fetches all HSN codes from that company's import records (ImportYeti + USITC). Returns list of `{hsn_code, description, trade_volume, shipment_count, year}`.

```
POST /api/v1/traversal/start
Body: { lei: string, hsn_codes: string[], max_tier: int (default 4) }
```
Kicks off recursive traversal. Returns `{ job_id }`. Progress streamed via SSE endpoint below.

```
GET  /api/v1/traversal/{job_id}/stream
```
Server-Sent Events stream. Emits events as each tier is resolved:
```json
{ "event": "tier_resolved", "tier": 1, "nodes_added": 6, "edges_added": 6 }
{ "event": "tier_resolved", "tier": 2, "nodes_added": 14, "edges_added": 22 }
{ "event": "complete", "total_nodes": 47, "total_edges": 89 }
```

```
GET  /api/v1/graph/{lei}?max_tier={n}&hsn={code}
```
Returns the full graph subgraph for a company from Neo4j as `{ nodes: [...], edges: [...] }` in Cytoscape.js-compatible format.

```
GET  /api/v1/graph/{lei}/geo
```
Returns same graph with lat/lon on every node for Leaflet rendering.

```
GET  /api/v1/company/{lei}/compliance
```
Returns all compliance flags for a company and all its resolved suppliers.

```
GET  /api/v1/disruptions?country_iso={cc}&hsn={code}
```
Returns active disruption events affecting suppliers for a given country and commodity.

```
GET  /api/v1/risk/country/{country_iso}
```
Returns composite country risk score and breakdown.

```
GET  /api/v1/hsn/bom-tree?anchor={code}
```
Returns the BOM-allowed upstream HSN chapters for a given anchor code.

```
POST /api/v1/dashboard/save
Body: { session_id, lei, label, tier_depth }
```
Pins a supply chain to the user's dashboard.

```
GET  /api/v1/dashboard/{session_id}
```
Returns all saved supply chains with their latest compliance/disruption status.

### Rate Limit Management (FastAPI Middleware)
Each external API source has a dedicated `asyncio.Semaphore` and token bucket:

```python
RATE_LIMITS = {
    "comtrade": {"calls_per_day": 100, "semaphore": 1},
    "opencorporates": {"calls_per_day": 50, "semaphore": 1},
    "nominatim": {"calls_per_second": 1, "semaphore": 1},
    "alpha_vantage": {"calls_per_day": 25, "semaphore": 1},
    "open_figi": {"calls_per_minute": 25, "semaphore": 5},
    "importyeti": {"calls_per_minute": 10, "semaphore": 1},  # polite scraping
}
```

Requests exceeding rate limits are queued and retried with exponential backoff. Results are always cached in Neo4j/Supabase to avoid repeat calls.

---

## 9. Frontend Architecture

**Stack:** React 18 + TypeScript + Vite + TailwindCSS + Cytoscape.js + Leaflet.js

### Page Structure

```
/                          → Landing page + company search input
/graph/{companyId}         → Main graph view (with HSN selector sidebar)
/graph/{companyId}/map     → Geo-map view (same data, map layout)
/dashboard                 → Saved supply chains + supplier summaries
/company/{companyId}       → Detailed company profile page
```

### Key Components

| Component | Description |
|---|---|
| `CompanySearchBar` | Autocomplete search powered by GLEIF fuzzy API; debounced 400ms |
| `HSNCodeSelector` | Table of found HSN codes with descriptions; multi-select checkboxes; "Start Traversal" CTA |
| `SupplyGraphView` | Cytoscape.js canvas; force-directed layout; tier-color-coded nodes; edge labels |
| `GeoMapView` | Leaflet.js map; company markers; D3 arc overlays for trade flows; choropleth country risk |
| `TierControls` | Expand/collapse buttons per tier; tier stats (node count, edge count, countries) |
| `NodeDetailPanel` | Right-side drawer; appears on node click; company info, HSN codes, flags |
| `ComplianceFlag` | Inline badge component; red=sanctions, orange=UFLPA, yellow=financial, green=clean |
| `DisruptionAlert` | Pulsing marker on map; toast notification in graph view |
| `DashboardCard` | Per-company card in dashboard; Tier-1 table + risk summary + change badges |
| `FilterBar` | HSN filter, country filter, tier filter, flag filter — all applied client-side to graph |

### State Management
- **React Query** for all API calls (caching, background refetch, loading states)
- **Zustand** for global graph state (current company, selected HSN codes, active tier, filters)
- **SSE connection** managed in a custom React hook (`useTraversalStream`) that appends nodes/edges to the Cytoscape graph as they arrive

---

## 10. Implementation Roadmap

### Phase 1 — Core Graph Engine (Weeks 1–2)
- [ ] Set up FastAPI project structure, Neo4j (Community Edition docker), Supabase project
- [ ] Implement Company Resolution service (GLEIF + OpenCorporates + Wikidata)
- [ ] Seed Supabase `hsn_codes` from WCO static dataset and Open Exchange HS
- [ ] Seed Supabase `bom_rules` with automotive/electronics/mining chapter mappings
- [ ] Build ImportYeti scraper for Tier-1 shipper-consignee resolution
- [ ] Implement USITC DataWeb and US Census Trade fetchers for Tier-1/2
- [ ] Implement UN Comtrade fetcher with rate-limit queue (100 calls/day)
- [ ] Build recursive traversal engine with Neo4j cache-first logic
- [ ] Implement BOM filter (Mode A — HS sub-tree analysis)
- [ ] Implement cross-country HSN normalisation (WCO 6-digit mapping)

### Phase 2 — Graph UI & Geo-Map (Weeks 3–4)
- [ ] React frontend scaffold: Vite + TypeScript + TailwindCSS
- [ ] `CompanySearchBar` with GLEIF autocomplete
- [ ] `HSNCodeSelector` table component
- [ ] `SupplyGraphView` with Cytoscape.js (tier coloring, edge labels)
- [ ] `NodeDetailPanel` drawer
- [ ] `TierControls` expand/collapse with SSE streaming
- [ ] `GeoMapView` with Leaflet.js, Nominatim geocoding, D3 arc overlays
- [ ] Map ↔ Graph synchronization
- [ ] FastAPI SSE streaming endpoint (`/traversal/{job_id}/stream`)

### Phase 3 — Compliance, Risk & Dashboard (Weeks 5–6)
- [ ] Download and ingest OFAC SDN, BIS Entity List, UFPLA CSV into Supabase
- [ ] OpenSanctions and EU Sanctions Map integration
- [ ] SEC EDGAR financial distress check
- [ ] Alpha Vantage stock decline check (capped at 25/day)
- [ ] World Bank country risk indicators + FSI download
- [ ] GDACS + USGS earthquake disruption events worker
- [ ] Country risk composite score calculator
- [ ] Concentration risk alert logic
- [ ] `DashboardCard` component + saved graphs persistence
- [ ] `ComplianceFlag` and `DisruptionAlert` components
- [ ] GDELT geopolitical tension integration

### Phase 4 — Polish, Testing & Demo Prep (Week 7)
- [ ] Load test with sample companies: GM (8703.23), Toyota (8703.23/8703.40), BMW (8703.24/8708.50), Lucid Group (8703.80/8507.60), Tesla (8501.53)
- [ ] Verify 6-tier traversal matches reference data (Tesla → Nidec → POSCO → Vale → Codelco path)
- [ ] Performance tuning for 200+ node graphs
- [ ] Export: graph PNG, CSV adjacency list, dashboard PDF
- [ ] Accessibility review
- [ ] Final demo walkthrough with all 4 sample companies

---

## 11. Key Reference Data & Test Cases

The following sample data (sourced from the project reference documents) should be used as test fixtures to validate the traversal engine and graph output.

### Sample Companies for Testing

| Company | Location | Entry HSN Code(s) | Expected Commodity Thread |
|---|---|---|---|
| General Motors | Detroit, Michigan | 8703.22, 8703.23, 8704.31, 8706.00 | Passenger/commercial vehicles and chassis |
| Toyota Motor North America | Plano, Texas | 8703.23, 8703.40, 8407.34, 8708.99 | Passenger cars, HEV, engines, wiring |
| BMW Manufacturing Co. LLC | Spartanburg, SC | 8703.24, 8703.60, 8708.50, 8544.30 | Luxury/PHEV, axles, wiring harnesses |
| Lucid Group Inc. | Newark, California | 8703.80, 8507.60, 8501.53, 8708.80 | BEV, Li-ion batteries, traction motors, air suspension |
| **Tesla Inc.** | Austin, Texas | **8501.53** | **AC traction motors (primary test case — full 6-tier reference)** |

### Tesla 8501.53 — Full 6-Tier Reference (Expected Output)

The traversal engine must produce a graph that contains **at minimum** the following nodes and edges:

| Tier | Company | Country | HSN Code | Expected Edge To |
|---|---|---|---|---|
| T0 | Tesla Inc. | USA | 8501.53 | (anchor) |
| T1 | Nidec Corporation | Japan | 8501.53 | Tesla |
| T1 | BorgWarner Inc. | USA | 8501.53 | Tesla |
| T1 | Denso Corporation | Japan | 8501.53 | Tesla |
| T1 | Moog Inc. | USA | 8503.00 | Tesla |
| T1 | Hitachi Astemo | Japan | 8501.40 | Tesla |
| T2 | Nidec Dalian Co. | China | 8503.00 | Nidec |
| T2 | Sumitomo Electric | Japan | 7408.11 | Nidec |
| T2 | POSCO | South Korea | 7225.19 | Nidec / BorgWarner |
| T2 | Nippon Steel Corp. | Japan | 7225.19 | Nidec |
| T2 | Furukawa Electric | Japan | 7408.11 | Nidec |
| T2 | Xinjiang Goldwind | China | 8503.00 | Nidec Dalian |
| T3 | Jiangxi Copper Co. | China | 7403.11 | Sumitomo / Furukawa |
| T3 | Aurubis AG | Germany | 7407.10 | Furukawa / Sumitomo |
| T3 | ArcelorMittal | Luxembourg | 7225.19 | POSCO / Nippon Steel |
| T3 | Cleveland-Cliffs | USA | 7225.19 | POSCO |
| T4 | Codelco | Chile | 2603.00 | Jiangxi Copper / Aurubis |
| T4 | BHP / Escondida | Chile | 2603.00 | Jiangxi Copper |
| T4 | Freeport-McMoRan | USA/Indonesia | 2603.00 | Jiangxi Copper |
| T4 | Vale S.A. | Brazil | 2601.11 | POSCO / ArcelorMittal |
| T4 | Rio Tinto | Australia/UK | 2601.11 | POSCO / Nippon Steel |
| T5 | Caterpillar Inc. | USA | 8429.52 | Codelco / BHP |
| T5 | Sandvik AB | Sweden | 8430.31 | Codelco / Freeport |
| T5 | BASF SE | Germany | 3824.99 | Codelco / BHP |
| T5 | Orica Ltd. | Australia | 3602.00 | Codelco / BHP |
| T6 | Air Products & Chemicals | USA | 2804.40 | Smelters (copper) |
| T6 | Linde plc | Ireland/Germany | 2804.40 | Smelters |
| T6 | Yara International | Norway | 3102.10 | Orica / Dyno Nobel |
| T6 | Siemens Energy | Germany | 8504.40 | Mining mill drives |
| T6 | ABB Ltd. | Switzerland | 8501.64 | Mining mill drives |

### HSN Cross-Country Mapping Validation

| Commodity | WCO 6-digit | US HTS | India HSN | Expected System Behavior |
|---|---|---|---|---|
| AC Traction Motors | 8501.53 | 8501.53.4000 | 8501.5300 | Normalise to `8501.53` in Neo4j edge; store national code as attribute |
| Copper Wire >6mm | 7408.11 | 7408.11.6000 | 7408.1100 | Consistent; normalisation is a no-op |
| Silicon-Electrical Steel | 7225.19 | 7225.19.0090 | 7225.1900 | Normalise; US end-use suffix ignored for graph joins |

---

## 12. Constraints, Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| ImportYeti blocks scraping | Tier-1 resolution fails | Rate-limit to ≤10 req/min; use user-agent rotation; fall back to Panjiva public view; cache aggressively |
| UN Comtrade 100 calls/day limit | Tier-2+ traversal stalls | Prioritise USITC DataWeb (unlimited) and US Census Trade for US flows; save Comtrade calls for non-US bilateral flows; batch queries by country |
| Company name deduplication noise | Duplicate nodes in graph, incorrect edges | GLEIF LEI is primary dedup key; fuzzy match with `rapidfuzz` ≥85% confidence; manual merge UI for flagged duplicates |
| Sparse trade data at Tier-4+ | Graph ends prematurely | Fall back to World Bank WITS aggregate commodity flows; create "cluster" nodes (e.g., "Chilean Copper Producers") with a visual distinction from resolved company nodes |
| Cross-country HSN code divergence | BOM filter breaks at border hops | Pre-seeded `country_hsn_map` in Supabase covers US (10-digit), India (8-digit), EU/Korea (10-digit); Customs Info API for gaps |
| Nominatim geocoding rate limit (1/sec) | Geo-map slow to populate | Geocode at node creation time and cache in Neo4j permanently; batch geocoding calls via the OSM Nominatim bulk endpoint |
| OpenCorporates 50 calls/day free limit | Entity resolution bottleneck | Use GLEIF LEI as primary (unlimited, no key); use OpenCorporates only for companies not found in GLEIF; fallback to Wikidata SPARQL |
| Neo4j memory limits (Community Edition) | Graph queries slow for large networks | Index on `Company.name`, `Company.lei`, `Company.country_iso`; use relationship indexes on `SUPPLIES_TO.hsn_code`; limit default traversal to 4 tiers, 6 on explicit user request |
| Alpha Vantage 25 calls/day | Limited financial signal coverage | Apply only to Tier-1 suppliers of the currently viewed company; queue overnight batch jobs for deeper tiers |

---

*Document prepared for SYN3RGY 3.0 Open Innovation Track. All API sources are free-tier or public domain as of Q2 2025.*
