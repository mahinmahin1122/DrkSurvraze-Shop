const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// DrkSurvraze Shop Items
const shopItems = {
    '600_token': {
        name: '600 Token',
        price: 50,
        tokens: 600,
        description: '600 Token package for your gameplay',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'token'
    },
    '1200_token': {
        name: '1200 Token',
        price: 100,
        tokens: 1200,
        description: '1200 Token package for your gameplay',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'token'
    },
    '3000_token': {
        name: '3000 Token',
        price: 250,
        tokens: 3000,
        description: '3000 Token package for your gameplay',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'token'
    },
    '6000_token': {
        name: '6000 Token',
        price: 500,
        tokens: 6000,
        description: '6000 Token package for your gameplay',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'token'
    },
    '9600_token': {
        name: '9600 Token',
        price: 800,
        tokens: 9600,
        description: '9600 Token package for your gameplay',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'token'
    },
    '12000_token': {
        name: '12000 Token',
        price: 1000,
        tokens: 12000,
        description: '12000 Token package for your gameplay',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'token'
    },
    'ROYAL_rank': {
        name: 'ROYAL RANK',
        price: 100,
        tokens: 0,
        description: 'Get ROYAL Rank in DrkSurvraze Minecraft Server',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'rank'
    },
    'LEGEND_rank': {
        name: 'LEGEND RANK',
        price: 200,
        tokens: 0,
        description: 'Get LEGEND Rank in DrkSurvraze Minecraft Server',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'rank'
    },
    'OVERLORD_rank': {
        name: 'OVERLORD RANK',
        price: 300,
        tokens: 0,
        description: 'Get OVERLORD Rank in DrkSurvraze Minecraft Server',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'rank'
    },
    'GODTIER_rank': {
        name: 'GODTIER RANK',
        price: 400,
        tokens: 0,
        description: 'Get GODTIER Rank in DrkSurvraze Minecraft Server',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'rank'
    },
    'custom_rank': {
        name: 'CUSTOM RANK',
        price: 500,
        tokens: 0,
        description: 'Create your own custom rank with unique prefix and color',
        image: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
        type: 'custom_rank'
    }
};

// ImgBB Images
const shopImages = {
    banner: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png',
    logo: 'https://i.ibb.co/7JL3Gncf/Untitled-design.png'
};

client.once('ready', () => {
    console.log(`✅ DrkSurvraze Shop Bot is online as ${client.user.tag}`);
    console.log(`🔍 Preview mode only - Items can be selected for viewing`);
    console.log(`🚫 Purchase system disabled`);
});

// Create Shop Command
client.on('messageCreate', async (message) => {
    if (message.content === '!shop' && message.author.bot === false) {
        console.log(`🛒 Shop command from ${message.author.tag}`);
        
        const embed = new EmbedBuilder()
            .setTitle('🛒 DrkSurvraze Shop - Item Preview')
            .setDescription('**Select an item from the menu below to view details**\n\n*Note: This is preview mode only*\n*Contact admin for actual purchases*')
            .setColor(0x5865F2)
            .setThumbnail(shopImages.logo)
            .setImage(shopImages.banner)
            .addFields(
                {
                    name: '📞 Contact for Purchase',
                    value: '**WhatsApp:** 01980583573\n**bKash/Nagad:** 01980583573',
                    inline: false
                }
            )
            .setFooter({ 
                text: 'DrkSurvraze Minecraft Community | Preview Mode', 
                iconURL: shopImages.logo 
            });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('preview_item_select')
            .setPlaceholder('Select an item to view details...')
            .addOptions([
                { label: '600 Token', description: 'Price: 50 BDT', value: '600_token', emoji: '🪙' },
                { label: '1200 Token', description: 'Price: 100 BDT', value: '1200_token', emoji: '🪙' },
                { label: '3000 Token', description: 'Price: 250 BDT', value: '3000_token', emoji: '🪙' },
                { label: '6000 Token', description: 'Price: 500 BDT', value: '6000_token', emoji: '🪙' },
                { label: '9600 Token', description: 'Price: 800 BDT', value: '9600_token', emoji: '🪙' },
                { label: '12000 Token', description: 'Price: 1000 BDT', value: '12000_token', emoji: '🪙' },
                { label: 'ROYAL RANK', description: 'Price: 100 BDT', value: 'ROYAL_rank', emoji: '👑' },
                { label: 'LEGEND RANK', description: 'Price: 200 BDT', value: 'LEGEND_rank', emoji: '👑' },
                { label: 'OVERLORD RANK', description: 'Price: 300 BDT', value: 'OVERLORD_rank', emoji: '👑' },
                { label: 'GODTIER RANK', description: 'Price: 400 BDT', value: 'GODTIER_rank', emoji: '👑' },
                { label: '🎨 CUSTOM RANK', description: 'Price: 500 BDT', value: 'custom_rank', emoji: '🎨' }
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await message.channel.send({
            embeds: [embed],
            components: [row]
        });
    }
});

// Handle Item Selection - শুধু আইটেমের ডিটেইলস দেখাবে
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'preview_item_select') {
        const selectedItem = interaction.values[0];
        const item = shopItems[selectedItem];
        
        if (!item) {
            await interaction.reply({
                content: '❌ Item not found.',
                ephemeral: true
            });
            return;
        }

        console.log(`🔍 Previewing item: ${item.name} by ${interaction.user.tag}`);
        
        // আইটেমের ডিটেইলস এম্বেড
        const embed = new EmbedBuilder()
            .setTitle(`📦 ${item.name}`)
            .setColor(item.type === 'token' ? 0x3498DB : 
                     item.type === 'rank' ? 0xF1C40F : 
                     item.type === 'custom_rank' ? 0x9B59B6 : 0x5865F2)
            .setThumbnail(item.image)
            .setDescription(item.description)
            .addFields(
                { 
                    name: '💰 Price', 
                    value: `**${item.price} BDT**`, 
                    inline: true 
                }
            );

        // টোকেন আইটেম হলে টোকেন সংখ্যা যোগ করবে
        if (item.tokens > 0) {
            embed.addFields(
                { 
                    name: '🎮 Tokens', 
                    value: `${item.tokens} Tokens`, 
                    inline: true 
                }
            );
        }

        embed.addFields(
            { 
                name: '📊 Type', 
                value: item.type === 'token' ? 'Token Package' : 
                       item.type === 'rank' ? 'Rank Package' : 
                       'Custom Rank', 
                inline: true 
            },
            { 
                name: '📞 How to Purchase', 
                value: '```\nContact for purchase:\nWhatsApp: 01980583573\nbKash/Nagad: 01980583573\n```', 
                inline: false 
            },
            { 
                name: '⚠️ Note', 
                value: 'This is preview mode only. To purchase, please contact the admin with:\n1. Your Minecraft username\n2. Payment screenshot\n3. Transaction ID', 
                inline: false 
            }
        )
        .setFooter({ 
            text: `DrkSurvraze Shop Preview | Selected by ${interaction.user.tag}`, 
            iconURL: shopImages.logo 
        })
        .setTimestamp();

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
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
