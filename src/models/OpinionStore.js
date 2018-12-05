export class OpinionStore {
    constructor() {
        if (!window.holopolisOpinionStore) {
            window.holopolisOpinionStore = {};
        }
        this.store = window.holopolisOpinionStore;
    }

    saveOpinion(conversationId, opinionData) {
        this.store[conversationId] = this.store[conversationId] || {};
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
