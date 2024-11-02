import { useSearchParams, usePathname } from 'next/navigation';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { Search } from 'react-bootstrap-icons';

export default function Header() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter()
    // const [searchTerm, setSearchTerm] = useState('')
    const [nameInput, setNameInput] = useState('')

    const handleSubmit = ( event ) => {
    event.preventDefault()
        console.log('input value', nameInput)
        router.push(`/results/${nameInput}`)
    }

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(async () => {
    //         const getResults = await searchResults( searchTerm )
    //         console.log(getResults)
    //     }, 3000)
    
    //     return () => clearTimeout(delayDebounceFn)
    //   }, [searchTerm])

    return (
        <>
        <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-7">
            <nav className="relative max-w-7xl w-full flex flex-wrap md:grid md:grid-cols-12 basis-full items-center px-4 md:px-8 mx-auto">
                
                <div className="md:col-span-1">
                    <a className="flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80" href="/" aria-label="Preline">
                        <img src="/logo-reica.svg" alt="Reica logo" width={32} />
                    </a>
                </div>

                <div className="flex items-center gap-x-1 md:gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-2">
                    <a target="_blank" href="https://getreica.com" className="py-3 px-4 inline-flex items-center gap-x-2 text-md font-medium rounded-md border border-transparent bg-blue-600 text-white hover:bg-blue-800 focus:outline-none focus:bg-blue-600 transition disabled:opacity-50 disabled:pointer-events-none">
                        Sign in Reica
                    </a>
                </div>
                <div id="hs-navbar-hcail" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block md:w-auto md:basis-auto md:order-2 md:col-span-9" aria-labelledby="hs-navbar-hcail-collapse">
                    <div className="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:justify-center md:items-center md:gap-y-0 md:gap-x-7 md:mt-0">
                        
                        <div className="w-full p-2 gap-4 md:items-start justify-start rounded-md border">
                            <div className="w-auto flex items-center gap-1">
                                <Search className='ml-4' />
                                <form onSubmit={handleSubmit} className='w-full'>
                                    <input
                                        autoComplete='off'
                                        id="searchInput"
                                        onChange = {(event)=> setNameInput(event.target.value)}
                                        defaultValue={searchParams.get('query')?.toString()}
                                        type="text" className="p-4 focus:outline-none placeholder-gray-400 text-gray-900 text-xl font-normal leading-4 w-full" placeholder="Type here what image you need" />
                                </form>
                            </div>
                        </div>

                        {/* <div>
                            <a className="relative inline-block text-black focus:outline-none before:absolute before:bottom-0.5 before:start-0 before:-z-[1] before:w-full before:h-1 before:bg-lime-400 dark:text-white" href="#" aria-current="page">Home</a>
                        </div>
                        <div>
                        <a className="inline-block text-black hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300" href="#">Services</a>
                        </div>
                        <div>
                        <a className="inline-block text-black hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300" href="#">About</a>
                        </div>
                        <div>
                        <a className="inline-block text-black hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300" href="#">Careers</a>
                        </div>
                        <div>
                        <a className="inline-block text-black hover:text-gray-600 focus:outline-none focus:text-gray-600 dark:text-white dark:hover:text-neutral-300 dark:focus:text-neutral-300" href="#">Blog</a>
                        </div> */}
                    </div>
                </div>
            </nav>
        </header>
        </>
    )
}