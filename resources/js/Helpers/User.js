import Token from "./Token";
import AppStorage from './AppStorage'
class User{
    login(user){
        let myemail = user.email
            let mypass = user.password            
            axios({
                method: 'post',
                url: '/api/auth/login',
                data: {
                    email: myemail,
                    password: mypass
                }
            })
            .then(function(response) {
                if (Token.completeIsValid(response.data.access_token)) {
                    AppStorage.store(response.data.user,response.data.access_token)
                }
            })
            .catch(function (error) {
                console.log('fuck you');
            });
    }

    hasToken(){
        const storedToken = AppStorage.getToken()

        if (storedToken) {
            if (Token.completeIsValid(storedToken)) {
                return true
            }
        }
        return false
    }

    isLoggedIn(){
        return this.hasToken()
    }

    logout(){
        AppStorage.clear()
    }

    userName(){
        if(this.isLoggedIn){
            return AppStorage.getUser()
        }
    }

    userId(){
        if(this.isLoggedIn){
            const payload = Token.payload(AppStorage.getToken())
            return payload.sub
        }
    }
}

export default User = new User();