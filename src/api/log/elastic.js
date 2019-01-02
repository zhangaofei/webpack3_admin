jQuery.es = require('elasticsearch');
var config = require('../../../config');
var dateUtil = require('../../utils/dateUtil')

var isProduction = (process.env.NODE_ENV == 'production')
var port = config.dev.port
var domain = document.location.toString().split('/')[2]

var host = "";
if (isProduction) {
    host = domain + '/api/log/js'
} else {
    host = 'localhost:' + port + '/api/log/js'
}
var esClient = new $.es.Client({
    hosts: host
});

export function getCPUInfo() {
    let body = {
        query: {
            match: {"metricset.name": "cpu"}
        },
        sort: [
            {"@timestamp": {"order": "desc"}}
        ],
        size: 1
    };
    var date = dateUtil.dateFormat("yyyy.MM.dd", new Date())
    console.log(date)
    var index = 'metricbeat-' + date
    return esClient.search({
        index: index,
        body: body,
        method: 'POST'
    })
}

export function searchSystemInfo() {
    let body = '{}\r\n' +
        '{"query": {"term" : {"metricset.name": "cpu"}}, "sort":{"@timestamp":"desc"},"size":1}\r\n' +
        '{}\r\n' +
        '{"query": {"term" : {"metricset.name": "memory"}}, "sort":{"@timestamp":"desc"},"size":1}\r\n' +
        '{}\r\n' +
        '{"query": {"term" : {"metricset.name": "filesystem"}}, "sort":{"@timestamp":"desc"},"size":1}\r\n'
    var date = dateUtil.dateFormat("yyyy.MM.dd", new Date())
    console.log(date)
    var index = 'metricbeat-' + date
    return esClient.msearch({
        index: index,
        body: body,
        method: 'POST'
    })
}

export function getInterface() {
    let body = {
        query: {
            match: {"metricset.name": "network"}
        },
        sort: [{"@timestamp": {"order": "desc"}}],
        size: 50,
        _source: ["system.network.name"],
        collapse: {
            field: "system.network.name"
        }
    };
    var date = dateUtil.dateFormat("yyyy.MM.dd", new Date())
    console.log(date)
    var index = 'metricbeat-' + date
    return esClient.search({
        index: index,
        body: body,
        method: 'POST'
    })
}


export function get_system_log(level, msg, begin, end) {
    let has_time = false
    if (('' != begin && null != begin && undefined != begin) && ('' != end && null != end && undefined != end)) {
        has_time = true
    }
    var d_body = {
        query: {
            bool: {
                must: []
            }
        },
        sort: [{"@timestamp": {"order": "desc"}}]
    };

    if ('' != level && null != level && undefined != level) {
        d_body.query.bool.must.push({match: {keyword_log_level: level}})
    }
    if ('' != msg && null != msg && undefined != msg) {
        d_body.query.bool.must.push({match: {system_msg: '*' + msg + '*'}})
    }
    if (has_time) {
        console.log("hastime " + begin + "  " + end)
        d_body.query.bool.must.push({
            range: {
                '@timestamp': {
                    gte: begin, lte: end, format: "yyyy-MM-dd HH:mm:ss"
                }
            }
        })
    }
    console.log(d_body)
    var index = 'system'
    return esClient.search({
        index: index,
        body: d_body,
        method: 'POST'
    })
}