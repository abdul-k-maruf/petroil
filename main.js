// Compact hamburger toggle (minimal & accessible) — side drawer animation
const t = document.getElementById('nav-toggle');
const m = document.getElementById('nav-menu');

t?.addEventListener('click', () => {
	const open = t.getAttribute('aria-expanded') === 'true';
	t.setAttribute('aria-expanded', String(!open));
	m.classList.toggle('translate-x-full'); // slide in/out
});

// close on nav link click (mobile)
m?.querySelectorAll('a')?.forEach(a => a.addEventListener('click', () => {
	if (window.innerWidth < 1024) { m.classList.add('translate-x-full'); t.setAttribute('aria-expanded', 'false'); }
}));

// close button and swipe-to-close (compact)
const closeBtn = document.getElementById('nav-close');
function closeMenu() { if (!m.classList.contains('translate-x-full')) { m.classList.add('translate-x-full'); t.setAttribute('aria-expanded', 'false'); } }
closeBtn?.addEventListener('click', closeMenu);

// simple swipe-to-close (swipe right inside drawer)
let touchStartX = 0;
m?.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
m?.addEventListener('touchend', e => { const endX = e.changedTouches[0].clientX; if (endX - touchStartX > 50) closeMenu(); });

// Scroll-to-top button (compact)
document.addEventListener('DOMContentLoaded', () => {
	const topBtn = document.getElementById('scroll-top');
	if (!topBtn) return;

	const toggle = () => {
		if (window.scrollY > 200) {
			topBtn.classList.remove('opacity-0', 'translate-y-2', 'pointer-events-none');
			topBtn.classList.add('opacity-100', 'translate-y-0');
		} else {
			topBtn.classList.add('opacity-0', 'translate-y-2', 'pointer-events-none');
			topBtn.classList.remove('opacity-100', 'translate-y-0');
		}
	};

	window.addEventListener('scroll', toggle);
	toggle(); // set initial state

	topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
});

// Contact form modal (compact show/hide + validation)
const openContact = document.getElementById('open-contact');
const contactModal = document.getElementById('contact-modal');
const contactPanel = contactModal?.querySelector('.modal-panel');
const contactClose = document.getElementById('contact-close');
const contactForm = document.getElementById('contact-form');
const contactClear = document.getElementById('contact-clear');

function showContact() {
	contactModal.classList.remove('hidden');
	requestAnimationFrame(() => { contactModal.classList.remove('opacity-0'); contactPanel.classList.remove('scale-95'); });
}
function hideContact() {
	contactModal.classList.add('opacity-0'); contactPanel.classList.add('scale-95');
	contactModal.addEventListener('transitionend', () => contactModal.classList.add('hidden'), { once: true });
}

openContact?.addEventListener('click', () => contactModal.classList.contains('hidden') ? showContact() : hideContact());
contactClose?.addEventListener('click', hideContact);
contactModal?.addEventListener('click', (e) => { if (e.target === contactModal) hideContact(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && contactModal && !contactModal.classList.contains('hidden')) hideContact(); });

contactForm?.addEventListener('submit', (e) => {
	e.preventDefault();
	if (!contactForm.reportValidity()) return; // trigger browser validation
	contactForm.reset();
	hideContact();
});

contactClear?.addEventListener('click', () => contactForm?.reset());
