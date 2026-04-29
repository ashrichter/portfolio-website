import React from "react";
import Image from "next/image";
import styles from "@/styles/imgslider.module.css";

// ImageSlider component displays either an image or video
// and provides navigation controls if multiple images exist
function ImageSlider(
  props: {
    isManyImg: boolean; // whether the project has multiple images
    image: string; // current image/video file path
    totalImages: number; // total number of images in the slider
    index: number; // current image index
    setImage: (index: number) => void; // function to update the current image
  } ) {

  const { isManyImg, index, setImage } = props;

  // Helper function to check whether the file is a an .mp4 file
  const isVideo = (file: string) => {
    return file.endsWith(".mp4");
  };

  return (
    // Main container for the entire slider component
    <div className={styles.imgSliderContainer}>
      
      {/* Container for the displayed media (image or video) */}
      <div className={styles.Images}>

        {/* If the file is a video, render a video player */}
        {isVideo(props.image) ? (
          <video
            src={props.image}
            controls // show video playback controls
            className={styles.videoPlayer}
            // autoPlay
            loop
            // muted // mute by default
          />
        ) : (

          // Otherwise render the image
          <Image
            src={props.image}
            alt={`slide-${index}`} // accessibility alt text
            fill // makes the image fill the parent container
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized={true} // disables Next.js optimization (useful for local assets/videos)
          />
        )}

        {/* Navigation arrows only appear if there are multiple images */}
        {isManyImg && (
          <>
            {/* Left arrow - show previous image */}
            <div onClick={() => setImage(index - 1)} className={styles.leftButton}>
              <span></span>
            </div>

            {/* Right arrow - show next image */}
            <div onClick={() => setImage(index + 1)} className={styles.rightButton}>
              <span></span>
            </div>
          </>
        )}
      </div>

      {/* Dot indicators for selecting specific images */}
      {isManyImg && (
        <div className={styles.selectImage}>

          {/* Create dots equal to the total number of images */}
          {Array.from({ length: props.totalImages }, (_, _index) => (
            <span
              key={_index}

              // Clicking a dot switches to that image index
              onClick={() => setImage(_index)}

              // Apply selected styling to the active image
              className={`${styles.dotMarker} ${
                _index == index ? styles.selectedPoint : ""
              }`}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageSlider;