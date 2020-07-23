<template>
    <div id="component_checkbox">
        <el-row type="flex"  align="middle">
            <el-col :span="8">
                <el-checkbox v-model="checked">
                    {{title}}
                </el-checkbox>
            </el-col>
            <el-col :span="16" align="center">
                <el-checkbox @change="handleCBChange" v-model="default_value_copy" :disabled="!checked"></el-checkbox>

            </el-col>
        </el-row>
        <el-divider></el-divider>
    </div>
</template>

<script>
    export default {
        name: "s_checkbox",
        data(){
            let self=this;
            return{
                checked:false,
                default_value_copy:self.default_value
            }
        },
        props: {
            /*滑块标题*/
            title:{
                type:String,
                required:true,
            },
            /*滑块默认初始值*/
            default_value:{
                type:Boolean,
                required:false,
                default:false
            }
        },
        methods:{
            handleCBChange(){
                //实际情况组装数据
                let data={};
                data['new_value']=this.default_value_copy;
                data['title']=this.title;
                data['origin_value']=this.default_value;
                this.$emit("setValue",data);
            }
        }
    }
</script>

<style scoped>

</style>