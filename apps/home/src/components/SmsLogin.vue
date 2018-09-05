<template>
    <div class="form">
        <form>
            <div class="form-control relative">
                <input type="text" name="username" class="control-input" placeholder="手机号" />
                <button class="checkcode absolute">获取验证码</button>
            </div>
            <div class="form-control relative">
                <input type="password" name="username" class="control-input pwd" placeholder="验证码" />
            </div>
            <div class="form-control">
                <p class="agree-book">温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意<a href="javascript:;">《用户服务协议》</a></p>
                <button type="button" class="btn btn-primary log-btn">登录</button>
            </div>
        </form>
    </div>
</template>
<style scoped>
@import '../assets/css/login.css'
</style>
<style scoped>
.checkcode {
    right: -1px;
    top: 1px;
    color: #ccc;
    border: none;
    background-color: transparent;
    display: block;
    line-height: 46px;
    padding: 0 10px;
}
.agree-book {
    color: #aaa;
    font-size: 14px;
    margin: -5px 0 5px;
    text-align: justify;
}

.agree-book > a {
    color: #2395ff;
}

</style>