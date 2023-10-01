import { useEffect, useState } from "react";
import { getAllProducts } from "../../API";
import { List, Card, Image, Typography } from "antd";
function Products() {
  const [items, setItems] = useState();
  useEffect(() => {
    getAllProducts().then((res) => {
      setItems(res.products);
    });
  }, []);
  return (
    <div>
      <List
        grid={{ column: 3 }}
        renderItem={(products, index) => {
          return (
            <Card
              title={products.title}
              key={index}
              cover={
                <Image className="itemCardImage" src={products.thumbnail} />
              }
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
              ></Card.Meta>
            </Card>
          );
        }}
        dataSource={items}
      />
    </div>
  );
}

export default Products;
