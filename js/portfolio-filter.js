document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Filter cards
      portfolioCards.forEach(card => {
        if (filter === 'all') {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.5s ease';
        } else {
          const categories = card.getAttribute('data-category').split(' ');
          if (categories.includes(filter)) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.5s ease';
          } else {
            card.classList.add('hidden');
          }
        }
      });
    });
  });

  // Set initial active state
  filterBtns[0].classList.add('active');
});
