import tw from "tailwind-styled-components";

export const NavContainer = tw.div`relative container  w-full backdrop-opacity-50 grid xl:grid-rows-[1.2fr_2fr_8fr_auto] grid-rows-[1.5fr_2fr_8fr_auto] justify-items-start items-start px-3`;

export const LogoImage = tw.div`relative 2xl:w-[3.5rem] 2xl:h-[3.5rem] w-[2.5rem] h-[2.5rem] -left-[3px] flex align-middle justify-center pb-1`;

export const Logo = tw.span`font-bold tracking-normal justify-center align-middle text-white self-center text-3xl hidden xl:block 2xl:text-4xl`;

export const NavUl = tw.ul`xl:w-50 flex flex-col h-full text-white p-0 m-1 last:bottom-0`;

export const Menu = tw.li`w-full grid xl:grid-cols-[1fr_5fr] items-center mb-5 grid-cols-1 2xl:mb-10`;

export const MenuSpan = tw.span`font-bold tracking-normal text-lg ml-2 hidden xl:block 2xl:text-[1.5rem]`;
