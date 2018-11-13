import { PolisGateway } from '../models/PolisGateway';

export class VotePage {
    constructor() {
        this.gateway = new PolisGateway();
        this.conversationId = null;
        this.commentData = null;
        this.participationId = null;
    }
    initPage(conversationId) {
        const conversationPromise = this.gateway.restGetConversation(conversationId).then(res => {
            let longDescription = null;
            let description = res.data.description;
            if (description.length > 100) {
                longDescription = description;
                description = description.substr(0, 96) + " ···";
            }
            return {
                topic: res.data.topic,
                description,
                shortDescription: description,
                longDescription,
                descriptionIsShort: true,
            };
        });
        const commentPromise = this.loadNextComment(conversationId);
        const participationPromise = this.gateway.getPid(conversationId).then(pid => {
            this.participationId = pid;
        });
        return Promise.all([conversationPromise, commentPromise, participationPromise]);
    }
    loadNextComment(conversationId) {
        return this.gateway.restGetNextComment(conversationId).then(response => {
            this.commentData = response.data;
            this.conversationId = conversationId;
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
        if (this.conversationId === null || this.participationId == null || this.commentData == null) {
            throw new Error("load participation id and a comment first!");
        }
        const agid = 0;
        return this.gateway.restPostVote(agid, this.conversationId, this.participationId, this.commentData.tid, vote);
    }
}

