import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex w-full block justify-center">
            <div>
            <Link className="text-xs" href={'/terms&conditions'}>Terms and condition</Link>
            </div>
            <div className="ml-4">
            <Link className="text-xs" href={'/privacy-policy'}>Privacy policy</Link>
            </div>
        </footer>
    )
}