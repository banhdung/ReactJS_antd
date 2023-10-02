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
  Select,
} from "antd";

function Products() {
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState("az");

  useEffect(() => {
    setLoading(true);

    (param?.categoryId
      ? getProductsByCategory(param.categoryId)
      : getAllProducts()
    ).then((res) => {
      setItems(res.products);
      setLoading(false);
    });
  }, [param]);
  const getSortedItems = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => {
      const aLowerCaseTitle = a.title.toLowerCase();
      const bLowerCaseTitle = b.title.toLowerCase();

      if (sortOrder === "az") {
        return aLowerCaseTitle > bLowerCaseTitle
          ? 1
          : aLowerCaseTitle === bLowerCaseTitle
          ? 0
          : -1;
      } else if (sortOrder === "za") {
        return aLowerCaseTitle < bLowerCaseTitle
          ? 1
          : aLowerCaseTitle === bLowerCaseTitle
          ? 0
          : -1;
      } else if (sortOrder === "lowHigh") {
        return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
      } else if (sortOrder === "highLow") {
        return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
      }
    });
    return sortedItems;
  };
  // in Header, I use Menu have key then navigate to url 'home/key'.So key is param
  if (loading) {
    return <Spin spinning />;
  }

  return (
    <div className="productContainer">
      <div>
        <Typography.Text>View items sort by : </Typography.Text>
        <Select
          onChange={(value) => {
            setSortOrder(value);
          }}
          options={[
            {
              label: "Sort a-z",
              value: "az",
            },
            {
              label: "Sort z-a",
              value: "za",
            },
            {
              label: "Sort price low to high",
              value: "lowHight",
            },
            {
              label: "Sort price high to low",
              value: "highLow",
            },
          ]}
        ></Select>
      </div>
      <List
        loading={loading}
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
        dataSource={getSortedItems()}
      ></List>
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
