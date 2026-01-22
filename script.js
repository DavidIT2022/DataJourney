// ========================================
// DATA JOURNEY - Interactive Presentation
// Script completo con tutte le interattività
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Loader.init();
    Navigation.init();
    SideMenu.init();
    ProgressBar.init();
    Particles.init();
    CounterAnimation.init();
    VizCards.init();
    ChaosDepartments.init();
    DatabaseStory.init();
    ValueChain.init();
    ZettabytePopup.init();
    PowerBIWorkflow.init();
    StarSchemaPopup.init();
    SpeakerPopup.init();
    ScrollAnimations.init();
    SmoothScroll.init();
    KeyboardNav.init();
    TouchGestures.init();
    AccessibilityCheck.init();
});

// ========================================
// LOADER
// ========================================
const Loader = {
    init() {
        const loader = document.getElementById('loader');
        if (!loader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }, 1200);
        });

        // Fallback
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 2500);
    }
};

// ========================================
// NAVIGATION
// ========================================
const Navigation = {
    init() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        if (!navbar || !navToggle) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            SideMenu.toggle();
        });
    }
};

// ========================================
// SIDE MENU
// ========================================
const SideMenu = {
    menu: null,
    overlay: null,
    navToggle: null,

    init() {
        this.menu = document.getElementById('sideMenu');
        this.overlay = document.getElementById('overlay');
        this.navToggle = document.getElementById('navToggle');
        const menuClose = document.getElementById('menuClose');
        const menuItems = document.querySelectorAll('.menu-items li');

        if (!this.menu || !this.overlay) return;

        if (menuClose) {
            menuClose.addEventListener('click', () => this.close());
        }
        this.overlay.addEventListener('click', () => this.close());

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.setActive(item);
                this.close();

                const target = document.getElementById(section);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        this.setupScrollSpy();
    },

    toggle() {
        this.menu.classList.toggle('open');
        this.overlay.classList.toggle('visible');
    },

    close() {
        this.menu.classList.remove('open');
        this.overlay.classList.remove('visible');
        if (this.navToggle) {
            this.navToggle.classList.remove('active');
        }
    },

    setActive(item) {
        document.querySelectorAll('.menu-items li').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    },

    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id]');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.menu-items li').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.section === current) {
                    item.classList.add('active');
                }
            });
        });
    }
};

// ========================================
// PROGRESS BAR
// ========================================
const ProgressBar = {
    init() {
        const progressBar = document.getElementById('progressBar');
        if (!progressBar) return;

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${progress}%`;
        });
    }
};

// ========================================
// PARTICLES
// ========================================
const Particles = {
    init() {
        const container = document.getElementById('particles');
        if (!container) return;

        const particleCount = 40;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${15 + Math.random() * 10}s`;
            container.appendChild(particle);
        }
    }
};

// ========================================
// COUNTER ANIMATION
// ========================================
const CounterAnimation = {
    init() {
        const counters = document.querySelectorAll('[data-count]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(element) {
        const target = parseInt(element.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }
};

// ========================================
// VIZ CARDS - Interactive Popup
// ========================================
const VizCards = {
    popup: null,
    popupBody: null,

    content: {
        usb: {
            title: '2,5 trilioni di chiavette USB',
            body: `
                <p>Se impilassimo 2,5 trilioni di chiavette USB da 16GB una sull'altra, otterremmo una colonna alta circa <strong>125 milioni di chilometri</strong>.</p>
                <p>Per darti un'idea: la distanza media dalla Terra al Sole è di 150 milioni di km. Quindi questa colonna di chiavette arriverebbe a circa <strong>5/6 del percorso verso il Sole</strong>.</p>
                <p>E questo è solo un anno di dati. L'anno prossimo ne avremo il doppio.</p>
            `
        },
        distance: {
            title: '125 milioni di km verso il Sole',
            body: `
                <p>La luce impiega circa <strong>8 minuti</strong> per viaggiare dal Sole alla Terra.</p>
                <p>Se potessimo viaggiare alla velocità della luce, ci vorrebbero circa <strong>7 minuti</strong> per percorrere la distanza coperta dalla nostra torre di chiavette USB.</p>
                <p>In auto, viaggiando a 130 km/h senza mai fermarsi, ci vorrebbero <strong>110 anni</strong> per percorrere quella distanza.</p>
            `
        },
        trucks: {
            title: '1,5 milioni di TIR',
            body: `
                <p>Se caricassimo tutte queste chiavette USB su camion (circa 1,7 milioni di chiavette per TIR), avremmo bisogno di <strong>1,5 milioni di camion</strong>.</p>
                <p>Messi in fila, questi TIR formerebbero una coda lunga circa <strong>22.500 km</strong> - più della metà della circonferenza della Terra.</p>
                <p>Ogni giorno, il mondo produce abbastanza dati da riempire <strong>4.000 nuovi TIR</strong>.</p>
            `
        },
        time: {
            title: '79.000 anni per contarle',
            body: `
                <p>Se una persona contasse una chiavetta al secondo, 24 ore al giorno, 365 giorni all'anno, ci vorrebbero <strong>79.274 anni</strong> per contarle tutte.</p>
                <p>Per riferimento: l'Homo Sapiens esiste da circa 300.000 anni. Ci vorrebbe un quarto della nostra intera storia come specie solo per <em>contare</em> i dati di un anno.</p>
                <p>E non stiamo parlando di analizzarli, pulirli o usarli. Solo di contarli.</p>
            `
        }
    },

    init() {
        this.popup = document.getElementById('infoPopup');
        this.popupBody = document.getElementById('popupBody');
        if (!this.popup || !this.popupBody) return;

        const vizCards = document.querySelectorAll('.viz-card[data-info]');
        const closeBtn = this.popup.querySelector('.popup-close');

        vizCards.forEach(card => {
            card.addEventListener('click', () => {
                const infoKey = card.dataset.info;
                this.showPopup(infoKey);
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hidePopup());
        }

        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.hidePopup();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('active')) {
                this.hidePopup();
            }
        });
    },

    showPopup(key) {
        const data = this.content[key];
        if (!data) return;

        this.popupBody.innerHTML = `
            <h4>${data.title}</h4>
            ${data.body}
        `;
        this.popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    hidePopup() {
        this.popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

// ========================================
// CHAOS DEPARTMENTS - Interactive Map
// ========================================
const ChaosDepartments = {
    popup: null,
    popupBody: null,

    content: {
        vendite: {
            icon: 'fa-shopping-cart',
            title: 'Reparto Vendite',
            body: `
                <p><strong>12 fogli Excel</strong> diversi per tracciare le vendite.</p>
                <p>Ogni commerciale ha il suo file personale. Nessuno usa lo stesso formato. I dati vengono copiati a mano nel CRM... quando qualcuno si ricorda di farlo.</p>
                <p><strong>Risultato:</strong> Il fatturato mensile varia di €50.000 a seconda di chi lo calcola.</p>
            `,
            problem: '3 versioni diverse del fatturato'
        },
        hr: {
            icon: 'fa-users',
            title: 'Reparto HR',
            body: `
                <p><strong>5 sistemi</strong> diversi: uno per le presenze, uno per le paghe, uno per la formazione, uno per i CV, uno per le ferie.</p>
                <p>Nessuno comunica con gli altri. Per sapere quanti dipendenti ha l'azienda bisogna controllare 3 posti diversi.</p>
                <p><strong>Risultato:</strong> Un'assunzione richiede di inserire gli stessi dati 5 volte.</p>
            `,
            problem: '5 inserimenti per ogni assunzione'
        },
        produzione: {
            icon: 'fa-cogs',
            title: 'Reparto Produzione',
            body: `
                <p><strong>17 file Excel</strong> per tracciare lotti, qualità, macchinari e turni.</p>
                <p>I dati delle macchine vengono trascritti a mano su un quaderno, poi ricopiati in Excel da un operatore.</p>
                <p><strong>Risultato:</strong> Errori di trascrizione nel 15% dei casi. Nessuna tracciabilità reale dei lotti.</p>
            `,
            problem: '15% di errori di trascrizione'
        },
        acquisti: {
            icon: 'fa-boxes',
            title: 'Reparto Acquisti',
            body: `
                <p><strong>8 fornitori</strong> principali, ognuno con formati diversi per fatture, DDT e conferme d'ordine.</p>
                <p>Gli ordini vengono fatti via email, telefono, fax (sì, ancora) e un portale B2B che nessuno sa usare bene.</p>
                <p><strong>Risultato:</strong> Nessuno sa esattamente quanto è stato speso con ciascun fornitore nell'anno.</p>
            `,
            problem: 'Costi fornitori sconosciuti'
        },
        finance: {
            icon: 'fa-calculator',
            title: 'Reparto Finance',
            body: `
                <p>Il povero Finance deve <strong>mettere insieme</strong> tutti i dati degli altri reparti per produrre report.</p>
                <p>Passano 2 settimane solo a raccogliere i dati. Altre 2 settimane a riconciliarli perché non tornano mai. Altre 2 per preparare il report.</p>
                <p><strong>Risultato:</strong> Il report gestionale arriva dopo 2 mesi. Quando arriva, i dati sono già obsoleti.</p>
            `,
            problem: 'Report sempre in ritardo'
        }
    },

    init() {
        this.popup = document.getElementById('deptPopup');
        this.popupBody = document.getElementById('deptPopupBody');
        if (!this.popup || !this.popupBody) return;

        const chaosNodes = document.querySelectorAll('.chaos-node[data-dept]');
        const closeBtn = this.popup.querySelector('.popup-close');

        chaosNodes.forEach(node => {
            node.addEventListener('click', () => {
                const dept = node.dataset.dept;
                this.showPopup(dept);
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hidePopup());
        }

        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.hidePopup();
            }
        });
    },

    showPopup(dept) {
        const data = this.content[dept];
        if (!data) return;

        this.popupBody.innerHTML = `
            <h4><i class="fas ${data.icon}"></i> ${data.title}</h4>
            ${data.body}
            <span class="problem-tag">${data.problem}</span>
        `;
        this.popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    hidePopup() {
        this.popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

// ========================================
// DATABASE STORY - Interactive Timeline
// ========================================
const DatabaseStory = {
    init() {
        const timelineActs = document.querySelectorAll('.timeline-act');
        const actContents = document.querySelectorAll('.act-content');

        if (timelineActs.length === 0) return;

        // Set first act as active
        timelineActs[0].classList.add('active');

        timelineActs.forEach(act => {
            act.addEventListener('click', () => {
                const actNum = act.dataset.act;

                // Update timeline
                timelineActs.forEach(a => a.classList.remove('active'));
                act.classList.add('active');

                // Update content
                actContents.forEach(content => {
                    content.classList.remove('active');
                });

                const targetContent = document.getElementById(`act-${actNum}`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
};

// ========================================
// VALUE CHAIN - Interactive Steps
// ========================================
const ValueChain = {
    init() {
        const chainSteps = document.querySelectorAll('.chain-step');
        const chainDetails = document.querySelectorAll('.chain-detail');

        if (chainSteps.length === 0) return;

        // Set first step as active
        chainSteps[0].classList.add('active');

        chainSteps.forEach(step => {
            step.addEventListener('click', () => {
                const stepNum = step.dataset.step;

                // Update steps
                chainSteps.forEach(s => s.classList.remove('active'));
                step.classList.add('active');

                // Update details
                chainDetails.forEach(detail => {
                    detail.classList.remove('active');
                });

                const targetDetail = document.getElementById(`chain-detail-${stepNum}`);
                if (targetDetail) {
                    targetDetail.classList.add('active');
                }
            });
        });
    }
};

// ========================================
// ZETTABYTE POPUP
// ========================================
const ZettabytePopup = {
    init() {
        const trigger = document.getElementById('zbTrigger');
        const popup = document.getElementById('zbPopup');

        if (!trigger || !popup) return;

        // Open popup
        trigger.addEventListener('click', () => {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close popup - close button
        const closeBtn = popup.querySelector('.popup-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Close popup - click outside
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close popup - ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
};

// ========================================
// POWER BI WORKFLOW - Interactive Popup
// ========================================
const PowerBIWorkflow = {
    popup: null,
    popupBody: null,

    stepContent: {
        connect: {
            title: 'Connetti',
            icon: 'fa-plug',
            subtitle: 'Collegare tutte le fonti dati in un unico punto',
            sections: [
                {
                    title: 'Fonti supportate',
                    icon: 'fa-database',
                    items: [
                        '<strong>Database:</strong> SQL Server, Oracle, MySQL, PostgreSQL',
                        '<strong>File:</strong> Excel, CSV, JSON, XML',
                        '<strong>Cloud:</strong> SharePoint, Salesforce, Google Analytics',
                        '<strong>API:</strong> REST, OData, Web services'
                    ]
                },
                {
                    title: 'Come funziona',
                    icon: 'fa-cogs',
                    items: [
                        'Connessione diretta (live) o importazione dati',
                        'Credenziali gestite in modo sicuro',
                        'Refresh automatici schedulabili'
                    ]
                }
            ],
            example: '<strong>Exempia Food:</strong> Elena collega SAP, Excel vendite e CRM in un unico modello.',
            tip: 'Parti sempre dalle fonti più affidabili.'
        },
        transform: {
            title: 'Trasforma',
            icon: 'fa-magic',
            subtitle: 'Power Query pulisce e prepara i dati',
            sections: [
                {
                    title: 'Operazioni comuni',
                    icon: 'fa-wrench',
                    items: [
                        '<strong>Pulizia:</strong> Rimuovi duplicati, gestisci null',
                        '<strong>Trasformazione:</strong> Pivot, split, merge',
                        '<strong>Arricchimento:</strong> Colonne calcolate, lookup'
                    ]
                },
                {
                    title: 'Linguaggio M',
                    icon: 'fa-code',
                    items: [
                        'Ogni trasformazione è documentata',
                        'Si ri-applica automaticamente ai nuovi dati',
                        'Modificabile per operazioni avanzate'
                    ]
                }
            ],
            example: '<strong>Exempia Food:</strong> Nomi clienti standardizzati da maiuscolo/minuscolo a "Title Case".',
            tip: 'Documenta le trasformazioni: tra 6 mesi non ricorderai perché.'
        },
        model: {
            title: 'Modella',
            icon: 'fa-project-diagram',
            subtitle: 'Creare relazioni tra tabelle: il cuore di Power BI',
            sections: [
                {
                    title: 'Concetti chiave',
                    icon: 'fa-sitemap',
                    items: [
                        '<strong>Star Schema:</strong> Fatti al centro, dimensioni intorno',
                        '<strong>Relazioni:</strong> Collegamenti tramite chiavi (1:N)',
                        '<strong>Filtri:</strong> Si propagano tra le tabelle'
                    ]
                },
                {
                    title: 'Best practice',
                    icon: 'fa-check-circle',
                    items: [
                        'Evita relazioni molti-a-molti',
                        'Usa tabella Calendario dedicata',
                        'Nascondi le colonne ID tecniche'
                    ]
                }
            ],
            example: '<strong>Exempia Food:</strong> Vendite collegate a Clienti, Prodotti, Calendario, Negozi.',
            tip: 'Se non riesci a rispondere facilmente, rivedi il modello.'
        },
        visualize: {
            title: 'Visualizza',
            icon: 'fa-chart-line',
            subtitle: 'Dashboard interattive che raccontano storie',
            sections: [
                {
                    title: 'Visualizzazioni',
                    icon: 'fa-chart-bar',
                    items: [
                        '<strong>Grafici:</strong> Barre, linee, torte, waterfall',
                        '<strong>Tabelle:</strong> Matrici, formattazione condizionale',
                        '<strong>KPI:</strong> Card, gauge, indicatori'
                    ]
                },
                {
                    title: 'Interattività',
                    icon: 'fa-mouse-pointer',
                    items: [
                        '<strong>Cross-filter:</strong> Clicca e tutto si aggiorna',
                        '<strong>Drill-down:</strong> Anno → Mese → Giorno',
                        '<strong>Slicer:</strong> Filtri visivi per selezioni'
                    ]
                }
            ],
            example: '<strong>Exempia Food:</strong> Il CEO clicca "Nord Italia" e vede solo dati del Nord.',
            tip: 'Meno è meglio: scegli 3-5 KPI che contano davvero.'
        },
        share: {
            title: 'Condividi',
            icon: 'fa-share-alt',
            subtitle: 'Portare i dati a chi deve decidere',
            sections: [
                {
                    title: 'Modalità',
                    icon: 'fa-users',
                    items: [
                        '<strong>Web:</strong> Power BI Service, browser',
                        '<strong>Mobile:</strong> App smartphone/tablet',
                        '<strong>Teams:</strong> Integrazione diretta'
                    ]
                },
                {
                    title: 'Sicurezza',
                    icon: 'fa-shield-alt',
                    items: [
                        '<strong>Row-Level Security:</strong> Ogni utente vede solo i suoi dati',
                        '<strong>Workspace:</strong> Ambienti separati per team',
                        '<strong>Audit:</strong> Log di chi ha visto cosa'
                    ]
                }
            ],
            example: '<strong>Exempia Food:</strong> Il dir. vendite Nord vede solo il Nord. Il CEO vede tutto.',
            tip: 'La governance non è burocrazia, è fiducia nei dati.'
        }
    },

    init() {
        this.popup = document.getElementById('powerbiPopup');
        this.popupBody = document.getElementById('powerbiPopupBody');

        if (!this.popup || !this.popupBody) return;

        const workflowSteps = document.querySelectorAll('.workflow-step');

        workflowSteps.forEach(step => {
            step.style.cursor = 'pointer';
            step.addEventListener('click', () => {
                const stepType = step.dataset.step;
                this.showPopup(stepType);
            });
        });

        // Close popup
        const closeBtn = this.popup.querySelector('.popup-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hidePopup());
        }

        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.hidePopup();
            }
        });

        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('active')) {
                this.hidePopup();
            }
        });
    },

    showPopup(stepType) {
        const content = this.stepContent[stepType];
        if (!content) return;

        let html = `
            <h4><i class="fas ${content.icon}"></i> ${content.title}</h4>
            <p class="popup-subtitle">${content.subtitle}</p>
        `;

        content.sections.forEach(section => {
            html += `
                <div class="popup-section">
                    <h5><i class="fas ${section.icon}"></i> ${section.title}</h5>
                    <ul>
                        ${section.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        });

        if (content.example) {
            html += `
                <div class="popup-example">
                    <p>${content.example}</p>
                </div>
            `;
        }

        if (content.tip) {
            html += `
                <div class="popup-tip">
                    <i class="fas fa-lightbulb"></i>
                    <p>${content.tip}</p>
                </div>
            `;
        }

        this.popupBody.innerHTML = html;
        this.popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    hidePopup() {
        this.popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

// ========================================
// STAR SCHEMA POPUP - Interactive Tables
// ========================================
const StarSchemaPopup = {
    popup: null,
    popupBody: null,

    tableData: {
        clienti: {
            title: 'Clienti',
            icon: 'fa-users',
            type: 'dimension',
            role: 'Contiene le informazioni descrittive di ogni cliente: chi sono, dove si trovano, a quale categoria appartengono.',
            columns: ['ClienteID', 'Nome', 'Regione', 'Segmento'],
            rows: [
                ['C001', 'Bar Roma', 'Lazio', 'HoReCa'],
                ['C002', 'Supermercato Verdi', 'Lombardia', 'GDO'],
                ['C003', 'Ristorante Stella', 'Toscana', 'HoReCa']
            ],
            note: 'La chiave ClienteID collega questa tabella alla Fact Table Vendite.'
        },
        prodotti: {
            title: 'Prodotti',
            icon: 'fa-box',
            type: 'dimension',
            role: 'Descrive ogni prodotto venduto: categoria, marca, unità di misura.',
            columns: ['ProdottoID', 'Nome', 'Categoria', 'Marca'],
            rows: [
                ['P001', 'Pasta Spaghetti 500g', 'Pasta', 'Exempia'],
                ['P002', 'Olio EVO 1L', 'Condimenti', 'Exempia'],
                ['P003', 'Sugo Pomodoro 400g', 'Sughi', 'Exempia']
            ],
            note: 'Permette di analizzare le vendite per categoria, marca o singolo prodotto.'
        },
        tempo: {
            title: 'Tempo',
            icon: 'fa-calendar',
            type: 'dimension',
            role: 'La tabella calendario con tutte le gerarchie temporali: giorno, mese, trimestre, anno.',
            columns: ['Data', 'Giorno', 'Mese', 'Anno'],
            rows: [
                ['2024-01-15', 'Lunedì', 'Gennaio', '2024'],
                ['2024-02-20', 'Martedì', 'Febbraio', '2024'],
                ['2024-03-10', 'Domenica', 'Marzo', '2024']
            ],
            note: 'Essenziale per calcoli YTD, confronti anno su anno, trend mensili.'
        },
        negozi: {
            title: 'Negozi',
            icon: 'fa-store',
            type: 'dimension',
            role: 'Informazioni sui punti vendita: ubicazione, tipo, responsabile.',
            columns: ['NegozioID', 'Nome', 'Città', 'Tipo'],
            rows: [
                ['N001', 'Deposito Milano', 'Milano', 'Magazzino'],
                ['N002', 'Filiale Roma', 'Roma', 'Filiale'],
                ['N003', 'Deposito Napoli', 'Napoli', 'Magazzino']
            ],
            note: 'Permette analisi geografiche e per canale di vendita.'
        },
        venditori: {
            title: 'Venditori',
            icon: 'fa-person-dress',
            type: 'dimension',
            role: 'Anagrafica della forza vendita: area di competenza, team, anzianità.',
            columns: ['VenditoreID', 'Nome', 'Area', 'Team'],
            rows: [
                ['V001', 'Marco Bianchi', 'Nord', 'Enterprise'],
                ['V002', 'Laura Verdi', 'Centro', 'SMB'],
                ['V003', 'Giuseppe Rossi', 'Sud', 'Enterprise']
            ],
            note: 'Utile per analizzare le performance individuali e di team.'
        },
        vendite: {
            title: 'Vendite',
            icon: 'fa-table',
            type: 'fact',
            role: 'La Fact Table centrale: contiene ogni transazione con le chiavi per collegare alle dimensioni e le metriche da analizzare.',
            columns: ['ClienteID', 'ProdottoID', 'Data', 'NegozioID', 'VenditoreID', 'Importo'],
            rows: [
                ['C001', 'P001', '2024-01-15', 'N001', 'V001', '€ 1.250'],
                ['C002', 'P002', '2024-02-20', 'N002', 'V002', '€ 3.400'],
                ['C003', 'P003', '2024-03-10', 'N003', 'V003', '€ 890']
            ],
            note: 'Le prime colonne sono chiavi (FK) verso le dimensioni. Importo, Quantità, Margine sono le misure.'
        }
    },

    init() {
        this.popup = document.getElementById('starSchemaPopup');
        this.popupBody = document.getElementById('starSchemaPopupBody');

        if (!this.popup || !this.popupBody) return;

        // Add click handlers to all tables in star schema
        const allTables = document.querySelectorAll('[data-table]');
        allTables.forEach(table => {
            table.addEventListener('click', () => {
                const tableKey = table.dataset.table;
                this.showPopup(tableKey);
            });
        });

        // Close popup
        const closeBtn = this.popup.querySelector('.popup-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hidePopup());
        }

        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.hidePopup();
            }
        });

        // ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.popup.classList.contains('active')) {
                this.hidePopup();
            }
        });
    },

    showPopup(tableKey) {
        const data = this.tableData[tableKey];
        if (!data) return;

        const isFact = data.type === 'fact';
        const tableClass = isFact ? 'fact-table' : 'dim-table';
        const titleClass = isFact ? 'fact-table-title' : '';
        const noteClass = isFact ? 'fact-note' : '';

        let html = `
            <h4 class="${titleClass}"><i class="fas ${data.icon}"></i> ${data.title}</h4>
            <p class="table-role">${data.role}</p>
            <table class="sample-table ${tableClass}">
                <thead>
                    <tr>
                        ${data.columns.map(col => `<th>${col}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${data.rows.map(row => `
                        <tr>
                            ${row.map((cell, i) => `<td${i === 0 ? ' class="key-column"' : ''}>${cell}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="table-note ${noteClass}">
                <i class="fas fa-info-circle"></i>
                ${data.note}
            </div>
        `;

        this.popupBody.innerHTML = html;
        this.popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    hidePopup() {
        this.popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
};

// ========================================
// SPEAKER POPUP
// ========================================
const SpeakerPopup = {
    init() {
        const speakerCard = document.getElementById('speakerCard');
        const popup = document.getElementById('speakerPopup');

        if (!speakerCard || !popup) return;

        // Open popup
        speakerCard.addEventListener('click', () => {
            popup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close popup - close button
        const closeBtn = popup.querySelector('.popup-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Close popup - click outside
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Close popup - ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                popup.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
};

// ========================================
// SCROLL ANIMATIONS
// ========================================
const ScrollAnimations = {
    init() {
        // Animate findings
        const findings = document.querySelectorAll('.finding');
        const findingObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200);
                    findingObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        findings.forEach(finding => findingObserver.observe(finding));

        // Animate general elements
        const animatedElements = document.querySelectorAll(
            '.viz-card, .company-stat, .chaos-node, .workflow-step, .mcp-feature, ' +
            '.question-card, .level-card, .result-item, .action-item, [data-aos]'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';

                    const delay = entry.target.dataset.aosDelay || 0;
                    entry.target.style.transitionDelay = `${delay}ms`;

                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Animate growth bars
        this.initGrowthBars();
    },

    initGrowthBars() {
        const growthBars = document.querySelectorAll('.growth-bar-animated');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const value = bar.dataset.value;
                    const heights = {
                        '20': '60px',
                        '40': '120px',
                        '80': '160px',
                        '160': '200px',
                        '320': '250px'
                    };
                    bar.style.height = '0';
                    setTimeout(() => {
                        bar.style.height = heights[value] || '100px';
                    }, 100);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        growthBars.forEach(bar => {
            bar.style.height = '0';
            observer.observe(bar);
        });
    }
};

// ========================================
// SMOOTH SCROLL
// ========================================
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
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
    }
};

// ========================================
// KEYBOARD NAVIGATION
// ========================================
const KeyboardNav = {
    init() {
        document.addEventListener('keydown', (e) => {
            // ESC to close menus and popups
            if (e.key === 'Escape') {
                SideMenu.close();
                VizCards.hidePopup();
                ChaosDepartments.hidePopup();
            }

            // Arrow keys for section navigation
            const sections = document.querySelectorAll('section[id]');
            const currentSection = Array.from(sections).findIndex(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom > 100;
            });

            if (e.key === 'ArrowDown' && !e.ctrlKey && currentSection < sections.length - 1) {
                // Only if no input is focused
                if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    sections[currentSection + 1].scrollIntoView({ behavior: 'smooth' });
                }
            }

            if (e.key === 'ArrowUp' && !e.ctrlKey && currentSection > 0) {
                if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                    e.preventDefault();
                    sections[currentSection - 1].scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }
};

// ========================================
// TOUCH GESTURES
// ========================================
const TouchGestures = {
    touchStartX: 0,
    touchEndX: 0,

    init() {
        // Disable swipe gestures on mobile - menu is fixed in top bar
        // Swipe was causing unwanted menu opening when interacting with popups
        if (window.innerWidth <= 768) {
            return; // Don't initialize swipe on mobile
        }

        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    },

    handleSwipe() {
        // Only handle swipe on larger screens
        if (window.innerWidth <= 768) return;

        const swipeThreshold = 100;
        const diff = this.touchStartX - this.touchEndX;

        // Swipe left - open menu
        if (diff > swipeThreshold) {
            SideMenu.menu.classList.add('open');
            SideMenu.overlay.classList.add('visible');
        }

        // Swipe right - close menu
        if (diff < -swipeThreshold && SideMenu.menu.classList.contains('open')) {
            SideMenu.close();
        }
    }
};

// ========================================
// ACCESSIBILITY CHECK
// ========================================
const AccessibilityCheck = {
    init() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.scrollBehavior = 'auto';

            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
};

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c📊 Data Journey', 'font-size: 24px; font-weight: bold; color: #1B7B4B;');
console.log('%cIl viaggio del commercialista nell\'era digitale', 'font-size: 14px; color: #64748b;');
console.log('%c---', 'color: #e2e8f0;');
console.log('%cBasato su "The Professional Accountant\'s Role in Data" - CPA Canada & IFAC', 'font-size: 12px; color: #94a3b8;');
