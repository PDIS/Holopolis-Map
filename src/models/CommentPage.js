import { PolisGateway } from '../models/PolisGateway';

export class CommentPage {
    constructor() {
        this.gateway = new PolisGateway();
    }
    publishComment(conversationId, comment) {
        const agid = 0;
        const pid = new Date().getTime()/1000;
        return this.gateway.postComment(agid, conversationId, pid, comment);
    }
}

