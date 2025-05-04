# Note Sharing Website

A simple web-based academic note-sharing platform built with HTML, CSS, and JavaScript.

## Features

- Login system using credentials stored in a CSV file
- Upload academic notes using Google Drive links
- View notes embedded directly on the website (no downloads)
- Filter and search notes by year, semester, and course
- Admin-level control for managing notes and users

## Setup Instructions

1. Clone or download this repository
2. Open the `index.html` file in your web browser
3. Login using one of the following credentials:
   - Regular User: `john123` / `pass123`
   - Admin: `sara_admin` / `admin456`

## Usage

### For Regular Users

1. Login with your credentials
2. Browse notes using the filters on the left sidebar
3. Search for specific notes using the search bar
4. View notes by clicking the "View Note" button
5. Upload your own notes by clicking the "Upload New Note" button

### For Admins

1. Login with admin credentials
2. Access all regular user features
3. Delete or edit any uploaded note
4. Export all note data to CSV format

## File Structure

- `index.html` - Login page
- `dashboard.html` - Main note portal
- `upload.html` - Upload new note form
- `style.css` - Styling for all pages
- `script.js` - Core application logic
- `users.csv` - User login information

## Note Format

Each note contains:
- Title
- Year (1st, 2nd, 3rd, 4th)
- Semester (1st, 2nd)
- Course (e.g., "Math 101")
- Google Drive embed link
- Uploader information
- Upload date

## Google Drive Link Conversion

When users paste a shareable Google Drive link like:
\`\`\`
https://drive.google.com/file/d/1a2b3c4d5e6f7/view?usp=sharing
\`\`\`

It's automatically converted to:
\`\`\`
https://drive.google.com/file/d/1a2b3c4d5e6f7/preview
\`\`\`

This allows the note to be embedded directly in the website.

## Security Note

This setup is fine for internal or educational use. It doesn't protect the CSV or notes from tampering if users inspect the page. For a production environment, a proper backend with authentication would be recommended.
