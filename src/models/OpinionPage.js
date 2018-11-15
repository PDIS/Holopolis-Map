import { PolisGateway } from './PolisGateway';
import { OpinionStore } from '../models/OpinionStore';

export class OpinionPage {
    constructor() {
        this.gateway = new PolisGateway();
        this.store = new OpinionStore();
        this.participationId = null;
        this.conversationId = null;
        this.pidPromise = null;
        this.opinions = [];
        this.suggestions = [];
    }
    initPage(conversationId) {
        this.conversationId = conversationId;
        this.pidPromise = this.gateway.getPid(this.conversationId).then(pid => {
            this.participationId = pid;
            this.opinions = this.store.getOpinionsByConversationId(this.conversationId);
        });
        return Promise.all([this.gateway.restGetConversation(this.conversationId), this.pidPromise])
            .then(([conversationResponse, _]) => conversationResponse.data);
    }
    getSuggestionsFor(input) {
        input = input.trim().toLowerCase();
        if (input === "") return [];
        this.suggestions = this.opinions.filter(phrase => phrase.txt.toLowerCase().includes(input));
        return this.suggestions;
    }
    publishOpinion(opinion) {
        const agid = 0;
        if (this.participationId === null) {
            throw new Error("load participation id first!");
        }
        return this.pidPromise
            .then(pid => this.gateway.restPostComment(agid, this.conversationId, pid, opinion))
            .then(res => this.store.saveOpinion(this.conversationId, Object.assign({txt: opinion}, res.data)));
    }
    agreeSuggestion(suggestion) {
        const agid = 0;
        return this.gateway.restPostVote(agid, this.conversationId, this.participationId, suggestion.tid, 1)
            .then(() => {
                suggestion.notAgreed = false;
                this.store.saveOpinion(this.conversationId, suggestion);
                return this.suggestions;
            });
    }
}

