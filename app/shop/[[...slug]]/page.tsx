type Props = { params: { slug?: string[] } };

export default function ShopOptionalCatchAll({ params }: Props) {
  return (
    <div>
      <h2>Shop optional catch‑all</h2>
      <p>Segments (if any):</p>
      <pre>{JSON.stringify(params.slug ?? [], null, 2)}</pre>
    </div>
  );
}
