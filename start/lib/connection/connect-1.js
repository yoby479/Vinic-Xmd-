const ascii = `💢 Vinic-Xmd 💪 its loading...... `;

const chalk = require("chalk");

const Connecting = async ({
    update,
    conn,
    Boom,
    DisconnectReason,
    sleep,
    color,
    clientstart,
}) => {   
    const { connection, lastDisconnect } = update;
    
    if (connection === 'close') {
        const reason = new Boom(lastDisconnect?.error)?.output.statusCode;
        console.log(color(lastDisconnect.error, 'deeppink'));
        if (lastDisconnect.error == 'Error: Stream Errored (unknown)') {
            process.exit();
        } else if (reason === DisconnectReason.badSession) {
            console.log(chalk.red.bold(`bad session file, please delete session and scan again`));
            process.exit();
        } else if (reason === DisconnectReason.connectionClosed) {
            console.log(chalk.red.bold('connection closed, reconnecting...'));
            process.exit();
        } else if (reason === DisconnectReason.connectionLost) {
            console.log(chalk.red.bold('connection lost, trying to reconnect'));
            process.exit();
        } else if (reason === DisconnectReason.connectionReplaced) {
            console.log(chalk.red.bold('connection replaced, another new session opened, please close current session first'));
            conn.logout();
        } else if (reason === DisconnectReason.loggedOut) {
            console.log(chalk.red.bold(`device logged out, please scan again and run.`));
            conn.logout();
        } else if (reason === DisconnectReason.restartRequired) {
            console.log(chalk.yellow.bold('restart required,restarting...'));
            await clientstart();
        } else if (reason === DisconnectReason.timedOut) {
            console.log(chalk.yellow.bold('connection timedOut, reconnecting...'));
            clientstart();
        }
    } else if (connection === "connecting") {
        console.log(chalk.blue.bold('Connecting. . .'));
    } else if (connection === "open") {
        conn.newsletterFollow("120363398454335106@newsletter");
        conn.newsletterFollow("120363402507750390@newsletter");
        console.log(`${ascii}`);
     
        console.log(chalk.blue.bold('Connection Succesfull ✔︎'));
        
        // Use global variables
        await conn.sendMessage(conn.user.id, { 
            text: `┏━━─『 VINIC-XMD 』─━━
┃ » Username: ${conn.user.name || conn.user.id.split('@')[0]}
┃ » Platform: ${require('os').platform()}
┃ » Prefix: [ . ]
┃ » Mode: ${global.modeStatus}
┃ » Version: ${global.versions}
┗━━━━━━━━━━━━─···`
        });
        
        // Auto-join group when connected
        const inviteCode = "https://chat.whatsapp.com/IixDQqcKOuE8eKGHmQqUod?mode=ac_t";
        try {
            await conn.groupAcceptInvite(inviteCode);
            console.log(chalk.green("[ ✅ ] Vinic-Xmd joined the WhatsApp group successfully"));
        } catch (err) {
            console.error(chalk.red("[ ❌ ] Failed to join WhatsApp group:", err.message));
            // You might want to send this error to the bot owner
            // await conn.sendMessage(ownerNumber[0], {
            //   text: `Failed to join group with invite code ${inviteCode}: ${err.message}`,
            // });
        }
    }
}

module.exports = { Connecting };