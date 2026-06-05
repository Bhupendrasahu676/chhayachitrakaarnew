"use client"
 
import { useState, useEffect, useRef, useCallback, useId } from "react"
import { CIRCULAR_GALLERY_DEFAULT_IMAGES as defaultImages } from "../../assets"
 
interface ImageData {
  title: string
  url: string
}
 
interface ImageGalleryProps {
  items?: ImageData[]
  currentIndex?: number
  onChangeIndex?: (index: number) => void
  embedMode?: boolean
}

// Main component for the Image Gallery
export function ImageGallery({ items = defaultImages, currentIndex, onChangeIndex, embedMode = false }: ImageGalleryProps) {
  const images = items.length > 0 ? items : defaultImages
  const uniqueId = useId().replace(/:/g, "")
  
  const [localOpened, setLocalOpened] = useState(0)
  const [inPlace, setInPlace] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [gsapReady, setGsapReady] = useState(false)
  const autoplayTimer = useRef<number | null>(null)

  // Sync index from external state when it changes
  const opened = currentIndex !== undefined ? currentIndex : localOpened
  const setOpened = useCallback((val: number | ((curr: number) => number)) => {
    if (onChangeIndex) {
      const nextVal = typeof val === 'function' ? val(opened) : val
      onChangeIndex(nextVal)
    } else {
      setLocalOpened(val)
    }
  }, [opened, onChangeIndex])

  useEffect(() => {
    // This effect loads the GSAP library and its plugin from a CDN.
    const loadScripts = () => {
      const win = window as any
      if (win.gsap && win.MotionPathPlugin) {
        win.gsap.registerPlugin(win.MotionPathPlugin)
        setGsapReady(true)
        return
      }

      const gsapScript = document.createElement("script")
      gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"
      gsapScript.onload = () => {
        const motionPathScript = document.createElement("script")
        motionPathScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js"
        motionPathScript.onload = () => {
          if (win.gsap && win.MotionPathPlugin) {
            win.gsap.registerPlugin(win.MotionPathPlugin)
            setGsapReady(true)
          }
        }
        document.body.appendChild(motionPathScript)
      }
      document.body.appendChild(gsapScript)
    }

    loadScripts()
  }, [])

  const onClick = (index: number) => {
    if (!disabled) setOpened(index)
  }

  const onInPlace = (index: number) => setInPlace(index)

  const next = useCallback(() => {
    setOpened((currentOpened) => {
      let nextIndex = currentOpened + 1
      if (nextIndex >= images.length) nextIndex = 0
      return nextIndex
    })
  }, [images.length, setOpened])

  const prev = useCallback(() => {
    setOpened((currentOpened) => {
      let prevIndex = currentOpened - 1
      if (prevIndex < 0) prevIndex = images.length - 1
      return prevIndex
    })
  }, [images.length, setOpened])

  // Disable clicks during animation transitions
  useEffect(() => {
    setDisabled(true)
  }, [opened])

  useEffect(() => {
    setDisabled(false)
  }, [inPlace])

  // Autoplay and timer reset logic
  useEffect(() => {
    if (!gsapReady) return

    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current)
    }

    autoplayTimer.current = window.setInterval(next, 4500)

    return () => {
      if (autoplayTimer.current) {
        clearInterval(autoplayTimer.current)
      }
    }
  }, [opened, gsapReady, next])

  if (embedMode) {
    // Elegant integration for the curated portfolio dialog
    return (
      <div className="relative w-full aspect-[4/3] flex items-center justify-center select-none overflow-visible">
        {/* Carousel Frame */}
        <div className="relative h-full w-full max-h-[460px] max-w-[460px] overflow-hidden rounded-[20px] border border-[#4a3a24]/10 bg-[#4a3a24]/5 shadow-lg">
          {!gsapReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#faf6ee] text-[#8c7144] font-sans text-xs">
              Loading aesthetic canvas...
            </div>
          )}
          {gsapReady &&
            images.map((image, i) => (
              <div
                key={image.url}
                className="absolute left-0 top-0 h-full w-full"
                style={{ zIndex: inPlace === i ? i : images.length + 1 }}
              >
                <GalleryImage
                  uniqueId={uniqueId}
                  total={images.length}
                  id={i}
                  url={image.url}
                  title={image.title}
                  open={opened === i}
                  inPlace={inPlace === i}
                  onInPlace={onInPlace}
                />
              </div>
            ))}
          <div className="absolute left-0 top-0 z-[100] h-full w-full pointer-events-none">
            <Tabs uniqueId={uniqueId} images={images} onSelect={onClick} />
          </div>
        </div>

        {/* Floating Left Button */}
        <button
          className="absolute left-4 top-1/2 z-[101] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#4a3a24]/20 bg-[#faf6ee]/95 backdrop-blur-sm shadow-md transition-all hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={prev}
          disabled={disabled}
          aria-label="Previous Image"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#4a3a24]"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Floating Right Button */}
        <button
          className="absolute right-4 top-1/2 z-[101] flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#4a3a24]/20 bg-[#faf6ee]/95 backdrop-blur-sm shadow-md transition-all hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={next}
          disabled={disabled}
          aria-label="Next Image"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#4a3a24]"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    )
  }

  // Standalone mode (as in the template)
  return (
    <div className="flex items-center justify-center bg-[#231a0e] py-16 px-6 font-sans relative">
      <div className="relative h-[72vmin] w-[72vmin] max-h-[500px] max-w-[500px] overflow-hidden rounded-[20px] shadow-[0_2.8px_2.2px_rgba(0,0,0,0.02),0_6.7px_5.3px_rgba(0,0,0,0.028),0_12.5px_10px_rgba(0,0,0,0.035),0_22.3px_17.9px_rgba(0,0,0,0.042),0_41.8px_33.4px_rgba(0,0,0,0.05),0_100px_80px_rgba(0,0,0,0.07)]">
        {!gsapReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#231a0e] text-[#dac587] text-xs">
            Loading beautiful gallery...
          </div>
        )}
        {gsapReady &&
          images.map((image, i) => (
            <div
              key={image.url}
              className="absolute left-0 top-0 h-full w-full"
              style={{ zIndex: inPlace === i ? i : images.length + 1 }}
            >
              <GalleryImage
                uniqueId={uniqueId}
                total={images.length}
                id={i}
                url={image.url}
                title={image.title}
                open={opened === i}
                inPlace={inPlace === i}
                onInPlace={onInPlace}
              />
            </div>
          ))}
        <div className="absolute left-0 top-0 z-[100] h-full w-full pointer-events-none">
          <Tabs uniqueId={uniqueId} images={images} onSelect={onClick} />
        </div>
      </div>

      <button
        className="absolute left-4 sm:left-[calc(50%-270px)] top-1/2 z-[101] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-white/20 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={prev}
        disabled={disabled}
        aria-label="Previous Image"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-800"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        className="absolute right-4 sm:right-[calc(50%-270px)] top-1/2 z-[101] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-white/20 bg-white/95 backdrop-blur-sm shadow-md transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={next}
        disabled={disabled}
        aria-label="Next Image"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-800"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  )
}

interface GalleryImageProps {
  uniqueId: string
  url: string
  title: string
  open: boolean
  inPlace: boolean
  id: number
  onInPlace: (id: number) => void
  total: number
}

function GalleryImage({ uniqueId, url, title, open, inPlace, id, onInPlace, total }: GalleryImageProps) {
  const [firstLoad, setLoaded] = useState(true)
  const clip = useRef<SVGCircleElement>(null)

  // --- Animation Constants ---
  const gap = 10
  const circleRadius = 7
  const defaults = { transformOrigin: "center center" }
  const duration = 0.4
  const width = 400
  const height = 400
  const scale = 700

  const bigSize = circleRadius * scale
  const overlap = 0

  // --- Position Calculation Functions ---
  const getPosSmall = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height - 30,
    r: circleRadius,
  })
  const getPosSmallAbove = () => ({
    cx: width / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: height / 2,
    r: circleRadius * 2,
  })
  const getPosCenter = () => ({ cx: width / 2, cy: height / 2, r: circleRadius * 7 })
  const getPosEnd = () => ({ cx: width / 2 - bigSize + overlap, cy: height / 2, r: bigSize })
  const getPosStart = () => ({ cx: width / 2 + bigSize - overlap, cy: height / 2, r: bigSize })

  // --- Animation Logic ---
  useEffect(() => {
    const win = window as any
    const gsap = win.gsap
    if (!gsap) return // Guard against GSAP not being loaded yet

    setLoaded(false)
    if (clip.current) {
      const flipDuration = firstLoad ? 0 : duration
      const upDuration = firstLoad ? 0 : 0.2
      const bounceDuration = firstLoad ? 0.01 : 1
      const delay = firstLoad ? 0 : flipDuration + upDuration

      if (open) {
        gsap
          .timeline()
          .set(clip.current, { ...defaults, ...getPosSmall() })
          .to(clip.current, {
            ...defaults,
            ...getPosCenter(),
            duration: upDuration,
            ease: "power3.inOut",
          })
          .to(clip.current, {
            ...defaults,
            ...getPosEnd(),
            duration: flipDuration,
            ease: "power4.in",
            onComplete: () => onInPlace(id),
          })
      } else {
        gsap
          .timeline({ overwrite: true })
          .set(clip.current, { ...defaults, ...getPosStart() })
          .to(clip.current, {
            ...defaults,
            ...getPosCenter(),
            delay: delay,
            duration: flipDuration,
            ease: "power4.out",
          })
          .to(clip.current, {
            ...defaults,
            motionPath: {
              path: [getPosSmallAbove(), getPosSmall()],
              curviness: 1,
            },
            duration: bounceDuration,
            ease: "bounce.out",
          })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <clipPath id={`${uniqueId}_${id}_circleClip`}>
          <circle className="clip" cx="0" cy="0" r={circleRadius} ref={clip}></circle>
        </clipPath>
        <clipPath id={`${uniqueId}_${id}_squareClip`}>
          <rect className="clip" width={width} height={height}></rect>
        </clipPath>
      </defs>
      <g clipPath={`url(#${uniqueId}_${id}_${inPlace ? "squareClip" : "circleClip"})`}>
        <image width={width} height={height} href={url} className="pointer-events-none"></image>
      </g>
    </svg>
  )
}

interface TabsProps {
  uniqueId: string
  images: ImageData[]
  onSelect: (index: number) => void
}

function Tabs({ uniqueId, images, onSelect }: TabsProps) {
  const gap = 10
  const circleRadius = 7
  const width = 400
  const height = 400

  const getPosX = (i: number) =>
    width / 2 - (images.length * (circleRadius * 2 + gap) - gap) / 2 + i * (circleRadius * 2 + gap)
  const getPosY = () => height - 30

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      {images.map((image, i) => (
        <g key={image.url} className="pointer-events-auto">
          <defs>
            <clipPath id={`${uniqueId}_tab_${i}_clip`}>
              <circle cx={getPosX(i)} cy={getPosY()} r={circleRadius} />
            </clipPath>
          </defs>
          <image
            x={getPosX(i) - circleRadius}
            y={getPosY() - circleRadius}
            width={circleRadius * 2}
            height={circleRadius * 2}
            href={image.url}
            clipPath={`url(#${uniqueId}_tab_${i}_clip)`}
            className="pointer-events-none"
            preserveAspectRatio="xMidYMid slice"
          />
          <circle
            onClick={() => onSelect(i)}
            className="cursor-pointer fill-white/0 stroke-white/70 hover:stroke-white/100 transition-all pointer-events-auto"
            strokeWidth="2"
            cx={getPosX(i)}
            cy={getPosY()}
            r={circleRadius + 2}
          />
        </g>
      ))}
    </svg>
  )
}
