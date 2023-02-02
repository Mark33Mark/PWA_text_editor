const fs = require("fs");


// ------------------------------------------------------------

exports.handler = async () => {


    const template_contents = fs.readFileSync("./client/dist/index.html", "utf8");

    return {
        statusCode: 200,
        headers: {
            "content-type": "text/html; charset=utf-8",
        },
        body: template_contents,
    };
};