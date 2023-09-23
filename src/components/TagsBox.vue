<template>
    <div class="tagsBox">
        <div v-for="tag in tags" class="tagBox" @click="openTag(tag)">
            <div class="ico" @contextmenu.prevent.stop="rightClick(tag)">
                <img :src=tag.icon class="tagIcon">
            </div>
            <div class="tagName">
                {{ tag.name }}
            </div>

        </div>
        <div class="tagBox">
            <div class="ico">
                <div class="tagIcon" id="addTag" @click="showModal"></div>
            </div>
            <div class="tagName">
                添加标签
            </div>
        </div>
    </div>
    <div>
        <a-modal v-model:open="open" title="添加标签" @ok="handleOk">
            <a-space direction="vertical" class="add">
                <a-input v-model:value="name" placeholder="标签名称" />
                <a-input v-model:value="url" placeholder="请输入正确的url(域名)无需添加http" />
            </a-space>
            <div class="selectIcon"></div>
        </a-modal>
    </div>
</template>

<script>
import Kxz from '@/assets/ico/kxz.png'
export default ({
    data() {
        return {
            url: '',
            name: '',
            open: false,
            tags: []
        }
    },
    mounted() {
        this.tags = this.$store.state.tagList
    },
    methods: {
        openTag(t) {
            window.open(t.url, '_blank')
        },
        showModal() {
            this.open = true
        },
        handleOk(e) {
            console.log(e)
            if (this.url == '') {
                return;
            }
            let newTag = {}
            newTag.url = 'https://' + this.url;
            newTag.name = this.name;
            newTag.key = 0;
            newTag.icon = Kxz
            this.url = ''
            this.name = ''
            // this.tags.push(newTag)
            this.tags.push(newTag)
            this.$store.commit('updateTagList', this.tags)
            this.open = false
        },
        rightClick(tag) {
            console.log(tag)
            this.tags = this.tags.filter(item => item !== tag);
            this.$store.commit('updateTagList', this.tags)
        }
    }
})
</script>

<style></style>