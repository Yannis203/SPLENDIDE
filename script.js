// Menu mobile
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileMenuBtn.innerHTML = mainNav.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Fermer le menu mobile en cliquant sur un lien
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mainNav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Navigation active
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Gestion du formulaire

// =============================================
// CALCUL AUTOMATIQUE DES COÛTS
// =============================================

function calculateCost() {
    console.log("Calcul du coût en cours...");
    
    // Récupération des valeurs
    const standardNumber = parseInt(document.getElementById('standardNumber').value) || 0;
    const standardDuration = document.getElementById('standardDuration').value;
    const extraHours = parseInt(document.getElementById('extraHours').value) || 0;
    
    const bilingualNumber = parseInt(document.getElementById('bilingualNumber').value) || 0;
    const bilingualDuration = document.getElementById('bilingualDuration').value;
    
    const specialNumber = parseInt(document.getElementById('specialNumber').value) || 0;
    const specialType = document.getElementById('specialType').value;
    
    const customUniform = document.getElementById('customUniform').checked;
    const supervisor = document.getElementById('supervisor').checked;
    const accessories = document.getElementById('accessories').checked;
    
    // Déclaration des prix
    const PRICES = {
        STANDARD_HALF_DAY: 25,      // 25$/hôtesse pour demi-journée
        STANDARD_FULL_DAY: 30,      // 30$/hôtesse pour journée complète
        STANDARD_EXTRA_HOUR: 5,     // 5$/h/heure supplémentaire
        
        BILINGUAL_HALF_DAY: 35,     // 35$/hôtesse bilingue demi-journée
        BILINGUAL_FULL_DAY: 45,     // 45$/hôtesse bilingue journée complète
        
        SPECIAL_EVENT: 50,          // 50$/hôtesse événement spécial minimum
        
        CUSTOM_UNIFORM: 12.5,       // 12.5$/hôtesse en moyenne pour tenue
        SUPERVISOR: 15              // 15$/jour pour superviseur
    };
    
    // Calcul des coûts
    let totalCost = 0;
    
    // 1. Hôtesses Standard
    if (standardNumber > 0) {
        if (standardDuration === 'demi') {
            totalCost += standardNumber * PRICES.STANDARD_HALF_DAY;
            console.log(`Hôtesses standard (demi-journée): ${standardNumber} × ${PRICES.STANDARD_HALF_DAY}$ = ${standardNumber * PRICES.STANDARD_HALF_DAY}$`);
        } else {
            totalCost += standardNumber * PRICES.STANDARD_FULL_DAY;
            console.log(`Hôtesses standard (journée): ${standardNumber} × ${PRICES.STANDARD_FULL_DAY}$ = ${standardNumber * PRICES.STANDARD_FULL_DAY}$`);
        }
        
        // Heures supplémentaires
        if (extraHours > 0) {
            const extraCost = standardNumber * extraHours * PRICES.STANDARD_EXTRA_HOUR;
            totalCost += extraCost;
            console.log(`Heures supplémentaires: ${standardNumber} × ${extraHours}h × ${PRICES.STANDARD_EXTRA_HOUR}$ = ${extraCost}$`);
        }
    }
    
    // 2. Hôtesses Bilingues
    if (bilingualNumber > 0) {
        if (bilingualDuration === 'demi') {
            totalCost += bilingualNumber * PRICES.BILINGUAL_HALF_DAY;
            console.log(`Hôtesses bilingues (demi-journée): ${bilingualNumber} × ${PRICES.BILINGUAL_HALF_DAY}$ = ${bilingualNumber * PRICES.BILINGUAL_HALF_DAY}$`);
        } else {
            totalCost += bilingualNumber * PRICES.BILINGUAL_FULL_DAY;
            console.log(`Hôtesses bilingues (journée): ${bilingualNumber} × ${PRICES.BILINGUAL_FULL_DAY}$ = ${bilingualNumber * PRICES.BILINGUAL_FULL_DAY}$`);
        }
    }
    
    // 3. Événements Spéciaux
    if (specialNumber > 0) {
        totalCost += specialNumber * PRICES.SPECIAL_EVENT;
        console.log(`Événement spécial (${specialType}): ${specialNumber} × ${PRICES.SPECIAL_EVENT}$ = ${specialNumber * PRICES.SPECIAL_EVENT}$`);
    }
    
    // 4. Suppléments
    const totalHostesses = standardNumber + bilingualNumber + specialNumber;
    
    if (customUniform && totalHostesses > 0) {
        const uniformCost = totalHostesses * PRICES.CUSTOM_UNIFORM;
        totalCost += uniformCost;
        console.log(`Tenue personnalisée: ${totalHostesses} × ${PRICES.CUSTOM_UNIFORM}$ = ${uniformCost}$`);
    }
    
    if (supervisor) {
        totalCost += PRICES.SUPERVISOR;
        console.log(`Superviseur terrain: ${PRICES.SUPERVISOR}$`);
    }
    
    // Arrondi à 2 décimales
    totalCost = Math.round(totalCost * 100) / 100;
    
    console.log(`Coût total estimé: ${totalCost}$`);
    
    // Mise à jour de l'affichage
    document.getElementById('estimatedCost').textContent = totalCost.toFixed(2);
    
    // Animation du changement de coût
    const costElement = document.getElementById('estimatedCost');
    costElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
        costElement.style.transform = 'scale(1)';
    }, 300);
    
    return totalCost;
}

// =============================================
// INITIALISATION ET ÉCOUTEURS D'ÉVÉNEMENTS
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("Initialisation du formulaire de réservation...");
    
    // Calcul initial
    calculateCost();
    
    // 1. Écouteurs pour les champs numériques
    const numberInputs = ['standardNumber', 'extraHours', 'bilingualNumber', 'specialNumber'];
    numberInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', calculateCost);
            input.addEventListener('change', calculateCost);
        }
    });
    
    // 2. Écouteurs pour les sélecteurs
    const selectInputs = ['standardDuration', 'bilingualDuration', 'specialType'];
    selectInputs.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.addEventListener('change', calculateCost);
        }
    });
    
    // 3. Écouteurs pour les checkboxes
    const checkboxInputs = ['customUniform', 'supervisor', 'accessories'];
    checkboxInputs.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', calculateCost);
        }
    });
    
    // 4. Gestion des accessoires (affichage conditionnel)
    const accessoriesCheckbox = document.getElementById('accessories');
    const accessoriesDetails = document.getElementById('accessoriesDetails');
    
    if (accessoriesCheckbox && accessoriesDetails) {
        accessoriesCheckbox.addEventListener('change', function() {
            if (this.checked) {
                accessoriesDetails.style.display = 'block';
                accessoriesDetails.style.animation = 'fadeIn 0.3s ease';
            } else {
                accessoriesDetails.style.display = 'none';
            }
        });
    }
    
    // 5. Validation de la date (aujourd'hui ou futur)
    const eventDateInput = document.getElementById('eventDate');
    if (eventDateInput) {
        const today = new Date().toISOString().split('T')[0];
        eventDateInput.setAttribute('min', today);
        
        eventDateInput.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            
            if (selectedDate < today.setHours(0, 0, 0, 0)) {
                alert("Veuillez sélectionner une date future.");
                this.value = '';
            }
        });
    }
    
    // 6. Animation pour les sections du formulaire
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // 7. Gestion des limites de nombre d'hôtesses
    setupHostessLimits();
});

// =============================================
// VALIDATION DU FORMULAIRE
// =============================================

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    console.log("Soumission du formulaire...");
    
    // Validation des champs obligatoires
    if (!validateForm()) {
        return;
    }
    
    // Récupération des données du formulaire
    const formData = collectFormData();
    
    // Calcul final du coût
    formData.estimatedCost = calculateCost();
    
    // Affichage du récapitulatif
    showSummary(formData);
});

function validateForm() {
    console.log("Validation du formulaire...");
    
    const requiredFields = [
        { id: 'firstName', name: 'Prénom' },
        { id: 'lastName', name: 'Nom' },
        { id: 'email', name: 'Email' },
        { id: 'phone', name: 'Téléphone' },
        { id: 'eventType', name: 'Type d\'événement' },
        { id: 'eventDate', name: 'Date de l\'événement' },
        { id: 'eventLocation', name: 'Lieu de l\'événement' },
        { id: 'standardNumber', name: 'Nombre d\'hôtesses standard' }
    ];
    
    let isValid = true;
    let errorMessage = '';
    
    // Vérification des champs obligatoires
    for (const field of requiredFields) {
        const element = document.getElementById(field.id);
        if (!element || (element.type === 'text' && !element.value.trim()) || 
            (element.type === 'select-one' && !element.value)) {
            isValid = false;
            errorMessage += `• ${field.name} est obligatoire\n`;
            
            // Mise en évidence du champ manquant
            if (element) {
                element.style.borderColor = '#e74c3c';
                element.style.boxShadow = '0 0 0 2px rgba(231, 76, 60, 0.2)';
                
                // Retirer la mise en évidence après 3 secondes
                setTimeout(() => {
                    element.style.borderColor = '';
                    element.style.boxShadow = '';
                }, 3000);
            }
        }
    }
    
    // Vérification du nombre minimum d'hôtesses
    const standardNumber = parseInt(document.getElementById('standardNumber').value) || 0;
    const bilingualNumber = parseInt(document.getElementById('bilingualNumber').value) || 0;
    const specialNumber = parseInt(document.getElementById('specialNumber').value) || 0;
    
    if (standardNumber + bilingualNumber + specialNumber === 0) {
        isValid = false;
        errorMessage += "• Vous devez sélectionner au moins une hôtesse\n";
    }
    
    // Vérification des conditions générales
    const termsAccepted = document.getElementById('terms').checked;
    if (!termsAccepted) {
        isValid = false;
        errorMessage += "• Vous devez accepter les conditions générales\n";
        document.getElementById('terms').parentElement.style.color = '#e74c3c';
    }
    
    // Afficher les erreurs si nécessaire
    if (!isValid) {
        alert("Veuillez corriger les erreurs suivantes :\n\n" + errorMessage);
        return false;
    }
    
    return true;
}

function collectFormData() {
    console.log("Collecte des données du formulaire...");
    
    return {
        // Informations personnelles
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        company: document.getElementById('company').value.trim(),
        
        // Informations sur l'événement
        eventType: document.getElementById('eventType').value,
        eventDate: document.getElementById('eventDate').value,
        eventLocation: document.getElementById('eventLocation').value.trim(),
        
        // Hôtesses standard
        standardNumber: parseInt(document.getElementById('standardNumber').value) || 0,
        standardDuration: document.getElementById('standardDuration').value,
        extraHours: parseInt(document.getElementById('extraHours').value) || 0,
        
        // Hôtesses bilingues
        bilingualNumber: parseInt(document.getElementById('bilingualNumber').value) || 0,
        bilingualDuration: document.getElementById('bilingualDuration').value,
        
        // Événements spéciaux
        specialNumber: parseInt(document.getElementById('specialNumber').value) || 0,
        specialType: document.getElementById('specialType').value,
        
        // Suppléments
        customUniform: document.getElementById('customUniform').checked,
        supervisor: document.getElementById('supervisor').checked,
        accessories: document.getElementById('accessories').checked,
        accessoriesDescription: document.getElementById('accessoriesDescription')?.value.trim() || '',
        
        // Message
        message: document.getElementById('message').value.trim(),
        
        // Date de soumission
        submissionDate: new Date().toISOString(),
        
        // Statut
        status: 'pending'
    };
}

// =============================================
// AFFICHAGE DU RÉCAPITULATIF
// =============================================

function showSummary(formData) {
    console.log("Affichage du récapitulatif...");
    
    // Formater la date
    const eventDate = new Date(formData.eventDate);
    const formattedDate = eventDate.toLocaleDateString('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Calculer le nombre total d'hôtesses
    const totalHostesses = formData.standardNumber + formData.bilingualNumber + formData.specialNumber;
    
    // Créer le message de récapitulatif
    let summary = `
    ===========================================
    RÉCAPITULATIF DE VOTRE DEMANDE
    ===========================================
    
    INFORMATIONS PERSONNELLES
    -------------------------
    Nom complet : ${formData.firstName} ${formData.lastName}
    Email : ${formData.email}
    Téléphone : ${formData.phone}
    Entreprise : ${formData.company || 'Non spécifié'}
    
    INFORMATIONS SUR L'ÉVÉNEMENT
    ----------------------------
    Type d'événement : ${getEventTypeLabel(formData.eventType)}
    Date : ${formattedDate}
    Lieu : ${formData.eventLocation}
    
    DÉTAIL DES HÔTESSES
    -------------------
    Hôtesses standard : ${formData.standardNumber} (${getDurationLabel(formData.standardDuration)})
    ${formData.extraHours > 0 ? `Heures supplémentaires : ${formData.extraHours}h` : ''}
    
    Hôtesses bilingues : ${formData.bilingualNumber} (${getDurationLabel(formData.bilingualDuration)})
    
    Événement spécial : ${formData.specialNumber} (${getSpecialTypeLabel(formData.specialType)})
    
    TOTAL HÔTESSES : ${totalHostesses}
    
    SUPPLÉMENTS
    -----------
    ${formData.customUniform ? '✓ Tenue personnalisée\n' : ''}
    ${formData.supervisor ? '✓ Superviseur terrain\n' : ''}
    ${formData.accessories ? `✓ Accessoires : ${formData.accessoriesDescription || 'Non spécifié'}\n` : ''}
    
    COÛT ESTIMÉ
    ------------
    ${formData.estimatedCost.toFixed(2)} $
    
    MESSAGE SUPPLÉMENTAIRE
    ----------------------
    ${formData.message || 'Aucun message'}
    
    ===========================================
    Votre demande a été enregistrée avec succès !
    Notre équipe vous contactera dans les 24h.
    ===========================================
    `;
    
    // Afficher le récapitulatif
    alert(summary);
    
    // Sauvegarder la réservation (dans localStorage pour l'instant)
    saveReservation(formData);
    
    // Réinitialiser le formulaire
    resetForm();
}

// =============================================
// FONCTIONS UTILITAIRES
// =============================================

function getEventTypeLabel(value) {
    const types = {
        'salon': 'Salon professionnel',
        'conference': 'Conférence / Congrès',
        'product': 'Lancement de produit',
        'reception': 'Réception / Soirée',
        'gala': 'Gala / Événement spécial',
        'other': 'Autre'
    };
    return types[value] || value;
}

function getDurationLabel(value) {
    return value === 'demi' ? 'Demi-journée (≤ 4h)' : 'Journée complète (5h à 8h)';
}

function getSpecialTypeLabel(value) {
    const types = {
        'soiree': 'Soirée',
        'conference': 'Conférence',
        'gala': 'Gala'
    };
    return types[value] || value;
}

function saveReservation(reservation) {
    console.log("Sauvegarde de la réservation...");
    
    try {
        // Récupérer les réservations existantes
        let reservations = JSON.parse(localStorage.getItem('prestigeReservations')) || [];
        
        // Ajouter un ID unique
        reservation.id = Date.now();
        reservation.status = 'pending';
        reservation.createdAt = new Date().toISOString();
        
        // Ajouter la nouvelle réservation
        reservations.push(reservation);
        
        // Sauvegarder
        localStorage.setItem('prestigeReservations', JSON.stringify(reservations));
        
        console.log("Réservation sauvegardée avec ID:", reservation.id);
        return true;
    } catch (error) {
        console.error("Erreur lors de la sauvegarde:", error);
        return false;
    }
}

function resetForm() {
    console.log("Réinitialisation du formulaire...");
    
    document.getElementById('bookingForm').reset();
    
    // Réinitialiser l'affichage des accessoires
    const accessoriesDetails = document.getElementById('accessoriesDetails');
    if (accessoriesDetails) {
        accessoriesDetails.style.display = 'none';
    }
    
    // Réinitialiser le coût estimé
    calculateCost();
    
    // Message de succès
    setTimeout(() => {
        alert("Votre demande a bien été enregistrée !\n\nUn email de confirmation vous a été envoyé (simulation).\n\nNotre équipe vous contactera sous 24h pour finaliser votre réservation.");
    }, 500);
}

function setupHostessLimits() {
    // Limiter le nombre maximum d'hôtesses
    const maxHostesses = 50;
    
    const hostessInputs = ['standardNumber', 'bilingualNumber', 'specialNumber'];
    
    hostessInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('change', function() {
                if (parseInt(this.value) > maxHostesses) {
                    alert(`Le nombre maximum d'hôtesses est de ${maxHostesses}.`);
                    this.value = maxHostesses;
                    calculateCost();
                }
            });
        }
    });
}

// =============================================
// ANIMATIONS CSS (à ajouter dans votre CSS)
// =============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .cost-estimation {
        transition: all 0.3s ease;
    }
    
    .cost-estimation.updated {
        animation: pulse 0.5s ease;
        background-color: #f8f9fa;
    }
`;
document.head.appendChild(style);

// =============================================
// GESTION DES ERREURS
// =============================================

window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.message);
    console.error('Fichier:', e.filename);
    console.error('Ligne:', e.lineno);
    
    // Afficher un message d'erreur utilisateur-friendly
    if (e.message.includes('document.getElementById')) {
        console.warn('Un élément du formulaire est introuvable. Vérifiez les IDs des champs.');
    }
});

// =============================================
// EXPORT DES FONCTIONS POUR DEBUG
// =============================================

// Exposer les fonctions pour le débogage
window.reservationForm = {
    calculateCost,
    validateForm,
    collectFormData,
    saveReservation,
    resetForm
};

console.log("Module de réservation chargé avec succès!");
// Changement de style du header au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '0';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
    }
});