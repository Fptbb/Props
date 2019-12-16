//Sistema de ajuda para bots no discord extremamente automatizado, usem o proprio handler é sistema de cache é paginação caso queira usar
var {randomQuest,Pagina} = require('../../modulos/index')
module.exports = {
    comando: 'ajuda',
    args: "[comando]",
    util: "Mostra exatamente esse comando.",
    desc: "",
    aliases: ['help','mayday'],
    locais: 'any',
    rodar: async ({call,message,client,command,commands,args,prefixoUsado,aliasUsada,conteudo}) => {
        var embeds = [
            {embed: 'embed', titulo: `Inicio`, emoji: '642101759405457418', allowed: null, desc: 'Voltar para essa pagina.'},
            {embed: 'userembed', titulo: `Membros`, emoji: '642101404701556738', allowed: null, desc: 'Todos os Comandos Uteis que membros podem querer usar.'},
            {embed: 'funembed', titulo: `Aleatoriedades`, emoji: '642101795748839424', allowed: null, desc: 'Comandos fofos ou de menes.'},
            {embed: 'adminembed', titulo: `Admins`, emoji: '642100369970823180', allowed: c.RoAdmin, desc: 'Comandos apenas para admins, alguns apenas para Ministros.'},
            {embed: 'configembed', titulo: `Configuração`,  emoji: '🔧', allowed: c.OWNERS, desc: 'Comandos restritos.'}
        ]
        var categorias = [
            {cat: 'Admin Discord', embed: 'adminembed', texto: "Discord"},
            {cat: 'Admin Roblox', embed: 'adminembed', texto: "Roblox"},
            {cat: 'Membro Discord', embed: 'userembed', texto: "Discord"},
            {cat: 'Membro Roblox', embed: 'userembed', texto: "Roblox"},
            {cat: 'Engraçado', embed: 'funembed', texto: "Diversão"},
            {cat: 'Configuração', embed: 'configembed', texto: "Configuração"}
        ]
        var array = conteudo.split(':')
        var c1 = array[0]
        var trocar = {
            'chuckcount': randomQuest('quantidade', 'chuck')
        }
        var help = new RichEmbed()
            .setAuthor(`${message.author.username} pediu ajuda?`,message.author.avatarURL)
            .setTitle('Ajuda')
            .setDescription('Use as reações para ir aos comandos, Digite um comando como argumento desse, para visualizar detalhes e ajuda. **Prefixos atuais: '+c.prefixes[0]+', '+c.prefixes[1]+'**\n<> =`Argumento Obrigatorio`\n[] = `Argumento Opcional`')
            .addField('Categorias',`<:RoBrazil:642101759405457418> **Inicio**: Voltar para essa pagina.\n`)
            .setColor(0x16c60c)
            .setFooter(`${c.bot} | Atualmente tenho ${comandos.size} comandos.`,client.user.avatarURL)
        if(c.HelpData.status == false){
            new Promise(function(resolve, reject) {
                embeds.forEach(embed => {
                    if(embed.embed == 'embed'){
                        c.HelpData.embed = help
                    }else{
                        c.HelpData[embed.embed] = new RichEmbed().setAuthor(`Comandos para ${embed.titulo}`).setTitle(`${embed.desc}`).setColor(0x36393f)
                        .setFooter(`${c.bot} | Atualmente tenho ${comandos.size} comandos.`)
                    }
                    
                });
                categorias.forEach(cat => {
                    cat.local = []
                    cat.string = []
                });
                resolve();
            }).then(function() {
                Array.from(comandos).forEach(function (e) {
                    var find = categorias.find(x => x.cat == e[1].category);
                    if (find) {
                        if (e[1].args == undefined) {
                            find.local.push("• `" + e[1].comando + "`: " + e[1].util);
                        }
                        else {
                            find.local.push("• `" + e[1].comando + " " + e[1].args + "`: " + e[1].util);
                        }
                    }
                });
                return;
            }).then(function() {
                categorias.forEach( element => {
                    var a = element.local.join("afkfdp").match(/.{1,1023}/g)
                    if(a.length > 1){
                        var i = 0;
                        for (; i < a.length-1; i++) {
                            str = a[i]
                            str2 = a[i+1]
                            var trocar1 = str.substring(str.lastIndexOf("•"), str.length);
                            element.string[i] = str.replace(trocar1,"")
                            element.string[i+1] = trocar1 + str2
                        }
                    }else{
                        element.string = a
                    }
                });
                return;
            }).then(function() {
                categorias.forEach( element => {
                    for (var i = 0, len = element.string.length; i < len; i++) {
                        if(i == 0){
                            c.HelpData[element.embed].addField(element.texto,`${functions.rep(element.string[i].replace(/afkfdp/g, '\n'),trocar)}`)
                        }else{
                            c.HelpData[element.embed].addField(`\u200B`,`${functions.rep(element.string[i].replace(/afkfdp/g, '\n'),trocar)}`)
                        }
                    }
                });
                return;
            });
            c.HelpData.status = true
        }
        if(!c1){
            const botoes = []
            new Promise(async function(resolve, reject) {
                await Promise.all(embeds.map(async (embed) => {
                    if(await embed.embed == 'embed'){
                        buttons.push({ emoji: embed.emoji,
                            run: (user, message) => {
                                message.edit({embed: help});
                            }
                        })
                    }else{
                        if(await embed.allowed != null){
                            if(await embed.allowed.includes(message.author.id)){
                                help.fields[0].value = help.fields[0].value + `${embed.emoji.length <= 3 ? embed.emoji : message.client.emojis.get(String(embed.emoji)).toString()} ${embed.titulo}: ${embed.desc}\n`
                                buttons.push({ emoji: embed.emoji,
                                    run: (user, message) => {
                                        message.edit({embed: c.HelpData[embed.embed]});
                                    }
                                }) 
                            }
                        }else{
                            help.fields[0].value = help.fields[0].value + `${embed.emoji.length <= 3 ? embed.emoji : message.client.emojis.get(String(embed.emoji)).toString()} ${embed.titulo}: ${embed.desc}\n`
                            buttons.push({ emoji: embed.emoji,
                                run: (user, message) => {
                                    message.edit({embed: c.HelpData[embed.embed]});
                                }
                            })
                        }
                    }
                }));
                await resolve();
            }).then(function() {
                let menu = new Pagina.Menu(help, botoes, {owner: message.author.id})
                message.author.enviar(menu).then(()=>{
                    if(message.guild === null) return;
                    functions.embed(`Verifique suas mensagens privadas.`,`sucesso`,call)
                    return;
                }).catch((err)=>{
                    if(err.code == 50007){
                        functions.falta(call,`Não consigo enviar a mensagem você pois seu PV e fechado.`)
                        return;
                    }else{
                        functions.falta(call,`Algo deu errado ao te enviar a mensagem, chame o fp.`)
                        return;
                    }
                });
                handlerreactions.adicionar(menu)
            });
        }else if(c1){
            var find = Array.from(comandos).find(x=>x[1].comando == c1 || typeof x[1].aliases == 'object' && x[1].aliases.filter(function (el) {return typeof el == 'string'}).indexOf(c1) != -1)
            if(find != undefined){
                functions.embed(functions.rep(`
                Comando: **${find[1].comando}**\nCategoria: **${find[1].category}**${find[1].args ? `\nArgumentos: **${find[1].args}**` : ``}${find[1].util ? `\nDescrição: **${find[1].util}**` : ``}${find[1].aliases.filter(function (el) {return typeof el == 'string'}).length >= 1 ? `\nPseudonimos/Aliasses: **${find[1].aliases.filter(function (el) {return typeof el == 'string'}).join()}**` : ``}\n \nAjuda: \n`+(find[1].desc || "Sem texto de ajuda"),{'chuckcount': randomQuest('quantidade', 'chuck')}),`sucesso`,call)
                return;
            }else{
                await functions.falta(call,`Comando não encontrado.`)
                return;
            }
        }
    }
};
