export default function SectionLabel({ children }) {
  return (
    <p
      style={{
        fontFamily: '"Courier Prime", monospace',
        fontSize: '0.68rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--c-gold)',
        marginBottom: '1rem',
      }}
    >
      {children}
    </p>
  );
}
