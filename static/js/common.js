(() => {
  const initVueComponents = () => {
    Vue.component('layui-switch', {
      template: `
      <div @click="toggleStatus()" class="layui-unselect layui-form-switch" :class="{'layui-form-onswitch': checked}"><i></i></div>
      `,
      props: {
        value: { type: Boolean, default: false }
      },
      data() {
        return {
          checked: false
        }
      },
      mounted() {
        this.checked = this.value || false;
      },
      methods: {
        toggleStatus() {
          this.checked = !this.checked;
          this.$emit('input', this.checked);
        }
      }
    });
  }

  const initAjax = () => {
    const request = (method, url, data, options) => {
      let ajaxOpt = Object.assign({
        contentType: 'application/json',
        dataType: 'json'
      }, options || {}, {
          method,
          url,
          data
        });
      return $.ajax(ajaxOpt)
        .then(res => {
          return { res: res, data: res.data }
        });
    };
    window.ajax = {
      get(url, options) {
        return request('GET', url, null, options);
      },
      delete(url, options) {
        return request('DELETE', url, null, options);
      },
      post(url, data, options) {
        return request('POST', url, data, options);
      },
      put(url, data, options) {
        return request('PUT', url, data, options);
      }
    };
  }

  initVueComponents();
  initAjax();

})();