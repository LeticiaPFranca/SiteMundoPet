document.addEventListener('DOMContentLoaded', function() {
    
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        const mobileMenuIcon = mobileMenuButton.querySelector('i');
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            
            if (isExpanded) {
                mobileMenuIcon.className = 'fas fa-bars text-xl'; 
            } else {
                mobileMenuIcon.className = 'fas fa-times text-xl'; 
            }
        });
    }
    
    const fontIncrease = document.getElementById('font-increase');
    const fontDecrease = document.getElementById('font-decrease');

    const defaultFontSize = 1.0; 
    const step = 0.1;           
    const maxFontSize = 1.4;    
    const minFontSize = 0.8;    
    
    let currentFontSizeRem = parseFloat(localStorage.getItem('fontSize')) || defaultFontSize;

    function setFontSize() {
        document.body.style.fontSize = `${currentFontSizeRem}rem`;
        localStorage.setItem('fontSize', currentFontSizeRem);
    }

    setFontSize(); 

    if (fontIncrease) {
        fontIncrease.addEventListener('click', function() {
            if (currentFontSizeRem < maxFontSize) {
                currentFontSizeRem = Math.min(currentFontSizeRem + step, maxFontSize);
                setFontSize();
            }
        });
    }

    if (fontDecrease) {
        fontDecrease.addEventListener('click', function() {
            if (currentFontSizeRem > minFontSize) {
                currentFontSizeRem = Math.max(currentFontSizeRem - step, minFontSize);
                setFontSize();
            } else if (currentFontSizeRem <= minFontSize) {
                currentFontSizeRem = defaultFontSize;
                setFontSize();
            }
        });
    }

    const highContrast = document.getElementById('high-contrast');
    if (highContrast) {
        highContrast.addEventListener('click', function() {
            document.body.classList.toggle('high-contrast');
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const carousel = document.getElementById('servicos-carousel');
    const navLeft = document.getElementById('nav-right-servicos');
    const navRight = document.getElementById('nav-left-servicos');

    if (carousel && navLeft && navRight) {
        
        const cardWidth = 320; 
        const spacing = 24; 
        const itemWidth = cardWidth + spacing; 

        const scrollAmount = itemWidth * 2; 

        navRight.addEventListener('click', () => {
            const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
            
            if (carousel.scrollLeft + scrollAmount >= maxScrollLeft) {
                carousel.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                carousel.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            }
        });

        navLeft.addEventListener('click', () => {
            
            if (carousel.scrollLeft - scrollAmount <= 0) {
                const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
                carousel.scrollTo({
                    left: maxScrollLeft,
                    behavior: 'smooth'
                });
            } else {
                carousel.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            }
        });
        function checkButtonVisibility() {
            const scrollWidth = carousel.scrollWidth;
            const clientWidth = carousel.clientWidth;

            if (scrollWidth <= clientWidth) {
                navLeft.style.display = 'none';
                navRight.style.display = 'none';
                return;
            }
            navLeft.style.display = 'block';
            navRight.style.display = 'block';
        }
        
        checkButtonVisibility();
        window.addEventListener('resize', checkButtonVisibility);
        
    }
    const appointmentForm = document.querySelector('#agendamento form');
    if (appointmentForm) { 
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Agendamento realizado com sucesso! Entraremos em contato para confirmar.');
            appointmentForm.reset();
        });
    }

    const dateInput = document.getElementById('data'); 
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const desktopSearchInput = document.getElementById('desktop-search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const serviceCards = document.querySelectorAll('.service-card');

    /**

     * @param {string} searchTerm 
     */
    function filterServices(searchTerm) {
        const query = searchTerm.toLowerCase().trim();

        serviceCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            const matches = cardText.includes(query);
            if (matches || query === '') {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
        if (desktopSearchInput && desktopSearchInput.value !== searchTerm) {
            desktopSearchInput.value = searchTerm;
        }
        if (mobileSearchInput && mobileSearchInput.value !== searchTerm) {
            mobileSearchInput.value = searchTerm;
        }
    }
    if (desktopSearchInput) {
        desktopSearchInput.addEventListener('input', (e) => {
            filterServices(e.target.value);
        });
        desktopSearchInput.closest('form').addEventListener('submit', (e) => {
            e.preventDefault();
            filterServices(desktopSearchInput.value);
        });
    }
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
            filterServices(e.target.value);
        });
        mobileSearchInput.closest('form').addEventListener('submit', (e) => {
            e.preventDefault();
            filterServices(mobileSearchInput.value);
        });
    }
});
