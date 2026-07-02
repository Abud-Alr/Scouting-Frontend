# Adviesrapport: Responsiviteit Scouting Competentieroos

**Auteur:** Malek Alrajawy  
**Datum:** Juli 2026  
**Project:** Scouting Competentieroos (Keuzedeel Frontend)

---

## 1. Waarom zijn bepaalde beslissingen genomen op bepaalde schermgroottes?

Bij de ontwikkeling van de Scouting Competentieroos webapplicatie is bewust gekozen voor een **Mobile-First benadering**. Omdat uit het doelgroeponderzoek bleek dat de tool voornamelijk gebruikt zal worden door teamleiders via hun smartphone (bijvoorbeeld net na een opkomst of tijdens een overleg), vormde het mobiele ontwerp de basis.

- **Op mobiele schermen (< 768px):** Hier is gekozen voor een één-kolom layout. Elementen vallen onder elkaar om horizontaal scrollen te voorkomen. De navigatie is vereenvoudigd en de focus ligt puur op de inhoud (de sliders en resultaten).
- **Op desktop/tablet schermen (>= 768px):** Hier is de extra schermruimte benut door een twee-kolommen layout te introduceren. Op de 'Assessment' pagina staat de menubalk met taken (Taak 1, 2 en 3) aan de linkerkant als een sticky sidebar, en de vragenlijst rechts. Dit zorgt ervoor dat desktopgebruikers een veel sneller overzicht hebben en makkelijker kunnen navigeren.

## 2. Hoe is ervoor gezorgd dat de applicatie op mobiel goed werkbaar blijft?

De mobiele werkbaarheid (usability) is op de volgende manieren gewaarborgd:

1. **Touch-friendly invoer:** De originele input uit Excel was nummers intypen. Dit is vervangen door 'sliders' (range inputs). Een slider werkt zeer intuïtief op touchscreens met een veegbeweging (swipe).
2. **Grote 'Tap-Targets':** Alle knoppen ("Vorige", "Volgende", "Bekijk Resultaten") zijn ruim opgezet met voldoende *padding*. De hoogte is minimaal 44 pixels, wat de richtlijn is voor vingers op aanraakschermen (gebaseerd op Apple & Google guidelines).
3. **Leesbaarheid:** Op mobiel is het contrast hoog gehouden en is de tekst (Arial/Inter) groot genoeg (minimaal 16px body tekst) zodat inzoomen (`zoom`) niet nodig is.
4. **Radar Chart schaling:** De grafiek (`react-chartjs-2`) past zich op kleine schermen automatisch in de breedte aan dankzij `maintainAspectRatio: false` en CSS-flexibiliteit, zodat de "competentieroos" ook op een klein scherm in één opslag leesbaar is.

## 3. Welke breakpoints/media-queries zijn er gekozen?

Voor de media-queries is gebruik gemaakt van de industriestandaard breakpoints van **Tailwind CSS**. De volgende breakpoints zijn strategisch toegepast in de classes van de applicatie:

- **Geen prefix (Mobile First):** `0px` tot `640px`. De standaard classes zonder breakpoint (`w-full`, `flex-col`, `p-4`) vormen de mobiele layout.
- **`sm:` (Tablet portret):** `>= 640px`. Op dit breakpoint worden kleine aanpassingen gedaan aan marges (bijv. `sm:px-6`).
- **`md:` (Tablet landscape / Kleine laptop):** `>= 768px`. Dit is het **belangrijkste breakpoint** in het project. Hier schakelt het formulier over van een opgestapelde layout naar een layout met een zijbalk (`md:flex-row`, `md:w-64`, `md:grid-cols-2`). 
- **`lg:` (Desktop):** `>= 1024px`. Hier krijgt de applicatie grotere witruimtes en worden dashboard-kaarten ruimer naast elkaar geplaatst voor een premium gevoel.

*Conclusie:* De keuze voor deze standaard Tailwind breakpoints zorgt voor maximale compatibiliteit over vrijwel alle moderne telefoons, tablets en desktopschermen.
