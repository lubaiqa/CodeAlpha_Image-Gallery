const thumbnails = document.querySelectorAll('.thumbnail');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const closeBtn = document.getElementById('close-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentIndex = 0;
let filteredThumbnails = Array.from(thumbnails);

// Filter functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.dataset.category;
        if (category === 'all') {
            filteredThumbnails = Array.from(thumbnails);
        } else {
            filteredThumbnails = Array.from(thumbnails).filter(thumb => thumb.dataset.category === category);
        }
        thumbnails.forEach(thumb => {
            if (filteredThumbnails.includes(thumb)) {
                thumb.style.display = 'block';
            } else {
                thumb.style.display = 'none';
            }
        });
    });
});

// Open lightbox
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        currentIndex = filteredThumbnails.indexOf(thumb);
        showImage(currentIndex);
        lightbox.classList.add('show');
    });
});

function showImage(index) {
    if (index >= 0 && index < filteredThumbnails.length) {
        lightboxImg.src = filteredThumbnails[index].dataset.src;
        currentIndex = index;
    }
}

// Navigation
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + filteredThumbnails.length) % filteredThumbnails.length;
    showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % filteredThumbnails.length;
    showImage(currentIndex);
});

// Close lightbox
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('show');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('show');
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('show')) {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'Escape') {
            closeBtn.click();
        }
    }
});