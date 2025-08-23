type TrendingItem = {
  id: number;
  topic: string;
  mentions: number;
};

async function getTrending(): Promise<TrendingItem[]> {
  const res = await fetch("http://localhost:3000/api/trending", {
    cache: "no-store",
  });
  return res.json();
}

export default async function TrendingSlot() {
  const trendingItems = await getTrending();

  return (
    <ol>
      {trendingItems.map((trend) => (
        <li key={trend.id}>
          <strong>{trend.topic}</strong> — {trend.mentions} mentions
        </li>
      ))}
    </ol>
  );
}
