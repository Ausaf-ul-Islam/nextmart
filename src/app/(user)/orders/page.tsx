import Container from "@/components/Container";
import Headings from "@/components/Headings";
import Orders from "@/components/Order";

import React from "react";

const OrdersPage = () => {
    return (
        <Container className="py-10">
            <Headings title="Your Recent" subtitle="Orders" />
            <Orders />
        </Container>
    );
};

export default OrdersPage;