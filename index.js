const { 
    Client, 
    GatewayIntentBits, 
    ActionRowBuilder, 
    StringSelectMenuBuilder, 
    EmbedBuilder 
} = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// ================= SHOP ITEMS =================
const shopItems = {
    '600_token': { name: '600 Token', price: 50, type: 'token' },
    '1200_token': { name: '1200 Token', price: 100, type: 'token' },
    '3000_token': { name: '3000 Token', price: 250, type: 'token' },
    '6000_token': { name: '6000 Token', price: 500, type: 'token' },
    '9600_token': { name: '9600 Token', price: 800, type: 'token' },
    '12000_token': { name: '12000 Token', price: 1000, type: 'token' },

    'ROYAL_rank': { name: 'ROYAL RANK', price: 100, type: 'rank' },
    'LEGEND_rank': { name: 'LEGEND RANK', price: 200, type: 'rank' },
    'OVERLORD_rank': { name: 'OVERLORD RANK', price: 300, type: 'rank' },
    'GODTIER_rank': { name: 'GODTIER RANK', price: 400, type: 'rank' },
    'custom_rank': { name: 'CUSTOM RANK', price: 500, type: 'custom_rank' }
};
// ================= IMAGES =================
const shopImages = {
    banner: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    logo: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    thumbnail: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
};

// 🎫 Ticket Channel ID
const TICKET_CHANNEL_ID = '1441344298426830919';

// ================= BOT READY =================
client.once('ready', () => {
    console.log(`✅ Bot Online: ${client.user.tag}`);
});

// ================= SHOP COMMAND =================
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content !== '!shop') return;

    const embed = new EmbedBuilder()
        .setTitle('🛒 DrkSurvraze Shop')
        .setDescription(
            '**Token / Rank select করুন**\n\n' +
            'Purchase করার জন্য Select an item এ ক্লিক করুন '
        )
        .setColor(0x5865F2)
        .setThumbnail(shopImages.logo)
        .setImage(shopImages.banner)
        .setFooter({ 
            text: 'DrkSurvraze Minecraft Community', 
            iconURL: shopImages.logo 
        });
    
    const menu = new StringSelectMenuBuilder()
        .setCustomId('shop_select')
        .setPlaceholder('Select an item...')
        .addOptions([
            { label: '600 Token', value: '600_token', emoji: '🪙' },
            { label: '1200 Token', value: '1200_token', emoji: '🪙' },
            { label: '3000 Token', value: '3000_token', emoji: '🪙' },
            { label: '6000 Token', value: '6000_token', emoji: '🪙' },
            { label: '9600 Token', value: '9600_token', emoji: '🪙' },
            { label: '12000 Token', value: '12000_token', emoji: '🪙' },

            { label: 'ROYAL RANK', value: 'ROYAL_rank', emoji: '⚜️' },
            { label: 'LEGEND RANK', value: 'LEGEND_rank', emoji: '⚜️' },
            { label: 'OVERLORD RANK', value: 'OVERLORD_rank', emoji: '👑' },
            { label: 'GODTIER RANK', value: 'GODTIER_rank', emoji: '𓆩👑𓆪' },
            { label: 'CUSTOM RANK', value: 'custom_rank', emoji: '🎨' }
        ]);

    const row = new ActionRowBuilder().addComponents(menu);

    await message.channel.send({
        embeds: [embed],
        components: [row]
    });
});

// ================= SELECT MENU HANDLER =================
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== 'shop_select') return;

    const item = shopItems[interaction.values[0]];
    if (!item) {
        return interaction.reply({
            content: '❌ Item not found.',
            ephemeral: true
        });
    }

    const replyEmbed = new EmbedBuilder()
        .setTitle('🎫 Ticket Required')
        .setColor(0xFF5555)
        .setDescription(
            `আপনি **${item.name}** নিতে চান ✅\n\n` +
            `➡️ Purchase করার জন্য নিচের channel এ **ticket create করুন**\n\n` +
            `🔗 <#${TICKET_CHANNEL_ID}>`
        )
        .addFields(
            {
                name: '📌 Ticket এ দিবেন',
                value:
                    '• Minecraft Username\n' +
                    '• Selected Item\n' +
                    '• Payment Screenshot\n' +
                    '• Let me know if there is any problem.'
            }
        )
        name: '📞 Contact Info',
                value: '```\nWhatsApp: 01980583573\nbKash/Nagad: 01980583573\n```',
                inline: false
            }
        )
        .setImage(shopImages.banner)
        .setFooter({
            text: 'DrkSurvraze Shop System | Ticket Required for Purchase',
            iconURL: shopImages.logo
        })
        .setTimestamp();

    await interaction.reply({
        embeds: [replyEmbed],
        ephemeral: true // 🔒 only user sees
    });
});

// ================= ERROR HANDLING =================
client.on('error', console.error);
process.on('unhandledRejection', console.error);

// ================= LOGIN =================
client.login(process.env.DISCORD_TOKEN);
