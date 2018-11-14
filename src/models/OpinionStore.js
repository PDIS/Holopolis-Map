export class OpinionStore {
    constructor() {
        if (!window.holopolisOpinionStore) {
            window.holopolisOpinionStore = {};
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
            .map(opinionId => this.store[conversationId][opinionId]);
        return result;
    }

    
}