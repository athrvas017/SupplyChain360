-- =====================================================================
-- supabase_fix_all_policies.sql
-- Run this ONCE in the Supabase SQL Editor to fix ALL 403 errors.
-- This grants full read/write access on ALL tables used by the platform.
-- =====================================================================

-- ─────────────────────────────────────────────────────────────────────
-- 1. SEARCH_LOG — needed by Dashboard
-- ─────────────────────────────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'search_log') THEN
    CREATE TABLE search_log (
      id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      session_id   UUID,
      canonical_name VARCHAR(255) NOT NULL,
      tier_depth   INTEGER DEFAULT 4,
      searched_at  TIMESTAMPTZ DEFAULT NOW()
    );
  END IF;
END $$;
ALTER TABLE search_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "search_log_read" ON search_log;
DROP POLICY IF EXISTS "search_log_insert" ON search_log;
DROP POLICY IF EXISTS "search_log_update" ON search_log;
CREATE POLICY "search_log_read" ON search_log FOR SELECT USING (true);
CREATE POLICY "search_log_insert" ON search_log FOR INSERT WITH CHECK (true);
CREATE POLICY "search_log_update" ON search_log FOR UPDATE USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────
-- 2. COMPLIANCE_FLAGS — needed by Compliance page + Dashboard Insights
-- ─────────────────────────────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'compliance_flags') THEN
    CREATE TABLE compliance_flags (
      company_id   VARCHAR(64)   NOT NULL,
      flag_type    VARCHAR(32)   NOT NULL,
      list_name    VARCHAR(255),
      match_score  REAL,
      raw_entry    JSONB,
      flagged_at   TIMESTAMPTZ   DEFAULT NOW(),
      expires_at   TIMESTAMPTZ,
      PRIMARY KEY (company_id, flag_type)
    );
  END IF;
END $$;
ALTER TABLE compliance_flags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "compliance_flags_read" ON compliance_flags;
DROP POLICY IF EXISTS "compliance_flags_insert" ON compliance_flags;
DROP POLICY IF EXISTS "compliance_flags_update" ON compliance_flags;
CREATE POLICY "compliance_flags_read" ON compliance_flags FOR SELECT USING (true);
CREATE POLICY "compliance_flags_insert" ON compliance_flags FOR INSERT WITH CHECK (true);
CREATE POLICY "compliance_flags_update" ON compliance_flags FOR UPDATE USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────
-- 3. FINANCIAL_FLAGS — needed by Compliance + Dashboard
-- ─────────────────────────────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'financial_flags') THEN
    CREATE TABLE financial_flags (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      company_id    VARCHAR(64)   NOT NULL,
      signal_type   VARCHAR(32),
      severity      VARCHAR(16),
      description   TEXT,
      source        VARCHAR(64),
      detected_at   TIMESTAMPTZ   DEFAULT NOW()
    );
  END IF;
END $$;
ALTER TABLE financial_flags ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "financial_flags_read" ON financial_flags;
DROP POLICY IF EXISTS "financial_flags_insert" ON financial_flags;
DROP POLICY IF EXISTS "financial_flags_update" ON financial_flags;
CREATE POLICY "financial_flags_read" ON financial_flags FOR SELECT USING (true);
CREATE POLICY "financial_flags_insert" ON financial_flags FOR INSERT WITH CHECK (true);
CREATE POLICY "financial_flags_update" ON financial_flags FOR UPDATE USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────
-- 4. DISRUPTION_EVENTS — needed by Dashboard Reports
-- ─────────────────────────────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'disruption_events') THEN
    CREATE TABLE disruption_events (
      id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      event_type    VARCHAR(64),
      country_iso   VARCHAR(2),
      lat           REAL,
      lon           REAL,
      severity      VARCHAR(16),
      title         VARCHAR(255),
      description   TEXT,
      source        VARCHAR(64),
      occurred_at   TIMESTAMPTZ DEFAULT NOW(),
      expires_at    TIMESTAMPTZ
    );
  END IF;
END $$;
ALTER TABLE disruption_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "disruption_events_read" ON disruption_events;
DROP POLICY IF EXISTS "disruption_events_insert" ON disruption_events;
DROP POLICY IF EXISTS "disruption_events_update" ON disruption_events;
CREATE POLICY "disruption_events_read" ON disruption_events FOR SELECT USING (true);
CREATE POLICY "disruption_events_insert" ON disruption_events FOR INSERT WITH CHECK (true);
CREATE POLICY "disruption_events_update" ON disruption_events FOR UPDATE USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────
-- 5. COUNTRY_RISK_CACHE — needed by Dashboard Warehouses
-- ─────────────────────────────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'country_risk_cache') THEN
    CREATE TABLE country_risk_cache (
      country_iso         VARCHAR(2) PRIMARY KEY,
      country_name        VARCHAR(128),
      political_stability REAL,
      fragile_states_score REAL,
      conflict_events_90d INTEGER,
      gdelt_tension       REAL,
      trade_concentration REAL,
      composite_score     REAL,
      updated_at          TIMESTAMPTZ DEFAULT NOW()
    );
  END IF;
END $$;
ALTER TABLE country_risk_cache ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "country_risk_cache_read" ON country_risk_cache;
DROP POLICY IF EXISTS "country_risk_cache_insert" ON country_risk_cache;
DROP POLICY IF EXISTS "country_risk_cache_update" ON country_risk_cache;
CREATE POLICY "country_risk_cache_read" ON country_risk_cache FOR SELECT USING (true);
CREATE POLICY "country_risk_cache_insert" ON country_risk_cache FOR INSERT WITH CHECK (true);
CREATE POLICY "country_risk_cache_update" ON country_risk_cache FOR UPDATE USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────
-- 6. NODE_RISK_SCORES — needed by Dashboard + Risk scoring
-- ─────────────────────────────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'node_risk_scores') THEN
    CREATE TABLE node_risk_scores (
      company_id   VARCHAR(64) PRIMARY KEY,
      risk_score   REAL DEFAULT 50,
      risk_band    VARCHAR(16) DEFAULT 'MEDIUM',
      risk_flags   JSONB DEFAULT '[]',
      components   JSONB DEFAULT '{}',
      computed_at  TIMESTAMPTZ DEFAULT NOW()
    );
  END IF;
END $$;
ALTER TABLE node_risk_scores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "node_risk_scores_read" ON node_risk_scores;
DROP POLICY IF EXISTS "node_risk_scores_insert" ON node_risk_scores;
DROP POLICY IF EXISTS "node_risk_scores_update" ON node_risk_scores;
CREATE POLICY "node_risk_scores_read" ON node_risk_scores FOR SELECT USING (true);
CREATE POLICY "node_risk_scores_insert" ON node_risk_scores FOR INSERT WITH CHECK (true);
CREATE POLICY "node_risk_scores_update" ON node_risk_scores FOR UPDATE USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────
-- 7. CONCENTRATION_RISK — needed by Risk analysis
-- ─────────────────────────────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'concentration_risk') THEN
    CREATE TABLE concentration_risk (
      id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      company_id     VARCHAR(64),
      country_iso    VARCHAR(2),
      concentration  REAL DEFAULT 0,
      is_critical    BOOLEAN DEFAULT false,
      computed_at    TIMESTAMPTZ DEFAULT NOW()
    );
  END IF;
END $$;
ALTER TABLE concentration_risk ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "concentration_risk_read" ON concentration_risk;
DROP POLICY IF EXISTS "concentration_risk_insert" ON concentration_risk;
DROP POLICY IF EXISTS "concentration_risk_update" ON concentration_risk;
CREATE POLICY "concentration_risk_read" ON concentration_risk FOR SELECT USING (true);
CREATE POLICY "concentration_risk_insert" ON concentration_risk FOR INSERT WITH CHECK (true);
CREATE POLICY "concentration_risk_update" ON concentration_risk FOR UPDATE USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────
-- 8. GRAPH_SNAPSHOTS — needed by Cinematic Route + Cross-page access
-- ─────────────────────────────────────────────────────────────────────
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'graph_snapshots') THEN
    CREATE TABLE graph_snapshots (
      id               UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
      company_name     VARCHAR(255)  NOT NULL,
      session_id       UUID,
      nodes_json       JSONB         NOT NULL DEFAULT '[]',
      edges_json       JSONB         NOT NULL DEFAULT '[]',
      node_count       INTEGER       DEFAULT 0,
      edge_count       INTEGER       DEFAULT 0,
      tiers_built      INTEGER       DEFAULT 0,
      created_at       TIMESTAMPTZ   DEFAULT NOW()
    );
    CREATE INDEX IF NOT EXISTS idx_graph_snapshots_company ON graph_snapshots(company_name);
    CREATE INDEX IF NOT EXISTS idx_graph_snapshots_created ON graph_snapshots(created_at DESC);
  END IF;
END $$;
ALTER TABLE graph_snapshots ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "graph_snapshots_read" ON graph_snapshots;
DROP POLICY IF EXISTS "graph_snapshots_insert" ON graph_snapshots;
DROP POLICY IF EXISTS "graph_snapshots_update" ON graph_snapshots;
CREATE POLICY "graph_snapshots_read" ON graph_snapshots FOR SELECT USING (true);
CREATE POLICY "graph_snapshots_insert" ON graph_snapshots FOR INSERT WITH CHECK (true);
CREATE POLICY "graph_snapshots_update" ON graph_snapshots FOR UPDATE USING (true) WITH CHECK (true);

-- =====================================================================
-- DONE — All 8 tables created and policies applied.
-- =====================================================================
