import { NgModuleRef, ApplicationRef } from '@angular/core';
import { createNewHosts } from '@angularclass/hmr';
const styles: any[] = [];

const cssLinkManager = {
  linkUrlArr: [],
  disposeLinks() {
    this.linkUrlArr.length = 0;
    const links = [].slice.call(document.querySelectorAll('head link[rel=stylesheet]'));
    links.forEach(el => {
      this.linkUrlArr.push(el.getAttribute('href'));
      el.parentElement.removeChild(el);
    });
  },
  loadLinks() {
    this.linkUrlArr.forEach(linkUrl => {
      const linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'stylesheet');
      linkEl.setAttribute('type', 'text/css');
      linkEl.setAttribute('href', linkUrl);
      document.head.appendChild(linkEl);
    });
  }
};

export const hmrBootstrap = (module: any, bootstrap: () => Promise<NgModuleRef<any>>) => {
  let ngModule: NgModuleRef<any>;

  module.hot.accept();
  bootstrap().then(currentModule => {
    ngModule = currentModule;
    cssLinkManager.loadLinks();
    return ngModule;
  });
  module.hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const removeOldHosts = createNewHosts(elements);
    ngModule.destroy();
    removeOldHosts();
    cssLinkManager.disposeLinks();
  });
};
