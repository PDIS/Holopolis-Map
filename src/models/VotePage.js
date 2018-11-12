import { PolisGateway } from '../models/PolisGateway';

export class VotePage {
    constructor() {
        this.gateway = new PolisGateway();
        this.commentData = null;
    }

    loadNextComment() {
        const conversation_id = '9rfmczeith';
        return this.gateway.getNextComment(conversation_id).then(response => {
            this.commentData = response.data;
            return this.commentData;
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
        if (this.commentData === null) {
            throw new Error("load next comment first!");
        }
        const agid = 0;
        const conversation_id = '9rfmczeith';
        const pid = new Date().getTime()/1000;
        return this.gateway.getVote(agid, conversation_id, pid, this.commentData.tid, vote);
    }
}

