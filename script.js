// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

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
                'Promouvoir l\'écoute, le respect et l\'acceptation des différences',
                'Poursuivre et développer les actions solidaires',
                'Favoriser et développer les initiatives culturelles et sportives',
                'Valoriser le bénévolat et renforcer l\'aide aux associations de la commune'
            ]
        },
        '2': {
            icon: 'fas fa-leaf',
            title: 'Environnement et cadre de vie',
            subtitle: 'Préserver notre environnement de manière durable',
            items: [
                'Sensibiliser les jeunes à l\'environnement (école, ateliers, actions concrètes)',
                'Promouvoir le développement des énergies vertes',
                'Lancer des chantiers solidaires participatifs',
                'Mettre en place un plan communal de lutte contre le frelon asiatique',
                'Entretenir les voies publiques, chemins et fossés',
                'Créer un projet "une naissance, un arbre"',
                'Renouveler et développer le mobilier urbain'
            ]
        },
        '3': {
            icon: 'fas fa-shield-alt',
            title: 'Sécurité et prévention',
            subtitle: 'Renforcer la tranquillité publique par la prévention, la vigilance et le dialogue',
            items: [
                'Soutenir la Police Municipale',
                'Sécuriser les voies publiques notamment au pont à l\'entrée du village',
                'Améliorer l\'aménagement et la signalisation sur les routes et les trottoirs',
                'Mettre en place des ateliers de sécurité routière',
                'Déployer un Projet de sécurité civile',
                'Organiser des formations aux premiers secours citoyens-prévention'
            ]
        },
        '4': {
            icon: 'fas fa-comments',
            title: 'Communication et participation citoyenne',
            subtitle: 'Développer une communication claire et accessible',
            items: [
                'Créer un site internet pour un meilleur accès aux informations',
                'Développer les réseaux sociaux municipaux',
                'Mettre en place un panneau d\'affichage d\'informations',
                'Créer une boîte à idées citoyennes (physique et numérique)'
            ]
        },
        '5': {
            icon: 'fas fa-map-marker-alt',
            title: 'Attractivité de la commune',
            subtitle: 'Valoriser notre territoire et son identité',
            items: [
                'Baliser et mettre en avant les sentiers de randonnée',
                'Créer une signalétique claire des commerces et services',
                'Actualiser le plan de la commune',
                'Développer les journées du patrimoine'
            ]
        },
        '6': {
            icon: 'fas fa-hands-helping',
            title: 'Services à la population',
            subtitle: 'Maintenir et améliorer les services de proximité',
            items: [
                'Développer un système d\'échange de savoirs et d\'entraide',
                'Créer une bibliothèque municipale et une boîte à livres',
                'Organiser un forum des entreprises et des commerçants',
                'Mettre en place des achats groupés (bois/pellets...)',
                'Organiser une consultation citoyenne sur les horaires de garderie et crèche'
            ]
        },
        '7': {
            icon: 'fas fa-graduation-cap',
            title: 'Jeunesse',
            subtitle: 'Donner aux jeunes les moyens de s\'épanouir',
            items: [
                'Créer un Conseil municipal Jeunes',
                'Valoriser la participation des jeunes aux activités solidaires',
                'Mettre en place un chèque associations',
                'Aider à la formation BAFA',
                'Développer les animations culturelles, sportives, 2.0...',
                'Poursuivre le développement des activités périscolaires et petite enfance',
                'Proposer des séjours, colonies aux enfants de 6 à 17 ans'
            ]
        },
        '8': {
            icon: 'fas fa-users-between-lines',
            title: 'Lien intergénérationnel',
            subtitle: 'Valoriser la transmission, le respect et le partage entre générations',
            items: [
                'Développer des temps de partage intergénérationnels',
                'Créer un porte drapeau "Jeune" et des actions sur le devoir de mémoire',
                'Proposer un voyage à thème favorisant la transmission des savoirs',
                'Créer un jardin partagé',
                'Favoriser la rencontre aînés/jeunes une fois par mois à la cantine scolaire'
            ]
        },
        '9': {
            icon: 'fas fa-tools',
            title: 'Travaux et grands projets',
            subtitle: 'Préparer la commune de demain',
            items: [
                'Budgétiser et créer un plan de réfection des voiries à moyen terme',
                'Aménager une zone de jeux et de loisirs pour les enfants',
                'Aménager la salle du deuxième étage de l\'école',
                'Déployer raisonnablement la vidéosurveillance aux entrées du village',
                'Engager la réflexion collective à la création d\'un bâtiment communal'
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
                    document.body.style.overflow = 'hidden'; // Empêcher le scroll de la page
                }
            });
        }
    });

    // Fermer la modale
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            programModal.style.display = 'none';
            document.body.style.overflow = ''; // Restaurer le scroll
        });
    }

    // Fermer la modale en cliquant sur l'overlay
    if (programModal) {
        programModal.addEventListener('click', function(e) {
            if (e.target === programModal) {
                programModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Fermer la modale avec la touche Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && programModal.style.display === 'flex') {
            programModal.style.display = 'none';
            document.body.style.overflow = '';
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
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll vers le bas
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Effet parallaxe subtil pour le hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });
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