/// <reference types = "cypress"/>
import AuthLoginPage from "../../common-classes/auth-login.cy"

const algn = new AuthLoginPage()


class RegisterPage{

    elements = {
        wlcmPgUrl: "/index.html",
        sectElWlcm: "#root"
    }

    
}
export default RegisterPage