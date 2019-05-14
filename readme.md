==========================================================================
Login with Facebook Flow
==========================================================================
1. User hits “Login with Facebook”
2. Facebook SDK talks to Facebook backend to get a token
3. Your client gives your backend the token
4. Your backend validates the token against Facebook’s servers
5. Your backend issues a new authentication or session token
6. Your client saves your backend’s auth token: Now you’re logged in and can talk to your own servers forever, or at least in a way you understand.

==========================================================================
To kill process blocking port
==========================================================================
sudo kill -9 $(sudo lsof -t -i:443)
