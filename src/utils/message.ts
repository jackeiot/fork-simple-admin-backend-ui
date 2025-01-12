import { notification,} from 'ant-design-vue';
export const openNotificationWithIcon = (type: string, tile?:string, description?:string) => {
  notification[type]({
    message: tile?tile:'success',
    description:description,
  });
};