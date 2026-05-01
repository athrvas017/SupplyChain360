# Supply Chain X-Ray

**Project:** Supply Chain X-Ray  
**Track:** SYN3RGY 3.0 · Open Innovation  
**Version:** 1.0  
**Stack:** FastAPI · Supabase · Neo4j · React  
**Constraint:** Free-tier only — no paid API services  

## 1. Executive Summary

Supply Chain X-Ray is a web-based interactive platform that reconstructs multi-tier supplier networks for any given company using exclusively open and free-tier trade data. A user enters a company name (e.g., *Tesla Inc.*), selects one or more HSN codes from that company's import records, and the system recursively traces the supply graph — from the company's direct (Tier-1) suppliers all the way back to raw-material producers (Tier-4 through Tier-6) — while displaying the result as an interactive directed graph and a geo-mapped global trade flow overlay.

The platform is built on **FastAPI** (backend orchestration and REST API), **Neo4j** (persistent graph storage for companies, trade edges, and tier relationships), and **Supabase** (relational storage for search history, user sessions, compliance flags, and HSN lookup tables). The frontend uses **React** with **Cytoscape.js** for graph visualization and **Leaflet.js** for geo-mapping.

Every API and data source used is on a free or no-auth public tier. The system is designed so that repeated searches progressively enrich the stored graph rather than re-querying data sources from scratch.

## 2. System Architecture Overview

### Technology Responsibilities

| Layer | Technology | Role |
|---|---|---|
| Frontend | React + Cytoscape.js + Leaflet.js | Graph UI, geo-map, search UX |
| API Layer | FastAPI (Python) | REST endpoints, orchestration, rate-limit management |
| Graph DB | Neo4j (Community Edition, free) | Persistent supply graph — nodes, edges, tiers |
| Relational DB | Supabase (free tier) | HSN lookup tables, search history, compliance cache, session state |
| Trade Data | UN Comtrade, USITC DataWeb, US Census Trade, World Bank WITS | Tier resolution |
| Entity Resolution | GLEIF LEI API, OpenCorporates, Wikidata SPARQL | Company dedup and enrichment |
| Compliance | OFAC SDN, OpenSanctions, BIS Entity List, UFPLA CSV | Sanctions/forced labour flagging |
| Geo | Nominatim/OSM, Leaflet.js, Natural Earth | Geocoding, map rendering |
| Risk | World Bank Indicators, GDELT, GDACS, OpenWeatherMap | Country risk + disruption signals |

## 3. Core Features

### 3.1 Company Ingestion & HSN Resolution (Tier-0)
The user types a company name. The system resolves all HSN (HS) codes associated with that company's import trade records and presents them in a selection UI with commodity descriptions.

### 3.2 Recursive Supply Graph Traversal
Starting from Tier-0 (the searched company), the system recursively discovers the companies at each upstream tier, using the selected HSN code as the traversal anchor and querying trade databases at each hop.

### 3.3 BOM-Aware Filtering
At every tier transition, the system prunes trade relationships that are NOT actual manufacturing inputs to the traced commodity.

### 3.4 HSN Cross-Country Normalization
When the traversal crosses a border, the system normalises all codes to the 6-digit WCO standard before making graph connections.

### 3.5 Interactive Graph Visualization
The primary UI is a directed force-graph showing the full supply network using **Cytoscape.js**. 

### 3.6 Geo-Mapped Trade Flow View
A parallel view replaces the abstract graph with a world map using **Leaflet.js**, showing companies plotted at their real geographic coordinates and trade flows drawn as arcs between them.

## 4. Bonus Features
- **Compliance & Financial Insights:** Flags sanctioned entities and financial distress signals.
- **Geopolitical & Environmental Risk Layer:** Computes country risk index and real-time disruption signals.
- **Supplier Dashboard:** Saves searched supply chains and tier-1 supplier summaries.