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
│  │  ├─ Icons.tsx
│  │  ├─ api
│  │  ├─ layout.tsx
│  │  ├─ login.tsx
│  │  └─ page.tsx
│  ├─ atoms.ts
│  ├─ components
│  ├─ hooks
│  ├─ lib
│  ├─ middleware.ts
│  ├─ providers
│  ├─ styles
│  └─ types
├─ supabase
```
```
next-cherry-music
│ 
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ images
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
│  │  │  │  └─ callback
│  │  │  │     └─ route.ts
│  │  │  ├─ cherryMusic
│  │  │  │  └─ track
│  │  │  │     ├─ helper.ts
│  │  │  │     ├─ route.ts
│  │  │  │     └─ service.ts
│  │  │  ├─ cron
│  │  │  │  └─ route.ts
│  │  │  ├─ lastFm
│  │  │  ├─ spotify
│  │  ├─ artist
│  │  │  └─ [artist]
│  │  │     ├─ [album]
│  │  │     │  ├─ error.tsx
│  │  │     │  └─ page.tsx
│  │  │     ├─ error.tsx
│  │  │     └─ page.tsx
│  │  ├─ chart
│  │  │  ├─ error.tsx
│  │  │  └─ page.tsx
│  │  ├─ favicon.ico
│  │  ├─ geo
│  │  │  ├─ error.tsx
│  │  │  └─ page.tsx
│  │  ├─ global-error.tsx
│  │  ├─ globals.css
│  │  ├─ hashtag
│  │  │  └─ [hashtag]
│  │  │     ├─ error.tsx
│  │  │     └─ page.tsx
│  │  └─ login.tsx
│  ├─ atoms.ts
│  ├─ components
│  │  
│  ├─ hooks
│  │  ├─ useArtistImgUrl.ts
│  │  ├─ useCarouselItems.ts
│  │  ├─ useCenterArtistImg.ts
│  │  ├─ useCountryTopArtists.ts
│  │  ├─ useDebounce.ts
│  │  ├─ useDropdownHandlers.ts
│  │  ├─ useLocalStoragePlaylist.ts
│  │  ├─ useMaxListeners.ts
│  │  ├─ useMouseAction.ts
│  │  ├─ usePlayerControls.ts
│  │  ├─ usePlayerProgress.ts
│  │  ├─ useRefinedArtists.ts
│  │  └─ useSyncedLocalStorage.ts
│  ├─ lib

│  ├─ providers
│  │  ├─ ModalProvider.tsx
│  │  ├─ NextUIProvider.tsx
│  │  ├─ PlayerProvider.tsx
│  │  ├─ Providers.tsx
│  │  ├─ RecoilProvider.tsx
│  │  └─ SupabaseProvider.tsx
│  ├─ styles
│  │  
│  └─ types
│     ├─ itemTypes.ts
│     ├─ lastFmTypes.ts
│     └─ spotifyTypes.ts
├─ 
├─ tailwind.config.js
├─ tsconfig.json
└─ vercel.json

```