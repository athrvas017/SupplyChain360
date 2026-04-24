-- =====================================================================
-- graph_snapshots_and_policies.sql
-- Run this in the Supabase SQL Editor ONCE.
-- Adds the graph_snapshots table + missing write policies.
-- =====================================================================

-- ─────────────────────────────────────────────────────────────────────
-- 9. Graph Snapshots (persists traced graphs for cross-page access)
-- ─────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS graph_snapshots (
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

ALTER TABLE graph_snapshots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "graph_snapshots_read" ON graph_snapshots FOR SELECT USING (true);
CREATE POLICY "graph_snapshots_insert" ON graph_snapshots FOR INSERT WITH CHECK (true);
CREATE POLICY "graph_snapshots_update" ON graph_snapshots FOR UPDATE USING (true) WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────
-- Add missing INSERT policy for search_log
-- ─────────────────────────────────────────────────────────────────────
CREATE POLICY "search_log_insert" ON search_log
  FOR INSERT WITH CHECK (true);

CREATE POLICY "search_log_update" ON search_log
  FOR UPDATE USING (true) WITH CHECK (true);
