export function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURI(r[2]);
	return null;
}

//本地存储对象
export const Storage = {
	get: function(name) {
		return localStorage.getItem(name);
	},
	set: function(name, value) {
		localStorage.setItem(name, value);
	}
};
//Session 本地存储对象
export const Session = {
	get: function(name) {
		return sessionStorage.getItem(name);
	},
	set: function(name, value) {
		sessionStorage.setItem(name, value);
	}
};
export function getUrlKey(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}

export function inputNumber(val) {
	console.log(val)
}
//cookie 存储
export const Cookie = {
	set: function(c_token, value, expiredays) {
		var strDomain = '.tusjf.com'
		var exdate = new Date()
		exdate.setDate(exdate.getDate() + expiredays)
		var cookies = c_token + "=" + escape(value) +
			((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
		cookies = cookies + ";path=/"
		if(location.href.indexOf("localhost") > 1){
			cookies = cookies + ';domain=localhost'
		}else{
			cookies = cookies + ';domain=.tusjf.com'
		}
		document.cookie = cookies
	},
	get: function(c_token) {
		if(document.cookie.length > 0) {
			var c_start = document.cookie.indexOf(c_token + "=")
			if(c_start != -1) {
				c_start = c_start + c_token.length + 1
				var c_end = document.cookie.indexOf(";", c_start)
				if(c_end == -1) c_end = document.cookie.length
				return unescape(document.cookie.substring(c_start, c_end))
			}
		}
		return ""
	},
	checkCookie: function() {
		token = this.get('token')
		if(token != null && token != "") {
			/*	alert('Welcome again ' + username + '!')*/
		} else {
			/*username = prompt('Please enter your name:', "")*/
			if(token != null && token != "") {
				setCookie('token', token, 365)
			}
		}
	},
	dele:function(c_token){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		this.set(c_token,null)
	}
}
