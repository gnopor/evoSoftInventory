interface IProps {
    shop: I.IMagasin;
}

export default function ShopCard({ shop }: IProps) {
    return <div>ShopCard: {shop.nom}</div>;
}
