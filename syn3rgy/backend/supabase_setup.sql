-- =====================================================================
-- Supply Chain X-Ray — Complete Supabase Schema
-- Run this in the Supabase SQL Editor once.
-- Aligned with backend/risk_module/router.py column references.
-- =====================================================================

-- ─────────────────────────────────────────────────────────────────────
-- 1. Country Risk Cache
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS country_risk_cache (
  country_iso           VARCHAR(2)    PRIMARY KEY,
  country_name          VARCHAR(100),
  political_stability   FLOAT,
  fragile_states_score  FLOAT,
  conflict_events_90d   INTEGER,
  conflict_score        FLOAT,
  gdelt_tension         FLOAT,
  trade_concentration   FLOAT,
  composite_score       FLOAT         NOT NULL DEFAULT 50.0,
  risk_band             VARCHAR(10),
  score                 FLOAT,          -- simplified score used by router cache
  updated_at            TIMESTAMPTZ   DEFAULT NOW()
);

ALTER TABLE country_risk_cache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "country_risk_cache_read" ON country_risk_cache FOR SELECT USING (true);

-- ─────────────────────────────────────────────────────────────────────
-- 2. Disruption Events
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS disruption_events (
  id                    TEXT          PRIMARY KEY,
  source                VARCHAR(30)   NOT NULL,
  event_type            VARCHAR(50),
  title                 TEXT,
  description           TEXT,
  severity              VARCHAR(10)   NOT NULL,
  lat                   FLOAT,
  lon                   FLOAT,
  country_iso           VARCHAR(2),
  occurred_at           TIMESTAMPTZ   DEFAULT NOW(),
  expires_at            TIMESTAMPTZ,
  created_at            TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_disruptions_severity ON disruption_events(severity);
CREATE INDEX IF NOT EXISTS idx_disruptions_expiry   ON disruption_events(expires_at);

ALTER TABLE disruption_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "disruption_events_read" ON disruption_events FOR SELECT USING (true);

-- ─────────────────────────────────────────────────────────────────────
-- 3. Compliance Flags
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS compliance_flags (
  id                    UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id            VARCHAR(64)   NOT NULL,
  flag_type             VARCHAR(50)   NOT NULL,
  list_name             VARCHAR(150),
  match_score           FLOAT,
  raw_entry             JSONB,
  flagged_at            TIMESTAMPTZ   DEFAULT NOW(),
  expires_at            TIMESTAMPTZ,
  UNIQUE(company_id, flag_type)
);

CREATE INDEX IF NOT EXISTS idx_compliance_company ON compliance_flags(company_id);
CREATE INDEX IF NOT EXISTS idx_compliance_type    ON compliance_flags(flag_type);

ALTER TABLE compliance_flags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "compliance_flags_read" ON compliance_flags FOR SELECT USING (true);

-- ─────────────────────────────────────────────────────────────────────
-- 4. Financial Flags
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS financial_flags (
  id                    UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id            VARCHAR(64)   NOT NULL,
  signal_type           VARCHAR(50),
  severity              VARCHAR(10),
  description           TEXT,
  source                VARCHAR(50),
  detected_at           TIMESTAMPTZ   DEFAULT NOW(),
  UNIQUE(company_id, signal_type)
);

CREATE INDEX IF NOT EXISTS idx_financial_company ON financial_flags(company_id);

ALTER TABLE financial_flags ENABLE ROW LEVEL SECURITY;
CREATE POLICY "financial_flags_read" ON financial_flags FOR SELECT USING (true);

-- ─────────────────────────────────────────────────────────────────────
-- 5. Concentration Risk
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS concentration_risk (
  hsn_code              VARCHAR(12)   PRIMARY KEY,
  hhi                   FLOAT,
  concentration_score   FLOAT,
  concentration_band    VARCHAR(10),
  top_country_iso3      VARCHAR(3),
  top_country_share_pct FLOAT,
  computed_at           TIMESTAMPTZ   DEFAULT NOW()
);

ALTER TABLE concentration_risk ENABLE ROW LEVEL SECURITY;
CREATE POLICY "concentration_risk_read" ON concentration_risk FOR SELECT USING (true);

-- ─────────────────────────────────────────────────────────────────────
-- 6. Node Risk Scores
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS node_risk_scores (
  company_id            VARCHAR(64)   PRIMARY KEY,
  risk_score            FLOAT         NOT NULL DEFAULT 50.0,
  risk_band             VARCHAR(10),
  risk_flags            TEXT[],
  components            JSONB,
  computed_at           TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_node_risk_band  ON node_risk_scores(risk_band);
CREATE INDEX IF NOT EXISTS idx_node_risk_score ON node_risk_scores(risk_score DESC);

ALTER TABLE node_risk_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "node_risk_scores_read" ON node_risk_scores FOR SELECT USING (true);

-- ─────────────────────────────────────────────────────────────────────
-- 7. Search Log (for dashboard)
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS search_log (
  id                    UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_name        VARCHAR(255),
  searched_at           TIMESTAMPTZ   DEFAULT NOW(),
  tier_depth            INTEGER       DEFAULT 4,
  session_id            UUID
);

ALTER TABLE search_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "search_log_read" ON search_log FOR SELECT USING (true);

-- ─────────────────────────────────────────────────────────────────────
-- 8. HSN Master
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hsn_master (
  hsn_code              VARCHAR(12)   PRIMARY KEY,
  description           TEXT,
  section               VARCHAR(4),
  chapter               VARCHAR(4)
);

ALTER TABLE hsn_master ENABLE ROW LEVEL SECURITY;
CREATE POLICY "hsn_master_read" ON hsn_master FOR SELECT USING (true);
