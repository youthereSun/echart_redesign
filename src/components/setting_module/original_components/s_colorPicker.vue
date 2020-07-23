<template>
    <div id="component_colorPicker">
        <el-row type="flex"  align="middle">
            <el-col :span="8">
                <el-checkbox v-model="checked">
                    {{title}}
                </el-checkbox>
            </el-col>
            <el-col :span="16" align="center">
                <el-color-picker @change="handleChange" size="mini" :showAlpha="showAlpha" :disabled="!checked" v-model="default_color_copy"></el-color-picker>

            </el-col>
        </el-row>
        <el-divider></el-divider>
    </div>
</template>

<script>
    export default {
        data() {
            let self = this;
            return {
                checked: true,
                default_color_copy:self.default_color,
                showAlpha:true
            }
        },
        props: {
            default_color: {
                type: String | undefined,
                required: true
            },
            /*滑块标题*/
            title:{
                type:String,
                required:true
            }

        },
        methods: {
            handleChange(val){
                //实际情况组装数据
                let data={};
                data['new_value']=val;
                data['title']=this.title;
                data['origin_value']=this.default_color;
                this.$emit("setValue",data)
            }
        }
    }
</script>

