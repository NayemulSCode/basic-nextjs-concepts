'use client'
import React, { useEffect, useState } from 'react'

const Counter = () => {
  console.log("Counter rendered");
  const [count, setCount] = useState(0);
  async function getPromiseValue() {
    return new Promise((resolve, reject) => {
    //   setTimeout(() => resolve("Hello"), 1000);
      setTimeout(() => reject(new Error("কিছু সমস্যা হয়েছে")), 1000);
    }); // 1 সেকেন্ড পর পাওয়া যাবে
  }
  console.log(getPromiseValue()); // Promise { <pending> }
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await getPromiseValue();
        console.log("✅ Resolved:", value); // Success handling
      } catch (err) {
        console.error("❌ Rejected:", err); // Error handling
      }
    };

    fetchData();
  }, []); // Empty dependency array = run once on mount
  return (
    <div>
      Counter: {count}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter