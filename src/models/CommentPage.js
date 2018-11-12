import { PolisGateway } from '../models/PolisGateway';

export class CommentPage {
    constructor() {
        this.gateway = new PolisGateway();
    }
    publishComment(conversationId, comment) {
        const agid = 0;
        return this.gateway.getPid(conversationId).then(pid => {
            return this.gateway.restPostComment(agid, conversationId, pid, comment);
        })
    }
}

