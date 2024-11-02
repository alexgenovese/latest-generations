import Image from "next/image";
import { useState } from "react";
import { BoxArrowUpRight, ArrowLeft } from 'react-bootstrap-icons';
import { colorDetection, type Config } from '@dominate-color.js/core';
import type { ImageProps } from "../utils/types";
import rgbHex from 'rgb-hex';
import moment from "moment";
import ShareSocial from "./ShareSocial"
import downloadPhoto from "../utils/downloadPhoto"

export default function ImageComp({ currentPhoto, photoId }, {currentPhoto: ImageProps, photoId: string}) {
    let [promColors, setPromColors] = useState([]);
    let prom_colors = [];
    const altName = currentPhoto.prompt.substring(0, 97) + "..."
    const name = currentPhoto.prompt.substring(0, 200) + "..."
    const few_pixels = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME ? process.env.CLOUDINARY_CLOUD_NAME : process.env.cloudinary_cloud_name }/image/upload/c_scale,w_10/${currentPhoto.public_id}.${currentPhoto.format}`
    
    if (promColors.length == 0 ){
        const setupColors: Config = {
            distance: 'fast', // Choose the 'euclidean' algorithm for color distance calculation
            k: 5, // Detect the top 5 dominant colors
            AccessControlAllowOrigin: 'cors' // Useful for CORS when fetching images from external URLs
        };
        colorDetection(few_pixels, setupColors)
            .then(colors => {
                colors.forEach(value => {
                    prom_colors.push({ id: value[0] +"_"+ value[1], hex: "#"+rgbHex(value[0], value[1], value[2]) } )
                })
                setPromColors(prom_colors)
            })
            .catch(error => { 
                // console.error('Error detecting colors with custom config:', error) 
            });
    }

    return (
        <section className="relative">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mx-auto max-md:px-2 ">
                    <div className="img">
                        <div className="img-box h-full max-lg:mx-auto relative">
                            <Image
                                src={`https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME ? process.env.CLOUDINARY_CLOUD_NAME : process.env.cloudinary_cloud_name }/image/upload/c_scale,w_1024/${currentPhoto.public_id}.${currentPhoto.format}`}
                                className="max-lg:mx-auto lg:ml-auto md:w-full h-full object-cover"
                                alt={ `Reica | ${altName}`}
                                fill
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL={currentPhoto.blurDataUrl}
                                sizes="(max-width: 640px) 100vw,
                                    (max-width: 1280px) 50vw,
                                    (max-width: 1536px) 33vw,
                                25vw"
                            />
                        </div>
                    </div>
                    <div className="data w-full lg:pr-8 pr-0 xl:justify-start justify-center flex items-center max-lg:pb-10 xl:my-2 lg:my-5 my-0">
                        <div className="data w-full max-w-xl">
                            <a href="/" className="text-center w-auto px-4 py-2 rounded-md inline-flex gap-2 items-center justify-center font-semibold text-lg transition-all duration-500 hover:bg-gray-700 hover:text-white">
                                <ArrowLeft /> Back to the list 
                            </a>
                            <hr className="mt-2 mb-4" />
                            {/* <p className="text-lg font-medium leading-8 text-indigo-600 mb-4">Clothing&nbsp; /&nbsp; Menswear</p> */}
                            <h1 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2 capitalize">{name}</h1>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        {moment(currentPhoto.created_at).format("MMM Do YY")}{" "}
                                    </div>
                                </div>
                            </div>
                            <div className="font-manrope font-semibold text-2xl text-gray-900 pr-5 sm:border-r border-gray-200 mb-4 mt-2"> 
                                <ul className="inline-flex">
                                    { promColors ? promColors.map(color => <li id={`${color.id}`} className="mr-2"><div className="rounded-full shrink-0 w-6 h-6" style={{ backgroundColor: color.hex }}></div></li> ) : "Loading..." }
                                </ul>
                            </div>
                            <b className="flex pb-2">Prompt to generate this photo:</b>
                            <h2 className="text-gray-500 text-base font-normal mb-5">
                                {currentPhoto.prompt}
                            </h2>

                            <b className="flex pb-2">Download</b>
                            <div className="w-full pb-8 border-b border-gray-100 flex-wrap">
                                <div className="grid grid-cols-4 min-[400px]:grid-cols-5 gap-4 max-w-md">
                                    <button
                                        onClick={() => { downloadPhoto(`https://res.cloudinary.com/${process.env.cloudinary_cloud_name}/image/upload/c_scale,w_512/${currentPhoto.public_id}.${currentPhoto.format}`,`${currentPhoto.index}.jpg`) }}
                                        className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-sm justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                                            512 size
                                        </button>
                                    <button
                                        onClick={() => { downloadPhoto(`https://res.cloudinary.com/${process.env.cloudinary_cloud_name}/image/upload/c_scale,w_1024/${currentPhoto.public_id}.${currentPhoto.format}`,`${currentPhoto.index}.jpg`) }}
                                        className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-sm justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                                            1024 size
                                        </button>
                                    <button
                                        onClick={() => { downloadPhoto(`https://res.cloudinary.com/${process.env.cloudinary_cloud_name}/image/upload/c_scale,w_1280/${currentPhoto.public_id}.${currentPhoto.format}`,`${currentPhoto.index}.jpg`) }}
                                        className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-sm justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                                            1280 size
                                        </button>
                                    <button
                                        onClick={() => { downloadPhoto(`https://res.cloudinary.com/${process.env.cloudinary_cloud_name}/image/upload/${currentPhoto.public_id}.${currentPhoto.format}`,`${currentPhoto.index}.jpg`) }}
                                        className="bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-sm justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50">
                                            Original size
                                    </button>
                                </div>
                            </div>

                            <div className="sponsor bg-gray-50 p-4 mb-10">
                                <h3 className="font-sans font-semibold text-xl">❤️ With Reica you can generate this image in few clicks</h3>
                                <p className="font-sans text-lg my-2">No more wasting time to search for the right prompt</p>
                                <p>1. Select photo style</p>
                                <p>2. Define subject details</p>
                                <p>3. Generate!</p>
                                <a className="font-sans font-semibold hover:underline py-2 inline-flex" href="https://getreica.com" target="_blank">Click here and get free credits to start generating faster</a>
                            </div>

                            <div className="flex items-center gap-3">
                                <a href="https://getreica.com"
                                    target="_blank"
                                    className="text-center w-full px-5 py-4 rounded-md bg-black flex items-center justify-center font-semibold text-lg text-white shadow-sm transition-all duration-500 hover:bg-gray-700 hover:shadow-gray-400">
                                        Edit this photo for free
                                        <div className="pl-2"><BoxArrowUpRight /></div>
                                </a>
                            </div>
                            <ShareSocial
                                url_to_share={`https://latest-generations.getreica.com/p/${photoId}`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}