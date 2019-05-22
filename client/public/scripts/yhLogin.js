// Login to Yahoo - imports from config & updates global var: yhLoggedIn

var yhToken = "";
var yhLoggedIn = false;

if (window.addEventListener) {
    window.addEventListener('load', () => {

        // Facebook Login
        document.querySelector('#yhLoginButton').addEventListener('click', () => {
            if (!yhLoggedIn) {
                yhLogin();
            } else {
                yhLogout();
            }
        }, false);
    });
} else {
    alert("This browser no longer supported");
}

const yhLogin = () => {
    console.log("Yahoo! Login");
    return true;
}

const yhLogout = () => {
    console.log("Yahoo! Logout");
    return true;
}
