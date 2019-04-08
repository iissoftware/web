<template>
	<div class="line" ref="line" @mousedown="drag($event)"></div>
</template>
<script>
/**
 * Author: iissoftware
 * Date: 2019-01-22
 * Description: 侧边左右拖动宽度组件
*/
export default {
	props: {
		elem: {
			type: Array,
			required: true
		},
		min: {
			type: [Number, String],			//最小拖动宽度
			default: 100
		},
		max: {
			type: [Number, String],
			default: 0
		}
	},
	methods: {
		drag(e) {
			let elem = this.$refs.line;
			let ev = e || event,
				oLeft = elem.offsetLeft,
				disX = ev.clientX;
			document.onmousemove = (e) => {
				let ev = e || event,
					x = oLeft + (ev.clientX - disX);
				if(x <= this.min) x = this.min;
				if(x >= $(this.elem[2]).width() - this.min) x = $(this.elem[2]).width() - this.min;
				elem.style.left = x + 'px';
				$(this.elem[0]).width(x);
				$(this.elem[1]).width($(this.elem[2]).width() - x - 15);
			}
			document.onmouseup = () => {
				document.onmousemove = null;
				document.onmouseup = null;
			}
		}
	}
}
</script>
<style scoped>
	.line {
		-moz-user-select:none;
      	-webkit-user-select:none;
      	user-select:none;
      	width: 5px;
		height: 100%;
		background-color: transparent;
		position: absolute;
		top: 0;
		left: 200px;
		cursor: w-resize;
		z-index: 99999;
	}
</style>