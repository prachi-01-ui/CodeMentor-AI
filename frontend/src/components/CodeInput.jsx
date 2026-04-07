function CodeInput({ code, error, setCode, setError }) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-3xl">
      <textarea
        className="w-full h-40 bg-gray-800 text-white p-3 rounded-md border border-gray-700"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <textarea
        className="w-full h-24 bg-gray-800 text-white p-3 rounded-md border border-gray-700"
        placeholder="Paste your error message here..."
        value={error}
        onChange={(e) => setError(e.target.value)}
      />
    </div>
  );
}

export default CodeInput;
