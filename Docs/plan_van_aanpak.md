# Keuzedeel Frontend

# Plan van Aanpak

---

**Auteur:** Malek Alrajawy

---

## Inhoudsopgave

1. [Doelgroep Onderzoek](#1-doelgroep-onderzoek)
2. [Analyse van de Excel documenten](#2-analyse-van-de-excel-documenten)
3. [Verbetering van huidige systeem](#3-verbetering-van-huidige-systeem)
4. [Design](#4-design)
5. [Planning](#5-planning)

---

## 1. Doelgroep Onderzoek

### Wie gaat het systeem gebruiken?

Het Scouting Competentieroos systeem wordt gebruikt door **teamleiders en adviseurs** binnen Scouting Nederland. De doelgroep kan worden onderverdeeld in twee hoofdcategorieën:

#### 1.1 Teamleiding Bevers/Welpen/Scouts (BWS)

- **Leeftijd**: 18-35 jaar (volwassen vrijwilligers)
- **Rol**: Leiding geven aan jeugdgroepen van 5-15 jaar
- **Doel**: Eigen competenties bijhouden, voortgang monitoren richting kwalificatie
- **Technische vaardigheid**: Basis tot gemiddeld, gewend aan smartphones en tablets

#### 1.2 Teamleiding Explorers / Adviseur Roverscouts (ER)

- **Leeftijd**: 20-40 jaar (ervaren vrijwilligers)
- **Rol**: Begeleiden van jongeren 15-21 jaar, coachende rol
- **Doel**: Competenties evalueren en ontwikkelplan opstellen
- **Technische vaardigheid**: Gemiddeld tot gevorderd

#### 1.3 Secundaire gebruikers

- **Groepsbestuur**: Overzicht houden van kwalificatieniveaus binnen de groep
- **Praktijkbegeleiders**: Teamleiders begeleiden in hun ontwikkeling

### Hoe wordt het systeem gebruikt?

| Aspect               | Beschrijving                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Devices**    | Smartphone (60%), tablet (20%), desktop/laptop (20%) — mobiel gebruik is primair, vooral tijdens of na vergaderingen en activiteiten |
| **Frequentie** | Periodiek (maandelijks tot per kwartaal) bij evaluatiemomenten                                                                        |
| **Context**    | Na teamoverleg, tijdens praktijkbegeleiding, bij kwalificatietrajecten                                                                |
| **Doel**       | Score invoeren per competentie, voortgang visualiseren, sterke/zwakke punten identificeren                                            |

### Behoeften van de doelgroep

- **Eenvoud**: Snel scores invullen zonder complexe navigatie
- **Visueel overzicht**: In één oogopslag zien waar je staat (competentieroos/radar chart)
- **Mobiel**: Werkt goed op een telefoon, ook offline (localStorage)
- **Scouting-uitstraling**: Herkenbaar als Scouting-tool (logo, kleuren, sfeer)

---

## 2. Analyse van de Excel Documenten

### 2.1 Overzicht

Er zijn twee Excel-bestanden aangeleverd die het kwalificatiesysteem bevatten:

| Bestand                           | Doelgroep                                  | Competenties    |
| --------------------------------- | ------------------------------------------ | --------------- |
| `Q-TL BWS competentieroos.xlsx` | Teamleiding Bevers/Welpen/Scouts           | 27 competenties |
| `Q-TL ER competentieroos.xlsx`  | Teamleiding Explorers/Adviseur Roverscouts | 27 competenties |

### 2.2 Structuur per Excel-bestand

Elk bestand bevat de volgende werkbladen:

#### Werkbladen per taak (Taak1, Taak2, Taak3)

Elke taak bevat een lijst van competenties met een scoreveld (0-5).

**Taak 1 — Coördinerende en teamgerichte taken** (Hoofdtaak 1):

| Module                                        | Competenties                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------- |
| Module 6: Programmeren                        | Planning taken en werkzaamheden maken                                     |
| Module 7: Motivatietechnieken en groepsproces | Samenwerking, taakverdeling, gezamenlijke verantwoordelijkheid bevorderen |
| Module 8: Veiligheid                          | Daadkracht tonen, leiderschap bij crisis, ongeval afhandeling             |

**Taak 2 — Kwaliteitsbewaking team en activiteitenprogramma** (Hoofdtaak 2):

| Module                             | Competenties                                                    |
| ---------------------------------- | --------------------------------------------------------------- |
| Module 1: Spelvisie en spelaanbod  | Kwaliteit activiteitenprogramma bewaken                         |
| Module 3: Scouting Academy         | Begeleiding nieuwe teamleden, kwaliteit team bewaken/verbeteren |
| Module 4: Leeftijdseigen kenmerken | Leeftijds- en gedragskenmerken verklaren                        |
| Module 10: Gewenst gedrag          | Reflecteren op houding en gedrag                                |
| Module 11: Evalueren               | Teamoverleg en evaluatie                                        |

**Taak 3 — Vertegenwoordiging team binnen en buiten groep** (Hoofdtaak 3):

| Module                                      | Competenties                                               |
| ------------------------------------------- | ---------------------------------------------------------- |
| Module 12: Gespreks- en overlegvaardigheden | Participeren in overleg, taakverdeling, vertegenwoordiging |

#### Score werkblad

Bevat een overzicht met:

- **Per hoofdtaak**: Maximale score, behaalde score, percentage
- **Per module**: Maximale score, behaalde score, percentage
- **Totaalscore**: Optelling van alle scores

#### Totaal werkbladen

- `totaal` — Alle 27 competenties met scores in één lijst
- `totaal-mod` — Competenties gegroepeerd per module met subtotalen
- `totaal-taak` — Competenties gegroepeerd per hoofdtaak met subtotalen

### 2.3 Scoringsysteem

- **Schaal**: 0-5 per competentie
- **Maximale totaalscore**: 100 punten (verdeeld over 27 competenties)
- **Berekening subtotalen**: Sommige competenties worden gemiddeld bij groepering
- **Percentage**: (Behaalde score / Maximale score) × 100%

### 2.4 Verschil BWS vs ER

Het ER-bestand bevat aangepaste competentiebeschrijvingen die meer nadruk leggen op coaching en advisering (passend bij de oudere doelgroep explorers/roverscouts), terwijl BWS meer gericht is op directe leiding.

---

## 3. Verbetering van Huidige Systeem

### 3.1 Problemen met het huidige Excel-systeem

| Probleem                          | Impact                                                           |
| --------------------------------- | ---------------------------------------------------------------- |
| **Niet mobiel-vriendelijk** | Excel is lastig op telefoon/tablet, terwijl 60%+ mobiel gebruikt |
| **Geen visuele feedback**   | Scores zijn alleen cijfers, geen grafische weergave              |
| **Handmatige berekeningen** | Totalen en percentages moeten handmatig bijgehouden worden       |
| **Geen persistentie**       | Bestanden raken kwijt, worden overschreven                       |
| **Niet merkbaar Scouting**  | Excel voelt generiek, geen Scouting-uitstraling                  |
| **Geen vergelijking**       | Moeilijk om voortgang over tijd te volgen                        |

### 3.2 Oplossing: React + Tailwind CSS Webapplicatie

#### Gekozen technologieën

| Technologie                          | Waarom?                                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| **React** (met Vite)           | Component-based architectuur, snelle rendering, groot ecosysteem, herbruikbare componenten |
| **Tailwind CSS**               | Utility-first CSS, snel prototypen, responsive design ingebouwd, consistent design systeem |
| **Chart.js + react-chartjs-2** | Professionele radar/spider charts voor de competentieroos                                  |
| **React Router**               | Client-side routing voor een SPA (Single Page Application)                                 |
| **Framer Motion**              | Vloeiende animaties die de app premium doen aanvoelen                                      |
| **LocalStorage**               | Scores opslaan in de browser, geen server nodig                                            |

#### Verbeteringen ten opzichte van Excel

| Aspect                     | Excel (oud)       | React App (nieuw)                   |
| -------------------------- | ----------------- | ----------------------------------- |
| **Mobiel**           | ❌ Slecht         | ✅ Responsive, touch-friendly       |
| **Visualisatie**     | ❌ Alleen cijfers | ✅ Interactieve radar chart         |
| **Berekeningen**     | ❌ Handmatig      | ✅ Automatisch real-time            |
| **UX**               | ❌ Generiek       | ✅ Scouting huisstijl, animaties    |
| **Opslag**           | ❌ Lokaal bestand | ✅ LocalStorage (persistent)        |
| **Toegankelijkheid** | ❌ Excel nodig    | ✅ Elke browser, elk device         |
| **SEO**              | ❌ N.v.t.         | ✅ Meta tags, keywords, description |

### 3.3 Usability verbeteringen

- **Stapsgewijze invoer**: Per taak competenties invullen met duidelijke voortgangsindicator
- **Directe feedback**: Radar chart update in real-time bij score-aanpassing
- **Kleurcodering**: Groen (goed), oranje (gemiddeld), rood (aandacht nodig)
- **Responsive sliders**: Score invoer met touch-vriendelijke sliders i.p.v. tekstvelden

---

## 4. Design

### 4.1 Huisstijl Scouting Nederland

Volgens de Scouting Nederland huisstijlhandleiding worden de volgende elementen toegepast:

- **Logo**: Scouting Nederland full colour logo met klaverblad en lelie
- **Kleuren**: Rood (#FF0000), Blauw (#1A368D), Geel (#FFFF00), Groen (#31A529)
- **Lettertype**: Arial als basis (huisstijlletter), Impact voor titels
- **Fotografie**: Uitdaging, plezier en herkenbaar Scouting

### 4.2 Wireframes

De applicatie bestaat uit drie hoofdpagina's:

#### Dashboard (Startpagina)

- Hero sectie met Scouting logo en welkomstbericht
- Twee grote kaarten om te kiezen tussen BWS en ER kwalificatiekaart
- Voortgangsindicator als eerder scores zijn ingevuld

#### Beoordeling (Assessment) Pagina

- Zijbalk met taakcategorieën (Taak 1, 2, 3)
- Hoofdgebied met competentie-items en score-invoer (0-5)
- Voortgangsbalk bovenaan

#### Resultaten Pagina

- Grote interactieve radar chart (de "competentieroos")
- Score samenvattingstabel met percentages per module en hoofdtaak
- Export mogelijkheid

*Zie bijgevoegde wireframe afbeelding voor visueel ontwerp.*

---

## 5. Planning

### Overzicht: 3 weken doorlooptijd

#### Week 1: Research & Fundament

| Dag   | Taak                                                          |
| ----- | ------------------------------------------------------------- |
| Ma-Di | Doelgroep onderzoek, Excel analyse, Plan van Aanpak schrijven |
| Wo    | Project opzetten: React + Vite + Tailwind CSS                 |
| Do    | Data structureren uit Excel naar JavaScript objecten          |
| Vr    | Basis componenten: Navbar, Footer, Layout                     |

#### Week 2: Ontwikkeling

| Dag | Taak                                               |
| --- | -------------------------------------------------- |
| Ma  | Dashboard/Landing page bouwen                      |
| Di  | Assessment pagina: competenties per taak           |
| Wo  | Score invoer systeem met sliders, LocalStorage     |
| Do  | Radar chart (competentieroos) component            |
| Vr  | Score overzicht pagina met tabellen en percentages |

#### Week 3: Afronding & Polish

| Dag | Taak                                                   |
| --- | ------------------------------------------------------ |
| Ma  | Responsive design fine-tunen (mobile, tablet, desktop) |
| Di  | SEO implementeren: meta tags, keywords, description    |
| Wo  | Animaties en micro-interacties (Framer Motion)         |
| Do  | Cross-browser testen (Chrome, Firefox, Safari, Edge)   |
| Vr  | README schrijven, laatste tests, oplevering            |

### Milestones

- **Eind week 1**: Werkend project met basis layout en data
- **Eind week 2**: Volledig functionele applicatie met alle features
- **Eind week 3**: Gepolijste, responsive, SEO-geoptimaliseerde applicatie
