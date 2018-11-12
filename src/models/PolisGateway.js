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
    getVote(agid, conversationId, pid, tid, vote) {
        var params = {
            agid: agid,
            conversation_id: conversationId,
            pid: pid,
            tid: tid,
            vote: vote,
        };
        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');

        return axios({
            url: "https://polis-api-proxy.herokuapp.com/api/v3/votes?" + query,
            method: "get",
            responseType: 'json',
            headers: {
                "Authorization": AUTH_KEY,
            }
        })
    }
}

