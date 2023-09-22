<template>
    <div class="searchBox">
        <div id="select" class="searchEngine" @click="toggleDropdown">
            <div class="selected" width="16px" height="16px" @blur="toggleDropdown">
                <img class="engineIcon" :src="favicon">
            </div>
            <div class="dropdown" :class="{ open: isDropdownOpen }">
                <div v-for="engine in searchEngine" :key="engine.name" class="option" @click="selectOption(engine)">
                    <img class="engineIcon" :src="engine.icon">
                </div>
            </div>
        </div>


        <input v-model="content" class="searchInput" type="text" @keydown.enter="searchContent" @input="suggest"
            placeholder="请输入搜索内容" @focus="showSug" @blur="hidSug">
        <div class="suggestionsBox" :class="{ open: showSugs }">
            <div v-for="item in searchSuggestion" class="suggestions" :key="item.Sk" @click="suggestionSearch(item)">
                <svg id="mySvg" class="icon">
                    <use xlink:href="@/assets/svg/search.svg"></use>
                </svg>
                <div class="suggestion">{{ item.Txt }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Bing from '@/assets/ico/bing.ico'
import Baidu from '@/assets/ico/baidu.ico'
import Google from '@/assets/ico/google.ico'
import Sougou from '@/assets/ico/sougou.ico'
import Github from '@/assets/ico/github.ico'

export default {
    data() {
        return {
            favicon: Bing,
            content: '',
            searchEngine: [
                {
                    name: 'bing',
                    icon: Bing,
                },
                {
                    name: 'baidu',
                    icon: Baidu
                },
                {
                    name: 'sougou',
                    icon: Sougou
                },
                {
                    name: 'github',
                    icon: Github
                },
                {
                    name: 'google',
                    icon: Google
                }
            ],
            selectedEngine: "bing",
            searchSuggestion: [],
            currentTime: '',
            isDropdownOpen: false,
            showSugs: false,
        }
    },
    methods: {
        searchContent() {
            let bing = 'https://cn.bing.com/search?q='
            let baidu = 'https://www.baidu.com/s?wd='
            let sougou = 'https://www.sogou.com/web?query='
            let github = 'https://github.com/search?q='
            let google = 'https://www.google.com/search?q='
            let c = this.content
            let url = ""
            let s = this.selectedEngine
            if (s == "bing") {
                url = bing + c
            } else if (s == "github") {
                url = github + c + '&type=repositories'
            } else if (s == "baidu") {
                url = baidu + c
            } else if (s == "sougou") {
                url = sougou + c
            } else {
                url = google + c
            }
            window.open(url, '_blank');
            this.content = ''
            this.searchSuggestion = []
        },
        suggest() {
            // this.searchSuggestion = [];
            let c = this.content
            let dataUrl = `http://api.bing.com/qsonhs.aspx?type=cb&q=${c}&cb=window.bing.sug`
            window.bing = {
                // 这里要用箭头函数, 否则this会指向window.bing
                sug: (json) => {
                    if (json.AS.Results != undefined) {
                        this.searchSuggestion = json.AS.Results[0].Suggests
                    }

                }
            }
            var script = document.createElement("script")
            script.src = dataUrl
            if (c != '') {
                document.getElementsByTagName("head")[0].appendChild(script)
            } else {
                this.searchSuggestion = []
            }
        },
        suggestionSearch(i) {
            this.content = i.Txt
            console.log(this.content)
            this.searchContent()
        },
        showSug() {
            const sugsBox = document.getElementsByClassName('suggestionsBox')[0]
            sugsBox.style.display = "flex";
            const sBox = document.getElementsByClassName('searchBox')[0]
            sBox.style.opacity = 1
        },
        hidSug() {
            const sugsBox = document.getElementsByClassName('suggestionsBox')[0]
            const sBox = document.getElementsByClassName('searchBox')[0]
            sBox.style.opacity = 0.7
        },
        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        selectOption(value) {
            this.selectedEngine = value.name;
            let ico = document.getElementsByClassName('engineIcon')[0]
            ico.src = value.icon
        }
    },
}
</script>

<style lang="scss" scoped></style>