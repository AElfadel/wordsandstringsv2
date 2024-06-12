import Image from "next/image";
import Link from "next/link";
import { Icons } from "../ui/Icons";
import { Separator } from "../ui/Seperator";

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-b from-neutral-900 to-black text-white w-full flex flex-col antialiased">
      <div className="flex max-w-7xl lg:mx-auto pt-5 md:px-10 xl:px-0 w-full pb-4 flex-between flex-col gap-3 text-center md:flex-row">
        <div className="flex items-center content-center gap-2">
          <Link href="/" className="md:block">
            <Icons.WordsAndString width={38} />
          </Link>
          <p>2024 Words & Strings. All Rights reserved.</p>
        </div>
        <p className="md:hidden text-xs">Our social media</p>

        <div
          id="socials"
          className="flex gap-6 justify-center content-center items-center"
        >
          <a href="https://www.instagram.com/wordsandstrings" target="_blank">
            <Icons.instagram width={22} fill="#c0c0c0" className="p-1" />
          </a>

          <a
            href="https://www.facebook.com/wordsandstrings"
            target="_blank"
            className="hover:text-wasprimary"
          >
            <Icons.facebook width={28} fill="#c0c0c0" className="-mt-0.5" />
          </a>

          <a href="https://www.x.com/wordsandstrings" target="_blank">
            <Icons.twitter width={32} fill="#c0c0c0" className="p-1" />
          </a>
        </div>
      </div>

      <a
        className="text-[9px]  text-neutral-400 text-center  md:px-[2.6rem] md:text-right pt-3 "
        href="https://www.ahmedelfadel.dev"
      >
        <span className="w-[240px] bg-neutral-400 px-1 mx-1 animate-pulse" />
        Web App built by Ahmed Elfadel
      </a>
    </footer>

    // <div className=" bg-wassecondary/20">
    //   <footer className=" m-4 antialiased ">
    //     <div className="w-full max-w-screen-xl ] mx-auto p-4 md:py-8">
    //       <div className="sm:flex sm:items-center sm:justify-between">
    //         <a
    //           href="/"
    //           className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
    //         >
    //           <Icons.WordsAndString width={35} />
    //           <span className=" self-center  whitespace-nowrap text-white text-lg ">
    //             Words & Strings
    //           </span>
    //         </a>
    //         <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 ">
    //           <li>
    //             <a href="#" className="hover:underline me-4 md:me-6">
    //               About Us
    //             </a>
    //           </li>
    //           <li>
    //             <a href="/profile" className="hover:underline me-4 md:me-6">
    //               My Tickets
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="/events/termsandconditions"
    //               className="hover:underline me-4 md:me-6"
    //             >
    //               Terms & Conditions
    //             </a>
    //           </li>
    //           <li>
    //             <a href="#" className="hover:underline">
    //               Contact
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //       <hr className="my-6 border-neutral-200 sm:mx-auto dark:border-neutral-700 lg:my-8" />
    //       <div className="flex flex-col md:flex md:flex-row md:justify-between gap-6">
    //         <p className="text-sm text-neutral-100 sm:text-center ">
    //           © 2024 Words & Strings All Rights Reserved.
    //         </p>

    //         <a
    //           className="text-sm  text-neutral-400 text-center -mb-3 "
    //           href="https://www.ahmedelfadel.dev"
    //         >
    //           🔧 Web App built by Ahmed Elfadel{" "}
    //         </a>
    //       </div>
    //     </div>
    //   </footer>
    // </div>
  );
};

export default Footer;
