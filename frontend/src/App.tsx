import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function callAgent() {
    const res = await fetch("http://localhost:3000/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: input }),
    });

    const data = await res.json();
    setResponse(data.output);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{fontSize: '40px'}}>Hi'm Roxi - I add numbers </h2>

      <div  style={{ display: 'flex', gap: '15px' }}>
      <input
        style={{ width: "300px", padding: 10 }}
        placeholder="A"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        style={{ width: "300px", padding: 10 }}
        placeholder="B"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      </div>

      <button onClick={callAgent} style={{ marginTop: 30, padding: '10px 20px', fontSize: '16px', backgroundColor: 'skyblue' }}>
        ADD
      </button>

      <p style={{ marginTop: 30, fontSize: '28px' }}>Result: {response}</p>
    </div>
  );
}

export default App;
