const zones = /\b(?:UTC|GMT|WAT|ET|PT|EST|EDT|PST|PDT|CST|CDT|IST|CET|CEST|BST|MSK|PKT|JST|AEST|local time|Eastern|Pacific|Central European)\b|[+-]\d{2}:?\d{2}/i;
const instruction = /\b(?:must|shall|required|requires?|mandatory|need to|have to|do not|cannot|may not|not allowed|not eligible|prohibited|only|at least|at most|no more than|less than|under \d|maximum|minimum|deadline|due|submit|submission|provide|include|upload|build|create|use|record|register|ensure)\b/i;
const contextual = /\b(?:prizes?|award|judges?|judging|sponsor|winners? announced|winner announcement)\b/i;
export function extractRequirements(brief) {
 if(typeof brief!=='string') throw new TypeError('Brief must be text.');
 const seen=new Set(); const items=[];
 const segments=brief.split(/\r?\n/).flatMap(line=>line.split(/(?<=[.!?])\s+(?=[A-Z])/)).map(s=>s.trim()).filter(Boolean);
 for(const raw of segments){
  const source=raw; const text=raw.replace(/^\s*(?:[-*•]\s+|\d+[.)]\s+)/,'').trim();
  if(text.length<8 || text.length>2500 || !instruction.test(text))continue;
  if(contextual.test(text)&&! /\b(?:must|shall|required|submit|provide|include|upload|ensure)\b/i.test(text)&&! /\bdeadline|due\b/i.test(text))continue;
  const key=text.toLowerCase().replace(/\s+/g,' '); if(seen.has(key))continue; seen.add(key);
  let category='Requirement';
  if(/\bdeadline|\bdue\b|submission period|submissions? (?:close|end)|register by|submit (?:by|before)/i.test(text)) category='Deadline';
  else if(/\beligib|\bage|\bstudents?|\bresiden|\bcountries|\bcountry|\bteams?|\bmembers?|\bparticipants?|\byears old/i.test(text))category='Eligibility';
  else if(/\bvideo|\bdemo|\bpresentation|\brecord/i.test(text))category='Demo';
  else if(/\brepositor|\bgithub|\bgitlab|\blicen[cs]e|\bsource code/i.test(text))category='Code';
  else if(/\b(?:API|SDK|framework|platform|tool|OpenCV|AWS|Node|skill pack|MCP)\b/i.test(text))category='Tools';
  else if(/\bsubmit|\bsubmission|\bupload|\bdescription/i.test(text))category='Submission';
  const flags=[];
  if(category==='Deadline'&&!zones.test(text))flags.push('Timezone not stated in this sentence. Check the official schedule.');
  if(/\b(?:may|optional|encouraged|recommended|should|preferably)\b/i.test(text)&&! /\bmay not\b/i.test(text))flags.push('Advisory or optional wording. Verify whether this is mandatory.');
  if(/\b(?:except|unless|subject to|TBD|to be (?:announced|determined)|standard exceptions)\b/i.test(text))flags.push('An exception or unresolved condition needs review.');
  if(text.length>360)flags.push('Long instruction: review the full source for separate requirements.');
  items.push({id:`req-${items.length+1}`,title:text,source,category,flags,done:false});
 }
 const deadlines=items.filter(i=>i.category==='Deadline');
 if(deadlines.length>1)for(const i of deadlines)i.flags.push('Multiple deadline statements found. Confirm which applies; they may describe different stages.');
 return items;
}
const escapeMarkdown=s=>s.replace(/([\\`*_{}\[\]<>])/g,'\\$1').replace(/\r?\n/g,' ');
export function toMarkdown(items){
 return '# BriefForge checklist\n\nRule-based extraction. Review the complete official rules; this checklist may miss requirements.\n\n'+items.map(i=>`- [${i.done?'x':' '}] **${escapeMarkdown(i.category)}:** ${escapeMarkdown(i.title)}\n  - Source: ${escapeMarkdown(i.source)}${i.flags.map(f=>`\n  - Review: ${escapeMarkdown(f)}`).join('')}`).join('\n\n')+'\n';
}
