// Login to Twitter - imports from config & updates global var: twLoggedIn

var twToken = "";
var twLoggedIn = false;

if (window.addEventListener) {
    window.addEventListener('load', () => {

        // Facebook Login
        document.querySelector('#twLoginButton').addEventListener('click', () => {
            if (!twLoggedIn) {
                twLogin();
            } else {
                twLogout();
            }
        }, false);
    });
} else {
    alert("This browser no longer supported");
}

window.twttr = (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function (f) {
        t._e.push(f);
    };

    return t;
}(document, "script", "twitter-wjs"));



const twLogin = () => {
    console.log("Twitter Login");

    const url = config.twitter.url.requestToken;

    const urlCallback = config.twitter.appCallback;
    const urlEncoded = encodeURI(urlCallback);

    const OAuthString = "";

    console.log(url, urlEncoded);
    fetch(url, {
        credentials: 'include', // 'same-origin', include', default: 'omit',
        mode: 'no-cors',
        headers: new Headers({
            "Content-Type": "application/json; charset=utf-8",
            // "Access-Control-Allow-Origin": "*",
            // "Authorization": "OAuth " + OAuthString
        }),
        method: 'GET',
        // body: JSON.stringify({
        //     username: 'Elon Musk',
        //     email: 'elonmusk@gmail.com',
        // })
    })
        .then(res => {
            console.log(res);
            // res.status(400);
        })
        // .then(json => console.log(json))
        .catch(err => console.log("Error : ", err));
}

const twLogout = () => {
    console.log("Twitter Logout");
}
