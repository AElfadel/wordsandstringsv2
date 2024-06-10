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

    <div className="bg-neutral-800">
      <footer className=" rounded-lg shadow m-4 antialiased ">
        <div className="w-full max-w-screen-xl ] mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <Icons.WordsAndString width={35} />
              <span className=" self-center  whitespace-nowrap text-white text-lg ">
                Words & Strings
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 ">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About Us
                </a>
              </li>
              <li>
                <a href="/profile" className="hover:underline me-4 md:me-6">
                  My Tickets
                </a>
              </li>
              <li>
                <a
                  href="/events/termsandconditions"
                  className="hover:underline me-4 md:me-6"
                >
                  Terms & Conditions
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
          <div className="flex flex-col md:flex md:flex-row md:justify-between gap-6">
            <p className="text-sm text-neutral-100 sm:text-center ">
              © 2024 Words & Strings All Rights Reserved.
            </p>

            <a
              className="text-sm  text-neutral-400 text-center -mb-3 "
              href="https://www.ahmedelfadel.dev"
            >
              🔧 Web App built by Ahmed Elfadel{" "}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
