import { PolisGateway } from '../models/PolisGateway';
import { OpinionStore } from '../models/OpinionStore';

export class VotePage {
    constructor() {
        this.gateway = new PolisGateway();
        this.conversationId = null;
        this.opinionData = null;
        this.participationId = null;
        this.opinionStore = new OpinionStore();
    }
    initPage(conversationId) {
        const conversationPromise = this.gateway.restGetConversation(conversationId).then(res => {
            let description = res.data.description;
            const longDescription = description;
            let shortDescription = description;
            const LIMIT_LENGTH = 100;
            if (description.length > LIMIT_LENGTH) {
                shortDescription = description.substr(0, LIMIT_LENGTH - 4) + " ···";
                description = shortDescription;
            }
            return {
                topic: res.data.topic,
                description,
                shortDescription,
                longDescription,
                descriptionIsLong: longDescription.length > shortDescription.length,
                toggledShort: true,
            };
        });
        const opinionPromise = this.loadNextOpinion(conversationId);
        const participationPromise = this.gateway.getPid(conversationId).then(pid => {
            this.participationId = pid;
        });
        return Promise.all([conversationPromise, opinionPromise, participationPromise]);
    }
    loadNextOpinion(conversationId) {
        return this.gateway.restGetNextComment(conversationId).then(response => {
            this.opinionData = response.data;
            this.conversationId = conversationId;
            this.opinionStore.saveOpinion(conversationId, this.opinionData);
            return this.opinionData;
        });
    }
    voteYes() {
        return this._voteInternal(1)
            .then(() => {
                this.opinionData.notAgreed = false;
                this.opinionStore.saveOpinion(this.conversationId, this.opinionData);
            });
    }
    voteNo() {
        return this._voteInternal(-1);
    }
    skipVote() {
        return this._voteInternal(0);
    }
    _voteInternal(vote) {
        if (this.conversationId === null || this.participationId == null || this.opinionData == null) {
            throw new Error("load participation id and a opinion first!");
        }
        const agid = 0;
        return this.gateway.restPostVote(agid, this.conversationId, this.participationId, this.opinionData.tid, vote);
    }
}

