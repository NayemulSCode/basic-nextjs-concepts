type Props = { params: { slug: string[] } };

export default function DocsCatchAll({ params }: Props) {
  return (
    <div>
      <h2>Docs catch‑all</h2>
      <pre>{JSON.stringify(params.slug, null, 2)}</pre>
    </div>
  );
}
