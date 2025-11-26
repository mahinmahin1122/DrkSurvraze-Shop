import discord
from discord.ext import commands
from discord import app_commands
import asyncio
import os

# বট সেটআপ
intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix='!', intents=intents)

# দোকানের আইটেম ডাটা
shop_items = {
    "৫০০ টোকেন": {"price": 50, "description": "৫০০ সার্ভার টোকেন"},
    "১০০০ টোকেন": {"price": 100, "description": "১০০০ সার্ভার টোকেন"},
    "২৫০০ টোকেন": {"price": 250, "description": "২৫০০ সার্ভার টোকেন"},
    "৫০০০ টোকেন": {"price": 500, "description": "৫০০০ সার্ভার টোকেন"},
    "১০০০০ টোকেন": {"price": 1000, "description": "১০০০০ সার্ভার টোকেন"},
    "ভিআইপি র‍্যাংক": {"price": 150, "description": "সার্ভারে ভিআইপি র‍্যাংক"}
}

class ShopView(discord.ui.View):
    def __init__(self):
        super().__init__(timeout=None)
    
    @discord.ui.select(
        placeholder="একটি আইটেম সিলেক্ট করুন...",
        min_values=1,
        max_values=1,
        options=[
            discord.SelectOption(label="৫০০ টোকেন", description="দাম: ৫০ টাকা", emoji="🪙"),
            discord.SelectOption(label="১০০০ টোকেন", description="দাম: ১০০ টাকা", emoji="🪙"),
            discord.SelectOption(label="২৫০০ টোকেন", description="দাম: ২৫০ টাকা", emoji="🪙"),
            discord.SelectOption(label="৫০০০ টোকেন", description="দাম: ৫০০ টাকা", emoji="🪙"),
            discord.SelectOption(label="১০০০০ টোকেন", description="দাম: ১০০০ টাকা", emoji="🪙"),
            discord.SelectOption(label="ভিআইপি র‍্যাংক", description="দাম: ১৫০ টাকা", emoji="⭐")
        ]
    )
    async def select_callback(self, interaction: discord.Interaction, select: discord.ui.Select):
        selected_item = select.values[0]
        item_data = shop_items[selected_item]
        
        # ক্রয় এম্বেড তৈরি
        embed = discord.Embed(
            title=f"ক্রয়: {selected_item}",
            description=f"**দাম:** {item_data['price']} টাকা\n**বিবরণ:** {item_data['description']}",
            color=0x00ff00
        )
        
        embed.add_field(
            name="ক্রয়ের পদ্ধতি:",
            value="১. আমাদের বিকাশ নম্বরে টাকা সেন্ড মানি করুন\n২. নিচের 'ক্রয় করুন' বাটনে ক্লিক করুন\n৩. আপনার পেমেন্টের তথ্য দিন\n৪. কনফার্মেশন DM এর জন্য অপেক্ষা করুন",
            inline=False
        )
        
        embed.add_field(
            name="বিকাশ নম্বর:",
            value="`01XXXXXXXXX`",  # আপনার আসল বিকাশ নম্বর দিন
            inline=True
        )
        
        embed.set_footer(text="ভেরিফিকেশনের পর আপনার আইটেম অটোমেটিক ডেলিভারি হবে")
        
        # ক্রয় বাটন তৈরি
        view = PurchaseView(selected_item, item_data)
        await interaction.response.send_message(embed=embed, view=view, ephemeral=True)

class PurchaseView(discord.ui.View):
    def __init__(self, item_name, item_data):
        super().__init__(timeout=300)  # ৫ মিনিট টাইমআউট
        self.item_name = item_name
        self.item_data = item_data
    
    @discord.ui.button(label="ক্রয় করুন", style=discord.ButtonStyle.green, emoji="🛒")
    async def purchase_button(self, interaction: discord.Interaction, button: discord.ui.Button):
        # ক্রয় ফর্ম সেন্ড
        modal = PurchaseModal(self.item_name, self.item_data)
        await interaction.response.send_modal(modal)

class PurchaseModal(discord.ui.Modal, title="ক্রয় ফর্ম"):
    def __init__(self, item_name, item_data):
        super().__init__()
        self.item_name = item_name
        self.item_data = item_data
    
    bkash_number = discord.ui.TextInput(
        label="আপনার বিকাশ নম্বর",
        placeholder="01XXXXXXXXX",
        max_length=11,
        min_length=11
    )
    
    transaction_id = discord.ui.TextInput(
        label="বিকাশ ট্রানজেকশন আইডি",
        placeholder="ট্রানজেকশন আইডি লিখুন",
        max_length=20
    )
    
    minecraft_username = discord.ui.TextInput(
        label="মাইনক্রাফট ইউজারনেম",
        placeholder="আপনার গেমের ইউজারনেম",
        max_length=20
    )
    
    async def on_submit(self, interaction: discord.Interaction):
        # ক্রয় প্রসেস
        embed = discord.Embed(
            title="ক্রয় সাবমিট হয়েছে!",
            description=f"**আইটেম:** {self.item_name}\n**দাম:** {self.item_data['price']} টাকা",
            color=0x00ff00
        )
        
        embed.add_field(name="বিকাশ নম্বর", value=self.bkash_number.value, inline=True)
        embed.add_field(name="ট্রানজেকশন আইডি", value=self.transaction_id.value, inline=True)
        embed.add_field(name="মাইনক্রাফট ইউজারনেম", value=self.minecraft_username.value, inline=True)
        embed.add_field(name="স্ট্যাটাস", value="⏳ ভেরিফিকেশন পেন্ডিং", inline=False)
        
        embed.set_footer(text="আপনার ক্রয় ভেরিফাই এবং ডেলিভারি হলে আপনাকে DM করা হবে")
        
        # ইউজারকে কনফার্মেশন সেন্ড
        await interaction.response.send_message(embed=embed, ephemeral=True)
        
        # অ্যাডমিন চ্যানেলে ক্রয় লগ করুন
        admin_channel = bot.get_channel(int(os.getenv('ADMIN_CHANNEL_ID')))
        if admin_channel:
            log_embed = discord.Embed(
                title="নতুন ক্রয়",
                description=f"**ইউজার:** {interaction.user.mention}\n**আইটেম:** {self.item_name}",
                color=0xffff00
            )
            log_embed.add_field(name="বিকাশ", value=self.bkash_number.value, inline=True)
            log_embed.add_field(name="ট্রানজেকশন আইডি", value=self.transaction_id.value, inline=True)
            log_embed.add_field(name="মাইনক্রাফট ইউজারনেম", value=self.minecraft_username.value, inline=True)
            
            admin_view = AdminActions(interaction.user.id, self.item_name, self.minecraft_username.value)
            await admin_channel.send(embed=log_embed, view=admin_view)

class AdminActions(discord.ui.View):
    def __init__(self, user_id, item_name, minecraft_username):
        super().__init__(timeout=None)
        self.user_id = user_id
        self.item_name = item_name
        self.minecraft_username = minecraft_username
    
    @discord.ui.button(label="অনুমোদন", style=discord.ButtonStyle.green, emoji="✅")
    async def approve(self, interaction: discord.Interaction, button: discord.ui.Button):
        user = await bot.fetch_user(self.user_id)
        
        # ইউজারকে কনফার্মেশন DM সেন্ড
        try:
            user_embed = discord.Embed(
                title="ক্রয় ভেরিফাই হয়েছে! ✅",
                description=f"**{self.item_name}** এর আপনার ক্রয় ভেরিফাই এবং ডেলিভারি হয়েছে।",
                color=0x00ff00
            )
            user_embed.add_field(name="মাইনক্রাফট ইউজারনেম", value=self.minecraft_username, inline=True)
            user_embed.set_footer(text="ক্রয় করার জন্য ধন্যবাদ!")
            
            await user.send(embed=user_embed)
            
            # অ্যাডমিন মেসেজ আপডেট
            embed = interaction.message.embeds[0]
            embed.color = 0x00ff00
            embed.set_field_at(-1, name="স্ট্যাটাস", value="✅ অনুমোদিত ও ডেলিভার্ড", inline=False)
            
            await interaction.message.edit(embed=embed, view=None)
            await interaction.response.send_message("ক্রয় অনুমোদিত হয়েছে এবং ইউজারকে নোটিফাই করা হয়েছে!", ephemeral=True)
            
        except discord.Forbidden:
            await interaction.response.send_message("ইউজারকে DM সেন্ড করা যায়নি (DM ক্লোজড)", ephemeral=True)
    
    @discord.ui.button(label="রিজেক্ট", style=discord.ButtonStyle.red, emoji="❌")
    async def reject(self, interaction: discord.Interaction, button: discord.ui.Button):
        user = await bot.fetch_user(self.user_id)
        
        try:
            user_embed = discord.Embed(
                title="ক্রয় রিজেক্ট হয়েছে ❌",
                description=f"**{self.item_name}** এর আপনার ক্রয় ভেরিফাই করা যায়নি।",
                color=0xff0000
            )
            user_embed.add_field(
                name="কারণ", 
                value="ট্রানজেকশন ভেরিফাই করা যায়নি। ভুল হলে সাপোর্টে কন্টাক্ট করুন।",
                inline=False
            )
            
            await user.send(embed=user_embed)
            
            # অ্যাডমিন মেসেজ আপডেট
            embed = interaction.message.embeds[0]
            embed.color = 0xff0000
            embed.set_field_at(-1, name="স্ট্যাটাস", value="❌ রিজেক্টেড", inline=False)
            
            await interaction.message.edit(embed=embed, view=None)
            await interaction.response.send_message("ক্রয় রিজেক্ট হয়েছে এবং ইউজারকে নোটিফাই করা হয়েছে!", ephemeral=True)
            
        except discord.Forbidden:
            await interaction.response.send_message("ইউজারকে DM সেন্ড করা যায়নি (DM ক্লোজড)", ephemeral=True)

@bot.event
async def on_ready():
    print(f'{bot.user} সফলভাবে লগইন করেছে!')
    try:
        synced = await bot.tree.sync()
        print(f"{len(synced)}টি কমান্ড সিঙ্ক হয়েছে")
    except Exception as e:
        print(f"কমান্ড সিঙ্ক করতে error: {e}")

@bot.tree.command(name="shop", description="সার্ভার দোকান খুলুন")
async def shop(interaction: discord.Interaction):
    embed = discord.Embed(
        title="🏪 বিএমসি সার্ভার শপ",
        description="সার্ভার দোকানে স্বাগতম! নিচের ড্রপডাউন মেনু থেকে একটি আইটেম সিলেক্ট করুন এবং ক্রয় করুন।",
        color=0x7289da
    )
    
    embed.add_field(
        name="ক্রয়ের পদ্ধতি:",
        value="১. ড্রপডাউন থেকে একটি আইটেম সিলেক্ট করুন\n২. আমাদের বিকাশ নম্বরে প্রয়োজনীয় পরিমাণ টাকা সেন্ড করুন\n৩. 'ক্রয় করুন' বাটনে ক্লিক করুন এবং আপনার তথ্য দিন\n৪. কনফার্মেশন DM এর জন্য অপেক্ষা করুন। আপনার আইটেম অটোমেটিক ডেলিভারি হবে",
        inline=False
    )
    
    embed.set_footer(text="বাংলা মাইনক্রাফট কমিউনিটি")
    
    view = ShopView()
    await interaction.response.send_message(embed=embed, view=view)

# বট রান
if __name__ == "__main__":
    bot.run(os.getenv('DISCORD_BOT_TOKEN'))
