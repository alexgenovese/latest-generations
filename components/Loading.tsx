
export default function Loading() {

    return (
        <div className='z-50 absolute top-0 left-0 w-full h-full flex space-x-6 justify-center items-center bg-black/80'>
            <span className='text-4xl text-white font-semibold'>Loading...</span>
            <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-4 w-4 bg-white rounded-full animate-bounce'></div>
        </div>
    )
}