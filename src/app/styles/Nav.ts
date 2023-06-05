import tw from "tailwind-styled-components";

export const NavContainer = tw.div`h-full w-full backdrop-opacity-10  justify-center align-middle p-3 grid grid-rows-[1fr_10fr_1fr]`;

export const LogoBox = tw.div`w-full flex items-center justify-center top-4 text-3xl`;

export const Logo = tw.span`font-bold tracking-normal font-logo`;

export const NavUl = tw.ul`w-full flex flex-col top-0 pt-20`;

export const Menu = tw.li`w-full grid grid-cols-[1fr_5fr] align-middle mb-7 `;
export const MenuIcon = tw.span`text-xl`;
export const MenuSpan = tw.span`font-bold tracking-normal text-xl ml-2 `;

export const NavBtnIcon = tw.span`text-xl`;
export const NavBtnSpan = tw.span`font-bold tracking-normal text-xl ml-2 `;
