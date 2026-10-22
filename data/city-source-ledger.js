/*
 * Working source ledger for the first city-content pass.
 * Place names are retained with a source URL so published copy can be audited.
 */
window.HB_DATA = window.HB_DATA || {};

window.HB_DATA.citySourceLedger = {
  "Lisbon, Portugal": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "This is a website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several official sites could not be read. LX Factory's page returned only encoded image data. Dear Breakfast and The Mill failed with SSL errors, and Sea Me's site refused the connection. No official site could be found for Taberna da Rua das Flores, Heim Cafe or Fauna & Flora. Red Frog and Monkey Mash publish no street address on the pages read. Padaria São Roque's operator site shows no hours or current activity. Some places were only partly published. Pastéis de Belém gives no opening times, Copenhagen Coffee Lab (Madalena) lists no hours, and Hello Kristof gives conflicting hours. Torre de Belém shows two different morning opening times. The Oceanário gives no street number. Torre de Belém, Jerónimos, Pastéis de Belém, Manteigaria and Cinco Lounge show no 2026-dated content beyond published hours or tickets. Museu Nacional do Azulejo, Museu Nacional de Arte Antiga (until 21 November) and Elevador de Santa Justa are currently closed.",
    "sourceUrls": [
      "docs/content-research/lisbon-2026-10-21.md",
      "docs/content-research/lisbon-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Alfama",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (neighbourhood)"
      },
      {
        "name": "Belem Tower area",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (area); checked as Torre de Belém instead"
      },
      {
        "name": "Miradouro viewpoints",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Tram views and walking",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Pastel and coffee stops",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Free viewpoints",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Belcanto dinner",
        "checkedOn": "2026-10-21",
        "reason": "duplicate of Belcanto (confirmed separately)"
      },
      {
        "name": "Private sail on the Tagus",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Palace hotel stay",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Alfama at sunset",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Riverfront evening",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Wine bar night",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Tram ride",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Time Out Market snacks",
        "checkedOn": "2026-10-21",
        "reason": "duplicate of Time Out Market Lisboa (confirmed separately)"
      },
      {
        "name": "Chiado cafes",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Alfama wandering",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Belem",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (district)"
      },
      {
        "name": "Chiado and Baixa",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (districts)"
      },
      {
        "name": "Fado night",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Day trip feel from Cais do Sodre",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "LX Factory",
        "url": "https://lxfactory.com/",
        "checkedOn": "2026-10-21",
        "reason": "Official site returned no readable text (only encoded image data across the fetched page); address and operating status could not be read. Not evidence of closure."
      },
      {
        "name": "Taberna da Rua das Flores",
        "url": "https://www.tabernadaruadasflores.pt/",
        "checkedOn": "2026-10-21",
        "reason": "No official website found; tabernadaruadasflores.pt does not resolve (DNS ENOTFOUND) and only social media/directory listings exist, which are not accepted as evidence."
      },
      {
        "name": "Dear Breakfast",
        "url": "https://dearbreakfast.com/",
        "checkedOn": "2026-10-21",
        "reason": "Official site fetch failed with an SSL/TLS error (WRONG_VERSION_NUMBER); not bypassed. Not evidence of closure."
      },
      {
        "name": "Heim Cafe",
        "checkedOn": "2026-10-21",
        "reason": "No official website found (only social media pages, not accepted); directory reports of a Santos relocation could not be verified."
      },
      {
        "name": "Fauna & Flora",
        "checkedOn": "2026-10-21",
        "reason": "No official website found; guessed domain faunaeflora.pt does not resolve. Only third-party listings available."
      },
      {
        "name": "Sea Me",
        "url": "https://www.peixariamoderna.com/",
        "checkedOn": "2026-10-21",
        "reason": "Official site peixariamoderna.com refused the connection (ECONNREFUSED); not bypassed. Not evidence of closure."
      },
      {
        "name": "Red Frog",
        "url": "https://www.redfrog.pt/reservas/",
        "checkedOn": "2026-10-21",
        "reason": "Official site read (hours \"Terça a Sábado: 18:00 – 01:00\", booking suggested) but no street address is published on the pages read, so it fails the address requirement."
      },
      {
        "name": "Monkey Mash",
        "url": "https://www.monkeymash.pt/",
        "checkedOn": "2026-10-21",
        "reason": "Official site read but shows no address, hours or dated content; only a 'RESERVAS' link."
      },
      {
        "name": "Padaria Sao Roque",
        "url": "https://panifsroque.pt/contactos-2/",
        "checkedOn": "2026-10-21",
        "reason": "Operator site lists the shop \"Padaria S. Roque (Patriarcal): Rua D. Pedro V, 57\" but publishes no hours and no current-operation evidence (footer \"©2015\"). Not confirmed."
      },
      {
        "name": "The Mill",
        "url": "https://themill.pt/",
        "checkedOn": "2026-10-21",
        "reason": "Official site (themill.pt) fetch failed with an SSL/TLS error (WRONG_VERSION_NUMBER); not bypassed. Not evidence of closure."
      },
      {
        "name": "Museu Nacional do Azulejo",
        "url": "https://www.museusemonumentos.pt/pt/museus-e-monumentos/museu-nacional-do-azulejo",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. Official page says \"Encerrado para obras de requalificação\" (PRR works) with no reopening date."
      },
      {
        "name": "Museu Nacional de Arte Antiga",
        "url": "https://www.museusemonumentos.pt/pt/museus-e-monumentos/museu-nacional-de-arte-antiga",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. Currently closed: \"Reabre dia 21 de novembro após obras de requalificação no âmbito do PRR\" (year not stated)."
      },
      {
        "name": "Elevador de Santa Justa",
        "url": "https://www.carris.pt/descubra/frota/elevador/",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate. Carris page header says \"Encerrado temporariamente\" with no reopening date."
      }
    ],
    "placeSources": {
      "Torre de Belém": {
        "url": "https://www.museusemonumentos.pt/pt/museus-e-monumentos/torre-de-belem",
        "sourceType": "official public operator (Museus e Monumentos de Portugal)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The page publishes current hours, closing days and a 'Bilhete normal' of 15,00 € with an online ticket office link. It shows no 2026-dated item and the footer reads '© 2024'."
      },
      "Mosteiro dos Jerónimos": {
        "url": "https://www.museusemonumentos.pt/pt/museus-e-monumentos/mosteiro-dos-jeronimos-e-capela-de-sao-jeronimo",
        "sourceType": "official public operator (Museus e Monumentos de Portugal)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current visiting hours for cloister and church, a standard ticket of 18,00 € with online sales, and the notice \"Bilheteiras encerram às 16h30\"."
      },
      "Padrão dos Descobrimentos": {
        "url": "https://padraodosdescobrimentos.pt/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibition \"PADRÃO. Casa-Obsessão\" and a family Sunday event \"A Minha Casa-Obsessão\" on 25 October 2026."
      },
      "MAAT": {
        "url": "https://www.maat.pt/",
        "sourceType": "operator's own site (Fundação EDP)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Exhibitions including \"Turn around\" at MAAT Central \"até Janeiro de 2027\" and dated events such as a visit-performance on 25/10/2026 and MAAT Friends After Hours on 28/10/2026."
      },
      "Museu Calouste Gulbenkian": {
        "url": "https://gulbenkian.pt/museu/informacoes/informacoes-contactos/",
        "sourceType": "operator's own site (Fundação Calouste Gulbenkian)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "A reopening page published 1 July 2026 says the museum reopens \"um ano e meio depois de ter encerrado para obras de renovação\". The museum page notes gallery works \"Entre 12 e 23 de outubro\" with some artworks removed, and lists \"A Coleção Imaginária\" from 21 Nov 2026 to 15 Mar 2027."
      },
      "Castelo de São Jorge": {
        "url": "https://castelodesaojorge.pt/pt/horarios",
        "sourceType": "official public operator (EGEAC, Lisbon City Council)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "A \"Programação 2026\" page covers May to October 2026, including \"Domingos no Castelo\" on the last Sunday of each month until October. The hours page notes that the castle's museum nucleus is temporarily closed while its sanitary facilities are improved."
      },
      "Oceanário de Lisboa": {
        "url": "https://www.oceanario.pt/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"© OCEANÁRIO DE LISBOA 2026\". Temporary exhibitions \"Monstros Marinhos\" and \"Universo Submerso\" are listed, with online tickets \"a partir de 25,5€\"."
      },
      "Time Out Market Lisboa": {
        "url": "https://www.timeout.pt/time-out-market-lisboa/pt",
        "sourceType": "operator's own site (Time Out)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"© 2026 Time Out England Limited\" and a headline saying \"O Time Out Market faz 12 anos\". The page describes the market as having \"26 restaurantes, 8 bares, uma dúzia de lojas\"."
      },
      "Belcanto": {
        "url": "https://www.belcanto.pt/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"José Avillez © 2026\", a June 2026 FAQ file and an online \"Reservar\" link. The site says emails \"não devem ser utilizados para solicitar reservas\"."
      },
      "Prado": {
        "url": "https://www.pradorestaurante.com/index2.php",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"2026 © Sweet Lisbon, Lda\" and a linked menu PDF and wine list. The on-page booking buttons are placeholders."
      },
      "Cinco Lounge": {
        "url": "https://www.cincolounge.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"Open daily 8pm – 2am\", with bookings taken 20:00-22:00 by email, walk-ins accepted and a linked cocktail menu. The page has no 2026 date."
      },
      "Pastéis de Belém": {
        "url": "https://pasteisdebelem.pt/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The homepage states \"Estamos abertos\" \"todos os dias\". The notice is undated, with no 2026 content."
      },
      "Manteigaria (Chiado)": {
        "url": "https://manteigaria.com/as-nossas-fabricas/chiado/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The branch page publishes \"Horário: 08h00 – 00h00\" and a phone number. No 2026-dated content."
      },
      "Copenhagen Coffee Lab (Madalena)": {
        "url": "https://copenhagencoffeelab.com/pages/lokation/copenhagen-coffee-lab-madalena",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"© 2026 - Copenhagen Coffee Lab\" and a linked menu, with brunch described as \"served all day\"."
      },
      "Hello Kristof (Poço dos Negros)": {
        "url": "https://hellokristof.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"© 2026 Hello Kristof\" and an announced \"Coffee Methods Workshop\" on \"Saturday, 21st November\" at its São Bento location."
      }
    }
  },
  "Rome, Italy": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "This is a website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. The Colosseum and Roman Forum could not be checked because colosseo.it refused automated connections and the ticketing site showed a bot check. Galleria Borghese's site also refused connection, and Forno Campo de' Fiori, Sant'Eustachio Il Caffè, The Court, Trapizzino, Pasticceria Regoli and Panella could not be read (connection refused, redirect loop, 403, 500 or maintenance page). Roscioli publishes no street address, and no official sites were found for Barnum Cafe, Marigold, Pergamino, the Spanish Steps or Villa Borghese. Hours are not published for La Pergola, Pizzarium or the Appia Antica park. St. Peter's Basilica gives no street address, and Da Enzo al 29 does not state its Sunday status. Jerry Thomas Speakeasy's site carries no 2026-dated content beyond live hours and booking. Only 18 places were confirmed, below the 25–35 target.",
    "sourceUrls": [
      "docs/content-research/rome-2026-10-21.md",
      "docs/content-research/rome-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Colosseum",
        "url": "https://colosseo.it/orari-e-biglietti/",
        "checkedOn": "2026-10-21",
        "reason": "Official site colosseo.it refused the connection (ECONNREFUSED) on several attempts. ticketing.colosseo.it showed a browser security check, which was not bypassed. Not checked; this is not evidence of closure."
      },
      {
        "name": "Roman Forum",
        "url": "https://colosseo.it/en/",
        "checkedOn": "2026-10-21",
        "reason": "Run by the Parco archeologico del Colosseo, whose site colosseo.it refused the connection (ECONNREFUSED). Not checked."
      },
      {
        "name": "Spanish Steps",
        "checkedOn": "2026-10-21",
        "reason": "No official operator page found or read; the only pages found were tourism-board, news and a 2016 press PDF."
      },
      {
        "name": "Roscioli",
        "url": "https://www.salumeriaroscioli.com/pages/prenota",
        "checkedOn": "2026-10-21",
        "reason": "The official site publishes hours and booking rules (daily 12:30–15:30 and 19:00–23:30) but no street address for the Salumeria, so it fails the address rule. A later fetch returned HTTP 429."
      },
      {
        "name": "Barnum Cafe",
        "checkedOn": "2026-10-21",
        "reason": "No official website found (barnumcafe.com does not resolve). Press reports say it moved in 2026, but press is not valid evidence."
      },
      {
        "name": "Marigold",
        "checkedOn": "2026-10-21",
        "reason": "No official website found. Third-party sources report it closed, but that is not valid evidence and was not verified."
      },
      {
        "name": "Pergamino Caffe",
        "checkedOn": "2026-10-21",
        "reason": "No official website found (pergaminocaffe.it does not resolve). Third-party sources suggest the premises now house a different business; not verified."
      },
      {
        "name": "Faro",
        "url": "https://www.farorome.com/",
        "checkedOn": "2026-10-21",
        "reason": "The official site gives the address (\"Via Piave 55, 00187 RM\") but no hours or 2026-dated content (menus labelled \"OTTOBRE 25\")."
      },
      {
        "name": "Sant'Eustachio Il Caffe",
        "url": "https://www.santeustachioilcaffe.it/",
        "checkedOn": "2026-10-21",
        "reason": "The official site failed with too many redirects (.it and .com); not readable."
      },
      {
        "name": "Forno Campo de' Fiori",
        "url": "https://www.fornocampodefiori.com/",
        "checkedOn": "2026-10-21",
        "reason": "The official site refused the connection (ECONNREFUSED) on two attempts."
      },
      {
        "name": "Panella",
        "url": "https://www.panellaroma.com/",
        "checkedOn": "2026-10-21",
        "reason": "The official site shows a maintenance page (\"Il sito è attualmente in manutenzione\"), with no address, hours or current content."
      },
      {
        "name": "Le Levain",
        "url": "https://www.lelevainroma.it/trastevere/",
        "checkedOn": "2026-10-21",
        "reason": "The official site lists shops (Via Luigi Santini 22, Trastevere; Via Piave 8, Sallustiano) but no hours, menu or dated content beyond a \"© 2026\" footer. Operating evidence is insufficient."
      },
      {
        "name": "The Court",
        "url": "https://www.manfredihotels.com/en/palazzo-manfredi/the-court",
        "checkedOn": "2026-10-21",
        "reason": "The official Manfredi Hotels page returned HTTP 403 Forbidden."
      },
      {
        "name": "Villa Borghese",
        "checkedOn": "2026-10-21",
        "reason": "No official operator page found or read (guessed Sovrintendenza URL returned 404; search found only tourism-board pages)."
      },
      {
        "name": "Keyhole on Aventine Hill",
        "url": "https://www.orderofmalta.int/",
        "checkedOn": "2026-10-21",
        "reason": "The Order of Malta official site gives no visitor information, address or hours for the Villa del Priorato keyhole."
      },
      {
        "name": "Galleria Borghese (gap candidate)",
        "url": "https://galleriaborghese.cultura.gov.it/en/",
        "checkedOn": "2026-10-21",
        "reason": "Official site failed: galleriaborghese.beniculturali.it does not resolve, and galleriaborghese.cultura.gov.it refused the connection."
      },
      {
        "name": "Mercato di Testaccio (gap candidate)",
        "url": "https://www.mercatoditestaccio.it/",
        "checkedOn": "2026-10-21",
        "reason": "The official site gives entrances but no hours and no 2026 content (latest item June 2025)."
      },
      {
        "name": "Trapizzino (gap candidate)",
        "url": "https://www.trapizzino.it/",
        "checkedOn": "2026-10-21",
        "reason": "The official site returned HTTP 403 Forbidden."
      },
      {
        "name": "Tazza d'Oro (gap candidate)",
        "url": "https://www.tazzadorocoffeeshop.com/",
        "checkedOn": "2026-10-21",
        "reason": "The official site lists only a Formello company address, with no Pantheon-area branch address, hours or 2026 content."
      },
      {
        "name": "Pasticceria Regoli (gap candidate)",
        "url": "https://www.pasticceriaregoli.com/",
        "checkedOn": "2026-10-21",
        "reason": "The official site returned HTTP 500 Internal Server Error."
      },
      {
        "name": "Pantheon and piazza walks",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Trevi Fountain at night",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Street pizza and supplì",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Private Vatican tour",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Luxury spa afternoon",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Trastevere dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Night walk past Trevi",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Colosseum family tour",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Gelato crawl",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Morning in Monti",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee near Pantheon",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Self-guided ancient Rome walk",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Appian Way bike ride",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (the park itself was checked as Parco Regionale dell'Appia Antica)"
      },
      {
        "name": "Testaccio food stop",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Sant'Eustachio area coffee and cornetto",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Vatican Museums": {
        "url": "https://www.museivaticani.va/content/museivaticani/en/info/orari-musei-vaticani.html",
        "sourceType": "official public operator (Vatican Museums, Vatican City State)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The hours page lists 2026 closures, e.g. the Carriage Pavilion \"closed 20–23 October\" and regular closures on 1 November and 8, 25 and 26 December. Tickets are sold at \"tickets.museivaticani.va\", and the site warns of scam sites with similar domains."
      },
      "St. Peter's Basilica": {
        "url": "https://www.basilicasanpietro.va/en/opening-hours",
        "sourceType": "operator's own site (Basilica Papale di San Pietro)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Dated 2026 news, including \"New opening hours for St Peter's Basilica\" (28 May) and a sacred music concert on Saturday 10 October. Hours are given for \"October 26, 2026 to March 28, 2027\"."
      },
      "Pantheon": {
        "url": "https://pantheonroma.com/en/",
        "sourceType": "operator's own site (\"Sito della Basilica di Santa Maria ad Martyres\")",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"BOOK NOW\" ticket link and 2026-dated news posts (e.g. 24 March, 12 March). Lists a \"First Sunday of the month free entry\" option."
      },
      "Trevi Fountain": {
        "url": "https://fontanaditrevi.roma.it/",
        "sourceType": "official public operator (Roma Capitale)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Ticketing for non-residents since 2 February 2026: \"Scopri come entrare dal 2 febbraio 2026\". The inner perimeter costs €2 for non-residents. Pre-bought tickets are \"open, senza data e orario\" and cannot be refunded."
      },
      "Musei Capitolini": {
        "url": "https://www.museicapitolini.org/en/informazioni_pratiche/orari_e_indirizzi",
        "sourceType": "official public operator (Roma Capitale, Sovrintendenza Capitolina)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibition \"Diego Rivera e la costruzione dell'arte moderna in Messico nel XX secolo\" runs 09/06/2026–13/12/2026, and \"Angeli - Messaggeri, custodi e viandanti\" runs to 10/01/2027. The Horti di Mecenate halls are closed for renovation (notice of 05/08/2026)."
      },
      "Museo dell'Ara Pacis": {
        "url": "https://www.arapacis.it/en",
        "sourceType": "official public operator (Roma Capitale)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"L'Ara si rivela\" runs 27/03/2026–31/12/2026. The exhibition \"Il potere del ritratto. Egitto e Roma. I volti del Fayum\" runs 05/11/2026–02/05/2027, with advance tickets on sale."
      },
      "Galleria Doria Pamphilj": {
        "url": "https://www.doriapamphilj.it/roma/la-visita/",
        "sourceType": "operator's own site (Amministrazione Doria Pamphilj s.r.l.)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Publishes current visiting hours and ticket prices (standard €16, €17 booked online; under-12s free) with an online booking link. Footer \"©2026\"."
      },
      "Passeggiata del Pincio": {
        "url": "https://www.sovraintendenzaroma.it/i_luoghi/ville_e_parchi_storici/passeggiate_parchi_e_giardini/passeggiata_del_pincio",
        "sourceType": "official public operator (Roma Capitale, Sovrintendenza Capitolina)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Listed as \"Sempre aperto\" on a page carrying notices dated October 2026. Services include bike rental on via di Villa Medici and via dell'Orologio, and the Teatrino dei burattini S. Carlino."
      },
      "Parco Regionale dell'Appia Antica": {
        "url": "https://www.parcoappiaantica.it/",
        "sourceType": "official public operator (Ente Regionale Parco dell'Appia Antica)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News dated 20 October 2026 (a weather alert) and 6 October 2026 (Giornata Nazionale delle Famiglie al Museo). The site has a \"Noleggio Bici Appia Antica\" link."
      },
      "Armando al Pantheon": {
        "url": "https://www.armandoalpantheon.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"Copyright 2026\" and recent news items (a 1 October Hypertrattoria dinner). \"le prenotazioni sono possibili solo online\"."
      },
      "Da Enzo al 29": {
        "url": "https://www.daenzoal29.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"© 2026 Locanda Da Enzo\" with current hours. \"Non si accettano prenotazioni\": guests are seated in order of arrival."
      },
      "La Pergola": {
        "url": "https://www.romecavalieri.com/la-pergola/",
        "sourceType": "operator's own site (Rome Cavalieri, Hilton Italiana S.r.l.)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Online \"Book Table\" link, reservation phone and email, and \"2026 © Hilton Italiana S.r.l.\". \"The menu offering is subject to seasonal changes.\""
      },
      "Pizzarium (Via della Meloria)": {
        "url": "https://www.bonci.it/",
        "sourceType": "operator's own site (Bonci)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Group news dated 5 October 2026 (new Termini station space \"operativo\") and \"Copyright © 2026, Bonci\". No Pizzarium-specific hours or notice."
      },
      "Supplizio": {
        "url": "https://www.supplizioroma.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Footer \"© 2016 - 2026 Supplizio\" with published hours. There is a summer closure notice for 10–31 August, with no year given."
      },
      "Drink Kong": {
        "url": "https://www.drinkkong.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "2026 menus (wine and spirits lists dated February 2026, food menu June 2026) and online reservations for up to 6 people. No reservations after midnight."
      },
      "Jerry Thomas Speakeasy": {
        "url": "https://www.thejerrythomasproject.it/speakeasy",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published hours and a \"PRENOTA UN TAVOLO\" booking link. The newsletter sign-up gives \"la parola segreta\". No 2026-dated content (copyright \"© 2015 - 2023\")."
      },
      "Antico Forno Roscioli (Via dei Chiavari)": {
        "url": "https://www.anticofornoroscioli.it/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published daily hours and footer \"© 2026 Antico Forno Roscioli\"."
      },
      "Mercato Centrale Roma": {
        "url": "https://www.mercatocentrale.it/roma/info/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current events, including \"Mercato Centrale Roma compie 10 anni: un mese di eventi tra cibo, arte e cultura\" (the market opened in October 2016) and an \"Aperitivo Centrale\" series."
      }
    }
  },
  "Barcelona, Spain": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. La Boqueria's official site returned nothing readable, Fundació Joan Miró's site refused automated reading (403) and Brunells' site refused the connection, so they are not included. Bohl, Tapeo, Two Schmucks and Baluard had no reachable official website. Quimet & Quimet and Dr Stravinsky published an address but no hours or current content. Several places were only partly published: Disfrutar and Paradiso show no opening hours, the Aquarium's closing times did not load, Park Güell gives entrances but no street number, MNAC's current exhibitions are undated, and Three Marks Coffee lists two conflicting sets of hours for Ausiàs Marc. The Sagrada Família site also shows an undated notice that the Gaudí House Museum is temporarily closed. This guide has fewer than the 25-place target because of these gaps.",
    "sourceUrls": [
      "docs/content-research/barcelona-2026-10-21.md",
      "docs/content-research/barcelona-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Gothic Quarter",
        "checkedOn": "2026-10-21",
        "reason": "neighbourhood, not a single operated place"
      },
      {
        "name": "La Boqueria area",
        "url": "https://www.boqueria.barcelona/home",
        "checkedOn": "2026-10-21",
        "reason": "official site (boqueria.barcelona) returned nothing readable on several pages (home, contact, services, market-open); not confirmed"
      },
      {
        "name": "La Boqueria grazing",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (Boqueria itself could not be read, see above)"
      },
      {
        "name": "Quimet & Quimet",
        "url": "https://quimetquimet.com/",
        "checkedOn": "2026-10-21",
        "reason": "official site gives address (\"Carrer del Poeta Cabanyes, 25, 08004 Barcelona\") but no hours, menu, booking or dated content beyond a footer; no operating evidence"
      },
      {
        "name": "Bohl",
        "checkedOn": "2026-10-21",
        "reason": "no official website found; only third-party listings"
      },
      {
        "name": "Tapeo",
        "url": "https://tapeoborn.com/",
        "checkedOn": "2026-10-21",
        "reason": "no official website found (tapeoborn.com does not resolve); only third-party listings"
      },
      {
        "name": "Two Schmucks",
        "url": "https://www.schmuckordie.com/",
        "checkedOn": "2026-10-21",
        "reason": "no readable official site; schmuckordie.com does not resolve"
      },
      {
        "name": "Dr Stravinsky",
        "url": "https://drstravinsky.cat/contacto/",
        "checkedOn": "2026-10-21",
        "reason": "official site gives address (\"Carrer Mirallers, 5\") but no hours or dated content; no operating evidence"
      },
      {
        "name": "Baluard",
        "url": "https://www.baluard.com/",
        "checkedOn": "2026-10-21",
        "reason": "baluard.com redirects to a domain-for-sale page; no official site found"
      },
      {
        "name": "Brunells",
        "url": "https://www.brunells.cat/",
        "checkedOn": "2026-10-21",
        "reason": "official site refused connection (ECONNREFUSED); not evidence of closure"
      },
      {
        "name": "Fundació Joan Miró",
        "url": "https://www.fmirobcn.org/en/",
        "checkedOn": "2026-10-21",
        "reason": "official site returned HTTP 403 Forbidden to automated fetch; not bypassed"
      },
      {
        "name": "Beach and old town walking",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Tapas hopping",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Bunkers del Carmel views",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (site itself confirmed as Bunkers del Carmel (MUHBA Turó de la Rovira))"
      },
      {
        "name": "Dinner at Disfrutar",
        "checkedOn": "2026-10-21",
        "reason": "duplicate of Disfrutar (confirmed)"
      },
      {
        "name": "Private Gaudí tour",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Seafront sunset charter",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Borne evening",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Beach sunset",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Rooftop drinks",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Beach afternoon",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "El Born wandering",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Tapas crawl",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Museum and coffee day",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Poble-sec vermouth stop",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Sant Antoni food scene",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Sagrada Família": {
        "url": "https://sagradafamilia.org/en/opening-hours-and-getting-here",
        "sourceType": "operator's own site (Junta Constructora / Fundació Sagrada Família)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Official ticket vendor site with \"Tickets\" and \"Choose your visit\" links; homepage lists an \"Events 2026\" programme and news items modified as late as 10/19/26."
      },
      "Park Güell": {
        "url": "https://parkguell.barcelona/en/planning-your-visit/prices-and-times",
        "sourceType": "operator's own site (official Park Güell site, Barcelona city)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Homepage shows live ticket status (\"The availability of tickets for today is medium\") and states \"Tickets for Park Güell must be purchased in advance and online\"; news item on Barcelona 2026, World Capital of Architecture."
      },
      "Casa Batlló": {
        "url": "https://www.casabatllo.es/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Lists \"Gaudí Year 2026\" activities, \"2026 Magical Nights\" concerts, a night visit and the exhibition \"Gaudí-Miró-Gomis: Deconstructed\"."
      },
      "La Pedrera-Casa Milà": {
        "url": "https://www.lapedrera.com/en/practical-information",
        "sourceType": "operator's own site (Fundació Catalunya La Pedrera)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Dated 2026 schedule; La Pedrera Sunset ticket offered \"Until 01/11/26\"; rooftop closes in rain."
      },
      "Museu Picasso": {
        "url": "https://museupicassobcn.cat/en",
        "sourceType": "official public operator (Barcelona City Council museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Announces the exhibition \"Picasso and Architecture\", 20 November 2026 to 7 March 2027."
      },
      "Museu Nacional d'Art de Catalunya (MNAC)": {
        "url": "https://www.museunacional.cat/en/opening-hours-and-prices",
        "sourceType": "official public operator (national museum of Catalonia)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibitions listed on the homepage, including \"Art, War & Memory\" and \"Wounded Militiaman: The Recovery of an Irredeemable Painting\" (no dates shown); current hours and free-entry rules published."
      },
      "Palau de la Música Catalana": {
        "url": "https://www.palaumusica.cat/en/getting-here_1180820",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Concert listings for 22 Oct to 9 Nov (e.g. London Philharmonic & Gardner on Oct 26) and a \"Temporada 2026-2027\" menu; guided tours bookable online."
      },
      "Barcelona Cathedral": {
        "url": "https://catedralbcn.org/en/tourist-visit/visiting-hours/",
        "sourceType": "operator's own site (Cathedral of Barcelona)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published tourist-visit hours and an online ticket shop (tickets.catedralbcn.org); no dated 2026 notice besides footer."
      },
      "Bunkers del Carmel (MUHBA Turó de la Rovira)": {
        "url": "https://www.barcelona.cat/museuhistoria/en/heritages/museum-spaces/turo-de-la-rovira",
        "sourceType": "official public operator (MUHBA, Barcelona City History Museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current visiting hours published, free access; page has a heading \"From 1 August 2026:\" (no text under it) and a 2026-27 schools programme."
      },
      "L'Aquàrium de Barcelona": {
        "url": "https://www.aquariumbcn.com/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"Book your ticket now!\" with current prices (adults €30, children 5-10 €23); \"Ticket office and admission close one hour before closing time.\""
      },
      "Mercat de Santa Caterina": {
        "url": "https://www.mercatsantacaterina.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published opening hours, home delivery and online shop; footer \"© 2026 - Mercat de Santa Caterina\"."
      },
      "Disfrutar": {
        "url": "https://www.disfrutarbarcelona.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"RESERVES\" booking link; menu prices marked \"Preu vigent fins 07/08/2027\"; press item dated 01/06/2026."
      },
      "El Xampanyet": {
        "url": "https://www.elxampanyet.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current weekly hours published; site states reservations are not accepted."
      },
      "Can Fisher": {
        "url": "https://www.canfisher.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"RESERVAR\" online booking; menu of \"Paellas y arroces secos, caldosos y melosos con arroz del Delta del Ebro\"."
      },
      "Paradiso": {
        "url": "https://paradiso.cat/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"Número 17 en la lista de los World's 50 Best Bars 2026\"; current cocktail menu; The Macallan Experience \"todos los jueves y viernes a las 19 h\"."
      },
      "Federal Café (Gòtic)": {
        "url": "https://www.federalcafe.es/bcn-gotic",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch page with current hours and linked menus (\"carta-26\")."
      },
      "Brunch & Cake (Enric Granados)": {
        "url": "https://www.brunchandcake.com/enric-granados",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch page with location, menu and hours; footer \"Copyright 2026 Brunch & Cake\"."
      },
      "Hofmann Pastelería (Born)": {
        "url": "https://www.hofmannpasteleria.com/",
        "sourceType": "operator's own site (Grupo Hofmann)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Online shop with seasonal Castañada products and a product labelled \"Mejor Pasta de Té de Cataluña 2026\"; delivery and takeaway in Barcelona."
      },
      "Petit Nomad (Nomad Coffee, Bergara)": {
        "url": "https://nomadcoffee.es/pages/locales-nomad-coffee-en-barcelona",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Homepage notice: \"A partir de octubre, Petit NOMAD abre los siete días de la semana.\""
      },
      "Nomad Coffee Bar (Passatge Sert)": {
        "url": "https://nomadcoffee.es/pages/locales-nomad-coffee-en-barcelona",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Listed on the operator's current locations page with weekly hours."
      },
      "Hidden Coffee Roasters (El Born)": {
        "url": "https://hiddencoffeeroasters.com/en/tienda/coffee-shop-el-born/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch page with current weekly hours; footer \"Copyright © 2026 • Hidden Coffee Roasters SL\"."
      },
      "Three Marks Coffee (Ausiàs Marc)": {
        "url": "https://www.threemarkscoffee.com/en/pages/contact",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Contact page lists the café with hours and announces a second branch (\"Three Marks Castillejos is opening soon\"); footer \"© 2026 Three Marks Coffee\"."
      }
    }
  },
  "Tokyo, Japan": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several sites could not be read: SHIBUYA SKY and teamLab Planets returned only empty script shells, Bills returned no content, and Sushi Daiwa, Bar Benfiddich, Path and 365 Days failed DNS lookups. fuglen.com had an expired certificate, which was not bypassed. None of these failures is evidence of closure. Tsukiji Outer Market was left out only because its official pages give no postal address. Some places were published only partially: Ueno Zoo's visitor hours page did not load, Shinjuku Gyoen's hours and Narisawa's and The SG Club's hours were not published, and Narisawa's address appears only in a map link. Udon Shin, Glitch Coffee, AFURI, Fuglen Tokyo, Ivy Place and the Imperial Palace East Gardens are supported by currently published hours or booking links rather than 2026-dated content. Tokyo Skytree's stated hours were shown as 'today's' hours without a date. Fewer than 25 places were confirmed, because many input entries were generic or unreadable and the gap-candidate limit of 8 was reached.",
    "sourceUrls": [
      "docs/content-research/tokyo-2026-10-21.md",
      "docs/content-research/tokyo-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Shibuya Crossing",
        "checkedOn": "2026-10-21",
        "reason": "public street crossing with no operator website to check"
      },
      {
        "name": "Shinjuku",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (district)"
      },
      {
        "name": "Shibuya",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (district)"
      },
      {
        "name": "Yanaka neighborhood",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (neighbourhood)"
      },
      {
        "name": "Izakaya Toyo style food alleys",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Free skyline views",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Temple and shrine wandering",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Omakase dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Luxury ryokan stay extension",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Private tea experience",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Shibuya Sky at sunset",
        "url": "https://www.shibuya-scramble-square.com/sky/",
        "checkedOn": "2026-10-21",
        "reason": "Official SHIBUYA SKY pages returned only an empty script shell (title, logo, 'MENU'). Sub-pages returned 404, so there was no readable address, hours or current content."
      },
      {
        "name": "Ginza dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Odaiba night view",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "teamLab-style digital art",
        "url": "https://www.teamlab.art/e/planets/",
        "checkedOn": "2026-10-21",
        "reason": "Generic entry. The gap candidate teamLab Planets TOKYO was checked, but the official page returned only its title, with no address, hours or tickets."
      },
      {
        "name": "Tokyo Disney add-on",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (no specific park named)"
      },
      {
        "name": "Ramen counter crawl",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Asakusa morning",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Shinjuku night wandering",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Depachika food halls",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Themed cafe or arcade stop",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Memory Lane izakayas",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (alley of many separate bars)"
      },
      {
        "name": "Tsukiji Outer Market",
        "url": "https://www.tsukiji.or.jp/english/calendar/",
        "checkedOn": "2026-10-21",
        "reason": "The official site shows an October 2026 calendar, 2026 news and public hours (9:00–14:00), but none of its home, English, access or calendar pages gives a postal address, so it fails the exact-address rule."
      },
      {
        "name": "Sushi Daiwa",
        "url": "https://www.sushidaiwa.co.jp/",
        "checkedOn": "2026-10-21",
        "reason": "fetch failed: DNS lookup failed (ENOTFOUND) for the presumed official domain; not evidence of closure"
      },
      {
        "name": "Bills Omotesando",
        "url": "https://bills-jp.net/",
        "checkedOn": "2026-10-21",
        "reason": "official site returned no readable content (homepage empty; branch and English pages 404)"
      },
      {
        "name": "Soba House Konjiki-Hototogisu",
        "url": "http://konjikiramen.com/",
        "checkedOn": "2026-10-21",
        "reason": "The presumed official domain redirected to konjikiramen.com, which lists a Toronto shop and an undated 'Shinjuku NEW location' address with no hours or current evidence. The operator could not be verified."
      },
      {
        "name": "Bar Benfiddich",
        "url": "https://www.benfiddich.com/",
        "checkedOn": "2026-10-21",
        "reason": "fetch failed: DNS lookup failed (ENOTFOUND) for the presumed official domain; not evidence of closure"
      },
      {
        "name": "Path",
        "url": "https://path-restaurant.tokyo/",
        "checkedOn": "2026-10-21",
        "reason": "fetch failed: DNS lookup failed (ENOTFOUND) for the presumed official domain; not evidence of closure"
      },
      {
        "name": "365 Days",
        "url": "https://www.365jours.jp/",
        "checkedOn": "2026-10-21",
        "reason": "fetch failed: DNS error (EAI_AGAIN) on three attempts; not evidence of closure"
      },
      {
        "name": "Viron",
        "url": "https://www.viron.jp/",
        "checkedOn": "2026-10-21",
        "reason": "domain viron.jp belongs to an unrelated Hamamatsu ironwork company; the bakery's official site was not identified"
      },
      {
        "name": "Koffee Mameya",
        "url": "https://koffee-mameya.com/",
        "checkedOn": "2026-10-21",
        "reason": "The official site lists shops only as map links, with no written address, hours or dated content. The Kakeru page has only a reservation link, and the Omotesando page returned 404."
      },
      {
        "name": "Hama-rikyu Gardens",
        "url": "https://www.tokyo-park.or.jp/teien/en/hama-rikyu/",
        "checkedOn": "2026-10-21",
        "reason": "The official English page gives the address '1-1, Hama Rikyu-teien, Chuo-ku, Tokyo 104-0046' but no hours or current-operation evidence. Other pages returned 404."
      },
      {
        "name": "Fuglen (fuglen.com)",
        "url": "https://www.fuglen.com/",
        "checkedOn": "2026-10-21",
        "reason": "certificate has expired on fuglen.com; not bypassed (Tokyo branch confirmed instead via fuglen.no)"
      }
    ],
    "placeSources": {
      "Senso-ji": {
        "url": "https://www.senso-ji.jp/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News items linked as 2026-10-01, e.g. a harp and violin concert \"福祉会館にてコンサートがおこなわれた\". Main-hall hours are published."
      },
      "Meiji Jingu": {
        "url": "https://www.meijijingu.or.jp/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News dated 令和8年 (2026), e.g. 10月15日 \"横綱による手数入が奉納されました\". The English site says \"Meiji Jingu is open everyday\"."
      },
      "Ueno Zoo": {
        "url": "https://www.tokyo-zoo.net/zoo/ueno/",
        "sourceType": "official public operator (Tokyo Zoological Park Society, Tokyo Metropolitan zoos)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News dated 2026.10.20 on partial path closures Oct 27–30; 2026.10.19 notice of path closures \"10月26日(月)～11月16日(月)\"; 2026.08.31 notice that some animal exhibits are halted or changed for construction until January 2027."
      },
      "Tokyo National Museum": {
        "url": "https://www.tnm.jp/?lang=en",
        "sourceType": "official public operator (National Institutes for Cultural Heritage)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current special exhibition \"Hiroshige: New Perspectives on Edo Japan\", September 29 to December 20, 2026. Honkan Room 4 closes October 26, 2026 to April 25, 2027."
      },
      "Tokyo Skytree": {
        "url": "https://en.tokyo-skytree.jp/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Events \"DISCOVER AUTUMN at TOKYO SKYTREE\" (Sep 10–Oct 31) and \"TOKYO SKYTREE Dream Christmas 2026\" (Nov 5–Dec 25); an Oct 21 lighting-inspection notice."
      },
      "Mori Art Museum": {
        "url": "https://art-view.roppongihills.com/en/info/index.html",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Closed September 24 to October 30, 2026 for exhibition preparation. It reopens with \"Mariko Mori: All That Shines\", October 31, 2026 to March 28, 2027, and advance tickets are on sale (news dated October 13, 2026)."
      },
      "Tokyo City View": {
        "url": "https://art-view.roppongihills.com/en/info/index.html",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Its 2026 schedule shows it is closed on Tuesday, October 27, 2026 and from November 10 to 12, 2026. A combo ticket with the Mori Art Museum goes on sale October 31."
      },
      "Tokyo Metropolitan Government Building Observation Decks": {
        "url": "https://www.zaimu.metro.tokyo.lg.jp/tochousha/goannai/tenbou",
        "sourceType": "official public operator (Tokyo Metropolitan Government)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current visitor guide with \"入室料金　無料\" (free) and per-deck closing rules. The page carries a heading for an award titled \"トラベラーズチョイス アワード2026\"."
      },
      "Imperial Palace East Gardens": {
        "url": "https://www.kunaicho.go.jp/e-event/higashigyoen02.html",
        "sourceType": "official public operator (Imperial Household Agency)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current published schedule of seasonal hours and closed days, with a linked closure calendar. Admission is free. The page has no 2026-dated item."
      },
      "Shinjuku Gyoen National Garden": {
        "url": "https://policies.env.go.jp/national-garden/shinjukugyoen/index.html",
        "sourceType": "official public operator (Ministry of the Environment)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The homepage has current notices for a chrysanthemum display (菊花壇展) and early opening (早朝開園), but neither is dated. Advance web tickets are offered."
      },
      "Gonpachi (Nishi-Azabu)": {
        "url": "https://www.gonpachi.jp/nishi-azabu/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News dated 2026-09-18 announces a \"25周年記念イベント\" at the Nishi-Azabu branch, and an autumn menu ran from 9/19."
      },
      "Narisawa": {
        "url": "https://www.narisawa-yoshihiro.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The site takes bookings: \"ご予約は下記の予約サイトより承っております\" (via OMAKASE) and \"お電話でのご予約は承っておりません\". There is no dated 2026 content."
      },
      "Ivy Place": {
        "url": "https://www.tysons.jp/ivyplace/access/",
        "sourceType": "operator's own site (TYSONS & COMPANY)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current meal-by-meal hours are published. The operator's news lists \"LEMON FAIR 2026\", but it is not specific to this restaurant."
      },
      "AFURI (Ebisu)": {
        "url": "https://afuri.com/findus/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "The branch list gives current hours, marks the branch fully cashless and says reservations are available. There is no dated 2026 content."
      },
      "Udon Shin": {
        "url": "https://www.udonshin.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "A TableCheck reservation link and current hours are published. The only dated items are from 2023, and the site warns of \"10～15分程の待ち時間\" after ordering."
      },
      "Glitch Coffee (Jimbocho)": {
        "url": "https://glitchcoffee.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current branch hours are listed with \"NO SCHEDULED HOLIDAY\". There is no dated 2026 content."
      },
      "The SG Club": {
        "url": "https://sg-management.jp/sgclub/",
        "sourceType": "operator's own site (SG Management)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "TableCheck booking links \"Book Sip\" and \"Book Sangai\". The group site has 2026 news, e.g. 2026-10-16 \"Roku Industry Icon Award\"."
      },
      "Bar High Five": {
        "url": "https://www.barhighfive.com/map",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Notice dated 17 June 2026: \"We will close our bar on Wednesday 1st July for the inventry.\" No reservations: \"We have decided to take NO reservations from this May 2015.\""
      },
      "Fuglen Tokyo (Tomigaya)": {
        "url": "https://fuglen.no/Fuglen-Tokyo-Tomigaya",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current hours are listed, and the site describes coffee, baked goods and cocktails served \"from 7am every day\". There is no dated 2026 content."
      }
    }
  },
  "New York, United States": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "This is a website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several official sites could not be read by automated fetch and were left out rather than bypassed: Top of the Rock, the American Museum of Natural History, MoMA and Grand Central Terminal (HTTP 403), The Met and the Brooklyn Museum (HTTP 429), the Guggenheim (cookie wall only), the NYPL main branch (empty page), Bubby's (connection refused), Mah-Ze-Dahr (HTTP 404) and NYC Parks' Central Park page (HTTP 403; the Conservancy site was used instead). Some places were only partly published. Crown Shy, Attaboy and Devoción showed hours but no dated content. The Whitney listed exhibitions without dates. The Frick page carried one apparently stale notice. Employees Only's reservations page may be out of date. Katz's listed weekly hours that conflict with its \"open 24 hrs on weekends\" banner. The High Line's closure notice and Central Park's event dates had no year shown.",
    "sourceUrls": [
      "docs/content-research/new-york-2026-10-21.md",
      "docs/content-research/new-york-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Statue of Liberty views",
        "url": "https://www.nps.gov/stli/planyourvisit/basicinfo.htm",
        "checkedOn": "2026-10-21",
        "reason": "Largely generic (views); the NPS pages read gave only a mailing address (\"1 Ellis Island, Jersey City, NJ\") and no physical-location or current hours text, deferring to the ferry concessioner."
      },
      {
        "name": "Top of the Rock",
        "url": "https://www.rockefellercenter.com/attractions/top-of-the-rock-observation-deck/",
        "checkedOn": "2026-10-21",
        "reason": "Official site returned HTTP 403 Forbidden to automated reading; not bypassed."
      },
      {
        "name": "American Museum of Natural History",
        "url": "https://www.amnh.org/plan-your-visit",
        "checkedOn": "2026-10-21",
        "reason": "Official site returned HTTP 403 Forbidden (visit page and homepage); not bypassed."
      },
      {
        "name": "Brooklyn Bridge",
        "url": "https://www.nyc.gov/html/dot/html/infrastructure/brooklyn-bridge.shtml",
        "checkedOn": "2026-10-21",
        "reason": "NYC DOT page gives no exact access point or address and no 2026-dated content (only \"The bridge promenade will be open at all times\")."
      },
      {
        "name": "Times Square once",
        "url": "https://www.timessquarenyc.org/",
        "checkedOn": "2026-10-21",
        "reason": "Only source found is the Times Square Alliance, a district promotion organization rather than an operator or public body; treated like a tourism board."
      },
      {
        "name": "Bubby's",
        "url": "https://bubbys.com/",
        "checkedOn": "2026-10-21",
        "reason": "Official site fetch failed (connection refused); not evidence of closure."
      },
      {
        "name": "Los Tacos No. 1",
        "url": "https://lostacos1.com/locations/",
        "checkedOn": "2026-10-21",
        "reason": "Homepage and locations page returned no readable addresses or hours."
      },
      {
        "name": "Joe's Pizza (Carmine Street)",
        "url": "https://www.joespizzanyc.com/locations",
        "checkedOn": "2026-10-21",
        "reason": "Official site gives the address (7 Carmine Street) but no hours, menu notice or dated content as operating evidence."
      },
      {
        "name": "Mah-Ze-Dahr",
        "url": "https://www.mahzedahrbakery.com/",
        "checkedOn": "2026-10-21",
        "reason": "Official site returned HTTP 404; nothing readable. Not evidence of closure."
      },
      {
        "name": "The Metropolitan Museum of Art",
        "url": "https://www.metmuseum.org/plan-your-visit",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; official site returned HTTP 429 Too Many Requests on repeated attempts; not bypassed."
      },
      {
        "name": "Museum of Modern Art (MoMA)",
        "url": "https://www.moma.org/visit",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; official site returned HTTP 403 Forbidden; not bypassed."
      },
      {
        "name": "Solomon R. Guggenheim Museum",
        "url": "https://www.guggenheim.org/plan-your-visit",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; page returned only a cookie notice, nothing readable."
      },
      {
        "name": "Grand Central Terminal",
        "url": "https://www.grandcentralterminal.com/",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; official site returned HTTP 403 Forbidden; not bypassed."
      },
      {
        "name": "New York Public Library (Stephen A. Schwarzman Building)",
        "url": "https://www.nypl.org/locations/schwarzman",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; page returned no readable content."
      },
      {
        "name": "Brooklyn Museum",
        "url": "https://www.brooklynmuseum.org/visit",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; official site returned HTTP 429 Too Many Requests; not bypassed."
      },
      {
        "name": "Bryant Park",
        "url": "https://bryantpark.org/",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; homepage shows dated 2026 events but no address or hours, and the hours page returned 404."
      },
      {
        "name": "Brooklyn Bridge Park",
        "url": "https://www.brooklynbridgepark.org/",
        "checkedOn": "2026-10-21",
        "reason": "Gap candidate; hours and events shown but no street address, only pier and landing names."
      },
      {
        "name": "Dollar-slice and park time",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Michelin tasting menu",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Private skyline cruise",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Fifth Avenue hotel stay",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "West Village dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Jazz club night",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "FAO Schwarz area",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Museum morning",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "SoHo shopping",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Greenwich Village cafe day",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Observation deck",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "DUMBO sunrise",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      }
    ],
    "placeSources": {
      "Central Park": {
        "url": "https://www.centralparknyc.org/visit",
        "sourceType": "official park manager (Central Park Conservancy)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Homepage banner \"Match Your Gift During The Fall Membership Drive!\" (donation link 'fund-2026-09') and upcoming tours listed for Oct 23 and Oct 31."
      },
      "Central Park Zoo": {
        "url": "https://centralparkzoo.com/plan-your-visit",
        "sourceType": "operator's own site (Wildlife Conservation Society)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published hours for \"April 2 — October 31, 2026\" and \"November 1, 2026 — March 2027\"; homepage daily schedule dated 2026-10-22 with penguin and sea lion feedings."
      },
      "The High Line": {
        "url": "https://www.thehighline.org/visit/",
        "sourceType": "operator's own site (Friends of the High Line)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Park update banner: \"On October 19, the section of the park between 18th Street and 23rd Street will be temporarily closed\"; footer \"© 2000 - 2026 Friends of the High Line\"."
      },
      "Staten Island Ferry": {
        "url": "https://www.siferry.com/",
        "sourceType": "official public operator (City of New York)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Notice dated 03/27/26 \"Beer is Back at the Ferry\"; site states \"The Staten Island Ferry is a free service provided by the City of New York.\""
      },
      "Roosevelt Island Tram": {
        "url": "https://www.rioc.ny.gov/community/transportation/tram",
        "sourceType": "official public operator (Roosevelt Island Operating Corporation, New York State)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current timetable published; RIOC homepage reports a 50th-anniversary celebration at Tramway Plaza on June 1 and a May 18 cabin-redesign initiative; the tram \"accepts standard MTA fares, including OMNY tap-to-pay\"."
      },
      "9/11 Memorial & Museum": {
        "url": "https://www.911memorial.org/visit",
        "sourceType": "operator's own site (National September 11 Memorial & Museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Visit page with current hours and ticketing: the Museum \"requires advance ticket purchase\"; \"The Memorial is free and open to the public seven days a week\"; footer \"© 2026\"."
      },
      "Empire State Building": {
        "url": "https://www.esbnyc.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Ticket booking live: 86th Floor \"from $46\", 102nd & 86th Floor \"from $81\"; all visits require a timed reservation; \"2026 Run-Up\" listed and footer \"© 2026\"."
      },
      "Whitney Museum of American Art": {
        "url": "https://www.whitney.org/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current exhibitions listed, including \"Roy Lichtenstein: Like New\" and \"Dyani White Hawk: Nourish\" (no dates shown); advance tickets bookable online."
      },
      "The Frick Collection": {
        "url": "https://www.frick.org/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current gallery notices: \"The Cabinet Gallery and Anteroom are closed October 15–22\"; timed tickets bookable online ($30 adult). One notice on the page (Sunday, February 11) appears stale."
      },
      "Chelsea Market": {
        "url": "https://www.chelseamarket.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Dated events including \"Live Music - Sean the Cellist: October 21, 2026\" and \"Trick-or-Treating at Chelsea Market: October 31, 2026\"."
      },
      "Smorgasburg (Williamsburg)": {
        "url": "https://www.smorgasburg.com/new-york",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Listed as an active 2026-season location on Saturdays; Central Park and World Trade Center markets shown \"Closed for the Season\"."
      },
      "Katz's Delicatessen": {
        "url": "https://katzsdelicatessen.com/address",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Live menu and Manhattan delivery ordering (Pastrami Sandwich $28.95); holiday-hours notices; footer \"© 2026 Katz's Delicatessen\"."
      },
      "Crown Shy": {
        "url": "https://www.crownshy.nyc/location/crown-shy/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Weekly hours published and an online reservation form (\"Find A Table\"); no dated content seen."
      },
      "L'Artusi": {
        "url": "https://www.lartusi.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Reservations \"release on a two-week rolling basis, each day at 9 AM\" via Resy; menu file named \"L-Artusi_Wine_New_10.16.26\"."
      },
      "Via Carota": {
        "url": "https://www.viacarota.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Menu images named \"VC MENU 10-08-2026\"; \"Walk-ins always welcome\"; footer \"Copyright Via Carota 2026\"."
      },
      "Russ & Daughters Cafe": {
        "url": "https://www.russanddaughterscafe.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current hours and policy: \"No reservations - just walk-in!\" and \"(Sorry, no takeout.)\"; menu PDFs coded 041326 and 093026."
      },
      "Clinton St. Baking Company": {
        "url": "https://www.clintonstreetbaking.com/pages/contact",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Indoor dining, takeout and dinner hours published with a Reservations & Waitlist page; footer \"©2026 Clinton St. Baking Co.\"."
      },
      "Employees Only": {
        "url": "https://www.employeesonlynyc.com/reservations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Dinner reservations on Resy; \"all cocktail and appetizer requests are seated strictly on a walk-in basis\". Page is undated and includes older outdoor-dining text."
      },
      "Attaboy": {
        "url": "https://www.attaboy.us/nyc",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Published hours and booking: \"Limited reservations are available on OpenTable\", otherwise first-come, first-served; no dated content."
      },
      "Bemelmans Bar": {
        "url": "https://www.rosewoodhotels.com/en/the-carlyle-new-york/dining/bemelmans-bar",
        "sourceType": "operator's own site (Rosewood, The Carlyle)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Current cover charges (tables USD 25 to 35, bar USD 20 to 25 depending on the artist) and music schedule: pianists from 5:30 pm, jazz trio from 9 pm; footer \"© 2026\"."
      },
      "Dominique Ansel Bakery (Spring Street)": {
        "url": "https://www.dominiqueanselny.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "October 2026 menu PDF (\"DAB-Menu-OCT-2026\"); parent site offers Cronut pre-orders \"for Soho pick-ups starting October 1st\"."
      },
      "Levain Bakery (West 74th Street)": {
        "url": "https://levainbakery.com/pages/west-74th-street",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch page shows today's hours and a seasonal notice \"New Fall Flavors Online Now\"; footer \"©Levain Bakery 2026\"."
      },
      "La Cabra (SoHo)": {
        "url": "https://www.lacabra.com/pages/locations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch hours published on the locations page; site footer copyright 2026."
      },
      "Stumptown (Greenwich Village)": {
        "url": "https://www.stumptowncoffee.com/pages/locations",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch hours published with no closure notice; footer \"©2026 Stumptown Coffee Roasters\"."
      },
      "Devoción (Williamsburg)": {
        "url": "https://www.devocion.com/pages/cafes",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Cafés page lists this branch as \"Coffee Shop & Training Lab\" with current hours; online coffee shop live. No dated content seen."
      }
    }
  },
  "Amsterdam, Netherlands": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-21",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Several official sites could not be read by automated fetch: De Kas and the City of Amsterdam pages for Vondelpark and Albert Cuyp Market (HTTP 403), Restaurant Breda and Dignita (503 or connection refused), Lot Sixty One and Hortus Botanicus (certificate errors), the Van Gogh Museum (no readable content), and the GVB ferry page (403). Tales & Spirits' domain redirects elsewhere and Door 74's site is under construction. Some places were published only partially: NEMO and ARTIS hours were not readable, the Rembrandt House Museum's closing time was cut off, the Royal Palace's daily calendar did not load, and several cafés and bakeries (Cafe de Klepel, Little Collins, Fabel Friet, Hartog's Volkoren, Bocca Coffee, De Wasserette) showed hours but no 2026-dated content, so they are marked medium confidence. Gap candidates checked exceeded eight because many failed; the confirmed total is 22, below the 25-35 target.",
    "sourceUrls": [
      "docs/content-research/amsterdam-2026-10-21.md",
      "docs/content-research/amsterdam-2026-10-21.json"
    ],
    "excludedCandidates": [
      {
        "name": "Canal Belt",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (district)"
      },
      {
        "name": "Jordaan",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place (neighbourhood)"
      },
      {
        "name": "Jordaan or De Pijp",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Canal walks",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Market snacks",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Canal house stay",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Private boat cruise",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Fine tasting menu dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Canal cruise at dusk",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Jordaan dinner",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Museum and cafe day",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Canal boat ride",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Museum morning",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Coffee in De Pijp",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Noord ferry exploration",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Brown cafe night",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Hidden courtyard wandering",
        "checkedOn": "2026-10-21",
        "reason": "generic, not a place"
      },
      {
        "name": "Ferry to Noord",
        "url": "https://www.gvb.nl/en/visit-amsterdam/ferry",
        "checkedOn": "2026-10-21",
        "reason": "operator page (GVB) returned HTTP 403; not fetched further. (A'DAM Lookout's site mentions the free F3 ferry, used only as that venue's own travel note.)"
      },
      {
        "name": "De Kas",
        "url": "https://www.dekas.nl/en/",
        "checkedOn": "2026-10-21",
        "reason": "official site returned HTTP 403 Forbidden"
      },
      {
        "name": "Restaurant Breda",
        "url": "https://bredagroup-amsterdam.com/breda/",
        "checkedOn": "2026-10-21",
        "reason": "official site returned HTTP 503 Service Unavailable (www.restaurant-breda.nl does not resolve; breda-amsterdam.com 404)"
      },
      {
        "name": "Breda",
        "url": "https://bredagroup-amsterdam.com/breda/",
        "checkedOn": "2026-10-21",
        "reason": "duplicate of Restaurant Breda; official site HTTP 503"
      },
      {
        "name": "Dignita",
        "url": "https://www.eatwelldogood.nl/",
        "checkedOn": "2026-10-21",
        "reason": "official sites unreachable: eatwelldogood.nl HTTP 503, dignita.nl connection refused"
      },
      {
        "name": "Tales & Spirits",
        "url": "https://www.talesandspirits.com/",
        "checkedOn": "2026-10-21",
        "reason": "talesandspirits.com 301-redirects to an unrelated domain (jeremysaid.com); no official venue page readable"
      },
      {
        "name": "Door 74",
        "url": "https://www.door-74.com/",
        "checkedOn": "2026-10-21",
        "reason": "official site shows only \"This site is currently under construction\"; no address or operating evidence"
      },
      {
        "name": "Saint-Jean",
        "checkedOn": "2026-10-21",
        "reason": "no official website found (boulangerie-saintjean.nl does not resolve); only guides/maps list it"
      },
      {
        "name": "Lot Sixty One",
        "url": "https://www.lotsixtyonecoffee.com/",
        "checkedOn": "2026-10-21",
        "reason": "official site TLS/certificate error (TLSV1_ALERT_INTERNAL_ERROR); not bypassed"
      },
      {
        "name": "Friedhats",
        "url": "https://www.friedhats.com/",
        "checkedOn": "2026-10-21",
        "reason": "official site lists Fuku Cafe at Bos en Lommerweg 136 but no hours or dated content; operating status not evidenced"
      },
      {
        "name": "Vondelpark",
        "url": "https://www.amsterdam.nl/en/vondelpark/",
        "checkedOn": "2026-10-21",
        "reason": "City of Amsterdam page returned HTTP 403"
      },
      {
        "name": "Van Gogh Museum",
        "url": "https://www.vangoghmuseum.nl/en/visit",
        "checkedOn": "2026-10-21",
        "reason": "official pages returned no readable content (unrendered template placeholder only)"
      },
      {
        "name": "Heineken Experience",
        "url": "https://www.heinekenexperience.com/en/",
        "checkedOn": "2026-10-21",
        "reason": "official homepage shows no street address; contact page 404"
      },
      {
        "name": "Hortus Botanicus",
        "url": "https://www.hortusbotanicus.nl/",
        "checkedOn": "2026-10-21",
        "reason": "certificate hostname mismatch on hortusbotanicus.nl; not bypassed"
      },
      {
        "name": "Albert Cuyp Market",
        "url": "https://www.amsterdam.nl/en/markets/albert-cuyp-market/",
        "checkedOn": "2026-10-21",
        "reason": "City of Amsterdam page returned HTTP 403"
      },
      {
        "name": "Begijnhof",
        "url": "https://www.begijnhofamsterdam.nl/en/",
        "checkedOn": "2026-10-21",
        "reason": "candidate URL returned HTTP 404"
      },
      {
        "name": "Amsterdam Museum",
        "url": "https://www.amsterdammuseum.nl/en",
        "checkedOn": "2026-10-21",
        "reason": "main Kalverstraat location \"currectly closed\" for renovation; other locations listed without street addresses"
      }
    ],
    "placeSources": {
      "Rijksmuseum": {
        "url": "https://www.rijksmuseum.nl/en/visit",
        "sourceType": "operator's own site (national museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Visit page says \"Booking a start time is required for a visit to the Rijksmuseum\"; What's on lists 'Willem de Kooning at work' and 'Document Netherlands: New Energy' until 17 January, and 'Carel Visser in the Rijksmuseum Gardens' until 25 October as \"last chance\"."
      },
      "Anne Frank House": {
        "url": "https://www.annefrank.org/en/museum/tickets/",
        "sourceType": "operator's own site (Anne Frank House)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Ticket page: \"Tickets are not sold at the door, only online\", for a set time slot; new tickets on sale every Tuesday at 10am for a visit six weeks later. Lists 2026 exceptions, e.g. 7 November 2026 9:00-18:30."
      },
      "Stedelijk Museum": {
        "url": "https://www.stedelijk.nl/en/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Exhibitions page lists Yayoi Kusama (Sep 11, 2026 - Jan 17, 2027) and Adam Pendleton, 'Some Wild Kind of Language' (Oct 10, 2026 - Jan 17, 2027). Visit page asks visitors to buy tickets online in advance."
      },
      "Eye Filmmuseum": {
        "url": "https://www.eyefilm.nl/en/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Homepage lists the Ulrich Seidl exhibition (19 September 2026 - 31 January 2027) and the Yuzo Kawashima film programme (22 October - 11 November 2026). Visit page notes card-only payment."
      },
      "Oude Kerk": {
        "url": "https://www.oudekerk.nl/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Lists 'Mire Lee: Vomit My Blessing' from 13 November 2026 to 14 March 2027 and the tower visit (24 April - 31 October) as \"Now on\"; notice \"Oude Kerk temporarily closed\" for 9-12 November."
      },
      "Royal Palace Amsterdam": {
        "url": "https://www.paleisamsterdam.nl/en/visit/",
        "sourceType": "official public operator (Royal Palace Amsterdam)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Banner \"OPEN: 1 October - 11 November\"; says the Palace is open more than 230 days in 2026; October 'Drawing Month'. Visitor information warns \"The Palace may be closed due to a royal event.\""
      },
      "Rembrandt House Museum": {
        "url": "https://www.rembrandthuis.nl/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Lists an autumn-holiday etching workshop (11-25 October 2026) and 'The Poor Man's Rembrandt Project' tattoo studio (26 October - 7 November 2026)."
      },
      "NEMO Science Museum": {
        "url": "https://www.nemosciencemuseum.nl/en/plan-your-visit/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Plan-your-visit page: \"Tickets for NEMO have a start time\" and an 'Open on Mondays' list including \"Monday 12, 19, 26 October 2026\" and \"Monday 2 November 2026\"; homepage lists Museumnacht on 7 November."
      },
      "ARTIS": {
        "url": "https://www.artis.nl/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "News item dated 10 September 2026 on ARTIS-Micropia and the Rijksmuseum; \"the new ARTIS Aquarium is open again!\"; Late Afternoon Ticket on weekdays from 16:00 for €15."
      },
      "Het Scheepvaartmuseum": {
        "url": "https://www.hetscheepvaartmuseum.com/",
        "sourceType": "operator's own site (National Maritime Museum)",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Homepage publishes current daily hours and online ticket links; footer dated 2026. No exhibition titles or dates were readable."
      },
      "A'DAM Lookout": {
        "url": "https://www.adamlookout.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Online ticket sales from €16.50 with €2 off when booking online; Over the Edge swing and Skydeck; footer \"© 2026 A'DAM LOOKOUT\" and 2026 image uploads."
      },
      "Cafe de Klepel": {
        "url": "https://www.cafedeklepel.nl/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Live reservation system: \"Je kunt bij ons tot twee maanden van tevoren reserveren\"; max 8 per table; no vegan alternative to the menu. No 2026-dated content seen."
      },
      "Bakers & Roasters (Kadijksplein)": {
        "url": "https://www.bakersandroasters.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"We mainly operate as walk-in only\" with a virtual waitlist; limited reservations only at this branch; closure notice for King's Day (27/04/2026)."
      },
      "Bakers & Roasters (De Pijp)": {
        "url": "https://www.bakersandroasters.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Walk-in with virtual waitlist; closure notice for King's Day (27/04/2026) covering both locations."
      },
      "Little Collins": {
        "url": "https://www.littlecollins.nl/home/depijp",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Brunch page states \"Walk-in only\", \"Kitchen open until 15:30\" and holiday notice \"25 & 26 Dec & 1 Jan - closed\". No 2026-dated content seen."
      },
      "Foodhallen": {
        "url": "https://foodhallen.nl/en/amsterdam/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"open van 12:00 tot 23:00, 364 dagen per jaar\"; closed 25 December, closes 20:00 on 24 and 31 December; footer \"© 2026 Foodhallen\"."
      },
      "Fabel Friet (Runstraat)": {
        "url": "https://www.fabelfriet.nl/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Branch list publishes current hours for five Amsterdam branches, including Runstraat \"Maandag t/m Zondag: Open tussen 11:00 - 21:00\". No 2026-dated content seen."
      },
      "Super Lyan": {
        "url": "https://www.superlyan.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"We don't take reservations, just walk in!\"; groups over 8 book via SevenRooms; footer \"©2026 Mr Lyan and Lore Group\"."
      },
      "Vlaamsch Broodhuys (Haarlemmerstraat)": {
        "url": "https://www.vlaamschbroodhuys.nl/winkels/amsterdam",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Newsflash dated 21-10-2026 announces pumpkin cake, crunchy pumpkin muffin and stoofpeertaartje in all Baker's Cafés; Amsterdam store page lists eight branches open seven days."
      },
      "Hartog's Volkoren": {
        "url": "https://www.volkorenbrood.nl/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Site publishes current weekly shop hours with Sunday \"Gesloten\". No 2026-dated content seen."
      },
      "Bocca Coffee (Kerkstraat)": {
        "url": "https://bocca.nl/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "Site lists the espresso bar with current weekly hours. No 2026-dated content seen."
      },
      "De Wasserette": {
        "url": "https://www.dewasserette.com/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-21",
        "operatingEvidence": "\"opened daily from 7.30 until 17.00\"; \"Reservations are not necessary, you can sit whenever and wherever there is a seat available.\" No 2026-dated content seen."
      }
    }
  },
  "London, United Kingdom": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-14",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Suitability and grouping are editorial judgments. Thirty distinct recommendations cover all 15 fields; repeated category appearances are not additional verified places. Sites that refused automated fetches were read in a browser; the British Museum and Hamleys showed bot checks and were not verified. The Tower of London publishes hours one day at a time; The Barbary's hours were not readable and Claridge's does not publish afternoon tea sitting times.",
    "sourceUrls": [
      "docs/content-research/london-2026-10-14.md",
      "docs/content-research/london-2026-10-14.json"
    ],
    "excludedCandidates": [
      {
        "name": "British Museum",
        "url": "https://www.britishmuseum.org/visit",
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the official site shows a bot-check page to automated browsers. Not declared closed; the owner can confirm it in an ordinary browser."
      },
      {
        "name": "Hamleys (Regent Street)",
        "url": "https://www.hamleys.com/",
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the official site shows a bot-check page to automated browsers."
      },
      {
        "name": "Tayēr + Elementary",
        "url": "https://tayer-elementary.com/",
        "checkedOn": "2026-10-14",
        "reason": "Its own site says it is temporarily closed after a fire in the building, with no reopening date."
      }
    ],
    "placeSources": {
      "Tower of London": {
        "url": "https://www.hrp.org.uk/tower-of-london/visit/",
        "sourceType": "official public operator (Historic Royal Palaces)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The visit page sells tickets, shows opening times for the day (15 October: 09:00-17:30, last entry 16:30, last Yeoman Warder tour 15:15) and lists dated Opening Ceremony experiences until 1 November 2026. It asks visitors to check temporary route closures."
      },
      "Tower Bridge": {
        "url": "https://www.towerbridge.org.uk/plan-your-visit",
        "sourceType": "operator's own site (City of London Corporation)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Open daily with tickets on sale; annual closures 24-26 December. A relaxed opening runs on the second Saturday of each month, 09:30-11:30."
      },
      "Westminster Abbey": {
        "url": "https://www.westminster-abbey.org/visit-us/opening-times-and-prices/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Sightseeing hours are published (a working church that can close at short notice); the opening-times page shows a date-specific admittance window and closed areas."
      },
      "National Gallery": {
        "url": "https://www.nationalgallery.org.uk/visiting",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Daily hours and the current 'Renoir and Love' exhibition are listed; several rooms are closed for building work (floorplan lists Rooms 1, 7, 8, 16, 17, 17a, 30, 31 and the Sunley Room)."
      },
      "Tate Modern": {
        "url": "https://www.tate.org.uk/visit/tate-modern",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current exhibitions into 2027 are listed; the Level 0 cloakroom has closed and bags larger than 55x40x20 cm are not allowed."
      },
      "St Paul's Cathedral": {
        "url": "https://www.stpauls.co.uk/planning-your-visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Sightseeing tickets are on sale Monday to Saturday; times can change for services and events, and large bags are not allowed."
      },
      "V&A South Kensington": {
        "url": "https://www.vam.ac.uk/south-kensington",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current and upcoming exhibitions are listed (Rising Voices to January 2027; Constantinople to Istanbul from 7 November 2026); closed 24-26 December."
      },
      "Natural History Museum": {
        "url": "https://www.nhm.ac.uk/visit.html",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Daily hours, free entry with optional guaranteed-entry tickets, current exhibitions, and closures on 24-26 December."
      },
      "Science Museum": {
        "url": "https://www.sciencemuseum.org.uk/visit-us",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Free pre-booked tickets required; dated autumn closures including all day on 11 November 2026; some galleries closed for building work."
      },
      "Sky Garden": {
        "url": "https://skygarden.london/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Free timed tickets (released each Monday, three weeks ahead); capacity is temporarily reduced while one lift is out of service; a dated list of hire and maintenance closures for October-December 2026."
      },
      "Leadenhall Market": {
        "url": "https://www.leadenhallmarket.co.uk/",
        "sourceType": "operator's own site (City of London Corporation)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The public areas 'remain open 24/7'; 2026 seasonal events are listed."
      },
      "Covent Garden (Market Building and Piazza)": {
        "url": "https://www.coventgarden.london/about/faqs",
        "sourceType": "estate operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The Piazza and Market Building are always open; usual shop hours and current events (lights switch-on 12 November) are published."
      },
      "Borough Market": {
        "url": "https://boroughmarket.org.uk/visit-us/",
        "sourceType": "operator's own site (Borough Market trustees)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Regular trading hours (closed Mondays) and dated festive hours from 30 November 2026 to 2 January 2027."
      },
      "Dishoom (Covent Garden)": {
        "url": "https://www.dishoom.com/covent-garden/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Open all day, every day for breakfast, lunch and dinner; bookings for any group by day but only for 6 or more after 6 PM."
      },
      "The Barbary (Neal's Yard)": {
        "url": "https://www.thebarbary.co.uk/neals-yard",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Live booking widget for 2-4 people and walk-ins at the counter; hours are not shown in readable text."
      },
      "Rules": {
        "url": "https://rules.co.uk/contact/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "'Open seven days each week from 2nd March 2026' with a live booking link. No shorts or sportswear; children under 10 not admitted after 7 PM."
      },
      "Afternoon Tea at Claridge's": {
        "url": "https://www.maybourne.com/en/hotels/claridges/restaurants-bars/afternoon-tea",
        "sourceType": "hotel's official page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Served in the Foyer and Reading Room with a live booking link; a Festive Afternoon Tea replaces it from 3 November to 3 January (not 25 December). Sitting times are not published."
      },
      "Core by Clare Smyth": {
        "url": "https://www.corebyclaresmyth.com/menus/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current priced menus and an online reservation link; the whole table orders the same format."
      },
      "Padella (Borough Market)": {
        "url": "https://www.padella.co/borough-market",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "A dated daily menu ('Thursday 15th October') and a virtual queue; no reservations, groups up to 6."
      },
      "Flat Iron (Covent Garden)": {
        "url": "https://flatironsteak.co.uk/restaurant/covent-garden/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Branch page with current hours and a booking link; 16 other London branches are not substituted."
      },
      "Connaught Bar": {
        "url": "https://www.maybourne.com/en/hotels/the-connaught/restaurants-bars/connaught-bar",
        "sourceType": "hotel's official page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "A menu dated October 2026 and 'a no reservation policy'; Sunday hours are not published."
      },
      "Swift Soho": {
        "url": "https://www.barswift.com/swift-bar-locations",
        "sourceType": "bar's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Locations page with current hours and a booking link; walk-ins accepted."
      },
      "The Breakfast Club (Soho)": {
        "url": "https://www.thebreakfastclubcafes.com/soho",
        "sourceType": "café's own branch page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The original 2005 branch, with current hours and a menu 'available now'."
      },
      "Granger & Co. (Notting Hill)": {
        "url": "https://grangerandco.com/locations/notting-hill",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Location page with current hours (closing times are last orders); open all day, every day."
      },
      "Jolene (Newington Green)": {
        "url": "https://www.jolenebakery.com/location/jolene-newington-green",
        "sourceType": "bakery's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Bakery and restaurant hours, reservations and a Christmas dates page (no year shown). Sit-in at the bakery until 11:00 Tuesday-Sunday."
      },
      "Pophams (Islington)": {
        "url": "https://www.pophamsbakery.com/pages/locations",
        "sourceType": "bakery's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Locations page with current hours and live online ordering."
      },
      "Eric's Bakery (East Dulwich)": {
        "url": "https://www.ericslondon.com/pages/contact",
        "sourceType": "bakery's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "A neighbourhood bakery with an online shop (2026) and Thursday pre-order collections; open in person Thursday to Saturday, Friday and Saturday until sold out."
      },
      "Monmouth Coffee (Borough)": {
        "url": "https://www.monmouthcoffee.co.uk/",
        "sourceType": "roaster's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The 'Our shops' list gives this shop's address and hours; card payments only."
      },
      "Kiss the Hippo (Fitzrovia)": {
        "url": "https://kissthehippo.com/pages/locations",
        "sourceType": "roaster's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Locations page with current hours alongside 11 other cafés."
      },
      "Prufrock Coffee (Leather Lane)": {
        "url": "https://www.prufrockcoffee.com/",
        "sourceType": "café's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current hours, a priced menu and an online shop; the kitchen closes before the café."
      }
    }
  },
  "Paris, France": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-14",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised opening, booking and exhibition details do not guarantee availability. Suitability and grouping are editorial judgments. Twenty-eight distinct recommendations cover all 15 fields; repeated category appearances are not additional verified places. Sites that refused automated fetches were read in a browser; Notre-Dame's site showed a bot check and was not verified. Hours are not published for Mamiche, and Palais Garnier and Jardin d'Acclimatation show times only in booking calendars.",
    "sourceUrls": [
      "docs/content-research/paris-2026-10-14.md",
      "docs/content-research/paris-2026-10-14.json"
    ],
    "excludedCandidates": [
      {
        "name": "Centre Pompidou",
        "url": "https://www.centrepompidou.fr/en/visit",
        "checkedOn": "2026-10-14",
        "reason": "Closed for renovation since 22 September 2025, with a 2030 horizon; programmes run at partner venues."
      },
      {
        "name": "Notre-Dame de Paris",
        "url": "https://www.notredamedeparis.fr/en/visit/",
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the official site shows a bot-check page to automated browsers. Not declared closed. The owner can confirm it in an ordinary browser."
      },
      {
        "name": "Père Lachaise Cemetery",
        "url": "https://www.paris.fr/",
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the City of Paris page could not be found by URL or site search."
      },
      {
        "name": "Le Comptoir du Relais",
        "url": "https://www.hotel-paris-relais-saint-germain.com/restaurant-le-comptoir",
        "checkedOn": "2026-10-14",
        "reason": "The hotel's page publishes no hours, menu or dated content; walk-in only."
      },
      {
        "name": "Le Servan",
        "url": "https://www.leservan.com/",
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the official site could not be read or opened."
      },
      {
        "name": "L'As du Fallafel",
        "url": null,
        "checkedOn": "2026-10-14",
        "reason": "No official website found."
      },
      {
        "name": "Candelaria",
        "url": "https://candelaria-paris.com/",
        "checkedOn": "2026-10-14",
        "reason": "Its own site gives no address or hours (only 'every day of the week' and no reservations)."
      },
      {
        "name": "Carette",
        "url": null,
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the official site refused connections; no branch could be confirmed."
      },
      {
        "name": "Kozy",
        "url": null,
        "checkedOn": "2026-10-14",
        "reason": "Not verified: the official site could not be read; third-party addresses conflict."
      },
      {
        "name": "KB Coffee Roasters",
        "url": "https://www.kbcoffeeroasters.com",
        "checkedOn": "2026-10-14",
        "reason": "The official site gives no street address or hours for its Pigalle shop. One fetch reported text addressed to AI assistants on its homepage; it was ignored and did not reappear."
      }
    ],
    "placeSources": {
      "Eiffel Tower": {
        "url": "https://www.toureiffel.paris/en/rates-opening-times",
        "sourceType": "operator's own site (SETE)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The operator's calendar shows the tower open 9:30 AM-11 PM on 14-16 October 2026 with live attendance and weather, and says hours for later dates are published closer to the day. Last ascents 10:45 PM; access to the top can be restricted in severe weather or peak periods."
      },
      "Louvre Museum": {
        "url": "https://www.louvre.fr/en/visit/hours-admission",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current hours and 2026 rates are published, with a notice that timed reservation is required for all visitors from 17 October to 1 November 2026."
      },
      "Musée d'Orsay": {
        "url": "https://www.musee-orsay.fr/en/visit",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The visit page shows today's opening, a weekly schedule and last-admission times."
      },
      "Musée de l'Orangerie": {
        "url": "https://www.musee-orangerie.fr/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The homepage shows 'Open today from 9.00am to 6.00pm' and current exhibitions 'Monet, painting time' (30 September 2026-25 January 2027) and 'Vija Celmins' (until 15 February 2027). It warns of fake booking sites and long queues."
      },
      "Sainte-Chapelle": {
        "url": "https://www.sainte-chapelle.fr/en/visit/practical-information",
        "sourceType": "official public operator (Centre des monuments nationaux)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The CMN site sells tickets at prices effective 12 January 2026 and publishes winter hours; a restoration news item carries no closure notice."
      },
      "Arc de Triomphe": {
        "url": "https://www.paris-arc-de-triomphe.fr/en/visit/practical-information",
        "sourceType": "official public operator (Centre des monuments nationaux)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Tickets on sale and guided tours listed for 24 October and 6 November 2026. The lift is under maintenance until further notice, so the terrace is stairs only (284 steps)."
      },
      "Musée Rodin": {
        "url": "https://www.musee-rodin.fr/en",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Tickets on sale and dated events (31 October 2026 evening; family Sundays from September 2026). The separate Meudon site is closed until spring 2027."
      },
      "Palais Garnier": {
        "url": "https://www.operadeparis.fr/en/visits/palais-garnier",
        "sourceType": "operator's own site (Opéra national de Paris)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Self-guided visit tickets are on sale online (30 days ahead) and exhibitions are dated October 2026-February 2027. Rehearsals cause frequent, unannounced auditorium closures."
      },
      "Jardin du Luxembourg": {
        "url": "https://jardin.senat.fr/infos-pratiques/horaires-douverture.html",
        "sourceType": "official public operator (French Senate)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current exhibitions on the garden railings (19 September 2026-17 January 2027) and gate hours that change twice a month with daylight."
      },
      "Jardin d'Acclimatation": {
        "url": "https://www.jardindacclimatation.fr/en/",
        "sourceType": "operator's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Dated events (Día de los Muertos to 1 November 2026; lantern festival from 27 November 2026) and 'open every day of the year'."
      },
      "Cité des sciences et de l'industrie": {
        "url": "https://www.cite-sciences.fr/en/visit-us/opening-hours",
        "sourceType": "operator's own site (Universcience)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current exhibitions running into 2027 and special school-holiday hours for 19 October-1 November 2026."
      },
      "Marché aux Puces de Saint-Ouen": {
        "url": "https://www.pucesdeparissaintouen.com/en",
        "sourceType": "official market site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Runs every weekend of the year including public holidays; 2026 event items listed."
      },
      "Galerie Vivienne": {
        "url": "https://www.galerie-vivienne.com/",
        "sourceType": "the passage merchants' official site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "News posts dated 5, 7 and 13 October 2026; daily hours and free entry."
      },
      "Sacré-Cœur Basilica": {
        "url": "https://www.sacre-coeur-montmartre.com/en/info-and-visits/practical-information/hours-and-directions/",
        "sourceType": "operator's own site (basilica)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Open every day without exception, free entry; great-organ restoration through May 2027 noted."
      },
      "Septime": {
        "url": "https://www.septime-charonne.fr/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current autumn tasting menus (5-course lunch, 7-course dinner) and an active booking link; bookings open daily at 10:00 for 21 days ahead."
      },
      "Frenchie (rue du Nil)": {
        "url": "https://www.frenchie-ruedunil.com/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current five-course set dinner menu with pairings and an active booking link. Dinner only. Not Frenchie Bar à Vins or the group's other outlets."
      },
      "Bistrot Paul Bert": {
        "url": "https://www.bistrotpaulbert.fr/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current service hours and a phone booking line (bookings by phone only)."
      },
      "Le Jules Verne": {
        "url": "https://www.restaurants-toureiffel.com/fr/restaurant-jules-verne.html",
        "sourceType": "restaurant's own site (Eiffel Tower restaurants)",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Live booking link, phone and email booking, and a forward closure date of 14 July 2027. Jacket required for men; no shorts or sportswear."
      },
      "Clamato": {
        "url": "https://www.clamato-charonne.fr/",
        "sourceType": "restaurant's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Open seven days with published service times; no reservations (walk-in only)."
      },
      "Breizh Café (Marais)": {
        "url": "https://www.breizhcafe.com/le-marais",
        "sourceType": "restaurant group's own branch page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Live booking link and phone line for this branch; other Breizh Café branches are not substituted."
      },
      "Little Red Door": {
        "url": "https://www.lrdparis.com/",
        "sourceType": "bar's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Current menu ('Technics for Future Farming'), a booking link and 'Open 7/7 17h-01h, walk-ins welcomed'."
      },
      "Bar Hemingway (Ritz Paris)": {
        "url": "https://www.ritzparis.com/hotel/paris/bars-restaurants",
        "sourceType": "hotel's official page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The Ritz's bars page lists Bar Hemingway 'every day from 05:00pm to 12:00am, no booking required', tapas 5:30-10:30 PM."
      },
      "Holybelly": {
        "url": "https://holybellycafe.com",
        "sourceType": "café's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "A dated 2026 closure calendar and daily hours (last food order 16:00)."
      },
      "Du Pain et des Idées": {
        "url": "https://dupainetdesidees.com/boulangerie",
        "sourceType": "bakery's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Address, weekday hours and weekend closure; weekly workshops promoted (site 2025-2026)."
      },
      "Poilâne (rue du Cherche-Midi)": {
        "url": "https://www.poilane.com/pages/boulangerie-poilane-saint-germain-des-pres",
        "sourceType": "bakery's own shop page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The original shop's page lists current weekly hours; no shop closure notice."
      },
      "Mamiche (rue du Château d'Eau)": {
        "url": "https://www.mamiche.fr",
        "sourceType": "bakery's own site",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Listed with address and phone; the site says delivery has ended and invites customers to the shops. Hours are not published."
      },
      "Terres de Café (Rambuteau)": {
        "url": "https://www.terresdecafe.com/fr/content/70-nos-boutiques",
        "sourceType": "roaster's own shop list",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "The shop list gives this branch's phone and weekly hours; an active online shop."
      },
      "Coutume Café (Babylone)": {
        "url": "https://www.coutumecafe.com/pages/cafe-babylone",
        "sourceType": "café's own branch page",
        "checkedOn": "2026-10-14",
        "operatingEvidence": "Branch page with brunch description and table reservations; weekly hours shown in an embedded widget labelled 'powered by Google'."
      }
    }
  },
  "Hong Kong, China": {
    "renderVerifiedOnly": true,
    "checkedOn": "2026-10-06",
    "status": "source-checked",
    "reviewScope": "cityGuideDetailData",
    "verificationMethod": "official-web-review",
    "limitations": "Website review, not a visit or telephone confirmation. Advertised service does not guarantee availability. Audience placements are editorial judgements. Missing independent corroboration is recorded, not assumed. No recommendation of inaccessible candidate sites and no inference that a fetch failure means closure.",
    "sourceUrls": [
        "https://www.discoverhongkong.com/eng/index.html"
    ],
    "placeSources": {
        "M+": {
            "sourcedFor": "bestAttractions",
            "url": "https://www.mplus.org.hk/en/plan-your-visit/",
            "locationSourceUrl": "https://www.mplus.org.hk/en/plan-your-visit/",
            "checkedOn": "2026-10-06",
            "sourceType": "official museum operator",
            "address": "38 Museum Drive, West Kowloon Cultural District, Kowloon",
            "operatingEvidence": "Current ticket information, opening days and getting-here directions. Free public spaces listed separately from paid gallery access.",
            "independentCorroborationUrls": [],
            "budgetScope": "Mediatheque, Grand Stair except ticketed events, B1, B2, Found Space and Roof Garden advertised as free; not all exhibitions."
        },
        "Star Ferry (Central-Tsim Sha Tsui)": {
            "sourcedFor": "bestFirstTimers",
            "url": "https://www.starferry.com.hk/en/service",
            "locationSourceUrl": "https://www.starferry.com.hk/en/pier",
            "checkedOn": "2026-10-06",
            "sourceType": "official ferry operator",
            "address": "Central and Tsim Sha Tsui Star Ferry piers",
            "operatingEvidence": "Current Central-Tsim Sha Tsui timetable and operator pier information. Sailing times can vary with weather and traffic. Harbour tours are a separate service.",
            "independentCorroborationUrls": [
                "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-star-ferry-pier.html"
            ]
        },
        "PMQ": {
            "sourcedFor": "bestUnique",
            "url": "https://www.pmq.org.hk/tourist-information/explore-pmq/?lang=en",
            "locationSourceUrl": "https://www.pmq.org.hk/the-site/location-transportation/",
            "checkedOn": "2026-10-06",
            "sourceType": "official venue operator",
            "address": "35 Aberdeen Street, Central",
            "operatingEvidence": "Current studio/shop visitor information and walking routes from MTR stations. Individual tenant and event hours differ; no specific workshop or free admission promise.",
            "independentCorroborationUrls": [
                "https://www.discoverhongkong.com/tc/place-to-go/travel.guide-pmq.html"
            ]
        },
        "Bakehouse (Wan Chai)": {
            "sourcedFor": "bestBreakfast",
            "url": "https://www.bakehouse.hk/wanchai-cafe-menu",
            "locationSourceUrl": "https://www.bakehouse.hk/locations",
            "checkedOn": "2026-10-06",
            "sourceType": "business's own site",
            "address": "G/F, 14 Tai Wong Street East, Wan Chai",
            "operatingEvidence": "Current dine-in breakfast, brunch and pastry menus; branch hours and reservation link. Other branches include takeaway-only locations and are not substituted.",
            "independentCorroborationUrls": []
        },
        "Duddell's (Central)": {
            "sourcedFor": "bestLunch",
            "url": "https://duddells.co/",
            "locationSourceUrl": "https://duddells.co/",
            "checkedOn": "2026-10-06",
            "sourceType": "business's own site",
            "address": "Levels 3 and 4, 1 Duddell Street, Central",
            "operatingEvidence": "Current lunch and dinner menus, reservations and contact address after renovation. Main dining room and Upper Room have different service arrangements. Airport branch is not substituted.",
            "independentCorroborationUrls": [
                "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-duddell-s.html"
            ]
        },
        "Lung King Heen": {
            "sourcedFor": "bestDinner",
            "url": "https://www.fourseasons.com/hongkong/dining/restaurants/lung_king_heen/",
            "locationSourceUrl": "https://www.fourseasons.com/hongkong/getting-here/",
            "checkedOn": "2026-10-06",
            "sourceType": "business's own hotel site",
            "address": "4/F, Four Seasons Hotel Hong Kong, 8 Finance Street, Central",
            "operatingEvidence": "Current lunch/dinner service, menus and reservations. Weekday child-age restrictions are advertised. Getting-here page notes IFC escalator maintenance September 1-November 30, 2026 and lift access.",
            "independentCorroborationUrls": [
                "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-lung-king-heen.html"
            ]
        },
        "ARGO": {
            "sourcedFor": "bestCocktails",
            "url": "https://www.fourseasons.com/hongkong/dining/lounges/argo/",
            "locationSourceUrl": "https://www.fourseasons.com/hongkong/getting-here/",
            "checkedOn": "2026-10-06",
            "sourceType": "business's own hotel site",
            "address": "1/F, Four Seasons Hotel Hong Kong, 8 Finance Street, Central",
            "operatingEvidence": "Current evening hours, cocktail menu and reservation contact; non-hotel guests welcome. Directions identify current hotel entrance arrangements. Not presented as unrestricted children's access.",
            "independentCorroborationUrls": [
                "https://www.discoverhongkong.com/eng/place-to-go/travel.guide-argo.html"
            ]
        },
        "noc (Tsim Sha Tsui, Sun Arcade)": {
            "sourcedFor": "bestCoffee",
            "url": "https://noc.coffee/menu/",
            "locationSourceUrl": "https://noc.coffee/locations/tsim-sha-tsui/",
            "checkedOn": "2026-10-06",
            "sourceType": "business's own site",
            "address": "Shop 02, UG/F, The Sun Arcade, 28 Canton Road, Tsim Sha Tsui",
            "operatingEvidence": "Current branch address, weekday/weekend hours and coffeehouse/brunch description. Menu advertises coffee. Not the Empire Centre branch; Graham Street was not found in the current location list and is not used.",
            "additionalCheckedUrls": [
                "https://noc.coffee/location/"
            ],
            "independentCorroborationUrls": []
        }
    }
},
  "Hanoi, Vietnam": {
    renderVerifiedOnly: true, checkedOn: "2026-10-06", status: "source-checked", reviewScope: "cityGuideDetailData", verificationMethod: "official-web-review",
    limitations: "Operator website review, not a visit or telephone confirmation. Current advertised service is not guaranteed availability. Category grouping is editorial. Unreadable and conflicting candidates were omitted; bakery and budget fields remain empty. Own-site pages are not independent corroboration.",
    sourceUrls: ["https://vietnam.travel/vi/places-to-go/northern-vietnam/ha-noi"],
    placeSources: {
      "Temple of Literature": { sourcedFor: "bestAttractions", url: "https://vanmieu.gov.vn/fr/visitor-information", locationSourceUrl: "https://vanmieu.gov.vn/fr/visitor-information", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current visitor services and entrance at 58 Quoc Tu Giam, Hanoi. Night-ticket prices conflict; no prices or night schedule promised." },
      "Hanoi Museum": { sourcedFor: "bestAttractions", url: "https://baotanghanoi.com.vn/en/", locationSourceUrl: "https://baotanghanoi.com.vn/en/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Visitor information, tour registration and September 2026 news at Pham Hung Street, Hanoi. No specific workshop promised." },
      "Lifted Coffee & Brunch (Hang Ga)": { sourcedFor: "bestBreakfast", url: "https://www.liftedgotbrunch.com/our-story", locationSourceUrl: "https://www.liftedgotbrunch.com/reservations", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "All-day brunch, coffee and current table requests at 101 Hang Ga, Hoan Kiem, Hanoi." },
      "Cafe Giang (Nguyen Huu Huan)": { sourcedFor: "bestCoffee", url: "https://cafegiang.vn/", locationSourceUrl: "https://cafegiang.vn/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Egg coffee, current hours and contact at 39 Nguyen Huu Huan, Hanoi. Other branches are not substituted." },
      "Red Bean Ma May": { sourcedFor: "bestDinner", url: "https://mamay.redbeanrestaurants.com/about-us", locationSourceUrl: "https://mamay.redbeanrestaurants.com/about-us", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Daily breakfast and lunch/dinner service and table request form at 94 Ma May, Hanoi." },
      "Le Beaulieu": { sourcedFor: "bestLuxury", url: "https://www.sofitel-legend-metropole-hanoi.com/dining/le-beaulieu/", locationSourceUrl: "https://www.sofitel-legend-metropole-hanoi.com/dining/le-beaulieu/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current menus and booking at Metropole Hanoi, 15 Ngo Quyen. Lunch, dinner and Sunday brunch schedules differ." },
      "angelina": { sourcedFor: "bestCocktails", url: "https://www.sofitel-legend-metropole-hanoi.com/dining/angelina/", locationSourceUrl: "https://www.sofitel-legend-metropole-hanoi.com/dining/angelina/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current cocktail/whisky lounge and table booking at Metropole Hanoi, 15 Ngo Quyen. Not a children's activity." },
      "KOTO Van Mieu": { sourcedFor: "bestLunch", url: "https://www.koto.com.au/koto-enterprise/koto-van-mieu", locationSourceUrl: "https://www.koto.com.au/reserve-a-table", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current menu, dining service and booking at 35 Van Mieu, Hanoi. Older leads show 59 Van Mieu; current operator address controls. Floors are not counted as separate places." }
    }
  },
  "Berlin, Germany": {
    renderVerifiedOnly: true, checkedOn: "2026-10-06", status: "source-checked", reviewScope: "cityGuideDetailData", verificationMethod: "official-web-review",
    limitations: "Official operator website review, not a visit or telephone confirmation. Current advertised access and reservations do not guarantee availability. Categories express editorial suitability. Unresolved venues omitted. Own-site pages are not independent corroboration. Public historical sites are scoped to their named locations, not a foundation mailing address.",
    sourceUrls: ["https://www.visitberlin.de/en"],
    placeSources: {
      "Neues Museum": { sourcedFor: "bestAttractions", url: "https://www.smb.museum/en/museums-institutions/neues-museum/plan-your-visit/", locationSourceUrl: "https://www.smb.museum/en/museums-institutions/neues-museum/plan-your-visit/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets and visitor hours; entrance through James Simon Galerie, Bodestrasse, Berlin. Future maintenance dates are listed." },
      "Berlin Wall Memorial": { sourcedFor: "bestAttractions", url: "https://www.stiftung-berliner-mauer.de/en/berlin-wall-memorial", locationSourceUrl: "https://www.stiftung-berliner-mauer.de/en/berlin-wall-memorial", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current outdoor/indoor exhibitions and education identify historical site on Bernauer Strasse. No foundation-office address used as visitor entrance." },
      "Museum fuer Naturkunde Berlin": { sourcedFor: "bestKids", url: "https://www.museumfuernaturkunde.berlin/en", locationSourceUrl: "https://www.museumfuernaturkunde.berlin/en", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current October events and visitor information at Invalidenstrasse 43. Specific workshops require separate date checks." },
      "DDR Museum": { sourcedFor: "bestUnique", url: "https://www.ddr-museum.de/en/visit", locationSourceUrl: "https://www.ddr-museum.de/en/visit", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets, daily visitor information and address Karl-Liebknecht-Strasse 1, Berlin. Spree promenade access has stairs or steep ramp." },
      "Zoo Berlin": { sourcedFor: "bestKids", url: "https://www.zoo-berlin.de/en", locationSourceUrl: "https://www.zoo-berlin.de/en", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets and dated visitor hours at Hardenbergplatz 8, Berlin. Aquarium admission not assumed included." },
      "East Side Gallery": { sourcedFor: "bestBudget", url: "https://www.stiftung-berliner-mauer.de/en/east-side-gallery", locationSourceUrl: "https://www.stiftung-berliner-mauer.de/en/east-side-gallery", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current historical-site information and education for the gallery on Muehlenstrasse, Berlin. Scoped as outdoor wall-art visit, not foundation office." },
      "Charlottenburg Palace (Old Palace)": { sourcedFor: "bestAttractions", url: "https://www.spsg.de/en/palaces-gardens/object/charlottenburg-palace-old-palace/", locationSourceUrl: "https://www.spsg.de/en/palaces-gardens/object/charlottenburg-palace-old-palace/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets and visitor information at Spandauer Damm 10-22, Berlin. Other palace areas have different admission and access." },
      "House of Small Wonder (Auguststrasse)": { sourcedFor: "bestBreakfast", url: "https://www.houseofsmallwonder.de/find-us", locationSourceUrl: "https://www.houseofsmallwonder.de/find-us", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current brunch at Auguststrasse 11-13, Berlin. Johannisstrasse 20 remains closed. Operator warns ride-app name selection can send visitors to former address. Dinner is branded Candyman." },
      "THE BARN (Mitte)": { sourcedFor: "bestCoffee", url: "https://thebarn.de/pages/locations/mitte", locationSourceUrl: "https://thebarn.de/pages/locations/mitte", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current coffee, cakes and sandwiches with branch hours at Auguststrasse 58, Berlin." },
      "Zeit fuer Brot (Alte Schoenhauser Strasse)": { sourcedFor: "bestBakeries", url: "https://zeitfuerbrot.com/en/bakeries", locationSourceUrl: "https://zeitfuerbrot.com/en/bakeries", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current bakery branch and hours at Alte Schoenhauser Strasse 4, Berlin." },
      "Restaurant Tim Raue": { sourcedFor: "bestDinner", url: "https://tim-raue.com/", locationSourceUrl: "https://tim-raue.com/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current dinner reservation and menu links at Rudi-Dutschke-Strasse 26, Berlin. Lunch not inferred from old listings." },
      "Green Door Bar": { sourcedFor: "bestCocktails", url: "https://www.greendoor.de/de/", locationSourceUrl: "https://www.greendoor.de/de/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current cocktail menu, evening service and contact at Winterfeldtstrasse 50, Berlin." },
      "Markthalle Neun": { sourcedFor: "bestLunch", url: "https://markthalleneun.de/ueber", locationSourceUrl: "https://markthalleneun.de/ueber", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current market calendar, lunch link and entrance at Eisenbahnstrasse 42/43, Berlin. Hall and individual stall hours differ." },
      "Nobelhart & Schmutzig": { sourcedFor: "bestRestaurants", url: "https://nobelhartundschmutzig.com/en/", locationSourceUrl: "https://nobelhartundschmutzig.com/en/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current dinner reservations and address Friedrichstrasse 218, Berlin. Main hours and footer disagree, so no fixed weekly schedule promised." },
      "Tempelhofer Feld": { sourcedFor: "bestBudget", url: "https://www.tempelhoferfeld.de/service-infos/besuch-planen/", locationSourceUrl: "https://www.tempelhoferfeld.de/service-infos/besuch-planen/", sourceType: "official public operator", checkedOn: "2026-10-06", operatingEvidence: "Free admission, seasonal gate hours, mapped entrances and park rules. Current development work can restrict areas." },
      "Deutsches Technikmuseum": { sourcedFor: "bestKids", url: "https://technikmuseum.berlin/", locationSourceUrl: "https://technikmuseum.berlin/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets, exhibitions and visitor hours at Trebbiner Strasse 9, Berlin. Photography, film and chemistry/pharmacy exhibitions currently inaccessible. Spectrum has a different entrance." }
    }
  },
  "Vienna, Austria": {
    renderVerifiedOnly: true, checkedOn: "2026-10-06", status: "source-checked", reviewScope: "cityGuideDetailData", verificationMethod: "official-web-review",
    limitations: "Official website review, not a visit or telephone confirmation. Current advertised visits and reservations are operating evidence, not guaranteed availability. Suitability is editorial. Cafe Central renovation excludes its Palais Ferstel branch. Unresolved bars omitted; cocktail and budget fields remain empty. No independent-source claim for multiple operator pages.",
    sourceUrls: ["https://www.wien.info/en"],
    placeSources: {
      "Schoenbrunn Palace": { sourcedFor: "bestAttractions", url: "https://www.schoenbrunn.at/en", locationSourceUrl: "https://www.schoenbrunn.at/en", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current palace visits, official ticket links and site information. Gardens and children's museum have separate admission arrangements." },
      "Upper Belvedere": { sourcedFor: "bestAttractions", url: "https://www.belvedere.at/en/visit/upper-belvedere", locationSourceUrl: "https://www.belvedere.at/en/visit/upper-belvedere", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current timed tickets and visiting information at Prinz Eugen Strasse 27, Vienna. Lower Belvedere is not substituted." },
      "ALBERTINA (Albertinaplatz)": { sourcedFor: "bestSolo", url: "https://www.albertina.at/en/", locationSourceUrl: "https://www.albertina.at/en/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current exhibitions and hours at Albertinaplatz 1, Vienna. ALBERTINA Modern and Klosterneuburg are other venues." },
      "Schoenbrunn Zoo": { sourcedFor: "bestKids", url: "https://www.zoovienna.at/en/zoo-and-visitors/visitor-information/", locationSourceUrl: "https://www.zoovienna.at/en/zoo-and-visitors/how-to-get-there/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current daily visits, seasonal closing and ticket links at Vienna Zoo in Schoenbrunn. Children under 14 require an adult; zoo admission distinct from palace." },
      "Natural History Museum Vienna": { sourcedFor: "bestKids", url: "https://www.nhm.at/en", locationSourceUrl: "https://www.nhm.at/en", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current hours, tickets and September news at Maria-Theresien-Platz, Vienna. Tuesday closure and closed galleries noted; no whole-gallery availability guarantee." },
      "Vienna State Opera": { sourcedFor: "bestCouples", url: "https://www.wiener-staatsoper.at/en/", locationSourceUrl: "https://www.wiener-staatsoper.at/en/getting-here/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current October performances and tickets at Opernring 2, Vienna. Performance choice and availability require booking." },
      "Mozarthaus Vienna": { sourcedFor: "bestUnique", url: "https://www.mozarthausvienna.at/en", locationSourceUrl: "https://www.mozarthausvienna.at/en", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current museum visits and October concerts at Domgasse 5, Vienna." },
      "Demel (Kohlmarkt)": { sourcedFor: "bestBakeries", url: "https://www.demel.com/", locationSourceUrl: "https://www.demel.com/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current cafe and bakery service at Kohlmarkt 14, Vienna. No reservations; not an early breakfast claim." },
      "Joseph Brot (Fuehrichgasse)": { sourcedFor: "bestBreakfast", url: "https://www.joseph.co.at/en/standorte/", locationSourceUrl: "https://www.joseph.co.at/en/standorte/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current bistro menu and hours at Fuehrichgasse 6, Vienna. Kitchen finishes before bistro closing." },
      "MOTTO am Fluss": { sourcedFor: "bestLunch", url: "https://mottoamfluss.at/en/", locationSourceUrl: "https://mottoamfluss.at/en/contact/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current cafe service and restaurant booking at Franz-Josefs-Kai 2, Vienna. Cafe/daytime and restaurant/evening are separate services, one recommendation." },
      "Figlmueller (Wollzeile)": { sourcedFor: "bestLunch", url: "https://www.figlmueller.at/en/wollzeile/", locationSourceUrl: "https://www.figlmueller.at/en/wollzeile/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current menu and table booking at Wollzeile 5, Vienna. Other restaurant branches not interchangeable." },
      "Meissl & Schadn (Vienna)": { sourcedFor: "bestDinner", url: "https://meisslundschadn.at/en/meissl-schadn-vienna/", locationSourceUrl: "https://meisslundschadn.at/en/meissl-schadn-vienna/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current menus and reservations at Schubertring 10-12, Vienna. Salzburg is a separate branch." },
      "KunstHausWien": { sourcedFor: "bestUnique", url: "https://www.kunsthauswien.com/en/", locationSourceUrl: "https://www.kunsthauswien.com/en/visit", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current daily admission and October events at Untere Weissgerberstrasse 13, Vienna. Family events have specific dates and languages." },
      "Leopold Museum": { sourcedFor: "bestSolo", url: "https://www.leopoldmuseum.org/en/visit/opening-hours", locationSourceUrl: "https://www.leopoldmuseum.org/en/visit/getting-here", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current visits and group booking at Museumsplatz 1, MuseumsQuartier, Vienna. Tuesday closure noted." },
      "St. Stephen's Cathedral": { sourcedFor: "bestAttractions", url: "https://www.stephanskirche.at/", locationSourceUrl: "https://www.stephanskirche.at/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current visitor times, tours and address Stephansplatz 3, Vienna. Worship and visitor hours differ; liturgical changes possible." }
    }
  },
  "Munich, Germany": {
    renderVerifiedOnly: true, checkedOn: "2026-10-06", status: "source-checked", reviewScope: "cityGuideDetailData", verificationMethod: "official-web-review",
    limitations: "Official operator website review, not a visit or telephone confirmation. Current advertised service and admission do not guarantee availability. Category suitability is editorial. Unresolved candidates omitted. Lenbachhaus scope excludes closed Kunstbau. BMW Welt and Museum are separate visitor offerings. Own-site pages are not independent corroboration.",
    sourceUrls: ["https://www.munich.travel/en"],
    placeSources: {
      "Deutsches Museum (Museumsinsel)": { sourcedFor: "bestKids", url: "https://www.deutsches-museum.de/en", locationSourceUrl: "https://www.deutsches-museum.de/en", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets, children's area and October events at Museumsinsel 1, Munich. Other museum branches not substituted." },
      "Munich Residence": { sourcedFor: "bestAttractions", url: "https://www.residenz-muenchen.de/englisch/tourist/opening.htm", locationSourceUrl: "https://www.residenz-muenchen.de/englisch/tourist/howtoget.htm", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current visitor hours, ticket links and directions for Munich Residence. Treasury and theatre have different admission; no prams in exhibition rooms." },
      "BMW Welt": { sourcedFor: "bestUnique", url: "https://www.bmw-welt.com/en/index.html", locationSourceUrl: "https://www.bmw-welt.com/en/index.html", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current free building visits and Olympiazentrum directions. October 10 and October 20-22 restrictions published; check chosen date." },
      "BMW Museum": { sourcedFor: "bestAttractions", url: "https://www.bmw-welt.com/en/index.html", locationSourceUrl: "https://www.bmw-welt.com/en/index.html", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current ticketed museum visits, distinct from free BMW Welt building. Museum normally closes Mondays." },
      "Munich Documentation Centre for the History of National Socialism": { sourcedFor: "bestBudget", url: "https://www.nsdoku.de/en", locationSourceUrl: "https://www.nsdoku.de/en", sourceType: "official municipal operator", checkedOn: "2026-10-06", operatingEvidence: "Current free admission, exhibition and visitor information at Max-Mannheimer-Platz 1, Munich. Serious historical content, not children's entertainment." },
      "Augustiner Klosterwirt": { sourcedFor: "bestDinner", url: "https://www.augustiner-klosterwirt.de/index.php", locationSourceUrl: "https://www.augustiner-klosterwirt.de/index.php", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current menus, reservations and service at Augustinerstrasse 1, Munich." },
      "Restaurant Tantris": { sourcedFor: "bestLuxury", url: "https://tantris.de/en/", locationSourceUrl: "https://tantris.de/en/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current lunch/dinner reservations at Johann-Fichte-Strasse 7, Munich. Tantris DNA is a different restaurant; closed Sunday through Tuesday." },
      "Rischart (Cafe am Marienplatz)": { sourcedFor: "bestBakeries", url: "https://www.rischart.de/filialen/cafes/", locationSourceUrl: "https://www.rischart.de/filialen/cafes/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current cafe hours, breakfast, meals and cakes at Marienplatz 18, Munich." },
      "Hofbraeuhaus Muenchen": { sourcedFor: "bestLunch", url: "https://www.hofbraeuhaus.de/en/", locationSourceUrl: "https://www.hofbraeuhaus.de/en/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current daily dining, booking and address Platzl 9, Munich. Reservation arrangements vary by room." },
      "Schumann's Bar (Hofgarten)": { sourcedFor: "bestCocktails", url: "https://www.schumanns.de/de/schumanns-bar.html", locationSourceUrl: "https://www.schumanns.de/de/schumanns-bar.html", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current bar and food service at Odeonsplatz 6-7, Munich. Saturday closed; other Schumann's venues distinct." },
      "Man versus Machine (Glockenbach)": { sourcedFor: "bestCoffee", url: "https://mvsm.coffee/pages/mvsm-locations", locationSourceUrl: "https://mvsm.coffee/pages/mvsm-locations", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current branch hours and coffee at Muellerstrasse 23, Munich." },
      "Dallmayr Cafe Bistro": { sourcedFor: "bestBreakfast", url: "https://www.dallmayr.com/de/delikatessenhaus/cafe-bistro/", locationSourceUrl: "https://www.dallmayr.com/de/delikatessenhaus/cafe-bistro/", sourceType: "business's own site", checkedOn: "2026-10-06", operatingEvidence: "Current breakfast, lunch, pastries and reservations at Dienerstrasse 14, Munich. Sunday and public-holiday closure noted." },
      "Hellabrunn Zoo": { sourcedFor: "bestKids", url: "https://www.hellabrunn.de/en/", locationSourceUrl: "https://www.hellabrunn.de/en/", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets and September news at Tierparkstrasse 30, Munich. U3 replacement service through November 28 and construction restrictions published." },
      "Alte Pinakothek": { sourcedFor: "bestAttractions", url: "https://www.pinakothek.de/en/alte-pinakothek", locationSourceUrl: "https://www.pinakothek.de/en/alte-pinakothek", sourceType: "official operator", checkedOn: "2026-10-06", operatingEvidence: "Current tickets, admission and entrance via Theresienstrasse at Barer Strasse 27, Munich. Monday closure noted." },
      "Lenbachhaus": { sourcedFor: "bestSolo", url: "https://www.lenbachhaus.de/en/visit/plan-your-visit", locationSourceUrl: "https://www.lenbachhaus.de/en/visit/plan-your-visit", sourceType: "official municipal operator", checkedOn: "2026-10-06", operatingEvidence: "Current museum admission and hours at Luisenstrasse 33, Munich. Kunstbau remains closed in 2026; excluded from scope." }
    }
  },
  "Singapore, Singapore": {
    renderVerifiedOnly: true,
    checkedOn: "2026-10-06",
    status: "source-checked",
    reviewScope: "cityGuideDetailData",
    verificationMethod: "official-web-review",
    limitations: "Website review, not a visit or telephone confirmation. Current advertised visits, menus and reservations are operating evidence, not guaranteed availability. Suitability and grouping are editorial judgments. Thirteen distinct recommendations cover all 15 fields; repeated category appearances are not additional verified places. Independent corroboration was read for National Gallery and National Kitchen; remaining records rely on their own operator. Exact hours and prices are not promised. ATLAS has inconsistent hours within its page, so confirm reservations directly.",
    sourceUrls: ["https://www.visitsingapore.com/", "https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/civic-district/national-gallery-singapore/"],
    excludedCandidates: [
      { name: "Flower Dome", url: "https://www.gardensbythebay.com.sg/en/plan-your-visit/opening-hours.html", checkedOn: "2026-10-06", reason: "Maintenance closure on the check date. Outdoor gardens are a separately scoped recommendation; no claim the whole park is closed." },
      { name: "Haw Par Villa", url: "https://www.hawparvilla.sg/", checkedOn: "2026-10-06", reason: "Earlier checkpoint found partial closure. Not included as an unrestricted park visit; no claim of permanent closure." },
      { name: "Song Fa Bak Kut Teh", url: "https://songfa.com.sg/pages/outlets", checkedOn: "2026-10-06", reason: "Readable outlet page did not expose branch details. Omitted without guessing an address or claiming closure." },
      { name: "Ya Kun Kaya Toast", url: "https://yakun.com/find-us/local/singapore", checkedOn: "2026-10-06", reason: "Operator page could not be read. Omitted without guessing branch or operating status." }
    ],
    placeSources: {
      "Gardens by the Bay outdoor gardens": { url: "https://www.gardensbythebay.com.sg/en/plan-your-visit/opening-hours.html", sourceType: "operator's own site", checkedOn: "2026-10-06", operatingEvidence: "Operator lists outdoor gardens at 18 Marina Gardens Drive with current daily access. Scope excludes ticketed conservatories and elevated attractions. Flower Dome has a maintenance closure on the check date; bridge works divert pedestrians. Check current notices before visiting." },
      "Singapore Botanic Gardens": { url: "https://sbg.nparks.gov.sg/visit/general-info/", sourceType: "official public operator", checkedOn: "2026-10-06", operatingEvidence: "NParks lists daily garden access, free general admission and separate National Orchid Garden charges. Tanglin entrance is served by Napier MRT; Bukit Timah entrance by Botanic Gardens MRT. Visitor maps and access arrangements are published. Not a claim every garden attraction is open." },
      "Jacob Ballas Children's Garden": { url: "https://sbg.nparks.gov.sg/visit/general-info/", sourceType: "official public operator", checkedOn: "2026-10-06", operatingEvidence: "NParks lists current visiting hours and a normally Monday closure, with public-holiday exceptions. Children up to 14 must be accompanied by adults. This is the named children's garden within Singapore Botanic Gardens, not a generic playground recommendation." },
      "National Gallery Singapore": { url: "https://www.nationalgallery.sg/sg/en/visit/visitor-information.html", sourceType: "operator's own site", secondSourceUrl: "https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/civic-district/national-gallery-singapore/", checkedOn: "2026-10-06", operatingEvidence: "Current visitor page gives 1 St Andrew's Road, advertised daily opening, tickets and accessible entrances. UOB Southeast Asia Gallery is closed until late 2027; other displays remain open. October road and entrance restrictions are described, not a whole-museum closure. Tourism board corroborates the City Hall and former Supreme Court location." },
      "ArtScience Museum": { url: "https://www.marinabaysands.com/museum.html", sourceType: "operator's own site", additionalSourceUrls: ["https://www.marinabaysands.com/museum/plan-your-visit.html"], checkedOn: "2026-10-06", operatingEvidence: "Marina Bay Sands advertises current exhibitions, tickets and daily visits. Visitor page places museum at 6 Bayfront Avenue and provides Bayfront MRT walking routes. Entry to the building and paid exhibitions differ; no promise one ticket covers all exhibits." },
      "Singapore Zoo": { url: "https://www.mandai.com/en/singapore-zoo.html", sourceType: "operator's own site", additionalSourceUrls: ["https://www.mandai.com/en/plan-your-visit/getting-to-and-around.html"], checkedOn: "2026-10-06", operatingEvidence: "Mandai advertises daily zoo opening, current ticket purchase, attraction map and visitor information. Its transport page provides routes to Mandai Wildlife Reserve. Recommendation is specifically Singapore Zoo, not every separately ticketed Mandai attraction." },
      "Candlenut": { url: "https://www.comoepicurean.com/restaurants/candlenut/", sourceType: "operator's own site", checkedOn: "2026-10-06", operatingEvidence: "Operator lists 17A Dempsey Road, Singapore, current lunch and dinner menus, advertised daily service and a reservation link. Peranakan cooking is described by the restaurant. Dietary needs and availability require direct confirmation." },
      "National Kitchen by Violet Oon": { url: "https://violetoon.com/national-kitchen-by-violet-oon-national-gallery-singapore/", sourceType: "operator's own site", secondSourceUrl: "https://www.visitsingapore.com/neighbourhood/featured-neighbourhood/civic-district/national-gallery-singapore/", checkedOn: "2026-10-06", operatingEvidence: "Own page lists 1 St Andrew's Road #02-01, City Hall wing, Coleman Street access, lunch/dinner menus and booking links. High tea is Friday to Sunday rather than daily. Tourism board corroborates the named restaurant within the Gallery." },
      "JUMBO Seafood (Riverside Point)": { url: "https://www.jumboseafood.com.sg/en/riverside-point", sourceType: "operator's own site", checkedOn: "2026-10-06", operatingEvidence: "Exact branch page lists 30 Merchant Road #01-01/02 Riverside Point, Singapore 058282, daily service and links to current menus and reservations. Other JUMBO branches are not substituted for this address." },
      "Plain Vanilla (Tiong Bahru)": { url: "https://plainvanilla.com.sg/pages/stores", sourceType: "operator's own site", checkedOn: "2026-10-06", operatingEvidence: "Tiong Bahru section lists 1D Yong Siak Street, Singapore 168641, current daily service, brunch, baked goods and coffee. Hot-food service ends before cafe closing; stores do not take reservations. Holland Village's later reopening is a different branch and not recommended." },
      "Tiong Bahru Bakery (Eng Hoon Street)": { url: "https://tiongbahrubakery.com/pages/locations", sourceType: "operator's own site", additionalSourceUrls: ["https://tiongbahrubakery.com/"], checkedOn: "2026-10-06", operatingEvidence: "Own location list advertises the Tiong Bahru branch at 56 Eng Hoon Street #01-70, Singapore 160056, with current weekday/weekend hours. Own homepage describes pastries and coffee with current pickup ordering. Not confused with nearby Crumb & Go or non-Singapore branches." },
      "ATLAS": { url: "https://www.atlasbar.sg/", sourceType: "operator's own site", checkedOn: "2026-10-06", operatingEvidence: "Own page gives Parkview Square, 600 North Bridge Road, Singapore 188778, active dining/drink links and reservations, with evening dress rules. Top and footer hours differ; no fixed schedule is published in our guide. Verify the chosen date directly." },
      "Jigger & Pony": { url: "https://www.jiggerandpony.com/", sourceType: "operator's own site", checkedOn: "2026-10-06", operatingEvidence: "Own page lists Amara Singapore, 165 Tanjong Pagar Road, current cocktail and food menus, evening opening and a table reservation link. Entry is strictly for guests above 18. Not placed in the children's or breakfast fields." }
    }
  },
  "Dublin, Ireland": {
    renderVerifiedOnly: true,
    checkedOn: "2026-10-04",
    status: "source-checked",
    reviewScope: "cityGuideDetailData",
    verificationMethod: "official-web-review",
    limitations: "Official website review, not a visit or telephone confirmation. Operating evidence means current advertised visits, service or reservations, not guaranteed availability. Public gardens are not businesses. Category suitability and suggested grouping are editorial judgments. Tourism pages were read October 3-4; operator checks were completed October 4. Independent second sources are recorded where checked; additional own-site pages are not independent corroboration. Exact prices and opening times are not promised.",
    sourceUrls: [
      "https://www.visitdublin.com/",
      "https://www.visitdublin.com/plan/getting-around",
      "https://www.visitdublin.com/guides/michelin-star-restaurants",
      "https://www.visitdublin.com/guides/best-bakeries-dublin",
      "https://www.visitdublin.com/guides/best-dublin-coffee"
    ],
    excludedCandidates: [
      { name: "Bread 41", url: "https://bread41.ie/", checkedOn: "2026-10-04", reason: "Own-site requests did not return readable operating details. Tourism coverage alone was not treated as an operator check. No closure claimed." },
      { name: "Restaurant Patrick Guilbaud", url: "https://restaurantpatrickguilbaud.ie/", checkedOn: "2026-10-04", reason: "Own-site requests were blocked. Not included without a readable current operator check; no closure claimed." },
      { name: "Chester Beatty", url: "https://chesterbeatty.ie/", checkedOn: "2026-10-04", reason: "Own visitor pages could not be read in this review. Not included on the strength of a plausible description; no closure claimed." }
    ],
    placeSources: {
      "Book of Kells Experience": {
        url: "https://www.visittrinity.ie/book-of-kells-experience/",
        sourceType: "operator's own site",
        secondSourceUrl: "https://www.visitdublin.com/the-book-of-kells-experience",
        checkedOn: "2026-10-04",
        operatingEvidence: "Trinity's current page sells timed entry at College Green. Full experience includes the Old Library and Red Pavilion exhibition; library-only tickets differ. FAQ notes most Long Room books are removed except the first four bays. It describes assisted lift access and no luggage storage. Clean current page used over older referral-page prices and hours."
      },
      "Guinness Storehouse": {
        url: "https://www.guinness-storehouse.com/en/visit",
        sourceType: "operator's own site",
        secondSourceUrl: "https://www.visitdublin.com/guinness-storehouse",
        checkedOn: "2026-10-04",
        operatingEvidence: "Operator advertises bookable visitor experiences at St James's Gate, Dublin 8, including a self-guided exhibition and Gravity Bar. Ordinary Storehouse admission is distinguished from separate brewery experiences. Not placed in the children's list or described as a working-brewery tour."
      },
      "National Gallery of Ireland": {
        url: "https://www.nationalgallery.ie/visit-us/visitor-guide",
        sourceType: "official public operator",
        additionalSourceUrls: ["https://www.nationalgallery.ie/visit-us", "https://www.nationalgallery.ie/visit-us/opening-hours"],
        secondSourceUrl: "https://www.visitdublin.com/national-gallery-of-ireland",
        checkedOn: "2026-10-04",
        operatingEvidence: "Gallery lists public visiting hours and entrances at Merrion Square West and Clare Street. Permanent collection entry is free; some exhibitions charge. Individual general visits need no booking, unlike groups. Family art resources and access information are provided. No promise that every room or work is on view."
      },
      "EPIC The Irish Emigration Museum": {
        url: "https://epicchq.com/visit/epic-location-custom-house-quay/",
        sourceType: "operator's own site",
        secondSourceUrl: "https://www.visitdublin.com/epic-the-irish-emigration-museum",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own visitor page gives daily opening, ticket options and CHQ, Custom House Quay, Dublin 1, D01 R9Y0. Tourism board corroborates the address and interactive, family-oriented exhibition. No fixed ticket price copied."
      },
      "MoLI - Museum of Literature Ireland": {
        url: "https://moli.ie/visit/",
        sourceType: "operator's own site",
        secondSourceUrl: "https://www.visitdublin.com/moli-museum-of-literature-ireland",
        checkedOn: "2026-10-04",
        operatingEvidence: "Museum advertises visits, tickets, literary exhibits and public hours at 86 St Stephen's Green, Dublin 2. Tourism board corroborates its literary collections and location. Holiday exceptions are listed by the operator; guide does not promise every-day opening."
      },
      "St Stephen's Green walk": {
        url: "https://heritageireland.ie/places-to-visit/st-stephens-green/",
        sourceType: "official public operator",
        checkedOn: "2026-10-04",
        operatingEvidence: "OPW identifies the public park at the top of Grafton Street, free admission, paths, playground and seasonal closing times. Daytime park walk, not an invented tour business. Dog restrictions apply around the playground and water; no blanket pet-access claim."
      },
      "National Botanic Gardens (Glasnevin)": {
        url: "https://heritageireland.ie/visit/places-to-visit/national-botanic-garden/",
        sourceType: "official public operator",
        checkedOn: "2026-10-04",
        operatingEvidence: "OPW visitor page identifies Glasnevin, Dublin 9, D09 VY63, free garden admission, paid guided tours and seasonal visiting hours. Glasshouses are described but access is not guaranteed. Guide distinguishes the gardens from the compact city center; assistance-dog-only policy is not generalized to pet access."
      },
      "The Winding Stair Bookshop": {
        url: "https://www.winding-stair.com/bookshop.html",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/winding-stair-bookshop-and-restaurant",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own bookshop page lists public opening hours, contact details and 40 Lower Ormond Quay, Dublin 1. Tourism board identifies the ground-floor independent shop separately from the upstairs restaurant. Browsing suggestion, not a claim that an undated past author event is upcoming."
      },
      "The Winding Stair": {
        url: "https://www.winding-stair.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/winding-stair-bookshop-and-restaurant",
        checkedOn: "2026-10-04",
        operatingEvidence: "Restaurant advertises current Irish menus and table reservations at 40 Lower Ormond Quay. Lunch is Wednesday to Sunday; dinner is listed all week. Separate from the ground-floor bookshop. No unsupported accessibility claim for the upstairs dining room."
      },
      "Pickle": {
        url: "https://picklerestaurant.com/",
        sourceType: "business's own site",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site advertises North Indian cooking, menus and reservations on Camden Street. Listed service starts at 5pm weekdays and 3pm weekends, so it is not a lunch recommendation. Site explicitly says no wheelchair access and currently no takeaway. Booking restrictions differ for same-day requests."
      },
      "Chapter One by Mickael Viljanen": {
        url: "https://chapteronerestaurant.com/reserve-a-table/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://chapteronerestaurant.com/"],
        secondSourceUrl: "https://www.visitdublin.com/guides/michelin-star-restaurants",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own pages list 18-19 Parnell Square North, menus and upcoming reservation availability. Reservation terms require advance dietary discussion and state plant-based, dairy-free and egg-free diets cannot be accommodated. Recommended as a planned special meal, not a universal dietary fit."
      },
      "Glovers Alley": {
        url: "https://www.gloversalley.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/guides/michelin-star-restaurants",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site lists 128 St Stephen's Green, lunch and dinner menus, tasting options, hours and online booking. Own current chef differs from the tourism article's older attribution; guide avoids repeating either chef or award claims."
      },
      "D'Olier Street Restaurant": {
        url: "https://www.dolierstreetrestaurant.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/guides/michelin-star-restaurants",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site advertises a seasonal tasting menu, drinks pairings and active reservations at D'Olier Chambers, Dublin, D02 H589. Longer special-dinner suggestion, without copying a fixed menu, price or award claim."
      },
      "Brother Hubbard North (Capel Street)": {
        url: "https://brotherhubbard.ie/locations/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://brotherhubbard.ie/"],
        secondSourceUrl: "https://www.visitdublin.com/guides/best-dublin-coffee",
        checkedOn: "2026-10-04",
        operatingEvidence: "Location page identifies North at 153 Capel Street, with breakfast, brunch and lunch service, bookings and walk-ins. Explicit temporary dinner closure takes precedence over the broader overview mentioning dinner. Not included in dinner recommendations."
      },
      "Two Pups (Francis Street)": {
        url: "https://www.twopupscoffee.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/guides/best-bakeries-dublin",
        additionalSourceUrls: ["https://www.visitdublin.com/guides/best-dublin-coffee"],
        checkedOn: "2026-10-04",
        operatingEvidence: "Own page lists a seven-day daytime cafe at 74 Francis Street, Dublin 8, with ordering and its in-house Bold Boy Bakery pastries. Tourism cafe guide describes brunch. Francis Street is distinct from the Fairview cafe and the evening Notions business at the same address."
      },
      "3fe (Grand Canal Street)": {
        url: "https://3fe.com/pages/locations/grand-canal-street",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://3fe.com/pages/locations"],
        secondSourceUrl: "https://www.visitdublin.com/guides/best-dublin-coffee",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own branch page lists 32-34 Grand Canal Street Lower, Dublin 2, public hours, booking and collection links, coffee, breakfast, lunch and brunch. Branch-specific record, not interchangeable with every 3fe location."
      },
      "Bretzel Bakery (Portobello)": {
        url: "https://www.bretzel.ie/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://www.bretzel.ie/contact"],
        secondSourceUrl: "https://www.visitdublin.com/guides/best-bakeries-dublin",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site actively invites visitors to the Portobello shop and supplies shop contact and map links, alongside bakery production. Tourism board places the shop on Lennox Street and describes bread, pastries and sandwiches. Exact shop hours were not visible in the fetched own-site text, so none are published."
      },
      "Il Valentino (Grand Canal Dock)": {
        url: "https://www.ilvalentino.ie/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/guides/best-bakeries-dublin",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own current menu and contact page identifies 5 Gallery Quay, Grand Canal Dock, Dublin 2, D02 N265, with coffee, bread, pastries and food. Distinct from its Mespil Road location. No exact opening time or tourism-only additional branch repeated."
      },
      "Cloud Picker Cafe (Pearse Street)": {
        url: "https://cloudpickercoffee.ie/pages/find-us",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://cloudpickercoffee.ie/blogs/news/shortlisted-best-cafe-in-dublin"],
        secondSourceUrl: "https://www.visitdublin.com/guides/best-dublin-coffee",
        checkedOn: "2026-10-04",
        operatingEvidence: "Current Find Us page lists the Projector Room at 42 Pearse Street, Dublin, D02 KA44, with Monday-to-Saturday hours and contact. April 2026 own-site post corroborates the cafe. Not confused with airport counters or the Crumlin roastery; no Sunday visit promised."
      },
      "BAR 1661": {
        url: "https://bar1661.ie/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/bar-1661",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site lists menus and booking at 1-5 Green Street, Dublin 7; tourism board corroborates the venue. Friday opening times conflict within the own page, so exact hours are not published and visitors are told to confirm."
      },
      "Vintage Cocktail Club": {
        url: "https://vintagecocktailclub.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/vintage-cocktail-club",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site offers menus, operating hours and table bookings in Temple Bar. Tourism board corroborates 15 Crown Alley, Dublin 2, D02 E229. Not described as a children's venue or assumed step-free."
      },
      "Peruke & Periwig": {
        url: "https://www.peruke.ie/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.visitdublin.com/peruke-periwig",
        checkedOn: "2026-10-04",
        operatingEvidence: "Own site lists cocktail menus, reservations, opening information and 31 Dawson Street, Dublin 2, D02 DR58. It distinguishes the ground-floor bar from upper-floor lounges. Guide makes no blanket step-free-access claim."
      }
    }
  },
  "Edinburgh, United Kingdom": {
    renderVerifiedOnly: true,
    checkedOn: "2026-10-03",
    status: "source-checked",
    reviewScope: "cityGuideDetailData",
    verificationMethod: "official-web-review",
    limitations: "Official website review, not a visit or telephone confirmation. Operating evidence means a venue advertises service, visits, or bookings, not guaranteed future availability. Public streets, gardens and hill walks are not businesses. Category suitability and suggested grouping are editorial judgment. Secondary sources were recorded where checked; same-operator pages are not independent corroboration. Older event dates on otherwise current sites were not reused.",
    sourceUrls: [
      "https://edinburgh.org/things-to-do/top-attractions/",
      "https://edinburgh.org/food-and-drink/fine-dining/",
      "https://edinburgh.org/food-and-drink/bakeries-and-delicatessens/",
      "https://edinburgh.org/food-and-drink/cafes-and-coffee-shops/",
      "https://edinburgh.org/food-and-drink/bars-and-pubs-in-edinburgh/",
      "https://edinburgh.org/neighbourhoods/the-royal-mile/",
      "https://edinburgh.org/inspire/edinburgh-city-guides/romantic/"
    ],
    excludedCandidates: [
      { name: "Lowdown Coffee", url: "https://www.lowdown.coffee/", checkedOn: "2026-10-03", reason: "The domain linked by the tourism board returned unrelated gambling content. Not used as operator evidence; no claim that the cafe has closed. Fortitude's Hamilton Place branch was separately checked." },
      { name: "Panda & Sons", url: "https://www.pandaandsons.com/", checkedOn: "2026-10-03", reason: "Own site returned no readable operating information in this review. Tourism listing alone was not used to claim an operator check. No closure claimed." }
    ],
    placeSources: {
      "Edinburgh Castle": {
        url: "https://www.edinburghcastle.scot/plan-your-visit/",
        sourceType: "official public operator",
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Visitor page advertises admission, opening information and advance tickets, warning that entry can sell out. Tourism board locates the castle at the top of the Royal Mile."
      },
      "Royal Mile": {
        url: "https://edinburgh.org/neighbourhoods/the-royal-mile/",
        sourceType: "official tourism board",
        checkedOn: "2026-10-03",
        operatingEvidence: "Official neighborhood page identifies the public street route between the castle and Palace of Holyroodhouse. Walking recommendation, not admission to every building or endorsement of older transport advice on the page."
      },
      "National Museum of Scotland": {
        url: "https://www.nms.ac.uk/national-museum-of-scotland",
        sourceType: "operator's own site",
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Museum lists Chambers Street, daily visitor hours, family resources and free entry with charges for some special exhibitions. Current 2026-2027 programming also listed."
      },
      "Scottish National Gallery": {
        url: "https://www.nationalgalleries.org/visit/scottish-national-gallery",
        sourceType: "operator's own site",
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "National Galleries' National venue at the Mound lists daily hours, free general admission and some charged exhibitions. Common Scottish National Gallery name retained; not the Modern or Portrait venue."
      },
      "Palace of Holyroodhouse": {
        url: "https://www.rct.uk/visit/palace-of-holyroodhouse",
        sourceType: "operator's own site",
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Royal Collection Trust sells dated 2026 admission and tours, describes visitor rooms and access restrictions. Guide tells readers to check their date, not assume daily opening."
      },
      "Arthur's Seat": {
        url: "https://www.historicenvironment.scot/visit/all/holyrood-park/",
        sourceType: "official public operator",
        additionalSourceUrls: ["https://www.historicenvironment.scot/visit/all/holyrood-park/plan-your-visit/"],
        checkedOn: "2026-10-03",
        operatingEvidence: "Historic Environment Scotland identifies Arthur's Seat within Holyrood Park and publishes visitor access, free entry, route closures and warnings about drops and slippery surfaces. No sunrise hike or closed Radical Road route recommended."
      },
      "Dean Village walk": {
        url: "https://edinburgh.org/inspire/edinburgh-city-guides/romantic/",
        sourceType: "official tourism board",
        additionalSourceUrls: ["https://edinburgh.org/blog/discover-the-water-of-leith-walkway/"],
        checkedOn: "2026-10-03",
        operatingEvidence: "Tourism board identifies Dean Path and the village on the Water of Leith, with walking context toward Stockbridge. Public neighborhood walk, not an invented tour operator or a guarantee that every riverside path is accessible."
      },
      "Royal Botanic Garden Edinburgh": {
        url: "https://www.rbge.org.uk/visit/royal-botanic-garden-edinburgh/",
        sourceType: "operator's own site",
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Official page lists free garden entry, seasonal hours and the West Gate on Arboretum Place. Palm Houses reopening is listed for October 2 while other Glasshouses remain closed. Guide recommends the outdoor grounds and asks readers to check glasshouse access separately."
      },
      "Camera Obscura & World of Illusions": {
        url: "https://www.camera-obscura.co.uk/",
        sourceType: "operator's own site",
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Operator lists 549 Castlehill, timed tickets and family exhibits. Own FAQ says floors are stair-only and only guide/assistance dogs enter. Used that policy over the contradictory tourism-board dog-friendly claim."
      },
      "Dynamic Earth": {
        url: "https://dynamicearth.org.uk/",
        sourceType: "operator's own site",
        additionalSourceUrls: ["https://dynamicearth.org.uk/plan-your-visit/getting-here/"],
        secondSourceUrl: "https://edinburgh.org/things-to-do/top-attractions/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Science center advertises interactive exhibits, planetarium and tickets with current October programming. Directions page locates it on Holyrood Road near the palace. No fixed show time promised."
      },
      "Scottish Poetry Library": {
        url: "https://www.scottishpoetrylibrary.org.uk/visit/",
        sourceType: "operator's own site",
        checkedOn: "2026-10-03",
        operatingEvidence: "Library lists public visits Monday to Thursday, 10am-3pm, at 5 Crichton's Close off Canongate, with free work and study spaces. Limited hours are noted rather than promising a weekend visit."
      },
      "The Kitchin": {
        url: "https://thekitchin.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/fine-dining/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Official restaurant site lists 78 Commercial Quay in Leith, menus and table reservations. Tourism board corroborates the Leith location."
      },
      "Restaurant Martin Wishart": {
        url: "https://restaurantmartinwishart.co.uk/enquiries/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/fine-dining/",
        additionalSourceUrls: ["https://restaurantmartinwishart.co.uk/privacy-policy/"],
        checkedOn: "2026-10-03",
        operatingEvidence: "Own enquiries page advertises regular lunch/dinner service, tasting menus and telephone/email contact; own address is 54 The Shore. Older 2025 holiday exceptions were ignored. Booking page had no readable widget, so no specific availability is claimed."
      },
      "Timberyard": {
        url: "https://www.timberyard.co/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/fine-dining/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own site lists 10 Lady Lawson Street, current menus, reservation link and booking times. Older event text and inconsistent footer hours were not copied. Used for a planned meal, not as a walk-in family cafe."
      },
      "The Scran & Scallie": {
        url: "https://scranandscallie.com/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://scranandscallie.com/menus/"],
        checkedOn: "2026-10-03",
        operatingEvidence: "Own site identifies the Stockbridge gastropub at 1 Comely Bank Road, seasonal menus and table reservations. Menu page includes children's dining."
      },
      "Howies Waterloo": {
        url: "https://www.howies.uk.com/venues/howies-waterloo-place/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://www.howies.uk.com/book/"],
        checkedOn: "2026-10-03",
        operatingEvidence: "Branch page lists 29 Waterloo Place, lunch and dinner daily, menus and reservations. Kept separate from Howies Victoria and Scotts Kitchen. No fixed menu price copied."
      },
      "Dishoom Edinburgh": {
        url: "https://www.dishoom.com/edinburgh/",
        sourceType: "business's own site",
        checkedOn: "2026-10-03",
        operatingEvidence: "Edinburgh branch lists 3a St Andrew Square, breakfast, lunch and dinner, daily hours and reservation policy. After 6pm, bookings are for groups of six or more; smaller groups walk in. Not included in the unconditional Worth booking list."
      },
      "Soderberg Pavilion": {
        url: "https://www.soderberg.uk/pavilion",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://www.soderberg.uk/the-bakery-1"],
        checkedOn: "2026-10-03",
        operatingEvidence: "Branch page lists 1 Lister Square, brunch daily from 9am, evening service and drinks. Bakery page confirms Edinburgh production above the Pavilion and bakes served at all locations. ASCII spelling maps to Soderberg's Edinburgh Pavilion, not a London branch."
      },
      "Twelve Triangles (Brunswick Street)": {
        url: "https://twelvetriangles.co.uk/visit-us",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/bakeries-and-delicatessens/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own branch list gives 90 Brunswick Street, daily 7am-2pm and takeaway only. Tourism board corroborates bread and pastry service. Breakfast means a takeaway bakery stop, not a sit-down meal."
      },
      "Lannan Bakery": {
        url: "https://www.lannanbakery.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/bakeries-and-delicatessens/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own site lists bakery and pantry at 29-35 Hamilton Place, with Tuesday-Sunday hours and menu link. Tourism board corroborates the location and pastry offering."
      },
      "The Milkman (7 Cockburn Street)": {
        url: "https://themilkman.coffee/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/cafes-and-coffee-shops/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own site publishes daily hours and two Cockburn Street locations, numbers 7 and 52. This recommendation and its map select number 7, not an ambiguous chain-wide search."
      },
      "Fortitude Coffee (Hamilton Place)": {
        url: "https://www.fortitudecoffee.com/contact",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/cafes-and-coffee-shops/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Official visit page lists 66 Hamilton Place with weekday and weekend hours. Kept distinct from its Abbey Mount branch; tourism board corroborates the Stockbridge location."
      },
      "Bramble": {
        url: "https://www.bramblebar.co.uk/",
        sourceType: "business's own site",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own bar site lists 16a Queen Street, daily evening hours, drinks menu and walk-ins-only policy. Not presented as a reservable table."
      },
      "The Devil's Advocate": {
        url: "https://www.devilsadvocateedinburgh.co.uk/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/bars-and-pubs-in-edinburgh/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own site lists 9 Advocate's Close, daily service, cocktail menus and table booking. Explicitly warns that access includes stairs; included that limitation in the guide."
      },
      "Copper Blossom": {
        url: "https://copperblossom.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://edinburgh.org/food-and-drink/bars-and-pubs-in-edinburgh/",
        checkedOn: "2026-10-03",
        operatingEvidence: "Own site lists basement 107 George Street, cocktail menu, table bookings and current food/drink service. Tourism board corroborates address and cocktail-bar identity."
      }
    }
  },
  "Boston, United States": {
    renderVerifiedOnly: true,
    checkedOn: "2026-10-02",
    status: "source-checked",
    reviewScope: "cityGuideDetailData",
    verificationMethod: "official-web-review",
    limitations: "Website review, not an in-person visit or telephone confirmation. Operating evidence means the official site currently advertises visits, service, or reservations, not guaranteed availability on a future date. Public parks and trails are places, not businesses. Category suitability is editorial judgment. Same-operator pages and ordering services are not independent corroboration.",
    sourceUrls: [
      "https://www.meetboston.com/things-to-do/",
      "https://www.meetboston.com/culinary/",
      "https://www.meetboston.com/blog/post/first-visit-to-boston/",
      "https://www.meetboston.com/blog/post/guys-weekend/",
      "https://www.meetboston.com/blog/post/top-speakeasies-in-boston/"
    ],
    excludedCandidates: [
      { name: "Tatte Bakery & Cafe (Charles Street)", url: "https://tattebakery.com/locations/ma/boston/70-charles-street/", checkedOn: "2026-10-02", reason: "Official branch page says closed for renovation. Used the separately checked Back Bay location, not a generic Tatte map search." },
      { name: "Thinking Cup", reason: "Own website returned an error during review. Not added without current operator evidence; no closure claimed." }
    ],
    placeSources: {
      "Freedom Trail": {
        url: "https://www.thefreedomtrail.org/",
        sourceType: "official trail operator",
        secondSourceUrl: "https://www.meetboston.com/blog/post/first-visit-to-boston/",
        checkedOn: "2026-10-02",
        operatingEvidence: "Foundation advertises guided walks and identifies the route's historic sites. Walking the route does not include admission to every interior."
      },
      "Boston Common": {
        url: "https://www.boston.gov/parks/boston-common",
        sourceType: "official public site",
        checkedOn: "2026-10-02",
        operatingEvidence: "City Parks Department identifies the downtown public park and visitor facilities. The recommendation is a park visit, not a promise that every seasonal activity is operating."
      },
      "Boston Public Garden": {
        url: "https://www.boston.gov/parks/public-garden",
        sourceType: "official public site",
        checkedOn: "2026-10-02",
        operatingEvidence: "City Parks Department maintains a visitor page for the public garden. The guide recommends walking there, not a seasonal boat ride."
      },
      "Fenway Park": {
        url: "https://www.mlb.com/redsox/ballpark/tours",
        sourceType: "operator's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/first-visit-to-boston/",
        checkedOn: "2026-10-02",
        operatingEvidence: "Official stadium tours and booking listed."
      },
      "Museum of Fine Arts, Boston": {
        url: "https://www.mfa.org/visit",
        sourceType: "operator's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Museum publishes visitor hours, admission and advance-ticket options. Its closure days must be checked before planning a visit."
      },
      "Isabella Stewart Gardner Museum": {
        url: "https://www.gardnermuseum.org/visit",
        sourceType: "operator's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Official page lists 25 Evans Way, visitor hours and timed admission; advance tickets are recommended."
      },
      "New England Aquarium": {
        url: "https://www.neaq.org/visit/",
        sourceType: "operator's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Visitor page lists 1 Central Wharf, current hours and ticket sales. It recommends advance booking, especially for busy dates."
      },
      "Boston Children's Museum": {
        url: "https://bostonchildrensmuseum.org/visit/",
        sourceType: "operator's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Museum lists 308 Congress Street, current opening days, advance tickets and exhibits for children and families. Ignored its older summer-event travel advice."
      },
      "Boston Public Library (Central Library)": {
        url: "https://www.bpl.org/locations/central/",
        sourceType: "official public site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Library lists public visitor hours at 700 Boylston Street and art, architecture and tour information. The map gallery has a temporary closure notice; it is not recommended as a separate attraction."
      },
      "Brattle Book Shop": {
        url: "https://www.brattlebookshop.com/",
        sourceType: "business's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Bookshop lists 9 West Street, current browsing hours, used and rare books and its outdoor sale area."
      },
      "Boston Public Market": {
        url: "https://bostonpublicmarket.org/",
        sourceType: "operator's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Market lists daily opening at 100 Hanover Street, food vendors and prepared meals. Individual vendor hours vary. The airport market is a different location."
      },
      "Boston Tea Party Ships & Museum": {
        url: "https://www.bostonteapartyship.com/",
        sourceType: "operator's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Operator lists tours and ticket sales at 306 Congress Street, with historical interpreters and interactive exhibits."
      },
      "Row 34 (Seaport)": {
        url: "https://www.row34.com/location/row34-seaport/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/guys-weekend/",
        checkedOn: "2026-10-02",
        operatingEvidence: "Branch page lists 383 Congress Street in Fort Point, lunch and dinner menus, hours and reservations. Seaport label distinguishes it from the Kenmore and Cambridge restaurants."
      },
      "Myers + Chang": {
        url: "https://www.myersandchang.com/",
        sourceType: "business's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Official site lists 1145 Washington Street, dinner service, menus and reservations. Midday service is only on selected days, so this guide recommends it for dinner."
      },
      "Contessa (Boston)": {
        url: "https://contessaristorante.com/boston",
        sourceType: "business's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Boston-specific page lists 3 Newbury Street at the Newbury hotel, breakfast and dinner menus and reservations. Not the Miami restaurant of the same name."
      },
      "Grill 23 & Bar": {
        url: "https://www.grill23.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/guys-weekend/",
        additionalSourceUrls: ["https://www.grill23.com/menus"],
        checkedOn: "2026-10-02",
        operatingEvidence: "Restaurant lists 161 Berkeley Street, evening hours, steak and seafood menus and table reservations."
      },
      "o ya": {
        url: "https://www.o-ya.restaurant/location/o-ya-boston/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://www.o-ya.restaurant/team-member/reservations/"],
        checkedOn: "2026-10-02",
        operatingEvidence: "Boston location page lists 9 East Street and dinner service. Its reservation page describes prepaid omakase bookings; the guide does not promise a la carte dining or cocktail-bar service."
      },
      "Neptune Oyster": {
        url: "https://www.neptuneoyster.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/guys-weekend/",
        checkedOn: "2026-10-02",
        operatingEvidence: "Official page lists 63 Salem Street, seafood menu and daily service. Its explicit policy says no reservations, walk-ins only; used that policy rather than the contradictory search title."
      },
      "Flour Bakery + Cafe (Clarendon Street)": {
        url: "https://www.flourbakery.com/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://order.toasttab.com/online/flourclarendon", "https://www.flourbakery.com/menus"],
        checkedOn: "2026-10-02",
        operatingEvidence: "Official site identifies the Clarendon Street bakery. Its operator ordering page lists 131 Clarendon Street, opening hours, breakfast, pastry and coffee menus. Toast is the operator's ordering service, not an independent second review."
      },
      "Tatte Bakery & Cafe (Back Bay)": {
        url: "https://tattebakery.com/locations/ma/boston/399-boylston-st/",
        sourceType: "business's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Branch page lists 399 Boylston Street, daily hours, ordering, pastries, brunch, lunch and coffee. This is not the temporarily closed Charles Street branch."
      },
      "Bova's Bakery": {
        url: "https://bovabakeryboston.net/",
        sourceType: "business's own site",
        additionalSourceUrls: ["https://bovabakeryboston.net/faqs/"],
        checkedOn: "2026-10-02",
        operatingEvidence: "Bakery advertises bread and pastries at 134 Salem Street. Its FAQ confirms takeout-only service; the guide does not describe it as a sit-down cafe."
      },
      "George Howell Coffee (Godfrey Hotel)": {
        url: "https://georgehowellcoffee.com/pages/the-godfrey-hotel",
        sourceType: "business's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Operator lists the Godfrey Hotel cafe at 505 Washington Street, hours, coffee and ordering. Pastries from suppliers do not make it a separately verified bakery."
      },
      "Gracenote Coffee (Lincoln Street)": {
        url: "https://gracenotecoffee.com/pages/locations",
        sourceType: "business's own site",
        checkedOn: "2026-10-02",
        operatingEvidence: "Operator lists current cafe hours at 108 Lincoln Street. High Street Place is a different branch and is not the map target here."
      },
      "Offsuit": {
        url: "https://www.offsuitboston.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/top-speakeasies-in-boston/",
        checkedOn: "2026-10-02",
        operatingEvidence: "Operator lists 5 Utica Street, cocktail service, current hours, reservations and walk-ins. Tourism board independently identifies the bar and address."
      },
      "Wig Shop Lounge": {
        url: "https://www.wigshopboston.com/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/top-speakeasies-in-boston/",
        additionalSourceUrls: ["https://www.wigshopboston.com/location/the-wig-shop-lounge/"],
        checkedOn: "2026-10-02",
        operatingEvidence: "Official pages list 27 Temple Place, evening service, cocktail menus, selected reservation hours and a 21-plus entry policy."
      },
      "Yvonne's": {
        url: "https://www.yvonnesboston.com/location/yvonnes-boston/",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.meetboston.com/blog/post/top-speakeasies-in-boston/",
        checkedOn: "2026-10-02",
        operatingEvidence: "Restaurant lists 2 Winter Place and nightly service. Reservations are for supper, not cocktails alone; the guide does not imply a bar-table reservation."
      }
    }
  },
  "Cusco, Peru": {
    renderVerifiedOnly: true,
    checkedOn: "2026-09-30",
    status: "source-checked",
    reviewScope: "cityGuideDetailData",
    verificationMethod: "official-web-review",
    limitations: "Website review, not an in-person visit or telephone confirmation. Operating evidence means the official site currently advertises visits, service, or reservations. Confirm hours before traveling. Separate pages from one operator are not independent corroboration.",
    sourceUrls: [
      "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
      "https://repositorio.promperu.gob.pe/bitstreams/657de928-74b6-44fc-86b7-466f08949896/download",
      "https://cosituc.gob.pe/preguntas-frecuentes/"
    ],
    excludedCandidates: [
      { name: "Chicha Cusco", reason: "Official Cusco page timed out during review. Not added on the strength of directory mentions alone; no closure claimed." },
      { name: "La Valeriana", reason: "Official website could not be loaded. Third-party listings were insufficient to confirm the current branch; no closure claimed." }
    ],
    placeSources: {
      "Sacsayhuaman": {
        url: "https://cosituc.gob.pe/sacsayhuaman/",
        sourceType: "official ticket operator",
        secondSourceUrl: "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
        checkedOn: "2026-09-30",
        operatingEvidence: "COSITUC lists the archaeological site and its visitor-ticket circuit; PROMPERU includes it in the Cusco itinerary."
      },
      "Qorikancha": {
        url: "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
        sourceType: "official tourism board",
        checkedOn: "2026-09-30",
        operatingEvidence: "PROMPERU describes visiting the Inca temple and Santo Domingo complex. This is not the separate Museo de Sitio Qorikancha ticket listing."
      },
      "Cusco Cathedral": {
        url: "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
        sourceType: "official tourism board",
        checkedOn: "2026-09-30",
        operatingEvidence: "PROMPERU includes the cathedral in its walk from Plaza de Armas; admission hours were not independently confirmed."
      },
      "Plaza de Armas": {
        url: "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
        sourceType: "official tourism board",
        checkedOn: "2026-09-30",
        operatingEvidence: "Public square identified as the starting point of the Cusco city walk; not a business with opening hours."
      },
      "San Blas": {
        url: "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
        sourceType: "official tourism board",
        checkedOn: "2026-09-30",
        operatingEvidence: "Named Cusco neighborhood on the tourism board's uphill walking route; not a venue or business."
      },
      "Twelve-Angled Stone": {
        url: "https://www.peru.travel/experiences/city-tour-in-cusco-s-historic-center",
        sourceType: "official tourism board",
        checkedOn: "2026-09-30",
        operatingEvidence: "The tourism board identifies the 12-angled stone on the walk toward San Blas. Public landmark, not a business."
      },
      "Centro de Textiles Tradicionales del Cusco": {
        url: "https://www.textilescusco.org/index.php/contact",
        sourceType: "operator's own site",
        checkedOn: "2026-09-30",
        operatingEvidence: "Operator lists the Cusco location at Avenida El Sol 603, museum and shop hours, weaving demonstrations, and free museum entry. Chinchero is a different location and is not used here."
      },
      "ChocoMuseo Cusco": {
        url: "https://chocomuseo.com/en/peru/cusco/",
        sourceType: "business's own site",
        secondSourceUrl: "https://chocomuseo.com/product/cusco-museo/",
        checkedOn: "2026-09-30",
        operatingEvidence: "Cusco-specific section lists the Plaza Regocijo museum, opening hours, free museum entry, and bookable workshops. Ignored the unrelated demo-address text later in the page footer."
      },
      "Cicciolina": {
        url: "https://www.cicciolinacuzco.com/es/restaurant.html",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.peru.travel/stories/4-luxury-experiences-to-enjoy-in-cusco",
        checkedOn: "2026-09-30",
        operatingEvidence: "Official page lists Cusco address, lunch and dinner hours, menu, and reservations. Use the current official Calle Palacio address rather than the older tourism PDF address."
      },
      "Cicciolina Cafe": {
        url: "https://www.cicciolinacuzco.com/es/cafe.html",
        sourceType: "business's own site",
        secondSourceUrl: "https://www.cicciolinacuzco.com/docs/Carta_cafe-2025_ESP.pdf",
        checkedOn: "2026-09-30",
        operatingEvidence: "Cafe page lists Calle Ruinas 465 and service hours. The linked menu supports breakfast, coffee, house-made bread, and croissants. A cafe with baking, not a separate wholesale bakery."
      },
      "Pachapapa": {
        url: "https://www.cuscorestaurants.com/pachapapa/",
        sourceType: "business's own site",
        secondSourceUrl: "https://repositorio.promperu.gob.pe/bitstreams/657de928-74b6-44fc-86b7-466f08949896/download#page=36",
        additionalSourceUrls: ["https://pachapapa.cuscorestaurants.com/p/es.html"],
        checkedOn: "2026-09-30",
        operatingEvidence: "Operator lists San Blas 120, service hours and reservations. Its restaurant page includes Peruvian cocktails. PROMPERU independently lists the restaurant in Cusco."
      },
      "MAP Cafe": {
        url: "https://www.cuscorestaurants.com/map-cafe/",
        sourceType: "business's own site",
        secondSourceUrl: "https://repositorio.promperu.gob.pe/bitstreams/657de928-74b6-44fc-86b7-466f08949896/download#page=36",
        additionalSourceUrls: ["https://mapcafe.cuscorestaurants.com/"],
        checkedOn: "2026-09-30",
        operatingEvidence: "Operator lists lunch and dinner service, reservations, and the location inside Museo de Arte Precolombino at Nazarenas 231. PROMPERU corroborates the name and location."
      },
      "LIMO": {
        url: "https://www.cuscorestaurants.com/limo/",
        sourceType: "business's own site",
        secondSourceUrl: "https://repositorio.promperu.gob.pe/bitstreams/657de928-74b6-44fc-86b7-466f08949896/download#page=36",
        additionalSourceUrls: ["https://limo.cuscorestaurants.com/p/es.html"],
        checkedOn: "2026-09-30",
        operatingEvidence: "Operator lists Portal de Carnes 236, lunch and dinner hours, reservations, and pisco-bar service. PROMPERU independently lists Limo in Cusco."
      },
      "Green Point": {
        url: "https://greenpointcusco.com/home.html",
        sourceType: "business's own site",
        secondSourceUrl: "https://menu.greenpointcusco.com/es/desayunos",
        checkedOn: "2026-09-30",
        operatingEvidence: "Own site lists Carmen Bajo 235, Cusco, service hours and reservations; its menu lists breakfast and coffee. Opening times differ within the site, so no exact opening time is published in the guide."
      },
      "Qosqo Maki (Tullumayo)": {
        url: "https://marketingqosqomaki.wixsite.com/panaderia-qosqo-maki",
        sourceType: "business's own site",
        secondSourceUrl: "https://qosqomaki.org/contactos/",
        additionalSourceUrls: ["https://linktr.ee/qosqomaki.cusco"],
        checkedOn: "2026-09-30",
        operatingEvidence: "Bakery's linked official site lists Tullumayo 465 and service hours. Parent association confirms the bakery address and delivery contact. Official profile identifies coffee and pastries."
      },
      "Qosqo Maki (Santa Rosa)": {
        url: "https://marketingqosqomaki.wixsite.com/panaderia-qosqo-maki",
        sourceType: "business's own site",
        secondSourceUrl: "https://qosqomaki.org/contactos/",
        checkedOn: "2026-09-30",
        operatingEvidence: "Official site lists the Santa Rosa branch at Pasaje Anibal Valencia 200 and service hours. Parent association separately lists the Santa Rosa bakery. Same brand as Tullumayo, different physical branch."
      },
      "Museo del Pisco Cusco": {
        url: "https://english.museodelpisco.org/locations/",
        sourceType: "business's own site",
        secondSourceUrl: "https://repositorio.promperu.gob.pe/bitstreams/657de928-74b6-44fc-86b7-466f08949896/download#page=57",
        checkedOn: "2026-09-30",
        operatingEvidence: "Own site lists the Cusco bar at Santa Catalina Ancha 398, contact, menu and reservations. PROMPERU corroborates the Cusco address. It is a bar recommendation, not a children's museum."
      },
      "Oqre": {
        url: "https://www.belmond.com/en/hotels/south-america/peru/monasterio-cusco/restaurants-and-bars",
        sourceType: "operator's own site",
        secondSourceUrl: "https://www.belmond.com/en/hotels/south-america/peru/monasterio-cusco/restaurants-and-bars/modal/oqre",
        checkedOn: "2026-09-30",
        operatingEvidence: "Monasterio's official dining page lists Oqre with its current menu and Cusco hotel address. No older Deli Monasterio listing was substituted."
      }
    }
  },
  "Austin, United States": {
    checkedOn: "2026-09-19",
    status: "prior-source-review",
    reviewScope: "cityGuideDetailData",
    limitations: "Previously reviewed source list. Not rechecked during the September 30 Cusco pass; per-place operating evidence still needs migration to the new ledger format.",
    sourceUrls: [
      "https://www.austintexas.org/",
      "https://www.austintexas.org/explore/",
      "https://www.austintexas.org/things-to-do/",
      "https://www.austintexas.org/explore/entertainment-districts/",
      "https://www.austintexas.org/food-and-drink/",
      "https://www.austintexas.org/food-and-drink/drink/",
      "https://www.austintexas.org/food-and-drink/coffee-and-tea/",
      "https://www.austintexas.org/austin-insider-blog/blog/post/places-for-lunch-austin/",
      "https://www.austintexas.org/austin-insider-blog/blog/post/south-lamar/"
    ],
    places: [
      ["Texas State Capitol", "attraction"],
      ["Blanton Museum of Art", "museum"],
      ["LBJ Presidential Library", "museum"],
      ["Zilker Park", "outdoors"],
      ["Barton Springs Pool", "outdoors"],
      ["Congress Avenue Bridge", "landmark"],
      ["South Congress Avenue", "neighborhood"],
      ["Red River Cultural District", "neighborhood"],
      ["Mount Bonnell", "viewpoint"],
      ["Lady Bird Lake", "outdoors"],
      ["Thinkery", "family"],
      ["Austin Zoo", "family"],
      ["East Sixth Street", "neighborhood"],
      ["Emmer & Rye", "food"],
      ["June's", "food"],
      ["Hopdoddy Burger Bar", "food"],
      ["Uchi", "food"],
      ["Meanwhile Brewing", "food"],
      ["Jo's Coffee", "coffee"],
      ["Mañana", "coffee"],
      ["Roosevelt Room", "drinks"],
      ["Aba", "food"],
      ["Bouldin Creek Cafe", "food"],
      ["Bakery Lorraine", "bakery"],
      ["Sour Duck Market", "food"],
      ["Komé", "food"],
      ["Midnight Cowboy", "drinks"],
      ["Whisler's", "drinks"],
      ["Easy Tiger Bake Shop & Beer Garden", "bakery"],
      ["Tiny Pies", "bakery"],
      ["Cuvée Coffee", "coffee"],
      ["Mozart's Coffee Roasters", "coffee"]
    ],
    placeSources: {
      "Texas State Capitol": { url: "https://tspb.texas.gov/prop/tc/tc/capitol.html", sourceType: "official public site" },
      "Blanton Museum of Art": { url: "https://blantonmuseum.org/visit/", sourceType: "business's own site" },
      "LBJ Presidential Library": { url: "https://www.lbjlibrary.org/", sourceType: "business's own site" },
      "Zilker Park": { url: "https://www.austintexas.gov/parks/locations/zilker-metropolitan-park", sourceType: "official public site" },
      "Barton Springs Pool": { url: "https://www.austintexas.gov/parks/locations/about-barton-springs-pool", sourceType: "official public site" },
      "Congress Avenue Bridge": { url: "https://www.austintexas.org/austin-insider-blog/blog/post/first-timers-guide/", sourceType: "official tourism board" },
      "South Congress Avenue": { url: "https://www.austintexas.org/austin-insider-blog/blog/post/first-timers-guide/", sourceType: "official tourism board" },
      "Red River Cultural District": { url: "https://redriverculturaldistrict.org/", sourceType: "official district site" },
      "Mount Bonnell": { url: "https://www.austintexas.org/austin-insider-blog/blog/post/first-timers-guide/", sourceType: "official tourism board" },
      "Lady Bird Lake": { url: "https://www.austintexas.org/austin-insider-blog/blog/post/first-timers-guide/", sourceType: "official tourism board" },
      "Thinkery": { url: "https://thinkeryaustin.org/", sourceType: "business's own site" },
      "Austin Zoo": { url: "https://austinzoo.org/", sourceType: "business's own site" },
      "East Sixth Street": { url: "https://www.austintexas.org/explore/entertainment-districts/", sourceType: "official tourism board" },
      "Emmer & Rye": { url: "https://emmerandrye.com/", sourceType: "business's own site" },
      "June's": { url: "https://junesallday.com/", sourceType: "business's own site" },
      "Hopdoddy Burger Bar": { url: "https://www.hopdoddy.com/locations/southcongress", sourceType: "business's own site" },
      "Uchi": { url: "https://uchi.uchirestaurants.com/location/sushi-austin/", sourceType: "business's own site" },
      "Meanwhile Brewing": { url: "https://www.meanwhilebeer.com/", sourceType: "business's own site" },
      "Jo's Coffee": { url: "https://www.joscoffee.com/", sourceType: "business's own site" },
      "Mañana": { url: "https://mananaaustin.com/south-congress", sourceType: "business's own site" },
      "Roosevelt Room": { url: "https://www.therooseveltroomatx.com/", sourceType: "business's own site" },
      "Aba": { url: "https://www.abarestaurants.com/austin", sourceType: "business's own site" },
      "Bouldin Creek Cafe": { url: "https://bouldincreekcafe.com/", sourceType: "business's own site" },
      "Bakery Lorraine": { url: "https://bakerylorraine.com/pages/hours-and-locations-austin", sourceType: "business's own site" },
      "Sour Duck Market": { url: "https://www.sourduckmarket.com/about", sourceType: "business's own site" },
      "Komé": { url: "https://www.kome-austin.com/location/kome-austin/", sourceType: "business's own site" },
      "Midnight Cowboy": { url: "https://midnightcowboymodeling.com/", sourceType: "business's own site" },
      "Whisler's": { url: "https://www.whislersatx.com/contact", sourceType: "business's own site" },
      "Easy Tiger Bake Shop & Beer Garden": { url: "https://www.easytigeraustin.com/location/north", sourceType: "business's own site" },
      "Tiny Pies": { url: "https://tinypies.com/", sourceType: "business's own site" },
      "Cuvée Coffee": { url: "https://cuveecoffee.com/pages/locations", sourceType: "business's own site" },
      "Mozart's Coffee Roasters": { url: "https://mozartscoffee.com/pages/contact-us", sourceType: "business's own site" }
    }
  },
  "Nashville, United States": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://www.visitmusiccity.com/nashville-neighborhoods",
      "https://www.visitmusiccity.com/sites/default/files/2026-04/2025-Nashville_Top10-FA.pdf",
      "https://www.visitmusiccity.com/sites/default/files/2025-09/2025-TourismProfile_Student_08August-FA.pdf"
    ],
    places: [
      ["Lower Broadway", "neighborhood"],
      ["Music Row", "neighborhood"],
      ["RCA Studio B", "music"],
      ["Belle Meade Historic Site", "history"],
      ["Nashville Zoo", "family"],
      ["Assembly Food Hall", "food"],
      ["Tootsie's Orchid Lounge", "music"],
      ["Legends Corner", "music"],
      ["The Stage", "music"],
      ["Robert's Western World", "music"]
    ]
  },
  "Atlanta, United States": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://discoveratlanta.com/",
      "https://discoveratlanta.com/explore/neighborhoods/main/",
      "https://discoveratlanta.com/things-to-do/outdoors/beltline-trails/",
      "https://discoveratlanta.com/things-to-do/shopping/ponce-city-market/"
    ],
    places: [
      ["Atlanta BeltLine Eastside Trail", "outdoors"],
      ["Krog Street Market", "food"],
      ["Ponce City Market", "food"],
      ["Skyline Park", "family"],
      ["Old Fourth Ward Park", "outdoors"],
      ["Centennial Olympic Park", "outdoors"],
      ["Georgia Aquarium", "family"],
      ["World of Coca-Cola", "attraction"],
      ["Atlanta History Center", "history"],
      ["Piedmont Park", "outdoors"]
    ]
  },
  "Sedona, United States": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://visitsedona.com/attractions-entertainment/",
      "https://visitsedona.com/things-to-do/100-things-to-do/"
    ],
    places: [
      ["Oak Creek Canyon", "outdoors"],
      ["Chapel of the Holy Cross", "attraction"],
      ["Sedona Arts Center", "arts"],
      ["Verde Valley Archaeology Center", "museum"],
      ["Montezuma Castle National Monument", "history"],
      ["Montezuma Well", "outdoors"],
      ["Tuzigoot National Monument", "history"],
      ["Jordan Historical Park", "outdoors"],
      ["Sedona Wetlands Preserve", "outdoors"],
      ["Blazin' M Experience", "family"]
    ]
  },
  "Da Lat, Vietnam": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://www.vietnam.travel/node/100",
      "https://www.vietnam.travel/index.php/vi/places-to-go/central-vietnam/dalat",
      "https://dalat.vn/en/places",
      "https://dalat.vn/en/introduction"
    ],
    places: [
      ["Xuan Huong Lake", "outdoors"],
      ["Da Lat Railway Station", "attraction"],
      ["Trai Mat", "outdoors"],
      ["Linh Phuoc Pagoda", "culture"],
      ["Valley of Love", "outdoors"],
      ["Tuyen Lam Lake", "outdoors"],
      ["Langbiang Mountain", "outdoors"],
      ["Datanla Waterfall", "outdoors"],
      ["Lam Vien Square", "landmark"],
      ["Cau Dat Tea Hill", "outdoors"]
    ]
  },
  "Turin, Italy": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://turismotorino.org/en/visit/territory/torino-metropoli/torino/discover-the-disctricts-in-torino/torino-city-centre",
      "https://turismotorino.org/en/visit/things-to-do-and-things-to-see/museums-and-heritage",
      "https://turismotorino.org/visit/things-to-do-and-things-to-see/food-and-wine",
      "https://turismotorino.org/visit/territory"
    ],
    places: [
      ["Piazza Castello", "landmark"],
      ["Musei Reali Torino", "museum"],
      ["Palazzo Madama", "museum"],
      ["Museo Nazionale del Cinema", "museum"],
      ["Mole Antonelliana", "landmark"],
      ["Museo Egizio", "museum"],
      ["Piazza Vittorio Veneto", "landmark"],
      ["Gran Madre di Dio", "attraction"],
      ["Royal Residences of Torino and Piemonte", "history"],
      ["Basilica of Superga", "attraction"]
    ]
  },
  "Montpellier, France": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://www.montpellier-tourisme.fr/decouvrir/",
      "https://www.montpellier-tourisme.fr/decouvrir/millenaire/visiter/",
      "https://www.montpellier-tourisme.fr/decouvrir/millenaire/villes-et-villages-de-la-metropole/",
      "https://www.montpellier-tourisme.fr/sejourner/loisirs-et-activites/patrimoine-et-musees/"
    ],
    places: [
      ["Place de la Comedie", "landmark"],
      ["Ecusson historic centre", "neighborhood"],
      ["Place Saint-Roch", "landmark"],
      ["Place Saint-Anne", "landmark"],
      ["Place de la Canourgue", "landmark"],
      ["Montpellier Cathedral", "history"],
      ["Arc de Triomphe", "landmark"],
      ["Jardin des Plantes", "outdoors"],
      ["Musee Fabre", "museum"],
      ["Antigone", "neighborhood"],
      ["Port Marianne", "neighborhood"]
    ]
  },
  "Lille, France": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://en.lilletourism.com/",
      "https://en.lilletourism.com/explore/hello-architecture-and-heritage/lille-and-its-neighborhoods/",
      "https://en.lilletourism.com/explore/hello-architecture-and-heritage/"
    ],
    places: [
      ["Vieux-Lille", "neighborhood"],
      ["Grand'Place", "landmark"],
      ["Vieille Bourse", "landmark"],
      ["Lille Belfry", "landmark"],
      ["Palais Rihour", "history"],
      ["Euralille", "neighborhood"],
      ["Parc Matisse", "outdoors"],
      ["Jardin des Geants", "outdoors"],
      ["Tripostal", "arts"],
      ["Citadel of Lille", "outdoors"],
      ["Hospice Comtesse", "museum"]
    ]
  },
  "Napa Valley, United States": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://www.visitnapavalley.com/",
      "https://www.visitnapavalley.com/things-to-do/towns-regions/napa/",
      "https://www.visitnapavalley.com/things-to-do/trip-ideas/first-timers-guide-to-napa-valley/",
      "https://www.visitnapavalley.com/travel-trade/planning-tool-kit/top-things-to-do/"
    ],
    places: [
      ["Downtown Napa", "neighborhood"],
      ["Napa Valley Welcome Center", "planning"],
      ["Oxbow Public Market", "food"],
      ["St. Helena", "neighborhood"],
      ["Yountville", "neighborhood"],
      ["Beringer Vineyards", "food"],
      ["Napa Valley Wine Train", "attraction"],
      ["Napa Valley Opera House", "arts"],
      ["Bothe-Napa Valley State Park", "outdoors"],
      ["Napa Valley Museum", "museum"]
    ]
  },
  "Cesky Krumlov, Czechia": {
    checkedOn: "2026-09-19",
    status: "ready-for-content-draft",
    sourceUrls: [
      "https://www.ckrumlov.info/en/cesky-krumlov/",
      "https://www.ckrumlov.info/en/sights-and-culture/",
      "https://www.ckrumlov.info/en/sights-and-culture-68-cesky-krumlov-state-castle-and-ch-teau/",
      "https://www.ckrumlov.info/en/frequently-asked-questions-faq/"
    ],
    places: [
      ["Cesky Krumlov State Castle and Chateau", "history"],
      ["Castle Museum and Tower", "museum"],
      ["Castle Baroque Theatre", "arts"],
      ["Baroque Castle Garden", "outdoors"],
      ["Egon Schiele Art Centrum", "arts"],
      ["Museum Fotoatelier Seidel", "museum"],
      ["Regional Museum in Cesky Krumlov", "museum"],
      ["Cesky Krumlov Monasteries", "history"],
      ["Port 1560", "arts"],
      ["Vltava River", "outdoors"]
    ]
  }
};
