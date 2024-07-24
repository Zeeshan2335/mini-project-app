import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="w-full bg-emerald-500 flex p-5 ">
        <h1 className="font-mono w-1/4">MINI PROJECTS</h1>
        <ul className="flex w-3/4 ">
          <li>
            <Link href="/todo">Todo </Link>
          </li>
          <li>
            <Link href="/traffic">Traffic Signal</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
