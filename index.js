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

/* ================= CONFIG ================= */
const TICKET_COMMAND = '!ticket create'; // change if needed

/* ================= SHOP ITEMS ================= */
const shopItems = {
    '600_token': { name: '600 Token', price: 50, tokens: 600, type: 'token', image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png', description: '600 Token package' },
    '1200_token': { name: '1200 Token', price: 100, tokens: 1200, type: 'token', image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png', description: '1200 Token package' },
    '3000_token': { name: '3000 Token', price: 250, tokens: 3000, type: 'token', image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png', description: '3000 Token package' },
    '6000_token': { name: '6000 Token', price: 500, tokens: 6000, type: 'token', image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png', description: '6000 Token package' },
    '9600_token': { name: '9600 Token', price: 800, tokens: 9600, type: 'token', image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png', description: '9600 Token package' },
    '12000_token': { name: '12000 Token', price: 1000, tokens: 12000, type: 'token', image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png', description: '12000 Token package' },
    'ROYAL_rank': { name: 'ROYAL RANK', price: 100, type: 'rank', image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png', description: 'ROYAL Rank' },
    'LEGEND_rank': { name: 'LEGEND RANK', price: 200, type: 'rank', image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png', description: 'LEGEND Rank' },
    'OVERLORD_rank': { name: 'OVERLORD RANK', price: 300, type: 'rank', image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png', description: 'OVERLORD Rank' },
    'GODTIER_rank': { name: 'GODTIER RANK', price: 400, type: 'rank', image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png', description: 'GODTIER Rank' },
    'custom_rank': { name: 'CUSTOM RANK', price: 500, type: 'custom_rank', image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png', description: 'Custom Rank' }
};

client.once('ready', () => {
    console.log(`✅ Bot Online: ${client.user.tag}`);
});

/* ================= SHOP COMMAND ================= */
client.on('messageCreate', async (message) => {
    if (message.content === '!shop' && !message.author.bot) {

        const embed = new EmbedBuilder()
            .setTitle('🛒 DrkSurvraze Shop')
            .setDescription('Select item to preview & auto create ticket')
            .setColor(0x5865F2);

        const menu = new StringSelectMenuBuilder()
            .setCustomId('shop_select')
            .setPlaceholder('Select item')
            .addOptions(
                Object.keys(shopItems).map(key => ({
                    label: shopItems[key].name,
                    description: `Price: ${shopItems[key].price} BDT`,
                    value: key
                }))
            );

        await message.channel.send({
            embeds: [embed],
            components: [new ActionRowBuilder().addComponents(menu)]
        });
    }
});

/* ================= INTERACTION ================= */
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== 'shop_select') return;

    const item = shopItems[interaction.values[0]];

    await interaction.reply({
        content: '🎫 Creating ticket for your purchase...',
        ephemeral: true
    });

    /* ===== Ticket Create ===== */
    await interaction.channel.send(TICKET_COMMAND);

    /* ===== Purchase Info ===== */
    setTimeout(async () => {
        await interaction.channel.send({
            content:
                `@everyone\n` +
                `🛒 **NEW PURCHASE REQUEST**\n\n` +
                `👤 User: <@${interaction.user.id}>\n` +
                `📦 Item: **${item.name}**\n` +
                `💰 Price: **${item.price} BDT**`
        });
    }, 3000);
});

/* ================= ERROR ================= */
process.on('unhandledRejection', console.error);

/* ================= LOGIN ================= */
client.login(process.env.DISCORD_TOKEN);
