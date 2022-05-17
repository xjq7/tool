import { useEffect, useState } from 'react';
import { TreeSelect, TreeSelectProps } from 'antd';
import { getCategoryList } from '@services/book';

interface Props extends TreeSelectProps<any> {
  level?: number;
}
const Component = function (props: Props) {
  const { level, ...restProps } = props;
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    const { data } = await getCategoryList();
    setCategory(data);
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <TreeSelect
      placeholder="请选择分类"
      fieldNames={{ label: 'name', value: 'id' }}
      showSearch
      treeDefaultExpandAll
      treeData={category}
      allowClear
      {...restProps}
    />
  );
};
Component.defaultProps = {
  level: 1,
};

export default Component;
