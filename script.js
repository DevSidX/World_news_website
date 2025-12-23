async function fetchData(query) {
  try {
    const res = await fetch(`/api/news?q=${encodeURIComponent(query)}`);

    if (!res.ok) {
      throw new Error("Network error");
    }

    const data = await res.json();

    if (!data.articles || data.articles.length === 0) {
      document.querySelector("main").innerHTML = "<p>No news found.</p>";
      return;
    }

    renderMain(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
    document.querySelector("main").innerHTML = "<p>Failed to load news.</p>";
  }
}


// Load default latest news
fetchData("latest");

// Function to render news articles
function renderMain(arr) {
    let mainHTML = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].image) {
            mainHTML += `
                <div class="card">
                    <a href="${arr[i].url}" target="_blank">
                        <img src="${arr[i].image}" alt="news image" />
                        <h4>${arr[i].title}</h4>
                        <div class="publishbyDate">
                            <p>${arr[i].source.name}</p>
                            <span>•</span>
                            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">${arr[i].description || "No description available."}</div>
                    </a>
                </div>
            `;
        }
    }

    document.querySelector("main").innerHTML = mainHTML || '<p>No news found.</p>';
}

// Event listeners for search
document.getElementById("searchForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchQuery = document.getElementById("searchInput").value;
    fetchData(searchQuery);
});

document.getElementById("searchFormMobile").addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchQuery = document.getElementById("searchInputMobile").value;
    fetchData(searchQuery);
});

// Navbar category search function
function Search(query) {
    fetchData(query);
}

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", function () {
        mobileMenu.classList.toggle("open"); // Toggle a new 'open' class
    });
});

///////////////////// Theme with Logo Change /////////////////
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const themeImage = document.getElementById("theme-image");

// Function to set the theme and update the logo
function setTheme(theme) {
    if (theme === "dark") {
        body.classList.add("dark-mode");
        themeToggle.checked = true;
        themeImage.src = "./world news-logo/default-monochrome-white.svg"; // Change to white logo in dark mode
    } else {
        body.classList.remove("dark-mode");
        themeToggle.checked = false;
        themeImage.src = "./world news-logo/default-monochrome-black.svg"; // Change to black logo in light mode
    }
    localStorage.setItem("theme", theme);
}

// Load saved theme from localStorage
const savedTheme = localStorage.getItem("theme") || "light";
setTheme(savedTheme);

// Toggle theme when the switch is clicked
themeToggle.addEventListener("change", () => {
    setTheme(themeToggle.checked ? "dark" : "light");
});


// Existing JavaScript code...

// Add this at the end
// Back to Top Button
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
});

backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
