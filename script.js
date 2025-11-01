(function(){
    const btn = document.getElementById('themeToggle');
    const storageKey = 'site-theme';
    const profileImg = document.getElementById('profileImg');
    
   
    function setInitialTheme() {
        const saved = localStorage.getItem(storageKey);
        if (saved === 'dark') {
            document.body.classList.add('dark');
        } else {
            
            const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark && saved !== 'light') { 
                document.body.classList.add('dark');
            }
        }
        setAria();
        updateProfileImg();
        updatePhrases();
    }

    function setAria(){
        if(!btn) return;
        btn.setAttribute('aria-pressed', document.body.classList.contains('dark'));
    }

    function updateProfileImg(){
        if(!profileImg) return;
        const isDark = document.body.classList.contains('dark');
        const darkSrc = profileImg.dataset.srcDark;
        const lightSrc = profileImg.dataset.srcLight;
        
        
        if(isDark) {
            profileImg.classList.add('img-filter-dark');
        } else {
            profileImg.classList.remove('img-filter-dark');
        }

        if(isDark && darkSrc){
            profileImg.src = darkSrc;
            
            profileImg.onerror = function(){ 
                profileImg.src = lightSrc || 'https://placehold.co/150x150/E2E8F0/4A5568?text=John'; 
            };
        } else {
            if(lightSrc) profileImg.src = lightSrc;
            profileImg.onerror = null;
        }
    }
    
    function updatePhrases(){
        document.querySelectorAll('[data-phrase-light]').forEach(el => {
            const isDark = document.body.classList.contains('dark');
            const light = el.dataset.phraseLight;
            const dark = el.dataset.phraseDark;
            
           
            if (el.parentElement.classList.contains('hero') && el.tagName === 'P') {
                
            }

            if(isDark){
                if(dark != null) el.innerHTML = dark;
            } else {
                if(light != null) el.innerHTML = light;
            }
        });

        
    }

   
    setInitialTheme();

    
    btn && btn.addEventListener('click', function(){
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
        setAria();
        updateProfileImg();
        updatePhrases();
    });

    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        
        if (!localStorage.getItem(storageKey)) {
            if (e.matches) {
                document.body.classList.add('dark');
            } else {
                document.body.classList.remove('dark');
            }
            setAria();
            updateProfileImg();
            updatePhrases();
        }
    });

    
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); 
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; 

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                
                
                const nav = document.querySelector('nav');
                
                const navHeight = nav ? nav.offsetHeight : 0; 
                
                
                const offsetPosition = targetPosition - navHeight;

                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


})();
