// Login to LinkedIn - imports from config & updates global var: liLoggedIn

var liToken = "";
var liLoggedIn = false;

if (window.addEventListener) {
    window.addEventListener('load', () => {

        // Facebook Login
        document.querySelector('#liLoginButton').addEventListener('click', () => {
            if (!liLoggedIn) {
                liLogin();
            } else {
                liLogout();
            }
        }, false);
    });
} else {
    alert("This browser no longer supported");
}

const liLogin = () => {
    console.log("LinkedIn");
    return true;
}

const liLogout = () => {
    console.log("LinkedIn");
    return true;
}
