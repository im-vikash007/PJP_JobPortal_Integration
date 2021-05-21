function validateForm(this) {
	document.addEventListener("DOMContentLoaded", function () {
		if (!RegExp.escape) {
			RegExp.escape = function (s) {
				return String(s).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
			};
		}


		var checkPassword = function (str) {
			var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
			return re.test(str);
		};

		var supports_input_validity = function () {
			var i = document.createElement("input");
			return "setCustomValidity" in i;
		}
		if (supports_input_validity()) {


			var pwd1Input = document.getElementById("myPwd1");
			pwd1Input.setCustomValidity(pwd1Input.title);

			var pwd2Input = document.getElementById("myPwd2");

			pwd1Input.addEventListener("keyup", function (e) {
				this.setCustomValidity(this.validity.patternMismatch ? pwd1Input.title : "");
				if (this.checkValidity()) {
					pwd2Input.pattern = RegExp.escape(this.value);
					pwd2Input.setCustomValidity(pwd2Input.title);
				} else {
					pwd2Input.pattern = this.pattern;
					pwd2Input.setCustomValidity("");
				}
			}, false);

			pwd2Input.addEventListener("keyup", function (e) {
				this.setCustomValidity(this.validity.patternMismatch ? pwd2Input.title : "");
			}, false);

		}


	}, false);
	return false;
}

