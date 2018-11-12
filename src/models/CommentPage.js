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
    getSuggestionsFor(input) {
        input = input.replace(/\s/g,"");
        if (input === "") return [];
        return [
            {id: 1, txt: "one two three four five six seven the", dotdotdot: "one two three four five six seven ..."},
            {id: 2, txt: "apple pear orange strawberry melon the or", dotdotdot: "apple pear orange strawberry melon the ..."},
            {id: 3, txt: "jump run walk talk sit stand hide or", dotdotdot: "jump run walk talk sit stand hide ..."},
            {id: 4, txt: "spain taiwan colombia germany uk or", dotdotdot: "spain taiwan colombia germany uk ..."},
        ].filter(phrase => phrase.txt.includes(input));
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

