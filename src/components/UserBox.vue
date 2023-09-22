<template>
    <div class="userBox">
        <div>
            <!-- <img :src=Kxz class="avatar"> -->
            <div class="avatar" @click="showModal"></div>
        </div>
    </div>
    <a-modal v-model:open="open" title="用户登录" :confirm-loading="confirmLoading" @ok="handleOk" width="350px"
        class="loginBox">
        <p class="loginTip">{{ modalText }}</p>
        <a-space direction="vertical" class="login">
            <a-input v-model:value="name" placeholder="名称" />
            <a-input v-model:value="password" placeholder="密码" />
        </a-space>
    </a-modal>
</template>

<script>
// import Kxz from '@/assets/ico/kxz.png'
export default {
    data() {
        return {
            modalText: '用户登录',
            open: false,
            confirmLoading: false,
            name: '',
            password: ''
        }
    },
    methods: {
        showModal() {
            this.open = true
        },
        handleOk() {
            this.modalText = 'The modal will be closed after two seconds';
            this.confirmLoading = true;
            setTimeout(() => {
                this.open = false;
                this.confirmLoading = false;
            }, 2000);
        }
    }
}
</script>

<style></style>