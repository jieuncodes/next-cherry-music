# Cherry Music

Built with the Next.js App Router, TypeScript, Tailwind & Supabase.

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
│  │  
│  ├─ hooks
│  ├─ lib
│  ├─ providers
│  ├─ styles
│  └─ types

```
