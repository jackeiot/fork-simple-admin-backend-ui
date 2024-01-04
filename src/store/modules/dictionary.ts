import { defineStore } from 'pinia';
import { GetDictionaryDetailByDictionaryName } from '/@/api/sys/dictionaryDetail';
import { DefaultOptionType } from 'ant-design-vue/lib/select';
import { ref } from 'vue';
import { DICT_INFO_KEY } from '/@/enums/cacheEnum';

interface DictionaryData {
  data: DefaultOptionType[];
}

export const useDictionaryStore = defineStore({
  id: 'app-dictionary',
  state: () => {
    return {
      data: JSON.stringify(Array.from(new Map<string, DictionaryData>()))
    };
  },
  actions: {
    // Get dictionary info
    async getDictionary(name: string) {
      let mapData: Map<string, DictionaryData> = new Map(JSON.parse(this.data));
      if (mapData.has(name)) {
        return mapData.get(name);
      } else {
        const result = await GetDictionaryDetailByDictionaryName({ name: name });
        if (result.code === 0) {
          const dataConv = ref<DefaultOptionType[]>([]);

          for (let i = 0; i < result.data.total; i++) {
            dataConv.value.push({
              label: result.data.data[i].title,
              value: result.data.data[i].value,
            });
          }

          const dictData: DictionaryData = { data: dataConv.value };
          mapData.set(name, dictData);
          this.data = JSON.stringify(Array.from(mapData.entries()));
          return dictData;
        } else {
          return null;
        }
      }
    },

    // remove the dictionary in storage
    removeDictionary(name: string) {
      let mapData = new Map(JSON.parse(this.data));
      if (mapData.has(name)) {
        mapData.delete(name);
      }
      this.data = JSON.stringify(Array.from(mapData.entries()));
    },

    // remove all the dictionary in storage
    clear() {
      let mapData = new Map();
      this.data = JSON.stringify(Array.from(mapData.entries()));
    },
  },
  persist: {
    storage: sessionStorage,
    key: DICT_INFO_KEY,
  },
});
