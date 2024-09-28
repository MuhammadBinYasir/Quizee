import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h4>HOME</h4>
      <Link href="/sign-in" >Sign In</Link>
      <Link href="/sign-up" >Sign Up</Link>
    </>
  );
}
