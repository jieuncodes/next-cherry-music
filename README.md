# Next Cherry Music

Built with the Next.js App Router, TypeScript, Tailwind & Supabase.
<br>
<br>

<p align="center">
  <img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white">
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB">
<img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white">
  <img src="https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue">
<img src="https://img.shields.io/badge/Recoil-3578E5.svg?style=for-the-badge&logo=Recoil&logoColor=white">
  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/D3.js-F9A03C.svg?style=for-the-badge&logo=d3dotjs&logoColor=white">
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white">
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/Vercel-000000.svg?style=for-the-badge&logo=Vercel&logoColor=white">

  <img src="https://img.shields.io/badge/Spotify-1DB954.svg?style=for-the-badge&logo=Spotify&logoColor=white">
  <img src="https://img.shields.io/badge/Last.fm-D51007.svg?style=for-the-badge&logo=lastdotfm&logoColor=white">
  <img src="https://img.shields.io/badge/YouTube-FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white">
</p>


<br>
<br>

## Game Plan
- [x] Basic setup
- [x] Auth
- [x] Social Login
- [x] Login with magic link
- [x] Music Top Chart
- [x] Modern Data Caching
- [ ] Create and Add user playlist
- [ ] Create and vote for comments
- [ ] Vote for music
- [x] Search bar
- [ ] Dark Mode
- [x] Responsive Design
    - [x] Shrink nav bar when md, sm window
- [x] Framer Motion
    - [x] Carousel
    - [] Nav shifting animation
- [x] Infinite scrolling for dynamically loading 
- [ ] Profile uploads (Avatar, nickname..)
- [ ] User's Playlist Upload
- [x] Hashtag
- [ ] Friends online
- [x] State management using Recoil
- [ ] Edit account settings
- [x] Loading - skeleton
- [x] Data Caching - minimize api call
- [x] Music player
- [ ] beautiful dnd - drag cards to move position
- [x] Error handling using Next13 app router
- [ ] useLayoutEffect to prevent flickering
- [-] CDN
- [x] Deploy


``` FolderTree
├─ src
│  ├─ animations
│  ├─ app
│  │  ├─ layout.tsx
│  │  ├─ (site)
│  │  │  ├─ error.tsx
│  │  │  ├─ loading.tsx
│  │  │  └─ page.tsx
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  ├─ cherryMusic
│  │  │  │  └─ track
│  │  │  ├─ cron
│  │  │  ├─ lastFm
│  │  │  ├─ spotify
│  │  ├─ artist
│  │  ├─ chart
│  │  ├─ geo
│  │  ├─ global-error.tsx
│  │  ├─ hashtag
│  │  └─ login.tsx
│  ├─ atoms.ts
│  ├─ components
│  ├─ hooks
│  ├─ lib
│  ├─ providers
│  ├─ styles
│  └─ types

```
