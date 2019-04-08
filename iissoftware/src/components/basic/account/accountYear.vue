<template>
    <div class="systemInfo">
        <div class="date" style="overflow: hidden;">
            <div class="date-left">
                <div class="date-title">会计年度<img src="../../../assets/images/dasd.png" alt="" @click="addYear" style="float: right;vertical-align: middle;margin-top: 2px;cursor: pointer"></div>
                <ul class="dataUl">
                    <li v-for="(item, index) in year" :key="index" :class="index == currentIndex ? 'active' : ''" @click="nodeClick(index,item)">{{ item }}</li>
                </ul>
            </div>
            <div class="date-right">
                <div class="block-area">
                    <div class="btn-group">
                        <!-- <el-button type="info" @click="refresh">刷新</el-button> -->
                        <el-button-group class="btn-other">
                            <el-button title="导出" @click="exportExcel">
                                <img src="../../../assets/images/export.png" alt="">
                            </el-button>
                            <el-button title="导入">
                                <el-upload class="upload-demo" :action="$url + 'systemParameters/importSysAccountInterval?systemId==' + systemId" :show-file-list="false" multiple style="display: inline-block;" :on-success="importExcel">
                                    <img src="../../../assets/images/import.png" alt="">
                                </el-upload>
                            </el-button>                        
                            <el-button title="打印">
                                <img src="../../../assets/images/print.png" alt="">
                            </el-button>
                            <el-button title="帮助">
                                <img src="../../../assets/images/help.png" alt="">
                            </el-button>
                        </el-button-group>
                    </div>
                </div>
                <div class="datebox">
                    <div class="dateList">
                        <div>
                            <span>会计区间</span>
                            <span>开始日期</span>
                        </div>
                        <div v-for="(item, index) in 12" :key="index">
                            <span>{{ index + 1}}</span>
                            <span>{{ currentYear ? currentYear : year[0] }}-{{ index = (index + 1) < 10 ? '0' + (index + 1) : parseInt(index + 1) }}-01</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    /**
 * Author: iissoftware
 * Date: 2018-12-03
 * Description: 会计区间组件
*/
export default {
    data() {
        return {
            currentIndex: 0,
            userName: '',
            year: this.$store.state.year,       //存储会计年度
            currentYear: '',
            systemId: this.$store.state.systemId,
            status: this.$store.state.accountStore.status
        }
    },
    watch: {
        year() {
            let year = this.$store.state.year;
            this.currentYear = year[0];
            this.currentIndex = 0;
        }
    },
    methods: {
        nodeClick(index, year) {
            this.currentIndex = index;
            this.currentYear = year;
        },
        getYearData() {         //获取会计年度数据
            this.$http.get(this.$url + 'systemParameters/selectSysAccountYear').then(res => {
                if(res.data.code == 20001) {
                    if(res.data.data) {
                        let startYear = res.data.data[0],
                            endYear = res.data.data[res.data.data.length - 2];
                        this.$store.commit('updateYear', {startYear: startYear, endYear: endYear});
                    } else {
                        this.$store.commit('updateYear', {startYear: new Date().getFullYear() - 20, endYear: new Date().getFullYear()});
                    }
                    this.currentYear = this.year[0];
                    this.currentIndex = 0;
                } else {
                    this.$store.commit('updateYear', {startYear: new Date().getFullYear() - 20, endYear: new Date().getFullYear()});
                    this.currentYear = this.year[0];
                    this.currentIndex = 0;
                }
            });
        },
        addYear() {         //新增会计区间
            if(this.status[0] == 2) {
                this.$message.warning('查看状态下不可修改');
                return false;
            }
            if(this.systemId) {
                this.$util.openSubLayerIframe('会计区间-修改', 13, '500px', '310px', this.$domain + '/#/account/updateYear');
            } else {
                this.$message.error('先添加系统参数');
            }
        },
        exportExcel() {         //导出
            this.$http.get(this.$url + 'systemParameters/exportSysAccountInterval?year=' + parseInt(this.currentYear)).then(res => {
                this.$message({message: '导出成功', type: 'success', duration: 1000});
                window.location.href = this.$url + 'systemParameters/exportSysAccountInterval?year=' + parseInt(this.currentYear);          //导出时触发
            }).catch(err => {
                this.$message.error(err);
            });
        },
        importExcel(res) {          //导入
            if(res.code === 20001) {    
                this.$message({message: '导入成功', type: 'success', duration: 1000});
                setTimeout(() => {
                    this.getYearData();
                }, 1000);
            } else {
                this.$message.error(res.msg);
            }
        }
    },
    created() {
        this.getYearData();
    }
}
</script>
<style scoped>
    .systemInfo {height: 100% !important;}
    .systemInfo .block-area {height: auto !important;}
    .form {width: 50% !important;margin: auto;}
    .date {height: 100% !important;}
    .date-left {width: 150px;float: left;background-color: #fff;}
    .date-left .date-title {font-size: 15px;box-sizing: border-box;padding: 10px 15px;border-bottom: 1px solid #eee;}
    .dataUl > li {text-align: center;line-height: 30px;}
    .dataUl > li:first-child {padding-top: 10px !important;}
    .dataUl > li:hover, .dataUl > li.active {background-color: #f5f7fa;cursor: pointer;}
    .date-left, .date-right {height: 100% !important;}
    .dataUl {height: calc(100% - 51px) !important;overflow-y: auto !important;}
    .date-right {width: calc(100% - 165px) !important;float: right;background-color: #fff;}
    .datebox {height: calc(100% - 45px) !important;position: relative;}
    .datebox .dateList {width: 400px !important;margin: auto;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -55%);border-right: 1px solid #eee;border-top: 1px solid #eee;}
    .datebox .dateList > div {overflow: hidden;}
    .datebox .dateList span {
        width: 50% !important;
        float: left;
        text-align: center;
        line-height: 33px;
        font-size: 14px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
        border-left: 1px solid #eee;
        }
</style>
    