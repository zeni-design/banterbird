const username = "admin";

function renderPost(post, isNew = false) {
  const template = document
    .getElementById("post-template")
    .content.cloneNode(true);
  template.querySelector(".username").innerText = post.username;
  template.querySelector(".message").innerText = post.message;
  if (isNew) {
    document.getElementById("feed").prepend(template);
  } else {
    document.getElementById("feed").appendChild(template);
  }
}

async function submitPost() {
  const message = document.getElementById("postInput").value;
  try {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        message: message,
      }),
    });
    if (response.ok) {
      renderPost({ username: username, message: message }, true);
      document.getElementById("postInput").value = ""; // Clear the input field for your tweet storm!
    }
  } catch (error) {
    console.error("Error submitting post:", error);
  }
}

window.onload = async () => {
  try {
    const response = await fetch("/api/posts");
    const posts = await response.json();
    posts.forEach((post) => renderPost(post));
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('modeToggle');
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.classList.add(savedTheme);
  toggle.checked = savedTheme === 'dark';

  toggle.addEventListener('change', () => {
      const newTheme = toggle.checked ? 'dark' : 'light';
      body.classList.remove('light', 'dark');
      body.classList.add(newTheme);
      localStorage.setItem('theme', newTheme);
  });
});
