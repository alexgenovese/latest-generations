import { useRouter } from "next/router";
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
  ArrowUturnLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { variants } from "../utils/animationVariants";
import downloadPhoto from "../utils/downloadPhoto";
import { range } from "../utils/range";
import type { ImageProps, SharedModalProps } from "../utils/types";
// import { loadEnvConfig } from '@next/env'
import TwitterShare from "./TwitterShare"

export default function SharedModal({
  index,
  images,
  changePhotoId,
  closeModal,
  navigation,
  currentPhoto,
  direction,
}: SharedModalProps) {
  const [loaded, setLoaded] = useState(false);
  const router = useRouter();
  const { photoId } = router.query;

  let filteredImages = images?.filter((img: ImageProps) =>
    range(index - 15, index + 15).includes(img.id),
  );

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images?.length - 1) {
        changePhotoId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changePhotoId(index - 1);
      }
    },
    trackMouse: true,
  });

  let currentImage = images ? images.find(o => o.id === index ) : currentPhoto;

  return (
    <MotionConfig
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center wide:h-full xl:taller-than-854:h-auto"
        {...handlers}
      >
        {/* Main image */}
        <div className="w-full">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                <Image
                  id="image"
                  src={`https://res.cloudinary.com/${
                    process.env.cloudinary_cloud_name
                  }/image/upload/c_scale,${navigation ? "w_1024" : "w_1280"}/${
                    currentImage.public_id
                  }.${currentImage.format}`}
                  width={navigation ? 1024 : 1920}
                  height={navigation ? 768 : 1280}
                  priority
                  alt={ `"Reica | ${currentImage.prompt}"`}
                  onLoad={() => setLoaded(true)}
                  onLoadStart={() => setLoaded(false) }
                />

                { (loaded == false) ? <>
                  <div className='absolute top-60 flex space-x-4 justify-center items-center bg-white h-[512px] w-[64rem] dark:invert'>
                    <span className='sr-only'>Loading...</span>
                    <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='h-4 w-4 bg-black rounded-full animate-bounce'></div>
                  </div>
                </> : <></> }

                { (loaded) ?
                <>
                  <div className="bg-white absolute top-0 w-full p-6 -mt-20">
                    <div className="flex justify-between">
                      <div><TwitterShare text="Get your next photorealistic photo on Reica" url={`https://getreica.com/p/${photoId}`} /></div>
                      <div>
                        <button 
                        onClick={() => {
                          downloadPhoto(
                              `https://res.cloudinary.com/${process.env.cloudinary_cloud_name}/image/upload/${currentImage.public_id}.${currentImage.format}`,
                              `${index}.jpg`,
                            )
                          }
                        }
                        className="pointer inline-block rounded-lg border border-white bg-green-600 p-4 text-lg font-semibold text-white transition hover:bg-green-600/80 hover:text-white">
                          DOWNLOAD FREE (Free License)
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-t from-black to-transparent p-8 absolute bottom-0 w-full">
                    <span className="text-xl text-white font-bold font-sans block py-2"><span className="bg-black p-2">You have to write a long prompt to generate the image, like this:</span> {currentImage.prompt}</span>
                    <span className="text-2xl text-white font-bold font-sans block pb-12"><span className="bg-yellow-500 p-2">With Reica</span> just clicking on <span className="bg-violet-500 p-2">NO-PROMPT</span> builder to generate this image.</span>
                    <a className="bg-blue-600 hover:bg-blue-600 px-8 py-4 inline-flex text-white text-2xl" target="_blank" href="https://getreica.com?ref=latest-generations">Sign Up & Get Free Credits</a>
                    {/* <p className="text-lg mt-4 text-gray-100 text-ellipsis text-nowrap overflow-y-auto">{currentImage.prompt}</p> */}
                  </div>
                </>
                : (<></>) }
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* Buttons + bottom nav bar */}
        <div className="absolute inset-0 mx-auto flex max-w-5xl items-center justify-center">
          {/* Buttons */}
          {loaded && (
            <div className="relative aspect-[3/2] max-h-full w-full">
              {navigation && (
                <>
                  {index > 0 && (
                    <button
                      className="absolute left-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                      style={{ transform: "translate3d(0, 0, 0)" }}
                      onClick={() => {
                        setLoaded(false);
                        changePhotoId(index - 1)
                      }
                    }
                    >
                      <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                  )}
                  {index + 1 < images.length && (
                    <button
                      className="absolute right-3 top-[calc(50%-16px)] rounded-full bg-black/50 p-3 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white focus:outline-none"
                      style={{ transform: "translate3d(0, 0, 0)" }}
                      onClick={() => {
                        setLoaded(false);
                        changePhotoId(index + 1)
                      }
                    }
                    >
                      <ChevronRightIcon className="h-6 w-6" />
                    </button>
                  )}
                </>
              )}
              
              <div className="absolute -top-[12rem] -right-[6rem] flex items-center gap-2 p-3 text-white">
                <button
                  onClick={() => closeModal()}
                  className="rounded-full bg-black/50 p-2 text-white/75 backdrop-blur-lg transition hover:bg-black/75 hover:text-white"
                >
                  {navigation ? (
                    <XMarkIcon className="h-12 w-12" />
                  ) : (
                    <ArrowUturnLeftIcon className="h-12 w-12" />
                  )}
                </button>
              </div>
            </div>
          )}
          {/* Bottom Nav bar */}
          {navigation && (
            <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
              <motion.div
                initial={false}
                className="mx-auto mt-6 mb-6 flex aspect-[3/2] h-14"
              >
                <AnimatePresence initial={false}>
                  {filteredImages.map(({ public_id, format, id, prompt }) => (
                    <motion.button
                      initial={{
                        width: "0%",
                        x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                      }}
                      animate={{
                        scale: id === index ? 1.25 : 1,
                        width: "100%",
                        x: `${Math.max(index * -100, 15 * -100)}%`,
                      }}
                      exit={{ width: "0%" }}
                      onClick={() => {
                          setLoaded(false);
                          changePhotoId(id)
                        }
                      }
                      key={id}
                      className={`${
                        id === index
                          ? "z-20 rounded-md shadow shadow-black/50"
                          : "z-10"
                      } ${id === 0 ? "rounded-l-md" : ""} ${
                        id === images.length - 1 ? "rounded-r-md" : ""
                      } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                    >
                      <Image
                        alt={`Reica - free ai photo generator - ${prompt}`}
                        width={180}
                        height={120}
                        className={`${
                          id === index
                            ? "brightness-110 hover:brightness-110"
                            : "brightness-50 contrast-125 hover:brightness-75"
                        } h-full transform object-cover transition`}
                        src={`https://res.cloudinary.com/${process.env.cloudinary_cloud_name}/image/upload/c_scale,w_180/${public_id}.${format}`}
                      />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </MotionConfig>
  );
}
