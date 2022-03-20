import { useEffect, useState } from 'react';
import { Select, SelectProps } from 'antd';
import { getCategoryList } from '@services/book';

interface Props extends SelectProps<any> {
  level?: number;
}
const Component = function (props: Props) {
  const { level = 1, ...restProps } = props;
  const [category, setCategory] = useState([]);

  const fetchCategory = async () => {
    const { data } = await getCategoryList();
    const category1 = data.filter((item: any) => item.level === 1);
    const category2 = data.filter((item: any) => item.level === 2);
    if (level === 1) {
      setCategory(category1);
    } else {
      setCategory(category2);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <Select placeholder="请选择一级类目" {...restProps}>
      {category.map(({ id, name }) => (
        <Select.Option key={id} value={id}>
          {name}
        </Select.Option>
      ))}
    </Select>
  );
};
Component.defaultProps = {
  level: 1,
};

export default Component;
