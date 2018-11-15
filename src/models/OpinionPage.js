import { PolisGateway } from './PolisGateway';
import { OpinionStore } from '../models/OpinionStore';

export class OpinionPage {
    constructor() {
        this.gateway = new PolisGateway();
        this.store = new OpinionStore();
        this.participationId = null;
        this.pidPromise = null;
        this.opinions = [];
        this.suggestions = [];
    }
    initPage(conversationId) {
        this.pidPromise = this.gateway.getPid(conversationId).then(pid => {
            this.participationId = pid;
            this.opinions = this.store.getOpinionsByConversationId(conversationId);
        });
        return Promise.all([this.gateway.restGetConversation(conversationId), this.pidPromise])
            .then(([conversationResponse, _]) => conversationResponse.data);
    }
    getSuggestionsFor(input) {
        input = input.trim().toLowerCase();
        if (input === "") return [];
        this.suggestions = this.opinions.filter(phrase => phrase.txt.toLowerCase().includes(input));
        return this.suggestions;
    }
    publishOpinion(conversationId, opinion) {
        const agid = 0;
        if (this.participationId === null) {
            throw new Error("load participation id first!");
        }
        return this.pidPromise
            .then(pid => this.gateway.restPostComment(agid, conversationId, pid, opinion))
            .then(res => this.store.saveOpinion(conversationId, Object.assign({txt: opinion}, res.data)));
    }
    agreeSuggestion(suggestion) {
        suggestion.notAgreed = false;
        return new Promise(resolve => resolve(this.suggestions));
    }
}

