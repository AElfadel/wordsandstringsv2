import Image from "next/image";
import Link from "next/link";
import { Icons } from "../ui/Icons";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex flex-center  wrapper flex-between flex-col gap-4 p-5 text-center md:flex-row">
        <Link href="/" className="md:block">
          <Icons.WordsAndString />
        </Link>
        <p>2024 Words & Strings. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
