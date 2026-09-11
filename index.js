
;

process.on('SIGINT', () => {
  // Local Ctrl+C
  console.log('[System] Manual stop requested. Exiting...');
  process.exit(0);
});

// ============================================================
// START THE BOT
// ============================================================
console.log('='.repeat(50));
console.log('  Minecraft AFK Bot v2.3 - Bug Fix Edition');
console.log('='.repeat(50));
console.log(`Server: ${config.server.ip}:${config.server.port}`);
console.log(`Version: ${config.server.version}`);
console.log(`Auto-Reconnect: ${config.utils['auto-reconnect'] ? 'Enabled' : 'Disabled'}`);
console.log('='.repeat(50));

createBot();try { const isNight bot.time.timeDfDay 12500 && bot.tise.tineOfDay if (config.beds['place-night'] && isNight & bot.isSleeping) ( 23500;

//Find nearby bed blocks const bedBlock bot.findBlock({

const watching: block block.name.includes('bed"),

Distance

if (bedBlock) {

try f await bot.sleep ait bot.sleep(bedBlock); console.log('[Bed] Sleeping...');

catch (e) Can't sleep maybe not night enough or monsters nearby

catch (e) {

console.log('[Bed] Error', e.message);

10000);

// Chat nodule

function chatModule(bot) {

bot.on('chat', (username, nessage) => { if (!bot || username bot.username) return;

try (config.chat.respond) (

const lower gelesenoveri (Iowerlisg. includes (hello) || lowerMsg.includes("hi")) { bot.chat(Hello, $(username)!5: if (message.startsWith("!tp') && config.chat.respond) ( const target message.split(" ") if (target) bot.chat/tp $(target));

catch (e) {

console.log('[Chat] Error:", e.message);

// CONSOLE COMMANDS

const readline require('readline'); const r1 readline.createInterface({

input: process.stdin. output: process.stdout,

terminal: false

rl.on('line', (line) >

cobolelor Static Bot not connected"); console.log( return;

Line if (trimmed.startsWith(say')) {

bot.chat(trimmed.slice(4)) } else if (trimmed.startsWith("cad')) {

bot.chat('/' trimmed.slice(4));

} else if (trinned 'status') { console.log("Connected: $(botState.connected), Uptime: $(formatUptime (Math.floor ((Date.now() botState.startTime) /1000)))`);

} else if (trimmed 'reconnect') console.log("[Console] Manual reconnect requested");

bot.end(); } else {

bot.chat(trinned);

// DISCORD WEBHDOK INTEGRATION

(!config.discord config.discord.webhookUr1 ||

function sendDiscordWebhook(content, color 0x0099ff) (

const protocol config.discord.webhookUrl.startsWith("https")? https: http: const urlParts new URL(config.discord.webhookUr1);

const payload JSON.stringify({

username: config.name,

enbeds: [

description: content, color: color

timestamp: new Date().to150String(),

comes thattoriuriParts.hostname,

port: 443

path: urlParts.pathnane urlParts.search.

tent-Type": "application/json',

'Content-Length: payload.length

const req protocol.request(options, (res)

// console.log('[Discord] Sent webhook: $(res.statusCode));

reconsoler for Discord) Error sending webhook: $te.message)'); console.log(

req.write(payload); req.end();

// CRASH RECOVERY IMMORTAL MODE

Procesoncaught Exception

botState.errors.push({ type: 'uncaught, message: err.message, time: Date.now()));

Uncaught Exception: $(err.message)"); // console.log(err.stack); // Optional: keep logs cleaner

// CRITICAL: DO NOT EXIT.

// The user wants the server to stay up "all the time no matter what". // We just clear intervals and try to restart the bot logic. if (config.utils['auto-reconnect']) {

clearAllIntervals(): // Wrap in a tiny timeout to prevent tight loops if the error is synchronous

setTimeout(()( scheduleReconnect(); }, 1000);

botState.erro rrors.push({ type: 'rejection', message: String(reason), time: Date.now())); // Do not exit.

on('unhandledRejection', (reason, promise) => { console.log('[FATALPeriodic Rejoi

periodicRejoin(bot);

if (conficutils periodic-rejoin'] && config.utils['periodic-rejoin'].enabled) {

console.log('[Modules] All modules initialized!");

// Periodic Rejoin Module

const setupLeaveRejoin require('./leaveRejoin');

// Periodic Rejoin Module Handled by leaveRejoin.js now

Deprecated in favor of leaveRejoin.js // Dep Deprecated in favor of leaveRejoin.js

console.log('[Rejoin] Using new leaveRejoin system.');

MOVEMENT HELPERS

const radius config.novenent['circle-walk'].radius;

function startCircleWalk(bot, defaultlove) (

let lastPathTime 0:

if (!bot || !botState.connected) return;

addInterval(() => {

// Rate limit pathfinding

const now Date.now(); if (now lastPathTine < 2000) return;

lastPathTime now:

try {

const x bot.entity.position.x Math.cos(angle) radius, const z bot.entity.position.z Math.sin(angle) radius:

bot pathfinder.setCoal (nots CoalBlock(Math.floor(x), Math.floor(bet.entity.position.y), Math.floor(z))); (new

angle Math.PI/4; botState.lastActivity Date.now();

} catch (e) { console.log('[Circlewalk] Error', e.message);

config.movement['circle-walk'].speed);

function startRandom.Jump (bot) {

addInterval((){ if (!botbotState.connected) return;

try

bot.setControlState('jump', true); setTimeout(()

1,300) if (bot) bot.setControlState('jump', false);

botState, lastActivity = Date.now(); catch (e)

console.log('[Random Jump] Error', e.message);

config.movement["randon-jump"J.interval);

function startLookAround (bot) {

addin if bot || botState.connected) return;

try const yaw = Math.randon() Math.PI const pitch (Math.random()0.5) bot pitch, true);

botState.lastActivity Date.now(); catch (e) f

console.log('[LookAround] Error', e.message);

config.novement['look-around"].interval);

CUSTOM MODULES

// Avoid mobs/players

function avoidMobs(bot) { 5:

const safeDistance addInterval(() => {

if (!bot || !botState.connected) return; try

const entities Object.values(bot.entities).filter(e e.type 'mob || (e.type 'player' && e.username ! bot.username)

for (const e of entities) ( if (le.position) continue;

const distance bot.entity.position.distanceTo(e.position);

if (distance safeDistance) ( bot.setControlState('back', true);

setTimeout(() if (bot) bot.setControlState('back', false); 3,500);

break:

catch (e) f console.log('[AvoidMobs] Error:", e.message);

2000)

Conbat module

Function combatModule(bot, mcData) { addin

f (!bot || !botState.connected) return; if

try (config.combat['attack-mobs'])

const mobs Object.values(bot.entities).filter(e

e.type = 'mob' && e.position && bot.entity.position.distanceTo(e.position)

if (mobs.length > 0) {

bot.attack(mobs[0]);

console.log('[Combat] Error:', e.message);

), 1500);

bot.on('health",

if (config.combat['auto-eat']) return;

try f if (bot.food 14){

const food bot.inventory.items().find(i > { const itemData mcData.itensByName[i.name]; return iterData && itenData.food;

}); (food) {

bot.equip(food, 'hand') then(() bot.consume())

.catch(e console.log("[AutoEat] Error:", e.message));

catch (e) {

console.log('[AutoEat] Error:", e.message);

if (!bot || botState.connected) return;

// Bed module (FIXED beds are blocks, not entities) function bedModule(bot, ncData) (locksconst mcData require('minecraft-data')(config const defaultMove new lovenents(bot, scData); rver version);

initializellodules (bot, acData, defaultNove); setupLeaveRejoin(bot, createBot);

setTimeout((){

if (bot && botState.connected) { bot.chat("/ganerule sendCommandFeedback false"); >. 3000);

setTimeout((){

});

if (bot && botState.connected) { bot.chat("/ganesode creative');

console.log [INFO] Attempted to 3000); creative mode (requires OP)');

Handle disconnection

bot.on("end", (reason) > const wasSpawned botState.connected;

console.log('[Bot] Disconnected: $(reason || 'Unknown reason'}'); botState.connected = false; clearAllIntervals();

if (config.discord && config.discord.events.disconnect && reason! sendDiscordWebhook([-] Disconnected**: $(reason || 'Unknown'), Periodic Rejoin') { 0xf87171); // Red

});

(config.utils['auto-reconnect']) {

scheduleReconnect();

bot.on("kicked", (reason)

console.log( "[KICK]"

);

typeof reason "string" JSON.stringify(reason, null, 2)

bot.on('error', (err) => {

console.log('[Bot] Error: $(err.message)');

botState.errors.push((type: 'error', message: err.nessage, time: Date.now())); // Don't immediately reconnect on error let "end" event handle it 1);

console.log([Bot] Failed to create bot: $ferr.message)"); scheduleReconnect():

} catch (err) {

function scheduleleconnect()

if (reconnectTinecut) clearTimeout(reconnectTimeout);

if (isReconnecting) ( return:

isReconnecting true: botState.reconnectAttempts++;

const ast delay getReconnectDelay();

console.log('[Bot] Reconnecting in $(delay/1000)s (attempt #${botState.reconnectAttempts))");

reconnectTimeout setTimeout((){

isReconnecting = false; createBot(); delay);

// MODULE INITIALIZATION

function initializeModules(bot, ncData, defaultMove) ( console.log('[Modules] Initializing all modules...');

// AUTO AUTH authDone false;

bot.on('messagestr',

const message msg.toLowerCase();

if (authDone) return;

if (message.includes("/register') || message.includes('register')) {

authDone true; bot.chat("/register Perzuu Perzuu'); console.log("[Auth] Register sent'); return;

if (message.includes("/login") || message.includes('login')) { authDone true;

bot.chat("/login Perzuu'); Auth Login sent'); return;

MOVE TO POSITION

if (config.position.enabled) { bot config.posi nder.setMovements(defaultMove)

bot.pathfinder.setGoal(new GoalBlock(config.position.z, config.position.y, config.position.z));

ANTI-AFK (Simple) if (config.utils['anti-afk').enabled) { addInterval(()

ate.com bot.setControlState('jump', true);

setTimeout(()"> if (bot) bot.setControlState('jump", false);

1100); botState.lastActivity Date.now();

3000); // Jump every 30 seconds

(config.utils['anti-afk'].sneak) ( bot.setControlState('sneak', true);

1/ MOVEMENT NODULES (config.movement["circle-walk'].enabled) { startCircleWalk(bot, defaultlove);

if (config.movement['randon-jump'].enabled) {

start Random Jump(bot);

if (config.movement['look-around'].enabled) { startLookAround(bot)

// CUSTOM MODULES

if (config.modules.avoidMobs) avoid lobs(bot); if (config.modules.combat) combatModule(bot, mcData);

if (config.modules.beds) bedModule(bot, acData);SELF-PING- Prevent Render from sleeping

const SELF PING INTERVAL 10 60 1000; // 10 minutes

const https require('https');

function startSelfPing() {

setInterval(()( http://localhost:$(PORT)"; const url process.env. RENDER EXTERNAL URL const protocol url.startsWith('https')? https: http:

protocol.get($(url)/ping. (res)>

// console.log([KeepAlive] Self-ping: $(res.statusCode)'); // Optional: reduce span }).on('er

console.log('[KeepAlive] Self-ping failed: Sferr.message)');

3. SELF PING INTERVAL);

console.log('[KeepAlive] Self-ping system started (every 10 min)');

startSelfPing();

//MEMORY MONITORING

setInterval(()

const nem process.menoryUsage(); Const heapMB (nen.heapUsed 1024/1024).toFixed(2);

console.log([Memory] Heap: $(heap) MB) 7,560 1000); // Every 5 minutes

BOT CREATION WITH RECONNECTION LOGIC

let bot null;

let activeIntervals = []; let iseconnectingut isReconnecting = false;

function clearAllIntervals() {

console.log( [Cleanup] Clearing $(activeIntervals.length) intervals");

activeIntervals.forEach(id activeIntervals []: clearInterval(id));

function addInterval(callback, delay) { const id setInterval(callback, delay);

activeIntervals.push(id); return id;

function getReconnectDelay()

// Aggressive reconnection: fast, flat delay or very subtle backoff

const baseDelay config.utils['auto-reconnect-delay 1152000: const

// Use a much gentler backoff or just a flat delay if user wants "lower"

return delay;

// Current logic: attempts 1000 base, capped at max const delay Math.min(baseDelay (botState.reconnectAttempts 1000), maxDelay):

function createBot() ( if (isReconnecting) (

console.log( [Bot] Already reconnecting, skipping..."); return;

Cleanup previous bot

clearAllIntervals();

try

bot.removeAllListeners();

bot.end(); } catch (e){

console.log('[Cleanup] Error ending previous bot:, e.message);

bot null;

console.log('[Bot] Creating bot instance...); console.log('[Bot] Connecting to $(config.server.ip):$(config.server.port)");

try mineflayer.createBot({ config['bot-accor

ccount'].username, username: contig bot-account password: d: contig! bot-account']. 1.password || undefined,

auth: config['bot-account'].type,

host: config.server.ip. port: config.server.port.

version: config.server.version, hideErrors: false,

1) checkTimeout Interval: 120000 // 2 minutes detects dead connections without false-positive disconnects

bot.loadPlugin(pathfinder);

// Connection timeout if no spawn in 60s, reconnect onst connectionTimeout setTimeout(() => {

if (!botState.connected) ( console.log('[Bot] Connection timeout scheduleReconnect(); spawn received');

}, 60000);

bot.once('spawn', () => { clearTimeout(connectionTimeout); botState.connected true;

botState.lastActivity Date.now(); botState.reconnectAttempts = 0; isReconnecting false;

console.log('[Bot] [+] Successfully spawned on server!');

// BY FORCE LOGIN SYSTEM (Perzaan Edition)

bot.on('messagestr, (msg) { const nessage msg.toLowerCase();

//if (message.includes('login')) {

bot.chat('/login Perzuu'); console.log("[Auth] Login detected');

// Register if (message.includes('register")) { bot.chat('/register Perzuu Perzuu');

console.log("[Auth] Register detected');

)

});

Creative mode success

message.includes("commands.gamemode.success.self") nessage.includes('set own gane mode to creative mode

console.log('[INFO] Bot is now in Creative Mode.");

bot.chat('/gamerule sendCommandFeedback false");

if (config.discord && config.discord.events.connect) ( sendDiscordwebhook([+] **Connected to $(config.server.ip)\, 0x4ade80);
