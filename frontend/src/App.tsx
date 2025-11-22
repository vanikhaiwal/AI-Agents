import { useState } from 'react'
import './App.css'

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [response, setResponse] = useState("");

  async function callAgent() {
    const res = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `Add ${a} and ${b}`
      }),
    });

    const data = await res.json();
    setResponse(data.response);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ fontSize: '40px' }}>Hi I'm Roxi — I add numbers</h2>

      <div style={{ display: 'flex', gap: '15px' }}>
        <input
          style={{ width: "300px", padding: 10 }}
          placeholder="A"
          value={a}
          onChange={(e) => setA(e.target.value)}
        />
        <input
          style={{ width: "300px", padding: 10 }}
          placeholder="B"
          value={b}
          onChange={(e) => setB(e.target.value)}
        />
      </div>

      <button
        onClick={callAgent}
        style={{
          marginTop: 30,
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: 'skyblue'
        }}>
        ADD
      </button>

      <p style={{ marginTop: 30, fontSize: '28px' }}>Result: {response}</p>
    </div>
  );
}

export default App;
