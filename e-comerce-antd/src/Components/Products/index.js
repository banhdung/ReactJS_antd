import { useEffect, useState } from "react";
import { addToCart, getAllProducts, getProductsByCategory } from "../../API";
import { useParams } from "react-router-dom";
import {
  Badge,
  List,
  Card,
  Image,
  Typography,
  Rate,
  Button,
  message,
  Spin,
} from "antd";

function Products() {
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const [items, setItems] = useState();

  useEffect(() => {
    setLoading(true);

    (param?.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoading(false);
    });
  }, [param]); // in Header, I use Menu have key then navigate to url 'home/key'.So key is param
  if (loading) {
    return <Spin spinning />;
  }

  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(products, index) => {
          return (
            <Badge.Ribbon
              className="itemCardBadge"
              text={products.discountPercentage}
            >
              <Card
                className="itemCard"
                title={products.title}
                key={index}
                cover={
                  <Image className="itemCardImage" src={products.thumbnail} />
                }
                actions={[
                  <Rate allowHalf disabled value={products.rating}></Rate>,
                  <AddToCardButton item={products} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      {" "}
                      Price: ${products.price}{" "}
                      <Typography.Text delete type="danger">
                        $
                        {parseFloat(
                          products.price +
                            (products.price * products.discountPercentage) / 100
                        ).toFixed(2)}
                      </Typography.Text>
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }} // click 'more' to expand, delete is line, danger is red
                    >
                      {products.description}
                    </Typography.Paragraph>
                  }
                ></Card.Meta>
              </Card>
            </Badge.Ribbon>
          );
        }}
        dataSource={items}
      />
    </div>
  );
}

function AddToCardButton({ item }) {
  const [loading, setLoading] = useState(false);
  const addProductToCart = () => {
    setLoading(true);
    addToCart(item.id).then((res) => {
      message.success(`${item.title} has been added to cart`);
      setLoading(false);
      console.log(item.title);
    });
  };
  return (
    <Button
      type="link"
      onClick={() => {
        addProductToCart();
      }}
      loading={loading}
    >
      Add to cart
    </Button>
  );
}

export default Products;
