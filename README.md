# SoftwareHub - A Mini Social Media Platform for developers

## 📝 Project Overview

Students will build a _front-end only social networking app_ powered by FreeAPI’s social media endpoints.  
The app will allow users to _register, **log in, **view and edit their profiles, \*\*browse posts_,  
_like/unlike posts, **comment, and **manage bookmarks_ - simulating a real social media experience.

---

## 🔹 Core Requirements (MUST HAVE)

| #   | Feature                      | Description                                                                                   | API Endpoints                                                                                                              |
| --- | ---------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| 1   | Authentication               | Users can register, log in, and log out. Persist login state.                                 | POST /register, POST /, POST /logout, POST /refresh-token                                                                  |
| 2   | Profile Management           | View own profile, update avatar, update cover image, update profile fields (name, bio, etc.). | GET /get-my-profile, PATCH /update-user-profile, PATCH /update-avatar, PATCH /update-cover-image                           |
| 3   | View Other Profiles          | Search or click on usernames to see their profiles and posts.                                 | GET /profile-by-username/:username, GET /posts-by-username/:username                                                       |
| 4   | Posts Feed                   | Fetch all posts and display in a feed, with pagination or infinite scroll.                    | GET /all-posts                                                                                                             |
| 5   | Create / Edit / Delete Posts | Authenticated users can create, edit, and delete their posts.                                 | POST /create-post, PATCH /update-post/:id, DELETE /delete-post/:id                                                         |
| 6   | Like / Unlike Posts          | Toggle like/unlike on posts.                                                                  | POST /like-unlike-post/:id                                                                                                 |
| 7   | Commenting                   | Add, edit, delete comments under posts.                                                       | GET /post-comments/:postId, POST /add-comment/:postId, PATCH /update-comment/:commentId, DELETE /delete-comment/:commentId |
| 8   | Bookmarks                    | Users can view bookmarked posts.                                                              | GET /bookmarked-posts                                                                                                      |
| 9   | Search by Tag                | Filter posts by tag.                                                                          | GET /posts-by-tag/:tag                                                                                                     |

---

## 🔹 Technical Requirements

- _React Router_ - Routing (/, /, /register, /profile/:username, /post/:id, /settings, /bookmarks)
- _Zustand_ - Store global auth state (current user + token), maybe UI preferences
- _React Query_ - Fetch + cache posts, comments, profiles; handle loading, error, and background refetch
- _React Hook Form + Zod_ - Forms: registration, login, profile update, create/edit post, add comment - all validated with Zod schemas
- _TypeScript_ - Strong typing across components, API responses, forms, store
- _FreeAPI_ - Data source - all data-driven functionality will use FreeAPI endpoints
- _UI/UX_ - Responsive design, error + loading states, clean navigation, user-friendly feedback (toasts/snackbars)

---

## 🔹 Suggested Pages / Routes

| Route              | Purpose                           |
| ------------------ | --------------------------------- |
| /                  | Home (feed of posts)              |
| /                  | User login                        |
| /register          | User registration                 |
| /profile/:username | View user profile (own or others) |
| /settings          | Update profile, avatar, cover     |
| /post/:id          | View single post with comments    |
| /bookmarks         | View bookmarked posts             |
| \*                 | 404 Not Found page                |

---

## 🔹 Deliverables

1. _GitHub Repository_ - Source code (clean commits, clear README)
2. _Deployed Version_ - (Vercel/Netlify)
3. _Demo Video (Optional)_ - Quick walkthrough of the app’s features

---

## 🔹 Evaluation Criteria

| Area                                                                      | Weight   |
| ------------------------------------------------------------------------- | -------- |
| Feature completeness                                                      | 40%      |
| Code quality & organization                                               | 20%      |
| Proper usage of taught libraries (Router, Zustand, React Query, Zod, RHF) | 20%      |
| UI/UX polish                                                              | 10%      |
| Creativity / extra features                                               |  10%     |
