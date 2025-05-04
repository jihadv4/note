// Update the validateLinkBtn event listener to properly validate Google Drive links
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
  linkStatus.innerHTML = '<div class="loading-message"><i class="fas fa-spinner fa-spin"></i> Validating link...</div>'

  // In a real implementation, you would check if the link is accessible
  // For this demo, we'll simulate a successful validation after a delay
  setTimeout(() => {
    linkStatus.innerHTML =
      '<div class="success-message"><i class="fas fa-check-circle"></i> Link validated successfully!</div>'
  }, 1500)
})

// Update the convertToEmbedLink function to properly handle Google Drive links
function convertToEmbedLink(link) {
  // Handle different formats of Google Drive links
  if (link.includes("/view")) {
    return link.replace("/view", "/preview")
  } else if (link.includes("/edit")) {
    return link.replace("/edit", "/preview")
  } else if (link.includes("open?id=")) {
    const fileId = link.split("open?id=")[1].split("&")[0]
    return `https://drive.google.com/file/d/${fileId}/preview`
  } else {
    // Extract the file ID from the drive link
    const regex = /\/d\/([a-zA-Z0-9_-]+)/
    const match = link.match(regex)

    if (match && match[1]) {
      const fileId = match[1]
      return `https://drive.google.com/file/d/${fileId}/preview`
    }
  }

  return link // Return original if conversion fails
}
