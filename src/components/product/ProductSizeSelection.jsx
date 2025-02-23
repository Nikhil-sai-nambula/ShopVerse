export default function ProductSizeSelection(props) {
  const { sizes, onClick } = props;

  return (
    <div className="product-size-selection-main">
      <div className="size">
        <span className="sizetext">Size</span>
        <ul className="list-size">
          {sizes.map((size) => (
            <li key={size} className="item-list">
              <button
                className="item-list-button"
                onClick={() => onClick(size)}
              >
                {size}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
