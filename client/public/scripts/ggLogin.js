// Login to Google - imports from config & updates global var: ggLoggedIn

var ggToken = "";
var ggLoggedIn = false;

if (window.addEventListener) {
    window.addEventListener('load', () => {

        // Facebook Login
        document.querySelector('#ggLoginButton').addEventListener('click', () => {
            if (!ggLoggedIn) {
                ggLogin();
            } else {
                ggLogout();
            }
        }, false);
    });
} else {
    alert("This browser no longer supported");
}

var googleUser = {};

var startApp = function () {
    gapi.load('auth2', function () {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        auth2 = gapi.auth2.init({
            client_id: config.google.appId,
            cookiepolicy: 'single_host_origin',
            // Request scopes in addition to 'profile' and 'email'
            //scope: 'additional_scope'
        });
        // attachSignin(document.getElementById('customBtn'));
    });
};

function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function (googleUser) {
            document.getElementById('name').innerText = "Signed in: " +
                googleUser.getBasicProfile().getName();
        }, function (error) {
            alert(JSON.stringify(error, undefined, 2));
        });
}

const ggLogin = () => {
    console.log("Google Login");

}


const ggLogout = () => {
    console.log("Google Logout");
}

