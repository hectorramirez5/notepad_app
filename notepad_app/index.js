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
document.getElementById("save_button").addEventListener("click", () => {
	const text = localStorage.getItem("myText");
		
	if (!text) {
		alert("nothing to save.");
		return;
	}

	const blob = new Blob([text], { type: "text/plain" });
	const url = URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href= url;
	a.download = "my-text.txt";
	document.body.appendChild(a);
	a.click();
});