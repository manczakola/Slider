import '../sass/style.scss'

document.addEventListener('DOMContentLoaded', () => {
    const imagesContainerEl = document.querySelector('.slider__images-container');
    const img1El = document.querySelector('.slider__image-container--first img');
    const img2El = document.querySelector('.slider__image-container--second img');
    const img1ContainerEl = document.querySelector('.slider__image-container--first');
    const img2ContainerEl = document.querySelector('.slider__image-container--second');
    const sliderHandle = document.querySelector('.slider__handle');
    const sliderDivider = document.querySelector('.slider__divider');
    let dragging = false;
    let imagesContainerWidth;
    let imagesContainerLeftOffset;

    const getOffset = (clientX) => {
        const offset = clientX - imagesContainerLeftOffset;
        console.log(offset);
        console.log(sliderDivider);

        if (offset < 0) {
            return 0;
        } else if (offset > imagesContainerWidth) {
            return imagesContainerWidth;
        } else {
            return offset;
        }

    }

    const move = (clientX) => {
        const offset = getOffset(clientX);
        const percent = offset / imagesContainerWidth * 100;
        console.log(percent);
        sliderDivider.style.left = `${percent}%`;
        img2ContainerEl.style.width = `${percent}%`;

    }

    const initEvents = (e) => {
        sliderHandle.addEventListener('mousedown', () => {
            dragging = true;
        });

        sliderHandle.addEventListener('mouseup', () => {
            dragging = false;
        });
        sliderHandle.addEventListener('touchstart', () => {
            dragging = true;
        });

        sliderHandle.addEventListener('touchend', () => {
            dragging = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (dragging) {
                move(e.clientX)
            }
        });

        window.addEventListener('touchmove', (e) => {
            if (dragging) {
                move(e.touches[0].clientX)
            }
        });
    }

    function adjustImagesSize() {
        imagesContainerWidth = imagesContainerEl.offsetWidth;
        imagesContainerLeftOffset = imagesContainerEl.offsetLeft;
        img1El.style.width = imagesContainerWidth + 'px';
        img2El.style.width = imagesContainerWidth + 'px';
    }


    window.addEventListener('resize', adjustImagesSize);


    adjustImagesSize();
    initEvents();

})