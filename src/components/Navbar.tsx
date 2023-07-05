import Link from "next/link";
import { getServerSession ,} from "next-auth"; // useSession para renderizar lado del cliente
import { signOut } from "next-auth/react";

async function Navbar() {
    const session = await getServerSession();
    console.log(session);
    return (
        <nav className="bg-zinc-900 p-4">
            <div className=" flex justify-between container mx-auto">
                <Link href="/">
                    <h1 className="font-bold text-xl">NextAuth</h1>
                </Link>
                <ul className=" flex gap-x-2">
                    {session ? (
                        <>
                            <li className="px -3 py-1">
                                <Link href="/dashboard">dashboard</Link>
                            </li>
                            <li className="px -3 py-1">
                                <Link href="/dashboard/profile">profile</Link>
                            </li>
                            <li className="px -3 py-1">
                                <Link href="/api/auth/signout"
                                    
                                        className="bg-red-500 px-4 py-2 text-white" >
                                
                                        Signout
                             
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="px -3 py-1">
                                <Link href="/about ">About</Link>
                            </li>
                            <li className="px -3 py-1">
                                <Link href="/login">login</Link>
                            </li>
                            <li className="px -3 py-1">
                                <Link href="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
