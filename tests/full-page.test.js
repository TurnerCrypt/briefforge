import {test} from 'node:test';
import assert from 'node:assert/strict';
import {extractRequirements} from '../extractor.js';

test('full-page copy excludes promotion and dated discussion while keeping noun-only deliverables',()=>{
 const input=`Sign in\nComments\n59\nBuild with\nMidnight\nHealthcare – Enable access to record verified facts.\n📏 Rules\n1. Teams\nTeams may consist of up to five (5) registered members.\n2. Eligibility\nIndividuals subject to sanctions enforced by the U.S. Department of the Treasury are not eligible.\n3. Submission Requirements\nBy the applicable Submission Deadline, each team must submit the following through the submission page:\nA public GitHub repository.\nA clear README explaining setup and testing.\nA slide deck.\nA demo / video pitch.\nA description of progress completed.\n4. Judging and Evaluation\nCommunication — Evaluates the clarity of video presentations.\nTechnical Gate\nEach submission must include at least one Compact contract that compiles successfully.\nSubmitted products (26)\nView more\nComments\nExampleBuilder\nExampleBuilder\n2026-10-15 02:29\nI tried to submit but the platform failed.\nBuild a Killer App`;
 const items=extractRequirements(input);const titles=items.map(i=>i.title);
 for(const needle of ['README','slide deck','demo / video','description of progress','Compact contract'])assert.ok(items.some(i=>i.source.includes(needle)),needle);
 assert.ok(!titles.some(t=>/Healthcare|Build with|platform failed|Killer App|Evaluates|Sign in/.test(t)));
 const sanction=items.find(i=>i.source.includes('Individuals subject'));assert.ok(sanction);assert.match(sanction.source,/U\.S\. Department/);
 const deck=items.find(i=>i.title==='Add a slide deck');assert.match(deck.source,/must submit the following/);assert.equal(deck.category,'Demo');
});

test('numbered instructions remain instructions; list context persists over blank lines',()=>{
 const items=extractRequirements('1. Include a public repository.\nRequired deliverables:\n\n- README with setup instructions\n\n- Slide deck\n\n- Demo video');
 assert.ok(items.some(i=>i.source.includes('Include a public repository.')));
 assert.ok(items.some(i=>i.title==='Add a slide deck'&&i.source.includes('Required deliverables:')));
});

test('repeated schedule tables deduplicate while keeping uncertain timeline cutoffs',()=>{
 const items=extractRequirements('10/19 16:00Deadline\nRules\n5. Format and Schedule\nWave\tBuild Period\tJudging Period\tReward\nWave 2\tSeptember 27 – October 17, 2026\tOctober 17 – October 27, 2026\tUS$4,000\nWave\tBuild Period\tJudging Period\nWave 2\tSeptember 27 – October 17, 2026\tOctober 17 – October 27, 2026');
 const rows=items.filter(i=>i.title.startsWith('Review Wave 2'));assert.equal(rows.length,1);assert.match(rows[0].source,/Build Period/);assert.ok(rows[0].flags.some(f=>f.includes('Timezone')));
 assert.ok(items[0].flags.some(f=>f.includes('Year')));assert.ok(items[0].flags.some(f=>f.includes('no Wave association')));
});
