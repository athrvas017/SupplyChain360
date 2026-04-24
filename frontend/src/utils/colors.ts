/**
 * SupplyLens 360 Color Utilities
 */

export const TIER_COLORS = {
  0: '#ef4444',  // Neon Red — Anchor
  1: '#f97316',  // Bright Orange — Tier 1
  2: '#10b981',  // Emerald Green — Tier 2
  3: '#06b6d4',  // Cyan — Tier 3
  4: '#d946ef',  // Fuchsia/Pink — Tier 4
};

export const RISK_COLORS = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#f97316',
  critical: '#ef4444',
};

export const RISK_BG_COLORS = {
  low: 'rgba(16,185,129,0.12)',
  medium: 'rgba(245,158,11,0.12)',
  high: 'rgba(249,115,22,0.12)',
  critical: 'rgba(239,68,68,0.12)',
};

export function getTierColor(tier) {
  return TIER_COLORS[tier] || TIER_COLORS[4];
}

export function getRiskColor(level) {
  return RISK_COLORS[level] || RISK_COLORS.low;
}

export function getRiskBgColor(level) {
  return RISK_BG_COLORS[level] || RISK_BG_COLORS.low;
}

// Country flag emoji from country code
const COUNTRY_FLAGS = {
  US: '🇺🇸', CN: '🇨🇳', TW: '🇹🇼', JP: '🇯🇵', KR: '🇰🇷',
  DE: '🇩🇪', GB: '🇬🇧', FR: '🇫🇷', IN: '🇮🇳', VN: '🇻🇳',
  TH: '🇹🇭', MY: '🇲🇾', ID: '🇮🇩', PH: '🇵🇭', SG: '🇸🇬',
  BD: '🇧🇩', PK: '🇵🇰', MX: '🇲🇽', BR: '🇧🇷', CL: '🇨🇱',
  AR: '🇦🇷', AU: '🇦🇺', NZ: '🇳🇿', CA: '🇨🇦', IL: '🇮🇱',
  SA: '🇸🇦', AE: '🇦🇪', TR: '🇹🇷', RU: '🇷🇺', UA: '🇺🇦',
  ZA: '🇿🇦', NG: '🇳🇬', KE: '🇰🇪', EG: '🇪🇬', MM: '🇲🇲',
  CD: '🇨🇩', CG: '🇨🇬', CH: '🇨🇭', NL: '🇳🇱', IT: '🇮🇹',
  IE: '🇮🇪', SE: '🇸🇪', NO: '🇳🇴', FI: '🇫🇮', PL: '🇵🇱',
  CZ: '🇨🇿', HU: '🇭🇺', RO: '🇷🇴', BE: '🇧🇪',
};

export function getCountryFlag(code) {
  return COUNTRY_FLAGS[code] || '🏳️';
}

export function formatWeight(kg) {
  if (kg >= 1000000) return `${(kg / 1000000).toFixed(1)}M kg`;
  if (kg >= 1000) return `${(kg / 1000).toFixed(1)}K kg`;
  return `${kg} kg`;
}

export function formatNumber(n) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}
