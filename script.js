// Using localStorage to get string data
localStorage.setItem("myText", document.getElementById("editor").value);

const saved = localStorage.getItem("myText");
if (saved) {
	document.getElementById("editor").value = saved;
}

// Key-strokes
const field = document.getElementById("editor");

field.addEventListener("input", () => {
	localStorage.setItem("myText", field.value);
});

// Save button
document.getElementById("save_button").addEventListener("click", async () => {
  const text = localStorage.getItem("myText");

  if (!text) {
    alert("nothing to save.");
    return;
  }

  const file = new File([text], "my-text.txt", { type: "text/plain" });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch (e) {
      if (e.name === "AbortError") return;
    }
  }

  // Desktop fallback
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "my-text.txt";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});