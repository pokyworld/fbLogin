// Login to Facebook - imports from config & updates global var: fbLoggedIn
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
                        }
                    });
                    FB.api('/me', (res) => {
                        // console.log(`Login: Now logged in as: ${res.name}`);
                        getFbUserData(fbToken);
                        return fbToken;
                    });
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
    FB.api('/me', { locale: 'en_US', fields: 'id,name,first_name,last_name,email,link,gender,location,picture' },
        (res) => {
            document.querySelector('#fbLoginText').innerHTML = 'Logout from  Facebook.';
            document.querySelector('#fbStatus').innerHTML = `Logged in as: ${res.name}`;
            document.querySelector('#fbToken').innerHTML = `${fbToken}`;
            fbLoggedIn = true;
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
                document.querySelector('#fbLoginText').innerHTML = 'Login with Facebook.';
                document.querySelector('#fbStatus').innerHTML = `Logged out`;
                document.querySelector('#fbToken').innerHTML = "";
                fbLoggedIn = false;
            });
        }
    });
}