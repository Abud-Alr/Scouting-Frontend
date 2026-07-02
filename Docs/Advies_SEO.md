# Adviesrapport: Zoekmachine Optimalisatie (SEO)

**Auteur:** Malek Alrajawy  
**Datum:** Juli 2026  
**Project:** Scouting Competentieroos (Keuzedeel Frontend)

---

## 1. Hoe kan de klant meer bezoekers trekken naar de website?

Om organisch meer bezoekers naar de *Scouting Competentieroos* te trekken, is het belangrijk om actief te werken aan het promoten en koppelen van de tool. Adviezen hiervoor zijn:

- **Backlink Profiel Opbouwen:** Plaats links naar deze webapplicatie vanaf vertrouwde Scouting domeinen, zoals de landelijke `scouting.nl` website of regionale groepswebsites. Hoe meer relevante, kwalitatieve externe links er naar de tool wijzen, hoe hoger Google de pagina zal ranken.
- **Content Marketing / Bloggen:** Creëer extra pagina's (bijv. een blog) die specifiek uitleg geven over leiderschapsontwikkeling, kwalificatiekaarten, en competentieontwikkeling binnen Scouting. Mensen die zoeken naar termen als "hoe word ik teamleider scouting" zullen hierdoor de website makkelijker vinden.
- **Social Media Integratie:** Deel de tool via Facebook-groepen en Instagram-kanalen die veel gebruikt worden door Scouting vrijwilligers. Omdat de app al is voorzien van *Open Graph* (OG) meta-tags in de `index.html`, worden URL-shares prachtig weergegeven met een titel en beschrijving.

## 2. Welke punten kunnen aan de website verbeterd worden voor SEO?

Hoewel er een solide basis is gelegd in de `index.html` (met de title tag, description en keywords), zijn er nog technische en contentmatige verbeterslagen mogelijk:

- **Server-Side Rendering (SSR) of Static Site Generation (SSG):** De huidige app is een Single Page Application (SPA) gebouwd met React (Vite). Hierdoor wordt alle HTML in de browser met JavaScript gegenereerd. Dit is soms lastiger voor zoekmachines om snel in te lezen. Een overstap naar frameworks zoals Next.js zou de content direct als HTML serveren, wat aanzienlijk beter is voor SEO.
- **Toevoegen van Sitemap en Robots.txt:** Een `sitemap.xml` helpt zoekmachines zoals Google om de structuur van de pagina's goed te begrijpen. Een `robots.txt` stuurt aan welke pagina's (bijv. de dashboard en introductie) de webcrawlers wél of niet mogen lezen.
- **Meer tekst (Content-to-Code ratio):** Op dit moment is de website vooral erg functioneel. Voor goede SEO is het raadzaam om op de landingspagina meer uitgebreide tekstuele context te bieden over wat de Competentieroos precies inhoudt. Zoekmachines hebben tekst nodig om de relevantie te kunnen meten.
- **Gestructureerde Data (Schema.org):** Door rich snippets (JSON-LD) toe te voegen, begrijpt Google dat het hier gaat om een (web)applicatie voor onderwijs/beoordeling, waardoor het specifieker uitgelicht kan worden in zoekresultaten.

## 3. Welke tools zou de klant kunnen gebruiken om SEO te meten?

Om de vindbaarheid continu te monitoren en te optimaliseren, worden de volgende gratis en betaalde tools aangeraden:

1. **Google Search Console (Gratis):** De belangrijkste tool. Laat exact zien op welke zoektermen (keywords) de website gevonden wordt, hoeveel klikken de site genereert vanuit de Google-zoekresultaten, en waarschuwt bij indexatie-problemen of mobiele bruikbaarheidsfouten.
2. **Google Analytics 4 (Gratis):** Waar Search Console meet wát er in Google gebeurt, meet Analytics wát de bezoekers vervolgens op de website zelf doen (bijv. hoe lang ze op de Assessment pagina blijven en of ze doorklikken naar de Resultaten).
3. **Lighthouse (Gratis, ingebouwd in Chrome):** Een tool ontwikkeld door Google die met één klik in de Chrome browser (DevTools F12) een rapport kan uitdraaien. Het controleert de website lokaal of online op Performance, Accessibility en Best Practices voor SEO, en geeft een score van 0-100 met concrete verbetertips.
4. **SEMrush of Ahrefs (Betaald / Freemium):** Uitgebreide tools om backlinks van concurrenten of partners in de gaten te houden, gedetailleerd keyword-onderzoek te doen, en de ranking op de voet te volgen.
