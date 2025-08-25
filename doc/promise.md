
### Promise কি 
Promise হচ্ছে JavaScript এর একটি object যা asynchronous operation এর future result কে represent করে। এটা একটা container এর মতো যেটা বলে - "আমি এখনো কাজ শেষ করিনি, কিন্তু শেষ হলে তোমাকে জানাবো!"

### কিভাবে কাজ করে
 Promise এর 3টি state:

1. Pending - এখনো চলছে
2. Fulfilled (Resolved) - সফল হয়েছে
3. Rejected - ব্যর্থ হয়েছে



### async/await দিয়ে কিভাবে Promise ব্যবহার হয়?
🔹 async/await কী?

async → function এর আগে লিখলে সেই function সবসময় একটি Promise return করবে।

await → Promise resolve (বা reject) হওয়া পর্যন্ত অপেক্ষা করবে।

👉 এর মানে হলো, asynchronous কোডকে synchronous (লাইন বাই লাইন) এর মত করে লেখা যায়।

1. Example 3 (API Call with async/await)

```javascript 
async function loadUsers() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    console.log("Users:", data);
  } catch (error) {
    console.error("API Error:", error);
  }
}

loadUsers();
--------------
const fetchPromise = fetch("https://jsonplaceholder.typicode.com/users");
console.log(fetchPromise); // Promise { <pending> }

// Network request time লাগে, তাই Promise দিয়ে handle করা হয়
fetchPromise
  .then(response => response.json())
  .then(data => console.log(data))
```


### Promise vs async/await
🔹 মূল পার্থক্য (Promise vs async/await)

Promise (.then/.catch):
```javascript
myPromise
  .then(result => {
    console.log("Success:", result);  // resolve হলে
  })
  .catch(error => {
    console.log("Error:", error);    // reject হলে
  })
  .finally(() => {
    console.log("সব সময়ই চলবে (success বা error যাই হোক)"); 
  });

```
async/await (clean syntax):
```javascript
try {
  const res = await getData();
  console.log(res);
} catch (err) {
  console.error(err);
}finally {
    console.log("শেষে সবসময় চলবে");
  }

```