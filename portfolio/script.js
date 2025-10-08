// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTopBtn")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.classList.add("visible")
  } else {
    scrollTopBtn.classList.remove("visible")
  }
})

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

// Navbar background on scroll
const navbar = document.querySelector(".navbar-custom")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 50) {
    navbar.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.boxShadow = "none"
  }
})

// View project function
function viewProject(projectId) {
  console.log(`Visualizando projeto ${projectId}`)
  // Aqui você pode adicionar lógica para abrir um modal ou redirecionar
  alert(`Funcionalidade de visualização do projeto ${projectId} será implementada!`)
}

// Animação de entrada dos elementos quando aparecem na tela
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observar elementos que devem animar
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".project-item, .contact-item, .timeline-item")
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Adicionar efeito de hover nos cards de projeto
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Contador animado para as estatísticas
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = target + "+"
      clearInterval(timer)
    } else {
      element.textContent = Math.floor(start) + "+"
    }
  }, 16)
}

// Iniciar contadores quando a seção hero estiver visível
const heroObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = document.querySelectorAll(".stat-number")
        statNumbers.forEach((stat) => {
          const target = Number.parseInt(stat.textContent)
          animateCounter(stat, target)
        })
        heroObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const heroSection = document.querySelector(".hero-section")
if (heroSection) {
  heroObserver.observe(heroSection)
}

// Fechar navbar mobile ao clicar em um link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse")
    if (navbarCollapse.classList.contains("show")) {
      const bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navbarCollapse)
      bsCollapse.hide()
    }
  })
})

// Adicionar classe active ao link da navbar baseado na seção atual
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (navLink) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active")
        })
        navLink.classList.add("active")
      }
    }
  })
})
