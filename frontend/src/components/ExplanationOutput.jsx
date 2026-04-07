function ExplanationOutput({ explanation }) {
  if (!explanation) return null;
  return (
    <div className="mt-6 w-full max-w-3xl bg-gray-800 border border-gray-700 p-4 rounded-md">
      <h2 className="text-xl font-semibold mb-2 text-green-400">🧠 Explanation</h2>
      <p className="whitespace-pre-wrap">{explanation}</p>
    </div>
  );
}

export default ExplanationOutput;
