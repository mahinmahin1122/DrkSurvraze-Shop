const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// দোকানের আইটেম ডাটা
const shopItems = {
    "500 Token": { price: 50, description: "500 সার্ভার টোকেন" },
    "1000 Token": { price: 100, description: "1000 সার্ভার টোকেন" },
    "2500 Token": { price: 250, description: "2500 সার্ভার টোকেন" },
    "5000 Token": { price: 500, description: "5000 সার্ভার টোকেন" },
    "10000 Token": { price: 1000, description: "10000 সার্ভার টোকেন" },
    "VIP RANK": { price: 150, description: "সার্ভারে VIP র‍্যাংক" }
};

client.once('ready', () => {
    console.log(`✅ ${client.user.tag} বট চালু হয়েছে!`);
    
    // Slash command রেজিস্টার করি
    const commands = [{
        name: 'shop',
        description: 'সার্ভার দোকান খুলুন'
    }];

    client.application.commands.set(commands);
    console.log('🛒 Shop command রেজিস্টার্ড হয়েছে');
});

// Slash command হ্যান্ডলার
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'shop') {
        const embed = new EmbedBuilder()
            .setTitle("🏪 BMC সার্ভার শপ")
            .setDescription("সার্ভার দোকানে স্বাগতম! নিচের ড্রপডাউন মেনু থেকে একটি আইটেম সিলেক্ট করুন এবং ক্রয় করুন।")
            .setColor(0x7289da)
            .addFields(
                {
                    name: "ক্রয়ের পদ্ধতি:",
                    value: "১. ড্রপডাউন থেকে একটি আইটেম সিলেক্ট করুন\n২. আমাদের বিকাশ নম্বরে প্রয়োজনীয় পরিমাণ টাকা সেন্ড করুন\n৩. 'ক্রয় করুন' বাটনে ক্লিক করুন এবং আপনার তথ্য দিন\n৪. কনফার্মেশন DM এর জন্য অপেক্ষা করুন। আপনার আইটেম অটোমেটিক ডেলিভারি হবে",
                    inline: false
                }
            )
            .setFooter({ text: "বাংলা মাইনক্রাফট কমিউনিটি" });

        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('item_select')
            .setPlaceholder('একটি আইটেম সিলেক্ট করুন...')
            .addOptions([
                {
                    label: "500 Token",
                    description: "দাম: 50 টাকা",
                    value: "500 Token",
                    emoji: "🪙"
                },
                {
                    label: "1000 Token",
                    description: "দাম: 100 টাকা",
                    value: "1000 Token",
                    emoji: "🪙"
                },
                {
                    label: "2500 Token",
                    description: "দাম: 250 টাকা",
                    value: "2500 Token",
                    emoji: "🪙"
                },
                {
                    label: "5000 Token",
                    description: "দাম: 500 টাকা",
                    value: "5000 Token",
                    emoji: "🪙"
                },
                {
                    label: "10000 Token",
                    description: "দাম: 1000 টাকা",
                    value: "10000 Token",
                    emoji: "🪙"
                },
                {
                    label: "VIP RANK",
                    description: "দাম: 150 টাকা",
                    value: "VIP RANK",
                    emoji: "⭐"
                }
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({
            embeds: [embed],
            components: [row]
        });
    }
});

// আইটেম সিলেক্ট হ্যান্ডলার
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'item_select') {
        const selectedItem = interaction.values[0];
        const itemData = shopItems[selectedItem];

        const embed = new EmbedBuilder()
            .setTitle(`ক্রয়: ${selectedItem}`)
            .setDescription(`**দাম:** ${itemData.price} টাকা\n**বিবরণ:** ${itemData.description}`)
            .setColor(0x00ff00)
            .addFields(
                {
                    name: "ক্রয়ের পদ্ধতি:",
                    value: "১. আমাদের বিকাশ নম্বরে টাকা সেন্ড মানি করুন\n২. নিচের 'ক্রয় করুন' বাটনে ক্লিক করুন\n৩. আপনার পেমেন্টের তথ্য দিন\n৪. কনফার্মেশন DM এর জন্য অপেক্ষা করুন",
                    inline: false
                },
                {
                    name: "বিকাশ নম্বর:",
                    value: "`01XXXXXXXXX`", // আপনার আসল বিকাশ নম্বর দিন
                    inline: true
                }
            )
            .setFooter({ text: "ভেরিফিকেশনের পর আপনার আইটেম অটোমেটিক ডেলিভারি হবে" });

        const purchaseButton = new ButtonBuilder()
            .setCustomId(`purchase_${selectedItem}`)
            .setLabel("ক্রয় করুন")
            .setStyle(ButtonStyle.Success)
            .setEmoji("🛒");

        const row = new ActionRowBuilder().addComponents(purchaseButton);

        await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        });
    }
});

// ক্রয় বাটন হ্যান্ডলার
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith('purchase_')) {
        const itemName = interaction.customId.replace('purchase_', '');
        const itemData = shopItems[itemName];

        // মোডাল তৈরি করুন
        const modal = new ModalBuilder()
            .setCustomId(`purchase_modal_${itemName}`)
            .setTitle('ক্রয় ফর্ম');

        // বিকাশ নম্বর ইনপুট
        const bkashInput = new TextInputBuilder()
            .setCustomId('bkash_number')
            .setLabel("আপনার বিকাশ নম্বর")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("01XXXXXXXXX")
            .setMaxLength(11)
            .setMinLength(11)
            .setRequired(true);

        // ট্রানজেকশন আইডি ইনপুট
        const transactionInput = new TextInputBuilder()
            .setCustomId('transaction_id')
            .setLabel("বিকাশ ট্রানজেকশন আইডি")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("ট্রানজেকশন আইডি লিখুন")
            .setMaxLength(20)
            .setRequired(true);

        // মাইনক্রাফট ইউজারনেম ইনপুট
        const usernameInput = new TextInputBuilder()
            .setCustomId('minecraft_username')
            .setLabel("মাইনক্রাফট ইউজারনেম")
            .setStyle(TextInputStyle.Short)
            .setPlaceholder("আপনার গেমের ইউজারনেম")
            .setMaxLength(20)
            .setRequired(true);

        // একশন রো
        const firstActionRow = new ActionRowBuilder().addComponents(bkashInput);
        const secondActionRow = new ActionRowBuilder().addComponents(transactionInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(usernameInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

        await interaction.showModal(modal);
    }
});

// মোডাল সাবমিট হ্যান্ডলার
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId.startsWith('purchase_modal_')) {
        const itemName = interaction.customId.replace('purchase_modal_', '');
        const itemData = shopItems[itemName];

        const bkashNumber = interaction.fields.getTextInputValue('bkash_number');
        const transactionId = interaction.fields.getTextInputValue('transaction_id');
        const minecraftUsername = interaction.fields.getTextInputValue('minecraft_username');

        // ইউজারকে কনফার্মেশন এম্বেড
        const userEmbed = new EmbedBuilder()
            .setTitle("ক্রয় সাবমিট হয়েছে!")
            .setDescription(`**আইটেম:** ${itemName}\n**দাম:** ${itemData.price} টাকা`)
            .setColor(0x00ff00)
            .addFields(
                { name: "বিকাশ নম্বর", value: bkashNumber, inline: true },
                { name: "ট্রানজেকশন আইডি", value: transactionId, inline: true },
                { name: "মাইনক্রাফট ইউজারনেম", value: minecraftUsername, inline: true },
                { name: "স্ট্যাটাস", value: "⏳ ভেরিফিকেশন পেন্ডিং", inline: false }
            )
            .setFooter({ text: "আপনার ক্রয় ভেরিফাই এবং ডেলিভারি হলে আপনাকে DM করা হবে" });

        await interaction.reply({
            embeds: [userEmbed],
            ephemeral: true
        });

        // অ্যাডমিন চ্যানেলে নোটিফিকেশন
        const adminChannel = client.channels.cache.get(process.env.ADMIN_CHANNEL_ID);
        if (adminChannel) {
            const adminEmbed = new EmbedBuilder()
                .setTitle("নতুন ক্রয়")
                .setDescription(`**ইউজার:** ${interaction.user.tag}\n**আইটেম:** ${itemName}`)
                .setColor(0xffff00)
                .addFields(
                    { name: "বিকাশ", value: bkashNumber, inline: true },
                    { name: "ট্রানজেকশন আইডি", value: transactionId, inline: true },
                    { name: "মাইনক্রাফট ইউজারনেম", value: minecraftUsername, inline: true },
                    { name: "স্ট্যাটাস", value: "⏳ পেন্ডিং অ্যাপ্রুভাল", inline: false }
                );

            const approveButton = new ButtonBuilder()
                .setCustomId(`approve_${interaction.user.id}_${itemName}`)
                .setLabel("অনুমোদন")
                .setStyle(ButtonStyle.Success)
                .setEmoji("✅");

            const rejectButton = new ButtonBuilder()
                .setCustomId(`reject_${interaction.user.id}_${itemName}`)
                .setLabel("রিজেক্ট")
                .setStyle(ButtonStyle.Danger)
                .setEmoji("❌");

            const row = new ActionRowBuilder().addComponents(approveButton, rejectButton);

            await adminChannel.send({
                embeds: [adminEmbed],
                components: [row]
            });
        }
    }
});

// অ্যাডমিন অ্যাকশন হ্যান্ডলার
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith('approve_')) {
        const [_, userId, itemName] = interaction.customId.split('_');
        const user = await client.users.fetch(userId);

        try {
            const userEmbed = new EmbedBuilder()
                .setTitle("ক্রয় ভেরিফাই হয়েছে! ✅")
                .setDescription(`**${itemName}** এর আপনার ক্রয় ভেরিফাই এবং ডেলিভারি হয়েছে।`)
                .setColor(0x00ff00)
                .setFooter({ text: "ক্রয় করার জন্য ধন্যবাদ!" });

            await user.send({ embeds: [userEmbed] });

            // অ্যাডমিন মেসেজ আপডেট
            const embed = interaction.message.embeds[0];
            embed.data.fields[3].value = "✅ অনুমোদিত ও ডেলিভার্ড";
            embed.data.color = 0x00ff00;

            await interaction.message.edit({
                embeds: [embed],
                components: []
            });

            await interaction.reply({
                content: "ক্রয় অনুমোদিত হয়েছে এবং ইউজারকে নোটিফাই করা হয়েছে!",
                ephemeral: true
            });

        } catch (error) {
            await interaction.reply({
                content: "ইউজারকে DM সেন্ড করা যায়নি (DM ক্লোজড)",
                ephemeral: true
            });
        }
    }

    if (interaction.customId.startsWith('reject_')) {
        const [_, userId, itemName] = interaction.customId.split('_');
        const user = await client.users.fetch(userId);

        try {
            const userEmbed = new EmbedBuilder()
                .setTitle("ক্রয় রিজেক্ট হয়েছে ❌")
                .setDescription(`**${itemName}** এর আপনার ক্রয় ভেরিফাই করা যায়নি।`)
                .setColor(0xff0000)
                .addFields({
                    name: "কারণ",
                    value: "ট্রানজেকশন ভেরিফাই করা যায়নি। ভুল হলে সাপোর্টে কন্টাক্ট করুন।",
                    inline: false
                });

            await user.send({ embeds: [userEmbed] });

            // অ্যাডমিন মেসেজ আপডেট
            const embed = interaction.message.embeds[0];
            embed.data.fields[3].value = "❌ রিজেক্টেড";
            embed.data.color = 0xff0000;

            await interaction.message.edit({
                embeds: [embed],
                components: []
            });

            await interaction.reply({
                content: "ক্রয় রিজেক্ট হয়েছে এবং ইউজারকে নোটিফাই করা হয়েছে!",
                ephemeral: true
            });

        } catch (error) {
            await interaction.reply({
                content: "ইউজারকে DM সেন্ড করা যায়নি (DM ক্লোজড)",
                ephemeral: true
            });
        }
    }
});

// বট লগইন
client.login(process.env.DISCORD_BOT_TOKEN);
