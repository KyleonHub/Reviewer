// Comprehensive study dataset for RLW: Rizal's Life and Works (Buhay at Mga Akda ni Rizal)
// Fully covers all topics from RLW lecture notes with 65 flashcards and 167 quiz questions.

const RLW_SUBJECT = {
  id: 'subj-rlw',
  code: 'RLW',
  name: "Rizal's Life and Works",
  tag: 'Mandatory GE Course',
  description: "Buhay, mga akda, at kontribusyon ni Dr. Jose Rizal; Batas Rizal (RA 1425); Konteksto ng ika-19 na siglo; GOMBURZA, KKK, at Rebolusyong 1896.",

  visuals: [
  {
    "id": "vis-rizal",
    "title": "Dr. Jose Protacio Rizal",
    "caption": "Pambansang Bayani ng Pilipinas (1861–1896), Polymath, Manunulat, at Martir.",
    "url": "assets/images/rizal.jpg"
  },
  {
    "id": "vis-noli",
    "title": "Noli Me Tangere (1887)",
    "caption": "Inilimbag sa Berlin, Alemanya sa tulong ni Dr. Maximo Viola. Inilantad ang kabulukan ng lipunan at pamamahala ng mga prayle.",
    "url": "assets/images/noli.jpg"
  },
  {
    "id": "vis-fili",
    "title": "El Filibusterismo (1891)",
    "caption": "Inilimbag sa Ghent, Belgium sa tulong ni Valentin Ventura. Inialay ni Rizal sa tatlong paring martir (GOMBURZA).",
    "url": "assets/images/fili.jpg"
  },
  {
    "id": "vis-gomburza",
    "title": "Ang Tatlong Paring Martir (GOMBURZA)",
    "caption": "Padre Gomez, Burgos, at Zamora. Binitay sa pamamagitan ng garrote noong Pebrero 17, 1872 sa Bagumbayan.",
    "url": "assets/images/gomburza.jpg"
  },
  {
    "id": "vis-recto",
    "title": "Senador Claro M. Recto",
    "caption": "Ang makabayang may-akda ng Batas Rizal (Senate Bill 438 / RA 1425).",
    "url": "assets/images/recto.jpg"
  },
  {
    "id": "vis-magsaysay",
    "title": "Pangulong Ramon Magsaysay",
    "caption": "Lumagda sa Batas Rizal noong Hunyo 12, 1956 sa Malakanyang.",
    "url": "assets/images/magsaysay.jpg"
  },
  {
    "id": "vis-taft",
    "title": "William Howard Taft",
    "caption": "Unang Gobernador Sibil ng Pilipinas na nagtaguyod kay Rizal bilang pambansang bayani.",
    "url": "assets/images/taft.jpg"
  },
  {
    "id": "vis-suez",
    "title": "Pagbubukas ng Suez Canal (1869)",
    "caption": "Pinaikli ang biyahe mula Europa patungong Maynila mula 4-6 na buwan tungo sa 30 araw, nagpasok ng mga liberal na kaisipan.",
    "url": "assets/images/suez.jpg"
  },
  {
    "id": "vis-execution",
    "title": "Pagbaril sa Bagumbayan (Disyembre 30, 1896)",
    "caption": "Huling sandali ni Rizal sa Bagumbayan. Kanyang huling salita: 'Consummatum est!'",
    "url": "assets/images/execution.jpg"
  }
],
  flashcards: [
  {
    "id": "fc-1",
    "front": "Ano ang kahulugan ng: 'There are no tyrants where there are no slaves'?",
    "back": "'Walang mapang-api kung walang nagpapaapi.' Hindi magkakaroon ng kapangyarihang mang-abuso ang pinuno kung tatayo at tututol ang mga mamamayan.",
    "hint": "Tirano at alipin",
    "image": {
      "url": "assets/images/rizal.jpg",
      "title": "Dr. Jose Rizal"
    }
  },
  {
    "id": "fc-2",
    "front": "Ano-ano ang 4 na salik ng 'The Anatomy of Public Tolerance'?",
    "back": "1. Ignorance (Kakulangan sa kaalaman)\n2. Corruption at the bottom (Korapsyon ng ordinaryong mamamayan)\n3. Apathy (Kawalan ng pakialam)\n4. Cowardice masquerading as prudence (Kaduwagang nagkukunwaring pag-iingat).",
    "hint": "Ignorance, Corruption, Apathy, Cowardice"
  },
  {
    "id": "fc-3",
    "front": "Bakit tinutulan ni Rizal ang marahas na Himagsikang 1896?",
    "back": "1. Ayaw niya ng maraming pagdanak ng dugo.\n2. Hindi pa handa ang Pilipinas (kulang sa pondo, armas, at suporta ng mayayaman).\n3. Gusto muna niyang mabuksan ang isip ng tao sa pamamagitan ng edukasyon.",
    "hint": "Dugo, armas, at edukasyon",
    "image": {
      "url": "assets/images/execution.jpg",
      "title": "Bagumbayan"
    }
  },
  {
    "id": "fc-4",
    "front": "Ang mga pinuno ba ay sanhi o repleksyon ng lipunan?",
    "back": "Sila ay parehong sanhi at REPLEKSYON. Dahil nagmumula ang mga lider sa mga tao, sinasalamin nila ang mga pasya at halagahan ng lipunan.",
    "hint": "Repleksyon ng mamamayan"
  },
  {
    "id": "fc-5",
    "front": "Ano ang opisyal na titulo at numero ng Batas Rizal?",
    "back": "Republic Act No. 1425 (Batas Republika Blg. 1425) na nag-uutos na ituro ang buhay, mga gawa, at mga isinulat ni Rizal, lalo na ang Noli at Fili.",
    "hint": "RA 1425",
    "image": {
      "url": "assets/images/noli.jpg",
      "title": "Noli Me Tangere"
    }
  },
  {
    "id": "fc-6",
    "front": "Sino ang may-akda at sino ang sponsor ng Batas Rizal sa Senado?",
    "back": "• Claro M. Recto: Pangunahing may-akda (author)\n• Jose P. Laurel: Sponsor at nagtanggol sa Senado bilang Chairman ng Committee on Education.",
    "hint": "Recto at Laurel",
    "image": {
      "url": "assets/images/recto.jpg",
      "title": "Senador Claro M. Recto"
    }
  },
  {
    "id": "fc-7",
    "front": "Kailan nilagdaan ni Ramon Magsaysay ang Batas Rizal?",
    "back": "Hunyo 12, 1956 (Araw ng Kalayaan) sa Malakanyang.",
    "hint": "Hunyo 12, 1956",
    "image": {
      "url": "assets/images/magsaysay.jpg",
      "title": "Ramon Magsaysay"
    }
  },
  {
    "id": "fc-8",
    "front": "Bakit tinutulan ng Simbahang Katolika ang Batas Rizal?",
    "back": "Labag daw ito sa Canon Law (bawal magbasa ng mga librong laban sa doktrina ng Simbahan) dahil inilalantad ng Noli at Fili ang pang-aabuso ng kaparian.",
    "hint": "Canon Law"
  },
  {
    "id": "fc-9",
    "front": "Ano ang isinasaad ng Section 1 hanggang 6 ng Batas Rizal?",
    "back": "• Sec. 1: Curriculum mandate sa lahat ng kolehiyo\n• Sec. 2: Library mandate (sapat na kopya ng unexpurgated edisyon)\n• Sec. 3: Translation & distribution sa iba't ibang wika\n• Sec. 4: Religious neutrality\n• Sec. 5: Funding / budget\n• Sec. 6: Effectivity upon approval.",
    "hint": "6 na Seksiyon"
  },
  {
    "id": "fc-10",
    "front": "Ano ang 5 Core Rationales ng Batas Rizal?",
    "back": "1. To Foster Nationalism\n2. To Honor Dr. Jose Rizal\n3. To Learn from Philippine History\n4. To Develop Moral Character\n5. To Promote Critical Thinking.",
    "hint": "5 Layunin"
  },
  {
    "id": "fc-11",
    "front": "Ibigay ang buong pangalan at kahulugan ng bawat bahagi ng pangalan ni Rizal.",
    "back": "JOSE PROTACIO RIZAL MERCADO Y ALONSO REALONDA:\n• Jose: San Jose (panata ng ina)\n• Protacio: Saint Protasius (Hunyo 19)\n• Rizal: Ricial ('berdeng bukirin')\n• Mercado: 'Pamilihan' (Domingo Lam-co)\n• Y: At\n• Alonso: Apelyido ng ina\n• Realonda: Mula sa ninang ng ina.",
    "hint": "Buong Pangalan",
    "image": {
      "url": "assets/images/rizal.jpg",
      "title": "Dr. Jose Rizal"
    }
  },
  {
    "id": "fc-12",
    "front": "Ano ang Claveria Law ng 1849?",
    "back": "Kautusan ni Gob.-Hen. Narciso Claveria na nag-atas sa bawat pamilya na pumili ng apelyido mula sa Catalogo Alfabetico de Apellidos para sa buwis at senso.",
    "hint": "1849 • Narciso Claveria"
  },
  {
    "id": "fc-13",
    "front": "Kailan at saan ipinanganak at bininyagan si Jose Rizal?",
    "back": "• Kapanganakan: Hunyo 19, 1861 sa Calamba, Laguna\n• Binyag: Hunyo 22, 1861 ni Padre Rufino Collantes\n• Ninong: Padre Pedro Casañas.",
    "hint": "Hunyo 19 & 22, 1861"
  },
  {
    "id": "fc-14",
    "front": "Ano ang hula ni Padre Rufino Collantes sa sanggol na si Rizal?",
    "back": "Magiging dakilang tao ang sanggol dahil sa kapansin-pansing laki ng ulo nito.",
    "hint": "Laki ng ulo • Dakila"
  },
  {
    "id": "fc-15",
    "front": "Bakit maagang binibinyagan ang sanggol noon?",
    "back": "1. Paniniwalang Espanyol: Banta ng evil spirits sa hindi binyag\n2. Siyentipiko: Mataas na infant mortality at kawalan ng bakuna\n3. Pamamahala: Mas madaling pagkontrol ng Simbahan sa populasyon.",
    "hint": "3 Dahilan ng Maagang Binyag"
  },
  {
    "id": "fc-16",
    "front": "Kailan, saan, at ano ang huling salita ni Rizal bago siya barilin?",
    "back": "• Disyembre 30, 1896 sa Bagumbayan (Luneta)\n• Huling salita: 'Consummatum est!' ('Naganap na' / 'It is finished').",
    "hint": "Consummatum est",
    "image": {
      "url": "assets/images/execution.jpg",
      "title": "Bagumbayan"
    }
  },
  {
    "id": "fc-17",
    "front": "Sino ang naglibing kay Rizal at ano ang markang inilagay?",
    "back": "Lihim na inilibing ng mga Espanyol sa Paco Cemetery. Nahanap ito ng kapatid niyang si Narcisa at nilagyan ng baliktad na markang 'RPJ'.",
    "hint": "Narcisa • Paco Cemetery • RPJ"
  },
  {
    "id": "fc-18",
    "front": "Ano ang 4 na pamantayan sa pagpili ng bayani ayon kay Henry Otley Beyer?",
    "back": "1. Isang Pilipino\n2. Namayapa na (patay na)\n3. May matayog na pagmamahal sa bayan (nasyonalismo)\n4. May mahinahong damdamin (calm disposition).",
    "hint": "Beyer Criteria",
    "image": {
      "url": "assets/images/taft.jpg",
      "title": "William Howard Taft"
    }
  },
  {
    "id": "fc-19",
    "front": "Ano ang mga batas ng Komisyong Amerikano na nagtatag sa 'Rizal Cult'?",
    "back": "• Act No. 137: Morong ginawang Lalawigan ng Rizal\n• Act No. 243: Pondo para sa bantayog sa Luneta\n• Act No. 346: Ginawang pambansang pista opisyal ang Disyembre 30.",
    "hint": "Act 137, 243, 346"
  },
  {
    "id": "fc-20",
    "front": "Bakit tinawag ni Renato Constantino si Rizal bilang 'American-Sponsored Hero'?",
    "back": "Pinili siya ng mga Amerikano dahil patay na siya, repormista at hindi marahas, at hindi naging hadlang sa pananakop ng Amerika.",
    "hint": "Veneration Without Understanding"
  },
  {
    "id": "fc-21",
    "front": "Kinasusuklaman ba ni Renato Constantino si Rizal?",
    "back": "HINDI. Ang tinutulan niya ay ang bulag na pagsamba (uncritical hero worship). Nanawagan siyang pag-aralan si Rizal nang may katapatan.",
    "hint": "Uncritical hero worship"
  },
  {
    "id": "fc-22",
    "front": "Ano ang kaibahan ng Kanluraning 'Hero' sa Pilipinong 'Bayani' ayon kay Dr. Zeus Salazar?",
    "back": "• Hero: Indibidwalismo, supernatural na lakas, sariling kapurihan.\n• Bayani: Nagmumula sa 'Bayan' (komunidad) at 'Bagani' (mandirigmang tagapagtanggol). Nakatali sa paglilingkod sa kapwa at personal choice.",
    "hint": "Hero vs Bayani"
  },
  {
    "id": "fc-23",
    "front": "Ano ang Pantayong Pananaw?",
    "back": "Perspektiba sa historiograpiya kung saan ang kasaysayan ay isinusulat, tinatalakay, at sinusuri ng mga Pilipino para sa mga Pilipino sa sariling wika.",
    "hint": "Zeus Salazar • Pantayong Pananaw"
  },
  {
    "id": "fc-24",
    "front": "Kailan itinatag ang Katipunan at sino ang nagtatag?",
    "back": "Hulyo 7, 1892 itinatag ni Andres Bonifacio sa Tondo, Maynila matapos ipatapon si Rizal sa Dapitan.",
    "hint": "Hulyo 7, 1892 • Andres Bonifacio"
  },
  {
    "id": "fc-25",
    "front": "Ano ang Triangular System ng Katipunan?",
    "back": "Paraan ng lihim na pagre-recruit kung saan ang isang miyembro ay nag-aanyaya ng dalawa pang kasapi na hindi magkakilala sa isa't isa.",
    "hint": "Sistema ng Triangulo"
  },
  {
    "id": "fc-26",
    "front": "Paano nabunyag ang lihim ng Katipunan noong 1896?",
    "back": "Alitan nina Teodoro Patiño at Apolonio dela Cruz sa Diario de Manila -> Ipinagtapat ni Patiño sa kapatid na si Honoria -> Sor Teresa -> Padre Mariano Gil.",
    "hint": "Patiño, Diario de Manila, Padre Gil"
  },
  {
    "id": "fc-27",
    "front": "Sino si Melchora Aquino (Tandang Sora)?",
    "back": "'Ina ng Katipunan.' Nagpakain, gumamot, at kumupkop sa mga Katipunero; ipinatapon sa Guam sa loob ng 6 na taon ng mga Espanyol.",
    "hint": "Ina ng Katipunan • Guam"
  },
  {
    "id": "fc-28",
    "front": "Sino si Macario Sakay at ano ang Brigandage Act ng 1902?",
    "back": "Nagtatag ng Republika ng Katagalugan at nagpatuloy ng gerilya. Sa ilalim ng Brigandage Act, tinawag siyang bandido/tulisan ng mga Amerikano at binitay noong 1907.",
    "hint": "Macario Sakay • Brigandage Act"
  },
  {
    "id": "fc-29",
    "front": "Ano ang Jones Law (1916) at Tydings-McDuffie Act (1934)?",
    "back": "• Jones Law: Nangako ng kalayaan kapag may matatag na pamahalaan.\n• Tydings-McDuffie: Nagtatag ng 10-taong Pamahalaang Komonwelt bago ang kalayaan.",
    "hint": "Batas sa Kalayaan"
  },
  {
    "id": "fc-30",
    "front": "Bakit itinuturing si Jose P. Laurel na puppet president ngunit nagmalasakit?",
    "back": "Pangulo ng Ikalawang Republika sa ilalim ng Hapon; pinanatili ang mga paaralan at pagkain para maprotektahan ang mga Pilipino sa kalupitan ng mga sundalong Hapon.",
    "hint": "Jose P. Laurel • Panahon ng Hapon"
  },
  {
    "id": "fc-31",
    "front": "Ano ang Parity Rights sa Bell Trade Act?",
    "back": "Nagbigay ng pantay na karapatan sa mga Amerikano at Pilipino sa paglinang at paggamit ng mga likas na yaman ng Pilipinas.",
    "hint": "Pantay na karapatan sa likas na yaman"
  },
  {
    "id": "fc-32",
    "front": "Ano ang pagkakaiba ng Disinformation at Misinformation?",
    "back": "• Disinformation: Maling impormasyong SADYANG ikinakalat upang manlinlang (intentional).\n• Misinformation: Maling impormasyong ibinabahagi nang HINDI sinasadya (unintentional).",
    "hint": "Intentional vs Unintentional"
  },
  {
    "id": "fc-33",
    "front": "Sino si Andres de Urdaneta at ano ang Tornaviaje?",
    "back": "Agustinong nabigador na nakatuklas ng Tornaviaje (pabalik na ruta mula Maynila patungong Acapulco) na naging daan sa Kalakalang Galyon (1565–1815).",
    "hint": "Tornaviaje • Acapulco"
  },
  {
    "id": "fc-34",
    "front": "Ano ang Polo y Servicio at sino ang mga sakop nito?",
    "back": "Sapilitang paggawa para sa mga kalalakihang 16 hanggang 60 taong gulang sa loob ng 40 araw (kalauna'y 15 araw). Nagdulot ng pagbagsak sa agrikultura.",
    "hint": "16-60 taong gulang • 40 araw"
  },
  {
    "id": "fc-35",
    "front": "Ano ang Merkantilismo (Mercantilism)?",
    "back": "Kaisipang pang-ekonomiya kung saan ang yaman ng bansa ay sinusukat sa dami ng ginto at pilak. Layunin: Low import, high export.",
    "hint": "Ginto at pilak • Low import, high export"
  },
  {
    "id": "fc-36",
    "front": "Ano ang epekto ng pagbubukas ng Suez Canal noong Nobyembre 17, 1869?",
    "back": "Pinaikli ang biyahe sa Maynila sa 30 araw (mula 4-6 na buwan) at nagpasok ng mga aklat at kaisipang liberal mula sa Europa.",
    "hint": "30 araw • Liberal na ideya",
    "image": {
      "url": "assets/images/suez.jpg",
      "title": "Suez Canal"
    }
  },
  {
    "id": "fc-37",
    "front": "Ano ang Social Contract ni Jean-Jacques Rousseau?",
    "back": "Kasunduang panlipunan kung saan isinusuko ng mamamayan ang ilang pansariling kalayaan kapalit ng proteksyon at kaayusan mula sa gobyerno.",
    "hint": "Social Contract • Rousseau"
  },
  {
    "id": "fc-38",
    "front": "Ano ang pagkakaiba ng Peninsulares, Insulares, Mestizo, at Indio?",
    "back": "• Peninsulares: Purong Espanyol mula sa Espanya (pinakamataas)\n• Insulares / Creole: Purong Espanyol na ipinanganak sa Pilipinas\n• Mestizo: Halong Espanyol/Tsino at Pilipino\n• Indio: Katutubong Pilipino (pinakamababa).",
    "hint": "Antas ng Lipunan"
  },
  {
    "id": "fc-39",
    "front": "Ano ang Inquilino?",
    "back": "Mga Pilipinong umuupa ng lupain sa mga ordeng relihiyoso (hacienda ng prayle) at nagpapasaka nito sa mga indio (kasama).",
    "hint": "Umuupa ng lupa sa prayle"
  },
  {
    "id": "fc-40",
    "front": "Ano ang kauna-unahang kolehiyo para sa kababaihan sa Pilipinas?",
    "back": "Colegio de Santa Potenciana (itinatag noong 1589) upang hubugin ang mga kababaihan bilang huwarang ina at asawa.",
    "hint": "Santa Potenciana (1589)"
  },
  {
    "id": "fc-41",
    "front": "Ano ang itinatag ng Educational Decree of 1863?",
    "back": "Libreng pampublikong primaryang paaralan sa bawat bayan para sa lalaki at babae, at ang Escuela Normal para sa pagsasanay ng mga guro.",
    "hint": "Libreng paaralan • Escuela Normal"
  },
  {
    "id": "fc-42",
    "front": "Sino si Ventura de los Reyes at ano ang Konstitusyon ng Cadiz (1812)?",
    "back": "Unang kinatawang Pilipino sa Cadiz Cortes sa Espanya. Ang Konstitusyon ng 1812 ay nagbigay ng pagkakapantay-pantay at kalayaan sa pamamahayag.",
    "hint": "Ventura de los Reyes • 1812"
  },
  {
    "id": "fc-43",
    "front": "Ano ang Frailocracia (Prailokrasya)?",
    "back": "Terminong pinasikat ni Marcelo H. del Pilar para sa walang limitasyong kapangyarihan at pagkontrol ng mga prayleng Espanyol sa pamahalaan at lipunan.",
    "hint": "Marcelo H. del Pilar • Prayle"
  },
  {
    "id": "fc-44",
    "front": "Ano ang Kilusang Sekularisasyon at ano ang papel ng GOMBURZA?",
    "back": "Kampanya ng mga Pilipinong Paring Sekular na makuha ang mga parokya mula sa mga Paring Regular (Kastilang prayle). Ang pagbitay sa GOMBURZA noong Peb. 17, 1872 ang gumising sa nasyonalismo.",
    "hint": "Sekular vs Regular",
    "image": {
      "url": "assets/images/gomburza.jpg",
      "title": "GOMBURZA"
    }
  },
  {
    "id": "fc-45",
    "front": "Ano ang 3 tugon ng mga Pilipino sa kolonyalismo?",
    "back": "1. Pagtakas (Remontados / Cimarrones patungong bundok)\n2. Pagtanggap (Pagpapasailalim sa patakaran at simbahan)\n3. Paglaban (Mga rebelyon, Kilusang Propaganda, at Katipunan).",
    "hint": "Pagtakas, Pagtanggap, Paglaban"
  },
  {
    "id": "fc-46",
    "front": "Ano ang Nature vs. Nurture sa paghubog ng dakilang tao?",
    "back": "• Nature: Mga likas na talento at talino na minana sa DNA/lahi.\n• Nurture: Paghasa sa potensyal dulot ng pamilya, edukasyon, at karanasan.",
    "hint": "Nature vs Nurture"
  },
  {
    "id": "fc-47",
    "front": "Ano-ano ang mga palayaw at alyas ni Jose Rizal?",
    "back": "• Pepe: Mula sa 'P.P.' (Pater Putativus para kay San Jose)\n• Ute / Ote: Tawag ng mga kapatid\n• Jose Mercado: Gamit sa SS Salvador (1882) para iwasan ang surveillance\n• Doctor Uliman: Bansag sa Calamba (doktor mula Alemanya)\n• Indio Bravo: Bansag ng mga liberal sa galing ng Pilipino.",
    "hint": "Pepe, Ute, Mercado, Uliman, Indio Bravo"
  },
  {
    "id": "fc-48",
    "front": "Ilang wika ang alam ni Rizal bilang Polyglot?",
    "back": "Humigit-kumulang 22 na wika, kabilang ang Espanyol, Pranses, Aleman, Latin, Griyego, Ingles, Italyano, Nihongo, Arabo, at Tagalog.",
    "hint": "Humigit-kumulang 22 wika"
  },
  {
    "id": "fc-49",
    "front": "Ano ang kahulugan ng eskulturang 'The Triumph of Science over Death'?",
    "back": "• Bungo: Kamatayan\n• Hubad na Babae: Agham at Katotohanan\n• Sulo: Kaalaman.\nMensahe: Sa pamamagitan ng siyensya at gamot, kayang malupig o maantala ang kamatayan.",
    "hint": "Bungo, Babae, Sulo"
  },
  {
    "id": "fc-50",
    "front": "Ano ang mga dahilan kung bakit pinagdududahan ang 'Sa Aking Mga Kabata'?",
    "back": "1. Lumabas lamang noong 1906 (10 taon pagkamatay ni Rizal)\n2. Walang orihinal na sulat-kamay (manuscript)\n3. Ginamit ang salitang 'kalayaan' na noon lamang 1886 natutunang isalin ni Rizal sa liham kay Paciano.",
    "hint": "1906 • Walang manuscript • Salitang kalayaan"
  },
  {
    "id": "fc-51",
    "front": "Sino si Don Francisco Mercado Rizal?",
    "back": "Ama ni Rizal; 'Model of Fathers'; nag-aral ng Latin at Pilosopiya sa College of San Jose; tahimik, masipag, at maunawaing ama.",
    "hint": "Model of Fathers"
  },
  {
    "id": "fc-52",
    "front": "Sino si Doña Teodora Alonso Realonda?",
    "back": "Ina ni Rizal; nag-aral sa College of Santa Rosa; unang guro ni Rizal sa pagbasa, dasal, at nagturo ng Kwento ng Gamo-Gamo.",
    "hint": "Prudent Mother • Gamo-Gamo"
  },
  {
    "id": "fc-53",
    "front": "Sino si Saturnina (Neneng) Rizal?",
    "back": "Panganay sa 11 magkakapatid; naging pangalawang ina; nagpondo sa paglilimbag ng Noli Me Tangere sa Tagalog.",
    "hint": "Panganay (1850-1913)"
  },
  {
    "id": "fc-54",
    "front": "Sino si Paciano Rizal?",
    "back": "Nag-iisang kapatid na lalaki at ika-2 anak; naging heneral sa rebolusyon; lihim na nagbigay ng Php700 para sa pag-aaral ni Rizal sa Europa.",
    "hint": "Nag-iisang lalaking kapatid"
  },
  {
    "id": "fc-55",
    "front": "Sino si Narcisa (Sisa) Rizal?",
    "back": "Ika-3 anak; guro at musikero; nakatuklas sa lihim na libingan ni Rizal sa Paco Cemetery at naglagay ng markang 'RPJ'.",
    "hint": "Ika-3 anak • RPJ marker"
  },
  {
    "id": "fc-56",
    "front": "Sino si Olympia (Ypia) Rizal?",
    "back": "Ika-4 na anak; asawa ni Silvestre Ubaldo (telegraph operator); pumanaw dahil sa panganganak noong 1887.",
    "hint": "Ika-4 na anak"
  },
  {
    "id": "fc-57",
    "front": "Sino si Lucia Rizal?",
    "back": "Ika-5 anak; asawa ni Mariano Herbosa (tinanggihang ilibing sa sementeryo); ina ni Delfina na tumulong magtahi ng Unang Watawat.",
    "hint": "Ika-5 anak • Ina ni Delfina"
  },
  {
    "id": "fc-58",
    "front": "Sino si Maria (Biang) Rizal?",
    "back": "Ika-6 na anak; pinakamalapit na kalaro ni Rizal dahil dalawang taon lamang ang kanilang agwat sa edad.",
    "hint": "Ika-6 na anak • Kalaro"
  },
  {
    "id": "fc-59",
    "front": "Sino si Concepcion (Concha) Rizal?",
    "back": "Ika-8 anak; pumanaw sa edad na tatlo (3); ang kanyang pagpanaw ang nagdulot ng unang matinding pagluha at pighati ni Rizal.",
    "hint": "Ika-8 anak • Edad 3"
  },
  {
    "id": "fc-60",
    "front": "Sino si Josefa (Panggoy) Rizal?",
    "back": "Ika-9 na anak; may sakit na epilepsy; naging miyembro at tagapagtago ng mga lihim na dokumento ng Katipunan.",
    "hint": "Ika-9 na anak • Katipunan"
  },
  {
    "id": "fc-61",
    "front": "Sino si Trinidad (Trining) Rizal?",
    "back": "Ika-10 anak; pinagkalooban ni Rizal ng lamparang naglalaman ng tulang Mi Ultimo Adios habang bumubulong ng 'There is something inside.'",
    "hint": "Ika-10 anak • Mi Ultimo Adios"
  },
  {
    "id": "fc-62",
    "front": "Sino si Soledad (Choleng) Rizal?",
    "back": "Ang ika-11 at pinakabatang anak (bunso) sa magkakapatid na Rizal; ikinasal kay Pantaleon Quintero.",
    "hint": "Bunso (ika-11 anak)"
  },
  {
    "id": "fc-63",
    "front": "Ilarawan ang katayuan sa lipunan ng pamilyang Rizal sa Calamba.",
    "back": "Kabilang sa Principalia class. May dalawang palapag na bahay na bato, sariling karwahe, mahigit 1,000 libro sa aklatan, at napag-aral ang mga anak sa Maynila at Europa.",
    "hint": "Principalia • Bahay na Bato"
  },
  {
    "id": "fc-64",
    "front": "Sino ang tumulong kay Rizal sa pagpapalimbag ng Noli at Fili?",
    "back": "• Noli Me Tangere (1887, Berlin): Tinustusan ni Dr. Maximo Viola\n• El Filibusterismo (1891, Ghent): Tinustusan ni Valentin Ventura.",
    "hint": "Viola at Ventura",
    "image": {
      "url": "assets/images/fili.jpg",
      "title": "El Filibusterismo"
    }
  },
  {
    "id": "fc-65",
    "front": "Ano ang aral sa 'Parable of the Moth' (Kwento ng Gamo-Gamo)?",
    "back": "Itinuro ng ina ang panganib ng pagsuway, ngunit para kay Rizal, ang gamo-gamo ay sumasagisag sa marangal na pagnanais na lumapit sa liwanag (karunungan at kalayaan) kahit ibuwis ang buhay.",
    "hint": "Liwanag at Karunungan"
  }
],
  questions: [
  {
    "id": "q-mcq-1",
    "type": "mcq",
    "question": "Sino ang pangunahing may-akda (main author) ng Batas Rizal (Republic Act No. 1425)?",
    "options": [
      "Jose P. Laurel",
      "Claro M. Recto",
      "Ramon Magsaysay",
      "Manuel L. Quezon"
    ],
    "correctIndex": 1,
    "explanation": "Si Senador Claro M. Recto ang pangunahing may-akda ng Senate Bill No. 438.",
    "image": {
      "url": "assets/images/recto.jpg",
      "title": "Claro M. Recto"
    }
  },
  {
    "id": "q-mcq-2",
    "type": "mcq",
    "question": "Kailan opisyal na nilagdaan ni Pangulong Ramon Magsaysay ang Batas Rizal bilang ganap na batas?",
    "options": [
      "Disyembre 30, 1896",
      "Hunyo 12, 1956",
      "Hunyo 19, 1861",
      "Hulyo 4, 1946"
    ],
    "correctIndex": 1,
    "explanation": "Nilagdaan ito noong Araw ng Kalayaan, Hunyo 12, 1956, sa Malakanyang.",
    "image": {
      "url": "assets/images/magsaysay.jpg",
      "title": "Ramon Magsaysay"
    }
  },
  {
    "id": "q-mcq-3",
    "type": "mcq",
    "question": "Alin sa mga sumusunod ang HINDI kabilang sa apat na salik ng 'The Anatomy of Public Tolerance'?",
    "options": [
      "Ignorance",
      "Apathy",
      "Armed Rebellion",
      "Cowardice masquerading as prudence"
    ],
    "correctIndex": 2,
    "explanation": "Ang apat na salik ay Ignorance, Corruption at the bottom, Apathy, at Cowardice masquerading as prudence."
  },
  {
    "id": "q-mcq-4",
    "type": "mcq",
    "question": "Aling seksyon ng Batas Rizal ang nag-uutos sa mga aklatan ng paaralan na magkaroon ng sapat na kopya ng unexpurgated na Noli at Fili?",
    "options": [
      "Section 1",
      "Section 2",
      "Section 4",
      "Section 5"
    ],
    "correctIndex": 1,
    "explanation": "Ang Section 2 ay ang Library Mandate na nag-uutos ng sapat na kopya ng mga orihinal na akda ni Rizal.",
    "image": {
      "url": "assets/images/noli.jpg",
      "title": "Noli Me Tangere"
    }
  },
  {
    "id": "q-mcq-5",
    "type": "mcq",
    "question": "Bakit tinutulan ng Simbahang Katolika ang orihinal na Senate Bill 438?",
    "options": [
      "Dahil labag diumano sa Canon Law na nagbabawal magbasa ng mga aklat laban sa pananampalataya",
      "Dahil gusto nilang si Andres Bonifacio ang maging pambansang bayani",
      "Dahil magiging sanhi ito ng digmaan laban sa Estados Unidos",
      "Dahil walang pondo ang gobyerno para sa pagbili ng mga libro"
    ],
    "correctIndex": 0,
    "explanation": "Ipinahayag ng mga pinuno ng Simbahan na nilalabag ng panukala ang Canon Law dahil inaatake nito ang mga dogma at kaparian."
  },
  {
    "id": "q-mcq-6",
    "type": "mcq",
    "question": "Sino ang co-sponsor at tagapagtanggol ng Batas Rizal sa Senado bilang Chairman ng Committee on Education?",
    "options": [
      "Jose P. Laurel",
      "Claro M. Recto",
      "Mariano Cuenco",
      "Decoroso Rosales"
    ],
    "correctIndex": 0,
    "explanation": "Si Jose P. Laurel ang namuno sa Committee on Education na nagtanggol sa panukala sa plenaryo."
  },
  {
    "id": "q-mcq-7",
    "type": "mcq",
    "question": "Aling seksyon ng Batas Rizal ang nagtatadhana ng paglalaan ng pondo (appropriation/funding) ng pamahalaan para sa pagpapatupad ng batas?",
    "options": [
      "Section 1",
      "Section 3",
      "Section 5",
      "Section 6"
    ],
    "correctIndex": 2,
    "explanation": "Ang Section 5 ang naglalaan ng pondo para sa pag-imprenta at pamamahagi ng mga akda ni Rizal."
  },
  {
    "id": "q-mcq-8",
    "type": "mcq",
    "question": "Ano ang sinasaad ng Section 3 ng Batas Rizal (RA 1425)?",
    "options": [
      "Pagtuturo sa kurikulum",
      "Pagsasalin at pamamahagi sa Ingles, Tagalog, at mga pangunahing diyalekto",
      "Paglalaan ng pondo",
      "Petsa ng pagkabisa ng batas"
    ],
    "correctIndex": 1,
    "explanation": "Inaatasan ng Section 3 ang Board of National Education na isalin ang mga nobela sa mga pangunahing wika."
  },
  {
    "id": "q-mcq-9",
    "type": "mcq",
    "question": "Ano ang ibig sabihin ng kasabihang 'Walang mapang-api kung walang nagpapaapi' ayon kay Rizal?",
    "options": [
      "Likas na masama ang lahat ng pinuno",
      "Ang kapangyarihan ng tirano ay nagmumula sa pagpapasailalim at kawalan ng pagtutol ng mamamayan",
      "Dapat laging sumunod sa gobyerno",
      "Kailangan ng marahas na rebolusyon upang lumaya"
    ],
    "correctIndex": 1,
    "explanation": "Ipinunto ni Rizal na ang pananahimik at pagpapasailalim ng mga tao ang nagbibigay-kapangyarihan sa mga mapang-api.",
    "image": {
      "url": "assets/images/rizal.jpg",
      "title": "Dr. Jose Rizal"
    }
  },
  {
    "id": "q-mcq-10",
    "type": "mcq",
    "question": "Alin sa mga sumusunod ang isa sa mga dahilan kung bakit tinutulan ni Rizal ang marahas na Himagsikang 1896?",
    "options": [
      "Naniniwala siyang hindi pa handa ang bansa at kulang sa armas at pondo",
      "Takot siya sa mga sundalong Amerikano",
      "Gusto niyang maging hari ng Espanya",
      "Wala siyang pakialam sa kalagayan ng Pilipinas"
    ],
    "correctIndex": 0,
    "explanation": "Naniniwala si Rizal na magdudulot lamang ng malawakang patayan ang pag-aaklas dahil sa kakulangan sa kahandaan."
  },
  {
    "id": "q-mcq-11",
    "type": "mcq",
    "question": "Mula sa anong salitang Espanyol nagmula ang apelyidong 'Rizal'?",
    "options": [
      "Ricial (berdeng bukirin o pastulan)",
      "Rico (mayaman)",
      "Reina (reyna)",
      "Real (maharlika)"
    ],
    "correctIndex": 0,
    "explanation": "Nagmula ito sa salitang 'ricial' na nangangahulugang luntiang bukirin o pastulan.",
    "image": {
      "url": "assets/images/rizal.jpg",
      "title": "Dr. Jose Rizal"
    }
  },
  {
    "id": "q-mcq-12",
    "type": "mcq",
    "question": "Anong kautusan noong 1849 ang nag-utos sa mga pamilyang Pilipino na pumili ng opisyal na apelyido para sa buwis at senso?",
    "options": [
      "Cadiz Constitution",
      "Claveria Law (Catalogo Alfabetico de Apellidos)",
      "Educational Decree of 1863",
      "Jones Law"
    ],
    "correctIndex": 1,
    "explanation": "Ipinatupad ito ni Gob.-Hen. Narciso Claveria upang maisaayos ang senso at paniningil ng buwis."
  },
  {
    "id": "q-mcq-13",
    "type": "mcq",
    "question": "Sino ang paring nagbinyag kay Jose Rizal noong Hunyo 22, 1861 at humula na magiging dakila ang bata?",
    "options": [
      "Padre Pedro Casañas",
      "Padre Rufino Collantes",
      "Padre Jose Burgos",
      "Padre Mariano Gil"
    ],
    "correctIndex": 1,
    "explanation": "Si Padre Rufino Collantes ang kura paroko na nagbinyag at humula sa kadakilaan ni Rizal."
  },
  {
    "id": "q-mcq-14",
    "type": "mcq",
    "question": "Sino ang nag-iisang ninong ni Jose Rizal sa kanyang binyag sa Calamba?",
    "options": [
      "Padre Pedro Casañas",
      "Padre Rufino Collantes",
      "Paciano Rizal",
      "Domingo Lam-co"
    ],
    "correctIndex": 0,
    "explanation": "Si Padre Pedro Casañas, malapit na kaibigan ng pamilya, ang naging ninong ni Rizal."
  },
  {
    "id": "q-mcq-15",
    "type": "mcq",
    "question": "Ano ang huling binigkas ni Dr. Jose Rizal bago siya barilin sa Bagumbayan noong Disyembre 30, 1896?",
    "options": [
      "'Viva la Independencia!'",
      "'Consummatum est!'",
      "'Ang hindi magmahal sa kanyang salita...'",
      "'In patria mori.'"
    ],
    "correctIndex": 1,
    "explanation": "'Consummatum est!' (Naganap na / It is finished).",
    "image": {
      "url": "assets/images/execution.jpg",
      "title": "Pagbitay sa Bagumbayan"
    }
  },
  {
    "id": "q-mcq-16",
    "type": "mcq",
    "question": "Mula sa kaninong pangalan hango ang unang pangalan ni Rizal na 'Jose'?",
    "options": [
      "San Jose (panata ng kanyang ina na si Doña Teodora)",
      "San Jose de Calasanz",
      "Padre Jose Burgos",
      "San Jose Maria"
    ],
    "correctIndex": 0,
    "explanation": "Panata ito ni Doña Teodora kay San Jose dahil sa hirap ng kanyang panganganak."
  },
  {
    "id": "q-mcq-17",
    "type": "mcq",
    "question": "Bakit isinama ang pangalang 'Protacio' sa buong pangalan ni Jose Rizal?",
    "options": [
      "Mula sa kalendaryong Katoliko kung saan ang kapistahan ni Gervacio y Protacio ay Hunyo 19",
      "Pangalan ng kanyang ninuno sa Tsina",
      "Iminungkahi ng gobernadorcillo",
      "Pangalan ng paring nagbinyag"
    ],
    "correctIndex": 0,
    "explanation": "Ibinatay ito sa Santoral Romano kung saan ang kapistahan ni Saint Protasius ay Hunyo 19."
  },
  {
    "id": "q-mcq-18",
    "type": "mcq",
    "question": "Ano ang kahulugan ng orihinal na apelyidong 'Mercado' na pinili ni Domingo Lam-co noong 1731?",
    "options": [
      "Pamilihan (Market)",
      "Bukirin",
      "Mandirigma",
      "Pari"
    ],
    "correctIndex": 0,
    "explanation": "Ang 'Mercado' ay salitang Espanyol para sa pamilihan (market) na angkop sa kanyang pagiging mangangalakal."
  },
  {
    "id": "q-mcq-19",
    "type": "mcq",
    "question": "Ano ang orihinal na pinagmulang bayan ng ninunong Tsino ni Rizal na si Domingo Lam-co?",
    "options": [
      "Amoy (Xiamen), China",
      "Beijing, China",
      "Canton, China",
      "Shanghai, China"
    ],
    "correctIndex": 0,
    "explanation": "Nanggaling si Domingo Lam-co sa Amoy (ngayo'y Xiamen) sa lalawigan ng Fujian, China."
  },
  {
    "id": "q-mcq-20",
    "type": "mcq",
    "question": "Bakit pinalitan ng pamilya ang kanilang apelyido mula Mercado patungong Rizal?",
    "options": [
      "Dahil naging mainit ang apelyidong Mercado sa mata ng pamahalaang Espanyol dahil sa koneksyon ni Paciano kay Padre Burgos",
      "Dahil bawal ang apelyidong Mercado sa Ateneo",
      "Dahil utos ito ni Narciso Claveria",
      "Dahil nanalo sila sa loterya"
    ],
    "correctIndex": 0,
    "explanation": "Ginamit ni Jose ang apelyidong Rizal upang makapag-aral nang malaya sa Maynila nang hindi pinaghihinalaan.",
    "image": {
      "url": "assets/images/gomburza.jpg",
      "title": "GOMBURZA"
    }
  },
  {
    "id": "q-mcq-21",
    "type": "mcq",
    "question": "Alin sa mga sumusunod ang HINDI kabilang sa pamantayan sa pagpili ng bayani na inilatag ni Henry Otley Beyer?",
    "options": [
      "Isang Pilipino",
      "Namayapa na (patay na)",
      "Dapat ay namuno sa isang armadong rebolusyon",
      "May mahinahong damdamin (calm disposition)"
    ],
    "correctIndex": 2,
    "explanation": "Kabaligtaran, pinili si Rizal dahil may mahinahon siyang damdamin at hindi nagtaguyod ng marahas na digmaan.",
    "image": {
      "url": "assets/images/taft.jpg",
      "title": "William Howard Taft"
    }
  },
  {
    "id": "q-mcq-22",
    "type": "mcq",
    "question": "Anong batas ng Komisyong Amerikano ang nagpalit sa pangalan ng lalawigan ng Morong tungo sa 'Rizal'?",
    "options": [
      "Act No. 137",
      "Act No. 243",
      "Act No. 346",
      "Republic Act 1425"
    ],
    "correctIndex": 0,
    "explanation": "Ang Philippine Commission Act No. 137 ang nagtatag sa Lalawigan ng Rizal bilang parangal sa bayani."
  },
  {
    "id": "q-mcq-23",
    "type": "mcq",
    "question": "Anong batas ng Komisyong Amerikano ang naglaan ng pondo para sa pagpapatayo ng bantayog ni Rizal sa Luneta?",
    "options": [
      "Act No. 137",
      "Act No. 243",
      "Act No. 346",
      "Act No. 1425"
    ],
    "correctIndex": 1,
    "explanation": "Ang Act No. 243 ang nag-utos sa paglikom ng pondo at pagpapatayo ng bantayog sa Bagumbayan."
  },
  {
    "id": "q-mcq-24",
    "type": "mcq",
    "question": "Anong batas ng Komisyong Amerikano ang nagdeklara sa Disyembre 30 bilang opisyal na pambansang araw ng pangilin (Rizal Day)?",
    "options": [
      "Act No. 137",
      "Act No. 243",
      "Act No. 346",
      "Act No. 500"
    ],
    "correctIndex": 2,
    "explanation": "Ang Act No. 346 ang nagtakda sa Disyembre 30 bilang opisyal na pambansang pista opisyal."
  },
  {
    "id": "q-mcq-25",
    "type": "mcq",
    "question": "Ano ang sentral na punto ng sanaysay ni Renato Constantino na 'Veneration Without Understanding'?",
    "options": [
      "Dapat kalimutan si Rizal dahil siya ay duwag",
      "Dapat pag-aralan si Rizal nang may pagsusuri at katapatan (kapwa tagumpay at limitasyon) sa halip na bulag na pagsamba",
      "Si Aguinaldo lamang ang karapat-dapat na bayani",
      "Dapat ibalik ang Pilipinas sa ilalim ng Espanya"
    ],
    "correctIndex": 1,
    "explanation": "Tinuligsa ni Constantino ang uncritical hero worship at itinaguyod ang tapat na pag-aaral kay Rizal."
  },
  {
    "id": "q-mcq-26",
    "type": "mcq",
    "question": "Sino ang Unang Gobernador Sibil ng Pilipinas na nagtaguyod sa pagpili kay Rizal bilang pambansang bayani bilang simbolo ng pagkakaisa?",
    "options": [
      "William Howard Taft",
      "Douglas MacArthur",
      "Francis Burton Harrison",
      "Leonard Wood"
    ],
    "correctIndex": 0,
    "explanation": "Si William Howard Taft ang nanguna sa Komisyong Amerikano na nagluklok kay Rizal.",
    "image": {
      "url": "assets/images/taft.jpg",
      "title": "William Howard Taft"
    }
  },
  {
    "id": "q-mcq-27",
    "type": "mcq",
    "question": "Sino-sino ang iba pang bayaning pinagpilian ng Komisyong Amerikano bago napili si Rizal?",
    "options": [
      "Marcelo H. Del Pilar, Antonio Luna, Graciano Lopez-Jaena, Emilio Jacinto",
      "Manuel Quezon, Sergio Osmeña, Ramon Magsaysay",
      "Lapu-Lapu, Diego Silang, Dagohoy",
      "Emilio Aguinaldo, Apolinario Mabini, Macario Sakay"
    ],
    "correctIndex": 0,
    "explanation": "Kabilang sa mga pinagpilian sina Del Pilar, Luna, Lopez-Jaena, at Jacinto."
  },
  {
    "id": "q-mcq-28",
    "type": "mcq",
    "question": "Ayon kay Dr. Zeus Salazar, ano ang dalawang katutubong salita na pinagmulan ng salitang 'Bayani'?",
    "options": [
      "Bayan at Bagani",
      "Bayan at Bayanihan",
      "Bagsik at Ani",
      "Bata at Yumi"
    ],
    "correctIndex": 0,
    "explanation": "Nagmula ang 'Bayani' sa 'Bayan' (pamayanan) at 'Bagani' (mandirigmang nagtatanggol sa pamayanan)."
  },
  {
    "id": "q-mcq-29",
    "type": "mcq",
    "question": "Ano ang ibig sabihin ng 'Pantayong Pananaw' sa pag-aaral ng kasaysayan ng Pilipinas?",
    "options": [
      "Pagsulat ng kasaysayan mula sa pananaw ng mga mananakop na Kastila",
      "Pagsulat, pagtalakay, at pagsusuri ng kasaysayan ng mga Pilipino para sa mga Pilipino gamit ang sariling wika at kultura",
      "Paghahambing lamang sa kasaysayan ng Europa",
      "Pagtanggi sa anumang pag-aaral ng nakaraan"
    ],
    "correctIndex": 1,
    "explanation": "Ito ay historiograpiyang mula sa Pilipino at para sa kapwa Pilipino sa sariling talastasan."
  },
  {
    "id": "q-mcq-30",
    "type": "mcq",
    "question": "Ano ang kaibahan ng Kanluraning 'Hero' sa Pilipinong 'Bayani'?",
    "options": [
      "Ang Hero ay nakatutok sa indibidwalismong kapangyarihan samantalang ang Bayani ay nakaugat sa paglilingkod sa pamayanan",
      "Ang Hero ay totoo samantalang ang Bayani ay kathang-isip",
      "Walang anumang pagkakaiba ang dalawa",
      "Ang Hero ay para sa digmaan lamang"
    ],
    "correctIndex": 0,
    "explanation": "Ang kanluraning hero ay indibidwalistiko habang ang bayani ay kolektibo at nakatali sa bayan."
  },
  {
    "id": "q-mcq-31",
    "type": "mcq",
    "question": "Kailan opisyal na itinatag ni Andres Bonifacio ang Katipunan (KKK)?",
    "options": [
      "Hulyo 7, 1892",
      "Hunyo 12, 1896",
      "Agosto 23, 1896",
      "Disyembre 30, 1896"
    ],
    "correctIndex": 0,
    "explanation": "Itinatag ang KKK noong Hulyo 7, 1892 sa Calle Azcarraga (ngayo'y Claro M. Recto Avenue), Tondo."
  },
  {
    "id": "q-mcq-32",
    "type": "mcq",
    "question": "Ano ang agarang kaganapan na nagtulak kay Andres Bonifacio na itatag ang Katipunan noong Hulyo 7, 1892?",
    "options": [
      "Ang pagkakatapon kay Jose Rizal sa Dapitan",
      "Ang pagbitay sa GOMBURZA",
      "Ang pagputok ng Digmaang Espanyol-Amerikano",
      "Ang pagbubukas ng Suez Canal"
    ],
    "correctIndex": 0,
    "explanation": "Nang ipatapon si Rizal sa Dapitan, napatunayan ni Bonifacio na bigo na ang mapayapang reporma ng La Liga Filipina."
  },
  {
    "id": "q-mcq-33",
    "type": "mcq",
    "question": "Ano ang layunin ng 'Triangular System' (Sistema ng Triangulo) sa pagre-recruit ng Katipunan?",
    "options": [
      "Mapanatili ang lihim na operasyon kung saan ang dalawang bagong miyembro ay hindi magkakilala",
      "Makalikom ng mas maraming buwis",
      "Magsanay ng mga sundalong Espanyol",
      "Magtayo ng mga paaralan sa bawat baryo"
    ],
    "correctIndex": 0,
    "explanation": "Ginamit ito upang maiwasang maibunyag ang buong samahan kapag may nahuling isa."
  },
  {
    "id": "q-mcq-34",
    "type": "mcq",
    "question": "Saang palimbagan naganap ang alitan nina Teodoro Patiño at Apolonio dela Cruz na naging dahilan ng pagkabunyag ng Katipunan?",
    "options": [
      "Diario de Manila",
      "La Solidaridad",
      "El Renacimiento",
      "Kalayaan"
    ],
    "correctIndex": 0,
    "explanation": "Naganap ang alitan sa Diario de Manila kung saan natagpuan ang mga resibo at selyo ng KKK."
  },
  {
    "id": "q-mcq-35",
    "type": "mcq",
    "question": "Sino ang kura paroko ng Tondo na pinagsumbungan tungkol sa lihim ng Katipunan noong Agosto 1896?",
    "options": [
      "Padre Mariano Gil",
      "Padre Pedro Casañas",
      "Padre Jose Burgos",
      "Padre Rufino Collantes"
    ],
    "correctIndex": 0,
    "explanation": "Si Padre Mariano Gil ang nag-ulat sa mga awtoridad at naghalughog sa Diario de Manila."
  },
  {
    "id": "q-mcq-36",
    "type": "mcq",
    "question": "Sino ang tinaguriang 'Ina ng Katipunan' na kumupkop at gumamot sa mga Katipunero sa kanyang tahanan?",
    "options": [
      "Melchora Aquino (Tandang Sora)",
      "Gregoria de Jesus",
      "Trinidad Tecson",
      "Teresa Magbanua"
    ],
    "correctIndex": 0,
    "explanation": "Si Melchora Aquino o Tandang Sora ang nagbigay ng pagkain, tirahan, at gamot sa mga rebelde."
  },
  {
    "id": "q-mcq-37",
    "type": "mcq",
    "question": "Ilang taon ipinatapon ng mga Espanyol si Melchora Aquino sa isla ng Guam dahil sa pagtulong sa rebolusyon?",
    "options": [
      "6 na taon",
      "2 taon",
      "10 taon",
      "20 taon"
    ],
    "correctIndex": 0,
    "explanation": "Ipinatapon siya sa Guam sa loob ng anim (6) na taon at nakabalik lamang noong panahon ng Amerikano."
  },
  {
    "id": "q-mcq-38",
    "type": "mcq",
    "question": "Sino ang pangulo ng Unang Republika ng Pilipinas na nahuli ng mga Amerikano sa Palanan, Isabela noong 1901?",
    "options": [
      "Emilio Aguinaldo",
      "Andres Bonifacio",
      "Macario Sakay",
      "Manuel L. Quezon"
    ],
    "correctIndex": 0,
    "explanation": "Nahuli si Hen. Emilio Aguinaldo sa Palanan noong Marso 23, 1901."
  },
  {
    "id": "q-mcq-39",
    "type": "mcq",
    "question": "Anong batas ang ipinatupad ng mga Amerikano noong 1902 na nag-uri sa mga gerilyang Pilipino bilang mga magnanakaw at bandido?",
    "options": [
      "Brigandage Act (Batas sa Tulisan)",
      "Sedition Act",
      "Reconcentration Act",
      "Jones Law"
    ],
    "correctIndex": 0,
    "explanation": "Ang Brigandage Act of 1902 ang ginamit upang bitayin ang mga rebolusyonaryo tulad ni Macario Sakay."
  },
  {
    "id": "q-mcq-40",
    "type": "mcq",
    "question": "Sino ang heneral na nagtatag ng Republika ng Katagalugan at binitay ng mga Amerikano noong 1907 sa kabila ng pangakong amnestiya?",
    "options": [
      "Macario Sakay",
      "Antonio Luna",
      "Miguel Malvar",
      "Vicente Lukban"
    ],
    "correctIndex": 0,
    "explanation": "Si Macario Sakay ay niloko sa pangakong amnestiya at binitay sa Bilibid."
  },
  {
    "id": "q-mcq-41",
    "type": "mcq",
    "question": "Anong probisyon ang nilalaman ng Jones Law ng 1916 (Philippine Autonomy Act)?",
    "options": [
      "Pangakong ibibigay ang kalayaan ng Pilipinas sa sandaling magkaroon ng matatag na pamahalaan",
      "Agad na paglaya ng Pilipinas sa loob ng isang buwan",
      "Pagsasama ng Pilipinas bilang estado ng Amerika",
      "Pagtatatag ng batas militar"
    ],
    "correctIndex": 0,
    "explanation": "Nangako ang Jones Law ng kalayaan sa sandaling maitatag ang isang 'stable government'."
  },
  {
    "id": "q-mcq-42",
    "type": "mcq",
    "question": "Anong batas noong 1934 ang nagtatag sa Pamahalaang Komonwelt at nagtakda ng 10-taong panahon bago ang ganap na kalayaan?",
    "options": [
      "Tydings-McDuffie Act",
      "Hare-Hawes-Cutting Act",
      "Jones Law",
      "Bell Trade Act"
    ],
    "correctIndex": 0,
    "explanation": "Ang Tydings-McDuffie Act ang nagtakda sa 10-taong Commonwealth transition."
  },
  {
    "id": "q-mcq-43",
    "type": "mcq",
    "question": "Sino ang Unang Pangulo ng Pamahalaang Komonwelt na inilikas sa Washington D.C. at namatay sa tuberkulosis sa New York?",
    "options": [
      "Manuel L. Quezon",
      "Sergio Osmeña",
      "Jose P. Laurel",
      "Manuel Roxas"
    ],
    "correctIndex": 0,
    "explanation": "Si Manuel L. Quezon ang namuno sa Komonwelt sa exile at pumanaw sa Saranac Lake, NY."
  },
  {
    "id": "q-mcq-44",
    "type": "mcq",
    "question": "Sino ang nagsilbing Pangulo ng Ikalawang Republika ng Pilipinas sa ilalim ng pananakop ng mga Hapones?",
    "options": [
      "Jose P. Laurel",
      "Manuel L. Quezon",
      "Jorge B. Vargas",
      "Sergio Osmeña"
    ],
    "correctIndex": 0,
    "explanation": "Si Jose P. Laurel ang tumayong pangulo ng puppet government ngunit pinrotektahan ang mga sibilyan."
  },
  {
    "id": "q-mcq-45",
    "type": "mcq",
    "question": "Ano ang ipinagkaloob ng 'Parity Rights' sa ilalim ng Bell Trade Act of 1946 sa mga Amerikano?",
    "options": [
      "Pantay na karapatan sa mga mamamayang Amerikano na gamitin at linangin ang mga likas na yaman ng Pilipinas",
      "Libreng pabahay sa lahat ng sundalong Amerikano",
      "Karapatang bumoto sa halalan ng Pilipinas",
      "Pangangasiwa sa lahat ng simbahan"
    ],
    "correctIndex": 0,
    "explanation": "Binigyan ng Parity Rights ang mga Amerikano ng pantay na karapatan sa mga likas na yaman ng bansa."
  },
  {
    "id": "q-mcq-46",
    "type": "mcq",
    "question": "Ano ang tawag sa maling impormasyon na SADYANG ikinakalat upang manlinlang o magmanipula?",
    "options": [
      "Disinformation",
      "Misinformation",
      "Malinformation",
      "Rumor"
    ],
    "correctIndex": 0,
    "explanation": "Ang Disinformation ay may masamang intensyon at sadyang panlilinlang (intentional)."
  },
  {
    "id": "q-mcq-47",
    "type": "mcq",
    "question": "Ano ang tawag sa maling impormasyon na ibinabahagi nang WALANG intensyong manlinlang?",
    "options": [
      "Misinformation",
      "Disinformation",
      "Propaganda",
      "Hoax"
    ],
    "correctIndex": 0,
    "explanation": "Ang Misinformation ay pagkakamali lamang nang walang masamang motibo (unintentional)."
  },
  {
    "id": "q-mcq-48",
    "type": "mcq",
    "question": "Aling daang-tubig ang binuksan noong Nobyembre 17, 1869 na nagpaikli sa biyahe mula Europa patungong Maynila sa 30 araw?",
    "options": [
      "Panama Canal",
      "Suez Canal",
      "Kiel Canal",
      "Corinth Canal"
    ],
    "correctIndex": 1,
    "explanation": "Ang Suez Canal sa Ehipto ang nagpaikli ng biyahe mula 4-6 na buwan patungong 30 araw.",
    "image": {
      "url": "assets/images/suez.jpg",
      "title": "Suez Canal"
    }
  },
  {
    "id": "q-mcq-49",
    "type": "mcq",
    "question": "Sino ang Agustinong nabigador na nakatuklas sa Tornaviaje (ruta pabalik mula Pilipinas patungong Mexico)?",
    "options": [
      "Andres de Urdaneta",
      "Ferdinand Magellan",
      "Ruy Lopez de Villalobos",
      "Miguel Lopez de Legazpi"
    ],
    "correctIndex": 0,
    "explanation": "Si Fray Andres de Urdaneta ang nakatuklas ng rutang naging daan para sa Kalakalang Galyon."
  },
  {
    "id": "q-mcq-50",
    "type": "mcq",
    "question": "Sa pagitan ng aling dalawang lungsod naglayag ang mga barko ng Kalakalang Galyon (1565–1815)?",
    "options": [
      "Maynila at Acapulco",
      "Maynila at Madrid",
      "Cebu at Barcelona",
      "Iloilo at Cadiz"
    ],
    "correctIndex": 0,
    "explanation": "Ikinonekta ng Galeon de Manila ang Maynila at Acapulco sa Mexico."
  },
  {
    "id": "q-mcq-51",
    "type": "mcq",
    "question": "Ilang araw ang sapilitang paggawa sa ilalim ng Polo y Servicio sa orihinal nitong pagpapatupad?",
    "options": [
      "40 araw bawat taon",
      "15 araw bawat taon",
      "60 araw bawat taon",
      "90 araw bawat taon"
    ],
    "correctIndex": 0,
    "explanation": "Orihinal itong 40 araw bago ibinaba sa 15 araw noong 1884."
  },
  {
    "id": "q-mcq-52",
    "type": "mcq",
    "question": "Ano ang pangunahing prinsipyo ng Merkantilismo (Mercantilism)?",
    "options": [
      "Ang yaman ng bansa ay sinusukat sa dami ng ginto at pilak, na may mababang import at mataas na export",
      "Ang kalakalan ay dapat ganap na libre at walang buwis",
      "Lahat ng produkto ay pag-aari ng mga magsasaka",
      "Paggamit ng papel na salapi lamang"
    ],
    "correctIndex": 0,
    "explanation": "Sinusukat ng Merkantilismo ang yaman sa pamamagitan ng bullion (ginto at pilak)."
  },
  {
    "id": "q-mcq-53",
    "type": "mcq",
    "question": "Saan nagsimula ang Rebolusyong Industriyal na nagbunga ng mga makinang pasingaw (steam engines) at nagpabagsak sa Kalakalang Galyon?",
    "options": [
      "Great Britain (Gran Britanya)",
      "Espanya",
      "Pransya",
      "Alemanya"
    ],
    "correctIndex": 0,
    "explanation": "Nagsimula ang Industrial Revolution sa Great Britain noong ika-18 siglo."
  },
  {
    "id": "q-mcq-54",
    "type": "mcq",
    "question": "Sino ang pilosopong Ingles na nagpanukala sa mga likas na karapatan ng tao sa Buhay, Kalayaan, at Ari-arian (Life, Liberty, Property)?",
    "options": [
      "John Locke",
      "Voltaire",
      "Jean-Jacques Rousseau",
      "Thomas Hobbes"
    ],
    "correctIndex": 0,
    "explanation": "Si John Locke ang ama ng Klasikal na Liberalismo."
  },
  {
    "id": "q-mcq-55",
    "type": "mcq",
    "question": "Sino ang pilosopong Pranses na nagpanukala sa ideya ng 'Social Contract' (Kasunduang Panlipunan)?",
    "options": [
      "Jean-Jacques Rousseau",
      "Voltaire",
      "Montesquieu",
      "Rene Descartes"
    ],
    "correctIndex": 0,
    "explanation": "Isinulat ni Jean-Jacques Rousseau ang 'Du contrat social'."
  },
  {
    "id": "q-mcq-56",
    "type": "mcq",
    "question": "Ano ang tawag sa mga purong Espanyol na ipinanganak sa Espanya na humahawak ng pinakamataas na posisyon sa gobyerno at simbahan?",
    "options": [
      "Peninsulares",
      "Insulares",
      "Creoles",
      "Mestizos"
    ],
    "correctIndex": 0,
    "explanation": "Ang mga Peninsulares ay nanggaling sa Iberian Peninsula ng Espanya."
  },
  {
    "id": "q-mcq-57",
    "type": "mcq",
    "question": "Ano ang tawag sa mga purong Espanyol na ipinanganak sa Pilipinas (mga Islas)?",
    "options": [
      "Insulares (Creoles)",
      "Peninsulares",
      "Indios",
      "Sangley"
    ],
    "correctIndex": 0,
    "explanation": "Ang mga Insulares ay tinatawag ding Creoles o orihinal na 'Filipino' noong panahong iyon."
  },
  {
    "id": "q-mcq-58",
    "type": "mcq",
    "question": "Ano ang derogatoryong katawagan ng mga Espanyol sa mga katutubong Pilipino na nasa pinakamababang antas ng lipunan?",
    "options": [
      "Indio",
      "Insulares",
      "Ilustrado",
      "Principalia"
    ],
    "correctIndex": 0,
    "explanation": "Ginamit ng mga Kastila ang 'Indio' bilang mababang uri ng mamamayan."
  },
  {
    "id": "q-mcq-59",
    "type": "mcq",
    "question": "Ano ang tawag sa mga Pilipinong umuupa ng lupain sa mga hacienda ng prayle at nagpapasaka nito sa mga kasama?",
    "options": [
      "Inquilino",
      "Encomiendero",
      "Cabeza de Barangay",
      "Gobernadorcillo"
    ],
    "correctIndex": 0,
    "explanation": "Ang mga Inquilino ang tagapamagitan sa mga prayleng may-ari ng lupa at mga magsasakang indio."
  },
  {
    "id": "q-mcq-60",
    "type": "mcq",
    "question": "Ano ang kauna-unahang kolehiyo para sa mga kababaihan sa Pilipinas na itinatag noong 1589?",
    "options": [
      "Colegio de Santa Potenciana",
      "Colegio de Santa Rosa",
      "Colegio de Santa Isabel",
      "Assumption College"
    ],
    "correctIndex": 0,
    "explanation": "Ang Santa Potenciana ang unang paaralan para sa mga batang babae sa kapuluan."
  },
  {
    "id": "q-mcq-61",
    "type": "mcq",
    "question": "Anong unibersidad sa Maynila ang itinatag ng mga Heswita noong 1590 para sa pagsasanay sa pagpapari?",
    "options": [
      "Unibersidad ng San Ignacio",
      "Unibersidad ng Santo Tomas",
      "Colegio de San Juan de Letran",
      "Ateneo Municipal"
    ],
    "correctIndex": 0,
    "explanation": "Ang San Ignacio ang unang unibersidad na itinatag ng Society of Jesus sa Maynila."
  },
  {
    "id": "q-mcq-62",
    "type": "mcq",
    "question": "Kailan itinatag ng mga Dominikano ang Colegio de Santo Tomas (UST) na ginawang ganap na unibersidad ni Papa Inocencio X noong 1645?",
    "options": [
      "1611",
      "1590",
      "1863",
      "1896"
    ],
    "correctIndex": 0,
    "explanation": "Itinatag ang UST noong 1611 sa pamumuno ni Arsobispo Miguel de Benavides."
  },
  {
    "id": "q-mcq-63",
    "type": "mcq",
    "question": "Anong reporma sa edukasyon noong 1863 ang nag-atas sa pagpapatayo ng libreng pampublikong paaralang primarya sa bawat bayan?",
    "options": [
      "Educational Decree of 1863",
      "Claveria Decree",
      "Cadiz Constitution",
      "Moret Decree"
    ],
    "correctIndex": 0,
    "explanation": "Ang Educational Decree of 1863 ang naglatag ng batayang pampublikong edukasyon sa kapuluan."
  },
  {
    "id": "q-mcq-64",
    "type": "mcq",
    "question": "Ano ang paaralang itinatag sa ilalim ng Educational Decree of 1863 upang magsanay ng mga kwalipikadong guro?",
    "options": [
      "Escuela Normal (Normal School)",
      "Escuela Pia",
      "Colegio de San Jose",
      "Universidad Literaria"
    ],
    "correctIndex": 0,
    "explanation": "Ang Escuela Normal de Maestros ang nagsanay sa mga guro para sa pampublikong paaralan."
  },
  {
    "id": "q-mcq-65",
    "type": "mcq",
    "question": "Sino ang mayamang mangangalakal mula sa Vigan na naging unang kinatawang Pilipino sa Cadiz Cortes sa Espanya noong 1811?",
    "options": [
      "Ventura de los Reyes",
      "Pedro Paterno",
      "Jose Maria Panganiban",
      "Felix Resurreccion Hidalgo"
    ],
    "correctIndex": 0,
    "explanation": "Si Ventura de los Reyes ang lumagda sa liberal na Saligang Batas ng Cadiz noong 1812."
  },
  {
    "id": "q-mcq-66",
    "type": "mcq",
    "question": "Ano ang 'Frailocracia' ayon sa propagangdistang si Marcelo H. del Pilar?",
    "options": [
      "Ang malawak at walang takdang kontrol ng mga prayleng Espanyol sa pamahalaan, lipunan, at ekonomiya",
      "Ang pamamahala ng mga sundalong Espanyol",
      "Ang kalakalan ng mga Tsino sa Maynila",
      "Ang sistema ng pagbubuwis sa mga indio"
    ],
    "correctIndex": 0,
    "explanation": "Inilantad ni Plaridel sa 'La Soberania Monacal' ang kapangyarihan ng mga prayle."
  },
  {
    "id": "q-mcq-67",
    "type": "mcq",
    "question": "Ano ang ipinaglalaban ng Kilusang Sekularisasyon sa ilalim nina Padre Pedro Pelaez at Padre Jose Burgos?",
    "options": [
      "Ang pamamahala sa mga parokya ay dapat ibigay sa mga Paring Sekular (katutubong Pilipino) sa halip na sa mga Prayleng Regular",
      "Ang paghihiwalay ng Simbahan at Estado",
      "Ang pagpapatalsik sa Santo Papa",
      "Ang pagsasara ng lahat ng kumbento"
    ],
    "correctIndex": 0,
    "explanation": "Ipinaglaban nila ang karapatan ng mga paring sekular ayon sa Council of Trent."
  },
  {
    "id": "q-mcq-68",
    "type": "mcq",
    "question": "Kailan naganap ang Cavite Mutiny sa ilalim ng pamumuno ni Sarhento Fernando La Madrid?",
    "options": [
      "Enero 20, 1872",
      "Pebrero 17, 1872",
      "Hunyo 19, 1861",
      "Disyembre 30, 1896"
    ],
    "correctIndex": 0,
    "explanation": "Naganap ang pag-aaklas noong Enero 20, 1872 sa arsenal ng Fort San Felipe, Cavite."
  },
  {
    "id": "q-mcq-69",
    "type": "mcq",
    "question": "Sino ang malupit na Gobernador-Heneral na nag-alis sa exemption sa buwis at polo ng mga manggagawa sa Cavite na nagbunga ng Cavite Mutiny?",
    "options": [
      "Rafael de Izquierdo",
      "Carlos Maria de la Torre",
      "Narciso Claveria",
      "Valeriano Weyler"
    ],
    "correctIndex": 0,
    "explanation": "Binaligtad ni Izquierdo ang mga liberal na patakaran ni De la Torre."
  },
  {
    "id": "q-mcq-70",
    "type": "mcq",
    "question": "Kailan binitay sa pamamagitan ng garrote ang tatlong paring martir (GOMBURZA) sa Bagumbayan?",
    "options": [
      "Pebrero 17, 1872",
      "Disyembre 30, 1896",
      "Hulyo 7, 1892",
      "Hunyo 12, 1898"
    ],
    "correctIndex": 0,
    "explanation": "Binitay sina Gomez, Burgos, at Zamora noong Pebrero 17, 1872.",
    "image": {
      "url": "assets/images/gomburza.jpg",
      "title": "GOMBURZA"
    }
  },
  {
    "id": "q-mcq-71",
    "type": "mcq",
    "question": "Aling nobela ni Jose Rizal ang inialay niya sa alaala ng tatlong paring martir (GOMBURZA)?",
    "options": [
      "El Filibusterismo",
      "Noli Me Tangere",
      "Makisa",
      "A La Juventud Filipina"
    ],
    "correctIndex": 0,
    "explanation": "Inialay ni Rizal ang El Filibusterismo (1891) sa GOMBURZA.",
    "image": {
      "url": "assets/images/fili.jpg",
      "title": "El Filibusterismo"
    }
  },
  {
    "id": "q-mcq-72",
    "type": "mcq",
    "question": "Ano ang tawag sa mga katutubong Pilipino na tumakas patungong kabundukan upang maiwasan ang polo at buwis ng mga Espanyol?",
    "options": [
      "Remontados (o Cimarrones)",
      "Insulares",
      "Peninsulares",
      "Principalia"
    ],
    "correctIndex": 0,
    "explanation": "Tinawag silang mga remontados o cimarrones dahil sa pag-akyat sa bundok."
  },
  {
    "id": "q-mcq-73",
    "type": "mcq",
    "question": "Ano ang bansag kay Jose Rizal sa Calamba matapos siyang magbalik mula sa Europa bilang dalubhasa sa mata?",
    "options": [
      "Doctor Uliman (doktor mula Alemanya)",
      "Doctor Dimasalang",
      "Doctor Laong Laan",
      "Doctor Soliman"
    ],
    "correctIndex": 0,
    "explanation": "Tinawag siyang 'Doctor Uliman' dahil nag-aral siya ng ophthalmology sa Germany."
  },
  {
    "id": "q-mcq-74",
    "type": "mcq",
    "question": "Ano ang alyas na ginamit ni Jose Rizal nang sumakay siya sa barkong SS Salvador patungong Europa noong 1882?",
    "options": [
      "Jose Mercado",
      "Jose Protacio",
      "Jose Realonda",
      "Dimasalang"
    ],
    "correctIndex": 0,
    "explanation": "Ginamit niya ang Jose Mercado upang makaiwas sa pagsisiyasat ng mga awtoridad."
  },
  {
    "id": "q-mcq-75",
    "type": "mcq",
    "question": "Ilang wika ang kayang salitain at unawain ni Rizal bilang isang kinikilalang Polyglot?",
    "options": [
      "Humigit-kumulang 22 wika",
      "5 wika",
      "10 wika",
      "50 wika"
    ],
    "correctIndex": 0,
    "explanation": "Nakaunawa at nakapagsalita si Rizal ng humigit-kumulang 22 na wika."
  },
  {
    "id": "q-mcq-76",
    "type": "mcq",
    "question": "Ano ang sinasagisag ng hubad na babae sa eskulturang 'The Triumph of Science over Death' na nililok ni Rizal?",
    "options": [
      "Agham at Katotohanan (Science)",
      "Kamatayan",
      "Kaalaman",
      "Pag-ibig"
    ],
    "correctIndex": 0,
    "explanation": "Ang babae ay sumasagisag sa Agham, ang bungo sa Kamatayan, at ang sulo sa Kaalaman."
  },
  {
    "id": "q-mcq-77",
    "type": "mcq",
    "question": "Bakit pinagdududahan ng mga modernong mananalaysay kung si Rizal nga ba ang sumulat ng 'Sa Aking Mga Kabata'?",
    "options": [
      "Walang orihinal na manuscript at ginamit ang salitang 'kalayaan' na noon lamang 1886 natutunang isalin ni Rizal",
      "Dahil nakasulat ito sa wikang Ingles",
      "Dahil sinabi ni Rizal na si Bonifacio ang sumulat nito",
      "Dahil bawal sumulat ng tula ang mga bata noon"
    ],
    "correctIndex": 0,
    "explanation": "Inamin ni Rizal sa liham kay Paciano noong 1886 na noon lamang niya naintindihan ang salin ng 'freedom' sa 'kalayahan'."
  },
  {
    "id": "q-mcq-78",
    "type": "mcq",
    "question": "Sino ang panganay sa labing-isang (11) magkakapatid na Rizal na nagpondo sa pag-imprenta ng Noli sa Tagalog?",
    "options": [
      "Saturnina (Neneng)",
      "Narcisa (Sisa)",
      "Olympia (Ypia)",
      "Maria (Biang)"
    ],
    "correctIndex": 0,
    "explanation": "Si Saturnina ang panganay na kapatid na tumayong pangalawang ina."
  },
  {
    "id": "q-mcq-79",
    "type": "mcq",
    "question": "Sino ang kapatid ni Rizal na nakatuklas sa kanyang lihim na libingan sa Paco Cemetery at naglagay ng markang 'RPJ'?",
    "options": [
      "Narcisa (Sisa)",
      "Saturnina",
      "Josefa",
      "Trinidad"
    ],
    "correctIndex": 0,
    "explanation": "Lihim na minarkahan ni Narcisa ang libingan upang hindi mawala ang kanyang labi."
  },
  {
    "id": "q-mcq-80",
    "type": "mcq",
    "question": "Sino ang kapatid ni Rizal na may sakit na epilepsy at naging kasapi at tagapagtago ng mga dokumento ng Katipunan?",
    "options": [
      "Josefa (Panggoy)",
      "Trinidad",
      "Concepcion",
      "Soledad"
    ],
    "correctIndex": 0,
    "explanation": "Si Josefa ay naging pangulo ng sangay pangkababaihan ng Katipunan."
  },
  {
    "id": "q-mcq-81",
    "type": "mcq",
    "question": "Sino ang pinakabatang kapatid (bunso) sa 11 magkakapatid na Rizal?",
    "options": [
      "Soledad (Choleng)",
      "Trinidad",
      "Josefa",
      "Concepcion"
    ],
    "correctIndex": 0,
    "explanation": "Si Soledad ang bunsong anak sa pamilyang Mercado-Rizal."
  },
  {
    "id": "q-mcq-82",
    "type": "mcq",
    "question": "Sino ang kapatid ni Rizal na pumanaw sa edad na tatlo (3) na naging dahilan ng kanyang unang matinding pagluha at kalungkutan?",
    "options": [
      "Concepcion (Concha)",
      "Olympia",
      "Lucia",
      "Maria"
    ],
    "correctIndex": 0,
    "explanation": "Labis na ipinagluksa ni Rizal ang pagkamatay ng kapatid na si Concepcion noong 1865."
  },
  {
    "id": "q-tf-1",
    "type": "tf",
    "question": "Ang kasabihang 'Walang mapang-api kung walang nagpapaapi' ay nangangahulugang may pananagutan din ang mamamayan sa kabaluktutan ng sistema.",
    "answer": true,
    "explanation": "Tama. Ipinunto ni Rizal na ang pananahimik ng tao ang nagbibigay-lakas sa mga tirano.",
    "image": {
      "url": "assets/images/rizal.jpg",
      "title": "Dr. Jose Rizal"
    }
  },
  {
    "id": "q-tf-2",
    "type": "tf",
    "question": "Si Claro M. Recto ang sumulat at nagpanukala ng Batas Rizal sa kabila ng pagbabanta sa kanyang karerang pampulitika.",
    "answer": true,
    "explanation": "Tama. Hindi natinag si Recto kahit pinagbantaan siyang iboboykot ng Simbahang Katolika sa eleksyon.",
    "image": {
      "url": "assets/images/recto.jpg",
      "title": "Claro M. Recto"
    }
  },
  {
    "id": "q-tf-3",
    "type": "tf",
    "question": "Ang Batas Rizal ay Republic Act No. 1425 na nilagdaan noong Hunyo 12, 1956.",
    "answer": true,
    "explanation": "Tama. Nilagdaan ito sa Malakanyang ni Pangulong Ramon Magsaysay.",
    "image": {
      "url": "assets/images/magsaysay.jpg",
      "title": "Ramon Magsaysay"
    }
  },
  {
    "id": "q-tf-4",
    "type": "tf",
    "question": "Sa ilalim ng Section 2 ng Batas Rizal, ipinagbabawal sa mga aklatan ang pagtatago ng orihinal o unexpurgated na kopya ng Noli at Fili.",
    "answer": false,
    "explanation": "Mali. Ang Section 2 ay nag-uutos na DAPAT magkaroon ng sapat na kopya ng unexpurgated na mga nobela sa lahat ng aklatan."
  },
  {
    "id": "q-tf-5",
    "type": "tf",
    "question": "Tinutulan ng mga obispong Katoliko ang Batas Rizal dahil labag umano ito sa Canon Law ng Simbahan.",
    "answer": true,
    "explanation": "Tama. Bawal sa Canon Law ang pagbasa ng mga librong lumalapastangan sa pananampalataya at kaparian."
  },
  {
    "id": "q-tf-6",
    "type": "tf",
    "question": "Ang Section 4 ng Batas Rizal ay nagbabawal sa sinumang mag-aaral na humingi ng exemption sa pagbasa ng mga nobela.",
    "answer": false,
    "explanation": "Mali. Nagbibigay ang batas ng religious exemption clause para sa mga estudyanteng labag sa pananampalataya ang pagbasa ng nobela."
  },
  {
    "id": "q-tf-7",
    "type": "tf",
    "question": "Si Jose Rizal ang ikapitong (ika-7) anak sa labing-isang (11) magkakapatid na Rizal.",
    "answer": true,
    "explanation": "Tama. Si Saturnina ang panganay, Paciano ang pangalawa, at si Jose ang pangpito."
  },
  {
    "id": "q-tf-8",
    "type": "tf",
    "question": "Si Paciano Rizal ay mas bata kaysa kay Jose Rizal nang sampung taon.",
    "answer": false,
    "explanation": "Mali. Mas matanda si Paciano nang 10 taon kay Jose Rizal (ipinanganak noong 1851 habang si Jose ay 1861)."
  },
  {
    "id": "q-tf-9",
    "type": "tf",
    "question": "Ang apelyidong 'Rizal' ay nagmula sa salitang Espanyol na 'ricial' na ang ibig sabihin ay berdeng bukirin o pastulan.",
    "answer": true,
    "explanation": "Tama. Iminungkahi ito upang magkaroon ng natatanging pangalan ang pamilya."
  },
  {
    "id": "q-tf-10",
    "type": "tf",
    "question": "Si Narciso Claveria ang Gobernador-Heneral na nagpatupad ng Catalogo Alfabetico de Apellidos noong 1849.",
    "answer": true,
    "explanation": "Tama. Layunin nitong gawing maayos ang paniningil ng buwis at senso ng populasyon."
  },
  {
    "id": "q-tf-11",
    "type": "tf",
    "question": "Bininyagan si Jose Rizal sa Calamba noong mismong araw ng kanyang kapanganakan, Hunyo 19, 1861.",
    "answer": false,
    "explanation": "Mali. Ipinanganak siya noong Hunyo 19 ngunit bininyagan tatlong araw matapos ito, noong Hunyo 22, 1861."
  },
  {
    "id": "q-tf-12",
    "type": "tf",
    "question": "Si Padre Rufino Collantes ang paring nagbinyag kay Rizal at humula na magiging dakilang tao ang bata dahil sa laki ng ulo nito.",
    "answer": true,
    "explanation": "Tama. Napansin ng pari ang kakaibang laki ng ulo ng sanggol at hinulaan ang kanyang kadakilaan."
  },
  {
    "id": "q-tf-13",
    "type": "tf",
    "question": "Si Padre Pedro Casañas ang tumayong nag-iisang ninong ni Jose Rizal sa binyag.",
    "answer": true,
    "explanation": "Tama. Si Padre Casañas ay malapit na kaibigan ng pamilyang Mercado."
  },
  {
    "id": "q-tf-14",
    "type": "tf",
    "question": "Ang huling salita ni Dr. Jose Rizal bago siya barilin sa Bagumbayan ay 'Viva Filipinas Libre!'.",
    "answer": false,
    "explanation": "Mali. Ang kanyang huling salita ay 'Consummatum est!' na salitang Latin para sa 'Naganap na'.",
    "image": {
      "url": "assets/images/execution.jpg",
      "title": "Bagumbayan"
    }
  },
  {
    "id": "q-tf-15",
    "type": "tf",
    "question": "Lihim na inilibing ng mga Espanyol ang bangkay ni Rizal sa Paco Cemetery sa isang hukay na walang anumang lapida o pagkakakilanlan.",
    "answer": true,
    "explanation": "Tama. Natakot ang pamahalaang Espanyol na kapag nalaman ang libingan ay gawin itong dambana ng rebolusyon."
  },
  {
    "id": "q-tf-16",
    "type": "tf",
    "question": "Si William Howard Taft ang Unang Gobernador Sibil ng Pilipinas na nagtaguyod kay Rizal bilang pambansang bayani.",
    "answer": true,
    "explanation": "Tama. Pinili ng Komisyong Taft si Rizal dahil sa kanyang mahinahong damdamin at pagtataguyod sa reporma.",
    "image": {
      "url": "assets/images/taft.jpg",
      "title": "William Howard Taft"
    }
  },
  {
    "id": "q-tf-17",
    "type": "tf",
    "question": "Si Henry Otley Beyer ang naglatag ng apat na pamantayan sa pagpili ng pambansang bayani.",
    "answer": true,
    "explanation": "Tama. Ang pamantayan ay: Pilipino, namayapa na, may matayog na pagmamahal sa bayan, at may mahinahong damdamin."
  },
  {
    "id": "q-tf-18",
    "type": "tf",
    "question": "Mariing kinasuklaman at tinuligsa ni Renato Constantino ang buong pagkatao at mga nagawa ni Dr. Jose Rizal.",
    "answer": false,
    "explanation": "Mali. Hindi kinasusuklaman ni Constantino si Rizal; ang kanyang tinuligsa ay ang bulag at walang pagsusuring pagsamba sa kanya (uncritical hero worship)."
  },
  {
    "id": "q-tf-19",
    "type": "tf",
    "question": "Ang Act No. 137 ng Komisyong Amerikano ang nagpalit sa pangalan ng lalawigan ng Morong patungong Lalawigan ng Rizal.",
    "answer": true,
    "explanation": "Tama. Pinalitan ang Morong upang maging permanenteng parangal sa pambansang bayani."
  },
  {
    "id": "q-tf-20",
    "type": "tf",
    "question": "Ayon sa Pantayong Pananaw ni Dr. Zeus Salazar, ang konsepto ng 'Hero' sa Kanluran at 'Bayani' sa Pilipinas ay magkaparehong-magkapareho.",
    "answer": false,
    "explanation": "Mali. Ang Hero ay nakasentro sa sarili at indibidwalismo, samantalang ang Bayani ay nakaugat sa pamayanan ('Bayan' at 'Bagani')."
  },
  {
    "id": "q-tf-21",
    "type": "tf",
    "question": "Itinatag ni Andres Bonifacio ang Katipunan (KKK) noong Hulyo 7, 1892, sa araw mismo nang ihayag ang pagpapatapon kay Rizal sa Dapitan.",
    "answer": true,
    "explanation": "Tama. Ang pagpapatapon kay Rizal ang naging hudyat ng pagwawakas ng mapayapang reporma at simula ng lihim na kilusan."
  },
  {
    "id": "q-tf-22",
    "type": "tf",
    "question": "Ginamit ng Katipunan ang Triangular System upang mas mapabilis ang pagdami ng miyembro nang hayagan sa lansangan.",
    "answer": false,
    "explanation": "Mali. Ginamit ang sistema upang mapanatili ang matinding lihim at maiwasang mabunyag ang buong samahan kapag may nahuli."
  },
  {
    "id": "q-tf-23",
    "type": "tf",
    "question": "Ang pagkabunyag ng Katipunan noong Agosto 1896 ay nagmula sa alitan ng dalawang manggagawa sa Diario de Manila na sina Teodoro Patiño at Apolonio dela Cruz.",
    "answer": true,
    "explanation": "Tama. Ipinagtapat ni Patiño ang lihim sa kanyang kapatid na si Honoria na nagsumbong naman sa pari."
  },
  {
    "id": "q-tf-24",
    "type": "tf",
    "question": "Si Melchora Aquino (Tandang Sora) ay ipinatapon ng mga Espanyol sa Guam sa loob ng anim na taon dahil sa pagtulong sa Katipunan.",
    "answer": true,
    "explanation": "Tama. Hindi siya nagtaksil sa rebolusyon kahit ipiniit at ipinatapon sa Marianas/Guam."
  },
  {
    "id": "q-tf-25",
    "type": "tf",
    "question": "Si Hen. Emilio Aguinaldo ay nahuli ng mga puwersang Amerikano sa Palanan, Isabela noong Marso 1901.",
    "answer": true,
    "explanation": "Tama. Ang kanyang pagkahuli ang nagpahina sa pormal na paglaban ng Unang Republika."
  },
  {
    "id": "q-tf-26",
    "type": "tf",
    "question": "Sa ilalim ng Brigandage Act ng 1902, kinilala ng mga Amerikano ang mga gerilyang Pilipino bilang mga lehitimong sundalo ng digmaan.",
    "answer": false,
    "explanation": "Mali. Inuri sila ng batas bilang mga tulisan, magnanakaw, at bandido upang mabigyan ng parusang kamatayan."
  },
  {
    "id": "q-tf-27",
    "type": "tf",
    "question": "Binitay ng mga Amerikano si Hen. Macario Sakay sa Bilibid noong 1907 sa kabila ng alok na amnestiya at mapayapang negosasyon.",
    "answer": true,
    "explanation": "Tama. Niloko siya ng mga awtoridad sa pangakong kapatawaran."
  },
  {
    "id": "q-tf-28",
    "type": "tf",
    "question": "Ang Jones Law ng 1916 ay nagtakda ng tiyak na 10-taong transisyon ng Komonwelt bago ipagkaloob ang kalayaan.",
    "answer": false,
    "explanation": "Mali. Ang Tydings-McDuffie Act ng 1934 ang nagtakda ng 10-taong transisyon. Ang Jones Law ay nangako lamang ng kalayaan kapag may 'stable government'."
  },
  {
    "id": "q-tf-29",
    "type": "tf",
    "question": "Si Manuel L. Quezon ay namatay sa New York dahil sa sakit na tuberkulosis noong 1944 bago pa man natapos ang Ikalawang Digmaang Pandaigdig.",
    "answer": true,
    "explanation": "Tama. Namatay siya sa Saranac Lake, New York noong Agosto 1, 1944."
  },
  {
    "id": "q-tf-30",
    "type": "tf",
    "question": "Pinrotektahan ni Pangulong Jose P. Laurel ang mga mamamayang Pilipino sa pamamagitan ng pagpapanatili ng pagkain at paaralan sa ilalim ng pamumuno ng mga Hapones.",
    "answer": true,
    "explanation": "Tama. Sa kabila ng bansag na puppet president, nagsilbi siyang tagapagtanggol ng mga sibilyan."
  },
  {
    "id": "q-tf-31",
    "type": "tf",
    "question": "Ang Parity Rights sa Bell Trade Act ay nagkaloob sa mga Amerikano ng pantay na karapatan sa paggamit ng mga likas na yaman ng Pilipinas.",
    "answer": true,
    "explanation": "Tama. Ito ay naging kontrobersyal na kondisyon para sa tulong-pinansyal pagkatapos ng digmaan."
  },
  {
    "id": "q-tf-32",
    "type": "tf",
    "question": "Ang Suez Canal ay artipisyal na daang-tubig sa Ehipto na binuksan noong 1869 at nagpaikli sa biyahe patungong Pilipinas sa 30 araw na lamang.",
    "answer": true,
    "explanation": "Tama. Dito nagsimula ang mabilis na pagpasok ng mga aklat at kaisipang liberal mula sa Europa.",
    "image": {
      "url": "assets/images/suez.jpg",
      "title": "Suez Canal"
    }
  },
  {
    "id": "q-tf-33",
    "type": "tf",
    "question": "Si Andres de Urdaneta ang nakatuklas sa rutang Tornaviaje na nag-ugnay sa Maynila at Acapulco sa loob ng 250 taon.",
    "answer": true,
    "explanation": "Tama. Ang kanyang natuklasang ruta ang nagpatakbo sa tanyag na Kalakalang Galyon."
  },
  {
    "id": "q-tf-34",
    "type": "tf",
    "question": "Sa ilalim ng Polo y Servicio, ang mga kababaihan at matatandang higit 60 taong gulang ay obligadong magtrabaho nang walang bayad.",
    "answer": false,
    "explanation": "Mali. Tanging ang mga kalalakihang may edad 16 hanggang 60 taong gulang lamang ang sakop ng polo."
  },
  {
    "id": "q-tf-35",
    "type": "tf",
    "question": "Ang Merkantilismo ay kaisipang naniniwala na ang yaman ng isang bansa ay nakasalalay sa dami ng papel na pera sa sirkulasyon.",
    "answer": false,
    "explanation": "Mali. Ang yaman ay sinusukat sa dami ng reserbang ginto at pilak (bullion)."
  },
  {
    "id": "q-tf-36",
    "type": "tf",
    "question": "Ang mga Peninsulares ay mga purong Espanyol na ipinanganak sa Pilipinas.",
    "answer": false,
    "explanation": "Mali. Ang mga Peninsulares ay ipinanganak sa mismong Espanya. Ang ipinanganak sa Pilipinas ay tinawag na Insulares o Creoles."
  },
  {
    "id": "q-tf-37",
    "type": "tf",
    "question": "Ang Colegio de Santa Potenciana ang kauna-unahang kolehiyo para sa mga kababaihan sa Pilipinas na itinatag noong 1589.",
    "answer": true,
    "explanation": "Tama. Itinatag ito upang magsanay ng mga kababaihan sa gawaing-bahay at pananampalataya."
  },
  {
    "id": "q-tf-38",
    "type": "tf",
    "question": "Ang Educational Decree of 1863 ang nag-utos sa pagtatatag ng libreng primaryang paaralan sa bawat bayan para sa lalaki at babae.",
    "answer": true,
    "explanation": "Tama. Itinatag din nito ang Escuela Normal upang magsanay ng mga guro."
  },
  {
    "id": "q-tf-39",
    "type": "tf",
    "question": "Si Ventura de los Reyes ang unang kinatawang Pilipino sa Spanish Cortes sa Cadiz noong 1811.",
    "answer": true,
    "explanation": "Tama. Isang mangangalakal mula sa Vigan ang naging kinatawan sa parliyamento ng Espanya."
  },
  {
    "id": "q-tf-40",
    "type": "tf",
    "question": "Binitay ang tatlong paring martir (GOMBURZA) sa pamamagitan ng pagbaril sa likod noong Pebrero 17, 1872.",
    "answer": false,
    "explanation": "Mali. Binitay sila sa pamamagitan ng garrote (bakal na pamimilipit sa leeg), hindi sa pamamagitan ng pagbaril.",
    "image": {
      "url": "assets/images/gomburza.jpg",
      "title": "GOMBURZA"
    }
  },
  {
    "id": "q-tf-41",
    "type": "tf",
    "question": "Napatunayan ng mga eksperto at historyador na si Jose Rizal ang sumulat ng tulang 'Sa Aking Mga Kabata' noong siya ay 8 taong gulang pa lamang.",
    "answer": false,
    "explanation": "Mali. Walang natagpuang manuscript at lumabas lamang ang tula noong 1906, bukod pa sa hindi pa alam ni Rizal ang salitang 'kalayaan' noong panahong iyon."
  },
  {
    "id": "q-tf-42",
    "type": "tf",
    "question": "Si Jose Rizal ay nakapagsalita at nakaunawa ng humigit-kumulang 22 na iba't ibang wika sa buong mundo.",
    "answer": true,
    "explanation": "Tama. Siya ay kinikilalang henyo at polyglot sa buong kasaysayan ng Pilipinas."
  },
  {
    "id": "q-tf-43",
    "type": "tf",
    "question": "Si Concepcion (Concha) Rizal ang pinakamatandang kapatid sa magkakapatid na Rizal.",
    "answer": false,
    "explanation": "Mali. Si Saturnina ang panganay. Si Concepcion ay ika-8 anak na namatay sa edad na 3."
  },
  {
    "id": "q-tf-44",
    "type": "tf",
    "question": "Si Trinidad Rizal ang pinagkatiwalaan ni Jose Rizal ng lamparang de-alkohol kung saan nakatago ang kanyang huling tula (Mi Ultimo Adios).",
    "answer": true,
    "explanation": "Tama. Ibinulong ni Rizal kay Trinidad ang 'There is something inside' bago siya barilin."
  },
  {
    "id": "q-tf-45",
    "type": "tf",
    "question": "Ang pamilyang Mercado-Rizal sa Calamba ay kabilang sa maralitang uring manggagawa na walang sariling lupa o bahay.",
    "answer": false,
    "explanation": "Mali. Kabilang sila sa Principalia o mariwasang middle class na may bahay na bato, sariling karwahe, at pribadong aklatan na may 1,000+ aklat."
  },
  {
    "id": "q-id-1",
    "type": "id",
    "question": "Anong batas ang nag-uutos sa lahat ng kolehiyo at unibersidad sa Pilipinas na ituro ang buhay at mga akda ni Dr. Jose Rizal?",
    "answer": "Republic Act No. 1425",
    "acceptableAnswers": [
      "Republic Act No. 1425",
      "RA 1425",
      "Batas Rizal",
      "Batas Republika Blg. 1425",
      "RA1425"
    ],
    "hint": "RA No. 1425"
  },
  {
    "id": "q-id-2",
    "type": "id",
    "question": "Sino ang makabayang Senador na pangunahing may-akda ng Senate Bill No. 438 (Batas Rizal)?",
    "answer": "Claro M. Recto",
    "acceptableAnswers": [
      "Claro M. Recto",
      "Claro Recto",
      "Senador Recto",
      "Recto"
    ],
    "hint": "Isang bantog na nasyonalistang mambabatas mula sa Batangas.",
    "image": {
      "url": "assets/images/recto.jpg",
      "title": "Claro M. Recto"
    }
  },
  {
    "id": "q-id-3",
    "type": "id",
    "question": "Sino ang Pangulo ng Pilipinas na lumagda sa Batas Rizal upang maging ganap na batas noong Hunyo 12, 1956?",
    "answer": "Ramon Magsaysay",
    "acceptableAnswers": [
      "Ramon Magsaysay",
      "Pangulong Magsaysay",
      "Magsaysay"
    ],
    "hint": "Ang tinaguriang 'Kampeon ng Masa'.",
    "image": {
      "url": "assets/images/magsaysay.jpg",
      "title": "Ramon Magsaysay"
    }
  },
  {
    "id": "q-id-4",
    "type": "id",
    "question": "Anong Latin na termino mula sa Bibliya ang huling winika ni Dr. Jose Rizal bago siya barilin sa Bagumbayan?",
    "answer": "Consummatum est",
    "acceptableAnswers": [
      "Consummatum est",
      "Consummatum est!",
      "\"Consummatum est!\"",
      "Consumatum est"
    ],
    "hint": "Nangangahulugang 'Naganap na' o 'It is finished'.",
    "image": {
      "url": "assets/images/execution.jpg",
      "title": "Bagumbayan"
    }
  },
  {
    "id": "q-id-5",
    "type": "id",
    "question": "Anong paraan ng pagbitay gamit ang bakal na pampihit sa leeg ang ginamit ng mga Espanyol sa tatlong paring martir (GOMBURZA) noong 1872?",
    "answer": "Garrote",
    "acceptableAnswers": [
      "Garrote",
      "Garote",
      "Garrote vil"
    ],
    "hint": "Mekanikal na pamigil ng hininga sa leeg.",
    "image": {
      "url": "assets/images/gomburza.jpg",
      "title": "GOMBURZA"
    }
  },
  {
    "id": "q-id-6",
    "type": "id",
    "question": "Sino ang kapatid ni Rizal na nakatuklas sa kanyang lihim na libingan sa Paco Cemetery at naglagay ng markang 'RPJ'?",
    "answer": "Narcisa",
    "acceptableAnswers": [
      "Narcisa",
      "Narcisa Rizal",
      "Sisa"
    ],
    "hint": "Ikatlong anak sa pamilya Mercado-Rizal."
  },
  {
    "id": "q-id-7",
    "type": "id",
    "question": "Ano ang ibig sabihin ng palayaw na 'Pepe' na ibinigay kay Rizal batay sa Latin para kay San Jose?",
    "answer": "Pater Putativus",
    "acceptableAnswers": [
      "Pater Putativus",
      "P.P.",
      "PP",
      "Putative Father"
    ],
    "hint": "P.P. = Kinikilalang ama."
  },
  {
    "id": "q-id-8",
    "type": "id",
    "question": "Sino ang tinaguriang 'Ina ng Katipunan' na gumamot at nagpakain sa mga Katipunero at ipinatapon sa Guam sa loob ng 6 na taon?",
    "answer": "Melchora Aquino",
    "acceptableAnswers": [
      "Melchora Aquino",
      "Tandang Sora",
      "Melchora Aquino (Tandang Sora)"
    ],
    "hint": "Kilala rin bilang Tandang Sora."
  },
  {
    "id": "q-id-9",
    "type": "id",
    "question": "Anong tawag sa pamumuno kung saan ang mga prayleng Espanyol ang may malawak na kontrol sa pamahalaan at edukasyon?",
    "answer": "Frailocracia",
    "acceptableAnswers": [
      "Frailocracia",
      "Prailokrasya",
      "Frailocrasya"
    ],
    "hint": "Pinasikat na termino ni Marcelo H. del Pilar."
  },
  {
    "id": "q-id-10",
    "type": "id",
    "question": "Sino ang Amerikanong antropologo na tinaguriang 'Ama ng Antropolohiyang Pilipino' na naglatag ng pamantayan sa pagpili ng bayani?",
    "answer": "Henry Otley Beyer",
    "acceptableAnswers": [
      "Henry Otley Beyer",
      "Otley Beyer",
      "Dr. Henry Otley Beyer",
      "H. Otley Beyer"
    ],
    "hint": "Kasama ni William Howard Taft sa komisyon.",
    "image": {
      "url": "assets/images/taft.jpg",
      "title": "William Howard Taft"
    }
  },
  {
    "id": "q-id-11",
    "type": "id",
    "question": "Ano ang tawag sa perspektiba sa historiograpiyang Pilipino na pinasimulan ni Dr. Zeus Salazar kung saan ang kasaysayan ay isinusulat ng Pilipino para sa Pilipino sa sariling wika?",
    "answer": "Pantayong Pananaw",
    "acceptableAnswers": [
      "Pantayong Pananaw",
      "Pantayo Pananaw"
    ],
    "hint": "Pantayong ..."
  },
  {
    "id": "q-id-12",
    "type": "id",
    "question": "Anong kaisipang pang-ekonomiya ang sumusukat sa yaman ng isang bansa batay sa dami ng reserbang ginto at pilak?",
    "answer": "Merkantilismo",
    "acceptableAnswers": [
      "Merkantilismo",
      "Mercantilism"
    ],
    "hint": "Low import, high export batay sa bullion."
  },
  {
    "id": "q-id-13",
    "type": "id",
    "question": "Anong tawag sa mga katutubong Pilipinong tumakas sa kabundukan upang maiwasan ang paniningil ng buwis at sapilitang polo y servicio?",
    "answer": "Remontados",
    "acceptableAnswers": [
      "Remontados",
      "Cimarrones",
      "Tulisan"
    ],
    "hint": "Mula sa salitang Espanyol para sa pag-akyat muli sa bundok."
  },
  {
    "id": "q-id-14",
    "type": "id",
    "question": "Sino ang naging Unang Pangulo ng Pamahalaang Komonwelt ng Pilipinas na namatay sa tuberkulosis sa New York?",
    "answer": "Manuel L. Quezon",
    "acceptableAnswers": [
      "Manuel L. Quezon",
      "Manuel Quezon",
      "Quezon"
    ],
    "hint": "Ama ng Wikang Pambansa."
  },
  {
    "id": "q-id-15",
    "type": "id",
    "question": "Anong paraan ng rekrutment ang ginamit ng Katipunan kung saan ang isang miyembro ay nag-aanyaya ng dalawa pang kasapi na hindi magkakilala?",
    "answer": "Triangular System",
    "acceptableAnswers": [
      "Triangular System",
      "Sistema ng Triangulo",
      "Triangulo",
      "Triangle System"
    ],
    "hint": "Triangular ..."
  },
  {
    "id": "q-id-16",
    "type": "id",
    "question": "Ano ang bansag kay Dr. Jose Rizal sa Calamba na nagpapahiwatig na siya ay isang doktor na may kalidad na Aleman mula sa Europa?",
    "answer": "Doctor Uliman",
    "acceptableAnswers": [
      "Doctor Uliman",
      "Dr. Uliman",
      "Doktor Uliman"
    ],
    "hint": "Calamba-Aleman."
  },
  {
    "id": "q-id-17",
    "type": "id",
    "question": "Sino ang paring nagbinyag kay Jose Rizal sa Simbahan ng Calamba noong Hunyo 22, 1861?",
    "answer": "Padre Rufino Collantes",
    "acceptableAnswers": [
      "Padre Rufino Collantes",
      "Rufino Collantes",
      "Fr. Rufino Collantes"
    ],
    "hint": "Humula na magiging dakila ang bata dahil sa laki ng ulo nito."
  },
  {
    "id": "q-id-18",
    "type": "id",
    "question": "Anong batas noong 1849 ang nag-utos sa mga pamilyang Pilipino na magpatibay ng permanenteng apelyido mula sa isang opisyal na listahan?",
    "answer": "Claveria Law",
    "acceptableAnswers": [
      "Claveria Law",
      "Claveria Decree",
      "Catalogo Alfabetico de Apellidos",
      "Kautusang Claveria"
    ],
    "hint": "Ipinatupad ni Gobernador-Heneral Narciso Claveria."
  },
  {
    "id": "q-id-19",
    "type": "id",
    "question": "Aling daang-tubig ang binuksan noong 1869 sa Ehipto na nagpaikli sa biyahe mula Europa patungong Maynila sa 30 araw?",
    "answer": "Suez Canal",
    "acceptableAnswers": [
      "Suez Canal",
      "Kanal Suez",
      "Suez"
    ],
    "hint": "Nag-ugnay sa Dagat Pula at Dagat Mediteraneo.",
    "image": {
      "url": "assets/images/suez.jpg",
      "title": "Suez Canal"
    }
  },
  {
    "id": "q-id-20",
    "type": "id",
    "question": "Sino ang Supremo na nagtatag ng Katipunan noong Hulyo 7, 1892 sa Calle Azcarraga, Tondo?",
    "answer": "Andres Bonifacio",
    "acceptableAnswers": [
      "Andres Bonifacio",
      "Bonifacio",
      "Supremo Andres Bonifacio"
    ],
    "hint": "Ang Ama ng Rebolusyong Pilipino."
  },
  {
    "id": "q-id-21",
    "type": "id",
    "question": "Sino ang nag-iisang kapatid na lalaki ni Jose Rizal na naging heneral sa Rebolusyon at nag-abot ng pondo sa kanyang pag-aaral sa Europa?",
    "answer": "Paciano",
    "acceptableAnswers": [
      "Paciano",
      "Paciano Rizal",
      "General Paciano Rizal"
    ],
    "hint": "Pangalawang anak sa pamilya."
  },
  {
    "id": "q-id-22",
    "type": "id",
    "question": "Sino ang bunsong kapatid sa labing-isang magkakapatid na Rizal?",
    "answer": "Soledad",
    "acceptableAnswers": [
      "Soledad",
      "Soledad Rizal",
      "Choleng"
    ],
    "hint": "Ika-11 na anak."
  },
  {
    "id": "q-id-23",
    "type": "id",
    "question": "Sino ang panganay sa magkakapatid na Rizal na nagpondo sa unang salin ng Noli Me Tangere sa Tagalog?",
    "answer": "Saturnina",
    "acceptableAnswers": [
      "Saturnina",
      "Saturnina Rizal",
      "Neneng"
    ],
    "hint": "Panganay na kapatid (Neneng)."
  },
  {
    "id": "q-id-24",
    "type": "id",
    "question": "Sino ang kapatid ni Rizal na tumanggap ng lamparang de-alkohol na may lihim na tula bago siya barilin sa Bagumbayan?",
    "answer": "Trinidad",
    "acceptableAnswers": [
      "Trinidad",
      "Trinidad Rizal",
      "Trining"
    ],
    "hint": "Ika-10 na anak."
  },
  {
    "id": "q-id-25",
    "type": "id",
    "question": "Sino ang kaibigang doktor ni Rizal na nagpahiram ng pondo upang maipalimbag ang Noli Me Tangere sa Berlin noong 1887?",
    "answer": "Dr. Maximo Viola",
    "acceptableAnswers": [
      "Dr. Maximo Viola",
      "Maximo Viola",
      "Viola"
    ],
    "hint": "Ang tagapagligtas ng Noli Me Tangere.",
    "image": {
      "url": "assets/images/noli.jpg",
      "title": "Noli Me Tangere"
    }
  },
  {
    "id": "q-id-26",
    "type": "id",
    "question": "Sino ang mayamang Pilipino sa Paris na nagpondo sa pagpapalimbag ng El Filibusterismo sa Ghent, Belgium noong 1891?",
    "answer": "Valentin Ventura",
    "acceptableAnswers": [
      "Valentin Ventura",
      "Ventura"
    ],
    "hint": "Ang tagapagligtas ng El Filibusterismo.",
    "image": {
      "url": "assets/images/fili.jpg",
      "title": "El Filibusterismo"
    }
  },
  {
    "id": "q-id-27",
    "type": "id",
    "question": "Ano ang pamagat ng huling tula na isinulat ni Rizal sa Fort Santiago na binigyan ng pamagat ni Mariano Ponce?",
    "answer": "Mi Ultimo Adios",
    "acceptableAnswers": [
      "Mi Ultimo Adios",
      "Mi Último Adiós",
      "Huling Paalam"
    ],
    "hint": "Nakatago sa loob ng lamparang de-alkohol."
  },
  {
    "id": "q-id-28",
    "type": "id",
    "question": "Anong lalawigan ang dating Morong na pinalitan ang pangalan sa ilalim ng Act No. 137 bilang parangal kay Rizal?",
    "answer": "Rizal",
    "acceptableAnswers": [
      "Rizal",
      "Lalawigan ng Rizal",
      "Rizal Province"
    ],
    "hint": "Lalawigan sa silangan ng Maynila."
  },
  {
    "id": "q-id-29",
    "type": "id",
    "question": "Sino ang ina ni Rizal na naging kanyang unang guro at nagturo sa kanya ng Kwento ng Gamo-Gamo?",
    "answer": "Teodora Alonso",
    "acceptableAnswers": [
      "Teodora Alonso",
      "Teodora Alonso Realonda",
      "Doña Teodora",
      "Doña Teodora Alonso"
    ],
    "hint": "Nagtapos sa Colegio de Santa Rosa."
  },
  {
    "id": "q-id-30",
    "type": "id",
    "question": "Sino ang ama ni Rizal na tinawag niyang 'Model of Fathers' at nag-aral ng Pilosopiya sa Colegio de San Jose?",
    "answer": "Francisco Mercado",
    "acceptableAnswers": [
      "Francisco Mercado",
      "Don Francisco",
      "Francisco Mercado Rizal",
      "Don Francisco Mercado"
    ],
    "hint": "Matiyagang magsasaka at pinuno sa Calamba."
  },
  {
    "id": "q-match-1",
    "type": "matching",
    "title": "Batas Rizal (RA 1425) at Mambabatas",
    "pairs": [
      {
        "term": "Claro M. Recto",
        "definition": "Pangunahing may-akda ng Senate Bill No. 438"
      },
      {
        "term": "Jose P. Laurel",
        "definition": "Chairman ng Committee on Education at sponsor sa Senado"
      },
      {
        "term": "Ramon Magsaysay",
        "definition": "Pangulong lumagda sa Batas Rizal noong Hunyo 12, 1956"
      },
      {
        "term": "Section 1",
        "definition": "Mandatong isama sa kurikulum ng kolehiyo ang buhay at mga akda ni Rizal"
      },
      {
        "term": "Section 2",
        "definition": "Mandatong magkaroon ng sapat na unexpurgated na kopya sa mga aklatan"
      }
    ]
  },
  {
    "id": "q-match-2",
    "type": "matching",
    "title": "Pagpili ng Bayani at Panahon ng Amerikano",
    "pairs": [
      {
        "term": "William H. Taft",
        "definition": "Unang Gobernador Sibil na nagtaguyod kay Rizal bilang bayani"
      },
      {
        "term": "Henry Otley Beyer",
        "definition": "Ama ng Antropolohiya na naglatag ng 4 na pamantayan ng bayani"
      },
      {
        "term": "Renato Constantino",
        "definition": "Sumulat ng 'Veneration Without Understanding'"
      },
      {
        "term": "Act No. 137",
        "definition": "Batas na nagpalit sa pangalan ng Morong tungo sa Lalawigan ng Rizal"
      },
      {
        "term": "Act No. 243",
        "definition": "Batas na nagpondo sa pagpapatayo ng bantayog ni Rizal sa Luneta"
      }
    ]
  },
  {
    "id": "q-match-3",
    "type": "matching",
    "title": "Kasaysayan ng Ika-19 na Siglo",
    "pairs": [
      {
        "term": "Andres de Urdaneta",
        "definition": "Nakatuklas sa Tornaviaje (rutang pabalik mula Maynila patungong Mexico)"
      },
      {
        "term": "Suez Canal",
        "definition": "Daang-tubig na nagpaikli ng biyahe patungong Europa sa 30 araw"
      },
      {
        "term": "Polo y Servicio",
        "definition": "Sapilitang paggawa sa loob ng 40 araw para sa kalalakihang 16-60 anyos"
      },
      {
        "term": "Merkantilismo",
        "definition": "Sistemang sumusukat sa yaman ng bansa sa dami ng ginto at pilak"
      },
      {
        "term": "Ventura de los Reyes",
        "definition": "Unang kinatawang Pilipino sa Cadiz Cortes sa Espanya (1811)"
      }
    ]
  },
  {
    "id": "q-match-4",
    "type": "matching",
    "title": "Lipunang Kolonyal at Edukasyon",
    "pairs": [
      {
        "term": "Peninsulares",
        "definition": "Mga purong Espanyol na ipinanganak sa mismong Espanya"
      },
      {
        "term": "Insulares",
        "definition": "Mga purong Espanyol na ipinanganak sa Pilipinas (Creoles)"
      },
      {
        "term": "Indio",
        "definition": "Derogatoryong tawag sa mga katutubong Pilipino sa mababang uri"
      },
      {
        "term": "Santa Potenciana",
        "definition": "Kauna-unahang kolehiyo para sa mga kababaihan sa Pilipinas (1589)"
      },
      {
        "term": "Educational Decree 1863",
        "definition": "Nagtatag ng libreng primaryang pampublikong paaralan sa bawat bayan"
      }
    ]
  },
  {
    "id": "q-match-5",
    "type": "matching",
    "title": "Kilusang Propaganda at Rebolusyon",
    "pairs": [
      {
        "term": "GOMBURZA",
        "definition": "Tatlong paring sekular na binitay sa garrote noong Pebrero 17, 1872"
      },
      {
        "term": "Andres Bonifacio",
        "definition": "Supremo na nagtatag ng Katipunan noong Hulyo 7, 1892"
      },
      {
        "term": "Melchora Aquino",
        "definition": "Ina ng Katipunan na gumamot sa mga Katipunero at ipinatapon sa Guam"
      },
      {
        "term": "Teodoro Patiño",
        "definition": "Manggagawa sa Diario de Manila na nagbunyag sa lihim ng Katipunan"
      },
      {
        "term": "Macario Sakay",
        "definition": "Nagtatag ng Republika ng Katagalugan at binitay sa ilalim ng Brigandage Act"
      }
    ]
  },
  {
    "id": "q-match-6",
    "type": "matching",
    "title": "Mga Magkakapatid na Rizal (Bahagi 1)",
    "pairs": [
      {
        "term": "Saturnina (Neneng)",
        "definition": "Panganay na kapatid na tumulong magpondo sa salin ng Noli sa Tagalog"
      },
      {
        "term": "Paciano",
        "definition": "Nag-iisang kapatid na lalaki, pangalawang ama, at heneral ng rebolusyon"
      },
      {
        "term": "Narcisa (Sisa)",
        "definition": "Nakatuklas sa lihim na libingan ni Rizal sa Paco na may markang RPJ"
      },
      {
        "term": "Olympia (Ypia)",
        "definition": "Ika-4 na anak na asawa ng telegraph operator at namatay sa panganganak"
      },
      {
        "term": "Lucia",
        "definition": "Ika-5 anak na asawa ni Herbosa at ina ng naghabi ng unang watawat"
      }
    ]
  },
  {
    "id": "q-match-7",
    "type": "matching",
    "title": "Mga Magkakapatid na Rizal (Bahagi 2)",
    "pairs": [
      {
        "term": "Maria (Biang)",
        "definition": "Ika-6 na anak at pinakamalapit na kalaro ni Rizal dahil sa 2-taong agwat"
      },
      {
        "term": "Concepcion (Concha)",
        "definition": "Ika-8 anak na pumanaw sa edad na tatlo at nagdulot ng unang pagluha ni Rizal"
      },
      {
        "term": "Josefa (Panggoy)",
        "definition": "Ika-9 na anak na may epilepsy at naging kasapi ng Katipunan"
      },
      {
        "term": "Trinidad (Trining)",
        "definition": "Ika-10 anak na pinagkalooban ng lamparang naglalaman ng Mi Ultimo Adios"
      },
      {
        "term": "Soledad (Choleng)",
        "definition": "Ang pinakabatang anak o bunso sa 11 magkakapatid na Rizal"
      }
    ]
  },
  {
    "id": "q-match-8",
    "type": "matching",
    "title": "Mga Akda at Paglilimbag ni Rizal",
    "pairs": [
      {
        "term": "Noli Me Tangere",
        "definition": "Nobelang inilimbag sa Berlin noong 1887 sa tulong ni Dr. Maximo Viola"
      },
      {
        "term": "El Filibusterismo",
        "definition": "Nobelang inilimbag sa Ghent noong 1891 sa tulong ni Valentin Ventura"
      },
      {
        "term": "Mi Ultimo Adios",
        "definition": "Huling tulang isinulat sa Fort Santiago at itinago sa lampara"
      },
      {
        "term": "The Triumph of Science",
        "definition": "Eskultura na may bungo, hubad na babae, at sulo"
      },
      {
        "term": "Relief Map of Mindanao",
        "definition": "Higanteng mapa na ginawa ni Rizal sa plaza ng Dapitan"
      }
    ]
  },
  {
    "id": "q-match-9",
    "type": "matching",
    "title": "Mga Saligang Batas at Kasunduan",
    "pairs": [
      {
        "term": "Cadiz Constitution (1812)",
        "definition": "Saligang batas sa Espanya na nagkaloob ng pagkakapantay-pantay ng mamamayan"
      },
      {
        "term": "Jones Law (1916)",
        "definition": "Nangako ng kalayaan kapag nakapagtatag na ng matatag na pamahalaan"
      },
      {
        "term": "Tydings-McDuffie (1934)",
        "definition": "Batas na nagtatag ng 10-taong Pamahalaang Komonwelt"
      },
      {
        "term": "Bell Trade Act (1946)",
        "definition": "Nagtadhana ng Parity Rights para sa mga mamamayang Amerikano"
      },
      {
        "term": "Brigandage Act (1902)",
        "definition": "Batas ng US na nag-uri sa mga gerilyang Pilipino bilang mga bandido"
      }
    ]
  },
  {
    "id": "q-match-10",
    "type": "matching",
    "title": "Pilosopiya at Konsepto ng Pagkabayani",
    "pairs": [
      {
        "term": "Pantayong Pananaw",
        "definition": "Pagsulat ng kasaysayan ng Pilipino para sa Pilipino sa sariling wika"
      },
      {
        "term": "Bayan at Bagani",
        "definition": "Dalawang katutubong salita na pinagmulan ng salitang Bayani"
      },
      {
        "term": "Social Contract",
        "definition": "Kaisipan ni Rousseau ukol sa pagsuko ng kalayaan kapalit ng kaayusan"
      },
      {
        "term": "Frailocracia",
        "definition": "Terminong sumasagisag sa paghahari ng mga prayle sa lipunan"
      },
      {
        "term": "Anatomy of Tolerance",
        "definition": "Apat na salik: Ignorance, Corruption, Apathy, at Cowardice"
      }
    ]
  }
]
};

if (typeof window !== 'undefined') {
  window.RLW_SUBJECT = RLW_SUBJECT;
}
