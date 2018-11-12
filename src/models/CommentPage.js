import { PolisGateway } from '../models/PolisGateway';

export class CommentPage {
    constructor(conversationId) {
        this.gateway = new PolisGateway();
        this.conversationId = conversationId || '9rfmczeith';
    }
    publishComment(comment) {
        const agid = 0;
        const pid = new Date().getTime()/1000;
        return this.gateway.postComment(agid, this.conversationId, pid, comment);
    }
}

