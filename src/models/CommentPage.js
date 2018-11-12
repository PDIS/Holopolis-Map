import { PolisGateway } from '../models/PolisGateway';

export class CommentPage {
    constructor() {
        this.gateway = new PolisGateway();
        this.participationId = null;
    }
    loadParticipationId(conversationId) {
        return this.gateway.getPid(conversationId).then(pid => {
            this.participationId = pid;
        });
    }
    publishComment(conversationId, comment) {
        const agid = 0;
        if (this.participationId === null) {
            throw new Error("load participation id first!");
        }
        return this.gateway.getPid(conversationId).then(pid => {
            return this.gateway.restPostComment(agid, conversationId, pid, comment);
        })
    }
}

