import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./tailwind-forced.css";
import CodeInput from "./components/CodeInput";
import ExplanationOutput from "./components/ExplanationOutput";

function App() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExplain = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, error }),
      });
      const data = await res.json();
      setExplanation(data.explanation);
    } catch {
      setExplanation("⚠️ Could not connect to server.");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen bg-blue-500 text-white flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-white">💡 CodeMentor AI</h1>

      <CodeInput code={code} error={error} setCode={setCode} setError={setError} />

      <button
        onClick={handleExplain}
        disabled={loading}
        className="mt-4 bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded-lg font-semibold"
      >
        {loading ? "Explaining..." : "Explain Error"}
      </button>

      <ExplanationOutput explanation={explanation} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

