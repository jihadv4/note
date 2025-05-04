// Add these global variables at the top of the file
let courses = [
  { id: "MATH101", name: "Calculus I", year: "1st", semester: "1st" },
  { id: "MATH102", name: "Linear Algebra", year: "1st", semester: "1st" },
  { id: "PHYS101", name: "Physics I", year: "1st", semester: "1st" },
  { id: "MATH201", name: "Calculus II", year: "1st", semester: "2nd" },
  { id: "MATH202", name: "Differential Equations", year: "1st", semester: "2nd" },
  { id: "PHYS102", name: "Physics II", year: "1st", semester: "2nd" },
  { id: "MATH301", name: "Advanced Calculus", year: "2nd", semester: "1st" },
  { id: "MATH302", name: "Numerical Analysis", year: "2nd", semester: "1st" },
  { id: "STAT201", name: "Probability", year: "2nd", semester: "1st" },
  { id: "MATH401", name: "Complex Analysis", year: "2nd", semester: "2nd" },
  { id: "MATH402", name: "Partial Differential Equations", year: "2nd", semester: "2nd" },
  { id: "STAT202", name: "Statistical Inference", year: "2nd", semester: "2nd" },
  { id: "MATH501", name: "Real Analysis", year: "3rd", semester: "1st" },
  { id: "MATH502", name: "Topology", year: "3rd", semester: "1st" },
  { id: "MATH601", name: "Functional Analysis", year: "3rd", semester: "2nd" },
  { id: "MATH602", name: "Optimization", year: "3rd", semester: "2nd" },
  { id: "MATH701", name: "Thesis Research", year: "4th", semester: "1st" },
  { id: "MATH702", name: "Advanced Topics", year: "4th", semester: "2nd" },
]
// Global variables
let currentUser = null
let notes = []
const activeFilters = {
  year: "",
  semester: "",
  course: "",
}

// Check if user is logged in
function checkAuth() {
  const user = localStorage.getItem("currentUser")
  if (!user) {
    // If not on login page, redirect to login
    if (!window.location.href.includes("index.html") && !window.location.href.endsWith("/")) {
      window.location.href = "index.html"
    }
    return false
  }

  currentUser = JSON.parse(user)

  // If on login page but already logged in, redirect to dashboard
  if (window.location.href.includes("index.html") || window.location.href.endsWith("/")) {
    window.location.href = "dashboard.html"
    return false
  }

  // Update UI with user info
  updateUserInfo()

  // Show/hide admin features
  if (currentUser.role === "admin") {
    const adminPanel = document.getElementById("admin-panel")
    if (adminPanel) adminPanel.style.display = "block"
  }

  return true
}

// Update user info in header
function updateUserInfo() {
  const userNameElement = document.getElementById("user-name")
  const userRoleElement = document.getElementById("user-role")

  if (userNameElement) userNameElement.textContent = currentUser.username
  if (userRoleElement) {
    userRoleElement.textContent = currentUser.role
    userRoleElement.className = "badge " + (currentUser.role === "admin" ? "admin-badge" : "user-badge")
  }
}

// Load notes from localStorage
function loadNotes() {
  const storedNotes = localStorage.getItem("notes")
  if (storedNotes) {
    notes = JSON.parse(storedNotes)
  } else {
    // Initialize with sample notes if none exist
    notes = [
      {
        id: 1,
        title: "Calculus I Introduction",
        year: "1st",
        semester: "1st",
        course: "Math 101",
        driveLink: "https://drive.google.com/file/d/1BaUZdQnJF9atXuBFYpnZbM2Rn1UDCiVK/view",
        embedLink: "https://drive.google.com/file/d/1BaUZdQnJF9atXuBFYpnZbM2Rn1UDCiVK/preview",
        uploader: "john123",
        uploaderName: "John Smith",
        uploadDate: "2023-09-15",
      },
      {
        id: 2,
        title: "Introduction to Programming",
        year: "1st",
        semester: "1st",
        course: "CS 101",
        driveLink: "https://drive.google.com/file/d/1C8UzW4mKRs1yCO-2YpuN67U0Fyfp3GRs/view",
        embedLink: "https://drive.google.com/file/d/1C8UzW4mKRs1yCO-2YpuN67U0Fyfp3GRs/preview",
        uploader: "sara_admin",
        uploaderName: "Sara Admin",
        uploadDate: "2023-09-10",
      },
      {
        id: 3,
        title: "Physics Mechanics",
        year: "1st",
        semester: "2nd",
        course: "Physics 101",
        driveLink: "https://drive.google.com/file/d/1DfGbRT4iXyY8Vw3HYU5Sjpn2JaYwC9pL/view",
        embedLink: "https://drive.google.com/file/d/1DfGbRT4iXyY8Vw3HYU5Sjpn2JaYwC9pL/preview",
        uploader: "john123",
        uploaderName: "John Smith",
        uploadDate: "2023-10-05",
      },
    ]
    saveNotes()
  }
}

// Save notes to localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes))
}

// Add this function to update course options based on year and semester
function updateCourseOptions(yearValue, semesterValue, courseSelectId) {
  const courseSelect = document.getElementById(courseSelectId)
  const loadingIndicator = document.getElementById("course-loading")

  if (!courseSelect) return

  // Show loading indicator
  if (loadingIndicator) loadingIndicator.style.display = "block"

  // Clear current options except the first one
  while (courseSelect.options.length > 1) {
    courseSelect.remove(1)
  }

  // Filter courses based on year and semester
  let filteredCourses = courses

  if (yearValue) {
    filteredCourses = filteredCourses.filter((course) => course.year === yearValue)
  }

  if (semesterValue) {
    filteredCourses = filteredCourses.filter((course) => course.semester === semesterValue)
  }

  // Simulate loading delay for visual effect
  setTimeout(() => {
    // Add filtered courses to select
    filteredCourses.forEach((course) => {
      const option = document.createElement("option")
      option.value = `${course.id} - ${course.name}`
      option.textContent = `${course.id} - ${course.name}`
      courseSelect.appendChild(option)
    })

    // Hide loading indicator
    if (loadingIndicator) loadingIndicator.style.display = "none"

    // Add animation to the select element
    courseSelect.classList.add("updated")
    setTimeout(() => courseSelect.classList.remove("updated"), 1000)
  }, 500)
}

// Add this function to render notes with animation
function renderNotes(filteredNotes = null) {
  const notesContainer = document.getElementById("notes-container")
  if (!notesContainer) return

  // Add a fade-out effect before clearing
  notesContainer.classList.add("fade-out")

  setTimeout(() => {
    notesContainer.innerHTML = ""
    notesContainer.classList.remove("fade-out")

    const notesToRender = filteredNotes || notes

    if (notesToRender.length === 0) {
      notesContainer.innerHTML =
        '<div class="no-notes"><i class="fas fa-search"></i><p>No notes found. Try adjusting your filters or upload a new note.</p></div>'
      return
    }

    notesToRender.forEach((note, index) => {
      const noteCard = document.createElement("div")
      noteCard.className = "note-card"
      noteCard.style.animationDelay = `${index * 0.1}s`
      noteCard.innerHTML = `
        <div class="note-card-header">
          <h3>${note.title}</h3>
        </div>
        <div class="note-card-body">
          <div class="note-meta">
            <span><i class="fas fa-calendar-alt"></i> <strong>Year:</strong> ${note.year}</span>
            <span><i class="fas fa-calendar-day"></i> <strong>Semester:</strong> ${note.semester}</span>
            <span><i class="fas fa-book"></i> <strong>Course:</strong> ${note.course}</span>
          </div>
          <div class="note-meta">
            <span><i class="fas fa-user"></i> <strong>Uploaded by:</strong> ${note.uploaderName || note.uploader}</span>
            <span><i class="fas fa-clock"></i> <strong>Date:</strong> ${note.uploadDate}</span>
          </div>
        </div>
        <div class="note-card-footer">
          <button class="btn btn-primary view-note" data-id="${note.id}">
            <i class="fas fa-eye"></i> View Note
          </button>
          ${
            currentUser.role === "admin" || currentUser.username === note.uploader
              ? `<div class="note-actions">
              <button class="btn btn-outline edit-note" data-id="${note.id}">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-danger delete-note" data-id="${note.id}">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>`
              : ""
          }
        </div>
      `
      notesContainer.appendChild(noteCard)
    })

    // Add event listeners to buttons
    document.querySelectorAll(".view-note").forEach((button) => {
      button.addEventListener("click", function () {
        const noteId = Number.parseInt(this.getAttribute("data-id"))
        openNoteViewer(noteId)

        // Add click animation
        this.classList.add("clicked")
        setTimeout(() => this.classList.remove("clicked"), 300)
      })
    })

    document.querySelectorAll(".edit-note").forEach((button) => {
      button.addEventListener("click", function () {
        const noteId = Number.parseInt(this.getAttribute("data-id"))
        editNote(noteId)

        // Add click animation
        this.classList.add("clicked")
        setTimeout(() => this.classList.remove("clicked"), 300)
      })
    })

    document.querySelectorAll(".delete-note").forEach((button) => {
      button.addEventListener("click", function () {
        const noteId = Number.parseInt(this.getAttribute("data-id"))
        confirmDeleteNote(noteId)

        // Add click animation
        this.classList.add("clicked")
        setTimeout(() => this.classList.remove("clicked"), 300)
      })
    })
  }, 300)
}

// Open note viewer modal
function openNoteViewer(noteId) {
  const note = notes.find((n) => n.id === noteId)
  if (!note) return

  const modal = document.getElementById("note-viewer-modal")
  const modalTitle = document.getElementById("modal-note-title")
  const noteDetails = document.getElementById("note-details")
  const noteIframe = document.getElementById("note-iframe")

  modalTitle.textContent = note.title
  noteDetails.innerHTML = `
    <p><i class="fas fa-calendar-alt"></i> <strong>Year:</strong> ${note.year}</p>
    <p><i class="fas fa-calendar-day"></i> <strong>Semester:</strong> ${note.semester}</p>
    <p><i class="fas fa-book"></i> <strong>Course:</strong> ${note.course}</p>
    <p><i class="fas fa-user"></i> <strong>Uploaded by:</strong> ${note.uploaderName || note.uploader}</p>
    <p><i class="fas fa-clock"></i> <strong>Upload Date:</strong> ${note.uploadDate}</p>
  `

  noteIframe.src = note.embedLink
  modal.style.display = "block"
}

// Edit note
function editNote(noteId) {
  const note = notes.find((n) => n.id === noteId)
  if (!note) return

  // Check if user has permission to edit this note
  if (currentUser.role !== "admin" && currentUser.username !== note.uploader) {
    showErrorMessage("You do not have permission to edit this note.")
    return
  }

  // Store the note to edit in localStorage and redirect to upload page
  localStorage.setItem("editNote", JSON.stringify(note))
  window.location.href = "upload.html"
}

// Confirm delete note
function confirmDeleteNote(noteId) {
  const note = notes.find((n) => n.id === noteId)
  if (!note) return

  // Check if user has permission to delete this note
  if (currentUser.role !== "admin" && currentUser.username !== note.uploader) {
    showErrorMessage("You do not have permission to delete this note.")
    return
  }

  const deleteModal = document.getElementById("delete-modal")
  const confirmDeleteBtn = document.getElementById("confirm-delete")

  // Set up the confirm delete button
  confirmDeleteBtn.onclick = () => {
    deleteNote(noteId)
    deleteModal.style.display = "none"
  }

  deleteModal.style.display = "block"
}

// Delete note
function deleteNote(noteId) {
  notes = notes.filter((note) => note.id !== noteId)
  saveNotes()
  renderNotes()
  showSuccessMessage("Note deleted successfully.")
}

// Update active filters display
function updateActiveFiltersDisplay() {
  const activeFiltersContainer = document.getElementById("active-filters")
  if (!activeFiltersContainer) return

  activeFiltersContainer.innerHTML = ""

  // Add filter tags for each active filter
  if (activeFilters.year) {
    const filterTag = document.createElement("div")
    filterTag.className = "filter-tag"
    filterTag.innerHTML = `
      <span><i class="fas fa-calendar-alt"></i> Year: ${activeFilters.year}</span>
      <i class="fas fa-times" data-filter="year"></i>
    `
    activeFiltersContainer.appendChild(filterTag)
  }

  if (activeFilters.semester) {
    const filterTag = document.createElement("div")
    filterTag.className = "filter-tag"
    filterTag.innerHTML = `
      <span><i class="fas fa-calendar-day"></i> Semester: ${activeFilters.semester}</span>
      <i class="fas fa-times" data-filter="semester"></i>
    `
    activeFiltersContainer.appendChild(filterTag)
  }

  if (activeFilters.course) {
    const filterTag = document.createElement("div")
    filterTag.className = "filter-tag"
    filterTag.innerHTML = `
      <span><i class="fas fa-book"></i> Course: ${activeFilters.course}</span>
      <i class="fas fa-times" data-filter="course"></i>
    `
    activeFiltersContainer.appendChild(filterTag)
  }

  // Add event listeners to remove filter tags
  document.querySelectorAll(".filter-tag i").forEach((icon) => {
    icon.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")
      activeFilters[filter] = ""

      // Update the filter dropdown
      const filterElement = document.getElementById(`${filter}-filter`)
      if (filterElement) filterElement.value = ""

      // Apply filters
      filterNotes()

      // Update active filters display
      updateActiveFiltersDisplay()
    })
  })
}

// Filter notes
function filterNotes() {
  // Get filter values
  const yearFilter = document.getElementById("year-filter")
  const semesterFilter = document.getElementById("semester-filter")
  const courseFilter = document.getElementById("course-filter")

  // Update active filters
  activeFilters.year = yearFilter ? yearFilter.value : ""
  activeFilters.semester = semesterFilter ? semesterFilter.value : ""
  activeFilters.course = courseFilter ? courseFilter.value : ""

  // Update active filters display
  updateActiveFiltersDisplay()

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const yearMatch = activeFilters.year === "" || note.year === activeFilters.year
    const semesterMatch = activeFilters.semester === "" || note.semester === activeFilters.semester
    const courseMatch = activeFilters.course.toLowerCase().includes(activeFilters.course.toLowerCase())

    return yearMatch && semesterMatch && courseMatch
  })

  renderNotes(filteredNotes)
}

// Search notes
function searchNotes(query) {
  if (!query) {
    filterNotes() // Apply existing filters if search is cleared
    return
  }

  query = query.toLowerCase()

  // Apply search on top of existing filters
  let filteredNotes = notes

  // First apply active filters
  if (activeFilters.year || activeFilters.semester || activeFilters.course) {
    filteredNotes = notes.filter((note) => {
      const yearMatch = activeFilters.year === "" || note.year === activeFilters.year
      const semesterMatch = activeFilters.semester === "" || note.semester === activeFilters.semester
      const courseMatch =
        activeFilters.course === "" || note.course.toLowerCase().includes(activeFilters.course.toLowerCase())

      return yearMatch && semesterMatch && courseMatch
    })
  }

  // Then apply search query
  const searchResults = filteredNotes.filter((note) => {
    return (
      note.title.toLowerCase().includes(query) ||
      note.course.toLowerCase().includes(query) ||
      note.year.toLowerCase().includes(query) ||
      note.semester.toLowerCase().includes(query) ||
      (note.uploaderName && note.uploaderName.toLowerCase().includes(query))
    )
  })

  renderNotes(searchResults)
}

// Update the convertToEmbedLink function to properly handle Google Drive links
function convertToEmbedLink(driveLink) {
  // Handle different formats of Google Drive links
  if (driveLink.includes("/view")) {
    return driveLink.replace("/view", "/preview")
  } else if (driveLink.includes("/edit")) {
    return driveLink.replace("/edit", "/preview")
  } else if (driveLink.includes("open?id=")) {
    const fileId = driveLink.split("open?id=")[1].split("&")[0]
    return `https://drive.google.com/file/d/${fileId}/preview`
  } else {
    // Extract the file ID from the drive link
    const regex = /\/d\/([a-zA-Z0-9_-]+)/
    const match = driveLink.match(regex)

    if (match && match[1]) {
      const fileId = match[1]
      return `https://drive.google.com/file/d/${fileId}/preview`
    }
  }

  return driveLink // Return original if conversion fails
}

// Show error message
function showErrorMessage(message) {
  // Create a toast notification
  const toast = document.createElement("div")
  toast.className = "toast error"
  toast.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`
  document.body.appendChild(toast)

  // Show the toast
  setTimeout(() => {
    toast.classList.add("show")
  }, 100)

  // Hide the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 3000)
}

// Show success message
function showSuccessMessage(message) {
  // Create a toast notification
  const toast = document.createElement("div")
  toast.className = "toast success"
  toast.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`
  document.body.appendChild(toast)

  // Show the toast
  setTimeout(() => {
    toast.classList.add("show")
  }, 100)

  // Hide the toast after 3 seconds
  setTimeout(() => {
    toast.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(toast)
    }, 300)
  }, 3000)
}

// Export notes to CSV
function exportNotesToCSV() {
  let csvContent = "data:text/csv;charset=utf-8,"

  // Add headers
  csvContent += "ID,Title,Year,Semester,Course,Drive Link,Uploader,Uploader Name,Upload Date\n"

  // Add data rows
  notes.forEach((note) => {
    csvContent += `${note.id},"${note.title}",${note.year},${note.semester},"${note.course}",${note.driveLink},${note.uploader},"${note.uploaderName || ""}",${note.uploadDate}\n`
  })

  // Create download link
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement("a")
  link.setAttribute("href", encodedUri)
  link.setAttribute("download", "notes_export.csv")
  document.body.appendChild(link)

  // Trigger download
  link.click()
  document.body.removeChild(link)

  showSuccessMessage("Notes exported successfully.")
}

// Modify the initDashboard function to add event listeners for year and semester filters
function initDashboard() {
  if (!checkAuth()) return

  // Load notes and render them
  loadNotes()
  renderNotes()

  // Update active filters display
  updateActiveFiltersDisplay()

  // Set up event listeners
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser")
      window.location.href = "index.html"
    })
  }

  const yearFilter = document.getElementById("year-filter")
  const semesterFilter = document.getElementById("semester-filter")

  // Add event listeners for year and semester filters to update course options
  if (yearFilter) {
    yearFilter.addEventListener("change", function () {
      updateCourseOptions(this.value, semesterFilter ? semesterFilter.value : "", "course-filter")
    })
  }

  if (semesterFilter) {
    semesterFilter.addEventListener("change", function () {
      updateCourseOptions(yearFilter ? yearFilter.value : "", this.value, "course-filter")
    })
  }

  const applyFiltersBtn = document.getElementById("apply-filters")
  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", filterNotes)

    // Add click animation
    applyFiltersBtn.addEventListener("click", function () {
      this.classList.add("clicked")
      setTimeout(() => this.classList.remove("clicked"), 300)
    })
  }

  const clearFiltersBtn = document.getElementById("clear-filters")
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      document.getElementById("year-filter").value = ""
      document.getElementById("semester-filter").value = ""
      document.getElementById("course-filter").value = ""

      // Reset active filters
      activeFilters.year = ""
      activeFilters.semester = ""
      activeFilters.course = ""

      // Apply filters
      filterNotes()

      // Update active filters display
      updateActiveFiltersDisplay()

      // Update course options
      updateCourseOptions("", "", "course-filter")

      // Add animation to the button
      clearFiltersBtn.classList.add("clicked")
      setTimeout(() => clearFiltersBtn.classList.remove("clicked"), 300)
    })
  }

  const searchInput = document.getElementById("search-notes")
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchNotes(this.value)
    })
  }

  const exportNotesBtn = document.getElementById("export-notes")
  if (exportNotesBtn) {
    exportNotesBtn.addEventListener("click", exportNotesToCSV)
  }

  // Close modals when clicking the X or outside the content
  document.querySelectorAll(".close-modal").forEach((closeBtn) => {
    closeBtn.addEventListener("click", function () {
      const modal = this.closest(".modal")
      if (modal) {
        modal.style.display = "none"
        if (modal.id === "note-viewer-modal") {
          document.getElementById("note-iframe").src = ""
        }
      }
    })
  })

  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      event.target.style.display = "none"
      if (event.target.id === "note-viewer-modal") {
        document.getElementById("note-iframe").src = ""
      }
    }
  })

  // Initialize course options
  updateCourseOptions("", "", "course-filter")
}

// Modify the initUpload function to add event listeners for year and semester
function initUpload() {
  if (!checkAuth()) return

  // Check if we're editing a note
  const editNoteData = localStorage.getItem("editNote")
  let editNote = null

  if (editNoteData) {
    editNote = JSON.parse(editNoteData)

    // Fill form with note data
    document.getElementById("note-title").value = editNote.title
    document.getElementById("note-year").value = editNote.year
    document.getElementById("note-semester").value = editNote.semester

    // We'll update the course dropdown after setting year and semester
    setTimeout(() => {
      const courseSelect = document.getElementById("note-course")
      if (courseSelect) {
        // Try to find the course in the dropdown
        for (let i = 0; i < courseSelect.options.length; i++) {
          if (courseSelect.options[i].value === editNote.course) {
            courseSelect.selectedIndex = i
            break
          }
        }

        // If not found, add it as a custom option
        if (courseSelect.value !== editNote.course) {
          const option = document.createElement("option")
          option.value = editNote.course
          option.textContent = editNote.course
          courseSelect.appendChild(option)
          courseSelect.value = editNote.course
        }
      }
    }, 600)

    document.getElementById("drive-link").value = editNote.driveLink

    // Change button text
    document.querySelector('button[type="submit"]').innerHTML = '<i class="fas fa-save"></i> Update Note'

    // Change page title
    document.querySelector("h2").innerHTML = '<i class="fas fa-edit"></i> Edit Note'
  }

  // Set up form submission
  const uploadForm = document.getElementById("upload-form")
  if (uploadForm) {
    uploadForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const noteTitle = document.getElementById("note-title").value
      const year = document.getElementById("note-year").value
      const semester = document.getElementById("note-semester").value
      const course = document.getElementById("note-course").value
      const driveLink = document.getElementById("drive-link").value

      // Validate Google Drive link
      if (!driveLink.includes("drive.google.com")) {
        showUploadMessage("Please enter a valid Google Drive link.", "error")
        return
      }

      // Show progress bar
      const progressBar = document.getElementById("progress-bar")
      const uploadProgress = document.getElementById("upload-progress")
      if (uploadProgress) uploadProgress.style.display = "block"

      // Simulate upload progress
      let progress = 0
      const progressInterval = setInterval(() => {
        progress += 10
        if (progressBar) progressBar.style.width = progress + "%"
        if (progress >= 100) {
          clearInterval(progressInterval)

          // Convert to embed link
          const embedLink = convertToEmbedLink(driveLink)

          // Get current date
          const today = new Date()
          const uploadDate = today.toISOString().split("T")[0]

          // Load notes first to ensure we have the latest data
          loadNotes()

          if (editNoteData) {
            // Update existing note
            const editNote = JSON.parse(editNoteData)

            // Check if user has permission to edit this note
            if (currentUser.role !== "admin" && currentUser.username !== editNote.uploader) {
              showUploadMessage("You do not have permission to edit this note.", "error")
              if (uploadProgress) uploadProgress.style.display = "none"
              return
            }

            const noteIndex = notes.findIndex((n) => n.id === editNote.id)
            if (noteIndex !== -1) {
              notes[noteIndex] = {
                ...editNote,
                title: noteTitle,
                year,
                semester,
                course,
                driveLink,
                embedLink,
                uploadDate,
              }
            }

            // Clear edit note data
            localStorage.removeItem("editNote")
            showUploadMessage("Note updated successfully!", "success")
          } else {
            // Create new note
            const newNote = {
              id: Date.now(), // Use timestamp as ID
              title: noteTitle,
              year,
              semester,
              course,
              driveLink,
              embedLink,
              uploader: currentUser.username,
              uploaderName: currentUser.username,
              uploadDate,
            }

            notes.push(newNote)
            showUploadMessage("Note uploaded successfully!", "success")
          }

          // Save notes
          saveNotes()

          // Reset form
          uploadForm.reset()
          if (uploadProgress) uploadProgress.style.display = "none"

          // Redirect after 2 seconds
          setTimeout(() => {
            window.location.href = "dashboard.html"
          }, 2000)
        }
      }, 200)
    })
  }

  // Set up year and semester change events to update course options
  const noteYear = document.getElementById("note-year")
  const noteSemester = document.getElementById("note-semester")

  if (noteYear) {
    noteYear.addEventListener("change", function () {
      updateCourseOptions(this.value, noteSemester ? noteSemester.value : "", "note-course")
    })
  }

  if (noteSemester) {
    noteSemester.addEventListener("change", function () {
      updateCourseOptions(noteYear ? noteYear.value : "", this.value, "note-course")
    })
  }

  // Set up validate link button
  const validateLinkBtn = document.getElementById("validate-link")
  const driveLink = document.getElementById("drive-link")
  const linkStatus = document.getElementById("link-status")

  if (validateLinkBtn && driveLink && linkStatus) {
    validateLinkBtn.addEventListener("click", () => {
      const link = driveLink.value.trim()

      if (!link) {
        linkStatus.innerHTML = '<div class="error-message">Please enter a Google Drive link.</div>'
        return
      }

      // Validate Google Drive link format
      const driveRegex = /^https:\/\/drive\.google\.com\/(file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/
      const match = link.match(driveRegex)

      if (!match) {
        linkStatus.innerHTML = '<div class="error-message">Invalid Google Drive link format.</div>'
        return
      }

      // Check if the link is accessible
      linkStatus.innerHTML =
        '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Validating link...</div>'

      // In a real implementation, you would check if the link is accessible
      // For this demo, we'll simulate a successful validation after a delay
      setTimeout(() => {
        linkStatus.innerHTML =
          '<div class="success-message"><i class="fas fa-check-circle"></i> Link validated successfully!</div>'
      }, 1500)
    })
  }

  // Set up logout button
  const logoutBtn = document.getElementById("logout-btn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser")
      window.location.href = "index.html"
    })
  }

  // Initialize course options
  updateCourseOptions("", "", "note-course")
}

// Show upload message
function showUploadMessage(message, type) {
  const messageElement = document.getElementById("upload-message")
  if (messageElement) {
    messageElement.textContent = message
    messageElement.className = `message ${type}`
    messageElement.style.display = "block"
  }
}

// Update the initLogin function to handle the CSV authentication properly
function initLogin() {
  // Check if already logged in
  if (localStorage.getItem("currentUser")) {
    window.location.href = "dashboard.html"
    return
  }

  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const username = document.getElementById("username").value
      const password = document.getElementById("password").value

      // Add loading animation to button
      const submitButton = loginForm.querySelector('button[type="submit"]')
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...'
      submitButton.disabled = true

      // Load users from CSV
      fetch("users.csv")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to load users.csv")
          }
          return response.text()
        })
        .then((csv) => {
          // Ensure Papa is declared before use
          if (typeof Papa !== "undefined") {
            Papa.parse(csv, {
              header: true,
              complete: (results) => {
                const users = results.data
                const user = users.find((u) => u.username === username && u.password === password)

                if (user) {
                  // Store user in localStorage
                  localStorage.setItem("currentUser", JSON.stringify(user))
                  window.location.href = "dashboard.html"
                } else {
                  // Show error message
                  const errorElement = document.getElementById("login-error")
                  errorElement.textContent = "Invalid username or password."
                  errorElement.style.display = "block"

                  // Reset button
                  submitButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login'
                  submitButton.disabled = false
                }
              },
              error: (error) => {
                console.error("Error parsing users CSV:", error)
                const errorElement = document.getElementById("login-error")
                errorElement.textContent = "Error loading user data. Please try again."
                errorElement.style.display = "block"

                // Reset button
                submitButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login'
                submitButton.disabled = false
              },
            })
          } else {
            console.error("PapaParse is not loaded.")
            showErrorMessage("PapaParse library is not loaded. Please refresh the page.")
          }
        })
        .catch((error) => {
          console.error("Error loading users:", error)
          const errorElement = document.getElementById("login-error")
          errorElement.textContent = "Error loading user data. Please try again."
          errorElement.style.display = "block"

          // Reset button
          submitButton.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login'
          submitButton.disabled = false
        })
    })
  }
}

// Replace the courses array with this function to load courses from CSV
function loadCoursesFromCSV() {
  fetch("courses.csv")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load courses CSV")
      }
      return response.text()
    })
    .then((csv) => {
      if (typeof Papa !== "undefined") {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            courses = results.data.filter((course) => course.id && course.name)

            // Initialize course dropdowns if on relevant pages
            if (window.location.href.includes("dashboard.html")) {
              updateCourseOptions(
                document.getElementById("year-filter")?.value || "",
                document.getElementById("semester-filter")?.value || "",
                "course-filter",
              )
            } else if (window.location.href.includes("upload.html")) {
              updateCourseOptions(
                document.getElementById("note-year")?.value || "",
                document.getElementById("note-semester")?.value || "",
                "note-course",
              )
            }
          },
          error: (error) => {
            console.error("Error parsing courses CSV:", error)
          },
        })
      } else {
        console.error("PapaParse is not loaded.")
      }
    })
    .catch((error) => {
      console.error("Error loading courses:", error)
    })
}

// Modify the document.addEventListener("DOMContentLoaded") function to load courses
document.addEventListener("DOMContentLoaded", () => {
  // Check if Papa is available
  if (typeof Papa === "undefined") {
    console.error("PapaParse library not loaded!")
    const errorElement = document.getElementById("login-error")
    if (errorElement) {
      errorElement.textContent = "Error: Required library not loaded. Please refresh the page."
      errorElement.style.display = "block"
    }
    return
  }

  // Load courses from CSV
  loadCoursesFromCSV()

  if (window.location.href.includes("dashboard.html")) {
    initDashboard()
  } else if (window.location.href.includes("upload.html")) {
    initUpload()
  } else {
    initLogin()
  }

  // Add CSS for animations
  const style = document.createElement("style")
  style.textContent = `
    .fade-out {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .updated {
      animation: highlight 1s ease;
    }
    
    @keyframes highlight {
      0%, 100% { background-color: transparent; }
      50% { background-color: rgba(67, 97, 238, 0.1); }
    }
    
    .clicked {
      transform: scale(0.95);
      transition: transform 0.2s ease;
    }
  `
  document.head.appendChild(style)
})

// Add this CSS to the top of the file
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style")
  style.textContent = `
    .fade-out {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .updated {
      animation: highlight 1s ease;
    }
    
    @keyframes highlight {
      0%, 100% { background-color: transparent; }
      50% { background-color: rgba(67, 97, 238, 0.1); }
    }
    
    .clicked {
      transform: scale(0.95);
      transition: transform 0.2s ease;
    }
  `
  document.head.appendChild(style)
})
