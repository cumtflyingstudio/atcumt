<template>
    <div class="userBox">
        <div>
            <!-- <img :src=Kxz class="avatar"> -->
            <div class="avatar" @click="showModal"></div>
        </div>
    </div>
    <a-modal v-model:open="open" title="用户登录" :confirm-loading="confirmLoading" @ok="handleOk(e)" width="350px"
        class="loginBox" cancelText="取消" okText="确定" @cancel="handleCancel">
        <a-space direction="vertical" class="login">
            <a-input v-model:value="email" placeholder="邮箱" v-if="page == 0" />
            <a-input v-model:value="password" placeholder="密码" v-if="page == 0" />
            <a-input v-model:value="email" placeholder="邮箱" v-if="page == 1" />
            <a-input v-model:value="email" placeholder="验证码" v-if="page == 1" />
            <a-input v-model:value="password" placeholder="密码" v-if="page == 1" />
            <a-input v-model:value="email" placeholder="邮箱" v-if="page == 2" />
            <a-input v-model:value="email" placeholder="验证码" v-if="page == 2" />
            <a-input v-model:value="password" placeholder="新密码" v-if="page == 2" />
        </a-space>
        <div class="newAdmin">
            <div @click="findPassword">忘记密码</div>
            <div @click="register">点击注册</div>
        </div>
    </a-modal>
</template>

<script>
// import Kxz from '@/assets/ico/kxz.png'
export default {
    data() {
        return {
            open: false,
            confirmLoading: false,
            email: '',
            password: '',
            page: 0
        }
    },
    methods: {
        showModal() {
            this.open = true
        },
        async handleOk(e) {
            // e.preventDefault();
            this.modalText = 'The modal will be closed after two seconds';
            this.confirmLoading = true;
            let email = this.email
            let password = this.password
            const response = await fetch('http://localhost:8080/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                // credentials: 'include' 
            });
            const result = await response.json();
            console.log(result.code)
            if (result.code == 200) {
                alert('登陆成功！');
                this.open = false
                // 登陆成功后的操作
            } else {
                alert('登陆失败，请检查用户名和密码！');
                this.confirmLoading = false;
            }
            this.email = ''
            this.password = ''
            this.open = false
        },
        register() {
            let e = document.getElementsByClassName('newAdmin')[0]
            let title = document.getElementsByClassName('ant-modal-title')[0]
            title.innerHTML = '用户注册'
            e.style.display = 'none';
            this.page = 1
        },
        findPassword() {
            let e = document.getElementsByClassName('newAdmin')[0]
            let title = document.getElementsByClassName('ant-modal-title')[0]
            title.innerHTML = '找回密码'
            e.style.display = 'none';
            this.page = 2
        },
        handleCancel() {
            let e = document.getElementsByClassName('newAdmin')[0]
            let title = document.getElementsByClassName('ant-modal-title')[0]
            title.innerHTML = '用户登录'
            e.style.display = 'flex';
            this.page = 0
        }
    }
}
</script>

<style></style>