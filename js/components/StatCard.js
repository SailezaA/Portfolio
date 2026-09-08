/**
 * StatCard Component
 * Renders a key career metric counter card
 */
export function createStatCard({ number, label, sub }) {
  return `
    <div class="stat-card">
      <div class="stat-number">${number}</div>
      <div class="stat-label">${label}</div>
      <div class="stat-sub">${sub}</div>
    </div>
  `;
}
