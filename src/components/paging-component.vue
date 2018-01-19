<template>
  <div id="table-page">
    <div class="box">
      <button class="prev" @click="goToPre" :disabled="firstPage">上一页</button>
      <template v-for="number in numbers">
        <span v-if="!Number(number)"> {{number}}</span>
        <a v-else href="javascript:;" class="number" :class="{active: (number === pageNumber)}"
           @click="goToPage(number)">{{number}}</a>
      </template>
      <button class="next" :disabled="lastPage" @click="goToNext">下一页</button>
      <span class="skip">到第
        <input type="text" min="1" v-model="givenPage">页
        <button type="button" class="btn" @click="goToGivenPage()">确定</button>
      </span>
    </div>
  </div>

</template>

<script>
    export default {
        name: 'Page',
        data () {
            return {
                givenPage: null,
                isRepet: false
            }
        },
        props: {
            pageNumber: Number,
            pageSize: Number,
            total: Number,
            pages: Number
        },
        watch: {
            pageNumber: function (newP, oldP) {
                this.isRepet = false
            }
        },
        computed: {
            numbers: function () {
                let spr = '...'
                let numbers
                if (this.pages < 5 || (this.pageNumber === 3 && this.pages === 5)) {
                    numbers = this.pages
                } else {
                    if (this.pageNumber < 3) {
                        numbers = [1, 2, 3, spr, this.pages]
                    } else if (this.pageNumber > this.pages - 2) {
                        numbers = [1, spr, this.pages - 2, this.pages - 1, this.pages]
                    } else {
                        if (this.pageNumber === 3) {
                            numbers = [1, 2, 3, 4, spr, this.pages]
                        } else if (this.pageNumber === 4 && this.pages === 6) {
                            numbers = [1, spr, 3, 4, 5, 6]
                        } else {
                            numbers = [1, spr, this.pageNumber - 1, this.pageNumber, this.pageNumber + 1, spr, this.pages]
                        }
                    }
                }
                return numbers
            },
            firstPage: function () {
                return this.pageNumber <= 1
            },
            lastPage: function () {
                return this.pageNumber >= this.pages
            }
        },
        methods: {
            goToPage: function (number) {
                if (!Number(number)) return
                if (number === this.pageNumber) {
                    this.search(number, true)
                } else {
                    this.search(number)
                }
            },
            goToGivenPage: function () {
                if (this.givenPage <= 0 || this.givenPage > this.pages) return
                this.search(Number(this.givenPage))
            },
            goToPre: function () {
                if (this.firstPage) return
                this.search(this.pageNumber - 1)
            },
            goToNext: function () {
                if (this.lastPage) return
                this.search(this.pageNumber + 1)
            },
            search: function (pageNumber, reflesh) {
                if (reflesh) {
                    this.$emit('pagingEvent', pageNumber)
                } else if (!this.isRepet) {
                    this.isRepet = true
                    this.$emit('pagingEvent', pageNumber)
                }
            }
        }
    }
</script>

<style scoped>
  .box {
    display: inline-block;
    user-select: none;
  }

  span, a {
    display: inline-block;
    vertical-align: middle;
    height: 26px;
    line-height: 26px;
    padding: 0 12px;
    margin: 0 -1px 5px 0;
    border: none;
    background: 0 0;
    color: #333;
    font-size: 12px;
  }

  span {
    margin-left: 0;
    padding: 0;
    color: #999;
    font-weight: 700;
  }

  a {
    color: #333;
    text-decoration: none;
  }

  .number {
    padding: 0 12px;
  }

  a.active {
    background-color: #009688;
    color: #fff;
    border-radius: 2px;
  }

  input {
    display: inline-block;
    width: 40px;
    height: 26px;
    line-height: 26px;
    margin: 0 10px;
    padding: 0 3px;
    text-align: center;
    border: 1px solid #e2e2e2;
    border-radius: 2px;
    vertical-align: top;
    background-color: #fff;
    box-sizing: border-box;
  }

  input:focus {
    border-color: #009688 !important;
    outline: 0;
  }

  .skip {
    color: #999;
    margin-right: 10px;
  }

  button {
    display: inline-block;
    height: 26px;
    line-height: 26px;
    padding: 0 10px;
    cursor: pointer;
    border-radius: 2px;
    vertical-align: top;
    background-color: #fff;
    box-sizing: border-box;
    border: 1px solid #e2e2e2;
    outline: 0;
  }
  button[disabled] {
    color: #d2d2d2 !important;
    cursor: not-allowed !important;
  }
</style>
