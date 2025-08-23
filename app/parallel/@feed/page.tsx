// type FeedItem = {
//   id: number;
//   author: string;
//   content: string;
// };

// const feedItems: FeedItem[] = [
//   { id: 1, author: "Alice", content: "Just launched my new portfolio site 🚀" },
//   { id: 2, author: "Bob", content: "Next.js 15 App Router makes routing fun!" },
//   { id: 3, author: "Charlie", content: "Going hiking this weekend 🏔️" },
// ];

// export default function FeedSlot() {
//   return (
//     <ul style={{ listStyle: "none", padding: 0 }}>
//       {feedItems.map((item) => (
//         <li
//           key={item.id}
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: 8,
//             padding: 12,
//             marginBottom: 8,
//           }}
//         >
//           <strong>{item.author}</strong>
//           <p>{item.content}</p>
//         </li>
//       ))}
//     </ul>
//   );
// }

type FeedItem = {
  id: number;
  author: string;
  content: string;
};

async function getFeed(): Promise<FeedItem[]> {
  const res = await fetch("http://localhost:3000/api/feed", {
    cache: "no-store", // always fresh
  });
  return res.json();
}

export default async function FeedSlot() {
  const feedItems = await getFeed();

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {feedItems.map((item) => (
        <li
          key={item.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 12,
            marginBottom: 8,
          }}
        >
          <strong>{item.author}</strong>
          <p>{item.content}</p>
        </li>
      ))}
    </ul>
  );
}
