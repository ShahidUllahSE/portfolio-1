const API_BASE = "http://localhost:5000/api";

async function fetchJSON(endpoint) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

function formatLines(text) {
  return text.split("\n").join("<br>\n");
}

function renderHero(data) {
  const heading = document.getElementById("hero-heading");
  const description = document.getElementById("hero-description");
  const github = document.getElementById("hero-github");

  if (!heading || !description || !github) return;

  heading.innerHTML = `<span class="text-green-600 block sm:inline mb-2 sm:mb-0">${data.headlinePart1}</span> ${data.headlinePart2}`;
  description.textContent = data.description;
  github.href = data.githubUrl;
}

function renderAbout(data) {
  const heading = document.getElementById("about-heading");
  const description = document.getElementById("about-description");
  const cvLink = document.getElementById("about-cv");

  if (!heading || !description || !cvLink) return;

  heading.innerHTML = `${data.headingPart1} <span class="text-green-600 block sm:inline mt-2">${data.headingPart2}</span>`;
  description.textContent = data.description;
  cvLink.href = data.cvUrl;
  cvLink.download = data.cvFileName;
}

function renderExperience(items) {
  const grid = document.getElementById("experience-grid");
  if (!grid) return;

  grid.innerHTML = items
    .map(
      (item) => `
        <div class="border border-gray-800 hover:border-green-600 hover:bg-gray-900 transition-all duration-500 w-full rounded-lg text-center py-8 px-4 group shadow-sm hover:shadow-green-600/10 hover:-translate-y-1">
            <small class="font-bold text-gray-500 group-hover:text-gray-300">${item.period}</small>
            <h5 class="text-green-600 font-bold text-xl mt-3 mb-2">${item.title}</h5>
            <p class="text-sm text-gray-400">${formatLines(item.description)}</p>
        </div>`
    )
    .join("");
}

function renderSkills(items) {
  const grid = document.getElementById("skills-grid");
  if (!grid) return;

  const borderMap = {
    bottom: "border-b-gray-800",
    left: "border-l-gray-800",
    right: "border-r-gray-800",
    top: "border-t-gray-800",
  };

  grid.innerHTML = items
    .map(
      (item) => `
  <div class="flex flex-col items-center justify-center group">
    <div class="flex items-center justify-center text-3xl border-8 border-green-600 ${borderMap[item.borderSide]} rounded-full h-32 w-32 sm:h-40 sm:w-40 transition-transform duration-500 group-hover:scale-110">
      <span class="text-2xl sm:text-3xl font-bold">${item.percentage}<i class="text-sm not-italic">%</i></span>
    </div>
    <span class="mt-6 text-center font-bold text-sm sm:text-lg tracking-wide">${item.name}</span>
  </div>`
    )
    .join("");
}

function renderServices(items) {
  const grid = document.getElementById("services-grid");
  if (!grid) return;

  grid.innerHTML = items
    .map(
      (item) => `
  <div class="group w-full max-w-sm mx-auto border border-gray-800 hover:bg-green-600 transition-all duration-500 flex flex-col items-center p-8 rounded-lg shadow-lg hover:-translate-y-2">
    <img src="${item.icon}" class="h-16 sm:h-20 mb-6 transition-transform group-hover:scale-110" alt="">
    <h4 class="text-white font-bold text-xl sm:text-2xl text-center mb-4 leading-tight group-hover:text-white transition-colors">${item.title}</h4>
    <p class="text-gray-400 text-sm sm:text-base text-center group-hover:text-green-50 transition-colors">${item.description}</p>
  </div>`
    )
    .join("");
}

function renderProjects(items) {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = items
    .map(
      (item) => `
            <div class="overflow-hidden rounded-lg group aspect-[4/3]"><img class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" src="${item.image}" alt="${item.title}"></div>`
    )
    .join("");
}

function renderTestimonials(items) {
  const container = document.getElementById("testimonials-container");
  if (!container || !items.length) return;

  const item = items[0];

  container.innerHTML = `
                <div class="shrink-0 relative">
                    <img class="rounded-full w-24 h-24 sm:w-32 sm:h-32 object-cover border-4 border-green-600 shadow-xl" src="${item.avatar}" alt="Client" onerror="this.src='https://ui-avatars.com/api/?name=Jack+Metiyo&background=16a34a&color=fff'">
                </div>
                <div class="w-full text-center sm:text-left space-y-4">
                    <img class="mx-auto sm:mx-0 w-8 h-8 opacity-50" src="https://quomodosoft.com/html/glint/assets/img/icon/quote.png" alt="Quote">
                    <h4 class="font-semibold text-lg sm:text-xl text-gray-200 leading-relaxed italic">
                        "${item.quote}"
                    </h4>
                    <p class="font-bold text-green-500 uppercase tracking-widest text-sm pt-4">${item.name} <span class="text-gray-500 font-normal ml-2">| ${item.location}</span></p>
                </div>`;
}

async function submitContactForm(event) {
  event.preventDefault();

  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("contact-status");
  const submitBtn = document.getElementById("contact-submit");

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    statusEl.textContent = "Please fill in all fields.";
    statusEl.className = "text-sm text-center text-red-400";
    statusEl.classList.remove("hidden");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "SENDING...";
  statusEl.classList.add("hidden");

  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to send message");
    }

    statusEl.textContent = data.message || "Message sent successfully!";
    statusEl.className = "text-sm text-center text-green-500";
    statusEl.classList.remove("hidden");
    form.reset();
  } catch (error) {
    statusEl.textContent = error.message || "Something went wrong. Please try again.";
    statusEl.className = "text-sm text-center text-red-400";
    statusEl.classList.remove("hidden");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "SEND MESSAGE";
  }
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", submitContactForm);
  }
}

async function loadPortfolioData() {
  try {
    const [hero, about, experience, skills, services, projects, testimonials] =
      await Promise.all([
        fetchJSON("/hero"),
        fetchJSON("/about"),
        fetchJSON("/experience"),
        fetchJSON("/skills"),
        fetchJSON("/services"),
        fetchJSON("/projects"),
        fetchJSON("/testimonials"),
      ]);

    renderHero(hero);
    renderAbout(about);
    renderExperience(experience);
    renderSkills(skills);
    renderServices(services);
    renderProjects(projects);
    renderTestimonials(testimonials);
  } catch (error) {
    console.error("Failed to load portfolio data:", error.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPortfolioData();
  initContactForm();
});
