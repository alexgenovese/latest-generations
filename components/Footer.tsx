

export default function Footer() {

    return (
        <footer className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="py-6 border-t border-gray-200 dark:border-neutral-400">
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <div>
                        <p className="text-xs text-gray-600 dark:text-neutral-400">
                        © 2024 Reica
                        </p>
                    </div>
                    
                    <ul className="flex flex-wrap items-center">
                        <li className="inline-block relative pe-4 text-xs last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-1.5 before:-translate-y-1/2 before:size-[3px] before:rounded-full before:bg-gray-400 dark:text-neutral-500 dark:before:bg-neutral-600">
                            <a className="text-xs text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400" href="https://x.com/getreica" target="_blank">
                                X (Twitter)
                            </a>
                        </li>
                        <li className="inline-block relative pe-4 text-xs last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-1.5 before:-translate-y-1/2 before:size-[3px] before:rounded-full before:bg-gray-400 dark:text-neutral-500 dark:before:bg-neutral-600">
                            <a className="text-xs text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400" href="https://www.linkedin.com/company/getreica/" target="_blank">
                                LinkedIn
                            </a>
                        </li>
                        <li className="inline-block pe-4 text-xs">
                            <a className="text-xs text-gray-500 underline hover:text-gray-800 hover:decoration-2 focus:outline-none focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400" href="https://www.instagram.com/get_reica/" target="_blank">
                                Instagram
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}