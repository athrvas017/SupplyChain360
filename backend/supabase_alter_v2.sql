-- ─── LATEST SCHEMA UPDATE (ALTER MODE) ──────────────────────────
-- Use this script to add new features without losing existing data.

-- 1. Update node_risk_scores with Financial Intelligence fields
ALTER TABLE node_risk_scores 
ADD COLUMN IF NOT EXISTS financial_risk_score FLOAT DEFAULT 0.0,
ADD COLUMN IF NOT EXISTS financial_warnings TEXT[] DEFAULT '{}';

-- 2. Ensure RLS is disabled for ALL tables to resolve 403 errors (Hackathon Mode)
ALTER TABLE search_log DISABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_flags DISABLE ROW LEVEL SECURITY;
ALTER TABLE disruption_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE country_risk_cache DISABLE ROW LEVEL SECURITY;
ALTER TABLE financial_flags DISABLE ROW LEVEL SECURITY;
ALTER TABLE node_risk_scores DISABLE ROW LEVEL SECURITY;
ALTER TABLE graph_snapshots DISABLE ROW LEVEL SECURITY;

-- 3. Grant full access to anonymous role (for local testing/hackathon)
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ✅ Schema update complete.
