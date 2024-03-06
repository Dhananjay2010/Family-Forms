export const ProductListing = ({ productData = [], isLoading, isError }) => {
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products</div>;
  return (
    <>
      <div>
        <h1>Product List</h1>
        {productData.map((product) => (
          <div key={product.id} className="product">
            {/* <img src={product.thumbnail} alt={product.title} /> */}
            <div className="product-info">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              {/* <p>Rating: {product.rating}</p>
              <p>Stock: {product.stock}</p> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
