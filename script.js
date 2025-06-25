// Performance and Loading Optimization
;(() => {
  // Immediate scroll to top
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  // Prevent scroll restoration
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual"
  }

  // Remove hash from URL
  if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname)
  }
})()

// Loading Screen Management
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen")
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = "0"
      setTimeout(() => {
        loadingScreen.style.display = "none"
      }, 500)
    }, 1000) // Show loading for 1 second minimum
  }
})

// Slider functionality
let currentSlideIndex = 0
let slideInterval

function initializeSlider() {
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".dot")

  if (slides.length === 0) return

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    if (slides[index] && dots[index]) {
      slides[index].classList.add("active")
      dots[index].classList.add("active")
    }
  }

  function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % slides.length
    showSlide(currentSlideIndex)
  }

  // Auto slide
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000)
  }

  function stopAutoSlide() {
    if (slideInterval) {
      clearInterval(slideInterval)
    }
  }

  // Initialize
  showSlide(0)
  startAutoSlide()

  // Pause on hover
  const heroSlider = document.querySelector(".hero-slider")
  if (heroSlider) {
    heroSlider.addEventListener("mouseenter", stopAutoSlide)
    heroSlider.addEventListener("mouseleave", startAutoSlide)
  }

  // Global functions for navigation
  window.changeSlide = (direction) => {
    stopAutoSlide()
    currentSlideIndex += direction
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1
    showSlide(currentSlideIndex)
    startAutoSlide()
  }

  window.currentSlide = (index) => {
    stopAutoSlide()
    currentSlideIndex = index - 1
    showSlide(currentSlideIndex)
    startAutoSlide()
  }
}

// Services Slider
let currentServiceIndex = 0

function initializeServices() {
  const serviceCards = document.querySelectorAll(".service-card")
  const servicesSlider = document.querySelector(".services-slider")

  if (serviceCards.length === 0) return

  function showService(index) {
    const cardWidth = 330 // 300px width + 30px margin
    const offset = -index * cardWidth
    if (servicesSlider) {
      servicesSlider.style.transform = `translateX(${offset}px)`
    }
  }

  window.changeService = (direction) => {
    currentServiceIndex += direction
    if (currentServiceIndex >= serviceCards.length) currentServiceIndex = 0
    if (currentServiceIndex < 0) currentServiceIndex = serviceCards.length - 1
    showService(currentServiceIndex)
  }

  // Auto slide services
  setInterval(() => {
    window.changeService(1)
  }, 4000)
}

// Mobile Menu Toggle
function toggleMobileMenu() {
  const navMenu = document.querySelector(".nav-menu")
  const hamburger = document.querySelector(".hamburger")

  if (navMenu && hamburger) {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  }
}

// Close mobile menu when clicking on links
function initializeMobileMenu() {
  const navLinks = document.querySelectorAll(".nav-menu a")
  const navMenu = document.querySelector(".nav-menu")
  const hamburger = document.querySelector(".hamburger")

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu) navMenu.classList.remove("active")
      if (hamburger) hamburger.classList.remove("active")
    })
  })
}

// Modal Functions
function openQuoteModal() {
  const modal = document.getElementById("quoteModal")
  if (modal) {
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
  }
}

function closeQuoteModal() {
  const modal = document.getElementById("quoteModal")
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }
}

function openImageModal(imageSrc) {
  const modal = document.getElementById("imageModal")
  const modalImg = document.getElementById("modalImage")
  if (modal && modalImg) {
    modal.style.display = "block"
    modalImg.src = imageSrc
    document.body.style.overflow = "hidden"
  }
}

function closeImageModal() {
  const modal = document.getElementById("imageModal")
  if (modal) {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  }
}

// Form Submission
function submitQuoteForm(event) {
  event.preventDefault()

  // Get form data
  const formData = new FormData(event.target)
  const data = Object.fromEntries(formData)

  // Simulate form submission
  alert("Thank you for your quote request! We will contact you soon.")

  // Reset form and close modal
  event.target.reset()
  closeQuoteModal()
}

// Smooth Scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId)
  if (section) {
    const offsetTop = section.offsetTop - 80 // Account for navbar
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Initialize smooth scrolling for navigation links
function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      scrollToSection(targetId)
    })
  })
}

// Navbar Scroll Effect
function initializeNavbarEffect() {
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.95)"
        navbar.style.backdropFilter = "blur(10px)"
      } else {
        navbar.style.background = "white"
        navbar.style.backdropFilter = "none"
      }
    }
  })
}

// Intersection Observer for Animations
function initializeAnimations() {
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

  // Observe elements for animation
  document.querySelectorAll(".about-text, .service-card, .gallery-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

// Lazy Loading for Images
function initializeLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.classList.remove("lazy")
            img.classList.add("loaded")
            imageObserver.unobserve(img)
          }
        }
      })
    })

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img)
    })
  }
}

// Modal Event Listeners
function initializeModalEvents() {
  // Close modals when clicking outside
  window.addEventListener("click", (event) => {
    const quoteModal = document.getElementById("quoteModal")
    const imageModal = document.getElementById("imageModal")

    if (event.target === quoteModal) {
      closeQuoteModal()
    }
    if (event.target === imageModal) {
      closeImageModal()
    }
  })

  // Close modals with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeQuoteModal()
      closeImageModal()
    }
  })
}

// Performance Optimization
function optimizePerformance() {
  // Preload critical images
  const criticalImages = ["assets/logo.jpg", "/placeholder.svg?height=600&width=1200"]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })

  // Debounce scroll events
  let scrollTimeout
  const originalScrollHandler = window.onscroll

  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout)
    }
    scrollTimeout = setTimeout(() => {
      if (originalScrollHandler) {
        originalScrollHandler()
      }
    }, 10)
  })
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Force scroll to top
  window.scrollTo(0, 0)

  // Initialize all components
  initializeSlider()
  initializeServices()
  initializeMobileMenu()
  initializeSmoothScrolling()
  initializeNavbarEffect()
  initializeAnimations()
  initializeLazyLoading()
  initializeModalEvents()
  optimizePerformance()

  // Make functions globally available
  window.toggleMobileMenu = toggleMobileMenu
  window.openQuoteModal = openQuoteModal
  window.closeQuoteModal = closeQuoteModal
  window.openImageModal = openImageModal
  window.closeImageModal = closeImageModal
  window.submitQuoteForm = submitQuoteForm
  window.scrollToSection = scrollToSection
})

// Additional scroll prevention
window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0)
})

// Final scroll enforcement
setTimeout(() => {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}, 100)
