// ナビゲーションメニューのトグル
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // メニューリンクをクリックしたらメニューを閉じる
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // ナビゲーションバーの高さ分を調整
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// フォーム送信処理
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // バリデーション
        if (!name || !email || !message) {
            showMessage('すべての項目を入力してください。', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('正しいメールアドレスを入力してください。', 'error');
            return;
        }
        
        // 送信処理（実際の実装では、サーバーに送信する処理を追加）
        // ここでは、送信成功のシミュレーションを行います
        simulateFormSubmission(name, email, message);
    });
}

// メールアドレスのバリデーション
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// メッセージ表示
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // 3秒後にメッセージを非表示にする
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// フォーム送信のシミュレーション
function simulateFormSubmission(name, email, message) {
    // ローディング状態
    const submitButton = contactForm.querySelector('.btn-submit');
    const originalText = submitButton.textContent;
    submitButton.textContent = '送信中...';
    submitButton.disabled = true;
    
    // 実際の実装では、ここでサーバーにデータを送信します
    // 例: fetch('/api/contact', { method: 'POST', body: formData })
    
    // シミュレーション: 2秒後に成功メッセージを表示
    setTimeout(() => {
        showMessage('お問い合わせありがとうございます。内容を確認次第、ご連絡させていただきます。', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // 成功メッセージ表示後、少しスクロールアップ
        setTimeout(() => {
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }, 2000);
}

// スクロール時のナビゲーションバーのスタイル変更
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// 要素がビューポートに入ったときのアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .value-card, .price-card, .about-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
