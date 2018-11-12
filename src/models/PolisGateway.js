const AUTH_KEY = "pkey_84N12fk7d9kderRe9d3sdPm9";

export class PolisGateway {
    getNextComment(conversationId) {
        return axios({
            url: "https://polis-api-proxy.herokuapp.com/api/v3/conversations/" + conversationId + "/nextComment",
            method: "get",
            responseType: 'json',
            headers: {
                "Authorization": AUTH_KEY,
            }
        });
    }
    postVote(agid, conversationId, pid, tid, vote) {
        return axios({
            url: "https://polis-api-proxy.herokuapp.com/api/v3/votes",
            method: "post",
            responseType: 'json',
            headers: {
                "Authorization": AUTH_KEY,
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                agid: agid,
                conversation_id: conversationId,
                pid: pid,
                tid: tid,
                vote: vote,
            },
        })
    }
    postComment(agid, conversationId, pid, comment) {
        return axios({
            url: "https://polis-api-proxy.herokuapp.com/api/v3/conversations/" + conversationId + "/comments",
            method: "post",
            responseType: 'json',
            headers: {
                "Authorization": AUTH_KEY,
            },
            data:{
                "agid": agid,
                "conversation_id": conversationId,
                "pid": pid,
                "txt": comment,
                "is_seed": true,
                "vote": -1
            }
        });
    }
}

