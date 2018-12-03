import React from 'react'
import { Button } from 'antd'

module.exports = function(){
	//跳转到GitLab授权中心
	const handleLogin = () => {
		location.href = '/api/plugin/gitlab-oauth2/authorize'
	}
	//单点登录到GitLab组件
	const GitlabSsoComponent = () => {
		return (<Button onClick={handleLogin} type="primary" className="btn-home btn-login">使用GitLab登录</Button>)
	}
	this.bindHook('third_login', GitlabSsoComponent)
}