import { PolisGateway } from '../models/PolisGateway';
import { CommentStore } from '../models/CommentStore';

export class CommentPage {
    constructor() {
        this.gateway = new PolisGateway();
        this.store = new CommentStore();
        this.participationId = null;
        this.pidPromise = null;
        this.comments = [];
    }
    initPage(conversationId) {
        this.pidPromise = this.gateway.getPid(conversationId).then(pid => {
            this.participationId = pid;
            this.comments = this.store.getCommentsByConversationId(conversationId);
        });
        return Promise.all([this.gateway.restGetConversation(conversationId), this.pidPromise])
            .then(([conversationResponse, _]) => conversationResponse.data);
    }
    getSuggestionsFor(input) {
        input = input.trim().toLowerCase();
        if (input === "") return [];
        return this.comments.filter(phrase => phrase.txt.toLowerCase().includes(input));
    }
    publishComment(conversationId, comment) {
        const agid = 0;
        if (this.participationId === null) {
            throw new Error("load participation id first!");
        }
        return this.pidPromise
            .then(pid => this.gateway.restPostComment(agid, conversationId, pid, comment))
            .then(res => this.store.saveComment(conversationId, Object.assign({txt: comment}, res.data)));
    }
}

