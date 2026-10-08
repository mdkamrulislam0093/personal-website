import { site } from '../content';

export default function Footer() {
  return (
    <footer
      className="mono muted"
      style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--s4)', flexWrap: 'wrap', padding: 'var(--s5) var(--gutter)', borderTop: '1px solid var(--line)' }}
    >
      <span>
        © {new Date().getFullYear()} {site.name} — Crafted with care
      </span>
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
