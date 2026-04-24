-- =====================================================================
-- supabase_super_unlock_v2.sql
-- COMPLETE FIX FOR ALL 403 AND 400 ERRORS
-- Run this in the Supabase SQL Editor once.
-- =====================================================================

-- 1. Create tables if they don't exist (Fixes schema without dropping data)
-- 2. Create search_log with all columns expected by frontend
CREATE TABLE IF NOT EXISTS search_log (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   UUID,
  company_name VARCHAR(255),
  canonical_name VARCHAR(255),
  lei          VARCHAR(64),
  selected_hsn TEXT[], -- mapped to selected_hsn
  tier_depth   INTEGER DEFAULT 4,
  node_count   INTEGER DEFAULT 0,
  edge_count   INTEGER DEFAULT 0,
  searched_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create compliance_flags
CREATE TABLE IF NOT EXISTS compliance_flags (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id   VARCHAR(64) NOT NULL,
  flag_type    VARCHAR(50) NOT NULL,
  list_name    VARCHAR(255),
  match_score  FLOAT,
  raw_entry    JSONB,
  flagged_at   TIMESTAMPTZ DEFAULT NOW(),
  expires_at   TIMESTAMPTZ,
  UNIQUE(company_id, flag_type)
);

-- 4. Create financial_flags
CREATE TABLE IF NOT EXISTS financial_flags (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id   VARCHAR(64) NOT NULL,
  signal_type  VARCHAR(50),
  severity     VARCHAR(16),
  description  TEXT,
  source       VARCHAR(64),
  detected_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, signal_type)
);

-- 5. Create disruption_events
CREATE TABLE IF NOT EXISTS disruption_events (
  id            TEXT PRIMARY KEY,
  event_type    VARCHAR(64),
  country_iso   VARCHAR(2),
  lat           FLOAT,
  lon           FLOAT,
  severity      VARCHAR(16),
  title         VARCHAR(255),
  description   TEXT,
  source        VARCHAR(64),
  occurred_at   TIMESTAMPTZ DEFAULT NOW(),
  expires_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create country_risk_cache
CREATE TABLE IF NOT EXISTS country_risk_cache (
  country_iso         VARCHAR(2) PRIMARY KEY,
  country_name        VARCHAR(128),
  political_stability FLOAT,
  fragile_states_score FLOAT,
  conflict_events_90d INTEGER,
  conflict_score      FLOAT,
  gdelt_tension       FLOAT,
  trade_concentration FLOAT,
  composite_score     FLOAT DEFAULT 50,
  risk_band           VARCHAR(16),
  score               FLOAT,
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create node_risk_scores
CREATE TABLE IF NOT EXISTS node_risk_scores (
  company_id           VARCHAR(64) PRIMARY KEY,
  risk_score           FLOAT DEFAULT 50,
  risk_band            VARCHAR(16),
  risk_flags           TEXT[],
  financial_risk_score FLOAT DEFAULT 0.0,
  financial_warnings   TEXT[],
  components           JSONB DEFAULT '{}',
  computed_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Create graph_snapshots
CREATE TABLE IF NOT EXISTS graph_snapshots (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name     VARCHAR(255) NOT NULL,
  session_id       UUID,
  nodes_json       JSONB NOT NULL DEFAULT '[]',
  edges_json       JSONB NOT NULL DEFAULT '[]',
  node_count       INTEGER DEFAULT 0,
  edge_count       INTEGER DEFAULT 0,
  tiers_built      INTEGER DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Disable RLS and Grant Permissions (Unlocks tables - Fixes 403 errors)
-- This ensures that ANY key (anon or service_role) can read/write during development.
ALTER TABLE search_log DISABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_flags DISABLE ROW LEVEL SECURITY;
ALTER TABLE financial_flags DISABLE ROW LEVEL SECURITY;
ALTER TABLE disruption_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE country_risk_cache DISABLE ROW LEVEL SECURITY;
ALTER TABLE node_risk_scores DISABLE ROW LEVEL SECURITY;
ALTER TABLE graph_snapshots DISABLE ROW LEVEL SECURITY;

GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;

-- =====================================================================
-- DONE - Refresh your Dashboard and Trace a company to see it live.
-- =====================================================================
