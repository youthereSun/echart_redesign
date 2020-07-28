import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ECharts from 'vue-echarts'
import './assets/styles/reset.css'
import './assets/styles/index.less'
import './assets/icons/iconfont.css'
import JsonViewer from 'vue-json-viewer'
import { Message } from 'element-ui';
import Base64 from "./utils/base64";
import {
    Container,
    Header,
    Aside,
    Main,
    Drawer,
    Button,
    Tabs,
    TabPane,
    Checkbox,
    Slider,
    Input,
    Col,
    Row,
    Divider,
    ColorPicker,
    CheckboxGroup,
    RadioGroup,
    Radio,
    RadioButton,
    Collapse,
    CollapseItem,
    Dialog,
    Popover,
    Card,
    Tag,
    Table,
    TableColumn
} from 'element-ui';
Vue.use(Container).use(Header).use(Aside).use(Main).use(Drawer).use(Button).use(Tabs).use(TabPane).use(Checkbox).use(Slider)
    .use(Input).use(Col).use(Row).use(Divider).use(ColorPicker).use(CheckboxGroup).use(RadioGroup).use(Radio).use(RadioButton)
    .use(CollapseItem).use(Collapse).use(Dialog).use(Popover).use(Card).use(Tag).use(Table).use(TableColumn)
import vuescroll from 'vuescroll';

Vue.use(vuescroll);
Vue.use(JsonViewer)

//(开发中上测试环境和后端联调，需要禁用mock时，注释这段代码就可以)：
import './mock/index'

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
Vue.prototype.$message=Message
// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/scatter'

import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/axis'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/timeline'
import 'echarts/lib/component/calendar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markArea'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/geo'
import china from 'echarts/map/json/china.json'
ECharts.registerMap('china', china)
Vue.component('v-chart', ECharts)

Vue.config.productionTip = false

//base64挂载到vue全局上
Vue.prototype.$Base64 = Base64;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

