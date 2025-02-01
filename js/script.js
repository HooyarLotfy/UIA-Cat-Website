document.addEventListener("DOMContentLoaded", () => {
    const memeButtons = document.querySelectorAll(".meme-button");
    let isPlaying = false;

    memeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            if (isPlaying) return; // Prevent other click events

            isPlaying = true;
            const videoFileName = button.getAttribute("data-video");
            const audioFileName = button.getAttribute("data-audio");

            // Construct paths to the audio and video files
            const videoSrc = `videos/${videoFileName}`;
            const audioSrc = `audios/${audioFileName}`;

            // Create video and audio elements
            const video = document.createElement("video");
            const audio = new Audio(audioSrc);

            // Set video attributes
            video.src = videoSrc;
            video.autoplay = true; // Automatically play the video
            video.loop = true; // Loop the video to match audio duration
            video.muted = true; // Muting video since audio is handled separately
            video.className = "meme-video";

            // Append video to the meme button
            button.appendChild(video);

            // Hide the original image and show the video with a fade-in effect
            const img = button.querySelector("img");
            img.style.transition = "opacity 0.5s";
            img.style.opacity = "0";
            setTimeout(() => {
                img.style.display = "none";
                button.classList.add("active-video");
                video.style.transition = "opacity 0.5s";
                video.style.opacity = "1";
            }, 500);

            // Play the audio
            audio.play().catch((error) => {
                console.log("Audio playback error:", error);
            });

            // When the audio ends, reset the button to its original state with a fade-out effect
            audio.addEventListener("ended", () => {
                video.style.transition = "opacity 0.5s";
                video.style.opacity = "0";
                setTimeout(() => {
                    video.remove();
                    img.style.display = "block";
                    img.style.opacity = "1";
                    button.classList.remove("active-video");
                    isPlaying = false; // Allow other click events
                }, 500);
            });

            // Handle multiple clicks during playback
            button.addEventListener("click", () => {
                if (!audio.paused) {
                    audio.pause();
                    audio.currentTime = 0;
                    video.style.transition = "opacity 0.5s";
                    video.style.opacity = "0";
                    setTimeout(() => {
                        video.remove();
                        img.style.display = "block";
                        img.style.opacity = "1";
                        button.classList.remove("active-video");
                        isPlaying = false; // Allow other click events
                    }, 500);
                }
            });
        });
    });
});
