import {test} from 'node:test';
import assert from 'node:assert/strict';
import {toMarkdown,exportFilename,eventName} from '../extractor.js';
import {loadState,saveState} from '../storage.js';
test('event name appears in export heading and safe filename',()=>{assert.match(toMarkdown([],'Midnight Buildathon'),/^# Midnight Buildathon — checklist/);assert.equal(exportFilename('Midnight Buildathon'),'midnight-buildathon-checklist.md');assert.equal(exportFilename('../CON: <bad> / name?'),'con-bad-name-checklist.md');assert.equal(eventName('Alpha\n# injected'),'Alpha # injected');assert.ok(toMarkdown([],'[Name]').startsWith('# \\[Name\\]'));assert.match(toMarkdown([]),/^# Untitled hackathon/);});
test('named and legacy saved work both load without losing edits',()=>{let data=null;const storage={getItem:()=>data,setItem:(k,v)=>{data=v;}};const old={version:1,brief:'old text',analyzedBrief:'old text',items:[]};saveState(storage,old);assert.deepEqual(loadState(storage),old);const named={...old,eventName:'Maker Weekend'};saveState(storage,named);assert.deepEqual(loadState(storage),named);data=JSON.stringify({...named,eventName:12});assert.throws(()=>loadState(storage));});
