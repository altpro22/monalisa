/* ============================================================
   SELLER-DIGITAL 24/7 - CORE ENGINE (PRO ROBUST VERSION)
   ============================================================ */

const SELLER_CONFIG = {
    nombreEmpresa: "Salón Express Mona lisa",
    eslogan: "EXCELENCIA EN CADA DETALLE",
    whatsapp: "524499949188", 
    facebook: "https://www.facebook.com/salon.express.monalisa/",
    instagram: "#",
    youtube: "https://www.youtube.com/watch?v=LT__Y8wGcig",
    msgCita: "Hola, me gustaría agendar una cita para conocer sus servicios VIP.",
    // Cambio: URL con la dirección exacta para Google Maps y el QR
    googleMapsURL: "https://www.google.com/maps/search/?api=1&query=Av.+Monte+Blanco+705,+Villas+de+San+Nicolas,+20015+Aguascalientes,+Ags.", 
    allowedExt: ['.jpg', '.png', '.webp', '.jpeg'],
    logoMarca: "assets/brand/logo-mini.png" 
};

let galleryData = { cat1: [], cat2: [], cat3: [], cat4: [] };
let currentCarouselArray = [];
let currentCarouselIndex = 0;
let isMuted = false;

document.addEventListener('DOMContentLoaded', () => {
    initBusinessData();
    loadGalleries();
    initAudio();
    generateQR();
    initYouTubeAutoMute();
});

function initYouTubeAutoMute() {
    const ytLink = document.getElementById('link-yt');
    if (ytLink) {
        ytLink.addEventListener('click', () => {
            if (!isMuted) toggleAudioGlobal();
        });
    }
}

function toggleAudioGlobal() {
    isMuted = !isMuted;
    const audios = document.querySelectorAll('audio');
    const icon = document.getElementById('audio-icon');
    audios.forEach(a => { a.muted = isMuted; });
    icon.className = isMuted ? "fas fa-volume-mute" : "fas fa-volume-up";
}

function initBusinessData() {
    document.getElementById('business-name').textContent = SELLER_CONFIG.nombreEmpresa;
    document.getElementById('business-slogan').textContent = SELLER_CONFIG.eslogan;
    document.getElementById('modal-business-title').textContent = SELLER_CONFIG.nombreEmpresa;
    document.getElementById('link-yt').href = SELLER_CONFIG.youtube;
    document.getElementById('link-fb').href = SELLER_CONFIG.facebook;
    document.getElementById('link-ig').href = SELLER_CONFIG.instagram;
    document.getElementById('link-wa').href = `https://wa.me/${SELLER_CONFIG.whatsapp}`;
    document.getElementById('link-wa-direct').href = `https://wa.me/${SELLER_CONFIG.whatsapp}?text=${encodeURIComponent(SELLER_CONFIG.msgCita)}`;
}

function openLocation() { playClick(); window.open(SELLER_CONFIG.googleMapsURL, '_blank'); }

function loadGalleries() {
    for (let c = 1; c <= 4; c++) {
        const catKey = `cat${c}`;
        for (let i = 1; i <= 8; i++) { tryLoadImage(catKey, i); }
    }
}

function tryLoadImage(cat, id) {
    let extIdx = 0;
    const attempt = () => {
        if (extIdx >= SELLER_CONFIG.allowedExt.length) return;
        const path = `assets/gallery/${cat}/${id}${SELLER_CONFIG.allowedExt[extIdx]}`;
        const img = new Image();
        img.onload = () => { 
            if(!galleryData[cat].includes(path)){
                galleryData[cat].push(path); 
                renderGrid(`grid-${cat}`, galleryData[cat]); 
            }
        };
        img.onerror = () => { extIdx++; attempt(); };
        img.src = path;
    };
    attempt();
}

function renderGrid(containerId, images) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    images.sort().forEach(src => {
        const div = document.createElement('div');
        div.className = 'premium-photo-item';
        div.innerHTML = `<img src="${src}" style="width:100%; height:100%; object-fit:cover; display:block; border-radius:10px;">`;
        div.onclick = () => openLightbox(src, images);
        container.appendChild(div);
    });
}

function openWAChat() { playClick(); window.open(`https://wa.me/${SELLER_CONFIG.whatsapp}?text=${encodeURIComponent(SELLER_CONFIG.msgCita)}`, '_blank'); }

function initAudio() {
    const spot = document.getElementById('spot-intro');
    if (spot) {
        window.addEventListener('click', () => {
            if (!isMuted) spot.play().catch(() => {});
        }, { once: true });
    }
}

function openProfileZoom() { openLightbox(document.getElementById('profile-pic-img').src); }

function openLightbox(src, contextArray = []) {
    playClick();
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-image');
    img.src = src;
    lb.style.display = 'flex';
    currentCarouselArray = contextArray.length > 0 ? contextArray : [src];
    currentCarouselIndex = currentCarouselArray.indexOf(src);
}

function closeLightbox() { document.getElementById('lightbox').style.display = 'none'; }

function changeLightboxImage(dir) {
    if (currentCarouselArray.length <= 1) return;
    playClick();
    currentCarouselIndex = (currentCarouselIndex + dir + currentCarouselArray.length) % currentCarouselArray.length;
    const img = document.getElementById('lightbox-image');
    img.style.opacity = 0;
    setTimeout(() => { img.src = currentCarouselArray[currentCarouselIndex]; img.style.opacity = 1; }, 150);
}

function showAppContent(type) { playClick(); document.getElementById('dynamic-content-layer').style.display = 'flex'; document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none'); document.getElementById(`${type}-pane`).style.display = 'flex'; }
function closeAppContent() { playClick(); document.getElementById('dynamic-content-layer').style.display = 'none'; }
function openMarketing() { playClick(); document.getElementById('marketing-modal').style.display = 'flex'; }
function closeMarketing() { document.getElementById('marketing-modal').style.display = 'none'; }

function playClick() {
    const snd = document.getElementById('sndFxClick');
    if (snd && !isMuted) { snd.currentTime = 0; snd.play().catch(() => {}); }
}

function generateQR() {
    const qrImg = document.getElementById('qr-code-img');
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(SELLER_CONFIG.googleMapsURL)}`;
}

async function shareExperienceRobust() {
    playClick();
    const data = { title: SELLER_CONFIG.nombreEmpresa, text: SELLER_CONFIG.eslogan, url: "https://altpro22.github.io/monalisa/" };
    try { if (navigator.share) await navigator.share(data); else throw new Error(); } 
    catch { navigator.clipboard.writeText("https://altpro22.github.io/monalisa/"); alert("✅ Enlace de recomendación copiado."); }
}