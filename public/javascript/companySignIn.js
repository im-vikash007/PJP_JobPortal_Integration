var eid = "pjp_company@ps.com"
var psw = "@Abcd123";

function validateform(form) {
	var pass_form = document.getElementById("cPwd1").value;
	var email_form = document.getElementById("email_id").value;


	if (pass_form == psw && email_form == eid ) {
		setTimeout(function () { window.location = "./admin.html" });
	}
	else {
		document.getElementById("login_val").innerHTML = "Error : Enter correct Credentials";
		document.getElementById("SignUP_form").reset();
		return false;
	}

};

document.addEventListener("DOMContentLoaded", function() {
    if (!RegExp.escape) {
        RegExp.escape = function(s) {
            return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
        };
    }


    var checkPassword = function(str) {
        var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        return re.test(str);
    };

    var supports_input_validity = function() {
        var i = document.createElement("input");
        return "setCustomValidity" in i;
    }
    if (supports_input_validity()) {


        var pwd1Input = document.getElementById("cPwd1");
        pwd1Input.setCustomValidity(pwd1Input.title);

        // var pwd2Input = document.getElementById("myPwd2");

        pwd1Input.addEventListener("keyup", function(e) {
            this.setCustomValidity(this.validity.patternMismatch ? pwd1Input.title : "");
            if (this.checkValidity()) {
                // pwd2Input.pattern = RegExp.escape(this.value);
                // pwd2Input.setCustomValidity(pwd2Input.title);
            } else {
                // pwd2Input.pattern = this.pattern;
                // pwd2Input.setCustomValidity("");
            }
        }, false);

        // pwd2Input.addEventListener("keyup", function(e) {
        //     this.setCustomValidity(this.validity.patternMismatch ? pwd2Input.title : "");
        // }, false);

    }

}, false);