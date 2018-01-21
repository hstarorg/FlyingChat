import { ajax } from '@/common';

const getMainUIData = async () => {
  const { data } = await ajax.get(`${AppConf.apiHost}/ui/main`);
  return data;
};

export { getMainUIData };
