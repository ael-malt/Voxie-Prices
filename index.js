require("module-alias/register");

//Requiered commands imports

const Discord = require("discord.js");
const client = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
//Required paths

const config = require("@root/config.json");
const loadCommands = require("@root/commands/load-commands");
const https = require("https")

//BOT loader

client.on("ready", () => {
    console.log(`${client.user.username} is ready!`);
    const {
        prefix
    } = config;
    client.user.setActivity(` Voxies Stonking`, {
        type: "WATCHING"
    });

    //Importing addons

    loadCommands(client);
});

client.on("ready", () => {
    function getPrices() {
        https
            .get(`https://voxies-prices.fgh.lt/prices`, (resp) => {
                let data = "";

                resp.on("data", (chunk) => {
                    data += chunk;
                });

                resp.on("end", async () => {
                    const prices = JSON.parse(data);

                    const GodlyChannel = client.channels.cache.get("884535710193967115");
                    const LegendaryChannel = client.channels.cache.get("884536339029180457");
                    const EpicChannel = client.channels.cache.get("884536363444228096");
                    const RareChannel = client.channels.cache.get("884536399888523295");
                    const UncommonChannel = client.channels.cache.get("884536416665743390");
                    const CommonChannel = client.channels.cache.get("884536461905498205");

                    //Godly
                    try {
                        var Godly = "🟡 Godly: " + addComma(prices.Godly.price) + ' ' + prices.Godly.symbol
                        GodlyChannel.setName(Godly);
                    } catch {
                        var Godly = "🟡 Godly: None"
                        GodlyChannel.setName(Godly);
                    }
                    //Legendary
                    try {
                        var Legendary = "🟠 Legendary: " + addComma(prices.Legendary.price) + ' ' + prices.Legendary.symbol
                        LegendaryChannel.setName(Legendary);
                    } catch {
                        var Legendary = "🟠 Legendary: None"
                        LegendaryChannel.setName(Legendary);
                    }
                    //Epic
                    try {
                        var Epic = "🟣 Epic: " + addComma(prices.Epic.price) + ' ' + prices.Epic.symbol
                        EpicChannel.setName(Epic);
                    } catch {
                        var Epic = "🟣 Epic: None"
                        EpicChannel.setName(Epic);
                    }
                    //Rare
                    try {
                        var Rare = "🔵 Rare: " + addComma(prices.Rare.price) + ' ' + prices.Rare.symbol
                        RareChannel.setName(Rare);
                    } catch {
                        var Rare = "🔵 Rare: None"
                        RareChannel.setName(Rare);
                    }
                    //Uncommon
                    try {
                        var Uncommon = "🟢 Uncommon: " + addComma(prices.Uncommon.price) + ' ' + prices.Uncommon.symbol
                        UncommonChannel.setName(Uncommon);
                    } catch {
                        var Uncommon = "🟢 Uncommon: None"
                        UncommonChannel.setName(Uncommon);
                    }
                    //Common
                    try {
                        var Common = "⚪ Common: " + addComma(prices.Common.price) + ' ' + prices.Common.symbol
                        CommonChannel.setName(Common);
                    } catch {
                        var Common = "⚪ Common: None"
                        CommonChannel.setName(Common);
                    }
                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                });
            })

        function addComma(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
    }
    getPrices();

    function start() {
        setTimeout(function () {
            getPrices()
            start();
        }, 360000);
    }
    start();
});


//Pass token to bot

client.login(config.token);