import tw from "tailwind-styled-components";

export const NavContainer = tw.div`container h-full w-full backdrop-opacity-50 grid grid-rows-[1fr_1fr_8fr_auto] justify-items-start items-start px-3`;

export const Logo = tw.span`font-bold tracking-normal text-white text-3xl self-center ml-1 `;

export const NavUl = tw.ul`w-full flex flex-col top-0 pt-20`;

export const Menu = tw.li`w-full grid grid-cols-[1fr_5fr] align-middle mb-7 `;
export const MenuSpan = tw.span`font-bold tracking-normal text-xl ml-2 `;

export const NavBtnIcon = tw.span`text-xl`;
export const NavBtnSpan = tw.span`font-bold tracking-normal text-xl ml-2 `;
