export default function ParallelLayout({
  children,
  feed,
  trending,
}: {
  children: React.ReactNode;
  feed: React.ReactNode;
  trending: React.ReactNode;
}) {
  return (
    <div>
      <h2>Parallel Routes</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <section>
          <h3>Feed (@feed)</h3>
          {feed}
        </section>
        <section>
          <h3>Trending (@trending)</h3>
          {trending}
        </section>
      </div>
      <div style={{ marginTop: 16 }}>{children}</div>
    </div>
  );
}
