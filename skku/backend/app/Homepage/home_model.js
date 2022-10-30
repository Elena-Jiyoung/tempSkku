const config = require("../config");
var home = module.exports;

const announceRecentQry = "SELECT * FROM ( SELECT * FROM mydb.announcement ORDER BY uploadDate DESC LIMIT 3 OFFSET 0) as announcement_desc GROUP BY title;"

const projectRecentQry = "SELECT * FROM ( SELECT * FROM mydb.project ORDER BY uploadDate DESC LIMIT 2 OFFSET 0) as project_desc GROUP BY title;"

home.annRecentPosts = function annRecentPosts(callback) {
    config.db.query(announceRecentQry, (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    })
}

home.projRecentPosts = function projRecentPosts(callback) {
    config.db.query(projectRecentQry, (err, result) => {
        if (err) callback(err, null);
        callback(null, result);
    })
}