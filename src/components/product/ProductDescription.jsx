export default function ProductDescription(props) {
  const descriptions = {
    M_Suits: (
      <p>
        Crafting a men's suit is an intricate process that requires over 100
        meticulous steps. It begins with fusing or hand-stitching interfacing
        and jump-basting chest pieces, followed by pressing, lining, and
        stitching pockets. The main pieces are then joined, sleeves set in, and
        linings attached. Finally, buttons and buttonholes are sewn to complete
        the garment.
      </p>
    ),
    M_Pants: (
      <p>
        The creation of men's pants involves several key stages. Starting with
        precise design and pattern-making, the process moves to fabric selection
        and cutting. Skilled artisans then sew and assemble the components,
        ensuring proper fit and durability. Quality control checks are conducted
        before the pants are finished and prepared for distribution.
      </p>
    ),
    W_Dresses: (
      <p>
        Manufacturing women's dresses is a multifaceted process that starts with
        developing a detailed design base. This includes selecting suitable
        fabrics and creating patterns. The next steps involve cutting, sewing,
        and assembling the dress components. Quality control and finishing
        touches, such as adding embellishments and ironing, ensure the final
        product meets high standards.
      </p>
    ),
    M_Shirts: (
      <p>
        The creation of a men's shirt is a meticulous process, beginning with
        artful design and precise pattern-making that define its style and
        sophistication. Only the finest fabrics are carefully selected,
        scrutinized for perfection, and expertly cut to shape. Each component—be
        it the front and back panels, tailored sleeves, structured collar, or
        refined cuffs—is assembled with precision, incorporating thoughtful
        details like darts and pleats for an impeccable fit. Elegant buttonholes
        and perfectly aligned buttons are added, followed by a flawless hem
        finish. The shirt is then masterfully pressed, rigorously
        quality-checked, and prepared for presentation. The result is a garment
        that embodies elegance, craftsmanship, and timeless appeal.
      </p>
    ),
  };

  return (
    <div className="product-description">
      {props.value == null ? descriptions[M_Shirts] : descriptions[props.value]}
    </div>
  );
}
