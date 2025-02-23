export default function (props) {
  return (
    <div className="product-description">
      {props.value == null ? (
        <p>
          creation of a men’s shirt is a meticulous process, beginning with the
          artful design and precise pattern-making that define its style and
          sophistication. Only the finest fabrics are carefully selected,
          scrutinized for perfection, and expertly cut to shape. Each
          component—be it the front and back panels, tailored sleeves,
          structured collar, or refined cuffs—is assembled with precision,
          incorporating thoughtful details like darts and pleats for an
          impeccable fit. Elegant buttonholes and perfectly aligned buttons are
          added, followed by a flawless hem finish. The shirt is then
          masterfully pressed, rigorously quality-checked, and prepared for
          presentation. The result is a garment that embodies elegance,
          craftsmanship, and timeless appeal.
        </p>
      ) : (
        <p>{props.value}</p>
      )}
    </div>
  );
}
