interface IProps {
    product: I.IProduit;
}

export default function ProductCard({ product }: IProps) {
    return <div>ProductCard: {product.nom}</div>;
}
