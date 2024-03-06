import "../../App.css";
export const ProductListing = ({ productData = [], isLoading, isError }) => {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;
  return (
    <>
      <div className="prod-cont">
        <h1>Product List</h1>
        {productData.map((product) => (
          <div key={product.id} className="product">
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
