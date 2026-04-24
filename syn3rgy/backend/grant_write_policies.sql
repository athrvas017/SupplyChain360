-- =====================================================================
-- grant_write_policies.sql
-- Run once in the Supabase SQL Editor.
-- 
-- The backend uses the `anon` key but all tables only have SELECT
-- policies, causing "permission denied" (42501) on INSERT/UPSERT.
-- This adds INSERT + UPDATE policies for every table the backend writes.
-- =====================================================================

-- 1. disruption_events
CREATE POLICY "disruption_events_insert" ON disruption_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "disruption_events_update" ON disruption_events
  FOR UPDATE USING (true) WITH CHECK (true);

-- 2. country_risk_cache
CREATE POLICY "country_risk_cache_insert" ON country_risk_cache
  FOR INSERT WITH CHECK (true);

CREATE POLICY "country_risk_cache_update" ON country_risk_cache
  FOR UPDATE USING (true) WITH CHECK (true);

-- 3. node_risk_scores
CREATE POLICY "node_risk_scores_insert" ON node_risk_scores
  FOR INSERT WITH CHECK (true);

CREATE POLICY "node_risk_scores_update" ON node_risk_scores
  FOR UPDATE USING (true) WITH CHECK (true);

-- 4. concentration_risk
CREATE POLICY "concentration_risk_insert" ON concentration_risk
  FOR INSERT WITH CHECK (true);

CREATE POLICY "concentration_risk_update" ON concentration_risk
  FOR UPDATE USING (true) WITH CHECK (true);

-- 5. compliance_flags
CREATE POLICY "compliance_flags_insert" ON compliance_flags
  FOR INSERT WITH CHECK (true);

CREATE POLICY "compliance_flags_update" ON compliance_flags
  FOR UPDATE USING (true) WITH CHECK (true);

-- 6. financial_flags
CREATE POLICY "financial_flags_insert" ON financial_flags
  FOR INSERT WITH CHECK (true);

CREATE POLICY "financial_flags_update" ON financial_flags
  FOR UPDATE USING (true) WITH CHECK (true);

-- 7. search_log
CREATE POLICY "search_log_insert" ON search_log
  FOR INSERT WITH CHECK (true);
