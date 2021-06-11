import { App } from '@vue/runtime-core';
import {
  Alert,
  AutoComplete,
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  ConfigProvider,
  DatePicker,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Layout,
  List,
  Pagination,
  Progress,
  Popconfirm,
  Popover,
  Row,
  Select,
  Table,
  Tabs,
  Tag,
  Tree
} from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

function useAntdComponents (vueApp: App): App {
  return vueApp
    .use(Alert)
    .use(AutoComplete)
    .use(Avatar)
    .use(Badge)
    .use(Breadcrumb)
    .use(Button)
    .use(Card)
    .use(Checkbox)
    .use(ConfigProvider)
    .use(Col)
    .use(DatePicker)
    .use(Dropdown)
    .use(Form)
    .use(Input)
    .use(Menu)
    .use(Modal)
    .use(Layout)
    .use(List)
    .use(Pagination)
    .use(Progress)
    .use(Popover)
    .use(Popconfirm)
    .use(Row)
    .use(Select)
    .use(Table)
    .use(Tabs)
    .use(Tag)
    .use(Tree);
}

export default useAntdComponents;
