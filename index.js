// Handle Order Approval - SIMPLIFIED (Only sends DM)
async function handleOrderApproval(interaction, message, embed, customerId, minecraftUsername, itemName, itemPrice, orderId, discordUsername) {
    console.log(`✅ Order approval requested for customer: ${customerId}, Order ID: ${orderId}`);
    
    try {
        // Step 1: Send immediate response to admin
        await interaction.reply({
            content: `🔄 Sending approval DM to customer...`,
            ephemeral: true
        });

        // Step 2: ONLY SEND DM TO CUSTOMER
        if (customerId) {
            try {
                // Fetch the customer
                const customer = await client.users.fetch(customerId);
                
                // Create simple DM message
                const dmContent = `🎉 **CONGRATULATIONS!**\n\n✅ **YOUR ORDER HAS BEEN APPROVED!**\n\n━━━━━━━━━━━━━━━━━━━━━━\n**📦 ORDER DETAILS**\n━━━━━━━━━━━━━━━━━━━━━━\n• **Order ID:** ${orderId}\n• **Item:** ${itemName}\n• **Price:** ${itemPrice}\n• **Minecraft:** ${minecraftUsername}\n\n━━━━━━━━━━━━━━━━━━━━━━\n**📝 DELIVERY INSTRUCTIONS**\n━━━━━━━━━━━━━━━━━━━━━━\n1. Please join our Minecraft server\n2. Make sure you are online\n3. Your ${itemName.includes('Token') ? 'tokens will be added' : 'rank will be upgraded'} shortly\n4. Contact support if any issue\n\n**DrkSurvraze Minecraft Community** 🎮`;
                
                // Send DM
                await customer.send(dmContent);
                console.log(`📩 Approval DM sent to: ${customer.tag} (ID: ${customerId})`);
                
                // Update admin confirmation
                await interaction.editReply({
                    content: `✅ **APPROVED!** DM sent to:\n**User:** ${discordUsername || customer.tag}\n**Order ID:** ${orderId}\n**Item:** ${itemName}\n\n📩 Customer has been notified.`
                });
                
            } catch (dmError) {
                console.log(`❌ DM Error: ${dmError.message}`);
                await interaction.editReply({
                    content: `❌ Could not send DM to customer.\n**Possible reasons:**\n1. User has DMs disabled\n2. User blocked the bot\n3. Network issue\n\n**Order ID:** ${orderId}\n**Customer:** ${discordUsername || 'Unknown'}`
                });
            }
        } else {
            await interaction.editReply({
                content: `❌ Customer ID not found in order.\n**Order ID:** ${orderId}\n**Please contact admin manually.**`
            });
        }

    } catch (error) {
        console.error('❌ Main error:', error);
        try {
            await interaction.editReply({
                content: `❌ Unexpected error: ${error.message}\n**Order ID:** ${orderId}`
            });
        } catch (e) {
            console.log('❌ Could not send error message');
        }
    }
}

// Handle Order Rejection - SIMPLIFIED (Only sends DM)
async function handleOrderRejection(interaction, message, embed, customerId, minecraftUsername, itemName, itemPrice, orderId, discordUsername) {
    console.log(`❌ Order rejection requested for Order ID: ${orderId}`);
    
    try {
        // First ask for rejection reason
        const rejectionModal = new ModalBuilder()
            .setCustomId(`rejection_modal_simple_${orderId}`)
            .setTitle('❌ Rejection Reason');

        const reasonInput = new TextInputBuilder()
            .setCustomId('rejection_reason')
            .setLabel('Why rejecting this order?')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Example: Wrong payment, Invalid ID, etc.')
            .setRequired(true)
            .setMaxLength(100);

        const modalRow = new ActionRowBuilder().addComponents(reasonInput);
        rejectionModal.addComponents(modalRow);

        await interaction.showModal(rejectionModal);
        
    } catch (error) {
        console.error('❌ Rejection modal error:', error);
        await interaction.reply({
            content: `❌ Error: ${error.message}`,
            ephemeral: true
        });
    }
}

// Handle Rejection Modal - SIMPLIFIED
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId.startsWith('rejection_modal_simple_')) {
        const orderId = interaction.customId.split('_')[3];
        const rejectionReason = interaction.fields.getTextInputValue('rejection_reason');
        
        await interaction.reply({
            content: `🔄 Processing rejection for Order ID: ${orderId}...`,
            ephemeral: true
        });

        // Extract customer info from original message
        const message = interaction.message;
        const embed = message.embeds[0];
        
        let customerId = null;
        let discordUsername = '';
        let minecraftUsername = '';
        let itemName = '';
        
        if (embed && embed.fields) {
            for (const field of embed.fields) {
                if (field.value.includes('Discord ID:')) {
                    const match = field.value.match(/Discord ID:\s*(\d+)/);
                    if (match) customerId = match[1];
                }
                if (field.value.includes('Discord User:')) {
                    const match = field.value.match(/Discord User:\s*([^\n]+)/);
                    if (match) discordUsername = match[1].trim();
                }
                if (field.value.includes('Minecraft Username:')) {
                    const match = field.value.match(/Minecraft Username:\s*([^\n]+)/);
                    if (match) minecraftUsername = match[1].trim();
                }
                if (field.value.includes('Item:')) {
                    const match = field.value.match(/Item:\s*([^\n]+)/);
                    if (match) itemName = match[1].trim();
                }
            }
        }

        // Send DM to customer
        if (customerId) {
            try {
                const customer = await client.users.fetch(customerId);
                
                const dmContent = `⚠️ **ORDER REJECTED**\n\n❌ **YOUR ORDER HAS BEEN REJECTED**\n\n━━━━━━━━━━━━━━━━━━━━━━\n**📦 ORDER DETAILS**\n━━━━━━━━━━━━━━━━━━━━━━\n• **Order ID:** ${orderId}\n• **Item:** ${itemName}\n• **Minecraft:** ${minecraftUsername}\n\n━━━━━━━━━━━━━━━━━━━━━━\n**📝 REJECTION REASON**\n━━━━━━━━━━━━━━━━━━━━━━\n${rejectionReason}\n\n━━━━━━━━━━━━━━━━━━━━━━\n**🔄 WHAT TO DO NEXT**\n━━━━━━━━━━━━━━━━━━━━━━\n1. Check payment details\n2. Verify transaction ID\n3. Contact support if needed\n4. You can place order again\n\n**DrkSurvraze Support Team** 🛠️`;
                
                await customer.send(dmContent);
                console.log(`📩 Rejection DM sent to: ${customer.tag}`);
                
                await interaction.editReply({
                    content: `✅ **REJECTED!** DM sent to customer.\n**Order ID:** ${orderId}\n**Reason:** ${rejectionReason}`
                });
                
            } catch (dmError) {
                await interaction.editReply({
                    content: `✅ Order rejected but could not send DM.\n**Order ID:** ${orderId}\n**Reason:** ${rejectionReason}`
                });
            }
        } else {
            await interaction.editReply({
                content: `✅ Order rejected.\n**Order ID:** ${orderId}\n**Reason:** ${rejectionReason}\n⚠️ No customer ID found`
            });
        }
    }
});

// Handle Order Dismiss - SIMPLIFIED (No DM sent)
async function handleOrderDismiss(interaction, message, embed, customerId, minecraftUsername, itemName, itemPrice, orderId, discordUsername) {
    console.log(`🚫 Order dismissal for Order ID: ${orderId}`);
    
    await interaction.reply({
        content: `🚫 Order **${orderId}** dismissed.\n**Customer:** ${discordUsername || minecraftUsername}\n**Note:** No DM sent to customer.`,
        ephemeral: true
    });
}
