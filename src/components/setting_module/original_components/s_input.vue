<template>
    <div id="component_radio">
        <el-row type="flex"  align="middle">
            <el-col :span="8">
                <el-checkbox v-model="checked">
                    {{title}}
                </el-checkbox>
            </el-col>
            <el-col :span="16">
                <el-input   @blur="handleChange" :disabled="!checked || disabled" v-model="default_field_copy" placeholder="请输入内容"></el-input>
            </el-col>
        </el-row>
        <el-divider></el-divider>

    </div>
</template>

<script>
    export default {
        data(){
            let self=this;
            return{
                checked:true,
                default_field_copy:self.default_field
            }
        },
        props: {
            /*标题*/
            title:{
                type:String,
                required:true,
            },
            default_field:{
                required: true
            },
            type:{
                required: false,
                default:"text"

            },
            disabled:{
                required: false,
                default:false
            }


        },
        methods:{
            handleChange(){
                //实际情况组装数据
                let data={};
                this.type=="number"?data['new_value']=parseInt(this.default_field_copy):data['new_value']=this.default_field_copy;
                data['title']=this.title;
                data['origin_value']=this.default_option;
                this.$emit("setValue",data);
            }
        }
    }
</script>

<style scoped>

</style>