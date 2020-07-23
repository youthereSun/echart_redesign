<template>
    <div id="component_cbGroup">
        <el-row type="flex"  align="middle">
            <el-col :span="8">
                <el-checkbox v-model="checked">
                    {{title}}
                </el-checkbox>
            </el-col>
            <el-col :span="16">
                <el-checkbox-group
                        size="mini"
                        @change="handleChange"
                        :disabled="!checked"
                        v-model="checkedOption"
                        :min="0"
                        :max="1">
                    <el-checkbox border v-for="item in options" :label="item" :key="item">{{item}}</el-checkbox>
                </el-checkbox-group>

            </el-col>
        </el-row>
        <el-divider></el-divider>

    </div>
    
</template>

<script>
    export default {
        name: "s_checkboxGroup",
        data(){
            let self=this;
            return{
                checked:false,
                checkedOption:self.default_option
            }
        },
        props: {
            /*标题*/
            title:{
                type:String,
                required:true,
            },
            /*默认选项*/
            default_option:{
                type:Array,
                required:true,
            },
            /*选项列表*/
            options:{
                type:Array,
                required:true,
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