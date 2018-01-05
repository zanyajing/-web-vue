<template>
	<div class="slider-wrap">
		<div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
			<div class="slide-img">
				<a :href="slides[nowIndex].href">
					<transition name="slide-trans">
						<img v-if="isShow" :src="slides[nowIndex].src" />
					</transition>
					<transition name="slide-trans-old">
						<img v-if="!isShow" :src="slides[nowIndex].src" alt="" />
					</transition>
				</a>
			</div>
			<ul class="slide-pages">
				<li v-for="(item,index) in slides" @click="goto(index)">
					<a href="javascript:;" :class="{'on':index === nowIndex}"></a>
				</li>
			</ul>
		</div>
		<div class="slide-info" v-if="showInfo">
			<h2>高效对接多家金融机构，线上便捷贷款服务体验</h2>
			<ul>
				<li>
					<a href="javascript:;"><strong>直达银行</strong></a>
				</li>
				<li>
					<a href="javascript:;"><strong>专业协助</strong></a>
				</li>
				<li>
					<a href="javascript:;"><strong>操作便捷</strong></a>
				</li>
				<li>
					<a href="javascript:;" class="mg26"><span>启迪</span><span>专享优惠</span></a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			slides: {
				type: Array,
				default: []
			},
			inv: {
				type: Number,
				default: 1000
			},
			showInfo:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				nowIndex: 0,
				isShow: true
			}
		},
		computed: {
			prevIndex() {
				if(this.nowIndex == 0) {
					return this.slides.length - 1;
				} else {
					return this.nowIndex - 1;
				}
			},
			nextIndex() {
				if(this.nowIndex == this.slides.length - 1) {
					return 0;
				} else {
					return this.nowIndex + 1;
				}
			}
		},
		methods: {
			goto(index) {
				this.isShow = false;
				setTimeout(() => {
					this.isShow = true;
					this.nowIndex = index;
					this.$emit('onchange', index);
				}, 10)
			},
			runInv() {
				this.invId = setInterval(() => {
					this.goto(this.nextIndex);
				}, this.inv)
			},
			clearInv() {
				clearInterval(this.invId)
			}
		},
		mounted() {
			this.runInv();
		}
	}
</script>
<style scoped>
	.slider-wrap{
		position: relative;
	}
	.slide-trans-enter-active {
		transition: all .5s;
	}
	
	.slide-trans-enter {
		transform: translateX(100%);
	}
	
	.slide-trans-old-leave-active {
		transition: all .5s;
		transform: translateX(-100%);
	}
	
	.slide-show {
		position: relative;
		width: 100%;
		height: 500px;
		overflow: hidden;
		display: flex;
		justify-content: center;
	}
	
	.slide-img {
		width: 100%;
		display: flex;
		align-items: center;
	}
	
	.slide-img img {
		height: 500px;
		position: absolute;
		top: 0;
		left:50%;
		margin-left: -960px;
		flex: 1;
	}
	
	.slide-info {
		width: 100%;
		text-align: center;
		position: absolute;
		top: 150px;
		z-index: 20;
	}
	
	.slide-info h2 {
		height: 84px;
		line-height: 84px;
		text-align: center;
		font-weight: bold;
		font-size: 48px;
		color: #fff;
	}
	
	.slide-info ul{
		width:480px;
		margin:0 auto;
	}
	.slide-info ul li{
		float: left;
		padding: 0 15px;
	}
	.slide-info ul li a{
		display: block;
		color: #008fff;
		width:89px;
		text-align: center;
		background: url(ulWrap.png) no-repeat;
		font-family: Microsoft Yahei;
		font-size: 18px;
		height: 102px;
		cursor:default;
	}
	.slide-info ul li a strong{
		display: block;
		line-height: 102px;
		font-weight: normal;
	}
	.slide-info ul li a span{
		display: block;
		line-height: 22px;
		font-weight: normal;
	}
	.slide-pages {
		position: absolute;
		bottom: 110px;
	}
	
	.slide-pages li {
		display: inline-block;
		padding: 0 11px;
		cursor: pointer;
		color: #fff;
	}
	
	.slide-pages li a {
		display: block;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		border: 2px solid #a7a3a3;
		background: #fff;
	}
	
	.slide-pages li .on {
		text-decoration: underline;
		width: 28px;
		border-radius: 8px;
	}
	
	.mg26{
		padding-top:26px;
	}
</style>