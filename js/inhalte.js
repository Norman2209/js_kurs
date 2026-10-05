/* =========================================================
   Hilfsfunktionen
   ========================================================= */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const KEYWORDS = /^(const|let|var|function|return|if|else|for|of|in|while|async|await|new|throw|try|catch|true|false|null|undefined|class|extends|this|export|default|import|from|static)$/;
function hl(src) {
  const re = /(\/\/[^\n]*|#[^\n]*$)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(@[A-Za-z]\w*)|\b([A-Za-z_]\w*)\b|\b(\d+(?:\.\d+)?)\b/gm;
  let out = "", last = 0, m;
  while ((m = re.exec(src))) {
    out += esc(src.slice(last, m.index));
    if (m[1]) out += `<span class="c">${esc(m[1])}</span>`;
    else if (m[2]) out += `<span class="s">${esc(m[2])}</span>`;
    else if (m[3]) out += `<span class="a">${esc(m[3])}</span>`;
    else if (m[4]) out += KEYWORDS.test(m[4]) ? `<span class="k">${m[4]}</span>` : esc(m[4]);
    else if (m[5]) out += `<span class="n">${m[5]}</span>`;
    last = re.lastIndex;
  }
  return out + esc(src.slice(last));
}
const pre = (src) => `<pre class="code"><code>${hl(src.replace(/^\n/, "").replace(/\s+$/, ""))}</code></pre>`;

/* =========================================================
   Lerninhalte
   Tests sind Funktionen, die im Web Worker neben deinem Code laufen.
   Sie bekommen Helfer: eq, assert.
   Story-Rahmen: NordPaket GmbH, dieselbe Firma wie im Tokenlauf-Kurs.
   ========================================================= */
const MODULES = [
{
  id: "m1", title: "Werte & Variablen", sub: "Die Bausteine jeder Zeile Code",
  lessons: [
  {
    id: "variablen", type: "code", title: "Variablen & Datentypen", file: "variablen.js",
    theory: `
      <p class="story"><b>NordPaket GmbH —</b> Bevor du im Tokenlauf-Kurs Prozesse automatisierst, brauchst du die Sprache, in der dort alles geschrieben wird: JavaScript. Fang klein an, bei den Werten, die durch jedes Programm fließen.</p>
      <p>Mit <code>const</code> legst du eine Variable an, deren Wert gleich bleibt. Mit <code>let</code> eine, die sich später ändern darf.</p>
      ${pre(`
// const: der Wert bleibt gleich
const paketnummer = "NP-1001";   // string (Text)
const gewichtKg = 2.4;            // number (Zahl)
const istExpress = true;          // boolean (wahr/falsch)

// let: der Wert darf sich später ändern
let versuche = 0;
versuche = versuche + 1;

console.log(paketnummer, gewichtKg, versuche);
`)}
      <p>Nimm standardmäßig <code>const</code>. Nur wenn sich ein Wert später wirklich ändert, nimm <code>let</code>. <code>var</code> ist veraltet und kommt in modernem Code nicht mehr vor.</p>
      <h3>Die Datentypen, die dir ständig begegnen</h3>
      <div class="table-wrap"><table class="t">
        <thead><tr><th>Typ</th><th>Beispiel</th><th>Typisch für</th></tr></thead>
        <tbody>
          <tr><td>string</td><td><code>"NP-1001"</code></td><td>Paketnummer, Stadt</td></tr>
          <tr><td>number</td><td><code>2.4</code></td><td>Gewicht, Preis, Menge</td></tr>
          <tr><td>boolean</td><td><code>true</code></td><td>Express? Zugestellt?</td></tr>
          <tr><td>null</td><td><code>null</code></td><td>bewusst leer, z. B. noch kein Fahrer</td></tr>
          <tr><td>object</td><td><code>{ id: "NP-1" }</code></td><td>Paket, Adresse</td></tr>
          <tr><td>array</td><td><code>[1, 2, 3]</code></td><td>Liste von Paketen</td></tr>
        </tbody>
      </table></div>
      <p class="note">Dezimalzahlen schreibst du mit Punkt: <code>2.4</code>, nicht <code>2,4</code>.</p>`,
    task: `
      <p>Lege drei Konstanten an:</p>
      <ul>
        <li><code>paketnummer</code> mit dem Text <code>"NP-1001"</code></li>
        <li><code>gewichtKg</code> mit der Zahl <code>2.4</code></li>
        <li><code>istExpress</code> mit dem Wert <code>true</code></li>
      </ul>
      <p>Gib alle drei mit <code>console.log</code> aus und schau dir die Konsole an.</p>`,
    starter: `// Lege hier deine drei Konstanten an
const paketnummer = "";

console.log(paketnummer);
`,
    hint: `Texte stehen in Anführungszeichen, Zahlen und <code>true</code>/<code>false</code> nicht. Also <code>const gewichtKg = 2.4;</code>, nicht <code>"2.4"</code>.`,
    solution: `const paketnummer = "NP-1001";
const gewichtKg = 2.4;
const istExpress = true;

console.log(paketnummer, gewichtKg, istExpress);
`,
    tests: [
      ['paketnummer ist der Text "NP-1001"', ({ eq, assert }) => {
        assert(typeof paketnummer === "string", "paketnummer sollte ein Text (string) sein, ist aber " + typeof paketnummer);
        eq(paketnummer, "NP-1001", "paketnummer");
      }],
      ["gewichtKg ist die Zahl 2.4", ({ eq, assert }) => {
        assert(typeof gewichtKg !== "undefined", "gewichtKg ist noch nicht angelegt");
        assert(typeof gewichtKg === "number", "gewichtKg sollte eine Zahl (number) sein, ist aber " + typeof gewichtKg);
        eq(gewichtKg, 2.4, "gewichtKg");
      }],
      ["istExpress ist true", ({ eq, assert }) => {
        assert(typeof istExpress !== "undefined", "istExpress ist noch nicht angelegt");
        assert(typeof istExpress === "boolean", "istExpress sollte ein boolean sein, ist aber " + typeof istExpress);
        eq(istExpress, true, "istExpress");
      }],
    ],
  },
  {
    id: "operatoren", type: "fill", title: "Operatoren ergänzen", file: "operatoren.js",
    theory: `
      <p>Mit Operatoren rechnest und vergleichst du Werte.</p>
      <div class="table-wrap"><table class="t">
        <thead><tr><th>Operator</th><th>Bedeutung</th></tr></thead>
        <tbody>
          <tr><td><code>+ - * /</code></td><td>Rechnen (bei Texten: <code>+</code> verkettet)</td></tr>
          <tr><td><code>&gt; &gt;= &lt; &lt;=</code></td><td>Größer/kleiner vergleichen</td></tr>
          <tr><td><code>===</code> / <code>!==</code></td><td>Gleich / ungleich, ohne Typ umzuwandeln</td></tr>
          <tr><td><code>&amp;&amp;</code> / <code>||</code> / <code>!</code></td><td>Und / Oder / Nicht</td></tr>
        </tbody>
      </table></div>
      ${pre(`
const gewichtKg = 2.4;
const istSchwer = gewichtKg > 5;        // false
const nichtSchwer = !istSchwer;          // true
`)}
      <p class="note">Nimm fast immer <code>===</code> statt <code>==</code>. <code>==</code> wandelt Typen vorher um und liefert dadurch überraschende Ergebnisse, z. B. <code>"5" == 5</code> → <code>true</code>.</p>`,
    task: `<p>Ergänze die vier fehlenden Operatoren, damit der Code zu den Kommentaren passt.</p>`,
    code: `
const gewichtKg = 2.4;
const preisProKg = 3.5;
const istBereit = true;

const kosten = gewichtKg [[b1]] preisProKg;    // multiplizieren
const istSchwer = gewichtKg [[b2]] 5;           // größer als 5?
const nichtBereit = [[b3]]istBereit;            // umkehren (Verneinung)
const abholbereit = istBereit [[b4]] !istSchwer; // beides muss stimmen

console.log(kosten, istSchwer, nichtBereit, abholbereit);
`,
    blanks: { b1: ["*"], b2: [">"], b3: ["!"], b4: ["&&"] },
    hint: `Lücke 3 und 4 arbeiten mit Wahrheitswerten: "umkehren" ist ein einzelnes Zeichen, "beides muss stimmen" sind zwei gleiche Zeichen.`,
  },
  {
    id: "typen-quiz", type: "quiz", title: "Kurz-Check: Typen & Vergleiche",
    theory: `<p>Vier Fragen zu Werten, Typen und Vergleichen. Du kannst so oft antworten, bis es passt.</p>`,
    questions: [
      { q: `Was ergibt <code>"5" === 5</code>?`, options: ["<code>true</code>", "<code>false</code>", "Einen Fehler"], correct: 1,
        explain: `<code>===</code> vergleicht Wert <em>und</em> Typ. Ein Text ist keine Zahl, also <code>false</code>. Mit <code>==</code> wäre es <code>true</code> – deshalb nimmst du fast immer <code>===</code>.` },
      { q: `Was liefert <code>typeof [1, 2, 3]</code>?`, options: [`<code>"array"</code>`, `<code>"object"</code>`, `<code>"list"</code>`], correct: 1,
        explain: `Arrays sind für <code>typeof</code> auch nur Objekte. Ob etwas wirklich ein Array ist, prüfst du mit <code>Array.isArray(wert)</code>.` },
      { q: `Eine Variable zählt Versuche hoch. Wie legst du sie an?`, options: ["<code>const versuche = 0;</code>", "<code>let versuche = 0;</code>", "<code>versuche := 0;</code>"], correct: 1,
        explain: `Der Wert ändert sich später, also <code>let</code>. Eine <code>const</code> neu zuzuweisen führt zu einem <code>TypeError</code>.` },
      { q: `<code>gewichtKg</code> ist <code>0</code>. Was liefert <code>gewichtKg || "unbekannt"</code>?`, options: [`<code>0</code>`, `"unbekannt"`, "Einen Fehler"], correct: 1,
        explain: `<code>0</code> ist ein "falsy"-Wert, deshalb springt <code>||</code> auf die rechte Seite – auch wenn <code>0</code> eigentlich ein gültiges Gewicht wäre. Für Zahlen, die auch <code>0</code> sein dürfen, ist <code>??</code> die bessere Wahl.` },
    ],
  },
  {
    id: "typen-sortieren", type: "sort", title: "Werte den Typen zuordnen",
    theory: `
      <p><code>typeof</code> liefert den Datentyp eines Werts als Text. Zwei Sonderfälle lohnen sich zu kennen: <code>typeof null</code> liefert <code>"object"</code> – ein alter, nie behobener Bug in JavaScript. Und Arrays sind für <code>typeof</code> ebenfalls <code>"object"</code>.</p>
      ${pre(`
typeof "NP-1001"       // "string"
typeof 42               // "number"
typeof null             // "object" – Überraschung!
typeof [1, 2, 3]        // "object" – auch hier
`)}`,
    task: `<p>Ordne jedem Wert zu, was <code>typeof wert</code> tatsächlich liefert.</p>`,
    categories: [
      { id: "string", label: "string" },
      { id: "number", label: "number" },
      { id: "boolean", label: "boolean" },
      { id: "undefined", label: "undefined" },
      { id: "object", label: "object" },
    ],
    items: [
      { text: `<code>"NP-1001"</code>`, cat: "string", why: `Text in Anführungszeichen ist immer ein string, auch wenn er wie eine Nummer aussieht.` },
      { text: `<code>42.5</code>`, cat: "number", why: `Eine Zahl ohne Anführungszeichen.` },
      { text: `<code>true</code>`, cat: "boolean", why: `Einer der beiden Wahrheitswerte.` },
      { text: `eine Variable ohne Zuweisung, z. B. <code>let x;</code>`, cat: "undefined", why: `Ohne Zuweisung ist der Wert automatisch <code>undefined</code>.` },
      { text: `<code>null</code>`, cat: "object", why: `Historischer Bug in JavaScript: <code>typeof null</code> ist <code>"object"</code>, nicht <code>"null"</code>.` },
      { text: `<code>{ id: "NP-1001" }</code>`, cat: "object", why: `Ein Objektliteral.` },
      { text: `<code>[1, 2, 3]</code>`, cat: "object", why: `Arrays sind für <code>typeof</code> auch nur Objekte.` },
      { text: `<code>"true"</code>`, cat: "string", why: `In Anführungszeichen ist es Text, kein boolean.` },
    ],
  },
  ],
},
{
  id: "m2", title: "Entscheidungen & Schleifen", sub: "Code, der reagiert und wiederholt",
  lessons: [
  {
    id: "bedingungen", type: "code", title: "Verzweigen mit if/else", file: "versandart.js",
    theory: `
      <p class="story"><b>NordPaket GmbH —</b> Je nach Gewicht und Express-Wunsch nimmt ein Paket einen anderen Weg durchs Lager. Genau das ist eine Verzweigung: abhängig von Daten geht es hier lang oder dort lang.</p>
      ${pre(`
function versandart(gewichtKg, istExpress) {
  if (istExpress) {
    return "express";
  } else if (gewichtKg > 20) {
    return "spedition";
  } else {
    return "standard";
  }
}

console.log(versandart(2, true));   // "express"
console.log(versandart(25, false)); // "spedition"
`)}
      <p>Eine Funktion bekommt Werte (Parameter) und gibt mit <code>return</code> ein Ergebnis zurück. <code>if</code> prüft Bedingungen der Reihe nach, von oben nach unten – sobald eine zutrifft, wird nur dieser Zweig ausgeführt. <code>else</code> am Ende fängt alle übrigen Fälle auf.</p>
      <p class="note">Sobald <code>return</code> ausgeführt wird, verlässt die Funktion sofort ihren Code. Die restlichen <code>else if</code>-Zweige werden dann gar nicht mehr geprüft.</p>`,
    task: `
      <p>Schreibe <code>versandart(gewichtKg, istExpress)</code>:</p>
      <ul>
        <li>Ist <code>istExpress</code> wahr → <code>"express"</code></li>
        <li>sonst, wenn <code>gewichtKg &gt; 20</code> → <code>"spedition"</code></li>
        <li>sonst → <code>"standard"</code></li>
      </ul>`,
    starter: `function versandart(gewichtKg, istExpress) {
  // TODO: implementiere die drei Fälle
  return "";
}

console.log(versandart(2, true));
`,
    hint: `Prüfe <code>istExpress</code> zuerst – ein express-Paket bleibt express, egal wie schwer es ist.`,
    solution: `function versandart(gewichtKg, istExpress) {
  if (istExpress) {
    return "express";
  } else if (gewichtKg > 20) {
    return "spedition";
  } else {
    return "standard";
  }
}

console.log(versandart(2, true));
`,
    tests: [
      ['express, leicht → "express"', ({ eq }) => eq(versandart(2, true), "express")],
      ['express, schwer → "express" (bleibt express)', ({ eq }) => eq(versandart(25, true), "express")],
      ['kein express, schwer → "spedition"', ({ eq }) => eq(versandart(25, false), "spedition")],
      ['kein express, leicht → "standard"', ({ eq }) => eq(versandart(3, false), "standard")],
    ],
  },
  {
    id: "vergleiche-quiz", type: "quiz", title: "Kurz-Check: Und, Oder, Verneinung",
    theory: `<p>Vier Fragen zu <code>&amp;&amp;</code>, <code>||</code>, <code>!</code> und dem ternären Operator.</p>`,
    questions: [
      { q: `<code>gewichtKg = 3</code>, <code>istExpress = false</code>. Was liefert <code>gewichtKg &lt; 5 &amp;&amp; istExpress</code>?`, options: ["<code>true</code>", "<code>false</code>", `<code>3</code>`], correct: 1,
        explain: `<code>&amp;&amp;</code> braucht <em>beide</em> Seiten wahr. <code>gewichtKg &lt; 5</code> ist <code>true</code>, aber <code>istExpress</code> ist <code>false</code> – zusammen also <code>false</code>.` },
      { q: `Wann liefert <code>a || b</code> den Wert von <code>b</code>?`, options: ["Wenn a falsy ist", "Wenn a truthy ist", "Immer"], correct: 0,
        explain: `<code>||</code> prüft <code>a</code> zuerst. Ist <code>a</code> falsy (z. B. <code>0</code>, <code>""</code>, <code>false</code>, <code>null</code>, <code>undefined</code>), springt es auf <code>b</code>.` },
      { q: `Kurzform für <code>if (a) { x = 1 } else { x = 2 }</code>?`, options: [`<code>x = a ? 1 : 2;</code>`, `<code>x = a &amp;&amp; 1 || 2;</code>`, `<code>x = a -&gt; 1 : 2;</code>`], correct: 0,
        explain: `Der ternäre Operator <code>bedingung ? wennWahr : wennFalsch</code> liefert direkt einen Wert – praktisch für eine Zuweisung.` },
      { q: `Was ist <code>!0</code>?`, options: ["<code>true</code>", "<code>false</code>", "<code>-1</code>"], correct: 0,
        explain: `<code>0</code> ist falsy, <code>!</code> dreht es um: <code>!0</code> ist <code>true</code>.` },
    ],
  },
  {
    id: "schleifen", type: "code", title: "Listen durchgehen mit for...of", file: "schleifen.js",
    theory: `
      <p><code>for...of</code> geht jedes Element eines Arrays der Reihe nach durch – lesbarer als eine klassische Zählschleife mit Index.</p>
      ${pre(`
const gewichte = [2.4, 0.8, 5.1];

let summe = 0;
for (const g of gewichte) {
  summe = summe + g;
}
console.log(summe); // 8.3
`)}
      <p>In jedem Durchlauf steht <code>g</code> für das aktuelle Element. Die Variable, die das Ergebnis sammelt (<code>summe</code>), legst du <em>vor</em> der Schleife mit <code>let</code> an, weil sie sich bei jedem Durchlauf ändert.</p>
      <p class="note">Ein leeres Array <code>[]</code> ist völlig gültig: die Schleife läuft dann einfach null Mal, <code>summe</code> bleibt bei ihrem Startwert.</p>`,
    task: `<p>Schreibe <code>gesamtgewicht(liste)</code>. Sie bekommt ein Array von Zahlen und gibt deren Summe zurück. Bei einem leeren Array ist das Ergebnis <code>0</code>.</p>`,
    starter: `function gesamtgewicht(liste) {
  let summe = 0;
  // TODO: Schleife ergänzen
  return summe;
}

console.log(gesamtgewicht([2.4, 0.8]));
`,
    hint: `<code>for (const g of liste) { summe = summe + g; }</code>`,
    solution: `function gesamtgewicht(liste) {
  let summe = 0;
  for (const g of liste) {
    summe = summe + g;
  }
  return summe;
}

console.log(gesamtgewicht([2.4, 0.8]));
`,
    tests: [
      ["[2.4, 0.8] → 3.2", ({ eq }) => eq(gesamtgewicht([2.4, 0.8]), 3.2)],
      ["[2.4, 0.8, 5.1, 1.2] → 9.5", ({ eq }) => eq(gesamtgewicht([2.4, 0.8, 5.1, 1.2]), 9.5)],
      ["leeres Array → 0", ({ eq }) => eq(gesamtgewicht([]), 0)],
      ["ein Element → dessen Wert", ({ eq }) => eq(gesamtgewicht([7]), 7)],
    ],
  },
  {
    id: "schleifen-luecken", type: "fill", title: "Schleife ergänzen", file: "express-zaehlen.js",
    theory: `
      <p>Mit <code>if</code> <em>innerhalb</em> einer Schleife wertest du jedes Element einzeln aus, bevor du weitermachst.</p>
      ${pre(`
const pakete = [{ express: true }, { express: false }];

let anzahl = 0;
for (const p of pakete) {
  if (p.express) {
    anzahl = anzahl + 1;
  }
}
`)}`,
    task: `<p>Ergänze die Lücken, damit <code>anzahlExpress</code> am Ende zählt, wie viele Pakete <code>express: true</code> haben.</p>`,
    code: `
const pakete = [
  { id: "NP-1", express: true },
  { id: "NP-2", express: false },
  { id: "NP-3", express: true },
];

let anzahlExpress = 0;
[[b1]] (const paket [[b2]] pakete) {
  [[b3]] (paket.express) {
    anzahlExpress = anzahlExpress [[b4]] 1;
  }
}
console.log(anzahlExpress);
`,
    blanks: { b1: ["for"], b2: ["of"], b3: ["if"], b4: ["+"] },
    hint: `Lücke 1 und 2 bilden zusammen den Schleifenkopf <code>for (const paket of pakete)</code>.`,
  },
  ],
},
{
  id: "m3", title: "Funktionen", sub: "Logik wiederverwenden",
  lessons: [
  {
    id: "funktionen-grundlagen", type: "quiz", title: "Kurz-Check: Funktionen",
    theory: `
      <p>Zwei Schreibweisen für dieselbe Sache:</p>
      ${pre(`
function verdoppeln(x) { return x * 2; }
const verdoppeln2 = (x) => x * 2;

// mehrzeilig braucht es { } und ein explizites return:
const verarbeite = (x) => {
  const y = x * 2;
  return y + 1;
};
`)}
      <p>Pfeilfunktionen (<em>Arrow Functions</em>) sind bei einer einzigen Ausdruck-Zeile kürzer: kein <code>{}</code>, kein <code>return</code> nötig – der Wert nach dem Pfeil wird automatisch zurückgegeben.</p>`,
    questions: [
      { q: `Was gibt <code>function f(x) { x * 2; }</code> zurück, wenn du <code>f(3)</code> aufrufst?`, options: ["<code>6</code>", "<code>undefined</code>", "Einen Fehler"], correct: 1,
        explain: `Ohne <code>return</code> gibt jede Funktion automatisch <code>undefined</code> zurück – auch wenn in der letzten Zeile ein Wert berechnet wurde.` },
      { q: `Welche Schreibweise ist gültig für eine einzeilige Pfeilfunktion mit automatischem Rückgabewert?`, options: [`<code>const f = (x) =&gt; x * 2;</code>`, `<code>const f = (x) =&gt; { x * 2; };</code>`, "Beide geben dasselbe zurück"], correct: 0,
        explain: `Ohne geschweifte Klammern wird der Ausdruck nach dem Pfeil automatisch zurückgegeben. <em>Mit</em> <code>{}</code> bräuchtest du ein explizites <code>return</code>, sonst kommt <code>undefined</code> heraus.` },
      { q: `Wie viele Werte kann eine Funktion mit <code>return</code> zurückgeben?`, options: ["Beliebig viele, durch Komma getrennt", "Genau einen Wert (z. B. ein Objekt oder Array mit mehreren Werten darin)", "Keinen, nur ausgeben"], correct: 1,
        explain: `<code>return</code> beendet die Funktion mit genau einem Wert. Brauchst du mehrere Werte, gibst du ein Objekt oder Array zurück, z. B. <code>return { id, status };</code>.` },
      { q: `<code>function f(x, y = 10) { return x + y; }</code> – was liefert <code>f(5)</code>?`, options: ["<code>15</code>", "<code>NaN</code>", "Einen Fehler, weil y fehlt"], correct: 0,
        explain: `<code>y = 10</code> ist ein Standardwert: Er greift nur, wenn beim Aufruf kein Wert für <code>y</code> übergeben wird. <code>f(5)</code> rechnet also <code>5 + 10</code>.` },
    ],
  },
  {
    id: "funktionen-schreiben", type: "code", title: "Eine Funktion schreiben", file: "format-preis.js",
    theory: `
      <p>Rohdaten sehen selten gut aus. <code>toFixed(n)</code> rundet eine Zahl auf <code>n</code> Nachkommastellen und gibt sie als <strong>Text</strong> zurück.</p>
      ${pre(`
const betrag = 12.5;
console.log(betrag.toFixed(2)); // "12.50"
`)}
      <p>Mit einem Template-Literal (Backticks <code>\`...\`</code>) baust du daraus einen fertigen Text, inklusive Einheit.</p>
      ${pre(`
const text = \`\${betrag.toFixed(2)} €\`;
console.log(text); // "12.50 €"
`)}`,
    task: `<p>Schreibe <code>formatPreis(betrag)</code>. Sie bekommt eine Zahl und gibt einen Text mit zwei Nachkommastellen und <code>" €"</code> am Ende zurück, z. B. <code>formatPreis(12.5)</code> → <code>"12.50 €"</code>.</p>`,
    starter: `function formatPreis(betrag) {
  // TODO
  return "";
}

console.log(formatPreis(12.5));
`,
    hint: `<code>return \`\${betrag.toFixed(2)} €\`;</code>`,
    solution: `function formatPreis(betrag) {
  return \`\${betrag.toFixed(2)} €\`;
}

console.log(formatPreis(12.5));
`,
    tests: [
      ['formatPreis(12.5) → "12.50 €"', ({ eq }) => eq(formatPreis(12.5), "12.50 €")],
      ['formatPreis(3) → "3.00 €"', ({ eq }) => eq(formatPreis(3), "3.00 €")],
      ['formatPreis(0) → "0.00 €"', ({ eq }) => eq(formatPreis(0), "0.00 €")],
      ['formatPreis(9.999) → "10.00 €" (gerundet)', ({ eq }) => eq(formatPreis(9.999), "10.00 €")],
    ],
  },
  {
    id: "pfeilfunktionen", type: "fill", title: "In Pfeilfunktionen umschreiben", file: "pfeilfunktionen.js",
    theory: `
      <p>Jede <code>function</code> lässt sich als Pfeilfunktion schreiben. Bei einer Zeile ohne <code>{}</code> und <code>return</code>, bei mehreren Zeilen mit beidem.</p>
      ${pre(`
function verdoppeln(x) { return x * 2; }
// entspricht:
const verdoppeln2 = (x) => x * 2;
`)}`,
    task: `<p>Ergänze die Lücken, damit beide Funktionen als Pfeilfunktionen geschrieben sind.</p>`,
    code: `
[[b1]] verdoppeln = (x) [[b2]] x * 2;

const quadriere = (x) => {
  [[b3]] x * x;
};

console.log(verdoppeln(4), quadriere(5));
`,
    blanks: { b1: ["const"], b2: ["=>"], b3: ["return"] },
    hint: `Eine Pfeilfunktion wird einer Variable mit <code>const</code> zugewiesen. Der Pfeil besteht aus zwei Zeichen.`,
  },
  {
    id: "callbacks", type: "code", title: "Funktionen als Parameter", file: "meine-filter.js",
    theory: `
      <p>In JavaScript sind Funktionen ganz normale Werte. Du kannst sie in Variablen speichern und als Parameter an andere Funktionen übergeben. Eine Funktion, die du auf diese Weise übergibst, nennt man <strong>Callback</strong>.</p>
      ${pre(`
function fuerJedes(liste, aktion) {
  for (const el of liste) {
    aktion(el);
  }
}

fuerJedes([1, 2, 3], (n) => console.log(n * 10));
// loggt 10, 20, 30
`)}
      <p><code>aktion</code> ist hier selbst eine Funktion. <code>fuerJedes</code> weiß nicht, was <code>aktion</code> genau tut – sie ruft sie nur für jedes Element auf. Das macht die Funktion wiederverwendbar.</p>`,
    task: `
      <p>Schreibe <code>meineFilter(liste, bedingung)</code>. <code>bedingung</code> ist eine Funktion, die ein Element bekommt und <code>true</code> oder <code>false</code> zurückgibt. <code>meineFilter</code> gibt ein neues Array mit nur den Elementen zurück, für die <code>bedingung(element)</code> <code>true</code> ist.</p>`,
    starter: `function meineFilter(liste, bedingung) {
  const ergebnis = [];
  // TODO: passende Elemente mit push() sammeln
  return ergebnis;
}

console.log(meineFilter([1, 2, 3, 4], (n) => n > 2));
`,
    hint: `<code>for (const el of liste) { if (bedingung(el)) { ergebnis.push(el); } }</code>`,
    solution: `function meineFilter(liste, bedingung) {
  const ergebnis = [];
  for (const el of liste) {
    if (bedingung(el)) {
      ergebnis.push(el);
    }
  }
  return ergebnis;
}

console.log(meineFilter([1, 2, 3, 4], (n) => n > 2));
`,
    tests: [
      ["Zahlen über 2", ({ eq }) => eq(meineFilter([1, 2, 3, 4], (n) => n > 2), [3, 4])],
      ["Pakete mit express: true", ({ eq }) => eq(
        meineFilter([{ id: "A", express: true }, { id: "B", express: false }], (p) => p.express),
        [{ id: "A", express: true }]
      )],
      ["nichts passt → leeres Array", ({ eq }) => eq(meineFilter([1, 2], (n) => n > 100), [])],
      ["verändert das Original nicht", ({ eq }) => {
        const original = [1, 2, 3];
        meineFilter(original, (n) => n > 1);
        eq(original, [1, 2, 3], "original");
      }],
    ],
  },
  ],
},
{
  id: "m4", title: "Daten strukturieren", sub: "Objekte, Arrays und JSON",
  lessons: [
  {
    id: "objekte", type: "code", title: "Objekte bauen & lesen", file: "objekte.js",
    theory: `
      <p class="story"><b>NordPaket GmbH —</b> Ein einzelnes Paket hat mehr als nur eine Nummer: Gewicht, Zielort, Status. Zusammengehörige Werte packst du in ein <strong>Objekt</strong>.</p>
      ${pre(`
const paket = {
  id: "NP-1001",
  gewichtKg: 2.4,
  adresse: { stadt: "Köln" },
};

console.log(paket.id);              // "NP-1001"
console.log(paket.adresse.stadt);   // "Köln"

paket.status = "angelegt";          // neue Eigenschaft hinzufügen
`)}
      <p>Zugriff per Punkt (<code>paket.id</code>) ist der Normalfall. Objekte dürfen verschachtelt sein – ein Wert ist einfach selbst wieder ein Objekt.</p>`,
    task: `<p>Schreibe <code>erstellePaket(id, gewichtKg, stadt)</code>. Sie gibt ein Objekt zurück mit <code>id</code>, <code>gewichtKg</code>, einer verschachtelten <code>adresse: { stadt }</code> und <code>status: "angelegt"</code>.</p>`,
    starter: `function erstellePaket(id, gewichtKg, stadt) {
  // TODO: Objekt zurückgeben
}

console.log(erstellePaket("NP-1001", 2.4, "Köln"));
`,
    hint: `<code>return { id, gewichtKg, adresse: { stadt }, status: "angelegt" };</code> – bei gleichem Namen für Eigenschaft und Variable reicht die Kurzschreibweise <code>{ id }</code> statt <code>{ id: id }</code>.`,
    solution: `function erstellePaket(id, gewichtKg, stadt) {
  return {
    id,
    gewichtKg,
    adresse: { stadt },
    status: "angelegt",
  };
}

console.log(erstellePaket("NP-1001", 2.4, "Köln"));
`,
    tests: [
      ["richtige Struktur", ({ eq }) => eq(
        erstellePaket("NP-1001", 2.4, "Köln"),
        { id: "NP-1001", gewichtKg: 2.4, adresse: { stadt: "Köln" }, status: "angelegt" }
      )],
      ["andere Werte", ({ eq }) => eq(
        erstellePaket("NP-2002", 0.8, "Leipzig"),
        { id: "NP-2002", gewichtKg: 0.8, adresse: { stadt: "Leipzig" }, status: "angelegt" }
      )],
    ],
  },
  {
    id: "destructuring", type: "fill", title: "Destructuring üben", file: "destructuring.js",
    theory: `
      <p><strong>Destructuring</strong> zieht einzelne Werte direkt aus einem Objekt oder Array, statt sie über den vollen Namen anzusprechen.</p>
      ${pre(`
const paket = { id: "NP-1", gewichtKg: 2.4, adresse: { stadt: "Köln" } };

const { id, gewichtKg: gewicht } = paket;   // umbenennen: gewichtKg → gewicht
const { adresse: { stadt } } = paket;        // verschachtelt
const [erster, zweiter] = [10, 20, 30];      // Arrays genauso
const { rabatt = 0 } = paket;                // Standardwert, falls rabatt fehlt
`)}
      <p class="note"><code>const { name } = kunde;</code> schlägt schon fehl, wenn <code>kunde</code> selbst <code>undefined</code> ist – nicht erst, wenn <code>name</code> fehlt.</p>`,
    task: `<p>Ergänze die Lücken: Umbenennen beim Objekt-Destructuring, verschachteltes Destructuring und ein Standardwert.</p>`,
    code: `
const paket = { id: "NP-1001", gewichtKg: 2.4, adresse: { stadt: "Köln" } };

const { id, gewichtKg [[b1]] gewicht, adresse: { stadt } } = paket;
const [erster[[b2]]zweiter] = [10, 20, 30];
const { rabatt [[b3]] 0 } = paket;

console.log(id, gewicht, stadt, erster, zweiter, rabatt);
`,
    blanks: { b1: [":"], b2: [","], b3: ["="] },
    hint: `Umbenennen beim Objekt-Destructuring funktioniert mit demselben Zeichen wie ein normales Objektliteral: <code>alterName: neuerName</code>.`,
  },
  {
    id: "array-methoden", type: "code", title: "Arrays umformen: filter & map", file: "array-methoden.js",
    theory: `
      <p>Statt Schleifen von Hand zu schreiben, nutzt du für Arrays eingebaute Methoden. Jede liefert ein <strong>neues</strong> Array, ohne das ursprüngliche zu verändern.</p>
      ${pre(`
const pakete = [
  { id: "NP-1", status: "zugestellt" },
  { id: "NP-2", status: "unterwegs" },
];

pakete.filter((p) => p.status !== "zugestellt")  // nur offene Pakete
pakete.map((p) => p.id)                           // nur die IDs
`)}
      <p><code>filter</code> behält passende Elemente, <code>map</code> wandelt jedes Element um. Beide lassen sich verketten: erst filtern, dann das Ergebnis umformen.</p>`,
    task: `<p>Schreibe <code>offenePaketeIds(liste)</code>. Sie bekommt ein Array von Paket-Objekten (<code>{ id, status }</code>) und gibt ein Array mit den <code>id</code>-Werten aller Pakete zurück, deren <code>status</code> <em>nicht</em> <code>"zugestellt"</code> ist.</p>`,
    starter: `function offenePaketeIds(liste) {
  // TODO: filter + map
  return [];
}

console.log(offenePaketeIds([{ id: "NP-1", status: "zugestellt" }]));
`,
    hint: `<code>return liste.filter((p) => p.status !== "zugestellt").map((p) => p.id);</code>`,
    solution: `function offenePaketeIds(liste) {
  return liste.filter((p) => p.status !== "zugestellt").map((p) => p.id);
}

console.log(offenePaketeIds([{ id: "NP-1", status: "zugestellt" }]));
`,
    tests: [
      ["gemischte Liste", ({ eq }) => eq(
        offenePaketeIds([
          { id: "NP-1", status: "zugestellt" },
          { id: "NP-2", status: "unterwegs" },
          { id: "NP-3", status: "angelegt" },
        ]),
        ["NP-2", "NP-3"]
      )],
      ["alle zugestellt → leeres Array", ({ eq }) => eq(
        offenePaketeIds([{ id: "NP-1", status: "zugestellt" }]),
        []
      )],
      ["leere Liste → leeres Array", ({ eq }) => eq(offenePaketeIds([]), [])],
    ],
  },
  {
    id: "json", type: "code", title: "JSON lesen", file: "json.js",
    theory: `
      <p>Wenn Systeme Daten austauschen, dann fast immer als <strong>JSON</strong>: Text, der aussieht wie ein JavaScript-Objekt, aber strengeren Regeln folgt (Schlüssel in doppelten Anführungszeichen, keine Funktionen, kein <code>undefined</code>).</p>
      ${pre(`
const text = '{"paket": {"id": "NP-1", "adresse": {"stadt": "Köln"}}}';

const daten = JSON.parse(text);        // Text → Objekt
console.log(daten.paket.adresse.stadt); // "Köln"
`)}
      <p>Echte Daten sind oft unvollständig. Zwei Operatoren schützen dich vor Abstürzen:</p>
      ${pre(`
const paket = { id: "NP-2" };            // keine Adresse!

paket.adresse.stadt                      // TypeError: Cannot read properties of undefined
paket.adresse?.stadt                     // undefined statt Absturz
paket.adresse?.stadt ?? "unbekannt"      // "unbekannt" als Ersatzwert
`)}
      <p><code>?.</code> (Optional Chaining) bricht sicher ab, wenn links nichts steht. <code>??</code> liefert den rechten Wert nur, wenn links <code>null</code> oder <code>undefined</code> steht – anders als <code>||</code> greift es also nicht bei <code>0</code> oder <code>""</code>.</p>`,
    task: `
      <p>Schreibe <code>paketStadt(jsonText)</code>. Sie bekommt JSON als Text, z. B.</p>
      ${pre(`{"paket": {"id": "NP-1", "adresse": {"stadt": "Köln"}}}`)}
      <p>und gibt <code>paket.adresse.stadt</code> zurück. Fehlt die Adresse, gibt sie <code>"unbekannt"</code> zurück.</p>`,
    starter: `function paketStadt(jsonText) {
  // 1. Text in ein Objekt umwandeln
  // 2. Stadt auslesen, mit Ersatzwert "unbekannt"
  return "unbekannt";
}

console.log(paketStadt('{"paket": {"id": "NP-2"}}')); // "unbekannt"
`,
    hint: `Erst <code>const daten = JSON.parse(jsonText);</code>, dann <code>return daten.paket?.adresse?.stadt ?? "unbekannt";</code>`,
    solution: `function paketStadt(jsonText) {
  const daten = JSON.parse(jsonText);
  return daten.paket?.adresse?.stadt ?? "unbekannt";
}

console.log(paketStadt('{"paket": {"id": "NP-2"}}')); // "unbekannt"
`,
    tests: [
      ['mit Adresse → "Köln"', ({ eq }) => eq(paketStadt('{"paket": {"id": "NP-1", "adresse": {"stadt": "Köln"}}}'), "Köln")],
      ['ohne Adresse → "unbekannt"', ({ eq }) => eq(paketStadt('{"paket": {"id": "NP-2"}}'), "unbekannt")],
      ['andere Stadt → "Leipzig"', ({ eq }) => eq(paketStadt('{"paket": {"adresse": {"stadt": "Leipzig"}}}'), "Leipzig")],
    ],
  },
  ],
},
{
  id: "m5", title: "Asynchron denken", sub: "Mit Zeit und externen Systemen umgehen",
  lessons: [
  {
    id: "async-grundlagen", type: "quiz", title: "Kurz-Check: Asynchroner Code",
    theory: `
      <p class="story"><b>NordPaket GmbH —</b> Eine Statusabfrage beim Depot-System dauert einen Moment – Netzwerk braucht Zeit. JavaScript blockiert währenddessen nicht, sondern macht mit anderem weiter und meldet sich, sobald die Antwort da ist. Das ist <strong>asynchroner</strong> Code.</p>
      ${pre(`
async function ladeStatus(id) {
  const antwort = await fetch(\`https://api.beispiel.dev/pakete/\${id}\`);
  const daten = await antwort.json();
  return daten;
}
`)}
      <p><code>fetch(...)</code> gibt sofort ein <strong>Promise</strong> zurück – ein Versprechen auf einen Wert, der erst später da ist. <code>await</code> pausiert nur die eigene <code>async</code>-Funktion, bis das Promise erfüllt ist. Der Rest des Programms läuft in der Zwischenzeit normal weiter.</p>
      <p class="note"><code>await</code> funktioniert nur <em>innerhalb</em> einer <code>async</code>-Funktion. Auf oberster Ebene eines Skripts brauchst du stattdessen <code>.then(...)</code>.</p>`,
    questions: [
      { q: `Was gibt eine <code>async function</code> immer zurück?`, options: ["Den Wert direkt", "Ein Promise", "<code>undefined</code>"], correct: 1,
        explain: `Jede <code>async function</code> liefert automatisch ein Promise – auch wenn du selbst nur einen normalen Wert mit <code>return</code> zurückgibst.` },
      { q: `Worauf wartet <code>await</code>?`, options: ["Auf eine feste Anzahl Millisekunden", "Auf das Ergebnis eines Promise", "Auf eine Nutzereingabe"], correct: 1,
        explain: `<code>await</code> pausiert die <code>async</code>-Funktion, bis das Promise rechts davon erfüllt (oder abgelehnt) ist, und liefert dann dessen Wert.` },
      { q: `<code>fetch(url)</code> antwortet mit Status 404. Wirft das einen Fehler, den <code>try/catch</code> fängt?`, options: ["Ja, automatisch", "Nein, antwort.ok ist einfach false", "Nur bei Status 500"], correct: 1,
        explain: `<code>fetch</code> wirft nur bei echten Netzwerkproblemen einen Fehler. Bei HTTP-Fehlerstatus wie 404 oder 500 ist <code>antwort.ok</code> schlicht <code>false</code> – das musst du selbst prüfen.` },
      { q: `Kannst du <code>await</code> außerhalb einer <code>async</code>-Funktion benutzen, mitten in einem normalen Skript?`, options: ["Ja, überall", "Nein, nur innerhalb einer async-Funktion (von Modulen auf oberster Ebene abgesehen)", "Nur in Schleifen"], correct: 1,
        explain: `<code>await</code> braucht eine <code>async</code>-Funktion drumherum. Ohne die bekommst du einen <code>SyntaxError</code>.` },
    ],
  },
  {
    id: "async-await", type: "code", title: "Mit async/await Daten laden", file: "paket-status.js",
    theory: `
      <p>Diese Übung läuft gegen eine simulierte API unter <code>https://api.nordpaket.dev</code>. Sie kennt drei Pakete:</p>
      <div class="table-wrap"><table class="t">
        <thead><tr><th>id</th><th>status</th><th>gewichtKg</th></tr></thead>
        <tbody>
          <tr><td><code>NP-1001</code></td><td>unterwegs</td><td>2.4</td></tr>
          <tr><td><code>NP-1002</code></td><td>zugestellt</td><td>0.8</td></tr>
          <tr><td><code>NP-1003</code></td><td>in Zustellung</td><td>5.1</td></tr>
        </tbody>
      </table></div>
      ${pre(`
async function ladeKunde(id) {
  const antwort = await fetch(\`https://api.nordpaket.dev/pakete/\${id}\`);
  const daten = await antwort.json();
  return daten;
}
`)}
      <p><code>antwort.json()</code> liest den Antwort-Text und wandelt ihn in ein Objekt um – das ist selbst wieder asynchron, deshalb auch hier <code>await</code>.</p>`,
    task: `<p>Schreibe <code>paketStatus(id)</code>. Sie ruft <code>https://api.nordpaket.dev/pakete/&#36;{id}</code> per <code>fetch</code> auf und gibt die geparsten JSON-Daten zurück.</p>`,
    starter: `async function paketStatus(id) {
  // TODO: fetch aufrufen, JSON auslesen, zurückgeben
}

paketStatus("NP-1001").then((daten) => console.log(daten));
`,
    hint: `<code>const antwort = await fetch(\`https://api.nordpaket.dev/pakete/\${id}\`); return await antwort.json();</code>`,
    solution: `async function paketStatus(id) {
  const antwort = await fetch(\`https://api.nordpaket.dev/pakete/\${id}\`);
  return await antwort.json();
}

paketStatus("NP-1001").then((daten) => console.log(daten));
`,
    tests: [
      ["NP-1001 → unterwegs", async ({ eq }) => {
        const daten = await paketStatus("NP-1001");
        eq(daten.status, "unterwegs", "status");
      }],
      ["NP-1002 → zugestellt, 0.8 kg", async ({ eq }) => {
        const daten = await paketStatus("NP-1002");
        eq(daten.status, "zugestellt", "status");
        eq(daten.gewichtKg, 0.8, "gewichtKg");
      }],
      ["Ergebnis ist ein Objekt mit id", async ({ eq }) => {
        const daten = await paketStatus("NP-1003");
        eq(daten.id, "NP-1003", "id");
      }],
    ],
  },
  {
    id: "fehlerbehandlung", type: "code", title: "Fehler abfangen", file: "paket-status-sicher.js",
    theory: `
      <p><code>try/catch</code> fängt einen Fehler ab, statt das Programm abstürzen zu lassen – auch Fehler aus einem <code>await</code> im <code>try</code>-Block. Mit <code>throw new Error("...")</code> löst du selbst einen Fehler aus, z. B. wenn eine Antwort nicht in Ordnung ist.</p>
      ${pre(`
function pruefeMenge(menge) {
  if (menge <= 0) throw new Error("Menge muss größer als 0 sein");
}

try {
  pruefeMenge(-1);
} catch (fehler) {
  console.log(fehler.message); // "Menge muss größer als 0 sein"
}
`)}
      <p>Bei <code>fetch</code> kombinierst du das mit der <code>ok</code>-Prüfung aus der letzten Lektion: Ist die Antwort nicht in Ordnung, wirfst du selbst einen aussagekräftigen Fehler.</p>`,
    task: `<p>Schreibe <code>paketStatusSicher(id)</code> wie <code>paketStatus</code> aus der letzten Lektion, aber: Ist <code>antwort.ok</code> <code>false</code> (z. B. weil die ID unbekannt ist), wirf einen <code>Error</code> mit einer Nachricht statt die Daten zurückzugeben.</p>`,
    starter: `async function paketStatusSicher(id) {
  // TODO: fetch aufrufen, antwort.ok prüfen, sonst werfen
}

paketStatusSicher("NP-1001").then((daten) => console.log(daten));
`,
    hint: `<code>if (!antwort.ok) { throw new Error(\`Paket \${id} konnte nicht geladen werden (Status \${antwort.status})\`); }</code> – danach ganz normal <code>return await antwort.json();</code>`,
    solution: `async function paketStatusSicher(id) {
  const antwort = await fetch(\`https://api.nordpaket.dev/pakete/\${id}\`);
  if (!antwort.ok) {
    throw new Error(\`Paket \${id} konnte nicht geladen werden (Status \${antwort.status})\`);
  }
  return await antwort.json();
}

paketStatusSicher("NP-1001").then((daten) => console.log(daten));
`,
    tests: [
      ["bekannte ID → Daten", async ({ eq }) => {
        const daten = await paketStatusSicher("NP-1001");
        eq(daten.status, "unterwegs", "status");
      }],
      ["unbekannte ID → wirft einen Fehler", async ({ assert }) => {
        let geworfen = false;
        try {
          await paketStatusSicher("NP-9999");
        } catch (e) {
          geworfen = true;
        }
        assert(geworfen, "Bei einer unbekannten ID sollte paketStatusSicher einen Fehler werfen");
      }],
      ["Fehlermeldung enthält die ID", async ({ assert }) => {
        try {
          await paketStatusSicher("NP-9999");
          assert(false, "sollte einen Fehler geworfen haben");
        } catch (e) {
          assert(String(e.message).includes("NP-9999"), "Die Fehlermeldung sollte die ID NP-9999 enthalten");
        }
      }],
    ],
  },
  {
    id: "abschluss", type: "info", title: "Geschafft: dein JS-Fundament",
    theory: `
      <p class="story"><b>NordPaket GmbH —</b> Dein erster Tag ist vorbei. Du kennst jetzt die Werkzeuge, mit denen im Tokenlauf-Kurs echter Code geschrieben wird: Variablen für Prozessdaten, Verzweigungen für Gateways, Schleifen und Array-Methoden für Listen, Objekte und JSON für Prozessvariablen, async/await für Aufrufe an externe Systeme.</p>
      <h3>Was du jetzt kannst</h3>
      <ul>
        <li>Werte in <code>const</code>/<code>let</code> speichern und ihren Typ einschätzen</li>
        <li>Mit <code>if</code>/<code>else</code> und Vergleichsoperatoren verzweigen</li>
        <li>Mit <code>for...of</code> und Array-Methoden (<code>filter</code>, <code>map</code>) Listen verarbeiten</li>
        <li>Eigene Funktionen schreiben, als <code>function</code> und als Pfeilfunktion, inklusive Callbacks</li>
        <li>Objekte und JSON lesen, auch wenn Daten verschachtelt oder unvollständig sind</li>
        <li>Mit <code>async</code>/<code>await</code> und <code>try</code>/<code>catch</code> auf externe Antworten warten und Fehler abfangen</li>
      </ul>
      <h3>Und jetzt?</h3>
      <p>Im <a class="a" href="https://norman2209.github.io/tokenlauf/" target="_blank" rel="noopener">Tokenlauf-Kurs</a> baust du auf genau diesem Fundament auf: Dort schreibst du echte Job Worker, die mit einer Prozess-Engine sprechen, Prozessvariablen lesen und verändern und auf Fehler reagieren – mit denselben Bausteinen, die du hier geübt hast.</p>
      <p>Schau dir bei Bedarf den <button class="req-deep" data-go="spickzettel" style="display:inline">JS-Spickzettel</button> an, wenn dir später ein Konstrukt entfallen ist.</p>`,
  },
  ],
},
];

const LESSONS = [];
MODULES.forEach((m, mi) => m.lessons.forEach((l) => { l.module = m; l.moduleNr = mi + 1; l.index = LESSONS.length; LESSONS.push(l); }));
const byId = (id) => LESSONS.find((l) => l.id === id);
const TYPE_LABEL = { code: "Code-Übung", fill: "Lückentext", quiz: "Quiz", sort: "Zuordnen", info: "Wissen" };
const TYPE_SHAPE = { code: "task", fill: "task", quiz: "gw", sort: "gw", info: "ev2" };

/* Lernziele: jedes Ziel mit den Schritten, die es abdecken */
const PROFILE = [
  { text: "Variablen anlegen und Datentypen sicher unterscheiden",
    lessons: ["variablen", "operatoren", "typen-quiz", "typen-sortieren"] },
  { text: "Verzweigungen und Vergleiche schreiben",
    lessons: ["bedingungen", "vergleiche-quiz"] },
  { text: "Schleifen für wiederkehrende Abläufe nutzen",
    lessons: ["schleifen", "schleifen-luecken"] },
  { text: "Eigene Funktionen entwerfen – als function, als Pfeilfunktion und als Callback",
    lessons: ["funktionen-grundlagen", "funktionen-schreiben", "pfeilfunktionen", "callbacks"] },
  { text: "Objekte, Arrays und JSON lesen, schreiben und umformen",
    lessons: ["objekte", "destructuring", "array-methoden", "json"] },
  { text: "Asynchronen Code mit async/await schreiben und Fehler abfangen",
    lessons: ["async-grundlagen", "async-await", "fehlerbehandlung"] },
];

/* JS-Spickzettel: Nachschlagen statt neu erklären, Beispiele wie in den Lektionen.
   Jeder Eintrag nennt zusätzlich die Stolperfalle, auf die Einsteiger typischerweise
   laufen, und verlinkt die Lektion, die das Konstrukt zuerst einführt. */
const SPICKZETTEL = [
  { title: "Werte & Variablen", items: [
    { term: "const / let", lesson: "variablen",
      note: `<code>const</code> sperrt nur die Variable selbst: Du darfst sie nicht neu zuweisen. Der <strong>Inhalt</strong> von Objekten und Arrays bleibt trotzdem veränderbar. <code>let</code> erlaubt auch die Neuzuweisung.`,
      code: `const paket = { id: "NP-1" };
paket.id = "NP-2";      // erlaubt: nur der Inhalt ändert sich
paket = {};              // Fehler: die Variable selbst nicht

let versuche = 0;        // darf sich ändern
versuche = versuche + 1;`,
      pitfall: `<code>const positionen = [];</code> und danach <code>positionen.push(...)</code> fühlt sich nach einer Änderung der Konstante an. Tatsächlich bleibt <code>positionen</code> dieselbe Variable, nur ihr Inhalt wächst. Ein echter Fehler wäre erst <code>positionen = [...]</code>, also eine komplette Neuzuweisung.` },
    { term: "=== / !== / && / || / !", lesson: "operatoren",
      note: `<code>===</code> vergleicht Wert und Typ, ohne vorher umzurechnen. <code>==</code> wandelt die Typen vorher um und kann dadurch überraschende Ergebnisse liefern – deshalb fast immer <code>===</code> nehmen. <code>&&</code> und <code>||</code> prüfen von links nach rechts und brechen ab, sobald das Ergebnis feststeht.`,
      code: `"5" === 5             // false, Text ist keine Zahl
"5" == 5              // true, == wandelt den Typ erst um
gewichtKg > 5 && istExpress
!istZugestellt`,
      pitfall: `<code>paket.stadt || "Unbekannt"</code> wirkt wie ein Standardwert-Trick. Er schlägt aber fehl, sobald der echte Wert <code>0</code>, <code>""</code> oder <code>false</code> ist – dann springt <code>||</code> trotzdem ein. Für Werte, die auch <code>0</code> oder leer sein dürfen, <code>??</code> verwenden (siehe weiter unten).` },
    { term: "Ternärer Operator ?:", lesson: "vergleiche-quiz",
      note: `Kurzform für <code>if/else</code>, die direkt einen Wert liefert – praktisch für eine Zuweisung, nicht für ganze Programmlogik.`,
      code: `const status = gewichtKg > 20 ? "spedition" : "standard";`,
      pitfall: `Verschachtelte Ternarys (<code>a ? b : c ? d : e</code>) sind schwer lesbar. Ab zwei Bedingungen lieber ein normales <code>if/else</code> schreiben.` },
    { term: "typeof", lesson: "typen-sortieren",
      note: `Liefert den Datentyp eines Werts als Text. Praktisch, um Werte aus einer API-Antwort zu prüfen, bevor du damit weiterrechnest.`,
      code: `typeof "NP-1001"    // "string"
typeof 42            // "number"
typeof true          // "boolean"
typeof undefined     // "undefined"
typeof { a: 1 }      // "object"
typeof [1, 2, 3]      // "object" – Arrays sind für typeof auch nur Objekte`,
      pitfall: `<code>typeof null</code> liefert <code>"object"</code>, nicht <code>"null"</code> – ein alter, nie behobener Bug in JavaScript. Auf <code>null</code> prüfst du deshalb direkt mit <code>=== null</code>.` },
  ] },
  { title: "Funktionen", items: [
    { term: "function / Pfeilfunktion", lesson: "funktionen-grundlagen",
      note: `Zwei Schreibweisen für dieselbe Sache. Pfeilfunktionen sind kürzer: Bei einer einzigen Ausdruck-Zeile brauchst du weder <code>{}</code> noch <code>return</code>.`,
      code: `function verdoppeln(x) { return x * 2; }
const verdoppeln2 = (x) => x * 2;

// mehrzeilig braucht es { } und ein explizites return:
const verarbeite = (x) => {
  const y = x * 2;
  return y + 1;
};`,
      pitfall: `Pfeilfunktionen haben kein eigenes <code>this</code>, sie übernehmen es aus ihrer Umgebung. Als Callback innerhalb einer normalen Methode kann das überraschen – mehr dazu, sobald <code>class</code> ins Spiel kommt.` },
    { term: "Funktion als Parameter (Callback)", lesson: "callbacks",
      note: `Funktionen sind Werte. Du kannst sie in Variablen speichern, in Arrays sammeln und als Parameter an andere Funktionen übergeben.`,
      code: `function fuerJedes(liste, aktion) {
  for (const el of liste) aktion(el);
}
fuerJedes([1, 2, 3], (n) => console.log(n * 10));`,
      pitfall: `<code>fuerJedes(liste, aktion())</code> ruft <code>aktion</code> sofort einmal auf und übergibt deren <em>Ergebnis</em> – nicht die Funktion selbst. Ohne die Klammern <code>aktion</code> übergibst du die Funktion, die später aufgerufen wird.` },
  ] },
  { title: "Daten umformen", items: [
    { term: "Destructuring", lesson: "destructuring",
      note: `Zieht einzelne Werte direkt aus einem Objekt oder Array, statt sie über den vollen Namen anzusprechen. Geht auch verschachtelt, mit Umbenennen und mit Standardwerten.`,
      code: `const { id, adresse: { stadt } } = paket;
const [erster, zweiter] = liste;
const { gewichtKg: gewicht } = paket;      // umbenennen
const { rabatt = 0 } = paket;              // Standardwert, falls rabatt fehlt`,
      pitfall: `<code>const { stadt } = paket;</code> schlägt schon fehl, wenn <code>paket</code> selbst <code>undefined</code> ist – nicht erst, wenn <code>stadt</code> fehlt. Bei Daten aus einer API lohnt sich davor eine Prüfung oder <code>?.</code>.` },
    { term: "Template-Literal `...`", lesson: "funktionen-schreiben",
      note: `Text mit eingesetzten Werten, über Backticks (<code>\`</code>) statt <code>+</code>-Verkettung. In <code>\${...}</code> darf ein beliebiger Ausdruck stehen, nicht nur eine Variable.`,
      code: `const text = \`Paket \${id}, \${gewichtKg} kg\`;
const fehler = \`Paket \${id} nicht gefunden\`;          // häufig in throw new Error(...)
const summe = \`Gesamt: \${(preis * menge).toFixed(2)} €\`;  // Ausdruck statt nur Variable`,
      pitfall: `Backticks lassen sich nicht einfach ineinander verschachteln. Für den Normalfall – Text plus eingesetzter Wert – reicht aber fast immer ein einzelner <code>\${wert}</code>-Einschub.` },
    { term: "Optional Chaining ?. / Nullish Coalescing ??", lesson: "json",
      note: `<code>?.</code> bricht sicher ab, wenn ein Zwischenwert fehlt, und liefert <code>undefined</code> statt eines Absturzes. <code>??</code> springt nur ein, wenn links wirklich <code>null</code> oder <code>undefined</code> steht.`,
      code: `paket.adresse?.stadt                     // undefined statt Absturz, wenn adresse fehlt
paket.adresse?.stadt ?? "unbekannt"      // Ersatzwert nur bei null/undefined
paket.gewichtKg ?? 0                      // liefert 0 nur, wenn gewichtKg fehlt – nicht wenn es 0 ist
berechneSumme?.(positionen)               // optionaler Funktionsaufruf, falls berechneSumme existiert`,
      pitfall: `<code>paket.rabatt || 0</code> sieht aus wie <code>?? 0</code>, liefert aber auch dann <code>0</code>, wenn <code>rabatt</code> bereits korrekt <code>0</code> ist – <code>||</code> ersetzt bei jedem falsy-Wert. Bei Zahlen, die auch <code>0</code> sein dürfen, deshalb immer <code>??</code> statt <code>||</code>.` },
    { term: "JSON.parse / JSON.stringify", lesson: "json",
      note: `Wandelt JSON-Text in ein JavaScript-Objekt um und zurück. Prozess-Engines wie Camunda speichern Prozessvariablen als JSON.`,
      code: `const daten = JSON.parse(text);           // Text → Objekt, wirft bei kaputtem JSON einen Fehler
const text2 = JSON.stringify(daten);      // Objekt → Text
const lesbar = JSON.stringify(daten, null, 2);  // mit Einrückung, gut zum Debuggen`,
      pitfall: `<code>JSON.parse</code> wirft bei kaputtem Text einen <code>SyntaxError</code> – Daten aus einer externen Quelle deshalb in <code>try/catch</code> parsen. Und: <code>undefined</code>-Werte verschwinden beim <code>stringify</code> einfach.` },
  ] },
  { title: "Listen durchgehen", items: [
    { term: "for...of", lesson: "schleifen",
      note: `Geht jedes Element eines Arrays der Reihe nach durch – lesbarer als eine klassische Zählschleife mit Index.`,
      code: `for (const paket of pakete) {
  summe = summe + paket.gewichtKg;
}

for (const paket of pakete) {
  if (paket.gewichtKg > 20) break;   // in forEach/map nicht möglich
}`,
      pitfall: `Anders als <code>forEach</code> oder die Array-Methoden unten erlaubt <code>for...of</code> <code>break</code> und <code>continue</code>. Brauchst du einen vorzeitigen Abbruch, ist das dein Werkzeug.` },
    { term: "filter / map / find / some / every / reduce", lesson: "array-methoden",
      note: `Array-Methoden statt Schleifen von Hand. Jede liefert ein neues Ergebnis, ohne das ursprüngliche Array zu verändern.`,
      code: `liste.filter((x) => x.offen)              // nur passende Elemente, neues Array
liste.map((x) => x.id)                    // jedes Element umwandeln, gleiche Länge
liste.find((x) => x.id === "NP-1")        // erstes passendes Element (oder undefined)
liste.some((x) => x.offen)                // gibt es mindestens eins, das passt?
liste.every((x) => x.offen)               // passen wirklich alle?
liste.reduce((summe, x) => summe + x.gewichtKg, 0)
// summe ist der Zwischenstand (startet beim letzten Argument, hier 0), x das aktuelle Element`,
      pitfall: `Bei <code>reduce</code> entscheidet der Startwert (das letzte Argument), womit gezählt wird, und bestimmt den Typ des Ergebnisses: <code>0</code> für eine Zahl, <code>[]</code> für ein neues Array. Fehlt er bei einem leeren Array, wirft <code>reduce</code> einen Fehler.` },
  ] },
  { title: "Asynchron & Fehler", items: [
    { term: "async / await", lesson: "async-await",
      note: `<code>await</code> pausiert nur die eigene <code>async</code>-Funktion, bis das Promise fertig ist – der Rest des Programms läuft weiter. Außerhalb einer <code>async</code>-Funktion gibt es kein <code>await</code> auf oberster Ebene.`,
      code: `async function laden(id) {
  const antwort = await fetch(\`https://api.nordpaket.dev/pakete/\${id}\`);
  if (!antwort.ok) throw new Error(\`Fehler \${antwort.status}\`);
  return await antwort.json();
}

// außerhalb einer async-Funktion kein await auf oberster Ebene – deshalb .then():
laden("NP-1001").then((daten) => console.log(daten));`,
      pitfall: `<code>fetch</code> wirft bei HTTP-Fehlern wie 404 oder 500 keinen eigenen Fehler, <code>antwort.ok</code> ist dann einfach <code>false</code>. Ohne eigene <code>if (!antwort.ok)</code>-Prüfung bleibt ein Fehlerstatus im Code unbemerkt.` },
    { term: "try / catch / throw new Error", lesson: "fehlerbehandlung",
      note: `<code>try/catch</code> fängt einen Fehler ab, statt das Programm abstürzen zu lassen – auch Fehler aus einem <code>await</code> im <code>try</code>-Block. <code>throw new Error("...")</code> erzeugst du selbst, z. B. um eine ungültige Antwort sofort zu melden.`,
      code: `function pruefeMenge(menge) {
  if (menge <= 0) throw new Error("Menge muss größer als 0 sein");
}

try {
  pruefeMenge(-1);
} catch (fehler) {
  console.log(fehler.message);   // "Menge muss größer als 0 sein"
}`,
      pitfall: `Ein <code>throw</code> ohne <code>try/catch</code> drumherum lässt das Programm abstürzen (bzw. das Promise ablehnen). Rund um Code, der scheitern kann – vor allem <code>await fetch(...)</code> – gehört deshalb ein <code>try/catch</code>.` },
  ] },
];
