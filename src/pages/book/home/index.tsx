import { useEffect, useState } from 'react';
import { Button, Card, Form, Input, Table } from 'antd';
import SelectCategory from '../components/SelectCategory';
import { Book, getBookList } from '@services/book';
import { PageInfo } from '@utils/types';
import { FILE_PREIX } from '@constant/book';
import styles from './index.module.less';

const initPageInfo = { page: 1, pageSize: 15, total: 0 };

export default function Component() {
  const [list, setList] = useState([]);
  const [form] = Form.useForm<Book>();

  const [loading, setLoading] = useState(false);
  const [pageInfo, setPageInfo] = useState<PageInfo>(initPageInfo);

  const fetchList = async (page?: number, pageSize?: number) => {
    try {
      setLoading(true);
      const { name, category_id } = await form.getFieldsValue();
      const { data } = await getBookList({ page, pageSize, category_id, name });
      const { list: bookList = [], ...pageInfo } = data;
      setList(bookList);
      setPageInfo({ ...pageInfo });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchFirstList = async () => {
    await fetchList(initPageInfo.page, initPageInfo.pageSize);
  };

  useEffect(() => {
    fetchFirstList();
  }, []);

  const handleSearch = () => {
    fetchFirstList();
  };

  const columns = [
    {
      title: '书名',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '分类',
      width: 120,
      align: 'center' as AlignType,
      key: 'category_name',
      dataIndex: 'category_name',
    },
    {
      title: '文件列表',
      key: 'files',
      dataIndex: 'files',
      render: (text: any, record: any) => {
        return (
          <div>
            {text.map((item: any) => (
              <div>
                <a target="_blank" href={FILE_PREIX + item.path}>
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      <Card>
        <Form<Book> form={form} layout="inline">
          <Form.Item label="书名" name="name">
            <Input placeholder="请输入书名" allowClear />
          </Form.Item>
          <Form.Item label="分类" name="category_id">
            <SelectCategory style={{ width: 120 }} allowClear level={1} placeholder="请选择分类" />
          </Form.Item>

          <Form.Item style={{ margin: 20 }}>
            <Button type="primary" onClick={handleSearch} loading={loading}>
              搜索
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <Table
          rowKey="id"
          loading={loading}
          dataSource={list}
          columns={columns}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: false,
            showTotal: () => `共${pageInfo.total}条`,
            pageSize: Number(pageInfo.pageSize),
            current: Number(pageInfo.page),
            total: Number(pageInfo.total),
            onChange: (current, pageSize) => {
              fetchList(current, pageSize);
            },
          }}
        ></Table>
      </Card>
    </div>
  );
}
