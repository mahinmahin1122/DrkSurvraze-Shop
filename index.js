const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// আপনার ছবি লিঙ্কগুলো এখানে ব্যবহার করেছি
const shopImages = {
    banner: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    logo: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
};

client.once('ready', () => {
    console.log(`✅ DrkSurvraze Shop Bot is online as ${client.user.tag}`);
    console.log(`🎮 Displaying shop items only - No interactive features`);
});

// Create Shop Command - শুধু এম্বেড দেখাবে, কোন বাটন বা মেনু নেই
client.on('messageCreate', async (message) => {
    if (message.content === '!shop' && message.author.bot === false) {
        console.log(`🛒 Shop display shown for ${message.author.tag}`);
        
        const embed = new EmbedBuilder()
            .setTitle('🛒 DrkSurvraze Minecraft Shop')
            .setColor(0x5865F2)
            .setThumbnail(shopImages.logo)
            .setImage(shopImages.banner)
            .setDescription('**Welcome to DrkSurvraze Shop!**\n\n*Shop is currently for display only*\n')
            .addFields(
                {
                    name: '🎮 **TOKEN PACKAGES**',
                    value: '```\n' +
                           '┌─────────────────────────────┐\n' +
                           '│  🪙  600 Token  →  50 BDT   │\n' +
                           '│  🪙 1200 Token  → 100 BDT   │\n' +
                           '│  🪙 3000 Token  → 250 BDT   │\n' +
                           '│  🪙 6000 Token  → 500 BDT   │\n' +
                           '│  🪙 9600 Token  → 800 BDT   │\n' +
                           '│  🪙 12000 Token → 1000 BDT  │\n' +
                           '└─────────────────────────────┘\n```',
                    inline: false
                },
                {
                    name: '👑 **RANK PACKAGES**',
                    value: '```\n' +
                           '┌─────────────────────────────┐\n' +
                           '│  👑 ROYAL RANK   → 100 BDT  │\n' +
                           '│  👑 LEGEND RANK  → 200 BDT  │\n' +
                           '│  👑 OVERLORD     → 300 BDT  │\n' +
                           '│  👑 GODTIER      → 400 BDT  │\n' +
                           '│  🎨 CUSTOM RANK  → 500 BDT  │\n' +
                           '└─────────────────────────────┘\n```',
                    inline: false
                },
                {
                    name: '📞 **CONTACT FOR PURCHASE**',
                    value: '```\n' +
                           'For purchases, please contact:\n' +
                           '📱 WhatsApp: 01980583573\n' +
                           '💳 bKash/Nagad: 01980583573\n' +
                           '```',
                    inline: false
                }
            )
            .addFields(
                {
                    name: '📋 **PAYMENT METHODS**',
                    value: '• 💳 bKash\n• 📱 Nagad\n• 📞 Direct Bank Transfer',
                    inline: true
                },
                {
                    name: '⚡ **DELIVERY TIME**',
                    value: '• Instant Delivery\n• 24/7 Support\n• After Payment',
                    inline: true
                }
            )
            .setFooter({ 
                text: 'DrkSurvraze Minecraft Community | Server IP: play.drksurvraze.com', 
                iconURL: shopImages.logo 
            })
            .setTimestamp();

        await message.channel.send({
            embeds: [embed]
        });
    }
});

// কোন ইন্টার‍্যাকশন হ্যান্ডল করবে না
client.on('interactionCreate', async (interaction) => {
    // সব ইন্টার‍্যাকশন ইগনোর করবে
    return;
});

// Error handling
client.on('error', (error) => {
    console.error('❌ Client error:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled promise rejection:', error);
});

// Bot login
client.login(process.env.DISCORD_TOKEN);
