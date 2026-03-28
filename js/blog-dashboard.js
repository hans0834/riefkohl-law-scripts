// Riefkohl Law Blog Dashboard v2 - Standalone JS
// BUILD: Generated from blog-dashboard.html. Edit that file, then regenerate this.

(function(){
var path=window.location.pathname;
if(path.indexOf('/blog')!==0||path.length>5&&path.charAt(5)==='/')return;
// Inject template into DOM so getElementById works
var _tplEl = document.createElement("script");
_tplEl.type = "text/html";
_tplEl.id = "rl-bd-template";
_tplEl.textContent = '<div id="rl-blog-dashboard">\n\n  <!-- SKIP LINK -->\n  <a href="#rl-bd-results-grid" class="rl-bd-skip-link">Skip to articles</a>\n\n  <main id="rl-bd-main">\n\n  <!-- HERO -->\n  <section class="rl-bd-hero">\n    <div class="rl-bd-container rl-bd-hero-inner">\n      <h1 class="rl-bd-hero-title">Explore Our Legal Analysis</h1>\n      <p class="rl-bd-hero-subtitle">Case summaries, legal commentary, and practical guidance across our practice areas.</p>\n      <div class="rl-bd-search-wrap">\n        <svg class="rl-bd-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>\n        <input type="search" id="rl-bd-search" class="rl-bd-search-input" placeholder="Search by keyword, topic, or case name..." aria-label="Search blog articles" autocomplete="off" />\n        <button class="rl-bd-search-clear" id="rl-bd-search-clear" aria-label="Clear search" hidden>&times;</button>\n      </div>\n    </div>\n  </section>\n\n  <!-- PRACTICE AREAS -->\n  <section class="rl-bd-topics">\n    <div class="rl-bd-container">\n      <div class="rl-bd-section-header">\n        <h2 class="rl-bd-section-title">Browse by Practice Area</h2>\n      </div>\n      <div class="rl-bd-topics-grid" id="rl-bd-topics-grid"></div>\n    </div>\n  </section>\n\n  <!-- TOOLBAR: FILTERS + LANG + SORT -->\n  <section class="rl-bd-toolbar" id="rl-bd-toolbar">\n    <div class="rl-bd-container rl-bd-toolbar-inner">\n      <div class="rl-bd-toolbar-left">\n        <span class="rl-bd-results-count" id="rl-bd-results-count" role="status"></span>\n        <div class="rl-bd-active-filters" id="rl-bd-active-filters"></div>\n      </div>\n      <div class="rl-bd-toolbar-right">\n        <div class="rl-bd-lang-toggle" role="radiogroup" aria-label="Language filter">\n          <button class="rl-bd-lang-btn rl-bd-lang-active" data-lang="all" role="radio" aria-checked="true">All</button>\n          <button class="rl-bd-lang-btn" data-lang="en" role="radio" aria-checked="false">EN</button>\n          <button class="rl-bd-lang-btn" data-lang="es" role="radio" aria-checked="false">ES</button>\n        </div>\n        <select class="rl-bd-sort" id="rl-bd-sort" aria-label="Sort articles">\n          <option value="newest">Newest</option>\n          <option value="oldest">Oldest</option>\n          <option value="az">A &ndash; Z</option>\n          <option value="za">Z &ndash; A</option>\n        </select>\n      </div>\n    </div>\n  </section>\n\n  <!-- TAG CLOUD -->\n  <section class="rl-bd-tags-section" id="rl-bd-tags-section" hidden>\n    <div class="rl-bd-container">\n      <div class="rl-bd-tag-cloud" id="rl-bd-tag-cloud" role="group" aria-label="Topic tag filters"></div>\n      <button class="rl-bd-tags-toggle" id="rl-bd-tags-toggle" hidden>Show all tags</button>\n    </div>\n  </section>\n\n  <!-- LOADING SKELETON -->\n  <div class="rl-bd-skeleton" id="rl-bd-skeleton">\n    <div class="rl-bd-container rl-bd-skeleton-grid">\n      <div class="rl-bd-sk-card"><div class="rl-bd-sk-bar rl-bd-sk-w30 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w90 rl-bd-sk-h18"></div><div class="rl-bd-sk-bar rl-bd-sk-w70 rl-bd-sk-h18"></div><div class="rl-bd-sk-spacer"></div><div class="rl-bd-sk-bar rl-bd-sk-w100 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w100 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w60 rl-bd-sk-h12"></div><div class="rl-bd-sk-spacer"></div><div class="rl-bd-sk-bar rl-bd-sk-w40 rl-bd-sk-h12"></div></div>\n      <div class="rl-bd-sk-card"><div class="rl-bd-sk-bar rl-bd-sk-w30 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w90 rl-bd-sk-h18"></div><div class="rl-bd-sk-bar rl-bd-sk-w70 rl-bd-sk-h18"></div><div class="rl-bd-sk-spacer"></div><div class="rl-bd-sk-bar rl-bd-sk-w100 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w100 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w60 rl-bd-sk-h12"></div><div class="rl-bd-sk-spacer"></div><div class="rl-bd-sk-bar rl-bd-sk-w40 rl-bd-sk-h12"></div></div>\n      <div class="rl-bd-sk-card"><div class="rl-bd-sk-bar rl-bd-sk-w30 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w90 rl-bd-sk-h18"></div><div class="rl-bd-sk-bar rl-bd-sk-w70 rl-bd-sk-h18"></div><div class="rl-bd-sk-spacer"></div><div class="rl-bd-sk-bar rl-bd-sk-w100 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w100 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w60 rl-bd-sk-h12"></div><div class="rl-bd-sk-spacer"></div><div class="rl-bd-sk-bar rl-bd-sk-w40 rl-bd-sk-h12"></div></div>\n      <div class="rl-bd-sk-card"><div class="rl-bd-sk-bar rl-bd-sk-w30 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w90 rl-bd-sk-h18"></div><div class="rl-bd-sk-bar rl-bd-sk-w70 rl-bd-sk-h18"></div><div class="rl-bd-sk-spacer"></div><div class="rl-bd-sk-bar rl-bd-sk-w100 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w100 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w60 rl-bd-sk-h12"></div><div class="rl-bd-sk-spacer"></div><div class="rl-bd-sk-bar rl-bd-sk-w40 rl-bd-sk-h12"></div></div>\n      <div class="rl-bd-sk-card"><div class="rl-bd-sk-bar rl-bd-sk-w30 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w90 rl-bd-sk-h18"></div><div class="rl-bd-sk-bar rl-bd-sk-w70 rl-bd-sk-h18"></div><div class="rl-bd-sk-spacer"></div><div class="rl-bd-sk-bar rl-bd-sk-w100 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w100 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w60 rl-bd-sk-h12"></div><div class="rl-bd-sk-spacer"></div><div class="rl-bd-sk-bar rl-bd-sk-w40 rl-bd-sk-h12"></div></div>\n      <div class="rl-bd-sk-card"><div class="rl-bd-sk-bar rl-bd-sk-w30 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w90 rl-bd-sk-h18"></div><div class="rl-bd-sk-bar rl-bd-sk-w70 rl-bd-sk-h18"></div><div class="rl-bd-sk-spacer"></div><div class="rl-bd-sk-bar rl-bd-sk-w100 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w100 rl-bd-sk-h12"></div><div class="rl-bd-sk-bar rl-bd-sk-w60 rl-bd-sk-h12"></div><div class="rl-bd-sk-spacer"></div><div class="rl-bd-sk-bar rl-bd-sk-w40 rl-bd-sk-h12"></div></div>\n    </div>\n  </div>\n\n  <!-- RESULTS -->\n  <div class="rl-bd-results-wrap">\n    <div class="rl-bd-container">\n      <div class="rl-bd-results-grid" id="rl-bd-results-grid" role="region" aria-label="Blog post results" aria-live="polite"></div>\n    </div>\n  </div>\n\n  <!-- LOAD MORE -->\n  <div class="rl-bd-load-more-wrap" id="rl-bd-load-more-wrap" hidden>\n    <button class="rl-bd-load-more" id="rl-bd-load-more">Show More Articles</button>\n  </div>\n\n  <!-- PROGRESS -->\n  <div class="rl-bd-progress-wrap" id="rl-bd-progress-wrap" hidden>\n    <div class="rl-bd-container">\n      <div class="rl-bd-progress"><div class="rl-bd-progress-bar" id="rl-bd-progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Article loading progress"></div></div>\n      <span class="rl-bd-progress-text" id="rl-bd-progress-text">Loading articles...</span>\n    </div>\n  </div>\n\n  <!-- CTA -->\n  <section class="rl-bd-cta">\n    <div class="rl-bd-container rl-bd-cta-inner">\n      <div class="rl-bd-cta-left">\n        <h2 class="rl-bd-cta-title">Need Legal Guidance?</h2>\n        <p class="rl-bd-cta-text">Schedule a complimentary strategy call to discuss your matter with our team.</p>\n      </div>\n      <div class="rl-bd-cta-right">\n        <a href="/calendly" class="rl-bd-cta-btn-primary">Book a Free Strategy Call</a>\n        <a href="/contact" class="rl-bd-cta-btn-secondary">Send Us a Message</a>\n      </div>\n    </div>\n  </section>\n\n  </main>\n\n  <!-- BACK TO TOP -->\n  <button class="rl-bd-back-top" id="rl-bd-back-top" aria-label="Back to top">\n    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>\n  </button>';
document.head.appendChild(_tplEl);
function deploy(){
  if(document.getElementById('rl-blog-dashboard'))return;
  var tpl=document.getElementById('rl-bd-template');
  if(!tpl)return;
  var sections=document.getElementById('sections');
  if(!sections)sections=document.querySelector('.blog-basic-grid');
  if(!sections)sections=document.querySelector('[class*="blog"]');
  var wrapper=document.querySelector('.Main-content')||document.querySelector('main')||document.body;
  var d=document.createElement('div');
  d.innerHTML=tpl.textContent;
  var dashboard=d.firstElementChild;
  if(sections){
    sections.parentElement.insertBefore(dashboard,sections);
    sections.style.display='none';
  }else{
    wrapper.insertBefore(dashboard,wrapper.firstChild);
  }
  /* Push dashboard below Squarespace header */
  var siteHeader=document.querySelector('header');
  if(siteHeader){
    var hH=siteHeader.getBoundingClientRect().height;
    if(hH>50)dashboard.style.paddingTop=hH+'px';
  }
(function(){
'use strict';

/* SVG icons (stroke-based, 24x24 viewBox) */
var ICONS={
  scales:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v18M3 7l4 9h0a5 5 0 0 0 10 0h0l4-9"/><circle cx="12" cy="3" r="1"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 5-5"/></svg>',
  building:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 6h2M13 6h2M9 10h2M13 10h2M9 14h2M13 14h2M9 18h6"/></svg>',
  clipboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 2h6v3H9zM9 10h6M9 14h4"/></svg>',
  document:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/></svg>',
  columns:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 21V7l2-4h12l2 4v14"/><path d="M4 7h16"/><path d="M8 7v14M12 7v14M16 7v14"/></svg>',
  gavel:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.5 3.5l6 6M10 8l6 6M4 20l8-8"/><path d="M2 22h8"/></svg>',
  arrowUp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20V4M5 11l7-7 7 7"/></svg>',
  briefcase:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v2"/></svg>',
  books:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z"/></svg>',
  shield:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
};

var CFG={
  API:'/blog',FMT:'?format=json',PG_SZ:20,INIT_SHOW:12,MORE:12,DEBOUNCE:300,
  FETCH_DELAY:120,MAX_RETRIES:5,EXCERPT_MAX:250,
  CACHE_KEY:'rl_bd_v4',CACHE_TTL:30*60*1000,CACHE_MAX:4*1024*1024,
  ES_TAGS:['espa\u00f1ol','español'],ES_CATS:['Cobro de Dinero','Hogar Seguro','Fideicomisos','Planificaci\u00f3n Sucesoral','Ley 60','Incentivos Contributivos'],
  CATS:[
    {k:'Trusts',l:'Trusts & Fideicomisos',i:ICONS.shield,s:['Trusts','Fideicomisos','Trust Law','Trust Law Controversies']},
    {k:'Estate Planning',l:'Estate Planning',i:ICONS.home,s:['Estate Planning','Planificaci\u00f3n Sucesoral','Estate Litigation','Wills and Estate Planning Controversies \u2014 Case Analysis','Wills and Estate Planning Controversies \u2014 Case Summaries']},
    {k:'Act 60',l:'Act 60 / Ley 60',i:ICONS.sun,s:['Act 60 Tax Incentives','Ley 60','Incentivos Contributivos']},
    {k:'Government Contracts',l:'Government Contracts',i:ICONS.scales,s:['Government Contracts','Procurement and Government Contracting','Puerto Rico Law Controversies']},
    {k:'Bankruptcy',l:'Bankruptcy',i:ICONS.chart,s:['Bankruptcy']},
    {k:'Corporate Law',l:'Corporate Law',i:ICONS.building,s:['Corporate Law','Business Law and Estate Planning Controversies']},
    {k:'Corporate Governance',l:'Corporate Governance',i:ICONS.clipboard,s:['Corporate Governance']},
    {k:'Contract Law',l:'Contract Law',i:ICONS.document,s:['Contract Law','Contracts']},
    {k:'Constitutional Law',l:'Constitutional Law',i:ICONS.columns,s:['Constitutional Law']},
    {k:'Federal Courts',l:'Federal Courts',i:ICONS.gavel,s:['Federal Courts']},
    {k:'Appeals',l:'Appeals',i:ICONS.arrowUp,s:['Appeals']},
    {k:'LLC',l:'LLC',i:ICONS.briefcase,s:['LLC']},
    {k:'Case Analysis',l:'Case Analysis',i:ICONS.scales,s:['Case Analysis','An\u00e1lisis de Casos']},
    {k:'Other',l:'Additional Topics',i:ICONS.books,s:['Marijuana Law','Cobro de Dinero','Hogar Seguro','Other']}
  ],
  TAGS_COLLAPSED:10,TAGS_EXPANDED:20
};

var S={allPosts:[],filtered:[],shown:0,loading:false,done:false,nextOff:null,total:0,
  cat:null,tags:{},q:'',lang:'all',sort:'newest',tagsExpanded:false};

var D={},ROOT;
function $(id){return document.getElementById(id)}
function $$(sel,ctx){return(ctx||ROOT).querySelectorAll(sel)}

var _escMap={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return _escMap[c]})}
function escRx(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
var _stripEl;
function strip(h){if(!_stripEl)_stripEl=document.createElement('div');_stripEl.innerHTML=h;var t=(_stripEl.textContent||_stripEl.innerText||'').trim();_stripEl.innerHTML='';return t}
function fmtDate(ts){var d=new Date(ts),m=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];return m[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear()}

/* DATA */
var Data={
  fetchPg:function(off){var u=CFG.API+CFG.FMT;if(off)u+='&offset='+off;return fetch(u).then(function(r){if(!r.ok)throw new Error('API '+r.status);return r.json()})},
  init:function(){
    S.loading=true;D.skeleton.hidden=false;D.resultsGrid.style.display='none';
    var c=this.loadCache();
    if(c){S.allPosts=c.posts;S.total=c.posts.length;S.done=true;S.loading=false;this.ready();return Promise.resolve()}
    var self=this;
    return this.fetchPg(null).then(function(d){
      S.total=d.collection?d.collection.itemCount:S.allPosts.length;
      S.allPosts=self.norm(d.items||[]);
      S.nextOff=(d.pagination&&d.pagination.nextPage)?d.pagination.nextPageOffset:null;
      S.loading=false;self.ready();self.fetchRest()
    }).catch(function(e){
      console.error('Blog dashboard error:',e);S.loading=false;
      D.skeleton.hidden=true;D.resultsGrid.style.display='';
      D.resultsGrid.innerHTML='<div class="rl-bd-empty"><p>Unable to load articles. Please refresh the page.</p></div>'
    })
  },
  ready:function(){
    D.skeleton.hidden=true;D.resultsGrid.style.display='';
    R.topics();R.tags();Filt.apply()
  },
  fetchRest:function(){
    if(!S.nextOff){S.done=true;this.saveCache();R.hideProg();R.topicCounts();return}
    D.progressWrap.hidden=false;var self=this,retries=0;
    function go(){
      if(!S.nextOff){S.done=true;self.saveCache();R.hideProg();R.topicCounts();Filt.apply();return}
      self.fetchPg(S.nextOff).then(function(d){
        retries=0;
        S.allPosts=S.allPosts.concat(self.norm(d.items||[]));
        S.nextOff=(d.pagination&&d.pagination.nextPage)?d.pagination.nextPageOffset:null;
        R.prog(S.allPosts.length,S.total);R.topicCounts();
        setTimeout(go,CFG.FETCH_DELAY)
      }).catch(function(){
        retries++;
        if(retries>=CFG.MAX_RETRIES){
          S.done=true;self.saveCache();R.hideProg();R.topicCounts();Filt.apply();
          console.warn('Blog dashboard: stopped after '+CFG.MAX_RETRIES+' failures');
          return;
        }
        setTimeout(go,Math.min(2000*Math.pow(2,retries),30000))
      })
    }
    go()
  },
  _autoCat:function(title,slug,ex){
    var ts=(title+' '+slug).toLowerCase(),s=(ts+' '+ex).toLowerCase();
    /* Pass 1: title+slug only (high confidence) */
    if(/trust|fideicomis|fiduciar|settlor|trustee|revocabl|irrevocabl|no.contest|cy.pres|spendthrift/.test(ts))return['Trusts'];
    if(/estate|probate|wills? |inheritance|heir|intestat|decedent|sucesoral|executor|testat|bequest|per.capita|undue.influence|declaratoria.*herederos/.test(ts))return['Estate Planning'];
    if(/act.60|ley.60|decreto|irs.*scrutiny.*act|incentivo.*contributiv/i.test(ts))return['Act 60 Tax Incentives'];
    if(/bankrupt|chapter.11|insolvenc/i.test(ts))return['Bankruptcy'];
    if(/corporate|shareholder|\bllc\b|partnership|business.*law|deadlock|dissolution|merger|earnout|restrictive.covenant|private.equity/i.test(ts))return['Corporate Law'];
    if(/government.*contract|procurement|bid.protest|contract.*award|offeror|subcontract|a&e.service/i.test(ts))return['Government Contracts'];
    if(/prlaw-|private.operator|dual.tracking|motor.vehicle.warranty|public.information.access/i.test(ts))return['Government Contracts'];
    if(/contract.*law|breach.*contract|contract.*dispute/i.test(ts))return['Contract Law'];
    if(/constitutional|due.process|equal.protection|first.amendment/i.test(ts))return['Constitutional Law'];
    if(/municipio|bayam/i.test(ts))return['Corporate Law'];
    /* Pass 2: title+slug+excerpt (lower confidence, stricter patterns) */
    if(/trust|fideicomis|fiduciar|settlor|trustee|revocabl|irrevocabl/.test(s))return['Trusts'];
    if(/estate.plan|probate|inheritance|intestat|sucesoral|testat/.test(s))return['Estate Planning'];
    if(/bankrupt|chapter.11|insolvenc/i.test(s))return['Bankruptcy'];
    if(/corporate.govern|shareholder.dispute|merger.agreement/i.test(s))return['Corporate Law'];
    /* Pass 3: case name patterns — default to Trusts for "v." cases */
    if(/\bv\b\.|v\.\s/.test(title)||/et.al/.test(title))return['Trusts'];
    return['Trusts'];
  },
  norm:function(items){
    var self=this;
    return items.map(function(it){
      var cats=it.categories||[],tags=(it.tags||[]).map(function(t){return t.trim()}),
        tl=tags.map(function(t){return t.toLowerCase()}),
        ex=it.excerpt?strip(it.excerpt):(it.body?strip(it.body).substring(0,CFG.EXCERPT_MAX)+'...':''),
        isSp=tl.some(function(t){return CFG.ES_TAGS.indexOf(t)>=0})||cats.some(function(c){return CFG.ES_CATS.indexOf(c)>=0});
      if(cats.length===0&&(it.title||'').length>0){cats=self._autoCat(it.title||'',it.urlId||'',ex)}
      return{id:it.id,title:it.title||'',slug:it.urlId||'',url:it.fullUrl||'/blog/'+(it.urlId||''),
        date:it.publishOn||0,dateFmt:fmtDate(it.publishOn||0),cats:cats,tags:tags,tl:tl,
        ex:ex,sp:isSp,_s:[it.title||'',cats.join(' '),tags.join(' '),ex].join(' ').toLowerCase()}
    })
  },
  saveCache:function(){
    try{
      var slim=S.allPosts.map(function(p){
        return{id:p.id,title:p.title,slug:p.slug,url:p.url,date:p.date,dateFmt:p.dateFmt,
          cats:p.cats,tags:p.tags,tl:p.tl,ex:p.ex,sp:p.sp}
      });
      var data=JSON.stringify({posts:slim,ts:Date.now()});
      if(data.length>CFG.CACHE_MAX)return;
      sessionStorage.setItem(CFG.CACHE_KEY,data)
    }catch(e){}
  },
  loadCache:function(){
    try{var r=sessionStorage.getItem(CFG.CACHE_KEY);if(!r)return null;
      var d=JSON.parse(r);if(Date.now()-d.ts>CFG.CACHE_TTL){sessionStorage.removeItem(CFG.CACHE_KEY);return null}
      d.posts.forEach(function(p){p._s=[p.title,p.cats.join(' '),p.tags.join(' '),p.ex].join(' ').toLowerCase()});
      return d
    }catch(e){return null}
  }
};

/* SEARCH */
var stimer=null;
var Srch={
  input:function(q){clearTimeout(stimer);stimer=setTimeout(function(){S.q=q.trim().toLowerCase();HashState.push();Filt.apply()},CFG.DEBOUNCE)},
  score:function(p,q){
    if(!q)return 1;var terms=q.split(/\s+/).filter(Boolean),tot=0;
    for(var i=0;i<terms.length;i++){var t=terms[i],s=0,tl=p.title.toLowerCase();
      if(tl.indexOf(t)>=0){s+=10;if(tl.indexOf(t)===0)s+=5}
      if(p.cats.some(function(c){return c.toLowerCase().indexOf(t)>=0}))s+=8;
      if(p.tl.some(function(x){return x.indexOf(t)>=0}))s+=7;
      if(s===0&&p._s.indexOf(t)>=0)s+=3;if(s===0)return 0;tot+=s}
    return tot
  }
};

/* FILTER */
var Filt={
  apply:function(){
    var p=S.allPosts;
    if(S.lang==='es')p=p.filter(function(x){return x.sp});
    else if(S.lang==='en')p=p.filter(function(x){return !x.sp});
    if(S.cat){var cfg=CFG.CATS.find(function(c){return c.k===S.cat}),src=cfg?cfg.s:[S.cat];
      p=p.filter(function(x){return x.cats.some(function(c){return src.indexOf(c)>=0})})}
    var ak=Object.keys(S.tags).filter(function(k){return S.tags[k]});
    if(ak.length)p=p.filter(function(x){return ak.every(function(t){return x.tl.indexOf(t.toLowerCase())>=0})});
    if(S.q){p=p.map(function(x){return{p:x,sc:Srch.score(x,S.q)}}).filter(function(r){return r.sc>0}).sort(function(a,b){return b.sc-a.sc}).map(function(r){return r.p})}
    else{p=this.srt(p,S.sort)}
    S.filtered=p;S.shown=0;
    R.count(p.length);R.chips();R.tags();R.cards(true)
  },
  srt:function(p,by){var s=p.slice();switch(by){
    case'newest':return s.sort(function(a,b){return b.date-a.date});
    case'oldest':return s.sort(function(a,b){return a.date-b.date});
    case'az':return s.sort(function(a,b){return a.title.localeCompare(b.title)});
    case'za':return s.sort(function(a,b){return b.title.localeCompare(a.title)});
    default:return s}}
};

/* URL HASH */
var HashState={
  push:function(){var p=[];
    if(S.cat)p.push('cat='+encodeURIComponent(S.cat));
    var tk=Object.keys(S.tags).filter(function(k){return S.tags[k]});
    if(tk.length)p.push('tags='+tk.map(encodeURIComponent).join(','));
    if(S.q)p.push('q='+encodeURIComponent(S.q));
    if(S.lang!=='all')p.push('lang='+S.lang);
    if(S.sort!=='newest')p.push('sort='+S.sort);
    try{history.replaceState(null,'',p.length?'#'+p.join('&'):location.pathname+location.search)}catch(e){}
  },
  read:function(){var h=location.hash.slice(1);if(!h)return;var p=new URLSearchParams(h);
    if(p.has('cat'))S.cat=p.get('cat');
    if(p.has('tags'))p.get('tags').split(',').forEach(function(t){if(t)S.tags[decodeURIComponent(t)]=true});
    if(p.has('q')){S.q=p.get('q');D.search.value=p.get('q')}
    if(p.has('lang'))S.lang=p.get('lang');
    if(p.has('sort')){S.sort=p.get('sort');D.sortSel.value=S.sort}
  },
  listen:function(){window.addEventListener('hashchange',function(){
    S.cat=null;S.tags={};S.q='';S.lang='all';S.sort='newest';
    HashState.read();R.sync();Filt.apply()
  })}
};

/* RENDER */
var R={
  topics:function(){
    var h='';CFG.CATS.forEach(function(cat){
      var n=0;S.allPosts.forEach(function(p){if(p.cats.some(function(c){return cat.s.indexOf(c)>=0}))n++});
      h+='<button class="rl-bd-topic-card" data-cat="'+esc(cat.k)+'" aria-pressed="'+(S.cat===cat.k?'true':'false')+'">'
        +'<span class="rl-bd-topic-icon" aria-hidden="true">'+cat.i+'</span>'
        +'<span class="rl-bd-topic-info"><span class="rl-bd-topic-name">'+esc(cat.l)+'</span>'
        +'<span class="rl-bd-topic-count" data-ck="'+esc(cat.k)+'">'+n+' article'+(n!==1?'s':'')+'</span></span></button>'
    });
    D.topicsGrid.innerHTML=h;
    D.topicsGrid.setAttribute('role','toolbar');
    D.topicsGrid.setAttribute('aria-label','Filter by topic');
    var topicBtns=$$('.rl-bd-topic-card',D.topicsGrid);
    topicBtns.forEach(function(b,i){
      b.addEventListener('click',function(){
        var c=b.getAttribute('data-cat');S.cat=S.cat===c?null:c;
        topicBtns.forEach(function(x){x.setAttribute('aria-pressed',x.getAttribute('data-cat')===S.cat?'true':'false')});
        HashState.push();Filt.apply();
        announceResults()
      });
      /* Arrow key navigation within topic grid */
      b.addEventListener('keydown',function(e){
        var idx=-1;
        if(e.key==='ArrowRight'||e.key==='ArrowDown')idx=(i+1)%topicBtns.length;
        else if(e.key==='ArrowLeft'||e.key==='ArrowUp')idx=(i-1+topicBtns.length)%topicBtns.length;
        if(idx>=0){e.preventDefault();topicBtns[idx].focus()}
      })
    })
  },
  topicCounts:function(){
    CFG.CATS.forEach(function(cat){
      var n=0;S.allPosts.forEach(function(p){if(p.cats.some(function(c){return cat.s.indexOf(c)>=0}))n++});
      var el=D.topicsGrid.querySelector('[data-ck="'+cat.k+'"]');
      if(el)el.textContent=n+' article'+(n!==1?'s':'')
    })
  },
  tags:function(){
    var pool=S.allPosts;
    if(S.cat){var cfg=CFG.CATS.find(function(c){return c.k===S.cat}),src=cfg?cfg.s:[S.cat];
      pool=pool.filter(function(p){return p.cats.some(function(c){return src.indexOf(c)>=0})})}
    var ct={};pool.forEach(function(p){p.tags.forEach(function(t){
      var k=t.toLowerCase();if(CFG.ES_TAGS.indexOf(k)>=0)return;
      if(!ct[k])ct[k]={l:t,n:0};ct[k].n++
    })});
    var allKeys=Object.keys(ct).sort(function(a,b){return ct[b].n-ct[a].n});
    var limit=S.tagsExpanded?CFG.TAGS_EXPANDED:CFG.TAGS_COLLAPSED;
    var sorted=allKeys.slice(0,limit);
    if(!sorted.length){D.tagsSection.hidden=true;return}
    D.tagsSection.hidden=false;
    var ak=Object.keys(S.tags).filter(function(k){return S.tags[k]});
    var h='';sorted.forEach(function(k){var tg=ct[k],act=ak.some(function(t){return t.toLowerCase()===k});
      h+='<button class="rl-bd-tag-btn" data-tag="'+esc(tg.l)+'" aria-pressed="'+(act?'true':'false')+'" title="'+tg.n+' article'+(tg.n!==1?'s':'')+'">'
        +esc(tg.l)+'</button>'
    });
    D.tagCloud.innerHTML=h;
    /* show/hide toggle */
    if(allKeys.length>CFG.TAGS_COLLAPSED){
      D.tagsToggle.hidden=false;
      D.tagsToggle.textContent=S.tagsExpanded?'Show fewer tags':'Show all tags ('+allKeys.length+')'
    }else{D.tagsToggle.hidden=true}
    $$('.rl-bd-tag-btn',D.tagCloud).forEach(function(b){
      b.addEventListener('click',function(){var t=b.getAttribute('data-tag');
        if(S.tags[t])delete S.tags[t];else S.tags[t]=true;
        b.setAttribute('aria-pressed',S.tags[t]?'true':'false');HashState.push();Filt.apply()})
    })
  },
  chips:function(){
    var ch=[];
    if(S.cat){var cfg=CFG.CATS.find(function(c){return c.k===S.cat});ch.push({l:cfg?cfg.l:S.cat,t:'cat'})}
    Object.keys(S.tags).filter(function(k){return S.tags[k]}).forEach(function(t){ch.push({l:t,t:'tag',v:t})});
    if(S.lang!=='all')ch.push({l:S.lang==='en'?'English':'Espa\u00f1ol',t:'lang'});
    if(S.q)ch.push({l:'\u201C'+S.q+'\u201D',t:'q'});
    if(!ch.length){D.activeFilters.innerHTML='';return}
    var h='';ch.forEach(function(c){
      h+='<span class="rl-bd-filter-chip">'+esc(c.l)
        +'<button class="rl-bd-chip-x" data-t="'+c.t+'"'+(c.v?' data-v="'+esc(c.v)+'"':'')
        +' aria-label="Remove '+esc(c.l)+'">\u00D7</button></span>'
    });
    h+='<button class="rl-bd-chip-x" style="font-size:.72rem;color:var(--gold-dark);padding:3px 6px;font-weight:600" id="rl-bd-clear-chips">Clear all</button>';
    D.activeFilters.innerHTML=h;
    $$('.rl-bd-chip-x',D.activeFilters).forEach(function(b){
      b.addEventListener('click',function(){
        var t=b.getAttribute('data-t');
        if(b.id==='rl-bd-clear-chips'){clearAll();return}
        if(t==='cat'){S.cat=null;$$('.rl-bd-topic-card',D.topicsGrid).forEach(function(x){x.setAttribute('aria-pressed','false')})}
        else if(t==='tag')delete S.tags[b.getAttribute('data-v')];
        else if(t==='lang'){S.lang='all';$$('.rl-bd-lang-btn',ROOT).forEach(function(x){x.classList.toggle('rl-bd-lang-active',x.getAttribute('data-lang')==='all');x.setAttribute('aria-checked',x.getAttribute('data-lang')==='all'?'true':'false')})}
        else if(t==='q'){S.q='';D.search.value='';D.searchClear.hidden=true}
        HashState.push();Filt.apply()
      })
    })
  },
  cards:function(reset){
    if(reset){D.resultsGrid.innerHTML='';S.shown=0}
    var batch=S.filtered.slice(S.shown,S.shown+CFG.MORE);
    if(!batch.length&&!S.shown){this.empty();D.loadMoreWrap.hidden=true;return}
    var frag=document.createDocumentFragment();
    batch.forEach(function(p){
      var card=document.createElement('article');card.className='rl-bd-post-card';
      var top='<div class="rl-bd-post-card-top">';
      if(p.cats.length)top+='<span class="rl-bd-post-cat">'+esc(p.cats[0])+'</span>';
      if(p.sp)top+='<span class="rl-bd-post-lang">ES</span>';
      top+='</div>';
      var tt=S.q?hlMatch(p.title):esc(p.title);
      var ex=S.q?hlMatch(p.ex):esc(p.ex);
      var tgs='';if(p.tags.length){var dt=p.tags.filter(function(t){return CFG.ES_TAGS.indexOf(t.toLowerCase())<0}).slice(0,3);
        if(dt.length)tgs='<div class="rl-bd-post-tags">'+dt.map(function(t){return'<span class="rl-bd-post-tag">'+esc(t)+'</span>'}).join('')+'</div>'}
      card.innerHTML=top
        +'<h3 class="rl-bd-post-title"><a href="'+esc(p.url)+'">'+tt+'</a></h3>'
        +'<p class="rl-bd-post-excerpt">'+ex+'</p>'
        +'<div class="rl-bd-post-footer"><time class="rl-bd-post-date" datetime="'+new Date(p.date).toISOString()+'">'+p.dateFmt+'</time>'+tgs+'</div>'
        +'<a href="'+esc(p.url)+'" class="rl-bd-read-link" aria-label="Read: '+esc(p.title)+'">Read article <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>';
      frag.appendChild(card)
    });
    D.resultsGrid.appendChild(frag);S.shown+=batch.length;
    var remaining=S.filtered.length-S.shown;
    D.loadMoreWrap.hidden=remaining<=0;
    if(remaining>0)D.loadMore.textContent='Show More Articles ('+remaining+' remaining)'
  },
  empty:function(){
    var note=S.done?'':'<p style="font-size:.8rem;color:var(--warm-400);font-style:italic;margin-top:8px">Still loading more articles\u2026</p>';
    D.resultsGrid.innerHTML='<div class="rl-bd-empty">'
      +'<p>No articles found matching your filters.</p>'
      +'<button class="rl-bd-empty-clear" id="rl-bd-empty-clr">Clear All Filters</button>'+note
      +'<p style="margin-top:20px;font-size:.88rem">Can\u2019t find what you\u2019re looking for? <a href="/contact" style="color:var(--gold-dark);font-weight:600;text-decoration:underline">Contact us</a></p></div>';
    var cb=$('rl-bd-empty-clr');if(cb)cb.addEventListener('click',clearAll)
  },
  count:function(n){var t=n===1?'1 article':n+' articles';var l=S.done?'':' (loading\u2026)';D.resultsCount.textContent=t+l},
  prog:function(ld,tot){var pct=Math.min(Math.round(ld/tot*100),100);D.progressBar.style.width=pct+'%';D.progressBar.setAttribute('aria-valuenow',pct);D.progressText.textContent='Loaded '+ld+' of '+tot},
  hideProg:function(){D.progressWrap.hidden=true},
  sync:function(){
    $$('.rl-bd-lang-btn',ROOT).forEach(function(b){var a=b.getAttribute('data-lang')===S.lang;b.classList.toggle('rl-bd-lang-active',a);b.setAttribute('aria-checked',a?'true':'false')});
    D.sortSel.value=S.sort;D.search.value=S.q||'';D.searchClear.hidden=!S.q;
    $$('.rl-bd-topic-card',D.topicsGrid).forEach(function(b){b.setAttribute('aria-pressed',b.getAttribute('data-cat')===S.cat?'true':'false')})
  }
};

function hlMatch(t){if(!S.q)return esc(t);var terms=S.q.split(/\s+/).filter(Boolean),r=esc(t);
  terms.forEach(function(tm){r=r.replace(new RegExp('('+escRx(tm)+')','gi'),'<mark class="rl-bd-hl">$1</mark>')});return r}

function clearAll(){
  S.cat=null;S.tags={};S.q='';S.lang='all';S.sort='newest';
  D.search.value='';D.searchClear.hidden=true;D.sortSel.value='newest';
  $$('.rl-bd-lang-btn',ROOT).forEach(function(b){b.classList.toggle('rl-bd-lang-active',b.getAttribute('data-lang')==='all');b.setAttribute('aria-checked',b.getAttribute('data-lang')==='all'?'true':'false')});
  $$('.rl-bd-topic-card',D.topicsGrid).forEach(function(b){b.setAttribute('aria-pressed','false')});
  HashState.push();Filt.apply()
}

/* Screen reader live region for filter result announcements */
var liveRegion;
function announceResults(){
  if(!liveRegion){
    liveRegion=document.createElement('div');
    liveRegion.setAttribute('role','status');
    liveRegion.setAttribute('aria-live','polite');
    liveRegion.setAttribute('aria-atomic','true');
    liveRegion.className='rl-sr-only';
    ROOT.appendChild(liveRegion);
  }
  var n=S.filtered.length;
  var msg=n===1?'1 article found':n+' articles found';
  if(S.cat)msg+=', filtered by '+S.cat;
  liveRegion.textContent=msg;
}

function bind(){
  D.search.addEventListener('input',function(e){Srch.input(e.target.value);D.searchClear.hidden=!e.target.value});
  D.searchClear.addEventListener('click',function(){D.search.value='';D.searchClear.hidden=true;S.q='';HashState.push();Filt.apply();announceResults()});
  D.search.addEventListener('keydown',function(e){if(e.key==='Escape'){D.search.value='';D.search.blur();D.searchClear.hidden=true;S.q='';HashState.push();Filt.apply()}});
  $$('.rl-bd-lang-btn',ROOT).forEach(function(b){b.addEventListener('click',function(){
    S.lang=b.getAttribute('data-lang');
    $$('.rl-bd-lang-btn',ROOT).forEach(function(x){x.classList.toggle('rl-bd-lang-active',x===b);x.setAttribute('aria-checked',x===b?'true':'false')});
    HashState.push();Filt.apply();announceResults()
  })});
  D.sortSel.addEventListener('change',function(e){S.sort=e.target.value;HashState.push();Filt.apply();announceResults()});
  D.loadMore.addEventListener('click',function(){R.cards(false)});
  D.tagsToggle.addEventListener('click',function(){S.tagsExpanded=!S.tagsExpanded;R.tags()});
  /* back to top */
  var backBtn=$('rl-bd-back-top');
  if(backBtn&&'IntersectionObserver' in window){
    var obs=new IntersectionObserver(function(entries){backBtn.setAttribute('data-visible',entries[0].isIntersecting?'false':'true')},{threshold:0});
    obs.observe(D.toolbar);
    backBtn.addEventListener('click',function(){window.scrollTo({top:ROOT.offsetTop,behavior:'smooth'})})
  }
}

function init(){
  ROOT=$('rl-blog-dashboard');
  D.search=$('rl-bd-search');D.searchClear=$('rl-bd-search-clear');
  D.topicsGrid=$('rl-bd-topics-grid');D.tagCloud=$('rl-bd-tag-cloud');D.tagsSection=$('rl-bd-tags-section');
  D.tagsToggle=$('rl-bd-tags-toggle');D.toolbar=$('rl-bd-toolbar');
  D.activeFilters=$('rl-bd-active-filters');D.resultsCount=$('rl-bd-results-count');
  D.sortSel=$('rl-bd-sort');D.resultsGrid=$('rl-bd-results-grid');
  D.loadMoreWrap=$('rl-bd-load-more-wrap');D.loadMore=$('rl-bd-load-more');
  D.progressWrap=$('rl-bd-progress-wrap');D.progressBar=$('rl-bd-progress-bar');
  D.progressText=$('rl-bd-progress-text');D.skeleton=$('rl-bd-skeleton');
  HashState.read();R.sync();bind();HashState.listen();Data.init()
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',deploy);else deploy();
})();
