import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex flex-center  wrapper flex-between flex-col gap-4 p-5 text-center md:flex-row">
        <Link href="/" className="md:block">
          <Image
            src="/was_logo.png"
            alt="logo"
            width={40}
            height={40}
            className="sm:hidden "
          />
        </Link>
        <p>2024 Words & Strings. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
