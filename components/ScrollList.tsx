import { debounce } from 'lodash';
import { ListModel, Stream } from 'mobx-restful';
import { Component } from 'react';
import { EdgePosition, ScrollBoundary, Loading } from 'idea-react';

import { Base, Filter } from '../models/Base';

export interface ScrollListProps<T extends Base = Base> {
  value?: T[];
}

interface ScrollListClass<P = any> {
  Layout: (props: P) => JSX.Element;
}
type DataType<P> = P extends ScrollListProps<infer D> ? D : never;

export abstract class ScrollList<
  P extends ScrollListProps,
> extends Component<P> {
  abstract store: ListModel<DataType<P>>;

  filter: Filter<DataType<P>> = {};

  extraProps?: Partial<P>;

  static Layout: ScrollListClass['Layout'] = () => <></>;

  async componentDidMount() {
    const BaseStream = Stream<Base>;

    const store = this.store as unknown as InstanceType<
        ReturnType<typeof BaseStream>
      >,
      { value } = this.props;

    store.clear();

    if (value) await store.restoreList(value);

    await store.getList(this.filter as Filter<Base>, store.pageList.length + 1);
  }

  componentWillUnmount() {
    this.store.clear();
  }

  loadMore = debounce((edge: EdgePosition) => {
    const { store } = this;

    if (edge === 'bottom' && !store.downloading && !store.noMore)
      store.getList(this.filter);
  });

  render() {
    const { Layout } = this.constructor as unknown as ScrollListClass,
      { value, ...props } = this.props,
      { extraProps } = this,
      { downloading, noMore, allItems } = this.store;

    return (
      <ScrollBoundary onTouch={this.loadMore}>
        {!!downloading && <Loading />}

        <Layout {...props} {...extraProps} value={allItems} />

        <footer className="mt-4 text-center text-muted small">
          {noMore || !allItems.length ? '没有更多' : '上拉加载更多……'}
        </footer>
      </ScrollBoundary>
    );
  }
}
