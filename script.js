window.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const key = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const readableDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  document.querySelector(".date").textContent = readableDate;

  fetch('stoics.json')
    .then(response => response.json())
    .then(data => {
      const entry = data[key];
      if (entry) {
        document.querySelector(".title").textContent = entry.title;
        document.querySelector(".quote").innerHTML = `"${entry.quote}"<br><span>— ${entry.author}</span>`;

        const reflectionContainer = document.querySelector(".reflection");
        reflectionContainer.innerHTML = entry.reflection
          .split('\n')
          .map(line => `<p>${line.trim()}</p>`)
          .join('');
      } else {
        document.querySelector(".title").textContent = "No entry found for today.";
      }
    });
});