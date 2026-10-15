const zones = /\b(?:UTC|GMT|WAT|ET|PT|EST|EDT|PST|PDT|CST|CDT|IST|CET|CEST|BST|MSK|PKT|JST|AEST|local time|Eastern|Pacific|Central European)\b|[+-]\d{2}:?\d{2}/i;
const dates = /\b(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\s+\d{1,2}\b|\b\d{1,2}\/\d{1,2}\b|\b\d{4}-\d{2}-\d{2}\b/i;
const obligation = /\b(?:must|shall|required|mandatory|need to|have to|may not|not allowed|not eligible|ineligible|prohibited|excluded|not be a mere|no more than|at most)\b/i;
const directive = /^(?:please\s+)?(?:submit|provide|include|upload|ensure|record|register|attach|present|explain|communicate|reflect|show|meet|satisfy|sign up|do not|don't|not be)\b/i;
const listIntro = /\b(?:must|shall)\s+(?:include|submit|provide)\b.*:$|\b(?:minimum|submissions? should|to be eligible).*\b(?:must|should)\s*:$|^(?:required (?:materials|deliverables|documents)|what to submit|submission requirements)\s*:?$/i;
const excludedSection = /^(?:\d+[.)]\s*)?(?:judging(?: and evaluation)?|judging criteria|grants?|prizes?|resources(?: and tools)?|helpful resources|midnight build club|why (?:join|teams should join)|about the program|what is .+|for business|for developers)\s*:?$/i;
const clean = s=>s.replace(/^\s*[-*•]\s+/,'').replace(/^[\s#*•✅📏📦🌊🧭📚🎥🚀👉🌙✨🌑💬]+/u,'').replace(/^\d+[.)]\s+/,'').trim();
const normalized = s=>s.toLowerCase().replace(/[*_]/g,'').replace(/[.!:]$/,'').replace(/\s+/g,' ').trim();

function classify(text) {
 if(/\b(?:deadline|due)\b|submission period|submissions? (?:close|end)|register by|submit (?:by|before)/i.test(text))return 'Deadline';
 if(/\brepositor|\bgithub|\bgitlab|\blicen[cs]e|\bsource code|\bREADME\b/i.test(text))return 'Code';
 if(/\b(?:video|demo|presentation|slide deck|pitch)\b/i.test(text))return 'Demo';
 if(/\beligib|\bage\b|\bstudents?|\bresiden|\bcountries|\bcountry|\bteams?|\bmembers?|\bparticipants?|\byears old|\bexcluded|\bsanction/i.test(text))return 'Eligibility';
 if(/\b(?:API|SDK|framework|tool|OpenCV|AWS|Node|skill pack|MCP|Compact|contract)\b/i.test(text))return 'Tools';
 if(/\bsubmit|\bsubmission|\bupload|\bdescription|\bprogress/i.test(text))return 'Submission';
 return 'Requirement';
}

function contentLines(brief) {
 const lines=brief.split(/\r?\n/).map(s=>s.trim());
 // Navigation labels do not end content; a dated comment feed does.
 const feed=lines.findIndex((line,index)=>/^comments(?:\s*\(\d+\))?$/i.test(clean(line))&&lines.slice(index+1,index+10).some(s=>/^\d{4}-\d{2}-\d{2}\s+\d{1,2}:\d{2}/.test(s)));
 return feed<0?lines:lines.slice(0,feed);
}

export function extractRequirements(brief) {
 if(typeof brief!=='string')throw new TypeError('Brief must be text.');
 const lines=contentLines(brief);const items=[];const seen=new Set();
 const rulesStart=lines.findIndex(s=>/^(?:official\s+)?rules\s*:?$/i.test(clean(s)));
 let section='';let inherited='';let tableHeader='';
 function add(title,source,category,flags=[]) {
  const key=normalized(title).replace(/^(?:each submission|the project|your project|each project) must /,'').replace(/^include /,'');
  if(seen.has(key)||source.length>2500)return;seen.add(key);
  if(category==='Deadline'){
   if(!zones.test(source))flags.push('Timezone not stated here. Check the official schedule.');
   if(!/\b20\d{2}\b/.test(source))flags.push('Year not stated here. Check the official schedule.');
  }
  if(/\b(?:may|optional|encouraged|recommended|should|preferably)\b/i.test(source)&&! /\bmay not\b/i.test(source))flags.push('Advisory, optional or conditional wording. Verify whether this is mandatory.');
  if(/\b(?:if |when |except|unless|subject to|TBD|to be (?:announced|determined)|standard exceptions|provided that)\b/i.test(source))flags.push('An exception or condition needs review.');
  if(title.length>360)flags.push('Long instruction: review the full source for separate requirements.');
  items.push({id:`req-${items.length+1}`,title,source,category,flags:[...new Set(flags)],done:false});
 }
 for(let index=0;index<lines.length;index++){
  const raw=lines[index];if(!raw)continue;const text=clean(raw);if(!text)continue;
  if(/^Wave\s+Build Period\s+Judging Period/i.test(text)){tableHeader=raw;inherited='';continue;}
  if(/^Wave\s+\d+\s+/i.test(text)&&dates.test(text)&&tableHeader){const title=raw.split(/\t/).slice(0,3).join(' · ');add(title,tableHeader+'\n'+raw,'Deadline',['Schedule row: contains build and judging dates. Confirm the submission cutoff for the relevant Wave.']);continue;}
  if(/\b\d{1,2}\/\d{1,2}\s+\d{1,2}:\d{2}\s*Deadline\b/i.test(text)){add(text,raw,'Deadline',['Timeline label: no Wave association is established. Confirm which cutoff applies.']);continue;}
  if(rulesStart>=0&&index<rulesStart)continue;
  const numberedHeading=/^\d+[.)]\s+\S/.test(raw)&&text.length<120&&!obligation.test(text)&&!directive.test(text)&&!dates.test(text);
  if(numberedHeading||excludedSection.test(text)||/^(?:technical gate|how to join|rules|submission requirements|eligibility|registration and entry|format and schedule)\s*:?$/i.test(text)){
   section=text;inherited='';tableHeader='';continue;
  }
  if(excludedSection.test(section)&&!obligation.test(text))continue;
  if(rulesStart>=0&&/^how to join$/i.test(section))continue;
  if(listIntro.test(text)&&/:$/.test(text)){inherited=raw;continue;}
  if(inherited&&(/^(?:a |an |the |when |include|provide|not be|satisfy|present|explain|communicate|reflect|show|meet|public |readme|slide deck|demo|video|description|source code|architecture|setup|test|progress)/i.test(text)||/^[-*•]\s/.test(raw))&&text.length<800){
   add(text,inherited+'\n'+raw,classify(text));continue;
  }
  // Clipboard text often inserts blanks between actual list entries.
  if(inherited)inherited='';
  for(const sentence of raw.split(/(?<=[a-z0-9][.!?])\s+(?=[A-Z])/)){
   const t=clean(sentence);if(t.length<8||t.length>2500)continue;
   if(/[:?]$/.test(t)||/^(?:register now|register here|submit here|build with|submit deadline|build a killer app)$/i.test(t))continue;
   if(/\b(?:evaluates|judging rubric|ARV|retail value|responsible for all taxes|grant.*distribution)\b/i.test(t))continue;
   const concreteDeadline=dates.test(t)&&/\b(?:deadline|due|close|submit by|submit before)\b/i.test(t);
   const direct=directive.test(t)&&! /^(?:please refer|register here|register now|submit here)/i.test(t);
   const permission=/\b(?:may (?:consist|be used|participate|remain)|up to \w+.*members|are also excluded)\b/i.test(t)||/^(?:you|entrants?|participants?|teams?|projects?)\s+(?:may|should|can)\s+(?:include|submit|use|provide|upload|attach)\b/i.test(t);
   if(!obligation.test(t)&&!direct&&!concreteDeadline&&!permission)continue;
   if(/^\w+(?: \w+){0,4}\s*[–—]\s/.test(t)&&!obligation.test(t))continue;
   add(t,sentence.trim(),concreteDeadline?'Deadline':classify(t));
  }
 }
 const deadlines=items.filter(i=>i.category==='Deadline');
 if(deadlines.length>1)for(const i of deadlines)i.flags.push('Multiple schedule statements found. Confirm the relevant stage; these are not automatically conflicts.');
 return items;
}
const escapeMarkdown=s=>s.replace(/([\\`*_{}\[\]<>])/g,'\\$1').replace(/\r?\n/g,' ');
export function toMarkdown(items){
 return '# BriefForge checklist\n\nRule-based extraction. Review the complete official rules; this checklist may miss requirements.\n\n'+items.map(i=>`- [${i.done?'x':' '}] **${escapeMarkdown(i.category)}:** ${escapeMarkdown(i.title)}\n  - Source: ${escapeMarkdown(i.source)}${i.flags.map(f=>`\n  - Review: ${escapeMarkdown(f)}`).join('')}`).join('\n\n')+'\n';
}
