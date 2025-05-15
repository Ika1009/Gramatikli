# Gramatikli

Gramatikli je AI-pogonjeni alat za proveru i poboljšanje pisanog izraza na srpskom jeziku, razvijen kako bi digitalizovao proces pisanja i podigao profesionalni nivo poslovne i akademske korespondencije. Pruža sveobuhvatnu podršku korisnicima kroz dva osnovna modula:

## 🌟 Ključne funkcionalnosti

* **Real-time korekcija** ✍️: Automatsko prepoznavanje i ispravljanje gramatičkih, pravopisnih i stilskih grešaka tokom kucanja.
* **Stilske sugestije** 📝: Inteligentni predlozi za jasno i efektno formulisanje rečenica.
* **Generisanje sadržaja** 🤖: Kreiranje tekstova na zadatu temu koristeći napredne NLP modele.
* **Eksterni AI modul** 🔗: Integracija sa ChatGPT-jem ili drugim AI izvorima za pronalaženje preciznih informacija i automatsko preformulisanje.

## ⚙️ Kako funkcioniše

1. **Prikupljanje teksta**: Korisnik unosi ili lepi tekst u ekstenziju ili web interfejs.
2. **Prva analizira**: Naš NLP model detektuje greške i kategoriše ih (gramatika, pravopis, stil).
3. **Predlozi ispravki**:

   * Inline ispravke se prikazuju kao podvučeni tekst sa padajućim listama opcija.
   * Stilistički predlozi radne grupe donose konsolidovane reviže.
4. **Eksterni AI upit**: Po potrebi, korisnik može uključiti modul za dohvat podataka iz eksternih AI servisa, čime dobija kontekstualne informacije i moguće parafraziranje.
5. **Generisanje teksta**: Na osnovu ključnih reči i analize postojećeg sadržaja, sistem kreira draft koji korisnik može dodatno prilagoditi.

## 🛠️ Tehnologije

* **Backend**: Python (TensorFlow/PyTorch ili OpenAI API), mikroservisi za skalabilnost
* **Frontend**: TypeScript, React za web, browser ekstenzija (Chrome, Firefox)
* **Desktop/Mobilno**: .NET MAUI za Windows, macOS, Android i iOS
* **Infra**: REST API, Docker, Kubernetes, baza podataka PostgreSQL

## 📐 Arhitektura rešenja

* **UI sloj**: Ekstenzija + web panel za interaktivno pisanje
* **Servisni sloj**: Autentifikacija, kvote, beleženje povratnih informacija
* **AI sloj**: Modeli za detekciju i generisanje teksta; konekcija prema eksternim AI API-jima
* **Analitika**: Praćenje upotrebe, ključnih grešaka i korisničkih zahteva

---

🔗 Kada ekstenzija i web servis budu dostupni, posetite naš sajt i instalirajte Gramatikli ekstenziju za najbolji korisnički doživljaj!
