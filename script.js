document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('booking-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const carDetailsModal = document.getElementById('car-details-modal');
    const carDetails = document.getElementById('car-details');
    const closeDetails = document.querySelector('.close-details');
    const carGrid = document.getElementById('car-grid');
    const carSelect = document.getElementById('car');
    const searchInput = document.getElementById('search');
    const priceRangeSelect = document.getElementById('price-range');
    const ratingSelect = document.getElementById('rating');

    const cars = [
        { id: 1, name: 'Car Model 1', image: 'car1.jpg', description: 'A luxurious car with advanced features and comfort.', price: '$30,000', rating: 4.5, feedback: ['Great car, very comfortable!', 'Luxury at its best.'] },
        { id: 2, name: 'Car Model 2', image: 'car2.jpg', description: 'A high-performance car built for speed and agility.', price: '$45,000', rating: 4.8, feedback: ['Amazing speed and handling.', 'Perfect for sports enthusiasts.'] },
        { id: 3, name: 'Car Model 3', image: 'car3.jpg', description: 'An elegant and stylish car for a sophisticated experience.', price: '$35,000', rating: 4.6, feedback: ['Elegant design and smooth drive.', 'Love the stylish look!'] },
        { id: 4, name: 'Car Model 4', image: 'car4.jpg', description: 'Adventure and ruggedness combined for off-road experiences.', price: '$40,000', rating: 4.7, feedback: ['Perfect for off-road adventures.', 'Rugged and reliable.'] },
        { id: 5, name: 'Car Model 5', image: 'car5.jpg', description: 'Comfort and efficiency for everyday driving.', price: '$28,000', rating: 4.4, feedback: ['Comfortable and fuel-efficient.', 'Great value for the money.'] }
    ];

    // Populate car selection
    cars.forEach(car => {
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = car.name;
        carSelect.appendChild(option);
    });

    // Display cars in grid
    function displayCars(filteredCars) {
        carGrid.innerHTML = '';
        filteredCars.forEach(car => {
            const carCard = document.createElement('div');
            carCard.className = 'car-card';
            carCard.dataset.carId = car.id;
            carCard.innerHTML = `
                <img src="${car.image}" alt="${car.name}">
                <h3>${car.name}</h3>
                <p>${car.description}</p>
                <p><strong>Price:</strong> ${car.price}</p>
                <div class="rating">${'★'.repeat(Math.floor(car.rating))}${'☆'.repeat(5 - Math.floor(car.rating))}</div>
                <button class="more-details-btn btn">More Details</button>
            `;
            carGrid.appendChild(carCard);
        });
    }

    displayCars(cars);

    // Handle search input
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredCars = cars.filter(car => car.name.toLowerCase().includes(searchTerm));
        displayCars(filteredCars);
    });

    // Handle filters
    function filterCars() {
        const priceRange = priceRangeSelect.value.split('-');
        const minPrice = priceRange[0] === 'all' ? 0 : parseInt(priceRange[0]);
        const maxPrice = priceRange[1] === undefined ? Infinity : parseInt(priceRange[1]);
        const minRating = parseFloat(ratingSelect.value) || 0;

        const filteredCars = cars.filter(car => {
            const carPrice = parseInt(car.price.replace(/[^0-9]/g, ''));
            return carPrice >= minPrice && carPrice <= maxPrice && car.rating >= minRating;
        });

        displayCars(filteredCars);
    }

    priceRangeSelect.addEventListener('change', filterCars);
    ratingSelect.addEventListener('change', filterCars);

    // Handle booking form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Display the confirmation message
        confirmationMessage.textContent = 'Booking Confirmed!';
        confirmationMessage.classList.add('show');

        // Optionally, clear the form
        form.reset();
    });

    // Handle "More Details" button clicks
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('more-details-btn')) {
            const carId = event.target.closest('.car-card').dataset.carId;
            const carDetail = cars.find(car => car.id == carId);

            carDetails.innerHTML = `
                <h3>Details:</h3>
                <p>${carDetail.description}</p>
                <p><strong>Price:</strong> ${carDetail.price}</p>
                <div class="rating">
                    <h4>Rating:</h4>
                    <span>${'★'.repeat(Math.floor(carDetail.rating))}${'☆'.repeat(5 - Math.floor(carDetail.rating))}</span>
                </div>
                <div class="feedback">
                    <h4>Feedback:</h4>
                    ${carDetail.feedback.map(f => `<div class="feedback-item">${f}</div>`).join('')}
                </div>
            `;
            carDetailsModal.style.display = 'block';
        }
    });

    // Close modal
    closeDetails.addEventListener('click', () => {
        carDetailsModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === carDetailsModal) {
            carDetailsModal.style.display = 'none';
        }
    });

    // Add a scroll effect to change navbar color on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    
    

});
