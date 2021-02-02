let request = require('request');
let Parser = require('xml2json');


let express = require('express');
let app = express();
let xmlParser = require('express-xml-bodyparser');

// Initialize variables.
let port = process.env.PORT || 3000;

// Set the front-end folder to serve public assets.
// app.set('views', path.join(__dirname, '/JavaScriptSPA/views'));
// app.set('view engine', 'pug');
// app.use(express.static(path.join(__dirname, '/JavaScriptSPA')));
app.use(express.json());
//app.use(express.urlencoded());
app.use(xmlParser(undefined));
//Set up our one route to the index.html file.
//app.get('*', function (req, res) {
//    res.sendFile(path.join(__dirname, '/JavaScriptSPA/views/layout.pug'));
//});

// app.use('/', index);
app.get('/les-grosses-tetes.xml', function (req, res, next) {
    request('https://www.rtl.fr/podcast/les-grosses-tetes.xml', function (error, response, body) {
        let json = JSON.parse(Parser.toJson(body, {reversible: true}));
        for (let i = 0; i < json.rss.channel.item.length; i++) {
            if (json.rss.channel.item[i].title.$t.indexOf("Best") >= 0 ||
                json.rss.channel.item[i].title.$t.indexOf("BONUS") >= 0) {
                delete json.rss.channel.item[i];
            }
        }

        let stringify = JSON.stringify(json);
        let toXmlOptions = {
            sanitize: true,
            ignoreNull: true
        };
        let xml = Parser.toXml(stringify, toXmlOptions);

        console.log(xml);
        res.header('Content-Type', 'text/xml');
        res.send(xml);
    });
});

app.get('/laurent-gerra.xml', function (req, res, next) {
    request('https://www.rtl.fr/podcast/laurent-gerra.xml', function (error, response, body) {
        let json = JSON.parse(Parser.toJson(body, {reversible: true}));
        for (let i = 0; i < json.rss.channel.item.length; i++) {
            if (json.rss.channel.item[i].title.$t.indexOf("Best") >= 0 ||
                json.rss.channel.item[i].title.$t.indexOf("BONUS") >= 0) {
                delete json.rss.channel.item[i];
            }
        }

        let stringify = JSON.stringify(json);
        let toXmlOptions = {
            sanitize: true,
            ignoreNull: true
        };
        let xml = Parser.toXml(stringify, toXmlOptions);

        console.log(xml);
        res.header('Content-Type', 'text/xml');
        res.send(xml);
    });
});


app.listen(port);
console.log('Listening on port ' + port + '...');
