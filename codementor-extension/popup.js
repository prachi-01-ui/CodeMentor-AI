document.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("input");
  const result = document.getElementById("result");

  chrome.storage.local.get("selectedText", (data) => {
    if (data.selectedText) input.value = data.selectedText;
  });

  document.getElementById("explain").addEventListener("click", async () => {
    result.textContent = "⏳ Explaining...";
    const response = await fetch("http://127.0.0.1:8000/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: "", error: input.value }),
    });
    const data = await response.json();
    result.textContent = data.explanation;
  });
});
