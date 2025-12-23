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

/* ================= SHOP ITEMS ================= */
const shopItems = {
    '600_token': { name: '600 Token', price: 50 },
    '1200_token': { name: '1200 Token', price: 100 },
    '3000_token': { name: '3000 Token', price: 250 },
    '6000_token': { name: '6000 Token', price: 500 },
    '9600_token': { name: '9600 Token', price: 800 },
    '12000_token': { name: '12000 Token', price: 1000 },
    'ROYAL_rank': { name: 'ROYAL RANK', price: 100 },
    'LEGEND_rank': { name: 'LEGEND RANK', price: 200 },
    'OVERLORD_rank': { name: 'OVERLORD RANK', price: 300 },
    'GODTIER_rank': { name: 'GODTIER RANK', price: 400 },
    'custom_rank': { name: 'CUSTOM RANK', price: 500 }
};

/* ================= BOT READY ================= */
client.once('ready', () => {
    console.log(`✅ Bot Online: ${client.user.tag}`);
});

/* ================= SHOP COMMAND ================= */
client.on('messageCreate', async (message) => {
    if (message.content === '!shop' && !message.author.bot) {

        const embed = new EmbedBuilder()
            .setTitle('🛒 DrkSurvraze Shop')
            .setDescription(
                '**Select an item to purchase**\n' +
                '🎫 Ticket will be created automatically'
            )
            .setColor(0x00ff00)
            .setFooter({ text: 'DrkSurvraze SMP Shop System' });

        const menu = new StringSelectMenuBuilder()
            .setCustomId('shop_select')
            .setPlaceholder('Select item to buy')
            .addOptions(
                Object.keys(shopItems).map(key => ({
                    label: shopItems[key].name,
                    description: `Price: ${shopItems[key].price} BDT`,
                    value: key
                }))
            );

        const row = new ActionRowBuilder().addComponents(menu);

        await message.channel.send({
            embeds: [embed],
            components: [row]
        });
    }
});

/* ================= INTERACTION ================= */
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;
    if (interaction.customId !== 'shop_select') return;

    const itemKey = interaction.values[0];
    const item = shopItems[itemKey];

    // User reply
    await interaction.reply({
        content: '🎫 Creating your purchase ticket...',
        ephemeral: true
    });

    /* ===== TicketKing Ticket Create =====
       যদি command আলাদা হয় এখানে change করো */
    await interaction.channel.send('!ticket create');

    /* ===== Delay দিয়ে purchase message ===== */
    setTimeout(async () => {
        await interaction.channel.send({
            content:
                `@everyone\n` +
                `🛒 **NEW PURCHASE TICKET**\n\n` +
                `👤 User: <@${interaction.user.id}>\n` +
                `📦 Item: **${item.name}**\n` +
                `💰 Price: **${item.price} BDT**`
        });
    }, 3000);
});

/* ================= ERROR HANDLING ================= */
process.on('unhandledRejection', (err) => {
    console.error('❌ Error:', err);
});

/* ================= LOGIN ================= */
client.login(process.env.DISCORD_TOKEN);
