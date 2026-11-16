/* Test Your Knowledge for Matt Vogel's site.
   Adds two side tabs (Buyer, Seller) that stay put while the page scrolls, a slide-out
   panel with both quizzes and an "Ask Matt a question" form, and an optional in-page
   teaser (put <div id="tyk-teaser"></div> where it should appear).

   Ask Matt form delivery:
   - Set window.TYK_CONFIG = { endpoint: "https://formspree.io/f/XXXXXXX" } before this
     script to email Matt through a form service (Formspree, Basin, Getform and similar
     accept a JSON POST).
   - With no endpoint, the form opens the visitor's email app addressed to Matt, the same
     way the site's contact form works today. */
(() => {
  const CFG = Object.assign({
    endpoint: "",
    email: "matthew.vogel@pittsburghmoves.com",
    preview: false
  }, window.TYK_CONFIG || {});

  const QUIZ = {
    buyer: {
      title: "Test Your Knowledge: Buyer",
      sub: "12 quick questions on buying a home.",
      qs: [
        { q: "What does preapproval mean?", o: ["The seller agrees to accept your offer", "A lender reviews your finances before you shop", "An inspector signs off on the home", "The appraisal comes in at your price"], a: 1,
          w: "Preapproval is a lender's review of the buyer before an offer. It shows you a practical price range and tells sellers you're ready to buy." },
        { q: "Preapproval helps a buyer understand a practical price range.", tf: true, a: 0,
          w: "Knowing your number before you tour keeps the search on homes you can comfortably afford, and makes your offer more credible." },
        { q: "What is hand money?", o: ["Your down payment at settlement", "A fee paid to the home inspector", "A deposit that shows the buyer is serious", "Cash the seller gives you at closing"], a: 2,
          w: "Hand money, also called earnest money, is a deposit made as part of the purchase agreement. In average market conditions it's about 2% of the price, and it often goes higher when there are multiple offers." },
        { q: "Hand money is automatically lost if the sale falls through.", tf: true, a: 1,
          w: "Not automatically. Hand money is governed by the agreement and its contingency terms, so know when it may be refundable or at risk before you sign." },
        { q: "What is appraisal gap coverage?", o: ["Buyer funds that may cover a low-appraisal shortfall", "Insurance that pays if the home loses value", "A seller credit for a low appraisal", "The fee the appraiser charges"], a: 0,
          w: "Say you offer $400,000 and the home appraises at $390,000. If you committed to $10,000 of appraisal gap coverage, you may need to bring that extra cash, subject to the exact contract terms." },
        { q: "What usually comes first when you buy a home?", o: ["Tour homes", "Submit an offer", "Meet with your agent and plan the search", "Schedule inspections"], a: 2,
          w: "The usual order: meet your agent, review budget and preapproval, tour homes, submit and negotiate an offer, sign the agreement, finish inspections and contingencies, final walkthrough, then settlement and keys. Your timeline can shift with the contract and financing." },
        { q: "What happens right before settlement and getting your keys?", o: ["The home inspection", "The final walkthrough", "Preapproval", "Offer negotiation"], a: 1,
          w: "The final walkthrough is your last visit to check the home before closing. It comes after inspections and contingencies are wrapped up." },
        { q: "Inspection and appraisal protections can affect how strong your offer looks.", tf: true, a: 0,
          w: "Sellers weigh contingencies along with price. More protection for you can read as more risk to the seller, so choose terms you can comfortably honor." },
        { q: "What is a contingency?", o: ["A backup offer", "A type of mortgage", "A contract condition with defined rights", "The seller's moving date"], a: 2,
          w: "A contingency is an offer condition that must be satisfied, like an inspection or appraisal. The contract spells out your rights if it isn't met." },
        { q: "Buyers and sellers can negotiate certain closing terms.", tf: true, a: 0,
          w: "Price is only part of it. Settlement date, possession, inclusions and concessions can all be negotiated." },
        { q: "Besides price, what do sellers weigh when comparing offers?", o: ["Financing", "Requested concessions and contingencies", "Timing and the likelihood of closing", "All of these"], a: 3,
          w: "A smart offer is about more than price. Sellers also weigh financing, requested concessions, contingencies, the likelihood of closing and timing." },
        { q: "What are inclusions?", o: ["Closing costs the seller pays", "Items agreed to stay with the property", "Rooms counted in the square footage", "Repairs the buyer asks for"], a: 1,
          w: "Inclusions are things like appliances, light fixtures and window treatments that stay with the home. Confirm them in the written agreement instead of relying on photos or staging." }
      ]
    },
    seller: {
      title: "Test Your Knowledge: Seller",
      sub: "12 quick questions on selling a home.",
      qs: [
        { q: "A seller must always accept the highest offer.", tf: true, a: 1,
          w: "Decisions on accepting, rejecting or countering belong to the seller. Price is one factor next to net proceeds, financing, contingencies and timing." },
        { q: "Offer A is $315,000 but asks you to pay a $9,450 buyer-agent fee and a $5,000 seller assist. Offer B is $310,000 with neither. Which leaves you more before other seller costs?", o: ["Offer A, by $5,000", "They come out even", "Offer B, by $9,450", "Offer A, by $9,450"], a: 2,
          w: "Offer A works out to $300,550 after the fee and the assist. Offer B stays at $310,000, which is $9,450 more. The highest offer isn't always the strongest one." },
        { q: "Your list price guarantees your final sale price.", tf: true, a: 1,
          w: "The final price comes out of offers, negotiation and, for financed buyers, the appraisal. List price is a strategy, not a promise." },
        { q: "You can compare more than one pricing approach before you list.", tf: true, a: 0,
          w: "Matt compares a competitive launch with a market-supported alternative where it makes sense, along with the tradeoffs and estimated net for each." },
        { q: "When should cleaning and landscaping be finished?", o: ["Before the photographer arrives", "On photo day, while the photographer works", "Before the first showing", "After the listing goes live"], a: 0,
          w: "Photography day is not a cleaning, moving or staging day. First impressions start online, so the home needs to be photo-ready before that appointment." },
        { q: "Pricing low guarantees a bidding war.", tf: true, a: 1,
          w: "There's no guarantee. Never price low solely on the assumption that buyers will bid it up, because the risk is that no bidding war shows up." },
        { q: "What are net proceeds?", o: ["The sale price", "Estimated seller funds after costs", "The buyer's down payment", "The appraised value"], a: 1,
          w: "Net proceeds are what you can expect to walk away with after costs. Comparing offers on net, not headline price, shows which one really pays more." },
        { q: "What does a seller assist do to your bottom line?", o: ["Raises your sale price", "Nothing, the lender pays it", "Reduces your proceeds dollar for dollar", "Lowers your property taxes"], a: 2,
          w: "A seller assist is your contribution toward the buyer's allowable expenses. Unless a higher purchase price offsets it, it reduces your proceeds dollar for dollar." },
        { q: "Every house should follow the same listing timeline.", tf: true, a: 1,
          w: "Prep work, photography and launch timing depend on the home and on your plans, so the timeline is built for each listing." },
        { q: "Which is a smart move before you list?", o: ["Wait for the photographer to start cleaning", "Review disclosures and municipal requirements early", "Assume a low price will start a bidding war", "Judge offers only by the headline price"], a: 1,
          w: "Getting disclosures and municipal requirements handled early keeps surprises out of the sale. The other three are common mistakes." },
        { q: "What does possession mean?", o: ["When the listing goes live", "When you sign the listing agreement", "When the buyer can move into the property", "When the appraisal is finished"], a: 2,
          w: "Possession can be at settlement or another agreed time. The best settlement and possession terms are the ones that fit your plans." },
        { q: "What is a seller disclosure?", o: ["A list of recent nearby sales", "A document describing known property conditions", "The buyer's loan approval", "The listing's marketing plan"], a: 1,
          w: "The disclosure tells buyers what you know about the home's condition. Reviewing it early is one of the smart moves before you list." }
      ]
    }
  };

  const TEASER = { q: "The highest offer is always the strongest offer.", tf: true, a: 1,
    w: "Not always. Sellers compare estimated net proceeds, financing, inspections, appraisal, settlement timing and the likelihood of closing, not just the headline price." };

  const DISCLAIMER = "Educational only. The exact contract and your circumstances matter, and this isn't a substitute for professional lending, legal, tax or inspection advice.";
  const L = ["A", "B", "C", "D"];
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const opts = item => item.tf ? ["True", "False"] : item.o;

  /* ---------- markup ---------- */
  const tabs = document.createElement("div");
  tabs.className = "tyk-tabs";
  tabs.innerHTML =
    '<button class="tyk-tab buyer" type="button" data-open="buyer" aria-controls="tyk-panel"><small>Test your knowledge</small>Buyer</button>' +
    '<button class="tyk-tab seller" type="button" data-open="seller" aria-controls="tyk-panel"><small>Test your knowledge</small>Seller</button>';
  tabs.querySelectorAll(".tyk-tab").forEach(b => b.setAttribute("aria-label", "Test Your Knowledge " + b.dataset.open[0].toUpperCase() + b.dataset.open.slice(1)));

  const scrim = document.createElement("div");
  scrim.className = "tyk-scrim";

  const panel = document.createElement("aside");
  panel.className = "tyk-panel";
  panel.id = "tyk-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.setAttribute("aria-labelledby", "tyk-title");
  panel.setAttribute("aria-hidden", "true");
  panel.innerHTML =
    '<div class="tyk-head"><div class="row"><div><h2 id="tyk-title">Test Your Knowledge</h2><p id="tyk-sub"></p></div>' +
    '<button class="tyk-x" type="button" aria-label="Close">&times;</button></div>' +
    '<div class="tyk-nav" role="tablist">' +
    '<button type="button" role="tab" id="tyk-t-buyer" data-view="buyer">Buyer</button>' +
    '<button type="button" role="tab" id="tyk-t-seller" data-view="seller">Seller</button>' +
    '<button type="button" role="tab" id="tyk-t-ask" data-view="ask">Ask Matt a question</button></div></div>' +
    '<div class="tyk-body" id="tyk-body" role="tabpanel" tabindex="-1"></div>' +
    '<div class="tyk-foot"><div class="who"><a href="tel:4125250112">Matt Vogel, Realtor&reg; &middot; 412.525.0112</a>' +
    '<a href="tel:4123661600">Coldwell Banker Realty &middot; 412.366.1600</a></div>' + esc(DISCLAIMER) + '</div>';

  document.body.append(tabs, scrim, panel);
  const body = panel.querySelector("#tyk-body");

  /* ---------- state ---------- */
  const state = { view: "buyer", buyer: { i: 0, score: 0, picked: null }, seller: { i: 0, score: 0, picked: null }, prefill: "", sent: false, lastFocus: null };

  function open(view) {
    state.lastFocus = document.activeElement;
    show(view || state.view);
    panel.classList.add("on"); scrim.classList.add("on");
    panel.setAttribute("aria-hidden", "false");
    document.documentElement.style.overflow = "hidden";
    setTimeout(() => panel.querySelector(".tyk-nav [aria-selected=true]").focus(), 60);
  }
  function close() {
    panel.classList.remove("on"); scrim.classList.remove("on");
    panel.setAttribute("aria-hidden", "true");
    document.documentElement.style.overflow = "";
    if (state.lastFocus && state.lastFocus.focus) state.lastFocus.focus();
  }
  function show(view) {
    state.view = view;
    panel.querySelectorAll(".tyk-nav button").forEach(b => b.setAttribute("aria-selected", b.dataset.view === view));
    body.setAttribute("aria-labelledby", "tyk-t-" + view);
    const t = panel.querySelector("#tyk-title"), s = panel.querySelector("#tyk-sub");
    if (view === "ask") { t.textContent = "Ask Matt a question"; s.textContent = "Real estate question? Matt will get back to you."; renderAsk(); }
    else { t.textContent = QUIZ[view].title; s.textContent = QUIZ[view].sub; renderQuiz(view); }
    body.scrollTop = 0;
  }

  /* ---------- quiz ---------- */
  function answerBlock(item, picked, askable) {
    const right = picked === item.a, o = opts(item);
    return '<div class="tyk-ans" aria-live="polite"><div class="v ' + (right ? "ok" : "no") + '">' + (right ? "Correct" : "Not quite") + '</div>' +
      '<div class="c">Correct answer: <b>' + esc(o[item.a]) + '</b></div><p class="why">' + esc(item.w) + '</p>' +
      (askable ? '<button type="button" class="ask" data-ask>Ask Matt about this &rarr;</button>' : '') + '</div>';
  }
  function optionsBlock(item, picked) {
    const o = opts(item), done = picked !== null;
    return '<div class="tyk-opts' + (item.tf ? " tf" : "") + '">' + o.map((txt, k) => {
      let cls = "tyk-opt";
      if (done) cls += k === item.a ? " right" : k === picked ? " wrong" : " dim";
      const mark = done && k === item.a ? "&#10003;" : done && k === picked ? "&#10005;" : (item.tf ? txt[0] : L[k]);
      return '<button type="button" class="' + cls + '" data-k="' + k + '"' + (done ? " disabled" : "") + '><span class="k" aria-hidden="true">' + mark + '</span><span>' + esc(txt) + '</span></button>';
    }).join("") + '</div>';
  }
  function renderQuiz(view) {
    const st = state[view], qs = QUIZ[view].qs;
    if (st.i >= qs.length) return renderDone(view);
    const item = qs[st.i];
    body.innerHTML =
      '<div class="tyk-prog"><span>Question ' + (st.i + 1) + ' of ' + qs.length + '</span><span>Score ' + st.score + '</span></div>' +
      '<div class="tyk-bar"><i style="width:' + (st.i / qs.length * 100) + '%"></i></div>' +
      '<span class="tyk-kind">' + (item.tf ? "True or false" : "Multiple choice") + '</span>' +
      '<h3 class="tyk-q">' + esc(item.q) + '</h3>' + optionsBlock(item, st.picked) +
      (st.picked !== null ? answerBlock(item, st.picked, true) +
        '<div class="tyk-actions"><button type="button" class="tyk-btn" data-next>' + (st.i + 1 < qs.length ? "Next question" : "See my score") + '</button></div>' : "");
    body.querySelectorAll(".tyk-opt:not([disabled])").forEach(b => b.addEventListener("click", () => {
      st.picked = +b.dataset.k; if (st.picked === item.a) st.score++;
      renderQuiz(view);
      const next = body.querySelector("[data-next]"); if (next) next.focus({ preventScroll: true });
      body.querySelector(".tyk-ans").scrollIntoView({ block: "nearest", behavior: "smooth" });
    }));
    const next = body.querySelector("[data-next]");
    if (next) next.addEventListener("click", () => { st.i++; st.picked = null; renderQuiz(view); body.scrollTop = 0; });
    const ask = body.querySelector("[data-ask]");
    if (ask) ask.addEventListener("click", () => { state.prefill = 'About "' + item.q + '": '; state.sent = false; show("ask"); });
  }
  function renderDone(view) {
    const st = state[view], n = QUIZ[view].qs.length, pct = st.score / n;
    const msg = pct === 1 ? "Perfect score. You know your stuff." : pct >= .75 ? "Nice work. You're ahead of most " + view + "s." : pct >= .5 ? "Solid start. A few things are worth a closer look." : "Good news: this is exactly what Matt walks you through.";
    const other = view === "buyer" ? "seller" : "buyer";
    body.innerHTML = '<div class="tyk-done"><div class="tyk-score">' + st.score + '<small> / ' + n + '</small></div>' +
      '<h3>' + msg + '</h3><p>Questions about your own move? Ask Matt directly.</p>' +
      '<div class="tyk-actions"><button type="button" class="tyk-btn" data-go="ask">Ask Matt a question</button>' +
      '<button type="button" class="tyk-btn ghost" data-redo>Retake</button>' +
      '<button type="button" class="tyk-btn ghost" data-go="' + other + '">Try the ' + other + ' quiz</button></div></div>';
    body.querySelector("[data-redo]").addEventListener("click", () => { Object.assign(st, { i: 0, score: 0, picked: null }); renderQuiz(view); });
    body.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => { if (b.dataset.go === "ask") { state.prefill = ""; state.sent = false; } show(b.dataset.go); }));
  }

  /* ---------- Ask Matt ---------- */
  function renderAsk() {
    if (state.sent) return;
    const role = state.view === "ask" ? "" : state.view;
    body.innerHTML =
      '<form class="tyk-form" novalidate><h3>Ask Matt anything</h3><p>Send your question and contact info. Matt will reply personally.</p>' +
      '<div class="tyk-row2"><div class="tyk-field"><label for="tyk-n">Name</label><input id="tyk-n" name="name" autocomplete="name" required></div>' +
      '<div class="tyk-field"><label for="tyk-p">Phone</label><input id="tyk-p" name="phone" type="tel" autocomplete="tel"></div></div>' +
      '<div class="tyk-field"><label for="tyk-e">Email</label><input id="tyk-e" name="email" type="email" autocomplete="email" required></div>' +
      '<div class="tyk-field"><label for="tyk-r">I\'m</label><select id="tyk-r" name="role">' +
      ['Buying', 'Selling', 'Buying and selling', 'Just curious'].map(v => '<option' + ((role === "buyer" && v === "Buying") || (role === "seller" && v === "Selling") ? " selected" : "") + '>' + v + '</option>').join("") + '</select></div>' +
      '<div class="tyk-field"><label for="tyk-q">Your question</label><textarea id="tyk-q" name="question" required></textarea></div>' +
      '<div class="tyk-err" id="tyk-err" role="alert"></div>' +
      '<div class="tyk-actions" style="margin-top:0"><button class="tyk-btn" type="submit">Send to Matt</button></div>' +
      '<p style="font-size:13px;color:var(--muted)">Prefer to talk? Call or text Matt at <a href="tel:4125250112" style="color:var(--blue);font-weight:600">412.525.0112</a>.</p></form>';
    const f = body.querySelector("form");
    f.question.value = state.prefill;
    f.addEventListener("submit", e => { e.preventDefault(); submit(f); });
  }
  function submit(f) {
    const d = Object.fromEntries(new FormData(f)), err = body.querySelector("#tyk-err");
    d.question = (d.question || "").trim();
    if (!d.name) { err.textContent = "Add your name so Matt knows who's asking."; return f.name.focus(); }
    if (!/^\S+@\S+\.\S+$/.test(d.email || "")) { err.textContent = "Add a valid email so Matt can reply."; return f.email.focus(); }
    if (!d.question) { err.textContent = "Type your question for Matt."; return f.question.focus(); }
    err.textContent = "";
    const subject = "Website question from " + d.name + " (" + d.role + ")";
    const text = "Name: " + d.name + "\nEmail: " + d.email + "\nPhone: " + (d.phone || "") + "\nI'm: " + d.role + "\n\nQuestion:\n" + d.question;
    const done = how => {
      state.sent = true; state.prefill = "";
      body.innerHTML = '<div class="tyk-sent" aria-live="polite"><h3>' + (how === "email" ? "Almost there" : how === "preview" ? "Preview only" : "Sent to Matt") + '</h3><p>' +
        (how === "email" ? "Your email app should open with your question to Matt filled in. Hit send there and he'll be in touch." :
          how === "preview" ? "On the live site, this sends your question and contact info to Matt by email." :
            "Thanks, " + esc(d.name.split(" ")[0]) + ". Matt has your question and will reply at " + esc(d.email) + ".") +
        '</p><div class="tyk-actions" style="justify-content:center"><button type="button" class="tyk-btn ghost" data-again>Ask another question</button></div></div>';
      body.querySelector("[data-again]").addEventListener("click", () => { state.sent = false; renderAsk(); });
    };
    if (CFG.preview) return done("preview");
    if (CFG.endpoint) {
      const btn = f.querySelector("button[type=submit]"); btn.disabled = true; btn.textContent = "Sending...";
      fetch(CFG.endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name: d.name, email: d.email, phone: d.phone, role: d.role, question: d.question, _subject: subject, _replyto: d.email }) })
        .then(r => { if (!r.ok) throw 0; done("sent"); })
        .catch(() => { btn.disabled = false; btn.textContent = "Send to Matt"; err.textContent = "That didn't go through. Try again, or call Matt at 412.525.0112."; });
      return;
    }
    location.href = "mailto:" + CFG.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(text);
    done("email");
  }

  /* ---------- teaser ---------- */
  function renderTeaser(el) {
    const draw = picked => {
      el.innerHTML =
        '<div class="wrap"><div class="card"><div><span class="eyebrow">Test your knowledge</span>' +
        '<h2>How much do you know about <em>real estate?</em></h2>' +
        '<p class="lead">Try one question. Then take the full buyer or seller quiz, 12 questions each, with the answer and a plain-English explanation every time.</p></div>' +
        '<div class="q"><span class="tyk-kind">True or false</span><h3 class="tyk-q">' + esc(TEASER.q) + '</h3>' + optionsBlock(TEASER, picked) +
        (picked !== null ? answerBlock(TEASER, picked, false) +
          '<div class="pick"><h3>Test your knowledge: are you a buyer or a seller?</h3><div class="tyk-actions">' +
          '<button type="button" class="tyk-btn" data-open="buyer">I\'m a buyer</button><button type="button" class="tyk-btn" data-open="seller">I\'m a seller</button></div></div>' : "") +
        '</div></div></div>';
      el.querySelectorAll(".tyk-opt:not([disabled])").forEach(b => b.addEventListener("click", () => draw(+b.dataset.k)));
      el.querySelectorAll("[data-open]").forEach(b => b.addEventListener("click", () => open(b.dataset.open)));
    };
    el.classList.add("tyk-teaser");
    draw(null);
  }

  /* ---------- wiring ---------- */
  tabs.querySelectorAll("[data-open]").forEach(b => b.addEventListener("click", () => open(b.dataset.open)));
  panel.querySelector(".tyk-x").addEventListener("click", close);
  scrim.addEventListener("click", close);
  panel.querySelectorAll(".tyk-nav button").forEach(b => b.addEventListener("click", () => {
    if (b.dataset.view === "ask" && state.view !== "ask") { state.prefill = ""; state.sent = false; }
    show(b.dataset.view);
  }));
  document.addEventListener("keydown", e => {
    if (!panel.classList.contains("on")) return;
    if (e.key === "Escape") return close();
    if (e.key === "Tab") { // keep focus inside the panel
      const f = [...panel.querySelectorAll("button:not([disabled]),a[href],input,select,textarea")].filter(x => x.offsetParent !== null);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  const t = document.getElementById("tyk-teaser"); if (t) renderTeaser(t);
  window.TYK = { open, close };
})();
