<template>
    <div id="component_slider">
        <el-row type="flex"  align="middle">
            <el-col :span="8">
                <el-checkbox v-model="checked">
                    {{title}}
                </el-checkbox>
            </el-col>
            <el-col :span="16">
                <el-slider
                        :min="min"
                        :max="max"
                        :disabled="!checked"
                        v-model="defaultValueCopy"
                        :format-tooltip="formatTooltip"
                        show-input
                        input-size="mini"
                        :show-input-controls="showInputControls"
                        @change="handleChange"
                >
                </el-slider>

            </el-col>
        </el-row>
        <el-divider></el-divider>
    </div>
</template>

<script>
    export default {
        data() {
            let self=this;
            return {
                checked:true,
                defaultValueCopy:self.default_value,
                showInputControls:false
            }
        },
        props: {
            /*滑块最大值*/
            max:{
                type:Number,
                required:true,
            },
            /*滑块最小值*/
            min:{
                type:Number,
                required:false,
                default:0
            },
            /*滑块标题*/
            title:{
                type:String,
                required:true,
            },
            /*滑块默认初始值*/
            default_value:{
                type:Number | undefined,
                required:true,
            },
            /*滑块默认单位*/
            unit:{
                type:String,
                required:true
            }
        },
        methods: {
            formatTooltip(val){
                return val+this.unit;
            },
            handleChange(val){
                //实际情况组装数据
                let data={};
                data['new_value']=val;
                data['title']=this.title;
                data['origin_value']=this.default_value;
                this.$emit("setValue",data);
            }

        }
    }
</script>

