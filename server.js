const baseController = require('controllers/base.js')
const request = require('request')

module.exports = function(options = {}){

	const oauth2 = require('simple-oauth2').create({
		client : { id : options.clientId, secret : options.clientSecret },
		auth : { tokenHost : options.host }
	}) 

	class gitlabController extends baseController{
		constructor(ctx) {
	    super(ctx);
	    this.$auth = true
	  }
		authorize(context){
			//构建授权链接
			const authorizationUri = oauth2.authorizationCode.authorizeURL({
			  redirect_uri: options.redirectUri
			})
			//302重定向到授权链接
			context.response.redirect(authorizationUri)
		}
	}

	//添加路由
	this.bindHook('add_router',function(addRouter){
		//授权链接获取
		addRouter({
		  controller: gitlabController,
		  method: 'get',
		  path: 'gitlab-oauth2/authorize', //实际route path为/api/plugin/gitlab-oauth2/authorize
		  action: 'authorize'
		})
	})

  //gitlab登录处理逻辑
  this.bindHook('third_login',async function(context){
  	const $request = context.request
  	//回调返回的code
  	const code = $request.body.code || $request.query.code
  	//获取access token
  	let result = await oauth2.authorizationCode.getToken({
  		code : code,
  		redirect_uri: options.redirectUri
  	})
  	result = oauth2.accessToken.create(result)
  	return new Promise((resolve, reject) => {
  		const userApiUri = `${options.host}/api/v4/user?access_token=${result.token['access_token']}`
  		request(userApiUri, (error, response, body) => {
  			if(!error && response.statusCode === 200){
  				let result = JSON.parse(body)
  				resolve({ email : result.email, username : result.username })
  			}else{
  				reject(error)
  			}
  		})
  	}) 
  })

}

