import App from "../../App";
import {
  Badge,
  Drawer,
  Menu,
  Typography,
  Table,
  InputNumber,
  Button,
  Form,
  Input,
  Checkbox,
  message,
} from "antd";
import {
  CarFilled,
  HomeOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart } from "../../API";
import Title from "antd/es/skeleton/Title";

export default function AppHeader() {
  const navigate = useNavigate();

  const onMenuClick = (item) => {
    navigate(`/${item.key}`);
  };
  return (
    <div className="appHeader">
      <Menu
        className="appMenu"
        onClick={onMenuClick}
        mode="horizontal"
        items={[
          {
            label: <HomeOutlined />,
            key: "",
          },
          {
            label: "Men",
            key: "men",
            children: [
              {
                label: "Men's Shirts",
                key: "mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "mens-watches",
              },
            ],
          },
          {
            label: "Women",
            key: "women",
            children: [
              {
                label: "Women's Dresses",
                key: "womens-dresses",
              },
              {
                label: "Women's Shoes",
                key: "womens-shoes",
              },
              {
                label: "Women's Watches",
                key: "womens-watches",
              },
              {
                label: "Women's Bags",
                key: "womens-bags",
              },
              {
                label: "Women's Jewellery",
                key: "womens-jewellery",
              },
            ],
          },
          {
            label: "Fragrances",
            key: "fragrances",
          },
        ]}
      />
      <Typography.Title>D Store</Typography.Title>
      <AppCart />
    </div>
  );
}
//Bage display a small count or status information on an avatar, icon or other element
function AppCart() {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [checkoutDrawerOpen, setCheckoutDrawerOpen] = useState(false);

  useEffect(() => {
    getCart().then((res) => {
      const productsInCart = res.carts.flatMap((cart) => cart.products);
      setCartItem(productsInCart);
    });
  }, []);

  const onConfirmOrder = (values) => {
    setCartDrawerOpen(false);
    setCheckoutDrawerOpen(false);
    message.success("Your order has been successfully");
  };

  return (
    <div>
      <Badge
        className="badge"
        onClick={() => {
          setCartDrawerOpen(true);
        }}
        count={cartItem.length}
      >
        <ShoppingCartOutlined className="shoppingCartIcon" />
      </Badge>
      <Drawer
        open={cartDrawerOpen}
        onClose={() => {
          setCartDrawerOpen(false);
        }}
        title="Your Cart"
        contentWrapperStyle={{ width: 500 }}
      >
        <Table
          pagination={false}
          columns={[
            {
              title: "Title",
              dataIndex: "title",
            },
            {
              title: "Price",
              dataIndex: "price",
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              render: (value, record) => {
                return (
                  <InputNumber
                    min={0}
                    defaultValue={value}
                    onChange={(value) => {
                      setCartItem((pre) =>
                        pre.map((cart) => {
                          if (record.id === cart.id) {
                            cart.total = cart.price * value;
                          }
                          return cart;
                        })
                      );
                    }}
                  ></InputNumber>
                );
              },
            },
            {
              title: "Total",
              dataIndex: "total",
            },
          ]}
          dataSource={cartItem}
          summary={(data) => {
            const total = data.reduce((pre, current) => {
              return pre + current.total;
            }, 0);
            return <span>Total : {total}</span>;
          }}
        />
        <Button
          onClick={() => {
            setCheckoutDrawerOpen(true);
          }}
          type="primary"
        >
          Check out your cart
        </Button>
      </Drawer>
      <Drawer
        open={checkoutDrawerOpen}
        onClose={() => {
          setCheckoutDrawerOpen(false);
        }}
        title="Confirm Order"
      >
        <Form onFinish={onConfirmOrder}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Pls enter your full name",
              },
            ]}
            label="Full Name"
            name="fullName"
          >
            <Input placeholder="Enter your full name"></Input>
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                type: "email",
                message: "Pls enter valid email",
              },
            ]}
            label="Email"
            name="email"
          >
            <Input placeholder="Enter your email"></Input>
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: "Pls enter your address",
              },
            ]}
            label="Address"
            name="address"
          >
            <Input placeholder="Enter your address"></Input>
          </Form.Item>
          <Form.Item>
            <Checkbox defaultChecked disabled>
              Cart on Delivery
            </Checkbox>
          </Form.Item>
          <Typography.Paragraph type="secondary">
            More methods coming soon
          </Typography.Paragraph>
          <Button type="primary" htmlType="submit">
            Confirm Order
          </Button>
        </Form>
      </Drawer>
    </div>
  );
}
