(() => {
  const initVueComponents = () => {
    Vue.component('layui-switch', {
      template: `
      <div @click="toggleStatus()" class="layui-unselect layui-form-switch" :class="{'layui-form-onswitch': checked}"><i></i></div>
      `,
      props: {
        value: null
      },
      data() {
        return {
          checked: false
        }
      },
      watch: {
        value(newVal) {
          this.checked = newVal;
        }
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
        processData: false
      }, options || {}, {
          method,
          url,
          data: JSON.stringify(data)
        });
      return $.ajax(ajaxOpt)
        .then(res => {
          let data = res.data ? JSON.parse(res.data) : res.data;
          return { res, data }
        })
        .catch(res => {
          if (res.status === 500) {
            let data = JSON.parse(res.responseText);
            layer.msg('Error:' + data.message);
          }
          return Promise.reject(res);
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