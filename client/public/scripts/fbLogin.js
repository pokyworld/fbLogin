// Login to Facebook - imports from config & updates global var: fbLoggedIn

var fbToken = "";
var fbLoggedIn = false;

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
    });
} else {
    alert("This browser no longer supported");
}

const fbLogin = () => {

    FB.init({
        appId: config.facebook.appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: config.facebook.apiVersion
    });

    FB.getLoginStatus((res) => {
        // console.log("LoginStatus: ", res);
        if (!res.authResponse) {
            FB.login((res) => {
                if (res.authResponse) {
                    FB.getLoginStatus((res) => {
                        if (res.authResponse) {
                            fbToken = res.authResponse.accessToken;
                            getFbUserData(fbToken);
                        }
                    });
                    // FB.api('/me', (res) => {
                    //     // console.log(`Login: Now logged in as: ${res.name}`);
                    //     getFbUserData(fbToken);
                    //     return fbToken;
                    // });
                } else {
                    console.log('Login: User cancelled login or did not fully authorize.');
                }
            }, { scope: ['email'], location: 0 });
        } else {
            fbToken = res.authResponse.accessToken;
            getFbUserData(fbToken);
        }
    });
};

// Get FB User Data
const getFbUserData = (fbToken) => {
    // console.log(fbToken);
    FB.api('/me', { locale: 'en_US', fields: 'id, name, first_name, last_name, email, link, gender, location, picture' },
        (res) => {
            const { name, email } = res;
            document.querySelector('#fbLoginText').innerHTML = `Logout from Facebook`;
            document.querySelector('#fbStatus').innerHTML = `LoggedIn: ${name}`;
            document.querySelector('#fbEmail').innerHTML = `${email}`;
            document.querySelector('#fbToken').innerHTML = `${fbToken}`;
            fbLoggedIn = true;
            fbPostToken(name, email, fbToken);
        }
    );
}

// Logout from facebook
const fbLogout = () => {

    FB.init({
        appId: config.facebook.appId,
        autoLogAppEvents: true,
        xfbml: true,
        version: config.facebook.apiVersion
    });

    FB.getLoginStatus((res) => {
        if (res.authResponse) {
            FB.logout(() => {
                document.querySelector('#fbLoginText').innerHTML = `Login with Facebook.`;
                document.querySelector('#fbStatus').innerHTML = `Logged out`;
                document.querySelector('#fbEmail').innerHTML = ``;
                document.querySelector('#fbToken').innerHTML = ``;
                fbLoggedIn = false;
            });
        }
    });
}

const fbPostToken = (name, email, token) => {
    const url = "/api/login/facebook";
    fetch(url, {
        credentials: 'same-origin', // 'include', default: 'omit'
        method: 'POST', // 'GET', 'PUT', 'DELETE', etc.
        body: JSON.stringify({ email, token }), // Coordinate the body type with 'Content-Type'
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
}