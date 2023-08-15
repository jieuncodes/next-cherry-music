# Cherry Music

Built with the Next.js App Router, TypeScript, Tailwind & Supabase.

## Game Plan
- [x] Basic setup
- [x] Auth
- [x] Social Login
- [x] Login with magic link
- [x] Music Top Chart
- [ ] Create and Add user playlist
- [ ] Create and vote for comments
- [ ] Vote for music
- [ ] Search bar
- [ ] Dark Mode
- [x] Responsive Design
    - [x] Shrink nav bar when md, sm window
- [ ] Framer Motion
    - [x] Carousel
    - [ ] Nav shifting animation
- [ ] Infinite scrolling for dynamically loading 
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
- [ ] Error handling using Next13 app router
- [ ] useLayoutEffect to prevent flickering
- [ ] Deploy


``` FolderTree
├─ src
│  ├─ animations
│  ├─ app
│  │  ├─ Icons.tsx
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  └─ callback
│  │  │  │     └─ route.ts
│  │  │  ├─ lastFm
│  │  │  │  └─ top-tracks
│  │  │  │     └─ route.ts
│  │  │  ├─ supabase
│  │  │  │  ├─ get-from-db
│  │  │  │  │  └─ route.ts
│  │  │  │  └─ save-to-db
│  │  │  │     └─ route.ts
│  │  │  └─ youtube
│  │  │     └─ route.ts
│  │  ├─ layout.tsx
│  │  ├─ login.tsx
│  │  └─ page.tsx
│  ├─ atoms.ts
│  ├─ components
│  │  ├─ AuthModal.tsx
│  │  ├─ Btns
│  │  ├─ Carousel
│  │  ├─ Nav.tsx
│  │  ├─ Panel
│  │  │  ├─ CustomerPanel.tsx
│  │  │  ├─ Panel.tsx
│  │  │  ├─ PanelPlayer
│  │  │  └─ PanelPlaylist
│  │  ├─ PlayBar.tsx
│  │  ├─ PlaylistModal.tsx
│  │  ├─ Search.tsx
│  │  ├─ ThemeSwitcher.tsx
│  │  ├─ TopChart.tsx
│  │  ├─ TopTracks.tsx
│  │  └─ TrackCard
│  ├─ hooks
│  ├─ lib
│  ├─ middleware.ts
│  ├─ providers
│  ├─ styles
│  └─ types
├─ supabase
```