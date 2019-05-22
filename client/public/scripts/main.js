var fbToken = "";
var fbLoggedIn = false;
var twToken = "";
var twLoggedIn = false;
var ggToken = "";
var ggLoggedIn = false;
var yhToken = "";
var yhLoggedIn = false;
var ghToken = "";
var ghLoggedIn = false;
var liToken = "";
var liLoggedIn = false;

if (window.addEventListener) {
    window.addEventListener('load', () => {

        // Facebook Login
        document.querySelector('#fbLoginButton').addEventListener('click', () => {
            if (!fbLoggedIn) {
                fbLogin();
            } else {
                fbLogout();
            }
        }, false);

        // Twitter Login
        document.querySelector('#twLoginButton').addEventListener('click', () => {
            if (!twLoggedIn) {
                twLogin();
            } else {
                twLogout();
            }
        }, false);

        // Google Login
        document.querySelector('#ggLoginButton').addEventListener('click', () => {
            if (!ggLoggedIn) {
                ggLogin();
            } else {
                ggLogout();
            }
        }, false);

        // Yahoo Login
        // document.querySelector('#yhLoginButton').addEventListener('click', () => {
        //     if (!yhLoggedIn) {
        //         yhLogin();
        //     } else {
        //         yhLogout();
        //     }
        // }, false);

        // Github Login
        // document.querySelector('#ghLoginButton').addEventListener('click', () => {
        //     if (!ghLoggedIn) {
        //         ghLogin();
        //     } else {
        //         ghLogout();
        //     }
        // }, false);

        // LinkedIn Login
        // document.querySelector('#liLoginButton').addEventListener('click', () => {
        //     if (!liLoggedIn) {
        //         liLogin();
        //     } else {
        //         liLogout();
        //     }
        // }, false);

    }, false); //W3C
} else {
    alert("This browser no longer supported");
}
