export class OpinionStore {
    constructor() {
        if (!window.holopolisOpinionStore) {
            window.holopolisOpinionStore = 
                {"3n3dxmbjwt":{"3":{"txt":"Voy a veces a La Ingobernable por que hacen fiestas increíbles, con su buena música, cerveza barata y comida decente.","tid":3,"created":"1542118723629","tweet_id":null,"quote_src_url":null,"is_seed":true,"is_meta":false,"lang":"es","pid":0,"randomN":14.865603912521882,"remaining":37,"total":37,"translations":[],"dotdotdot":"Voy a veces a La Ingobernable por que hacen fiestas increíbles, con su buena música, cerveza bar ···"},"11":{"txt":"string","tid":11,"created":"1542197379905","tweet_id":null,"quote_src_url":null,"is_seed":true,"is_meta":false,"lang":"en","pid":0,"randomN":28.392291951090744,"remaining":37,"total":37,"translations":[],"dotdotdot":"string"},"14":{"txt":"Me parece perfecto que siga abierta.","tid":14,"created":"1542199372659","tweet_id":null,"quote_src_url":null,"is_seed":true,"is_meta":false,"lang":"es","pid":0,"randomN":219.67840584763005,"remaining":37,"total":37,"translations":[],"dotdotdot":"Me parece perfecto que siga abierta."},"15":{"txt":"Deberían hacer algo.","tid":15,"created":"1542199395899","tweet_id":null,"quote_src_url":null,"is_seed":true,"is_meta":false,"lang":"es","pid":0,"randomN":272.6263622900424,"remaining":37,"total":37,"translations":[],"dotdotdot":"Deberían hacer algo."},"16":{"txt":"cwcwece","tid":16,"created":"1542200980661","tweet_id":null,"quote_src_url":null,"is_seed":true,"is_meta":false,"lang":"cy","pid":0,"randomN":295.5182634453969,"remaining":37,"total":37,"translations":[],"dotdotdot":"cwcwece"},"17":{"txt":"hjk","tid":17,"created":"1542201055833","tweet_id":null,"quote_src_url":null,"is_seed":true,"is_meta":false,"lang":"fi","pid":0,"randomN":654.0221790592196,"remaining":37,"total":37,"translations":[],"dotdotdot":"hjk"},"19":{"txt":"尼豪媽","tid":19,"created":"1542201480208","tweet_id":null,"quote_src_url":null,"is_seed":true,"is_meta":false,"lang":"zh-TW","pid":0,"randomN":822.3875814548603,"remaining":37,"total":37,"translations":[],"dotdotdot":"尼豪媽"},"22":{"txt":"Me encanta la ingobernable, qué más decir.","tid":22,"created":"1542204923165","tweet_id":null,"quote_src_url":null,"is_seed":true,"is_meta":false,"lang":"es","pid":0,"randomN":908.5233199775795,"remaining":37,"total":37,"translations":[],"dotdotdot":"Me encanta la ingobernable, qué más decir."},"25":{"txt":"Love it","tid":25,"created":"1542213294885","tweet_id":null,"quote_src_url":null,"is_seed":true,"is_meta":false,"lang":"en","pid":0,"randomN":947.865678359777,"remaining":37,"total":37,"translations":[],"dotdotdot":"Love it"},"26":{"txt":"HOLA!","tid":26,"created":"1542282508143","tweet_id":null,"quote_src_url":null,"is_seed":true,"is_meta":false,"lang":"es","pid":0,"randomN":950.7791360214356,"remaining":37,"total":37,"translations":[],"dotdotdot":"HOLA!"}}}
            ;
        }
        this.store = window.holopolisOpinionStore;
    }

    saveOpinion(conversationId, opinionData) {
        this.store[conversationId] = this.store[conversationId] || {};
        opinionData.dotdotdot = opinionData.txt;
        const LIMIT_LENGTH = 100;
        if (opinionData.dotdotdot.length > LIMIT_LENGTH) {
            opinionData.dotdotdot = opinionData.dotdotdot.substr(0, LIMIT_LENGTH - 4) + " ···";
        }
        this.store[conversationId][opinionData.tid] = opinionData;
    }


    getOpinionsByConversationId(conversationId) {
        if (!this.store[conversationId]) {
            return [];
        }
        const result = Object.keys(this.store[conversationId])
            .map(opinionId => this.store[conversationId][opinionId])
            .map(opinion => Object.assign({"notAgreed": true}, opinion));
        return result;
    }

    
}