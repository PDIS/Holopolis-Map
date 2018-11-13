import { PolisGateway } from '../models/PolisGateway';
import { CommentStore } from '../models/CommentStore';

export class CommentPage {
    constructor() {
        this.gateway = new PolisGateway();
        this.store = new CommentStore();
        this.participationId = null;
        this.comments = [];
    }
    loadParticipationId(conversationId) {
        return this.gateway.getPid(conversationId).then(pid => {
            this.participationId = pid;
            this.comments = this.store.getCommentsByConversationId(conversationId)
                .map(comment => comment.toLowerCase());
        });
    }
    getSuggestionsFor(input) {
        input = input.trim().toLowerCase();
        if (input === "") return [];
        return this.comments.filter(phrase => phrase.txt.includes(input));
    }
    publishComment(conversationId, comment) {
        const agid = 0;
        if (this.participationId === null) {
            throw new Error("load participation id first!");
        }
        return this.gateway.getPid(conversationId).then(pid => {
            return this.gateway.restPostComment(agid, conversationId, pid, comment)
        }).then(res => {
            console.log(res.data);
            this.store.saveComment(conversationId, res.data);
        });
    }
}

