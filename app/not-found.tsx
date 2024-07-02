import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='h-11/12 text-4xl grid grid-cols-1 place-items-center gap-10 mt-30'>
            <h2 className=''>Sorry, Page Indisponible</h2>
        
            <Link className='border border-solid border-neutral-200 p-4 hover:scale-95 hover:opacity-60' href="/">Revenir à l&apos;accueil </Link>
        </div>
    )
}