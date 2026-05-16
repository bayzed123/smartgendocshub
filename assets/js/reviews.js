// ===== DEFAULT REVIEWS DATA =====
const DEFAULT_REVIEWS = [
    { name: "Alex Rivers", rating: 5, text: "Fastest tools ever! Saved me hours of work." },
    { name: "Sarah Chen", rating: 5, text: "Love the minimalist UI. So clean and easy to use." },
    { name: "Marcus Thorne", rating: 4, text: "The QR generator is top-notch. Highly recommended." },
    { name: "Elena Rodriguez", rating: 5, text: "Best free utility platform I've found so far." },
    { name: "David Park", rating: 5, text: "Everything just works. No fluff, just utility." },
    { name: "Jessica Wu", rating: 5, text: "The SEO tools are surprisingly comprehensive for a free site." },
    { name: "Tom Baker", rating: 4, text: "Great variety of tools. The word counter is my favorite." },
    { name: "Lisa Smyth", rating: 5, text: "Cleanest experience. No annoying popups!" },
    { name: "Kevin Hayes", rating: 5, text: "Essential bookmark for any web developer." },
    { name: "Rachel Green", rating: 5, text: "The age calculator is so handy. Love the design." },
    { name: "Sam Wilson", rating: 4, text: "Super fast and reliable. SmartGen is my go-to." },
    { name: "Olivia Moore", rating: 5, text: "Finally, a tool site that doesn't look like it's from 1995." },
    { name: "Daniel Lee", rating: 5, text: "The schema generator is a life saver for my blog." },
    { name: "Sophie Martin", rating: 5, text: "Incredible performance. Everything loads instantly." },
    { name: "James Bond", rating: 4, text: "Simple, effective, and free. What more can you ask for?" },
    { name: "Emma Watson", rating: 5, text: "The hashtag generator is brilliant for my social media." },
    { name: "Ryan Gosling", rating: 5, text: "Clean code, clean UI. Respect to the developer." },
    { name: "Natalie Portman", rating: 5, text: "The password generator is very secure and easy." },
    { name: "Chris Evans", rating: 4, text: "Great tools. Looking forward to more updates!" },
    { name: "Scarlett J.", rating: 5, text: "The UTM builder is perfect for my marketing team." },
    { name: "Robert D.", rating: 5, text: "Top-tier quality. Feels like a premium paid service." },
    { name: "Zendaya", rating: 5, text: "I use the word counter every single day. 10/10." },
    { name: "Tom Holland", rating: 4, text: "So many tools in one place. Super convenient." },
    { name: "Gal Gadot", rating: 5, text: "The robots.txt generator is exactly what I needed." },
    { name: "Henry Cavill", rating: 5, text: "Professional and fast. Best in the business." },
    { name: "Margot Robbie", rating: 5, text: "Beautiful design and even better functionality." },
    { name: "Cillian Murphy", rating: 4, text: "Efficient and reliable. Great work on the UI." },
    { name: "Emily Blunt", rating: 5, text: "The meta tag generator helped my site's ranking." },
    { name: "John Krasinski", rating: 5, text: "Everything you need, nothing you don't. Perfect." },
    { name: "Florence Pugh", rating: 5, text: "The color palette extractor is amazing for designers!" }
];

const STORAGE_KEY = 'smartgen_user_review';

// ===== UTILITY FUNCTIONS =====

function generateStars(rating) {
    return '⭐'.repeat(rating);
}

function createReviewCard(review, isNew = false) {
    const card = document.createElement('div');
    card.className = `review-card ${isNew ? 'new-review' : ''}`;
    card.innerHTML = `
        <div class="review-stars">${generateStars(review.rating)}</div>
        <p class="review-text">${escapeHtml(review.text)}</p>
        <p class="review-author">— ${escapeHtml(review.name)}</p>
    `;
    return card;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== MARQUEE INITIALIZATION =====

function initializeMarquee() {
    const track1 = document.getElementById('track-1');
    const track2 = document.getElementById('track-2');
    const track3 = document.getElementById('track-3');

    if (!track1 || !track2 || !track3) return;

    // Get reviews from localStorage or use defaults
    const userReview = getUserReview();
    const allReviews = userReview ? [userReview, ...DEFAULT_REVIEWS] : DEFAULT_REVIEWS;

    // Split reviews into 3 tracks
    const reviewsPerTrack = Math.ceil(allReviews.length / 3);
    const track1Reviews = allReviews.slice(0, reviewsPerTrack);
    const track2Reviews = allReviews.slice(reviewsPerTrack, reviewsPerTrack * 2);
    const track3Reviews = allReviews.slice(reviewsPerTrack * 2);

    // Populate tracks with duplicated cards for seamless loop
    populateTrack(track1, track1Reviews, userReview);
    populateTrack(track2, track2Reviews, userReview);
    populateTrack(track3, track3Reviews, userReview);
}

function populateTrack(trackElement, reviews, userReview) {
    // Clear existing cards
    trackElement.innerHTML = '';

    // Add cards twice for seamless loop
    reviews.forEach(review => {
        const isNew = userReview && review.name === userReview.name && review.text === userReview.text;
        trackElement.appendChild(createReviewCard(review, isNew));
    });

    // Duplicate for seamless scrolling
    reviews.forEach(review => {
        const isNew = userReview && review.name === userReview.name && review.text === userReview.text;
        trackElement.appendChild(createReviewCard(review, isNew));
    });
}

// ===== LOCAL STORAGE FUNCTIONS =====

function getUserReview() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
}

function saveUserReview(review) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(review));
}

// ===== FORM HANDLING =====

function initializeReviewForm() {
    const form = document.getElementById('review-form');
    if (!form) return;

    // Initialize star rating
    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('reviewer-rating');

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.dataset.rating;
            ratingInput.value = rating;

            // Update visual state
            stars.forEach(s => {
                s.classList.remove('active');
                if (s.dataset.rating <= rating) {
                    s.classList.add('active');
                }
            });
        });

        star.addEventListener('mouseover', () => {
            const rating = star.dataset.rating;
            stars.forEach(s => {
                if (s.dataset.rating <= rating) {
                    s.style.opacity = '1';
                    s.style.filter = 'grayscale(0%)';
                } else {
                    s.style.opacity = '0.4';
                    s.style.filter = 'grayscale(100%)';
                }
            });
        });
    });

    // Reset hover state
    document.querySelector('.star-rating').addEventListener('mouseleave', () => {
        const currentRating = ratingInput.value;
        stars.forEach(s => {
            if (s.dataset.rating <= currentRating) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    });

    // Form submission
    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();

    const nameInput = document.getElementById('reviewer-name');
    const ratingInput = document.getElementById('reviewer-rating');
    const textInput = document.getElementById('reviewer-text');

    const review = {
        name: nameInput.value.trim(),
        rating: parseInt(ratingInput.value),
        text: textInput.value.trim()
    };

    // Validate
    if (!review.name || !review.text) {
        alert('Please fill in all fields');
        return;
    }

    // Save to localStorage
    saveUserReview(review);

    // Show success message
    showFormSuccess();

    // Reinitialize marquee to show new review
    initializeMarquee();

    // Reset form
    nameInput.value = '';
    textInput.value = '';
    ratingInput.value = '5';
    document.querySelectorAll('.star').forEach((s, i) => {
        if (i < 5) s.classList.add('active');
        else s.classList.remove('active');
    });
}

function showFormSuccess() {
    const form = document.getElementById('review-form');
    const existingMessage = form.parentElement.querySelector('.form-success');

    if (existingMessage) {
        existingMessage.remove();
    }

    const message = document.createElement('div');
    message.className = 'form-success';
    message.textContent = '✓ Thank you! Your review has been posted and is now scrolling on our marquee.';

    form.parentElement.insertBefore(message, form);

    // Remove message after 5 seconds
    setTimeout(() => {
        message.remove();
    }, 5000);
}

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
    initializeMarquee();
    initializeReviewForm();

    // Set initial star rating to 5
    const stars = document.querySelectorAll('.star');
    stars.forEach((s, i) => {
        if (i < 5) s.classList.add('active');
    });
});
