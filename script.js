// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Système "Voir plus" pour les descriptions des membres d'équipe
    const memberCards = document.querySelectorAll('.team-member');
    
    memberCards.forEach(card => {
        const description = card.querySelector('.member-description-full');
        
        if (description) {
            // Créer le bouton "Voir plus" s'il n'existe pas déjà
            let seeMoreBtn = card.querySelector('.see-more-btn');
            if (!seeMoreBtn) {
                seeMoreBtn = document.createElement('button');
                seeMoreBtn.className = 'see-more-btn';
                seeMoreBtn.innerHTML = 'Voir plus <span class="icon">▼</span>';
                
                // Insérer le bouton après la description
                description.parentNode.insertBefore(seeMoreBtn, description.nextSibling);
            }
            
            // Vérifier si le contenu nécessite un bouton "Voir plus"
            if (description.scrollHeight <= 200) {
                seeMoreBtn.classList.add('hidden');
                description.style.maxHeight = 'none';
            }
            
            seeMoreBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const icon = seeMoreBtn.querySelector('.icon');
                
                if (description.classList.contains('expanded')) {
                    description.classList.remove('expanded');
                    seeMoreBtn.classList.remove('expanded');
                    seeMoreBtn.innerHTML = 'Voir plus <span class="icon">▼</span>';
                } else {
                    // Fermer toutes les autres descriptions ouvertes
                    memberCards.forEach(otherCard => {
                        const otherDesc = otherCard.querySelector('.member-description-full');
                        const otherBtn = otherCard.querySelector('.see-more-btn');
                        if (otherDesc && otherDesc !== description && otherDesc.classList.contains('expanded')) {
                            otherDesc.classList.remove('expanded');
                            if (otherBtn) {
                                otherBtn.classList.remove('expanded');
                                otherBtn.innerHTML = 'Voir plus <span class="icon">▼</span>';
                            }
                        }
                    });
                    
                    // Ouvrir la description actuelle
                    description.classList.add('expanded');
                    seeMoreBtn.classList.add('expanded');
                    seeMoreBtn.innerHTML = 'Voir moins <span class="icon">▼</span>';
                }
            });
        }
    });

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu quand on clique sur un lien
        document.querySelectorAll('.nav-link').forEach(n => {
            n.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Programme interactif - version modale
    const programItems = document.querySelectorAll('.program-item');
    const programModal = document.getElementById('programModal');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalList = document.getElementById('modalList');
    const closeModalBtn = document.getElementById('closeModal');

    // Données du programme
    const programData = {
        '1': {
            icon: 'fas fa-heart',
            title: 'Vivre ensemble et solidarité',
            subtitle: 'Faire de notre commune un lieu où chacun trouve sa place',
            items: [
                "Promouvoir l'écoute, le respect et l'acceptation des différences (inclusion, lutte contre le harcèlement...).",
                "Valoriser le bénévolat et renforcer l'aide aux associations de la commune.",
                "Favoriser et développer les initiatives culturelles et sportives.",
                "Poursuivre et développer les actions solidaires (Téléthon, Octobre rose, collecte alimentaire...).",
                "Développer un système d'échange de savoirs et d'entraide entre habitants."
            ]
        },
        '2': {
            icon: 'fas fa-leaf',
            title: 'Environnement et cadre de vie',
            subtitle: 'Préserver notre environnement de manière durable',
            items: [
                "Entretenir les voies publiques, chemins et fossés communaux.",
                "Renouveler et développer le mobilier urbain.",
                "Sensibiliser les jeunes à l'environnement (école, ateliers, actions concrètes).",
                "Développer et lancer des chantiers solidaires participatifs (végétalisation, mise en valeur du patrimoine...).",
                "Créer un projet 'une naissance, un arbre'.",
                "Poursuivre la rénovation énergétique des bâtiments communaux.",
                "Préserver les espaces verts et agricoles, et limiter le développement des terrains constructibles.",
                "Mettre en place un plan communal de lutte contre le frelon asiatique."
            ]
        },
        '3': {
            icon: 'fas fa-shield-alt',
            title: 'Sécurité et prévention',
            subtitle: 'Renforcer la tranquillité publique par la prévention, la vigilance et le dialogue',
            items: [
                "Sécuriser les voies publiques aux zones sensibles du village.",
                "Améliorer l'aménagement et la signalisation sur les routes et les trottoirs.",
                "Consolider la coopération avec la police municipale pour une action de proximité efficace.",
                "Mettre en place des ateliers de sécurité routière (prévention, sensibilisation...).",
                "Déployer un Projet de sécurité civile (réserve citoyenne, continuité des services, formations aux premiers secours...)."
            ]
        },
        '4': {
            icon: 'fas fa-bullhorn',
            title: 'Communication et participation citoyenne',
            subtitle: 'Développer une communication claire et accessible',
            items: [
                "Créer un site internet pour un meilleur accès aux informations et aux démarches en ligne (documents, réservation de salle, rendez-vous élus...).",
                "Mettre en place un panneau d'informations numérique connecté.",
                "Créer une boîte à idées citoyennes (physique et numérique).",
                "Réaliser un bilan de mi-mandat pour évaluer les actions menées et en rendre compte.",
                "Continuer la communication active sur les réseaux sociaux."
            ]
        },
        '5': {
            icon: 'fas fa-map-marked-alt',
            title: 'Attractivité de la commune',
            subtitle: 'Valoriser notre territoire et son identité',
            items: [
                "Créer une signalétique claire des commerces et services.",
                "Baliser et mettre en avant les sentiers de randonnée.",
                "Développer les journées du patrimoine (expositions, visites commentées, spectacles...).",
                "Actualiser le plan de la commune."
            ]
        },
        '6': {
            icon: 'fas fa-hands-helping',
            title: 'Services à la population',
            subtitle: 'Maintenir et améliorer les services de proximité',
            items: [
                "Mettre en place des achats et services groupés (bois, pellets, ramonage, composteurs...).",
                "Mettre en place des boîtes à livres et un service de colportage pour les seniors.",
                "Organiser un forum des entreprises et des commerçants.",
                "Consulter les usagers sur les horaires de la garderie et de la crèche."
            ]
        },
        '7': {
            icon: 'fas fa-child',
            title: 'Jeunesse',
            subtitle: 'Donner aux jeunes les moyens de s\'épanouir',
            items: [
                "Créer un Conseil Municipal des Jeunes.",
                "Valoriser la participation des jeunes aux activités solidaires.",
                "Mettre en place un 'chèque associations'",
                "Aider au financement de la formation BAFA.",
                "Poursuivre l’aménagement du plateau d’évolution pour créer une zone multisports accessible à tous.",
                "Développer les animations culturelles, sportives et numériques (2.0).",
                "Poursuivre le développement des activités périscolaires.",
                "Créer un conseil de cantine (élèves, parents, animateurs, élus).",
                "Proposer des séjours et Raids Aventure pour les 6-17 ans."
            ]
        },
        '8': {
            icon: 'fas fa-users',
            title: 'Lien intergénérationnel',
            subtitle: 'Valoriser la transmission, le respect et le partage entre générations',
            items: [
                "Développer des temps de partage (jeux de société, cuisine, ateliers créatifs).",
                "Encourager l'engagement des jeunes comme porte-drapeau.",
                "Tisser des liens autour du devoir de mémoire.",
                "Proposer un voyage à thème favorisant la transmission des savoirs.",
                "Créer un jardin partagé.",
                "Favoriser les rencontres aînés/jeunes mensuelles à la cantine scolaire."
            ]
        },
        '9': {
            icon: 'fas fa-tools',
            title: 'Travaux et grands projets',
            subtitle: 'Préparer la commune de demain',
            items: [
                "Établir un plan de réfection des voiries du village à moyen terme.",
                "Poursuivre les travaux déjà engagés (chicanes, trottoir au bas de la rue de Fouquières, caniveaux, salle Agrestis...)",
                "Aménager une zone de jeux et de loisirs pour les jeunes enfants.",
                "Créer un espace bibliothèque, associatif dans la salle du deuxième étage de l’école.",
                "Étudier la mise en place de la vidéoprotection aux entrées du village.",
                "Lancer une réflexion collective sur la création d'un nouveau bâtiment communal (cantine, espace polyvalent)."
            ]
        },
        '10': {
            icon: 'fas fa-users-cog',
            title: 'Élections Communautaires',
            subtitle: 'Notre engagement pour la Communauté d\'Agglomération',
            items: [
                "Partenariat actif : Faire de notre commune un acteur moteur au sein de l'agglomération.",
                "Proximité : Rendre l'action intercommunale plus lisible et transparente pour les citoyens.",
                "Mutualisation : Optimiser les moyens et compétences pour offrir un meilleur service public."
            ]
        }
    };
    
    programItems.forEach(item => {
        const card = item.querySelector('.program-card');
        if (card) {
            card.addEventListener('click', function() {
                const themeId = item.getAttribute('data-theme');
                const data = programData[themeId];
                
                if (data) {
                    // Mettre à jour le contenu
                    modalIcon.className = data.icon;
                    modalTitle.textContent = data.title;
                    modalSubtitle.textContent = data.subtitle;
                    
                    // Mettre à jour la couleur de l'icône selon le thème
                    const modalIconContainer = modalIcon.parentElement;
                    modalIconContainer.setAttribute('data-theme', themeId);
                    
                    // Créer la liste des items
                    const ul = document.createElement('ul');
                    data.items.forEach(itemText => {
                        const li = document.createElement('li');
                        li.textContent = itemText;
                        ul.appendChild(li);
                    });
                    
                    modalList.innerHTML = '<h3>Nos actions :</h3>';
                    modalList.appendChild(ul);
                    
                    // Afficher la modale
                    programModal.style.display = 'flex';
                    document.body.classList.add('modal-open');
                    
                    // Scroll vers le haut de la modale sur mobile
                    setTimeout(() => {
                        const modalContent = programModal.querySelector('.modal-content');
                        if (modalContent) {
                            modalContent.scrollTop = 0;
                        }
                    }, 100);
                }
            });
        }
    });

    // Fermer la modale
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            programModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        });
    }

    // Fermer la modale en cliquant sur l'overlay
    if (programModal) {
        programModal.addEventListener('click', function(e) {
            if (e.target === programModal) {
                programModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
        });
    }

    // Fermer la modale avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && programModal.style.display === 'flex') {
            programModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });

    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Appliquer l'animation aux éléments
    const animatedElements = document.querySelectorAll('.program-item, .team-member, .idea-card, .info-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Validation simple
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Veuillez remplir tous les champs obligatoires.', 'error');
                return;
            }
            
            if (!data.privacy) {
                showNotification('Veuillez accepter les conditions de confidentialité.', 'error');
                return;
            }

            // Simuler l'envoi (remplacez par votre logique d'envoi réelle)
            showLoadingState(true);
            
            setTimeout(() => {
                showLoadingState(false);
                showNotification('Votre message a été envoyé avec succès ! Nous vous répondrons rapidement.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }

    // Système de notifications
    function showNotification(message, type = 'info') {
        // Supprimer les notifications existantes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Styles pour la notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
            transition: all 0.3s ease;
            transform: translateX(400px);
        `;

        // Couleurs selon le type
        const colors = {
            success: { bg: '#10b981', text: 'white' },
            error: { bg: '#ef4444', text: 'white' },
            info: { bg: '#06b6d4', text: 'white' },
            warning: { bg: '#f59e0b', text: 'white' }
        };

        const color = colors[type] || colors.info;
        notification.style.backgroundColor = color.bg;
        notification.style.color = color.text;

        document.body.appendChild(notification);

        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Gestion de la fermeture
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
            padding: 0;
            line-height: 1;
        `;

        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });

        // Fermeture automatique
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // État de chargement pour le formulaire
    function showLoadingState(loading) {
        const submitBtn = document.querySelector('#contactForm button[type="submit"]');
        if (!submitBtn) return;

        if (loading) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            submitBtn.style.opacity = '0.7';
        } else {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer mon message';
            submitBtn.style.opacity = '1';
        }
    }

    // Smooth scroll pour les liens internes
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

    // Animation du header au scroll
    let lastScrollTop = 0;
    let navbarHidden = false;
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        let navTicking = false;
        window.addEventListener('scroll', function() {
            if (!navTicking) {
                requestAnimationFrame(() => {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    const scrollDiff = scrollTop - lastScrollTop;
                    
                    // Seuil minimum pour éviter le scintillement
                    if (Math.abs(scrollDiff) > 5) {
                        if (scrollDiff > 0 && scrollTop > 100 && !navbarHidden) {
                            // Scroll vers le bas
                            navbar.style.transform = 'translateY(-100%)';
                            navbarHidden = true;
                        } else if (scrollDiff < 0 && navbarHidden) {
                            // Scroll vers le haut
                            navbar.style.transform = 'translateY(0)';
                            navbarHidden = false;
                        }
                        lastScrollTop = scrollTop;
                    }
                    navTicking = false;
                });
                navTicking = true;
            }
        }, { passive: true });
    }

    // Compteur animé (si vous voulez ajouter des statistiques)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 20);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Validation en temps réel du formulaire
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Supprimer les messages d'erreur existants
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        field.classList.remove('invalid');

        // Validation selon le type de champ
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    isValid = false;
                    message = 'Veuillez entrer une adresse email valide.';
                }
                break;
            case 'tel':
                const phoneRegex = /^[0-9\s\-\+\(\)]{10,}$/;
                if (value && !phoneRegex.test(value)) {
                    isValid = false;
                    message = 'Veuillez entrer un numéro de téléphone valide.';
                }
                break;
        }

        // Validation des champs requis
        if (field.required && !value) {
            isValid = false;
            message = 'Ce champ est obligatoire.';
        }

        if (!isValid) {
            field.classList.add('invalid');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }

        return isValid;
    }

    // Filtre pour les idées proposées
    const categoryFilter = document.getElementById('category');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            const selectedCategory = this.value;
            const ideaCards = document.querySelectorAll('.idea-card');
            
            ideaCards.forEach(card => {
                if (!selectedCategory || card.dataset.category === selectedCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
});

// Fonction utilitaire pour formater les données du formulaire
function formatFormData(data) {
    return `
        Nom: ${data.name}
        Email: ${data.email}
        Téléphone: ${data.phone || 'Non renseigné'}
        Catégorie: ${data.category || 'Non spécifiée'}
        Sujet: ${data.subject}
        Message: ${data.message}
        Newsletter: ${data.newsletter ? 'Oui' : 'Non'}
    `;
}

// Gestion des erreurs globales
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
});

// Performance: Lazy loading pour les images (si vous en ajoutez)
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

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Animation scroll progressive pour la section équipe et disparition du hero
(function initTeamScrollAnimation() {
    const teamContent = document.querySelector('.team-content');
    const heroSection = document.querySelector('.hero');
    const teamShowcase = document.querySelector('.team-showcase');
    
    if (!teamContent || !heroSection || !teamShowcase) {
        return;
    }

    // Fonction d'easing pour un effet plus naturel
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    // État de l'animation
    let animationComplete = false;
    let animationThreshold = 0;

    // Appliquer l'état final une seule fois
    function applyFinalState() {
        teamContent.style.setProperty('--photo-width', '70%');
        teamContent.style.setProperty('--text-opacity', '1');
        teamContent.style.setProperty('--text-transform', 'translateX(0)');
        teamContent.style.setProperty('--content-gap', '3rem');
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(-80px)';
        heroSection.style.pointerEvents = 'none';
    }

    function updateTeamLayout() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // Calculer le seuil une fois
        if (animationThreshold === 0) {
            animationThreshold = windowHeight * 0.35;
        }
        
        // Ne pas déclencher sur mobile
        if (window.innerWidth <= 768) {
            teamContent.style.setProperty('--photo-width', '100%');
            teamContent.style.setProperty('--text-opacity', '1');
            teamContent.style.setProperty('--text-transform', 'translateX(0)');
            teamContent.style.setProperty('--content-gap', '2rem');
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'none';
            heroSection.style.pointerEvents = 'auto';
            animationComplete = false;
            return;
        }
        
        // Si l'animation est terminée et on est toujours au-delà du seuil, ne rien faire
        if (animationComplete && scrollY >= animationThreshold) {
            return;
        }
        
        // Si on remonte au-dessus du seuil, réactiver l'animation
        if (scrollY < animationThreshold) {
            animationComplete = false;
        }
        
        // Calcul du progrès
        const progress = Math.min(1, Math.max(0, scrollY / animationThreshold));
        
        // Si on atteint 100%, appliquer l'état final et verrouiller
        if (progress >= 1) {
            if (!animationComplete) {
                applyFinalState();
                animationComplete = true;
            }
            return;
        }
        
        const easedProgress = easeOutCubic(progress);
        
        // Calculer et appliquer les valeurs intermédiaires
        const photoWidth = 100 - (easedProgress * 30);
        const textOpacity = easedProgress;
        const textTransform = 30 - (easedProgress * 30);
        const contentGap = easedProgress * 3;
        
        const heroOpacity = 1 - easedProgress;
        const heroTransform = easedProgress * -80;
        
        teamContent.style.setProperty('--photo-width', `${photoWidth}%`);
        teamContent.style.setProperty('--text-opacity', textOpacity);
        teamContent.style.setProperty('--text-transform', `translateX(${textTransform}px)`);
        teamContent.style.setProperty('--content-gap', `${contentGap}rem`);
        
        heroSection.style.opacity = heroOpacity;
        heroSection.style.transform = `translateY(${heroTransform}px)`;
        heroSection.style.pointerEvents = heroOpacity > 0.1 ? 'auto' : 'none';
    }

    // Throttle pour les performances
    let ticking = false;
    
    function onScroll() {
        // Sortie rapide si animation terminée et on scroll vers le bas
        if (animationComplete && window.scrollY >= animationThreshold) {
            return;
        }
        
        if (!ticking) {
            requestAnimationFrame(() => {
                updateTeamLayout();
                ticking = false;
            });
            ticking = true;
        }
    }

    // Gérer le resize avec debounce
    let resizeTimeout;
    function onResize() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            animationThreshold = 0; // Recalculer le seuil
            animationComplete = false;
            updateTeamLayout();
        }, 100);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    
    // Initialisation
    updateTeamLayout();
})();