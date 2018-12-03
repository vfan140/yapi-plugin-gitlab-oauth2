# yapi-plugin-gitlab-oauth2

基于Oauth2的Gitlab登陆插件，配置方式如下：

第一步： 在生成的配置文件config.json中加入如下配置：

```js
"plugins":[{
	"name":"gitlab-oauth2",
	"options":{
		"host" : "http://example.gitlab.com.cn",
		"clientId" : "",
		"clientSecret" : "",
		"redirectUri" : "http://example.yapi.com.cn/api/user/login_by_token"
	}
}]
```

>plugins配置说明如下

| 参数 | 说明 |
| --- | --- | 
| host | Gitlab地址 |
| clientId | Gitlab clientId,在Gitlab admin area->Applications中获取 |
| clientSecret | Gitlab clientSecret,获取同上 |
| redirectUri | Gitlab callback URI,获取同上；注意：路径必须为/api/user/login_by_token |

第二步：在config.json 这层目录下运行 ```yapi plugin --name yapi-plugin-gitlab-oauth2```   重新下载插件  

第三步：重启服务器

参考资料：
	
1、[GitLab as OAuth2 authentication service provider](https://docs.gitlab.com/ee/integration/oauth_provider.html)