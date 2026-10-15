import {test} from 'node:test';
import assert from 'node:assert/strict';
import {extractRequirements,toMarkdown} from '../extractor.js';

test('compact action titles retain exact source and list context',()=>{
 const brief='6. Submission Requirements\nEach team must submit the following:\nA **slide deck ** (pitch presentation).\nA clear README explaining setup and testing.\nInclude a demo video under 3 minutes.';
 const items=extractRequirements(brief);
 const deck=items.find(i=>i.title==='Add a slide deck');assert.ok(deck);assert.ok(deck.source.includes('6. Submission Requirements'));assert.ok(deck.source.includes('Each team must submit the following:'));assert.ok(deck.source.includes('A **slide deck ** (pitch presentation).'));
 const demo=items.find(i=>i.category==='Demo'&&i.source.includes('under 3 minutes'));assert.match(demo.title,/under 3 minutes/);
 const source=deck.source;deck.title='Attach our pitch deck';deck.done=true;const md=toMarkdown(items);assert.equal(deck.source,source);assert.ok(md.includes('Attach our pitch deck'));assert.ok(md.includes('pitch presentation'));
});

test('short labels do not promote conditional, excluded or optional rules to mandatory tasks',()=>{
 const items=extractRequirements('If selected, the team must attend a live interview.\nYou may include a deployed website.\nResidents of Country X are excluded.');
 assert.match(items[0].title,/conditional/);assert.ok(items[0].flags.some(f=>f.includes('condition')));assert.match(items[1].flags.join(),/optional/);assert.match(items[2].title,/exclusions/);assert.equal(items[2].source,'Residents of Country X are excluded.');
});
