# IIITR Archive

A centralized **college event memory archive** that preserves and organizes college events in one place for long-term reference.

Designed to be simple, neutral, and reliable.

---

## Overview

College events are usually scattered across different platforms and timelines. Over time, it becomes difficult to look back and understand:

- what events happened  
- when they happened  
- and how they were documented  

**IIITR Archive** brings all events together in a single, structured archive with event-wise photo galleries.

---

## Key Features

### Public Access
- Browse all college events  
- Dedicated pages for each event  
- Clean photo galleries  
- Picture of the Day  
- Minimal, archive-style interface  

### Admin Access
- Secure admin authentication (JWT)
- Create and manage events  
- Upload and organize event photos  
- Manage Picture of the Day  

---

## Media & Storage

- Images are stored on **Cloudinary**
- Event data is stored in **MongoDB Atlas**
- Images are not stored directly in the database  

### Upload Handling
- Supported formats: **JPG, PNG, WEBP**
- Maximum file size: **10 MB**
- Automatic compression and format optimization
- No manual resizing (layout handled by frontend)

This keeps storage efficient while preserving image quality.

---

## Technology Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Axios
- React Router
- Context API
- Deployed on **Vercel**

### Backend
- Node.js + Express
- TypeScript
- MongoDB Atlas
- Cloudinary
- Multer
- JWT authentication (admin-only)
- Deployed on **Vercel (serverless)**

---

## Security

- Admin-only authentication
- JWT-protected routes
- Public access is strictly read-only
- No public uploads or user accounts

---

## Local Development

### Backend
- Install dependencies
- Run the local development server using the dedicated local entry file

### Frontend
- Install dependencies
- Start the development server

Production and local environments are kept separate to ensure stability.

---

## Design Principles

- Event-first organization  
- Neutral and minimal UI  
- Focus on long-term documentation  
- Stable and predictable behavior  

---

## Future Improvements

- Event search
- Year-based filtering
- Event categorization
- Timeline view
- Read-only statistics
- Downloadable photo albums

