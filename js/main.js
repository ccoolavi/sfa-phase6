// Enhanced Main JavaScript for Sujata Fashion Website
// Complete functionality with video testimonials and Excel integration

// Global variables
let siteData = {
    courses: [],
    products: [],
    rentals: [],
    testimonials: [],
    categories: {},
    currentTab: 'academy'
};

let modalOpen = false;
let currentProductData = null;

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sujata Fashion Website initializing...');
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    try {
        initializeTabs();
        loadExcelData();
        initializeForms();
        initializeModal();
        initializeLanguage();
        initializeWhatsAppFloat();
        
        console.log('Website initialized successfully');
    } catch (error) {
        console.error('Error initializing website:', error);
    }
}

// Tab System
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
}

function switchTab(tabName) {
    // Update active tab button
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update active tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    // Update current tab
    siteData.currentTab = tabName;
    
    // Trigger AOS refresh for animations
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }

    console.log(`Switched to ${tabName} tab`);
}

// Excel Data Loading
async function loadExcelData() {
    try {
        console.log('Loading Excel data...');
        const TESTIMONIALS_CSV_URL = 'https://docs.google.com/spreadsheets/d/1JT5j6xifWkRcaeZIDzQjhB1RArzFEyqxSLQxnAObfms/export?format=csv&gid=1511834451';
        const response = await fetch(TESTIMONIALS_CSV_URL);
        if (response.ok) {
            const csvText = await response.text();
            siteData.testimonials = parseCSV(csvText);
        } else {
            loadSampleData();
        }
        
        // Populate all sections
        populateContent();
        
    } catch (error) {
        console.error('Error loading Excel data:', error);
        loadSampleData();
        populateContent();
    }
}

function parseCSV(csvText) {
    const lines = csvText.split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        const obj = {};
        headers.forEach((h, i) => obj[h] = values[i]);
        return obj;
    });
}
function loadSampleData() {
    console.log('Loading sample data...');
    
    // Sample categories
    siteData.categories = {
        'C1': 'Sarees',
        'C2': 'Kurtas & Suits',
        'C3': 'Blouses',
        'C4': 'Dresses',
        'C5': 'Baby Wear',
        'C6': 'Casual Wear'
    };
    
    // Sample products with proper asset paths
    siteData.products = [
        {
            ProductID: 'S1001',
            Name: 'Elegant Silk Saree',
            Category: 'C1',
            Price: '₹7,990',
            Description: 'Beautiful handwoven silk saree with intricate embroidery work, perfect for special occasions and traditional events.',
            MainImage: 'assets/images/products/S1001/main.jpg',
            Images: 'assets/images/products/S1001/main.jpg,assets/images/products/S1001/detail.jpg,assets/images/products/S1001/model.jpg',
            WhatsAppMessage: 'Hi! I\'m interested in the Elegant Silk Saree (S1001) priced at ₹7,990. Please provide more details.'
        },
        {
            ProductID: 'S1002',
            Name: 'Designer Banarasi Saree',
            Category: 'C1',
            Price: '₹12,500',
            Description: 'Premium Banarasi silk saree with golden zari work and traditional motifs, crafted by skilled artisans.',
            MainImage: 'assets/images/products/S1002/main.jpg',
            Images: 'assets/images/products/S1002/main.jpg,assets/images/products/S1002/detail.jpg',
            WhatsAppMessage: 'Hi! I\'m interested in the Designer Banarasi Saree (S1002) priced at ₹12,500. Please provide more details.'
        },
        {
            ProductID: 'S2001',
            Name: 'Cotton Kurta Set',
            Category: 'C2',
            Price: '₹4,500',
            Description: 'Comfortable cotton kurta with matching palazzo pants, ideal for daily wear and casual outings.',
            MainImage: 'assets/images/products/S2001/main.jpg',
            Images: 'assets/images/products/S2001/main.jpg,assets/images/products/S2001/detail.jpg',
            WhatsAppMessage: 'Hi! I\'m interested in the Cotton Kurta Set (S2001) priced at ₹4,500. Please provide more details.'
        },
        {
            ProductID: 'S2002',
            Name: 'Anarkali Suit Set',
            Category: 'C2',
            Price: '₹8,900',
            Description: 'Stunning Anarkali suit with heavy embroidery and dupatta, perfect for festivities and celebrations.',
            MainImage: 'assets/images/products/S2002/main.jpg',
            Images: 'assets/images/products/S2002/main.jpg,assets/images/products/S2002/detail.jpg,assets/images/products/S2002/model.jpg',
            WhatsAppMessage: 'Hi! I\'m interested in the Anarkali Suit Set (S2002) priced at ₹8,900. Please provide more details.'
        },
        {
            ProductID: 'S3001',
            Name: 'Embroidered Blouse',
            Category: 'C3',
            Price: '₹2,500',
            Description: 'Beautifully embroidered blouse with Aari work, perfect for pairing with sarees and lehengas.',
            MainImage: 'assets/images/products/S3001/main.jpg',
            Images: 'assets/images/products/S3001/main.jpg,assets/images/products/S3001/detail.jpg',
            WhatsAppMessage: 'Hi! I\'m interested in the Embroidered Blouse (S3001) priced at ₹2,500. Please provide more details.'
        },
        {
            ProductID: 'S4001',
            Name: 'Baby Frock',
            Category: 'C5',
            Price: '₹1,200',
            Description: 'Adorable baby frock made with soft cotton fabric, safe and comfortable for your little one.',
            MainImage: 'assets/images/products/S4001/main.jpg',
            Images: 'assets/images/products/S4001/main.jpg,assets/images/products/S4001/detail.jpg',
            WhatsAppMessage: 'Hi! I\'m interested in the Baby Frock (S4001) priced at ₹1,200. Please provide more details.'
        }
    ];
    
    // Sample rentals with proper asset paths
    siteData.rentals = [
        {
            ProductID: 'R1001',
            Name: 'Festival Lehenga Gold',
            Category: 'festival',
            RentalPrice: '₹3,000/week',
            SecurityDeposit: '₹10,000',
            Description: 'Heavy embroidered festival lehenga with golden work, perfect for traditional celebrations and Diwali festivities.',
            MainImage: 'assets/images/rentals/R1001/main.jpg',
            Images: 'assets/images/rentals/R1001/main.jpg,assets/images/rentals/R1001/detail.jpg,assets/images/rentals/R1001/model.jpg',
            WhatsAppMessage: 'Hi! I\'d like to rent the Festival Lehenga Gold (R1001) for ₹3,000/week. Please check availability for my event date.'
        },
        {
            ProductID: 'R1002',
            Name: 'Festival Saree Royal',
            Category: 'festival',
            RentalPrice: '₹2,500/week',
            SecurityDeposit: '₹8,000',
            Description: 'Royal silk saree with intricate zari work, ideal for festival occasions and special celebrations.',
            MainImage: 'assets/images/rentals/R1002/main.jpg',
            Images: 'assets/images/rentals/R1002/main.jpg,assets/images/rentals/R1002/detail.jpg',
            WhatsAppMessage: 'Hi! I\'d like to rent the Festival Saree Royal (R1002) for ₹2,500/week. Please check availability.'
        },
        {
            ProductID: 'R2001',
            Name: 'Wedding Lehenga Premium',
            Category: 'wedding',
            RentalPrice: '₹5,000/week',
            SecurityDeposit: '₹20,000',
            Description: 'Premium wedding lehenga with heavy embroidery and pearl work, designed for the most special day.',
            MainImage: 'assets/images/rentals/R2001/main.jpg',
            Images: 'assets/images/rentals/R2001/main.jpg,assets/images/rentals/R2001/detail.jpg,assets/images/rentals/R2001/model.jpg',
            WhatsAppMessage: 'Hi! I\'d like to rent the Wedding Lehenga Premium (R2001) for ₹5,000/week. Please check availability for my wedding date.'
        },
        {
            ProductID: 'R2002',
            Name: 'Wedding Saree Luxury',
            Category: 'wedding',
            RentalPrice: '₹4,500/week',
            SecurityDeposit: '₹18,000',
            Description: 'Luxurious wedding saree with golden zari and traditional motifs, perfect for bridal occasions.',
            MainImage: 'assets/images/rentals/R2002/main.jpg',
            Images: 'assets/images/rentals/R2002/main.jpg,assets/images/rentals/R2002/detail.jpg',
            WhatsAppMessage: 'Hi! I\'d like to rent the Wedding Saree Luxury (R2002) for ₹4,500/week. Please check availability.'
        }
    ];
    
    // Sample testimonials with video support using asset paths
    siteData.testimonials = [
        {
            ID: 'T001',
            Name: 'Priya Sharma',
            Course: '1 Year Fashion Design',
            Review: 'Amazing experience at Sujata Fashion! The instructors are so knowledgeable and supportive. I learned everything from basic stitching to advanced pattern making.',
            Image: 'assets/images/testimonials/T001/photo.jpg',
            Video: 'assets/videos/testimonials/T001.mp4',
            Rating: 5
        },
        {
            ID: 'T002',
            Name: 'Anita Patel',
            Course: 'Aari Work Course',
            Review: 'Learned so much in the Aari work course. Now I have my own small business! The hands-on training was excellent and very practical.',
            Image: 'assets/images/testimonials/T002/photo.jpg',
            Video: '', // No video for this testimonial
            Rating: 5
        },
        {
            ID: 'T003',
            Name: 'Meera Singh',
            Course: 'Blouse Design Course',
            Review: 'The blouse design course was perfect for me. I can now design and stitch blouses for my family and friends professionally.',
            Image: 'assets/images/testimonials/T003/photo.jpg',
            Video: 'assets/videos/testimonials/T003.mp4',
            Rating: 5
        },
        {
            ID: 'T004',
            Name: 'Kavya Reddy',
            Course: '1 Year Fashion Design',
            Review: 'Best decision ever! The comprehensive fashion design course gave me all the skills I needed to start my own boutique.',
            Image: 'assets/images/testimonials/T004/photo.jpg',
            Video: '', // No video
            Rating: 5
        }
    ];
}

function populateContent() {
    console.log('Populating content...');
    
    try {
        populateProducts();
        populateRentals();
        populateTestimonials();
        populateFilters();
        
        console.log('Content populated successfully');
    } catch (error) {
        console.error('Error populating content:', error);
    }
}

// Product Population
function populateProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    siteData.products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-category', product.Category);
    card.setAttribute('data-aos', 'fade-up');
    
    const images = product.Images ? product.Images.split(',') : [product.MainImage];
    const mainImage = product.MainImage || images[0] || 'assets/images/placeholder.jpg';
    const categoryName = siteData.categories[product.Category] || 'Fashion';
    
    card.innerHTML = `
        <img src="${mainImage}" alt="${product.Name}" class="card-image" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22250%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23f1f5f9%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%2394a3b8%22>Image Loading...</text></svg>'">
        <div class="card-content">
            <div class="card-category">${categoryName}</div>
            <h3 class="card-title">${product.Name}</h3>
            <p class="card-price">${product.Price}</p>
            <p class="card-description">${truncateText(product.Description || '', 100)}</p>
            <button class="card-action" onclick="openProductModal('${product.ProductID}', 'product')">
                View Details
            </button>
        </div>
    `;
    
    return card;
}

// Rental Population
function populateRentals() {
    const rentalsGrid = document.getElementById('rentalsGrid');
    if (!rentalsGrid) return;
    
    rentalsGrid.innerHTML = '';
    
    siteData.rentals.forEach(rental => {
        const rentalCard = createRentalCard(rental);
        rentalsGrid.appendChild(rentalCard);
    });
}

function createRentalCard(rental) {
    const card = document.createElement('div');
    card.className = 'rental-card';
    card.setAttribute('data-category', rental.Category);
    card.setAttribute('data-aos', 'fade-up');
    
    const images = rental.Images ? rental.Images.split(',') : [rental.MainImage];
    const mainImage = rental.MainImage || images[0] || 'assets/images/placeholder.jpg';
    
    card.innerHTML = `
        <img src="${mainImage}" alt="${rental.Name}" class="card-image" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22250%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%23f1f5f9%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%2394a3b8%22>Image Loading...</text></svg>'">
        <div class="card-content">
            <div class="card-category">${rental.Category.toUpperCase()}</div>
            <h3 class="card-title">${rental.Name}</h3>
            <p class="card-price">${rental.RentalPrice}</p>
            <p class="card-description">${truncateText(rental.Description || '', 100)}</p>
            <button class="card-action" onclick="openProductModal('${rental.ProductID}', 'rental')">
                View Details
            </button>
        </div>
    `;
    
    return card;
}

// Testimonials Population with Video Support
function populateTestimonials() {
    const testimonialsContainer = document.getElementById('testimonialsContainer');
    if (!testimonialsContainer) return;
    
    testimonialsContainer.innerHTML = '';
    
    siteData.testimonials.forEach((testimonial, index) => {
        const testimonialCard = createTestimonialCard(testimonial, index);
        testimonialsContainer.appendChild(testimonialCard);
    });
}

function createTestimonialCard(testimonial, index) {
    const card = document.createElement('div');
    card.className = 'testimonial-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index * 100).toString());
    
    const stars = '★'.repeat(testimonial.Rating || 5);
    const image = testimonial.Image || 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="40" cy="40" r="40" fill="%23e2e8f0"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%2394a3b8">👤</text></svg>';
    
    // Check if video exists and is not empty
    const hasVideo = testimonial.Video && testimonial.Video.trim() !== '';
    const videoButton = hasVideo ? 
        `<button class="video-play-btn" onclick="playTestimonialVideo('${testimonial.ID}')" title="Watch video testimonial">
            <i class="fas fa-play"></i>
        </button>` : '';
    
    card.innerHTML = `
        <div class="testimonial-image-container">
            <img src="${image}" alt="${testimonial.Name}" class="testimonial-image" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22><circle cx=%2240%22 cy=%2240%22 r=%2240%22 fill=%22%23e2e8f0%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 fill=%22%2394a3b8%22>👤</text></svg>'">
            ${videoButton}
        </div>
        <div class="testimonial-content">
            <div class="testimonial-rating">${stars}</div>
            <p class="testimonial-text">"${testimonial.Review}"</p>
            <div class="testimonial-author">
                <h4>${testimonial.Name}</h4>
                <p>${testimonial.Course}</p>
            </div>
        </div>
    `;
    
    return card;
}

// Video Testimonial Modal with muted start and sound on open
function playTestimonialVideo(testimonialId) {
    const testimonial = siteData.testimonials.find(t => t.ID === testimonialId);
    if (!testimonial || !testimonial.Video) {
        console.error('Video not found for testimonial:', testimonialId);
        return;
    }
    
    const videoModal = document.getElementById('videoModal');
    const video = document.getElementById('testimonialVideo');
    const videoSource = video.querySelector('source');
    
    if (!videoModal || !video || !videoSource) {
        console.error('Video modal elements not found');
        return;
    }
    
    // Set video source
    videoSource.src = testimonial.Video;
    video.load();
    
    // Configure video properties for testimonials
    video.muted = false; // Sound ON when opened (as requested)
    video.controls = true;
    video.preload = 'metadata';
    
    // Populate testimonial info
    document.getElementById('videoTestimonialName').textContent = testimonial.Name;
    document.getElementById('videoTestimonialCourse').textContent = testimonial.Course;
    document.getElementById('videoTestimonialReview').textContent = `"${testimonial.Review}"`;
    
    // Show modal
    videoModal.style.display = 'block';
    modalOpen = true;
    document.body.style.overflow = 'hidden';
    
    // Play video with sound (auto-play may be blocked by browser)
    setTimeout(() => {
        video.play().catch(error => {
            console.log('Video autoplay prevented by browser policy:', error);
            // This is normal behavior for most browsers
        });
    }, 500);
}

// Filters
function populateFilters() {
    populateProductFilters();
    populateRentalFilters();
}

function populateProductFilters() {
    const filtersContainer = document.querySelector('.category-filters');
    if (!filtersContainer) return;
    
    // Add event listeners for existing buttons
    const filterButtons = filtersContainer.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
}

function populateRentalFilters() {
    const filtersContainer = document.querySelector('.rental-categories');
    if (!filtersContainer) return;
    
    // Add event listeners for existing buttons
    const buttons = filtersContainer.querySelectorAll('.category-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterRentals(category);
        });
    });
}

// Filtering Functions
function filterProducts(category) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Filter products with animation
    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'block';
            product.style.opacity = '0';
            product.setAttribute('data-aos', 'fade-up');
            
            // Fade in animation
            setTimeout(() => {
                product.style.opacity = '1';
                product.style.transform = 'translateY(0)';
            }, 100);
        } else {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        }
    });
    
    // Refresh AOS
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 350);
    }
}

function filterRentals(category) {
    const rentals = document.querySelectorAll('.rental-card');
    const buttons = document.querySelectorAll('.category-btn');
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.category-btn[data-category="${category}"]`).classList.add('active');
    
    // Filter rentals with animation
    rentals.forEach(rental => {
        if (category === 'all' || rental.getAttribute('data-category') === category) {
            rental.style.display = 'block';
            rental.style.opacity = '0';
            rental.setAttribute('data-aos', 'fade-up');
            
            // Fade in animation
            setTimeout(() => {
                rental.style.opacity = '1';
                rental.style.transform = 'translateY(0)';
            }, 100);
        } else {
            rental.style.opacity = '0';
            rental.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                rental.style.display = 'none';
            }, 300);
        }
    });
    
    // Refresh AOS
    if (typeof AOS !== 'undefined') {
        setTimeout(() => {
            AOS.refresh();
        }, 350);
    }
}

// Modal System
function initializeModal() {
    // Product Modal
    const productModal = document.getElementById('productModal');
    const videoModal = document.getElementById('videoModal');
    const enrollmentModal = document.getElementById('enrollmentModal');
    
    // Close buttons
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    // Click outside to close
    [productModal, videoModal, enrollmentModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOpen) {
            closeModal();
        }
    });
}

function openProductModal(productId, type) {
    const modal = document.getElementById('productModal');
    if (!modal) return;
    
    let productData;
    if (type === 'rental') {
        productData = siteData.rentals.find(r => r.ProductID === productId);
    } else {
        productData = siteData.products.find(p => p.ProductID === productId);
    }
    
    if (!productData) {
        console.error('Product not found:', productId);
        return;
    }
    
    currentProductData = { ...productData, type };
    populateProductModal(productData, type);
    
    modal.style.display = 'block';
    modalOpen = true;
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1) translateY(0)';
    }, 10);
}

function populateProductModal(product, type) {
    // Populate product info
    document.getElementById('modalProductName').textContent = product.Name;
    document.getElementById('modalProductCategory').textContent = 
        type === 'rental' ? product.Category.toUpperCase() : 
        siteData.categories[product.Category] || 'Fashion';
    
    const priceElement = document.getElementById('modalProductPrice');
    priceElement.textContent = type === 'rental' ? product.RentalPrice : product.Price;
    
    document.getElementById('modalProductDescription').textContent = product.Description || '';
    
    // Handle images
    const images = product.Images ? product.Images.split(',').map(img => img.trim()) : [product.MainImage];
    const mainImage = images[0] || 'assets/images/placeholder.jpg';
    
    const modalMainImage = document.getElementById('modalMainImage');
    modalMainImage.src = mainImage;
    modalMainImage.onerror = function() {
        this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="100%" height="100%" fill="%23f1f5f9"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%2394a3b8" font-size="18">Image Loading...</text></svg>';
    };
    
    // Populate thumbnails
    const thumbnailsContainer = document.getElementById('imageThumbnails');
    thumbnailsContainer.innerHTML = '';
    
    if (images.length > 1) {
        images.forEach((imgSrc, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imgSrc;
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.alt = `${product.Name} view ${index + 1}`;
            thumbnail.loading = 'lazy';
            thumbnail.onerror = function() {
                this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"><rect width="100%" height="100%" fill="%23f1f5f9"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%2394a3b8" font-size="10">IMG</text></svg>';
            };
            thumbnail.addEventListener('click', () => changeMainImage(imgSrc, thumbnail));
            thumbnailsContainer.appendChild(thumbnail);
        });
    }
    
    // Update WhatsApp button
    const whatsappBtn = document.getElementById('modalWhatsAppBtn');
    const message = product.WhatsAppMessage || 
        `Hi! I'm interested in ${product.Name} (${product.ProductID}). Please provide more details.`;
    const whatsappUrl = `https://wa.me/919763416561?text=${encodeURIComponent(message)}`;
    whatsappBtn.onclick = () => window.open(whatsappUrl, '_blank');
}

function changeMainImage(src, thumbnail) {
    const modalMainImage = document.getElementById('modalMainImage');
    modalMainImage.style.opacity = '0';
    
    setTimeout(() => {
        modalMainImage.src = src;
        modalMainImage.style.opacity = '1';
    }, 150);
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.opacity = '0';
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.9) translateY(20px)';
        }
        
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    });
    
    // Stop any playing videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
    
    modalOpen = false;
    document.body.style.overflow = 'auto';
    currentProductData = null;
}

// Course Functions
function toggleCourse(courseId) {
    const courseElement = document.getElementById(courseId);
    const allCourses = document.querySelectorAll('.course-curriculum');
    const isVisible = courseElement.style.display === 'block';
    
    // Hide all other courses with animation
    allCourses.forEach(course => {
        if (course !== courseElement) {
            course.style.opacity = '0';
            course.style.maxHeight = '0';
            setTimeout(() => {
                course.style.display = 'none';
            }, 300);
        }
    });
    
    // Toggle current course
    if (!isVisible) {
        courseElement.style.display = 'block';
        courseElement.style.opacity = '0';
        courseElement.style.maxHeight = '0';
        
        setTimeout(() => {
            courseElement.style.opacity = '1';
            courseElement.style.maxHeight = '500px';
        }, 10);
    } else {
        courseElement.style.opacity = '0';
        courseElement.style.maxHeight = '0';
        setTimeout(() => {
            courseElement.style.display = 'none';
        }, 300);
    }
}

// FAQ Functions
function toggleFAQ(faqId) {
    const faqElement = document.getElementById('faq' + faqId);
    const faqQuestion = event.target.closest('.faq-question');
    const toggleElement = faqQuestion.querySelector('.faq-toggle');
    const isActive = faqElement.classList.contains('active');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(faq => {
        faq.classList.remove('active');
    });
    document.querySelectorAll('.faq-toggle').forEach(toggle => {
        toggle.textContent = '+';
        toggle.style.transform = 'rotate(0deg)';
    });
    
    // Toggle current FAQ
    if (!isActive) {
        faqElement.classList.add('active');
        toggleElement.textContent = '-';
        toggleElement.style.transform = 'rotate(180deg)';
    }
}

// Forms
function initializeForms() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmission);
    }
}

async function handleContactSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Add timestamp
        data.timestamp = new Date().toISOString();
        data.source = 'Contact Form';
        
        console.log('Form submission:', data);
        
        // Create WhatsApp message
        const message = `New inquiry from Sujata Fashion website:

👤 Name: ${data.name}
📱 Phone: ${data.phone}
📧 Email: ${data.email}
🎓 Course Interest: ${data.course || 'General Inquiry'}
💬 Message: ${data.message}

Sent on: ${new Date().toLocaleString()}`;
        
        const whatsappUrl = `https://wa.me/919763416561?text=${encodeURIComponent(message)}`;
        
        // Show success message
        alert('Thank you for your inquiry! Redirecting to WhatsApp for direct communication...');
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        e.target.reset();
        
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your form. Please try again or contact us directly via WhatsApp.');
    } finally {
        // Restore button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Enrollment Modal Functions
function openEnrollmentModal() {
    const modal = document.getElementById('enrollmentModal');
    modal.style.display = 'block';
    modalOpen = true;
    document.body.style.overflow = 'hidden';
    
    // Add animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1) translateY(0)';
    }, 10);
}

// Language System (placeholder for future enhancement)
function initializeLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            const selectedLang = this.value;
            console.log('Language changed to:', selectedLang);
            // TODO: Implement actual language switching
            // This could load different JSON files or modify text content
        });
    }
}

// WhatsApp Float Button
function initializeWhatsAppFloat() {
    const whatsappFloat = document.querySelector('.whatsapp-float .whatsapp-link');
    if (whatsappFloat) {
        whatsappFloat.href = 'https://wa.me/919763416561?text=Hi! I visited your Sujata Fashion Academy website and would like to know more about your courses and services.';
    }
}

// Utility Functions
function scrollToContact() {
    switchTab('academy');
    setTimeout(() => {
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            contactSection.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }
    }, 300);
    closeModal();
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Smooth scrolling for internal links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Performance optimization - Lazy loading images
function observeImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when content is populated
setTimeout(observeImages, 1000);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
    // Optionally show user-friendly error message
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Export functions for global access
window.switchTab = switchTab;
window.openProductModal = openProductModal;
window.playTestimonialVideo = playTestimonialVideo;
window.closeModal = closeModal;
window.filterProducts = filterProducts;
window.filterRentals = filterRentals;
window.scrollToContact = scrollToContact;
window.toggleCourse = toggleCourse;
window.toggleFAQ = toggleFAQ;
window.openEnrollmentModal = openEnrollmentModal;

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded, initializing website...');
    
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Initialize website
    initializeWebsite();
    
    // Remove loading class after initialization
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 500);
});
