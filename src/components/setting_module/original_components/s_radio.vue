<template>
    <div id="component_radio">
        <el-row type="flex"  align="middle">
            <el-col :span="8">
                <el-checkbox v-model="checked">
                    {{title}}
                </el-checkbox>
            </el-col>
            <el-col :span="16">
                <el-radio-group size="mini" :disabled="!checked" v-model="default_option_copy" @change="handleChange">
                    <el-radio-button :border="showBorder" :key="item.id" v-for="item in options" :label="item.value">{{item.name}}</el-radio-button>
                </el-radio-group>

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
                default_option_copy:self.default_option
            }
        },
        props: {
            /*标题*/
            title:{
                type:String,
                required:true,
            },
            default_option:{
                required: true
            },
            options:{
                type: Array,
                required: true
            },
            showBorder:{
                type:Boolean,
                required:false,
                default:false
            }

        },
        methods:{
            handleChange(val){
                //实际情况组装数据
                let data={};
                data['new_value']=val;
                data['title']=this.title;
                data['origin_value']=this.default_option;
                this.$emit("setValue",data);
            }
        }
    }
</script>

<style scoped>

</style>