import { PolisGateway } from '../models/PolisGateway';

export class VotePage {
    constructor() {
        this.gateway = new PolisGateway();
        this.conversation = null;
    }

    loadNextComment(conversationId) {
        return this.gateway.restGetNextComment(conversationId).then(response => {
            this.conversation = {
                id: conversationId,
                commentData: response.data,
            };
            return this.conversation.commentData;
        });
    }
    voteYes() {
        return this._voteInternal(1);
    }
    voteNo() {
        return this._voteInternal(-1);
    }
    skipVote() {
        return this._voteInternal(0);
    }
    _voteInternal(vote) {
        if (this.conversation === null) {
            throw new Error("load next comment first!");
        }
        const agid = 0;
        return this.gateway.getPid(this.conversation.id).then(pid => {
            return this.gateway.restPostVote(agid, this.conversation.id, pid, this.conversation.commentData.tid, vote);
        });
    }
}

