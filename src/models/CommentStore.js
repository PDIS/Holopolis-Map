export class CommentStore {
    constructor() {
        if (!window.holopolisOpinionStore) {
            window.holopolisOpinionStore = {};
        }
        this.store = window.holopolisOpinionStore;
    }

    saveComment(conversationId, commentData) {
        this.store[conversationId] = this.store[conversationId] || {};
        commentData.dotdotdot = commentData.txt;
        const LIMIT_LENGTH = 100;
        if (commentData.dotdotdot.length > LIMIT_LENGTH) {
            commentData.dotdotdot = commentData.dotdotdot.substr(0, LIMIT_LENGTH - 4) + " ···";
        }
        this.store[conversationId][commentData.tid] = commentData;
    }


    getCommentsByConversationId(conversationId) {
        console.log(this.store, this.store[conversationId], conversationId);
        if (!this.store[conversationId]) {
            return [];
        }
        const result = Object.keys(this.store[conversationId])
            .map(commentId => this.store[conversationId][commentId]);
        console.log(result);
        return result;
    }

    
}