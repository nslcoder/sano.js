const container = document.getElementById("container");

setInterval(async () => {
  const response = await fetch("https://picsum.photos/1000");
  container.style.backgroundImage = `url(${response.url})`;
}, 5000);
