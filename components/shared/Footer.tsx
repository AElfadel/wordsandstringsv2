import Image from "next/image";
import Link from "next/link";
import { Icons } from "../ui/Icons";

const Footer = () => {
  return (
    // <footer classNameNameNameName="border-t">
    //   <div classNameNameNameName="flex flex-center  wrapper flex-between flex-col gap-4 p-5 text-center md:flex-row">
    //     <Link href="/" classNameNameNameName="md:block">
    //       <Icons.WordsAndString />
    //     </Link>
    //     <p>2024 Words & Strings. All Rights reserved.</p>
    //   </div>
    // </footer>

    <div className="bg-black">
      <footer className=" rounded-lg shadow bg-neutral-900 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Icons.WordsAndString />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Words & Strings
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-neutral-500 sm:mb-0 ">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Licensing
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-neutral-200 sm:mx-auto dark:border-neutral-700 lg:my-8" />
          <span className="block text-sm text-neutral-500 sm:text-center ">
            © 2023{" "}
            <a href="https://flowbite.com/" className="hover:underline">
              Flowbite™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
