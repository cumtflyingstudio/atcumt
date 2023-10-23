<script>
import { nextTick } from 'vue'

// import Avatar from '@/assets/ico/Avatar.png'

export default {
  data() {
    return {
      loginOpen: false,
      confirmLoading: false,
      email: '',
      password: '',
      page: 0,
      code: '',
      optionOpen: false,
      addTabsOpen: false,
      newTabUrl: '',
      newTabName: '',
      isErrorEmail: false,
      isErrorPassword: false,
      bgPicList: [],
      activeKey: 1,
      imgUrl: [],
      newTabIconIndex: 0,
      tagRadius: this.$store.state.tagRadius,
      tagOpacity: this.$store.state.tagRadius,
      searchBoxSize: this.$store.state.searchBoxSize,
      searchBoxOpacity: this.$store.state.searchBoxOpacity,
      searchBoxRadius: this.$store.state.searchBoxRadius,
    }
  },
  computed: {
    emailRegex() {
      return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    },
  },
  watch: {
    email(value) {
      this.isErrorEmail = this.emailRegex.test(value)
    },
  },
  mounted() {
    this.bgPicList = this.$store.state.backgroundPictures
    console.debug(this.$store.state)
  },
  updated() {
    // 防抖
    nextTick(() => {
      function Debounce(fn, time) {
        let timer = null
        return function () {
          if (timer)
            clearTimeout(timer) // 当timer已经被赋值为定时器后
          // 重新开始计时
          timer = setTimeout(fn, time)
        }
      }
      let tabInput
      if (this.addTabsOpen === true) {
        tabInput = document.getElementsByClassName('tabInput')[0]
        console.debug(document.getElementsByClassName('tabInput'))
        console.debug(typeof tabInput)
      }
      if (tabInput !== undefined) {
        tabInput.addEventListener('input', Debounce(() => {
          fetch(`http://1.13.195.5:8080/spider/getIcon?name=${this.newTabName}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then(response => response.json())
            .then((result) => {
              this.imgUrl = result.imageUrl
            })
            .catch(error => console.debug('error', error))
        }, 300))
      }
    })
  },
  methods: {
    showModal() {
      this.loginOpen = true
    },
    toggleIcon(index) {
      this.newTabIconIndex = index
    },
    async handleOk() {
      // e.preventDefault();
      if (this.page === 0) {
        this.modalText = 'The modal will be closed after two seconds'
        this.confirmLoading = true
        const email = this.email
        const password = this.password
        const response = await fetch('http://1.13.195.5:8080/users/login', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        const result = await response.json()
        if (result.code === 200) {
        // alert('登陆成功！')
          this.loginOpen = false
          this.confirmLoading = false
        // 登陆成功后的操作
        }
        else {
        // alert('登陆失败，请检查用户名和密码！')
          this.confirmLoading = false
        }
        this.email = ''
        this.password = ''
        this.loginOpen = false
      }
      else if (this.page === 1) {
        const email = this.email
        const code = this.code
        const password = this.password
        if (this.email === '') {
          this.isErrorEmail = true
          return
        }
        if (this.password === '') {
          this.isErrorPassword = true

          return
        }
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,15}$/
        this.isErrorPassword = !passwordRegex.test(password)
        if (this.isErrorPassword === true)
          return
        fetch(`http://1.13.195.5:8080/users/register?code=${code}`, {
          method: 'POST',
          redirect: 'follow',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        }).then(response => response.text())
          .then(result => console.debug(result))
          .catch(error => console.debug('error', error))
      }
    },
    register() {
      this.email = ''
      this.password = ''
      const e = document.getElementsByClassName('newAdmin')[0]
      const title = document.getElementsByClassName('ant-modal-title')[0]
      title.innerHTML = '用户注册'
      e.style.display = 'none'
      this.page = 1
    },
    findPassword() {
      this.email = ''
      this.password = ''
      const e = document.getElementsByClassName('newAdmin')[0]
      const title = document.getElementsByClassName('ant-modal-title')[0]
      title.innerHTML = '找回密码'
      e.style.display = 'none'
      this.page = 2
    },
    handleCancel() {
      this.email = ''
      this.password = ''
      const e = document.getElementsByClassName('newAdmin')[0]
      const title = document.getElementsByClassName('ant-modal-title')[0]
      title.innerHTML = '用户登录'
      e.style.display = 'flex'
      this.page = 0
    },
    sendCode() {
      const email = this.email
      const button = document.getElementById('codeButton')
      // button.setAttribute('disabled', true)
      let countdown = 60
      function settime(val) {
        if (countdown === 0) {
          val.removeAttribute('disabled')
          val.innerHTML = '获取验证码'
          countdown = 60
        }
        else {
          if (countdown === 60) {
            fetch(`http://1.13.195.5:8080/emails/send/registerCode?email=${email}`, {
              method: 'POST',
              redirect: 'follow',
              credentials: 'include',
            }).then(response => response.text())
              .then(result => console.debug(result))
              .catch(error => console.debug('error', error))
          }
          val.setAttribute('disabled', true)
          val.innerHTML = `重新发送(${countdown})`
          countdown--
          setTimeout(() => {
            settime(val)
          }, 1000)
        }
      }
      settime(button)
    },
    showOptions() {
      this.optionOpen = true
    },
    addTabs() {
      this.addTabsOpen = true
    },
    submitTab() {
      if (this.url === '')
        return
      const newTag = {}
      newTag.url = `https://${this.newTabUrl}`
      newTag.name = this.newTabName
      newTag.key = 0
      newTag.icon = this.imgUrl[this.newTabIconIndex]
      this.imgUrl = []
      this.newTabIconIndex = 0
      const tags = this.$store.state.tagList
      let x = 2
      let y = 0
      const numRows = 12 // 行数
      const numCols = 10 // 列数

      // 使用fill函数初始化二维数组
      const matrix = []
      for (let i = 0; i < numRows; i++) {
        matrix[i] = []
        for (let j = 0; j < numCols; j++)
          matrix[i][j] = -1
      }
      tags.forEach((a) => {
        matrix[a.y][a.x] = a.i
        console.debug(a.y, a.x, a.i)
      })
      console.debug(matrix)
      let found = false
      for (let i = 0; i <= 12; i += 3) {
        for (let j = 2; j <= 9; j++) {
          if (matrix[i][j] === -1) {
            console.debug(i, j)
            y = i
            x = j
            found = true
          }
          if (found === true)
            break
        }
        if (found === true)
          break
      }

      const len = tags.length + 1
      newTag.x = x
      newTag.y = y
      newTag.w = 1
      newTag.h = 3
      newTag.i = len - 1
      this.newTabUrl = ''
      this.newTabName = ''
      // this.tags.push(newTag)
      tags.push(newTag)
      this.$store.commit('updateTagList', tags)
      this.addTabsOpen = false
    },
    changePic(pic) {
      const body = document.body
      const video = document.getElementById('video')
      if (pic.type === 'pic') {
        video.style.display = 'none'
        body.style.backgroundImage = `url(${pic.src})`
      }
      else {
        video.style.display = 'block'
        body.style.backgroundImage = ''
        video.src = pic.link
      }
      localStorage.setItem('background', JSON.stringify(pic))
    },
    backgroundTab() {
      this.activeKey = 1
    },
    OptionTab() {
      this.activeKey = 2
    },
    onAfterChange(flag) {
      const strategies = {
        tagRadius: () => {
          this.$store.commit('updateTagRadius', this.tagRadius)
        },
        tagOpacity: () => {
          this.$store.commit('updateTagOpacity', this.tagOpacity)
        },
        searchBoxSize: () => {
          this.$store.commit('updateSearchBoxSize', this.searchBoxSize)
        },
        searchBoxOpacity: () => {
          this.$store.commit('updateSearchBoxOpacity', this.searchBoxOpacity)
        },
        searchBoxRadius: () => {
          this.$store.commit('updateSearchBoxRadius', this.searchBoxRadius)
        },
      }
      strategies[flag]()
    },
    changeOptionData(flag) {
      const strategies = {
        tagRadius: () => {
          this.$store.state.tagRadius = this.tagRadius
        },
        tagOpacity: () => {
          this.$store.state.tagOpacity = this.tagOpacity
        },
        searchBoxSize: () => {
          this.$store.state.searchBoxSize = this.searchBoxSize
        },
        searchBoxOpacity: () => {
          this.$store.state.searchBoxOpacity = this.searchBoxOpacity
        },
        searchBoxRadius: () => {
          this.$store.state.searchBoxRadius = this.searchBoxRadius
        },
      }
      strategies[flag]()
    },
    saveTab() {
      this.activeKey = 3
    },
    afterOpenChange() {
    },
  },
}
</script>

<template>
  <div class="userBox">
    <div
      class="avatarBox"
    >
      <img src="@/assets/ico/touxiang.png" class="avatar" @click="showModal">
    </div>
    <div class="filterBox">
      <div class="#">
        #
      </div>
      <div class="#">
        #
      </div>
      <div class="#">
        #
      </div>
    </div>
    <div
      class="addBox"
    >
      <img src="@/assets/ico/add.png" class="addPic" @click="addTabs">
    </div>
    <div
      class="optionBox"
    >
      <img src="@/assets/ico/option.png" class="avatar" @click="showOptions">
    </div>

    <a-modal
      v-model:open="loginOpen" title="用户登录" :confirm-loading="confirmLoading" width="350px" class="loginBox"
      cancel-text="取消" ok-text="确定" @ok="handleOk(e)" @cancel="handleCancel"
    >
      <a-space direction="vertical" class="login">
        <a-input v-if="page === 0" v-model:value="email" placeholder="邮箱" />
        <a-input v-if="page === 0" v-model:value="password" placeholder="密码" />
        <a-input v-if="page === 1" v-model:value="email" placeholder="邮箱" />
        <div class="codeBox">
          <a-input v-if="page === 1" v-model:value="code" placeholder="验证码" class="codeInput" />
          <a-button v-if="page === 1" id="codeButton" :disabled="!isErrorEmail" @click="sendCode">
            获取验证码
          </a-button>
        </div>
        <a-input v-if="page === 1" v-model:value="password" placeholder="密码" :class="{ error: isErrorPassword }" />
        <a-input v-if="page === 2" v-model:value="email" placeholder="邮箱" />
        <a-input v-if="page === 2" v-model:value="code" placeholder="验证码" />
        <a-input v-if="page === 2" v-model:value="password" placeholder="新密码" />
      </a-space>
      <div class="newAdmin">
        <div @click="findPassword">
          忘记密码
        </div>
        <div @click="register">
          点击注册
        </div>
      </div>
    </a-modal>
    <a-modal v-model:open="addTabsOpen" title="新增标签页" class="addTabBox" @ok="submitTab">
      <a-input v-model:value="newTabUrl" placeholder="新增网址url" />
      <a-input v-model:value="newTabName " class="tabInput" placeholder="网址名" />
      <span class="tip">选择图标</span>
      <div class="imgsBox">
        <div v-for="(img, index) in imgUrl" :key="index">
          <div class="imgBox" :class="{ iconActive: newTabIconIndex === index }">
            <img :src="img" @click="toggleIcon(index)">
          </div>
        </div>
      </div>
    </a-modal>
  </div>
  <a-drawer
    v-model:open="optionOpen"
    class="custom-class"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    style="color: red"
    title="设置"
    placement="left"
    @after-open-change="afterOpenChange"
  >
    <div class="tabBox">
      <div class="tab" :class="{ tabActive: activeKey === 1 }" @click="backgroundTab">
        背景
      </div>
      <div class="tab" :class="{ tabActive: activeKey === 2 }" @click="OptionTab">
        设置
      </div>
      <div class="tab" :class="{ tabActive: activeKey === 3 }" @click="saveTab">
        备份与恢复
      </div>
    </div>
    <div class="optionMenu">
      <div v-show="activeKey === 1">
        <div class="picListBox">
          <div class="backgroundOptionTitle">
            深色模式
          </div>
        </div>
        <div class="picListBox">
          <div class="backgroundOptionTitle">
            壁纸
          </div>
          <div v-for="pic in bgPicList" :key="pic.key" @click="changePic(pic)">
            <div class="picBox">
              <img
                :src="pic.src"
              >
            </div>
          </div>
        </div>
      </div>
      <div v-show="activeKey === 2">
        <div class="optionPage">
          <div class="changeOptionBox">
            <div class="optionTitle">
              图标圆角
            </div>
            <a-slider v-model:value="tagRadius" @afterChange="onAfterChange('tagRadius')" @change="changeOptionData('tagRadius')" />
          </div>
          <div class="changeOptionBox">
            <div class="optionTitle">
              图标透明度
            </div>
            <a-slider v-model:value="tagOpacity" @afterChange="onAfterChange('tagOpacity')" @change="changeOptionData('tagOpacity')" />
          </div>
          <div class="changeOptionBox">
            <div class="optionTitle">
              搜索框高度
            </div>
            <a-slider v-model:value="searchBoxSize" @afterChange="onAfterChange('searchBoxSize')" @change="changeOptionData('searchBoxSize')" />
          </div>
          <div class="changeOptionBox">
            <div class="optionTitle">
              搜索框透明度
            </div>
            <a-slider v-model:value="searchBoxOpacity" @afterChange="onAfterChange('searchBoxOpacity')" @change="changeOptionData('searchBoxOpacity')" />
          </div>
          <div class="changeOptionBox">
            <div class="optionTitle">
              搜索框圆角
            </div>
            <a-slider v-model:value="searchBoxRadius" @afterChange="onAfterChange('searchBoxRadius')" @change="changeOptionData('searchBoxRadius')" />
          </div>
          <a-button>恢复默认</a-button>
        </div>
      </div>
      <div v-show="activeKey === 3">
        备份与恢复
      </div>
    </div>
  </a-drawer>
</template>

<style></style>
