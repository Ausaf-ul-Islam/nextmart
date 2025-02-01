import Container from "@/components/Container";
import Headings from "@/components/Headings";
import ProductList from "@/components/ProductList";
import React from "react";

const ShopPage = () => {
  return (
    <Container className="py-5">
      <Headings title={"All available"} subtitle="Products list"/>
      <ProductList showHeading={false} />
    </Container>
  );
};

export default ShopPage;