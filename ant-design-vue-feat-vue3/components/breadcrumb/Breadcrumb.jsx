import { inject, cloneVNode } from 'vue';
import PropTypes from '../_util/vue-types';
import { filterEmpty, getComponent, getSlot } from '../_util/props-util';
import warning from '../_util/warning';
import { ConfigConsumerProps } from '../config-provider';
import BreadcrumbItem from './BreadcrumbItem';
import Menu from '../menu';

const Route = PropTypes.shape({
  path: PropTypes.string,
  breadcrumbName: PropTypes.string,
  children: PropTypes.array,
}).loose;

const BreadcrumbProps = {
  prefixCls: PropTypes.string,
  routes: PropTypes.arrayOf(Route),
  params: PropTypes.any,
  separator: PropTypes.any,
  itemRender: PropTypes.func,
};

function getBreadcrumbName(route, params) {
  if (!route.breadcrumbName) {
    return null;
  }
  const paramsKeys = Object.keys(params).join('|');
  const name = route.breadcrumbName.replace(
    new RegExp(`:(${paramsKeys})`, 'g'),
    (replacement, key) => params[key] || replacement,
  );
  return name;
}

export default {
  name: 'ABreadcrumb',
  props: BreadcrumbProps,
  setup() {
    return {
      configProvider: inject('configProvider', ConfigConsumerProps),
    };
  },
  methods: {
    defaultItemRender({ route, params, routes, paths }) {
      const isLastItem = routes.indexOf(route) === routes.length - 1;
      const name = getBreadcrumbName(route, params);
      return isLastItem ? <span>{name}</span> : <a href={`#/${paths.join('/')}`}>{name}</a>;
    },
    getPath(path, params) {
      path = (path || '').replace(/^\//, '');
      Object.keys(params).forEach(key => {
        path = path.replace(`:${key}`, params[key]);
      });
      return path;
    },

    addChildPath(paths, childPath, params) {
      const originalPaths = [...paths];
      const path = this.getPath(childPath, params);
      if (path) {
        originalPaths.push(path);
      }
      return originalPaths;
    },

    genForRoutes({ routes = [], params = {}, separator, itemRender = this.defaultItemRender }) {
      const paths = [];
      return routes.map(route => {
        const path = this.getPath(route.path, params);

        if (path) {
          paths.push(path);
        }
        const tempPaths = [...paths];
        // generated overlay by route.children
        let overlay = null;
        if (route.children && route.children.length) {
          overlay = (
            <Menu>
              {route.children.map(child => (
                <Menu.Item key={child.path || child.breadcrumbName}>
                  {itemRender({
                    route: child,
                    params,
                    routes,
                    paths: this.addChildPath(tempPaths, child.path, params),
                  })}
                </Menu.Item>
              ))}
            </Menu>
          );
        }

        return (
          <BreadcrumbItem
            overlay={overlay}
            separator={separator}
            key={path || route.breadcrumbName}
          >
            {itemRender({ route, params, routes, paths: tempPaths })}
          </BreadcrumbItem>
        );
      });
    },
  },
  render() {
    let crumbs;
    const { prefixCls: customizePrefixCls, routes, params = {}, $slots } = this;
    const getPrefixCls = this.configProvider.getPrefixCls;
    const prefixCls = getPrefixCls('breadcrumb', customizePrefixCls);

    const children = filterEmpty(getSlot(this));
    const separator = getComponent(this, 'separator');
    const itemRender = this.itemRender || $slots.itemRender || this.defaultItemRender;
    if (routes && routes.length > 0) {
      // generated by route
      crumbs = this.genForRoutes({
        routes,
        params,
        separator,
        itemRender,
      });
    } else if (children.length) {
      crumbs = children.map((element, index) => {
        warning(
          typeof element.type === 'object' &&
            (element.type.__ANT_BREADCRUMB_ITEM || element.type.__ANT_BREADCRUMB_SEPARATOR),
          'Breadcrumb',
          "Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children",
        );
        return cloneVNode(element, { separator, key: index });
      });
    }
    return <div class={prefixCls}>{crumbs}</div>;
  },
};