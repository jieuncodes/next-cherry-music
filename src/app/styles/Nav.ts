import tw from "tailwind-styled-components";

export const NavContainer = tw.div`container h-full w-full backdrop-opacity-50 grid xl:grid-rows-[1.2fr_2fr_8fr_auto] grid-rows-[1.5fr_2fr_8fr_auto] justify-items-start items-start px-3`;

export const LogoImage = tw.div`relative 2xl:w-[3.5rem] 2xl:h-[3.5rem] w-[3rem] h-[3rem] -left-[3px]`;

export const Logo = tw.span`font-bold tracking-normal text-white self-center ml-1 text-4xl hidden xl:block 2xl:text-5xl`;

export const NavUl = tw.ul`xl:w-50 flex flex-col h-full text-white p-0 m-1 last:bottom-0`;

export const Menu = tw.li`w-full grid xl:grid-cols-[1fr_5fr] align-middle mb-7 grid-cols-1 2xl:mb-10`;

export const MenuSpan = tw.span`font-bold tracking-normal text-2xl ml-2 hidden xl:block 2xl:text-[1.7rem]`;
